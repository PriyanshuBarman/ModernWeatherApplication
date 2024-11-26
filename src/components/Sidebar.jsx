import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { IoMdMoon, IoMdSearch } from "react-icons/io";
import { MdOutlineSettingsBrightness } from "react-icons/md";
import { PiSunDimFill } from "react-icons/pi";
import { TbHomeFilled } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useSearchModal } from "../Context/SearchModalContext";
import { useSidebar } from "../Context/SidebarContext";
import { useTheme } from "../Context/ThemeContext";

const Sidebar = () => {
  const { openModal } = useSearchModal();
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { currentTheme, toggleTheme } = useTheme();
  const [isThemeTabOpen, setIsThemeTabOpen] = useState(false);

  return (
    <>
      {/* Overlay to close sidebar when clicked outside */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 left-0 z-50 h-screen w-full bg-black/40 text-base transition-opacity md:hidden md:w-[375px] ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Sidebar container */}
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`Sidebar fixed left-0 top-0 z-50 h-full w-2/4 transform rounded-r-[4rem] bg-gray-100 text-black transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } dark:bg-[#1a1a1a] dark:text-white`}
        >
          {/* === Menu Items === */}
          <ul className="mt-16 space-y-2">
            {/* Home Tab */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `mr-4 flex cursor-pointer items-center rounded-r-full p-4 text-white ${
                    isActive
                      ? "bg-blue-500 dark:bg-blue-500"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
                onClick={closeSidebar}
              >
                <TbHomeFilled className="mr-2 size-5" /> Home
              </NavLink>
            </li>

            {/* Search Tab (opens modal instead of navigating) */}
            <li
              className={`flex cursor-pointer items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700 ${isSidebarOpen ? "scale-y-100 transition-all delay-150 duration-500" : "scale-y-0"}`}
              onClick={() => {
                closeSidebar();
                openModal();
              }}
            >
              <IoMdSearch className="mr-2 size-7" /> Search
            </li>

            {/* Forecast Tab */}
            <li>
              <NavLink
                to="/forecast"
                className={`dark:hover:bg-gray-700" } mr-4 flex cursor-pointer items-center rounded-r-full p-4 hover:bg-gray-200 ${isSidebarOpen ? "scale-y-100 transition-all delay-150 duration-500" : "scale-y-0"}`}
                onClick={closeSidebar}
              >
                <TiChartLine className="mr-2 size-6" /> Forecast
              </NavLink>
            </li>

            {/* Theme Tab with Expandable Options */}
            <li
              className={`cursor-pointer py-4 pl-4 ${isSidebarOpen ? "scale-y-100 transition-all delay-150 duration-500" : "scale-y-0"} ${
                isThemeTabOpen
                  ? "bg-gray-200 dark:bg-white/5"
                  : "hover:bg-gray-200 dark:hover:bg-white/5"
              }`}
              onClick={() => setIsThemeTabOpen(!isThemeTabOpen)}
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <MdOutlineSettingsBrightness className="mr-2 size-6" /> Theme
                </span>
                <FaChevronDown
                  className={`transition-transform ${
                    isThemeTabOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {/* Theme Options */}
              {isThemeTabOpen && (
                <ul className="mt-2 space-y-2 pl-8 italic">
                  <li
                    className={`flex w-full cursor-pointer items-center rounded-l-md pl-4 hover:text-blue-500 dark:hover:text-blue-400 ${
                      currentTheme === "light" &&
                      "bg-blue-500 font-bold text-white"
                    }`}
                    onClick={() => {
                      toggleTheme();
                      closeSidebar();
                    }}
                  >
                    <PiSunDimFill className="mr-2" /> Light
                  </li>
                  <li
                    className={`flex cursor-pointer items-center rounded-l-md pl-4 hover:text-blue-500 dark:hover:text-blue-400 ${
                      currentTheme === "dark" &&
                      "bg-blue-500 font-bold text-white"
                    }`}
                    onClick={() => {
                      toggleTheme();
                      closeSidebar();
                    }}
                  >
                    <IoMdMoon className="mr-2" /> Dark
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
