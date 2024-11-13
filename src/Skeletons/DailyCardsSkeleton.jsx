import React from "react";

const DailyCardsSkeleton = () => {
  return (
    <div className="animate pulse relative flex h-[7em] w-[87%] overflow-hidden rounded-xl bg-white text-black shadow-[1.5px_1.5px_3px_1px] shadow-black/50 dark:bg-[#1d1d1d]">
      <h1 className="absolute left-0 top-0 h-5 w-[33%] animate-pulse rounded-br-2xl bg-black/15 dark:bg-white/10"></h1>
    </div>
  );
};

export default DailyCardsSkeleton;
