import { ForecastInputProps, ForecastOutputProps } from "../types/types";
export default function generateLinearForecast(
  input: ForecastInputProps
): ForecastOutputProps {
  const { values, monthsAhead } = input;

  if (values.length < 2) {
    return { projectedValues: [], summary: "We can't calculate a trend" };
  }

  const last = values[values.length - 1];
  const secondToLast = values[values.length - 2];
  const changesPerMonth = last - secondToLast;

  let projectedValues: number[] = [];
  let forecast = last;
  for (let i = 0; i < monthsAhead; i++) {
    forecast += changesPerMonth;
    projectedValues.push(forecast);
  }

  return {
    projectedValues: projectedValues,
    summary: `Projected linear growth of ${changesPerMonth.toFixed(
      2
    )} per month.`,
  };
}
