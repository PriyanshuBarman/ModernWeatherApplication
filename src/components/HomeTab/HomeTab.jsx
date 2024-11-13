import React, { lazy, memo, Suspense } from "react";
import DailyChartSkeleton from "../../Skeletons/DailyChartSkeleton";
import ThreeHourlyForecastSkeleton from "../../Skeletons/ThreeHourlyForecastSkeleton";
import WeatherDetailsSkeleton from "../../Skeletons/WeatherDetailsSkeleton";
import Footer from "../Footer";
import Header from "./Header";
import Hero from "./Hero";
const ThreeHourlyForecast = lazy(() => import("./ThreeHourlyForecast"));
const ThreeHourlyChart = lazy(() => import("../Charts/ThreeHourlyChart"));
const WeatherDetailsSection = lazy(() => import("./WeatherDetailsSection"));

const HomeTab = () => {
  return (
    <div className="container flex h-full w-full flex-col font-oxanium text-black dark:bg-[#141414] dark:text-white">
      <Header />
      <Hero />

      <section className="z-20 mt-[95%] flex w-full flex-wrap items-center justify-center overflow-hidden rounded-t-[1.7em] border-t border-white/50 bg-[#fbfbfb] dark:bg-[#272727] md:mt-[89%]">
        <span className="mb-2 mt-1 flex h-[1%] w-full items-center justify-center bg-inherit">
          <span className="dark:bg-tp/80 h-[.21rem] w-[22%] rounded-full bg-black/20"></span>
        </span>
        <Suspense fallback={<ThreeHourlyForecastSkeleton />}>
          <ThreeHourlyForecast />
        </Suspense>
        <Suspense fallback={<WeatherDetailsSkeleton />}>
          <WeatherDetailsSection />
        </Suspense>
        <Suspense fallback={<DailyChartSkeleton />}>
          <ThreeHourlyChart />
        </Suspense>

        <Footer />
      </section>
    </div>
  );
};

export default memo(HomeTab);
