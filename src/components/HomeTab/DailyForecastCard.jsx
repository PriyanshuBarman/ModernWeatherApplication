import React, { memo } from "react";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useApiData } from "../../Context/ApiContext";
import CardSkeleton from "../../Skeletons/CardSkeleton";
import { getImageName } from "../../utils/getImageName";
import { epochDayConverter } from "../../utils/TimeProvider";

const DailyForecastCard = ({ index, city }) => {
  const { loading, dailyData, timeZone } = useApiData();

  if (loading) return <CardSkeleton />;
  if (!dailyData || !dailyData[index]) {
    return;
  }

  // Extract values from `dailyData` to simplify JSX
  const forecast = dailyData[index];
  const temp = Math.round(forecast.main.temp);
  const feelsLike = Math.round(forecast.main.feels_like);
  const windDirection = forecast.wind.deg + 180;
  const description = forecast.weather[0].description;
  const epoc = forecast.dt;
  const isDayOrNight = forecast.sys.pod;

  const dayName = epochDayConverter(epoc, timeZone);
  const imageName = getImageName(description, isDayOrNight);

  const navigate = useNavigate();
  const handleClick = () => navigate(`/Forecast/${index}`);
  return (
    <>
      <div
        onClick={handleClick}
        className="relative flex h-[12.9em] w-[94%] flex-col items-center rounded-[1.7em] bg-gradient-to-t from-blue-700 to-blue-400 text-white/95 shadow-lg shadow-black/70 dark:from-[#161616] dark:to-[#474747]"
      >
        <svg
          className="animated-wave absolute bottom-0 rotate-[180deg] rounded-t-3xl fill-sky-100 dark:fill-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#000"
        >
          <path
            className="path1"
            d="M0 1v99c134.3 0 153.7-99 296-99H0Z"
            opacity=".5"
          ></path>
          <path
            className="path2"
            d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
            opacity=".5"
          ></path>
          <path
            className="path3"
            d="M617 1v86C372 119 384 1 196 1h421Z"
            opacity=".5"
          ></path>
          <path
            className="path4"
            d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"
          ></path>
        </svg>
        <img
          className="absolute left-[1%] top-[-28%] h-[12em] w-[12em] rounded-xl capitalize"
          src={`/${imageName}.png`}
          alt=""
        />

        <div className="absolute right-[5%] top-[15%] flex flex-col items-center justify-center font-oswald text-[3.3em]">
          <h1 className="bg-gradient-to-b from-white via-white to-transparent bg-clip-text font-extrabold leading-tight text-transparent">
            {temp}°C
          </h1>
          <h2 className="flex flex-col items-center font-oxanium text-[.32em] font-[600] md:text-sm">
            Feels Like {feelsLike}°c
          </h2>
          <div className="flex items-center justify-center gap-1 font-oxanium">
            <h1 className="text-xs font-semibold italic">Wind Direction</h1>
            <LiaLocationArrowSolid
              className="size-10"
              style={{
                transform: `rotate(${windDirection}deg)`,
              }}
            />
          </div>
        </div>

        {/* ------- Description & Day */}
        <div className="absolute bottom-[35%] left-[7%] flex h-3 w-[50%] flex-col gap-2 text-[1.3em] font-[600] capitalize italic leading-5 md:text-sm">
          <h1 className="h flex flex-wrap">{description}</h1>
          <h2 className="text-[.7em] leading-3">{dayName}</h2>
        </div>
        {city ? (
          <h1 className="absolute right-12 top-2 flex items-center text-sm font-[600] italic text-white">
            <MdLocationOn className="mb-1 size-[1.03rem]" /> {city}
          </h1>
        ) : (
          <h1 className="absolute right-14 top-2 text-sm font-[500] italic text-white">
            Forecast
          </h1>
        )}
      </div>
    </>
  );
};

export default memo(DailyForecastCard);
