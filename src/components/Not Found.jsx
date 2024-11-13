import React, { memo } from "react";
import { useApiData } from "../Context/ApiContext";
import { useSearchModal } from "../Context/SearchModalContext";

const NotFound = ({ err }) => {
  const { loading } = useApiData();
  const { openModal } = useSearchModal();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-y-8 bg-white font-oxanium">
      <img
        src="/NotFound.jpg"
        alt=""
        loading="lazy"
        className="mt-9 h-[43%] w-full bg-cover"
      />

      {loading ? (
        <h1 className="mt-5 text-2xl font-semibold text-blue-500">
          Searching...
        </h1>
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <h1 className="w-full text-center text-xl font-semibold text-red-500">
              {err}
            </h1>
          </div>
          <button
            onClick={openModal}
            className="h-9 w-36 rounded-full border-b-2 border-r-2 border-black/40 bg-blue-500 font-semibold text-white"
          >
            Search Again
          </button>
        </>
      )}
    </div>
  );
};

export default memo(NotFound);
