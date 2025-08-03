import React, { useState, useEffect } from "react";
import { fetchLocations } from "../services/geoMonitorAPI";
import { Location } from "../types/apiTypes";
import { fetchForecastByLocation } from "../services/geoMonitorAPI";
import { ForecastResponse } from "../types/apiTypes";
import { seasonBucket } from "../mockData/SeasonBucket";
import SeasonalRiskChart from "./SeasonalRiskChart";

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

  const seasonColorMonth: string[] = new Array(12).fill("");
  if (seasonColorMonth) {
    seasonColorMonth.forEach((_, index) => {
      if (index >= 0 && index <= 2) {
        const colorValue: string = "rgba(0, 128, 255, 0.2)"; //winter
        seasonColorMonth[index] = colorValue;
      } else if (index >= 3 && index <= 5) {
        const colorValue: string = "rgba(0, 200, 100, 0.2)"; //spring
        seasonColorMonth[index] = colorValue;
      } else if (index >= 6 && index <= 8) {
        const colorValue: string = "rgba(255, 255, 100, 0.2)"; //summer
        seasonColorMonth[index] = colorValue;
      } else {
        const colorValue: string = "rgba(255, 165, 0, 0.2)"; //autumn
        seasonColorMonth[index] = colorValue;
      }
    });
    /* console.log("Date to Number: ", seasonColorMonth); */
  }

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

  type SeasonKey = "spring" | "summer" | "autumn" | "winter";

  let averagePerSeason: Record<SeasonKey, number> = {
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0,
  };
  if (seasonBucket && seasonBucket) {
    Object.entries(seasonBucket).forEach(([season, values]) => {
      if (values.length > 0) {
        const sumValues: number = (values as number[]).reduce(
          (acc, val) => acc + val,
          0
        );
        const avgOfSumValues: number = sumValues / values.length;
        const key = season as SeasonKey;
        averagePerSeason[key] = avgOfSumValues;
      }
    });
  }

  const monthRiskData: number[] = new Array(12).fill(1);
  /* console.log("month Risk Data array: ", monthRiskData); */

  if (forecastData) {
    forecastData.forecast.forEach((date) => {
      const stamps: string = date.timestamp.slice(5, 7);
      const toNumber = parseInt(stamps);
      monthRiskData[toNumber - 1] = date.predicted;
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
          <option>Select City</option>
          {location &&
            location.map((loca) => (
              <option key={loca.id} value={loca.id}>
                {loca.name}
              </option>
            ))}
        </select>
      )}

      {Object.keys(averagePerSeason).length > 0 && (
        <SeasonalRiskChart
          monthRiskData={monthRiskData}
          averagePerSeason={averagePerSeason}
          seasonColorMonth={seasonColorMonth}
        />
      )}
    </div>
  );
}
