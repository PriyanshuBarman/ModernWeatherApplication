import React from "react";

const DailyChartSkeleton = () => {
  return (
    <div className="flex h-[13rem] w-[95%] flex-col items-center justify-between rounded-2xl bg-white/90 px-2 pb-3 pt-3 shadow-md shadow-black/80 dark:bg-[#1f1f1f]">
      <div className="ml-1 mt-1 flex w-[95%] flex-row flex-wrap items-center justify-between gap-4">
        <h1 className="h-4 w-20 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-3.5 w-20 animate-pulse rounded-3xl bg-black/15 dark:bg-white/15"></h1>
      </div>

      <div className="flex h-4 w-full justify-around gap-2">
        <h1 className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-2 w-12 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
      </div>
    </div>
  );
};

export default DailyChartSkeleton;
