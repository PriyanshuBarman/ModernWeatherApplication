import React from "react";

export default function SunriseSunsetSkeleton() {
  return (
    <div className="relative mt-2 flex h-[10.7rem] w-[95%] animate-pulse flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#f8f8f8] shadow-md shadow-black/60 dark:bg-[#1d1d1d] dark:text-white">
      <h1 className="absolute left-0 top-0 h-4 w-[40%] animate-pulse rounded-br-3xl bg-black/30 px-4 pt-0.5 dark:bg-white/60"></h1>
    </div>
  );
}
