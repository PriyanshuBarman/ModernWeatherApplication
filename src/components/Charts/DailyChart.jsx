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
import React, { memo, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useApiData } from "../../Context/ApiContext";
import { useTheme } from "../../Context/ThemeContext";
import { epochDayConverter } from "../../utils/TimeProvider";
import DailyChartSkeleton from "../Skeletons/DailyChartSkeleton";

// Register chart.js components and plugins
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

const DailyChart = () => {
  const { dailyData, timeZone, loading } = useApiData(); // Access the context
  const { currentTheme } = useTheme();
  const [verticalLineIndex, setVerticalLineIndex] = useState(2); // Default to 'Week 3'
  const chartRef = useRef(null);
  const startX = useRef(null);

  const color = currentTheme === "dark" ? "#EBEBEB" : "black";
  // Extract temperatures from the daily forecast
  const temperatures = dailyData
    ? dailyData.map((forecast) => Math.round(forecast.main.temp))
    : [];

  const labels = dailyData
    ? dailyData.map((item) => {
        return epochDayConverter(item.dt, timeZone);
      })
    : ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]; // Fallback if no data

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const handleMove = (e) => {
      if (startX.current !== null) {
        handleDrag(e);
      }
    };

    const handleEnd = () => {
      startX.current = null;
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    const handleStart = (e) => {
      startX.current = e.clientX || e.touches[0].clientX;
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
    };

    chart.canvas.addEventListener("mousedown", handleStart);
    chart.canvas.addEventListener("touchstart", handleStart);

    return () => {
      if (chart && chart.canvas) {
        chart.canvas.removeEventListener("mousedown", handleStart);
        chart.canvas.removeEventListener("touchstart", handleStart);
      }
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const handleDrag = (e) => {
    const chart = chartRef.current;
    if (!chart) return;

    const rect = chart.canvas.getBoundingClientRect();
    const xPos = (e.clientX || e.touches[0].clientX) - rect.left;
    const scale = chart.scales.x;
    const closestIndex = scale.getValueForPixel(xPos);
    const roundedIndex = Math.round(closestIndex);

    if (roundedIndex >= 0 && roundedIndex < labels.length) {
      setVerticalLineIndex(roundedIndex);
    }
  };

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
          pointRadius: (context) => {
            const index = context.dataIndex;
            return index === verticalLineIndex ? 5 : 1; // Show point only at verticalLineIndex
          },
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
    onClick: handleDrag,
    onHover: (event, chartElement) => {
      chartRef.current.canvas.style.cursor =
        chartElement.length > 0 ? "pointer" : "default";
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}° C`,
        },
        backgroundColor: currentTheme === "dark" ? "#272727" : "#ffffff", // Tooltip background
        titleColor: color, // Tooltip title color
        bodyColor: color, // Tooltip body color
      },
      verticalLinePlugin: {
        afterDraw: (chart) => {
          const ctx = chart.ctx;
          const xScale = chart.scales.x;
          const yScale = chart.scales.y;

          if (verticalLineIndex !== null) {
            const x = xScale.getPixelForValue(verticalLineIndex);
            const y = yScale.getPixelForValue(temperatures[verticalLineIndex]);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, yScale.bottom);
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = color; // Vertical line color
            ctx.stroke();
            ctx.restore();
          }
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
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
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
  };

  ChartJS.register({
    id: "verticalLinePlugin",
    afterDraw: (chart, args, options) => {
      if (options && options.afterDraw) {
        options.afterDraw(chart);
      }
    },
  });

  if (loading) {
    return <DailyChartSkeleton />;
  }
  return (
    <div className="z-10 w-[95%] space-y-1 rounded-2xl bg-white/90 to-transparent px-2 pb-[1%] pt-3 shadow-md shadow-black/80 dark:bg-[#1f1f1f]">
      <h1 className="flex w-full items-center justify-between px-2 text-sm font-semibold italic dark:text-white/70">
        Next 5 days
        <span className="rounded-full bg-black/10 px-2 text-[.8em] italic text-black/85 dark:bg-white/30">
          Temperature
        </span>
      </h1>

      <div className="relative w-full pt-2">
        <Line ref={chartRef} data={getData()} options={options} />
      </div>
    </div>
  );
};

export default memo(DailyChart);
