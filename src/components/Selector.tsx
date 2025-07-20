import { ForecastSelectorProps } from "../types/types";

export default function SelectorFunction({
  value,
  onChange,
  options = [1, 2, 3, 6, 12],
}: ForecastSelectorProps) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt} month
          {opt > 1 ? "s" : " "} ahead
        </option>
      ))}
    </select>
  );
}
