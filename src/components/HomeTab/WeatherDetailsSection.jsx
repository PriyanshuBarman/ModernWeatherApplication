import React, { memo } from "react";
import {
  FaCloudversify,
  FaRegEye
} from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { SiRainmeter } from "react-icons/si";
import { useApiData } from "../../Context/ApiContext";
import SunriseSunsetSkeleton from "../../Skeletons/SunriseSunsetSkeleton";
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
          <h1 className="flex w-[92%] items-center justify-center rounded-full bg-black/5 py-1 text-[.9rem] font-[500] italic leading-4 text-black/80 dark:bg-white/10 dark:text-white/60">
            Todays Highlight
          </h1>
        </div>
      )}

      {/* Cards Container */}
      <div className={`overflow-hidden px-[1%] pb-5 pt-4`}>
        <div className="flex w-full flex-wrap items-center justify-evenly gap-x-3 gap-y-1">
          <SquareDiv
            unit={currentData.humidity}
            title={"Humidity"}
            unitname={"%"}
            icon={<SiRainmeter className="h-full w-12" />}
          />
          <SquareDiv
            unit={currentData.clouds}
            title={"Cloudiness"}
            unitname={"%"}
            icon={<FaCloudversify className="h-12 w-14" />}
          />
          <MinMaxTemp max={currentData.maxTemp} min={currentData.minTemp} />
          <SquareDiv
            unit={currentData.windSpeed}
            title={"Wind"}
            unitname={"km/h"}
            icon={<FaWind className="h-full w-9" />}
          />
          <SquareDiv
            title={"Wind Direction"}
            icon={
              <LiaLocationArrowSolid
                className="h-full w-20"
                style={{
                  transform: `rotate(${currentData.windDirection}deg)`,
                }}
              />
            }
          />
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
