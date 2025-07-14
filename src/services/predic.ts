export function simulateForecast(
  values: number[],
  unit: string,
  monthsAhead: number
): string {
  if (values.length < 2) return "Not enough data to Predic";
  const last = values[values.length - 1];
  const secondLast = values[values.length - 2];
  const delta = last - secondLast;

  let foreCast = last;
  for (let i = 0; i < monthsAhead; i++) {
    foreCast += delta;
  }
  return `If the current trend continues, the next expected value in ${monthsAhead} month${
    monthsAhead > 1 ? "s" : ""
  } is ${foreCast.toFixed(1)} ${unit}`;
}
