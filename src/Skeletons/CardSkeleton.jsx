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

      <div className="absolute right-[8%] top-[20%] flex flex-col items-center justify-center gap-1 font-oswald text-[3.3em]">
        <h1 className="mr- mb-2 h-14 w-28 animate-pulse rounded-lg bg-white/75"></h1>

        <span className="flex flex-col items-center font-oxanium text-[.32em] font-[600] md:text-sm">
          <h2 className="mb-1 h-4 w-32 animate-pulse rounded-lg bg-white/75"></h2>
          <h2 className="mt-[7%] h-5 w-20 animate-pulse rounded-lg bg-white/75"></h2>
        </span>
      </div>

      <span className="absolute bottom-[20%] left-[8%] flex w-[35%] flex-col gap-2 text-[1.4em] font-[600] capitalize italic leading-5 md:text-sm">
        <h1 className="h-6 w-full animate-pulse rounded-lg bg-white/75"></h1>
        <h2 className="h-4 w-24 animate-pulse rounded-lg bg-white/75"></h2>
      </span>
    </div>
  );
}
