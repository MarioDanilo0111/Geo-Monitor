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
      { timestamp: "2024-01-01", observed: 0.3, predicted: 1.3 },
      { timestamp: "2024-02-11", observed: 0.7, predicted: 2.0 },
      { timestamp: "2024-03-13", observed: 0.2, predicted: 2.1 },
      { timestamp: "2024-04-11", observed: 0.1, predicted: 2.1 },
      { timestamp: "2024-05-16", observed: 0.5, predicted: 1.6 },
      { timestamp: "2024-06-09", observed: 0.3, predicted: 1.1 },
      { timestamp: "2024-07-09", observed: 0.1, predicted: 1.7 },
      { timestamp: "2024-08-06", observed: 0.1, predicted: 2.7 },
      { timestamp: "2024-09-03", observed: 0.5, predicted: 1.3 },
      { timestamp: "2024-10-09", observed: 0.6, predicted: 1.6 },
      { timestamp: "2024-11-19", observed: 0.6, predicted: 1.1 },
      { timestamp: "2024-12-30", observed: 0.2, predicted: 1.1 },
    ],
  },
  {
    locationId: "got",
    unit: "cm",
    forecast: [
      { timestamp: "2024-01-10", observed: 0.2, predicted: 1.2 }, // winter
      { timestamp: "2024-02-20", observed: 0.3, predicted: 1.5 },
      { timestamp: "2024-03-11", observed: 0.3, predicted: 1.9 },
      { timestamp: "2024-04-18", observed: 0.4, predicted: 2.3 }, // spring
      { timestamp: "2024-05-25", observed: 0.5, predicted: 2.6 },
      { timestamp: "2024-06-02", observed: 0.4, predicted: 3.3 }, // summer
      { timestamp: "2024-07-13", observed: 0.6, predicted: 5.0 },
      { timestamp: "2024-08-17", observed: 0.5, predicted: 4.2 },
      { timestamp: "2024-09-20", observed: 0.3, predicted: 2.2 }, // autumn
      { timestamp: "2024-10-11", observed: 0.3, predicted: 1.8 },
      { timestamp: "2024-11-06", observed: 0.2, predicted: 1.4 },
      { timestamp: "2024-12-29", observed: 0.3, predicted: 1.1 }, // winter
    ],
  },
];
