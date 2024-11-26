import React from "react";

export default function SquareDivSkeleton() {
  return (
    <div className="rounded-tl-mdborder relative mb-4 flex h-[7.6rem] w-[8.9rem] flex-col items-center justify-between rounded-[1.2em] rounded-tl-sm border-white/10 bg-white/25 pb-1 pr-3 pt-3 shadow-[3px_5px_5px_.2px] shadow-black/50 active:shadow-xl dark:bg-black/20 dark:text-white dark:shadow-[3px_5px_9px_.2px_black]">
      <div className="w-full">
        <div className="h-7 w-[79%] animate-pulse rounded-md bg-black/20 dark:bg-white/15"></div>
      </div>

      <div className="flex w-full items-center justify-around px-3.5">
        <div className="h-ful mb-6 flex pt-4">
          <span className="h-9 w-9 animate-pulse rounded-md bg-black/20 dark:bg-white/15"></span>

          <span className="tanimate-pulse ml-1 mt-2 h-2 w-7 rounded-md bg-black/20 dark:bg-white/15"></span>
        </div>
        <div className="mb-6 text-black/60 dark:text-slate-200"></div>
      </div>
      <div className="absolute bottom-[8%] left-[10%] h-2 w-[80%] -skew-x-12 animate-pulse rounded-sm bg-black/20 dark:bg-white/15"></div>
    </div>
  );
}
