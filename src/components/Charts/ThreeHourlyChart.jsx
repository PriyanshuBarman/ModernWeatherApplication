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
import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { useApiData } from "../../Context/ApiContext";
import { useTheme } from "../../Context/ThemeContext";
import { useTime } from "../../Context/TimeContext";
import ThreeHourlyChartSkeleton from "../../Skeletons/ThreeHourlyChartSkeleton";

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
  const color = currentTheme === "dark" ? "#EBEBEB" : "#2d2c2c";

  // Extract temperatures from the first 5 hourly forecasts
  const temperatures = threeHourlyData
    ? threeHourlyData
        .slice(0, 5)
        .map((forecast) => Math.round(forecast.main.temp))
    : [];

  // Extract the labels (time) for the first 5 hours
  const labels = threeHourlyData
    ? threeHourlyData
        .slice(0, 5)
        .map((forecast) => epochTimeConverter(forecast.dt, timeZone))
    : ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5"];

  const getData = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Temperature",
          data: temperatures,
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
    return <ThreeHourlyChartSkeleton />;
  }

  return (
    <div className="relative z-10 w-[95%] space-y-1 overflow-hidden rounded-2xl bg-white/90 to-transparent px-3 shadow-md shadow-black/80 dark:bg-[#1f1f1f]">
      <h1 className="absolute left-0 top-0 w-[45%] rounded-br-3xl bg-[#cecece] pb-0.5 pr-2 pt-1 text-center text-[.79rem] font-[500] italic leading-4 dark:bg-white/20 dark:text-white/85">
        3 hourly forecast
      </h1>
      <div className="overflow-x-auto pb-0.5 pt-10">
        <div style={{ width: "100%" }}>
          <Line data={getData()} options={options} />
        </div>
      </div>
    </div>
  );
};

export default memo(ThreeHourlyChart);
