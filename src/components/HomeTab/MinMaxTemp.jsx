import React, { useState } from "react";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { useApiData } from "../../Context/ApiContext";
import MinMaxTempSkeleton from "../../Skeletons/MinMaxTempSkeleton";
function MinMaxTemp({ max, min }) {
  const { loading } = useApiData();
  const [activeTab, setActiveTab] = useState(false);
  function toogle() {
    setActiveTab(!activeTab);
  }
  if (loading) {
    return <MinMaxTempSkeleton />;
  }
  return (
    <div
      onClick={toogle}
      className="relative mb-3 flex h-[6rem] w-[95%] items-center justify-between overflow-hidden rounded-xl border-t border-black/20 bg-white/25 px-3 shadow-md shadow-black/50 dark:border-white/20 dark:bg-[#1f1f1f]"
    >
      {/* Animated Underline */}
      <div
        className={`${!activeTab ? "translate-x-[80%]" : "right-[50%]"} absolute bottom-0 h-full w-[60%] -skew-x-12 rounded-lg  transition-all duration-500 ease-in-out dark:border-t dark:border-white bg-black/10 dark:bg-white/10`}
      />

      <div className="relative flex h-[82%] w-full items-center justify-between space-x-2 rounded-lg">
        {/* Min Temp*/}
        <div className="z-10 flex h-full w-[40%] cursor-pointer justify-center gap-3 pl-4 pt-[1%] text-black/60 transition-all duration-1000 ease-in-out dark:text-white/70">
          <div>
            <h1 className="border-b border-black/40 pl-1 pr-4 text-start font-bold italic leading-5 dark:border-white/50">
              Min
            </h1>
            <h1 className="mt-2 text-transparent text-[1.5rem] font-extrabold dark:from-white bg-gradient-to-b from-black/80 to-transparent bg-clip-text">
              {min}°C
            </h1>
          </div>
          <FaTemperatureArrowDown className="h-full w-9" />
        </div>

        {/* Max Temp*/}
        <div className="activeTab z-10 flex h-full w-[40%] cursor-pointer justify-start gap-3 pt-[1%] text-black/60 transition-all duration-1000 ease-in-out dark:text-white/70">
          <div>
            <h1 className="rounded-sm border-b border-black/40 pl-1 pr-4 text-start font-bold italic leading-5 backdrop-blur-lg dark:border-white/50">
              Max
            </h1>
            <h1 className="activeTab mt-2 dark:from-white bg-gradient-to-b from-black/80 to-transparent bg-clip-text text-[1.5rem] font-extrabold text-transparent">
              {max}°C
            </h1>
          </div>
          <FaTemperatureArrowUp className="h-full w-9" />
        </div>
      </div>
    </div>
  );
}

export default MinMaxTemp;
