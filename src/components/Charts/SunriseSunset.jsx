import React, { useMemo } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { PiSunFill } from "react-icons/pi";
import { useApiData } from "../../Context/ApiContext";
import { useTime } from "../../Context/TimeContext";

const SunriseSunset = () => {
  const { epochTimeConverter } = useTime();
  const { currentData, timeZone } = useApiData();
  const sunrise =
    epochTimeConverter(currentData?.sunRise, timeZone) || "06:00 AM";
  const sunset =
    epochTimeConverter(currentData?.sunSet, timeZone) || "06:00 PM";
  let currentTime;
  if (currentData.countryCode === "IN") {
    currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    currentTime = epochTimeConverter(currentData?.epoc, timeZone);
  }

  const getTimeInMinutes = (time) => {
    if (!time) return 0;
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const currentTimeInMinutes = getTimeInMinutes(currentTime);
  const sunriseMinutes = useMemo(() => getTimeInMinutes(sunrise), [sunrise]);
  const sunsetMinutes = useMemo(() => getTimeInMinutes(sunset), [sunset]);
  const isDaytime =
    currentTimeInMinutes >= sunriseMinutes &&
    currentTimeInMinutes < sunsetMinutes;

  const calculateSunPositionAngle = () => {
    if (isDaytime) {
      const timeSinceSunrise = currentTimeInMinutes - sunriseMinutes;
      const totalDaylight = sunsetMinutes - sunriseMinutes;
      return (timeSinceSunrise / totalDaylight) * 180;
    } else {
      const timeSinceSunset =
        currentTimeInMinutes >= sunsetMinutes
          ? currentTimeInMinutes - sunsetMinutes
          : currentTimeInMinutes + (1440 - sunsetMinutes);
      const totalNighttime = 1440 - sunsetMinutes + sunriseMinutes;
      return 180 + (timeSinceSunset / totalNighttime) * 180;
    }
  };

  const sunPositionAngle = calculateSunPositionAngle();

  const calculateSunPosition = (angle) => {
    const radius = 40;
    const centerX = 50;
    const centerY = 50;
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY - radius * Math.sin(radians),
    };
  };

  const { x: sunXPosition, y: sunYPosition } =
    calculateSunPosition(sunPositionAngle);

  const totalMinutes = sunsetMinutes - sunriseMinutes;
  const dayLight = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;

  return (
    <div className="relative mt-4 flex active:shadow-[0px_-1px_2px_0px] w-[95%] flex-col items-center overflow-hidden rounded-2xl rounded-tl-xl border-r border-t border-black/30 bg-[#ffffff] text-xs shadow-[2px_4px_5px_.2px] shadow-black/50 dark:border-white/5 dark:bg-[#212121] dark:text-white dark:shadow-black">
      <h1 className="absolute top-0 mt-1 flex items-center rounded-b-xl px-4 italic leading-3">
        {currentTime}
      </h1>
      <h1 className="absolute left-0 top-0 -skew-x-12 whitespace-pre rounded-br-3xl bg-[#cbcbcb] px-5 py-0.5 text-[.62rem] font-[500] dark:bg-white/20">
        Daylight: {dayLight}
      </h1>

      <div className="relative flex h-[15em] w-full items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            d="M 90 50 A 40 40 0 0 0 10 50"
            stroke="rgb(226,135,67)"
            className="fill-transparent"
            strokeWidth="1.2"
          />
          <path
            d="M 10 50 A 40 40 0 0 0 90 50"
            stroke="gray"
            className="fill-transparent"
            strokeWidth="1.2"
          />
          <g
            className="absolute"
            style={{
              transform: `translate(${sunXPosition}%, ${sunYPosition}%)`,
            }}
          >
            <circle
              r="3.7"
              className={`${isDaytime ? "fill-orange-600" : "fill-gray-700 dark:fill-gray-100"} animate-ping`}
              opacity="0.75"
            />
          </g>
          <circle
            cx={sunXPosition}
            cy={sunYPosition}
            r="2.6"
            className={`${isDaytime ? "fill-red-400" : "fill-gray-500 dark:fill-gray-300"}`}
          />
        </svg>

        <div className="absolute flex h-[.07rem] w-full items-center justify-center bg-black/50 dark:bg-white/50">
          <div className="absolute w-[21%] rounded-full border-b border-t border-white/50 bg-[#333333] py-[.3%] text-center text-[75%] font-[500] italic leading-3 text-white dark:bg-[#504f4f]">
            Horizon
          </div>
          {/* Sunrise Sunset */}
          <div className="absolute right-0 flex h-5 w-full items-center justify-center">
            <div className="absolute left-[7%] flex flex-col items-center gap-2 text-[1em] italic">
              <h1 className="text-[1.2em] font-[500] dark:text-white/70">
                Sunset
              </h1>
              <h1 className="text-[1.12em] font-[500]">{sunset}</h1>
            </div>
            <div className="absolute right-[7%] flex flex-col items-center gap-2 text-[1em] italic">
              <h1 className="text-[1.12em] font-[500]">{sunrise}</h1>
              <h1 className="text-[1.2em] font-[500] dark:text-white/70">
                Sunrise
              </h1>
            </div>
          </div>
          {/* Day Night */}
          <div className="absolute bottom-5 flex size-10 flex-col items-center justify-center gap-1">
            <PiSunFill className="size-[46%] text-orange-400" />
            <h1 className="text-[1em] font-[500] italic">Day</h1>
          </div>
          <div className="absolute top-5 flex size-10 flex-col items-center justify-center gap-2">
            <BsFillMoonStarsFill className="size-[30%] text-gray-400" />
            <h2 className="text-[1em] font-[500] italic">Night</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
