import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { memo, useState } from "react";
import { Line } from "react-chartjs-2";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useApiData } from "../../Context/ApiContext";
import { useTheme } from "../../Context/ThemeContext";
import { useTime } from "../../Context/TimeContext";
import DailyChartSkeleton from "../../Skeletons/DailyChartSkeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels,
);

const ThreeHourlyChart = () => {
  const { threeHourlyData, timeZone, loading } = useApiData();
  const { epochTimeConverter } = useTime();
  const { currentTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const color = currentTheme === "dark" ? "#EBEBEB" : "#2d2c2c";

  // Extract temperatures from the hourly forecast
  const temperatures = threeHourlyData
    ? threeHourlyData.map((forecast) => Math.round(forecast.main.temp))
    : [];

  // Extract the labels (time)
  const labels = threeHourlyData
    ? threeHourlyData.map((forecast) =>
        epochTimeConverter(forecast.dt, timeZone),
      )
    : ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5"];

  // Paginate data for chart
  const startIndex = currentPage * itemsPerPage;
  const displayedLabels = labels.slice(startIndex, startIndex + itemsPerPage);
  const displayedTemperatures = temperatures.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const nextPage = () => {
    if (startIndex + itemsPerPage < labels.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getData = () => {
    return {
      labels: displayedLabels,
      datasets: [
        {
          label: "Temperature",
          data: displayedTemperatures,
          borderColor: color, // Border color based on dark mode
          backgroundColor: "transparent",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color, // Point color
          pointHoverBackgroundColor: color,
          pointHoverRadius: 8,
          pointRadius: 5,
          datalabels: {
            display: true,
            align: "top",
            anchor: "end",
            color: color, // Data label color
            font: { weight: "bold" },
            formatter: (value) => `${value}°`,
          },
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}° C`,
        },
        backgroundColor: "gray", // Tooltip background
        titleColor: "white", // Tooltip title color
        bodyColor: "white", // Tooltip body color
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: { display: false },
        ticks: {
          color: color, // X-axis tick color
          font: {
            size: 11,
            style: "italic",
            weight: "bold",
          },
        },
      },
    },
    layout: {
      padding: {
        top: 30,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  if (loading) {
    return <DailyChartSkeleton />;
  }
  return (
    <>
      <div className="relative z-10 mt-5 w-[95%] space-y-1 overflow-hidden rounded-2xl bg-white/90 to-transparent px-3 pb-1 pt-1 shadow-md shadow-black/80 dark:bg-[#1f1f1f]">
        <h1 className="absolute left-0 top-0 rounded-br-3xl bg-[#cbcbcb] px-9 py-0.5 text-[.73rem] font-[500] italic leading-4 dark:bg-white/20">
          Overview
        </h1>
        <div className="mb-1 flex w-full items-center justify-between py-1 pt-4 text-xs leading-3">
          <button
            onClick={prevPage}
            disabled={startIndex === 0}
            className={`flex items-center justify-center rounded-full px-2 italic hover:shadow-sm hover:shadow-white ${startIndex === 0 ? "cursor-not-allowed opacity-50" : "bg-black/25 text-white"}`}
          >
            <MdKeyboardArrowLeft className="size-4" />
            Prev
          </button>

          <button
            onClick={nextPage}
            disabled={startIndex + itemsPerPage >= labels.length}
            className={`flex items-center justify-center rounded-full px-2 italic hover:shadow-sm hover:shadow-black ${startIndex + itemsPerPage >= labels.length ? "cursor-not-allowed opacity-50" : "bg-b text-black dark:bg-white/25"}`}
          >
            More
            <MdKeyboardArrowRight className="size-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <div style={{ width: "100%" }}>
            <Line data={getData()} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ThreeHourlyChart);
