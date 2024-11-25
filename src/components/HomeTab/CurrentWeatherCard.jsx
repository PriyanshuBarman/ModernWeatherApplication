import React, { memo } from "react";
import { IoMdMoon } from "react-icons/io";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { useApiData } from "../../Context/ApiContext";
import { getImageName } from "../../utils/getImageName";
import { epochDayConverter } from "../../utils/TimeProvider";
import CardSkeleton from "../Skeletons/CardSkeleton";

const CurrentWeatherCard = () => {
  const { currentData, loading, timeZone } = useApiData();
  if (loading) return <CardSkeleton />;

  let { temp, feelsLike, windDirection, description, epoc, isDayOrNight } =
    currentData;

  const dayName = epochDayConverter(epoc, timeZone);
  const imageName = getImageName(description, isDayOrNight);

  return (
    <div className="relative flex h-[12.9em] w-[94%] flex-col items-center rounded-[1.7em] bg-gradient-to-t from-blue-700 to-blue-400 text-white/95 shadow-md shadow-black/90 dark:from-[#161616] dark:to-[#474747]">
      {isDayOrNight === "n" && (
        <h1 className="absolute right-14 top-2 flex items-center gap-1 text-sm font-[600] italic text-white">
          Night <IoMdMoon />
        </h1>
      )}
      <svg
        className="animated-wave absolute bottom-0 rotate-[180deg] rounded-t-3xl fill-sky-100 dark:fill-gray-400"
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
        className="absolute left-[1%] top-[-28%] h-[12em] w-[12em] rounded-xl"
        src={`${imageName}.png`}
        alt=""
      />
      <div className="absolute right-[6%] top-[14%] flex flex-col items-center justify-center font-oswald text-[3.31em]">
        <h1 className="bg-gradient-to-b from-white via-white to-transparent bg-clip-text font-extrabold leading-tight text-transparent">
          {temp}°C
        </h1>

        <h2 className="ml-3 flex w-full flex-col items-start font-oxanium text-base font-[600] md:text-sm">
          Feels like {feelsLike}°c
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
      {/* Description & Day */}
      <div className="absolute bottom-[35%] left-[6%] flex h-3 w-[50%] flex-col gap-2 text-[1.3em] font-[600] capitalize italic leading-5 md:text-sm">
        <h1 className="h flex flex-wrap">{description}</h1>
        <h2 className="text-[.7em] leading-3">{dayName}</h2>
      </div>
    </div>
  );
};
export default memo(CurrentWeatherCard);
