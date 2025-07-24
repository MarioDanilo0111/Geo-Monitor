import React, { useState, useEffect } from "react";
import { fetchLocations } from "../services/geoMonitorAPI";
import { Location } from "../types/apiTypes";
import { fetchForecastByLocation } from "../services/geoMonitorAPI";
import { ForecastResponse } from "../types/apiTypes";
import { seasonBucket } from "../mockData/SeasonBucket";

export default function ForecastDeformationChart() {
  const [location, setLocation] = useState<Location[]>();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectCityId, setSelectCityId] = useState<string>("");
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );

  const fetchInstance = async () => {
    setIsLoading(true);
    try {
      const res = await fetchLocations();
      setLocation(res);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Error wile fetching data, contact dev-team");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstance();
  }, []);

  const fetchForecast = async () => {
    try {
      const data = await fetchForecastByLocation(selectCityId);
      setForecastData(data as ForecastResponse);
    } catch (err) {
      console.error("Error on the selected City: ", err);
    }
  };
  useEffect(() => {
    fetchForecast();
  }, [selectCityId]);

  if (forecastData && forecastData) {
    forecastData.forecast.forEach(function (date) {
      let month: string = date.timestamp.slice(5, 7);
      if (month === "01" || month === "02" || month === "03") {
        seasonBucket.winter.push(date.predicted);
      }
      if (month === "04" || month === "05" || month === "06") {
        seasonBucket.spring.push(date.predicted);
      }
      if (month === "07" || month === "08" || month === "09") {
        seasonBucket.summer.push(date.predicted);
      }
      if (month === "10" || month === "11" || month === "12") {
        seasonBucket.autumn.push(date.predicted);
      }
    });
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          value={selectCityId}
          onChange={(e) => setSelectCityId(e.target.value)}
        >
          <option></option>
          {location &&
            location.map((loca) => (
              <option key={loca.id} value={loca.id}>
                {loca.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}
