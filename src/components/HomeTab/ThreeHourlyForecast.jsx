import React, { memo } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useApiData } from "../../Context/ApiContext";
import { useTime } from "../../Context/TimeContext";
import ThreeHourlyForecastSkeleton from "../../Skeletons/ThreeHourlyForecastSkeleton";

const ThreeHourlyForecast = () => {
  const { threeHourlyData, loading } = useApiData();
  if (loading) {
    return <ThreeHourlyForecastSkeleton />;
  }
  return (
    <div className="h-50 mt- w-full rounded-md bg-inherit">
      <div className="mb- ml-[2%] flex w-[95%] flex-wrap items-center justify-between gap-4 py-1.5 pl-5 pr-2 text-xs font-bold italic text-black/80 dark:text-white/90">
        <h1>3 Hourly Forecast</h1>
        <span className="flex items-center gap-2">
          <h1>Next 5 Days</h1>
          <FaArrowRightFromBracket />
        </span>
      </div>
      <Swiper
        className="pb-5 pl-14 pt-[1.2%]"
        spaceBetween={75}
        slidesPerView={5}
        modules={[FreeMode]}
        freeMode={true}
      >
        {threeHourlyData &&
          threeHourlyData.map((item, index) => (
            <SwiperSlide key={index}>
              <Cards
                item={item}
                epoc={item.dt}
                temp={Math.round(item.main.temp)}
                description={item.weather[0].main}
                description2={item.weather[0].description}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

const Cards = memo(({ epoc, temp, description, description2 }) => {
  const { epochTimeConverter, epochDayConverter } = useTime();
  const { timeZone, today } = useApiData();

  const ForecastTime = epochTimeConverter(epoc, timeZone);

  const day = epochDayConverter(epoc, timeZone);
  const ForecastDay = today === day ? "" : day;

  if (
    description2 === "light rain" ||
    description2 === "heavy intensity rain"
  ) {
    description = description2;
  }

  return (
    <div className="container flex w-full flex-col items-center justify-center">
      <div
        className={`dark:text-tp group relative flex h-[7rem] w-[4.09em] justify-center overflow-hidden rounded-[1.7em] bg-[#f6f6f6] shadow-[2px_.75px_2px_0px] shadow-black hover:bg-[#499afe] hover:text-white dark:bg-[#1f1f1f]`}
      >
        <div className="absolute left-0 top-[15%] flex w-full flex-col justify-center space-y-0.5 overflow-hidden text-center font-semibold italic leading-[.6rem]">
          <h2 className="rounded-xl text-center font-mono text-[.5rem] leading-[.45rem]">
            {ForecastDay}
          </h2>
          <h2 className="text-[.62rem]">{ForecastTime}</h2>
        </div>

        <div className="flex size-full flex-col items-center justify-center pb-1 pt-5">
          <img
            className="bg-gray bg-red-00 h-[45%] w-[60%]"
            src={`${description}.png`}
            alt=""
            loading="lazy"
          />
          <h1 className="dark:text-ts pt-1 text-[.85em] font-[600]">
            {temp}°C
          </h1>
        </div>
      </div>
    </div>
  );
});

export default memo(ThreeHourlyForecast);
