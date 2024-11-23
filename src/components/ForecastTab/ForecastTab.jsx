import React, { lazy, memo, useState } from "react";
import { GiSideswipe } from "react-icons/gi";
import { MdArrowCircleLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useApiData } from "../../Context/ApiContext";
import ThreeHourlyChart from "../Charts/ThreeHourlyChart";
import Footer from "../Footer";
import DailyCards from "./DailyCards";
import ThreeHourlyCards from "./ThreeHourlyCards";
const DailyChart = lazy(() => import("../Charts/DailyChart"));

const ForecastTab = () => {
  const { dailyData, threeHourlyData, loading } = useApiData();
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Function to handle slide change and scroll to top
  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white/85 font-oxanium text-base text-black dark:bg-[#282828] dark:text-white/90">
      <nav className="fixed top-0 z-40 flex h-9 w-full items-center justify-center bg-white dark:bg-[#434343] md:w-[375px]">
        <button
          onClick={handleBackClick}
          className="absolute left-[3%] h-[75%] w-[9%] rounded-md text-black/70 active:shadow-none dark:text-white/70"
        >
          <MdArrowCircleLeft className="h-full w-full" />
        </button>
        <h1 className="text-[1rem] font-semibold italic">
          Forecast
          <span className="text-sm">
            ({activeSlideIndex === 0 ? " Daily " : " 3 Hourly "})
          </span>
        </h1>
      </nav>
      <Swiper
        className="h-full w-full"
        autoHeight={true}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className="slide-1 flex h-full flex-col items-center justify-center pt-12">
          <DailyChart />
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-y-4 rounded-t-3xl bg-[#f6f5f5] dark:border-white/10 dark:bg-black/15 dark:text-inherit">
            <h1 className="ml-[4.4rem] mt-4 w-full text-[.9rem] font-semibold italic">
              Next 5 Days
            </h1>
            {dailyData &&
              dailyData.map((item, index) => (
                <DailyCards
                  key={index}
                  index={index}
                  epoc={item.dt}
                  temp={Math.round(item.main.temp)}
                  feelsLike={Math.round(item.main.feels_like)}
                  description={item.weather[0].description}
                  isDayOrNight={item.sys.pod}
                />
              ))}
            <div className="mb-20 mt-3 flex w-full flex-col items-center justify-center gap-2">
              <h1 className="flex gap-3 font-semibold text-blue-500">
                Swipe Left
                <GiSideswipe className="size-5" />
              </h1>
              <h1 className="text-sm italic">To See 3 hourly forecast</h1>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide-2 flex w-full flex-col items-center justify-center pt-12">
          <ThreeHourlyChart />
          <div className="z-10 mt-6 flex w-full flex-col items-center justify-center gap-y-4 rounded-t-3xl bg-[#f6f5f5] dark:border-white/10 dark:bg-black/15 dark:text-inherit">
            <h1 className="ml-[4.4rem] mt-4 w-full text-[.88rem] font-semibold italic">
              Next 5 Days (3 hourly)
            </h1>
            {threeHourlyData &&
              threeHourlyData.map((item, index) => (
                <ThreeHourlyCards
                  key={index}
                  index={index}
                  temp={Math.round(item.main.temp)}
                  feelsLike={Math.round(item.main.feels_like)}
                  windDirection={item.wind.deg + 180}
                  description={item.weather[0].description}
                  isDayOrNight={item.sys.pod}
                  epoc={item?.dt}
                />
              ))}
            <Footer />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default memo(ForecastTab);
