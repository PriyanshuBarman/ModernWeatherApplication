import React from "react";
import CardSkeleton from "./CardSkeleton";
import SquareDivSkeleton from "./SquareDivSkeleton";

const PreviewSkeleton = () => {
  return (
    <div className="container flex w-full flex-wrap items-center justify-center bg-[#f2f2f2] dark:bg-[#272727]">
      <nav className="relative z-40 mb-4 flex h-9 w-full items-center justify-center bg-white dark:bg-[#434343]">
        <span className="absolute left-3 size-7 animate-pulse rounded-full bg-black/15 dark:bg-white/15"></span>
        <span className="left-38 absolute h-4 w-28 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></span>
      </nav>

      {/* Chart */}
      <div className="mt-5 flex w-full justify-center">
        <CardSkeleton />
      </div>

      <section className="mt-9 flex w-full flex-wrap items-center justify-evenly gap-2">
        <SquareDivSkeleton />
        <SquareDivSkeleton />
        <SquareDivSkeleton />
        <SquareDivSkeleton />
        <SquareDivSkeleton />
        <SquareDivSkeleton />
      </section>
    </div>
  );
};

export default PreviewSkeleton;
