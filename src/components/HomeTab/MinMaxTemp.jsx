import React, { useState } from "react";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import MinMaxTempSkeleton from "../../Skeletons/MinMaxTempSkeleton";
import { useApiData } from "../../Context/ApiContext";
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
      className="relative mb-3 flex h-[6rem] w-[97%] items-center justify-between overflow-hidden rounded-xl border-white/20 bg-[#1f1f1f] px-3 shadow-lg shadow-black/80"
    >
      {/* Animated Underline */}
      <div
        className={`${!activeTab ? "translate-x-[80%]" : "right-[50%]"} absolute bottom-0 h-full w-[60%] -skew-x-12 rounded-lg border-t bg-gradient-to-tr from-white/10 via-white/35 to-white/10 transition-all duration-500 ease-in-out`}
      />

      <div className="relative flex h-[82%] w-full items-center justify-between space-x-2 rounded-lg">
        {/* Min Temp*/}
        <div className="z-10 flex h-full w-[40%] cursor-pointer justify-center gap-3 pl-4 pt-[1%] text-blue-300 transition-all duration-1000 ease-in-out">
          <div>
            <h1 className="border-b border-white/50 pl-1 pr-4 text-start font-bold italic">
              Min
            </h1>
            <h1 className="mt-2 bg-gradient-to-br from-white via-blue-300 to-black bg-clip-text text-[1.5rem] font-extrabold text-transparent">
              {min}°C
            </h1>
          </div>
          <FaTemperatureArrowDown className="h-full w-9" />
        </div>

        {/* Max Temp*/}
        <div className="activeTab z-10 flex h-full w-[40%] cursor-pointer justify-start gap-3 pt-[1%] text-orange-200 transition-all duration-1000 ease-in-out">
          <div>
            <h1 className="rounded-sm border-b border-white/50 pl-1 pr-4 text-start font-bold italic backdrop-blur-lg">
              Max
            </h1>
            <h1 className="activeTab to-blackfrom-white mt-2 bg-gradient-to-br from-white via-orange-200 to-white/10 bg-clip-text text-[1.5rem] font-extrabold text-transparent">
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
