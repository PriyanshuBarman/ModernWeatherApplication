import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fetchForecastData,
  fetchTimeZoneData,
  fetchWeatherData,
} from "../utils/api";
import { epochDayConverter } from "../utils/TimeProvider";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [dailyData, setDailyData] = useState([]);
  const [threeHourlyData, setThreeHourlyData] = useState([]);
  const [timeZone, setTimeZone] = useState();
  const [err, setErr] = useState();

  const search = async (city) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherData(city);
      const forecastData = await fetchForecastData(city);
      const { lat, lon } = weatherData.coord;
      const timeData = await fetchTimeZoneData(lat, lon);

      setWeatherData(weatherData);
      setDailyData(
        forecastData.list
          .filter((_, index) => index % 8 === 0)
          .slice(1, 5)
          .concat(forecastData.list[39]),
      );
      setThreeHourlyData(forecastData.list);

      if (timeData.status === "OK") {
        setTimeZone(timeData.zoneName);
      }

      localStorage.setItem("lastCity", city);

      setErr(null);
    } catch (error) {
      console.error(error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const DEFAULT_CITY = "Mumbai";
    const lastCity = localStorage.getItem("lastCity") || DEFAULT_CITY;

    search(lastCity);
  }, []);

  const currentData = useMemo(() => {
    if (weatherData) {
      const epoc = weatherData.dt;
      const sunrise = weatherData.sys.sunrise;
      const sunset = weatherData.sys.sunset;

      return {
        temp: Math.round(weatherData.main.temp),
        maxTemp: Math.ceil(weatherData.main.temp_max),
        minTemp: Math.floor(weatherData.main.temp_min),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        clouds: weatherData.clouds.all,
        visibility: Math.round(weatherData.visibility / 1000),
        windSpeed: Math.round(weatherData.wind.speed * 3.6),
        windDirection: weatherData.wind.deg + 180,
        pressure: weatherData.main.pressure,
        description: weatherData.weather[0].description,
        sunRise: sunrise,
        sunSet: sunset,
        epoc: epoc,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
        city: weatherData.name,
        countryCode: weatherData.sys.country,
        isDayOrNight: epoc > sunrise && epoc < sunset ? "d" : "n",
      };
    }
    return {};
  }, [weatherData]);

  return (
    <ApiContext.Provider
      value={{
        loading,
        currentData,
        dailyData,
        threeHourlyData,
        timeZone,
        today: epochDayConverter(currentData.epoc),
        err,
        search,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiData = () => useContext(ApiContext);
