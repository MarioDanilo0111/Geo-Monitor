import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

export interface SeasonalRiskProps {
  averagePerSeason: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  monthRiskData: number[];
  seasonColorMonth: string[];
}

export default function SeasonalRiskChart({
  averagePerSeason,
  monthRiskData,
  seasonColorMonth,
}: SeasonalRiskProps) {
  const colorDesignatorLoop = Object.values(averagePerSeason).map((value) => {
    if (value < 2) return "green";
    if (value >= 2 && value < 4) return "yellow";
    return "red";
  });

  /* console.log("this here is Seasonal Color by Month: ", seasonColorMonth); */

  interface Options {
    scales: {
      r: {
        grid: {
          color: string;
        };
        angleLines: {
          color: string;
        };
        pointLables: {
          font: {
            size: number;
          };
        };
        ticks: {
          display: boolean;
        };
      };
    };
  }

  const options: Options = {
    scales: {
      r: {
        grid: {
          color: "#ddd",
        },
        angleLines: {
          color: "#ddd",
        },
        pointLables: {
          font: {
            size: 10,
          },
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Malmö",
        data: monthRiskData,
        borderColor: "#1abc9c",
        backgroundColor: seasonColorMonth,
        pointBackgroundColor: seasonColorMonth,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
      },
      {
        label: "Göteborg",
        data: monthRiskData,
        borderColor: "#1abc9c",
        backgroundColor: seasonColorMonth,
        pointBackgroundColor: seasonColorMonth,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
      },
    ],
  };

  return (
    <>
      {Object.keys(monthRiskData).length >= 12 && (
        <Radar data={data} options={options} />
      )}
    </>
  );
}
