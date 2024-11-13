import React from "react";

export default function MinMaxTempSkeleton() {
  return (
    <div className="relative mb-2 flex h-[6rem] w-[97%] animate-pulse items-center justify-between overflow-hidden rounded-xl border-white/20 bg-[#1f1f1f] px-3 shadow-lg shadow-black">
      {/* Animated Underline */}
      <div className="absolute bottom-0 h-full w-[60%] translate-x-[80%] -skew-x-12 rounded-lg bg-gray-500 opacity-30" />

      <div className="relative flex h-[82%] w-full items-center justify-between space-x-2 rounded-lg">
        {/* Min */}
        <div className="z-10 flex h-full w-[40%] justify-center gap-3 pl-4 pt-[1%]">
          <div className="flex flex-col items-center">
            <div className="h-4 w-16 rounded bg-gray-500" /> {/* Min label */}
            <div className="mt-2 h-6 w-24 rounded bg-gradient-to-br from-gray-400 to-gray-500" />{" "}
            {/* Min temperature */}
          </div>
          <div className="h-full w-9 rounded bg-gray-500" />{" "}
          {/* Icon placeholder */}
        </div>

        {/* Max */}
        <div className="z-10 flex h-full w-[40%] justify-start gap-3 pt-[1%]">
          <div className="flex flex-col items-center">
            <div className="h-4 w-16 rounded bg-gray-500" /> {/* Max label */}
            <div className="mt-2 h-6 w-24 rounded bg-gradient-to-br from-gray-400 to-gray-500" />{" "}
            {/* Max temperature */}
          </div>
          <div className="h-full w-9 rounded bg-gray-500" />
        </div>
      </div>
    </div>
  );
}
