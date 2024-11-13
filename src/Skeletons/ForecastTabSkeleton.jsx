import React from "react";
import DailyCardsSkeleton from "./DailyCardsSkeleton";
import DailyChartSkeleton from "./DailyChartSkeleton";

const ForecastTabSkeleton = () => {
  const cardsArray = new Array(5).fill(0);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white/85 dark:bg-[#282828]">
      <nav className="relative z-40 mb-4 flex h-9 w-full items-center justify-center bg-white dark:bg-[#434343]">
        <h1 className="absolute left-3 size-7 animate-pulse rounded-full bg-black/15 dark:bg-white/15"></h1>
        <h1 className="left-38 absolute h-5 w-24 -skew-x-6 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
      </nav>
      <DailyChartSkeleton />

      {/* Cards Container */}
      <div className="relative z-20 mt-8 flex w-full flex-col items-center justify-center gap-4 rounded-t-3xl bg-[#f6f5f5] pb-20 pt-14 dark:border-white/10 dark:bg-black/10 dark:text-inherit">
        {/* Title */}
        <h1 className="absolute left-7 top-0 mt-4 h-5 w-24 animate-pulse rounded-md bg-black/10 dark:bg-white/15"></h1>
        {cardsArray.map((_, index) => (
          <DailyCardsSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ForecastTabSkeleton;
