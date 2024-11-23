import React from "react";

const ThreeHourlyChartSkeleton = () => {
  return (
    <div className="relative flex h-[12.7rem] w-[95%] flex-col items-center justify-between overflow-hidden rounded-2xl bg-white/90 px-2 pb-3 pt-3 shadow-md shadow-black/80 dark:bg-[#1f1f1f]">
      <span className="absolute left-0 top-0 h-5 w-[45%] animate-pulse rounded-br-3xl bg-black/30 dark:bg-white/35"></span>

      <div className="absolute bottom-2 flex h-4 w-full justify-around gap-2 px-3">
        <span className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/30"></span>
        <span className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/30"></span>
        <span className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/30"></span>
        <span className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/30"></span>
        <span className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/30"></span>
      </div>
    </div>
  );
};

export default ThreeHourlyChartSkeleton;
