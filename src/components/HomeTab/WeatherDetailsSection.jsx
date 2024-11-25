import React, { memo } from "react";
import { FaCloudversify, FaRegEye } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { SiRainmeter } from "react-icons/si";
import { useApiData } from "../../Context/ApiContext";
import SquareDivSkeleton from "../Skeletons/SquareDivSkeleton";
import SunriseSunsetSkeleton from "../Skeletons/SunriseSunsetSkeleton";
import SunriseSunset from "../Charts/SunriseSunset";
import SquareDiv from "../SquareDiv";
import MinMaxTemp from "./MinMaxTemp";
const WeatherDetailsSection = () => {
  const { currentData, loading } = useApiData();
  return (
    <section className="relative flex w-full flex-col items-center justify-center dark:bg-inherit">
      {/* Title */}
      {loading ? (
        <div className="mt-[5%] flex h-5 w-[85%] animate-pulse rounded-xl bg-black/10 dark:bg-white/10"></div>
      ) : (
        <div className="relative flex h-5 w-full items-center justify-center">
          <h1 className="flex w-[92%] items-center justify-center rounded-full bg-black/5 py-1 text-[.9rem] font-[500] italic leading-4 text-black/80 dark:bg-white/10 dark:text-white/70">
            Todays Highlight
          </h1>
        </div>
      )}

      {/* Cards Container */}
      <div className={`overflow-hidden px-[1%] pb-6 pt-4`}>
        <div className="flex w-full flex-wrap items-center justify-evenly gap-x-3 gap-y-1">
          <SquareDiv
            unit={currentData.humidity}
            title={"Humidity"}
            unitname={"%"}
            icon={<SiRainmeter className="h-full w-11" />}
          />
          <SquareDiv
            unit={currentData.clouds}
            title={"Clouds"}
            unitname={"%"}
            icon={<FaCloudversify className="h-12 w-14" />}
          />
          <MinMaxTemp max={currentData.maxTemp} min={currentData.minTemp} />
          <SquareDiv
            unit={currentData.windSpeed}
            title={"Wind"}
            unitname={"km/h"}
            icon={<FaWind className="h-full w-8" />}
          />
          {loading ? (
            <SquareDivSkeleton />
          ) : (
            <>
              {/* Wind Direction */}
              <div className="relative mb-4 flex h-[7.6rem] w-[8.9rem] flex-col items-center justify-between rounded-[1.1em] rounded-tl-md bg-white/25 pb-1 pr-3 pt-3 shadow-[3px_5px_5px_.2px] shadow-black/50 active:shadow-[inset_2px_3px_5px_.1px] dark:bg-black/5 dark:text-white dark:shadow-black">
                <div className="w-full">
                  <h1 className="text- flex h-[1.55rem] w-[79%] items-center rounded-r-md bg-gradient-to-l from-transparent to-black/25 pl-3 text-start text-[.85em] font-[500] italic leading-3 dark:rounded-l-sm dark:to-white/40 dark:text-white/80">
                    Wind Direction
                  </h1>
                </div>
                <div className="mb-3 flex w-full items-center justify-center">
                  <LiaLocationArrowSolid
                    className="h-full w-[4.5rem] text-black/60 dark:text-slate-200"
                    style={{
                      transform: `rotate(${currentData.windDirection}deg)`,
                    }}
                  />
                </div>
                <div className="absolute bottom-[8%] left-[10%] h-[.45rem] w-[80%] -skew-x-12 bg-black/15 dark:bg-white/20"></div>
              </div>
            </>
          )}
          <SquareDiv
            unit={currentData.pressure}
            title={"Pressure"}
            unitname={"hPa"}
          />
          <SquareDiv
            unit={currentData.visibility}
            title={"Visibility"}
            unitname={"Km"}
            icon={<FaRegEye className="h-full w-10" />}
          />
          {loading ? <SunriseSunsetSkeleton /> : <SunriseSunset />}
        </div>
      </div>
    </section>
  );
};

export default memo(WeatherDetailsSection);
