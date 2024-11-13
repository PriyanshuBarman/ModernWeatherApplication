import React, { memo, useMemo } from "react";
import { useApiData } from "../../Context/ApiContext";
import { useTime } from "../../Context/TimeContext";

const ThreeHourlyCards = ({ temp, feelsLike, description, description2, epoc }) => {
  const { currentData, timeZone } = useApiData();
  const { epochDayConverter, epochTimeConverter } = useTime();
  const dayName = useMemo(() => epochDayConverter(epoc, timeZone), [timeZone]);
  const time = useMemo(() => epochTimeConverter(epoc, timeZone), [timeZone]);
  if (
    description2 === "light rain" ||
    description2 === "heavy intensity rain"
  ) {
    description = description2;
  }
  return (
    <div className="relative flex h-[7em] w-[87%] cursor-pointer items-center justify-evenly overflow-hidden rounded-xl bg-white py-[2%] pl-[1%] text-black shadow-[1.5px_1.5px_3px_1px] shadow-black/50 dark:bg-[#1d1d1d] dark:text-white/80">
      <h1 className="absolute left-0 top-0 flex w-[50%] justify-evenly rounded-br-2xl bg-black/15 text-center text-[.7em] font-[500] italic leading-4 dark:bg-white/20 dark:text-white/80">
        {dayName} / {time}
      </h1>
      <div className="image-div flex h-full items-center py-[1%]">
        <img
          className="size-[5.5rem] rounded-xl"
          src={`/${description}.png`}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="flex h-full w-[19%] flex-col justify-evenly">
        <h1 className="font-bold">{currentData.city}</h1>
        <h2 className="w-full text-center text-[.79rem] font-semibold capitalize italic leading-3 md:text-sm">
          {description2}
        </h2>
      </div>
      <div className="mt-[19%] flex h-full flex-col pl-4">
        <h1 className="bg-gradient-to-t from-transparent to-black bg-clip-text text-3xl font-bold text-transparent dark:from-transparent dark:to-white">
          {temp}°c
        </h1>
        <h1 className="flex items-center gap-1 text-[.60rem] italic">
          Feels Like
          <span className="text-[.75rem] font-semibold">{feelsLike}°c</span>
        </h1>
      </div>
      {/* <div className="mr-1 flex h-full items-center justify-center">
          <FaChevronRight className="size-5 text-black/60 dark:text-white/50" />
        </div> */}
    </div>
  );
};

export default memo(ThreeHourlyCards);
