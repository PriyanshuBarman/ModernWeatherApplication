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
    const totalDaylightMinutes = sunsetMinutes - sunriseMinutes;
    const timeSinceSunrise = currentTimeInMinutes - sunriseMinutes;

    // The Sun rise from Right and Sunset to the Left
    // return (timeSinceSunrise / totalDaylightMinutes) * 180;

    // The Sun rise from Left and Sunset to the Right
    return 180 - (timeSinceSunrise / totalDaylightMinutes) * 180;
  };

  const sunPositionAngle = calculateSunPositionAngle();

  const calculateSunPositionOnArc = (angle) => {
    const radius = 40; // Adjust this to control distance from the center
    const centerX = 50;
    const centerY = 50;
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY - radius * Math.sin(radians),
    };
  };

  const { x: sunXPosition, y: sunYPosition } =
    calculateSunPositionOnArc(sunPositionAngle);

  const totalMinutes = sunsetMinutes - sunriseMinutes;
  const dayLight = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;

  return (
    <div className="relative mt-2.5 flex w-[93%] flex-col items-center overflow-hidden rounded-2xl rounded-tl-xl border-r border-t border-black/5 bg-white/25 text-xs shadow-[1px_3px_4px_0px] shadow-black/50 active:shadow-[0px_-1px_2px_0px] dark:border-white/5 dark:bg-[#1f1f1f] dark:text-white/90 dark:shadow-black">
      <h1 className="absolute top-0 mt-1 flex items-center rounded-b-xl px-4 font-[500] leading-3">
        {currentTime}
      </h1>
      <h1 className="absolute left-0 top-0 -skew-x-12 whitespace-pre rounded-br-3xl bg-[#d1d1d1] py-[.06rem] pl-3 pr-4 text-[.66rem] font-[500] dark:bg-white/20">
        Daylight: {dayLight}
      </h1>

      <div className="relative mt-1 flex h-[10rem] w-full items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50" // Left to right path (sunrise to sunset)
            stroke="rgb(226,135,67)"
            className="fill-transparent"
            strokeWidth="1.2"
          />
          <path
            d="M 90 50 A 40 40 0 0 1 10 50" // Right to left path (sunset to sunrise)
            stroke="gray"
            className="fill-transparent"
            strokeWidth="1.2"
          />
          {/* Sun position */}
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

        <div className="absolute flex h-[.077rem] w-full items-center justify-center bg-black/50 dark:bg-white/50">
          <div className="absolute w-[21%] rounded-full border-b border-t border-white/30 bg-[#504f4f] text-center text-[75%] font-[500] italic leading-3 text-white">
            Horizon
          </div>

          {/* Sunrise Sunset */}
          <div className="absolute right-0 flex h-5 w-full items-center justify-center">
            <h1 className="absolute left-7 flex flex-col gap-y-1 text-[.88rem] font-[600] italic dark:text-white/70">
              Sunrise
              <span className="text-[.9em] font-[500]">{sunrise}</span>
            </h1>
            <h1 className="absolute right-7 flex flex-col gap-y-1 text-[.88rem] font-[600] italic dark:text-white/70">
              Sunset
              <span className="text-[.9em] font-[500]">{sunset}</span>
            </h1>
          </div>
          {/* Day Night */}
          <div className="absolute bottom-3 flex size-10 flex-col items-center justify-center gap-1">
            <PiSunFill className="size-[46%] text-orange-400" />
            <h1 className="text-[1em] font-[500] italic">Day</h1>
          </div>
          <div className="absolute top-3 flex size-10 flex-col items-center justify-center gap-2">
            <BsFillMoonStarsFill className="size-[30%] dark:text-gray-400 text-gray-600" />
            <h2 className="text-[1em] font-[500] italic">Night</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
