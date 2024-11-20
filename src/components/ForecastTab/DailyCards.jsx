import React, { memo, useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useApiData } from "../../Context/ApiContext";
import { useTime } from "../../Context/TimeContext";
import DailyCardsSkeleton from "../../Skeletons/DailyCardsSkeleton";

const DailyCards = ({
  index,
  temp,
  feelsLike,
  description,
  description2,
  epoc,
}) => {
  // Corrected here
  const { currentData, timeZone, loading } = useApiData();
  const { epochDayConverter } = useTime();
  const dayName = useMemo(() => epochDayConverter(epoc, timeZone), [timeZone]);
  const navigate = useNavigate();
  const handleClick = () => navigate(`/Forecast/${index}`);

  // Logic to update description based on weather conditions
  if (
    description2 === "light rain" ||
    description2 === "heavy intensity rain" ||
    description2 === "moderate rain"
  ) {
    description = description2;
  }
  if (loading) {
    return <DailyCardsSkeleton />;
  }
  return (
    <div
      onClick={handleClick}
      className="relative flex h-[6.1rem] w-[85%] cursor-pointer items-center justify-around overflow-hidden rounded-xl bg-white py-[2%] pl-[1%] text-black shadow-[.7px_.7px_1px_.7px] shadow-black/50 dark:bg-[#1d1d1d] dark:text-white/80"
    >
      <h1 className="absolute left-0 top-0 w-[32%] rounded-br-2xl bg-black/15 text-center text-[.74rem] font-[500] italic leading-4 dark:bg-white/20 dark:text-white/80">
        {dayName}
      </h1>
      <div className="image-div flex h-full items-center py-[1%]">
        <img
          className="size-[5rem] rounded-xl"
          src={`/${description}.png`}
          alt=""
        />
      </div>
      <div className="flex h-full w-[25%] flex-col items-center justify-evenly text-black/70 dark:text-inherit">
        <h1 className="text-[.79rem] font-[700]">{currentData.city}</h1>
        <h2 className="w-full text-center text-[.95rem] font-semibold capitalize italic leading-3 text-black dark:text-inherit md:text-sm">
          {description2}
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
      </div>
      <div className="mr-0.5 flex h-full items-center justify-center">
        <FaChevronRight className="size-5 text-black/40 dark:text-white/50" />
      </div>
    </div>
  );
};

export default memo(DailyCards);
