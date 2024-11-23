import React from "react";

export default function CardSkeleton() {
  return (
    <div className="relative flex h-[12.9em] w-[94%] flex-col items-center overflow-hidden rounded-[1.7em] bg-gradient-to-t from-[#1973fa] to-[#3786fd] text-white/95 shadow-lg shadow-black/70 dark:from-[#232323] dark:to-[#363636]">
      <svg
        className="rounded-lg-t-3xl absolute bottom-0 rotate-[180deg] fill-sky-100 dark:fill-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        fill="#000"
      >
        <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
        <path
          d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
          opacity=".5"
        ></path>
        <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
        <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
      </svg>

      <div className="absolute right-[7%] top-[19%] flex flex-col items-center justify-center gap-1">
        <span className="mb-2 h-14 w-24 animate-pulse rounded-lg bg-white/75 dark:bg-white/30"></span>

        <div className="flex flex-col items-center">
          <span className="mb-1 h-4 w-[7.5rem] animate-pulse rounded-md bg-white/75 dark:bg-white/30"></span>
          <span className="mt-3 h-3 w-24 animate-pulse rounded-lg bg-white/75 dark:bg-white/30"></span>
        </div>
      </div>

      <div className="absolute bottom-[23%] left-[8%] flex w-[39%] flex-col gap-2">
        <span className="h-5 w-full animate-pulse rounded-md bg-white/75 dark:bg-white/30"></span>
        <span className="h-2.5 w-20 animate-pulse rounded-md bg-white/75 dark:bg-white/30"></span>
      </div>
    </div>
  );
}
