import React, { memo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useApiData } from "../../Context/ApiContext";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecastCard from "./DailyForecastCard";

const Hero = () => {
  const { dailyData } = useApiData();
  return (
    <div className="fixed top-0 flex h-[53vh] w-full flex-col items-center justify-center bg-gradient-to-t from-blue-500 via-blue-100 to-white/95 pb-[2%] shadow-md shadow-black dark:from-blue-100 dark:via-white/10 dark:to-white/5 md:w-[375px]">
      <Swiper
        className="h-[75%] w-full"
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        modules={[Pagination]}
        pagination={{ dynamicBullets: true }}
      >
        <SwiperSlide className="flex items-center justify-center">
          <CurrentWeatherCard />
        </SwiperSlide>

        {dailyData !== undefined ? (
          dailyData.map((_, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <DailyForecastCard index={index} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="flex items-center justify-center">
            <p>No forecast available</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default memo(Hero);
