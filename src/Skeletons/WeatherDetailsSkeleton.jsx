import React from "react";
import MinMaxTempSkeleton from "./MinMaxTempSkeleton";
import SquareDivSkeleton from "./SquareDivSkeleton";
import SunriseSunsetSkeleton from "./SunriseSunsetSkeleton";

const WeatherDetailsSkeleton = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-center dark:bg-inherit">
      {/* Title */}
      <div className="mt-[5%] flex h-5 w-[85%] animate-pulse rounded-xl bg-black/15 dark:bg-white/10"></div>

      <div className="mt-[4.5%] overflow-hidden px-[1%] pb-5">
        <div className="flex w-full flex-wrap items-center justify-evenly gap-3">
          <SquareDivSkeleton />
          <SquareDivSkeleton />
          <MinMaxTempSkeleton />
          <SquareDivSkeleton />
          <SquareDivSkeleton />
          <SquareDivSkeleton />
          <SquareDivSkeleton />
          <SunriseSunsetSkeleton />
        </div>
      </div>
    </section>
  );
};

export default WeatherDetailsSkeleton;
