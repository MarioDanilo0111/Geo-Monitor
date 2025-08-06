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
  observed: number[];
  forecast: number[];
};

export default function DeformationChart({ dates, observed, forecast }: Props) {
  const observedLength = observed.length;
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Observed",
        data: [...observed, ...Array(forecast.length).fill(null)],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
      {
        label: "Forecast",
        data: [...Array(observedLength).fill(null), ...forecast],
        borderColor: "rgba(255,99,132,1)",
        borderDash: [5, 5], // dashed line
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <Line data={data} />
    </>
  );
}
