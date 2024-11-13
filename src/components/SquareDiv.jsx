import { useApiData } from "../Context/ApiContext";
import SquareDivSkeleton from "../Skeletons/SquareDivSkeleton";

function SquareDiv({ icon, title, unitname, unit }) {
  const { loading } = useApiData();
  if (loading) {
    return <SquareDivSkeleton />;
  }
  return (
    <div className="relative mb-4 flex h-[7.9rem] w-[8.9rem] flex-col items-center justify-between rounded-[1.1em] rounded-tl-md bg-white/25 pb-1 pr-3 pt-3 shadow-[3px_5px_5px_.2px] shadow-black/50 active:shadow-[inset_2px_3px_5px_.1px] dark:bg-black/5 dark:text-white dark:shadow-black">
      <div className="w-full">
        {/* TITLE */}
        <h1 className="text- flex h-[1.55rem] w-[79%] items-center rounded-r-md bg-gradient-to-l from-transparent to-black/25 pl-3 text-start text-[.85em] font-[500] italic leading-3 dark:to-white/40 dark:rounded-l-sm dark:text-white/80">
          {title}
        </h1>
      </div>

      <div className="flex w-full items-center justify-between pl-3 pr-1.5">
        <div className="mb-7 flex pt-4">
          <h1 className="bg-gradient-to-b  from-black/70 to-transparent bg-clip-text text-[1.9rem] font-[700] leading-7 text-transparent dark:from-white">
            {unit}
          </h1>
          <h1 className="ml-1 text-lg font-bold dark:text-white/70">
            {unitname}
          </h1>
        </div>
        <div className="mb-6 text-black/60 dark:text-slate-200">{icon}</div>
      </div>

      <div className="absolute bottom-[8%] left-[10%] h-2 w-[80%] -skew-x-12 bg-black/15 dark:bg-white/20"></div>
    </div>
  );
}

export default SquareDiv;
