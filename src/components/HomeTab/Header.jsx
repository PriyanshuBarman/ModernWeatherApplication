import React, { memo } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdMoon } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { PiSunDimFill } from "react-icons/pi";
import { useApiData } from "../../Context/ApiContext";
import { useSearchModal } from "../../Context/SearchModalContext";
import { useSidebar } from "../../Context/SidebarContext";
import { useTheme } from "../../Context/ThemeContext";
const Header = () => {
  const { currentData, loading } = useApiData();
  const { openSidebar } = useSidebar();
  const { toggleTheme, currentTheme } = useTheme();
  const { openModal } = useSearchModal();
  return (
    <div className="topToBottom fixed top-0 z-40 flex h-10 w-full items-center justify-center gap-1 bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5] to-transparent pb-1 pt-2.5 font-oxanium text-black/90 shadow-[inset_1px_-.4px_2px_0px_ttt] dark:from-[#252525] dark:via-[#242424] dark:to-[#242424] dark:text-white md:w-[375px]">
      {loading ? (
        <h1 className="h-5 w-36 animate-pulse rounded-md bg-black/15 dark:bg-white/20"></h1>
      ) : (
        <h1 onClick={openModal} className="flex gap-2 text-lg font-bold">
          <MdLocationOn className="size-[1.35rem]" />
          {currentData.city}
          <span className="font-bold dark:font-[600]">
            ({currentData.countryCode})
          </span>
        </h1>
      )}
      {/* Sidebar Button */}
      <button
        onClick={openSidebar}
        className="absolute left-2 top-1.5 z-40 h-7 w-10 rounded-md bg-white p-1 text-black shadow-md shadow-black/30 active:shadow-none dark:bg-[#484848] dark:text-white"
      >
        <HiOutlineMenuAlt2 className="h-full w-full" />
      </button>

      {/* Theme Change Button */}
      <button
        onClick={() => toggleTheme()}
        className="absolute right-2 top-1.5 z-40 flex h-7 w-10 items-center justify-center rounded-3xl bg-white p-1 text-black shadow-md shadow-black/30 dark:bg-[#434242] dark:text-white"
      >
        <PiSunDimFill
          className={`absolute size-[70%] text-white/70 transition-transform duration-700 ${
            currentTheme === "dark"
              ? "rotate-[360deg] opacity-100"
              : "rotate-0 opacity-0"
          }`}
        />
        <IoMdMoon
          className={`absolute size-[65%] text-black/75 transition-transform duration-700 ${
            currentTheme === "light"
              ? "rotate-[360deg] opacity-100"
              : "rotate-0 opacity-0"
          }`}
        />
      </button>
    </div>
  );
};

export default memo(Header);
