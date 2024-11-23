import React from "react";

export default function MinMaxTempSkeleton() {
  return (
    <div className="relative mb-2 flex h-[5.75rem] w-[97%] animate-pulse items-center justify-between overflow-hidden rounded-xl border-white/20 bg-white/25 px-3 shadow-md shadow-black/40 dark:bg-black">
      {/* Animated div */}
      <div className="absolute bottom-0 h-full w-[60%] translate-x-[80%] -skew-x-12 rounded-lg bg-gray-500 opacity-30 dark:bg-white/50" />

      <div className="relative flex h-[82%] w-full items-center justify-between space-x-2 rounded-lg">
        {/* Min */}
        <div className="z-10 flex h-full w-[40%] justify-center gap-3 pl-4 pt-[1%]">
          <div className="flex flex-col items-center">
            {/* Min label */}
            <span className="h-4 w-16 rounded bg-black/20 dark:bg-white/20"></span>
            {/* Min temperature */}
            <span className="mt-2 h-6 w-24 rounded bg-black/20 dark:bg-white/20"></span>
          </div>
          <span className="h-full w-9 rounded bg-black/20 dark:bg-white/20"></span>
        </div>

        {/* Max */}
        <div className="z-10 flex h-full w-[40%] justify-start gap-3 pt-[1%]">
          <div className="flex flex-col items-center">
            {/* Max label */}
            <span className="h-4 w-16 rounded bg-black/20 dark:bg-white/20"></span>
            {/* Max temperature */}
            <span className="mt-2 h-6 w-24 rounded bg-black/20 dark:bg-white/20"></span>
          </div>
          <span className="h-full w-9 rounded bg-black/20 dark:bg-white/20"></span>
        </div>
      </div>
    </div>
  );
}
