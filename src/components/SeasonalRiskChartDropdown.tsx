import React, { useState } from "react";
import { Location } from "../types/apiTypes";

interface SeasonalRiskChartDropdownProps {
  locations: Location[];
  selectedLocationId: string;
  onChange: (id: string) => void;
}
export function SeasonalRiskChartDropdown({
  locations,
  selectedLocationId,
  onChange,
}: SeasonalRiskChartDropdownProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">Select City</label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedLocationId}
        onChange={(e) => onChange(e.target.value)}
      >
        {locations &&
          locations.map((loca) => (
            <option key={loca.id} value={loca.id}>
              {loca.name}
            </option>
          ))}
      </select>
    </div>
  );
}
