import { FaSearch } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useSearchModal } from "../../Context/SearchModalContext";

const BottomNavbar = () => {
  const { openModal } = useSearchModal();
  return (
    <>
      <nav className=" bottomToTop fixed bottom-0 z-40 m-auto flex h-[2.85rem] w-full items-stretch justify-around rounded-t-2xl border-t border-black/30 bg-[#fcfbfb] px-2 py-0.5 backdrop-blur-xl dark:border-white/20 dark:bg-[#1b1b1b] md:w-[375px]">
        <HomeTab />

        {/* Search Tab */}
        <div className="search flex h-full w-[30%] items-center justify-center">
          <div
            onClick={() => openModal()}
            className="Search flex h-[88%] w-[100%] cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-md shadow-black/60 transition-all ease-linear dark:bg-white/15"
          >
            <FaSearch className="size-[60%] text-white/90 transition-all duration-300 ease-linear hover:rotate-45" />
          </div>
        </div>
        {/* Search Tab End//=== */}

        <ForecastTab />
      </nav>
    </>
  );
};

export default BottomNavbar;

function HomeTab() {
  return (
    <NavLink
      to={"/"}
      className={({ isActive }) =>
        ` ${isActive ? "text-blue-500" : "text-black dark:text-white/80"}`
      }
    >
      <div
        className={`text- relative flex size-full cursor-pointer flex-col items-center justify-center pt-[10%] hover:text-blue-500`}
      >
        <TbHomeFilled className="size-[69%]" />
        <span className="pb-[12%] text-[65%] font-semibold italic leading-3">
          Home
        </span>
      </div>
    </NavLink>
  );
}

function ForecastTab() {
  return (
    <NavLink
      to={"/Forecast"}
      className={({ isActive }) =>
        ` ${isActive ? "text-blue-500" : "text-black dark:text-white/80"}`
      }
    >
      <div
        className={`relative flex size-full cursor-pointer flex-col items-center justify-center pt-[10%] hover:text-blue-500`}
      >
        <TiChartLine className="size-[73%]" />
        <span className="pb-[12%] text-[65%] font-semibold italic leading-3">
          Forecast
        </span>
      </div>
    </NavLink>
  );
}
