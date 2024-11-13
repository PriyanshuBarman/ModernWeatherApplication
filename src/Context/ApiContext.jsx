import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [dailyData, setDailyData] = useState();
  const [threeHourlyData, setThreeHourlyData] = useState();
  const [timeZone, setTimeZone] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    fetchAllData("kolkata");
  }, []);

  const fetchAllData = async (inputName) => {
    try {
      setLoading(true);

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputName}&appid=462af939b63db301f7c3708e452b2874&units=metric`,
      );
      const weatherData = await weatherResponse.json();

      // Check for valid weather data
      if (!weatherResponse.ok || !weatherData.coord) {
        throw new Error(
          "Oops! We couldn't locate that city. Please try another search.",
        );
      }

      // Destructure coordinates from weather data
      const { lat, lon } = weatherData.coord;

      // Fetch forecast data and time data in parallel
      const forecastPromise = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputName}&appid=462af939b63db301f7c3708e452b2874&units=metric`,
      );
      const timeDataPromise = fetch(
        `/api/v2.1/get-time-zone?key=BEG60N6QBE1T&format=json&by=position&lat=${lat}&lng=${lon}`,
      );

      // Await both promises
      const [forecastResponse, timeDataResponse] = await Promise.all([
        forecastPromise,
        timeDataPromise,
      ]);

      // Convert responses to JSON
      const forecastData = await forecastResponse.json();
      const timeData = await timeDataResponse.json();

      // Process forecast data
      const dailyData = forecastData.list.filter((_, index) => index % 8 === 0);
      const day = dailyData.slice(1, 5).concat(forecastData.list[39]);

      // Set all data states
      setErr(null);
      setWeatherData(weatherData);
      setDailyData(day);
      setThreeHourlyData(forecastData.list);

      // Update time zone if the API call was successful and differs from current
      if (timeData.status === "OK" && timeData.zoneName !== timeZone) {
        setTimeZone(timeData.zoneName);
      } else {
        console.error("Failed to fetch time data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const currentData = useMemo(() => {
    if (weatherData) {
      return {
        temp: Math.round(weatherData.main.temp),
        maxTemp: Math.ceil(weatherData.main.temp_max),
        minTemp: Math.floor(weatherData.main.temp_min),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        clouds: weatherData.clouds.all,
        visibility: weatherData.visibility / 1000,
        windSpeed: Math.round(weatherData.wind.speed * 3.6),
        windDirection: weatherData.wind.deg + 180,
        pressure: weatherData.main.pressure,
        description: weatherData.weather[0].main,
        description2: weatherData.weather[0].description,
        sunRise: weatherData.sys.sunrise,
        sunSet: weatherData.sys.sunset,
        epoc: weatherData.dt,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
        city: weatherData.name,
        countryCode: weatherData.sys.country,
      };
    }
    return {};
  }, [weatherData]);

  const today = useMemo(() => {
    const date = new Date(currentData.epoc * 1000);
    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timeZone,
    });
    return dayName;
  }, [timeZone]);

  const search = (e, city) => {
    e.preventDefault();
    if (city) {
      fetchAllData(city);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        err,
        loading,
        currentData,
        search,
        dailyData,
        threeHourlyData,
        timeZone,
        today,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiData = () => useContext(ApiContext);
