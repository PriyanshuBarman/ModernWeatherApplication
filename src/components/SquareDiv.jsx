import { memo } from "react";
import { useApiData } from "../Context/ApiContext";
import SquareDivSkeleton from "./Skeletons/SquareDivSkeleton";

const SquareDiv = ({ icon, title, unitname, unit }) => {
  const { loading } = useApiData();
  if (loading) {
    return <SquareDivSkeleton />;
  }
  return (
    <div className="relative mb-4 flex h-[7.6rem] w-[8.95rem] flex-col items-center justify-between rounded-[1.1em] rounded-tl-md bg-white/25 pb-1 pr-3 pt-3 shadow-[3px_5px_5px_.2px] shadow-black/50 duration-300 active:shadow-[inset_2px_3px_5px_.1px] dark:bg-black/15 dark:text-white dark:shadow-black">
      <div className="w-full">
        {/* TITLE */}
        <h1 className="text- flex h-[1.55rem] w-[79%] items-center rounded-r-md bg-gradient-to-l from-transparent to-black/25 pl-3 text-start text-[.85em] font-[500] italic leading-3 dark:rounded-l-sm dark:to-white/40 dark:text-white ">
          {title}
        </h1>
      </div>

      <div className="flex w-full items-center justify-between pl-3 pr-1.5">
        <div className="mb-7 flex pt-4">
          <h1 className="bg-gradient-to-b from-black/90 to-transparent bg-clip-text text-[1.8rem] font-[600] leading-7 text-transparent dark:from-white dark:via-white/75 ">
            {unit}
          </h1>
          <h1 className="ml-1 text-lg font-bold dark:text-white/70">
            {unitname}
          </h1>
        </div>
        <div className="mb-6 text-black/60 dark:text-white/80">{icon}</div>
      </div>

      <div className="absolute bottom-[8%] left-[10%] h-[.45rem] w-[80%] -skew-x-12 bg-black/15 dark:bg-white/20"></div>
    </div>
  );
};

export default memo(SquareDiv);
