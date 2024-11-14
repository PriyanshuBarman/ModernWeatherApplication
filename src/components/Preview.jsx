import React from "react";
import { FaAngleDoubleDown, FaCloudversify, FaEye } from "react-icons/fa";
import { FaAnglesDown, FaWind } from "react-icons/fa6";
import { MdArrowCircleLeft } from "react-icons/md";
import { PiThermometerBold } from "react-icons/pi";
import { SiRainmeter } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../Context/ApiContext";
import Footer from "./Footer";
import SquareDiv from "./SquareDiv";
import DailyForecastCard from "./HomeTab/DailyForecastCard";
export default function Preview() {
  let { dailyData, currentData } = useApiData();
  let { index } = useParams();
  const forecast = dailyData[index];
  const humidity = forecast.main.humidity;
  const clouds = forecast.clouds.all;
  const windSpeed = Math.round(forecast.wind.speed * 3.6);
  const feelsLike = Math.round(forecast.main.feels_like);
  const visibility = Math.round(forecast.visibility / 1000);
  const pressure = forecast.main.pressure;

  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  return (
    <div className="container flex w-full flex-wrap items-center justify-center overflow-hidden bg-[#f2f2f2] pt-12 font-oxanium dark:bg-[#272727]">
      <nav className="fixed top-0 z-40 flex h-9 w-full items-center justify-center bg-white dark:bg-[#414141] dark:text-white md:w-[375px]">
        <button
          onClick={handleBackClick}
          className="absolute left-[3%] h-[75%] w-[9%] rounded-md text-black/70 active:shadow-none dark:text-white/70"
        >
          <MdArrowCircleLeft className="h-full w-full" />
        </button>
        <h1 className="flex items-center gap-2 text-[1.1em] font-semibold italic">
          Forecast
        </h1>
      </nav>

      <div className="mt-5 flex w-full justify-center">
        <DailyForecastCard index={index} city={currentData.city} />
      </div>

      <section className="mt-9 flex w-full flex-wrap items-center justify-evenly gap-2">
        <div className="relative mb-4 h-5 w-full">
        <div className="relative flex h-5 w-full items-center justify-center">
          <h1 className="flex w-[92%] items-center justify-center rounded-full bg-black/15 py-1.5 text-[.9rem] font-[500] italic leading-4 gap-3 text-black/80 dark:bg-white/10 dark:text-white/80">
            Quick Weather preview <FaAnglesDown />
          </h1>
        </div>
        </div>
        <SquareDiv
          unit={feelsLike}
          title={"Feels Like"}
          unitname={"°C"}
          icon={<PiThermometerBold className="h-full w-12" />}
        />
        <SquareDiv
          unit={humidity}
          title={"Humidity"}
          unitname={"%"}
          icon={<SiRainmeter className="h-full w-12" />}
        />

        <SquareDiv
          unit={clouds}
          title={"Clouds"}
          unitname={"%"}
          icon={<FaCloudversify className="h-full w-12" />}
        />
        <SquareDiv
          unit={visibility}
          title={"Visibility"}
          unitname={"km"}
          icon={<FaEye className="h-full w-10" />}
        />
        <SquareDiv
          unit={windSpeed}
          title={"Wind"}
          unitname={"Km/h"}
          icon={<FaWind className="h-full w-9" />}
        />
        <SquareDiv unit={pressure} title={"Pressure"} unitname={"hPa"} />
      </section>
      <Footer />
    </div>
  );
}
