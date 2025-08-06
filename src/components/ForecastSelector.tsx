import { ForecastSelectorProps } from "../types/types";

export default function SelectorFunction({
  value,
  onChange,
  options = [1, 2, 3, 6, 12],
}: ForecastSelectorProps) {
  return (
    <form>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt} month
            {opt > 1 ? "s" : " "} ahead
          </option>
        ))}
      </select>
    </form>
  );
}
