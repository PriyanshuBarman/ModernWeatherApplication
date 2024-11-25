import React, { memo, useMemo } from "react";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { useApiData } from "../../Context/ApiContext";
import ThreeHourlyCardsSkeleton from "../Skeletons/ThreeHourlyCardsSkeleton";
import { getImageName } from "../../utils/getImageName";
import {
  epochDayConverter,
  epochTimeConverter,
} from "../../utils/TimeProvider";

const ThreeHourlyCards = ({
  temp,
  epoc,
  feelsLike,
  windDirection,
  description,
  isDayOrNight,
}) => {
  const { currentData, timeZone, loading } = useApiData();
  const dayName = useMemo(() => epochDayConverter(epoc, timeZone), [timeZone]);
  const time = useMemo(() => epochTimeConverter(epoc, timeZone), [timeZone]);
  const imageName = getImageName(description, isDayOrNight);
  if (loading) {
    return <ThreeHourlyCardsSkeleton />;
  }

  return (
    <div className="relative flex h-[6.1rem] w-[85%] cursor-pointer items-center justify-around overflow-hidden rounded-xl bg-white py-[2%] pl-[1%] pr-5 text-black shadow-[.7px_.7px_1px_.7px] shadow-black/50 dark:bg-[#1d1d1d] dark:text-white/80">
      <h1 className="absolute left-0 top-0 flex w-[45%] justify-evenly rounded-br-2xl bg-black/15 text-center text-[.67rem] font-[500] italic leading-4 dark:bg-white/20 dark:text-white/80">
        {dayName} / {time}
      </h1>
      <div className="image-div mt-1 flex h-full items-center">
        <img
          className="size-[4.8rem] rounded-xl"
          src={`/${imageName}.png`}
          alt=""
        />
      </div>
      <div className="flex h-full w-[25%] flex-col items-center justify-evenly text-black/70 dark:text-inherit">
        <h1 className="text-[.79rem] font-[700]">{currentData.city}</h1>
        <h2 className="w-full text-center text-[.95rem] font-semibold capitalize italic leading-3 text-black dark:text-inherit md:text-sm">
          {description}
        </h2>
      </div>
      <div className="mt-2.5 flex h-full flex-col items-center justify-center">
        <h1 className="bg-gradient-to-t from-transparent to-black bg-clip-text text-[1.65rem] font-bold text-transparent dark:from-transparent dark:to-white">
          {temp}°c
        </h1>
        <h1 className="flex items-center gap-1 text-[.60rem] italic">
          Feels Like
          <span className="text-[.75rem] font-semibold">{feelsLike}°c</span>
        </h1>
        <div className="flex h-2 items-center justify-center gap-0.5">
          <h1 className="text-[.55rem] italic">Wind direction</h1>
          <LiaLocationArrowSolid
            className="size-6"
            style={{
              transform: `rotate(${windDirection}deg)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ThreeHourlyCards);
