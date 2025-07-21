import { locations, forecastResponses } from "../mockData/GeoMonitorDB";
import { Location } from "../types/apiTypes";

export async function fetchLocations(): Promise<Location[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 1000);
  });
}

export async function fetchForecastByLocation(locationId: string) {
  return new Promise((resolve, reject) => {
    const forecast = forecastResponses?.find(
      (f) => f.locationId === locationId
    );
    /* const forecast: string | null = forecastResponse ? forecastResponse.forecast : null; */
    if (forecast) {
      setTimeout(() => {
        resolve(forecast);
      }, 1000);
    } else {
      setTimeout(() => {
        reject(new Error("Location not found"));
      }, 1000);
    }
  });
}
