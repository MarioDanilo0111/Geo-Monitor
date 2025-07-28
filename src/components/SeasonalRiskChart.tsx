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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

import { Radar } from "react-chartjs-2";

export interface SeasonalRiskProps {
  averagePerSeason: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
}

export default function SeasonalRiskChart({
  averagePerSeason,
}: SeasonalRiskProps) {
  const colorDesignatorLoop = Object.values(averagePerSeason).map((value) => {
    if (value < 2) return "green";
    if (value >= 2 && value < 4) return "yellow";
    return "red";
  });
  const backGrundColor = colorDesignatorLoop;

  const data = {
    labels: ["Spring", "Summer", "Autumn", "Winter"],
    datasets: [
      {
        label: "Deformation Risk",
        data: [
          averagePerSeason.spring,
          averagePerSeason.summer,
          averagePerSeason.autumn,
          averagePerSeason.winter,
        ],
        tension: 0.29,
        backgroundColor: backGrundColor,
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Radar data={data} />
    </>
  );
}
