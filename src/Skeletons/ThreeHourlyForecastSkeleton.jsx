import React from "react";

export default function ThreeHourlyForecastSkeleton() {
  return (
    <div className="h-50 w-full rounded-md bg-inherit">
      {/* TITLE */}
      <div className="mb-1 ml-[2%] flex w-[95%] flex-row flex-wrap items-center justify-between gap-4 px-2 py-1.5 pl-[6%]">
        <h1 className="h-3 w-24 animate-pulse rounded-md bg-black/10 dark:bg-white/5"></h1>
        <h1 className="h-3 w-20 animate-pulse rounded-md bg-black/10 dark:bg-white/5"></h1>
      </div>

      {/* Cards/Slides Container */}
      <div className="flex gap-4 pl-5 pt-2">
        <div className="group relative flex h-[6.5rem] w-[3.75rem] animate-pulse justify-center rounded-[1.7em] bg-black/10 dark:bg-white/5"></div>
        <div className="group relative flex h-[6.5rem] w-[3.75rem] animate-pulse justify-center rounded-[1.7em] bg-black/10 dark:bg-white/5"></div>
        <div className="group relative flex h-[6.5rem] w-[3.75rem] animate-pulse justify-center rounded-[1.7em] bg-black/10 dark:bg-white/5"></div>
        <div className="group relative flex h-[6.5rem] w-[3.75rem] animate-pulse justify-center rounded-[1.7em] bg-black/10 dark:bg-white/5"></div>
        <div className="group relative flex h-[6.6rem] w-[2.9rem] animate-pulse justify-center rounded-l-[1.7em] bg-black/10 dark:bg-white/5"></div>
      </div>
    </div>
  );
}
