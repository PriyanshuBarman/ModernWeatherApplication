import React, { memo } from "react";
import { useApiData } from "../Context/ApiContext";
import { useSearchModal } from "../Context/SearchModalContext";

const NotFound = () => {
  const { loading, err } = useApiData();
  const { openModal } = useSearchModal();
  return (
    <div
      className={`fixed top-0 z-40 flex h-full w-full flex-col items-center gap-y-2 bg-white font-oxanium dark:bg-white/10 md:w-[375px]`}
    >
      {loading ? (
        <h1 className="mt-72 flex h-full w-full flex-wrap items-start justify-center text-2xl font-semibold italic text-blue-500">
          Please Wait.. .
        </h1>
      ) : (
        <>
          <div className="mt-5 flex h-[35%] w-full justify-center">
            <img
              src="/NotFoundLocation.png"
              alt=""
              className="mt-9 h-full bg-cover"
            />
          </div>

          <div className="mt-12 flex w-full flex-col items-center justify-center gap-y-10">
            <h1 className="ml-5 w-[90%] text-start text-lg font-semibold italic text-red-500 dark:text-white/90">
              {err}
            </h1>
            <button
              onClick={openModal}
              className="h-9 w-36 rounded-full border-b-2 border-r-2 border-black/40 bg-blue-500 text-[.92rem] font-[500] text-white dark:bg-white/15 dark:text-white/80"
            >
              Search again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(NotFound);
