import { Location, ForecastResponse } from "../types/apiTypes";

export const locations: Location[] = [
  {
    id: "malm",
    name: "Malmö",
    country: "Sweden",
  },
  {
    id: "got",
    name: "Göteborg",
    country: "Sweden",
  },
];

export const forecastResponses: ForecastResponse[] = [
  {
    locationId: "malm",
    unit: "cm",
    forecast: [
      {
        timestamp: "2024-01-11",
        observed: 0.4,
        predicted: 2.3,
      },
    ],
  },
  {
    locationId: "got",
    unit: "cm",
    forecast: [
      {
        timestamp: "2024-03-19",
        observed: 0.3,
        predicted: 3.3,
      },
    ],
  },
];
