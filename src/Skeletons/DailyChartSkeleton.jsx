import React from "react";

const DailyChartSkeleton = () => {
  return (
    <div className="z-10 flex h-52 w-[95%] flex-col items-center justify-between rounded-2xl bg-white/90 to-transparent px-2 pt-5 pb-3 shadow-md shadow-black/80 dark:bg-[#1f1f1f]">

      <div className="mb-1 ml-[2%] flex w-[95%] flex-row flex-wrap items-center justify-between gap-4">
        <h1 className="h-4 w-32 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
        <h1 className="h-3 w-20 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
      </div>

      <div className="h-4 w-full justify-around flex gap-2">
      <h1 className="h-3 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
      <h1 className="h-3 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
      <h1 className="h-3 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
      <h1 className="h-3 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
      <h1 className="h-3 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/5"></h1>
      </div>
    </div>
  );
};

export default DailyChartSkeleton;
