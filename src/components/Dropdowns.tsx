import React, { useState } from "react";
import { City, ObservationType } from "../types/types";
import { deformationData } from "../mockData/MockData";

const cities = Object.keys(deformationData) as City[];

interface DropdowsProps {
  city: City[];
  selectedCity: City;
  onCityChange: (id: City) => void;
  selectedType: ObservationType;
  onTypeChange: (type: ObservationType) => void;
}

export function Dropdowns({
  city,
  selectedCity,
  onCityChange,
  selectedType,
  onTypeChange,
}: DropdowsProps) {
  return (
    <form className="flex flex-row gap-2">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-40"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value as City)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as ObservationType)}
      >
        <option value="deformation">Deformation</option>
        <option value="water">Water Change</option>
      </select>
    </form>
  );
}
