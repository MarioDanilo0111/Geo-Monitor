import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

type Props = {
  dates: string[];
  values: number[];
};

export default function DeformationChart({ dates, values }: Props) {
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Deformation (mm)",
        data: values,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}
