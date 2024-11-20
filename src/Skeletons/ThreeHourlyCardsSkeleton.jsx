import React from "react";

const ThreeHourlyCardsSkeleton = () => {
  return (
    <div className="relative flex h-[6.1rem] w-[85%] cursor-pointer items-center justify-around overflow-hidden rounded-xl bg-white pr-4 shadow-[.7px_.7px_1px_.7px] shadow-black/50 dark:bg-[#1d1d1d]">
      <h1 className="absolute left-0 top-0 h-4 w-[45%] animate-pulse rounded-br-2xl bg-black/15 dark:bg-white/15"></h1>
      <div className="image-div flex h-full w-[30%] items-center">
        <div className="ml-3.5 mt-1.5 size-14 animate-pulse rounded-full bg-black/5 dark:bg-white/15"></div>
      </div>
      <div className="flex h-full w-[25%] flex-col items-center justify-evenly text-black/70 dark:text-inherit">
        <h1 className="h-2 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h2 className="h-4 w-full animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h2>
      </div>
      <div className="mt-2.5 flex h-full flex-col items-center justify-center gap-2">
        <h1 className="h-7 w-14 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-2 w-16 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
        <h1 className="h-2 w-20 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
      </div>
    </div>
  );
};

export default ThreeHourlyCardsSkeleton;
