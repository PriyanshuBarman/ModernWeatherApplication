import React, { memo } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdMoon } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { PiSunDimFill } from "react-icons/pi";
import { useApiData } from "../../Context/ApiContext";
import { useSearchModal } from "../../Context/SearchModalContext";
import { useSidebar } from "../../Context/SidebarContext";
import { useTheme } from "../../Context/ThemeContext";
function Header() {
  const { currentData, loading } = useApiData();
  const { openSidebar } = useSidebar();
  const { toggleTheme, currentTheme } = useTheme();
  const { openModal } = useSearchModal();
  return (
    <div className="fixed top-0 z-40 flex h-10 w-full items-center justify-center gap-1 bg-gradient-to-b from-[#ffffff] via-white to-transparent pb-1 pt-2.5 font-oxanium text-[1.2rem] text-black/90 shadow-[inset_1px_-.4px_2px_0px_ttt] dark:from-[#252525] dark:via-[#252525] dark:to-[#252525] dark:text-white md:w-[375px]">
      {loading ? (
        <h1 className="h-5 w-36 animate-pulse rounded-md bg-black/15 dark:bg-white/15"></h1>
      ) : (
        <h1 onClick={openModal} className="flex gap-2 font-bold">
          <MdLocationOn className="size-[1.35rem]" />
          {currentData.city}
          <span className="font-bold italic dark:font-[600]">
            {currentData.countryCode}
          </span>
        </h1>
      )}
      {/* Sidebar Button */}
      <button
        onClick={openSidebar}
        className="absolute left-2 top-2 z-40 h-7 w-10 rounded-md bg-white p-1 text-black shadow-md shadow-black/30 active:shadow-none dark:bg-[#484848] dark:text-white"
      >
        <HiOutlineMenuAlt2 className="h-full w-full" />
      </button>
      {/* Theme Change Button */}
      <button
        onClick={() => toggleTheme()}
        className="absolute right-3 top-2 z-40 flex h-6 w-6 items-center justify-center rounded-full text-black/70 dark:text-white/50"
      >
        {currentTheme === "dark" ? (
          <PiSunDimFill className="size-full" />
        ) : (
          <IoMdMoon className="size-[90%] text-blue-600" />
        )}
      </button>
    </div>
  );
}

export default memo(Header);
