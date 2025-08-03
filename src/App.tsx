import { useEffect, useState } from "react";
import DeformationChart from "./components/DeformationChart";
import { City, ObservationEntry, ObservationType } from "./types/types";
import { fetchObservation } from "./services/fetchObservations";
import { simulateForecast } from "./services/predic";
import SelectorFunction from "./components/ForecastSelector";
import generateLinearForecast from "./forecast/ForecastEngine";
import ForecastDeformationChart from "./components/ForecastDeformationChart";

export default function App() {
  const [location, setLocation] = useState<City>("Stockholm");
  const [type, setType] = useState<ObservationType>("deformation");
  const [data, setData] = useState<ObservationEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [monthsAhead, setMonthsAhead] = useState(1);

  //const data = deformationData[location][type];

  const getObservation = async () => {
    setLoading(true);
    try {
      const dataRes = await fetchObservation(location, type);
      setData(dataRes);
    } catch (err) {
      console.log("Error runing data: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getObservation();
  }, [location, type]);

  function generateFutureDates(startDate: string, count: number): string[] {
    const baseDate = new Date(startDate);
    const futureDate: string[] = [];

    /* console.log("Future Date!!: ", futureDate);
    console.log("Base Date!!: ", baseDate); */

    for (let i = 1; i <= count; i++) {
      let newDate = new Date(baseDate);
      newDate.setMonth(baseDate.getMonth() + i);
      const iso = newDate.toISOString().slice(0, 7);
      futureDate.push(iso);
    }
    return futureDate;
  }

  return (
    <div>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value as City)}
      >
        <option value="Stockholm">Stockholm</option>
        <option value="Kiruna">Kiruna</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as "deformation" | "water")}
      >
        <option value="deformation">Deformation</option>
        <option value="water">Water Change</option>
      </select>
      {loading ? (
        <p>Loading data...</p>
      ) : data ? (
        <>
          <h1>
            {location} - {type}
          </h1>
          <p>{data?.summary}</p>

          {data &&
            (() => {
              const minItemsForTrend = 2;
              const sliceCount = Math.max(monthsAhead, minItemsForTrend);
              const onlyLastItems = data.values.slice(-sliceCount);
              const onlyLastDates = data.dates.slice(-monthsAhead);
              const lastDate = onlyLastDates[onlyLastDates.length - 1];

              const forecast = generateLinearForecast({
                values: onlyLastItems,
                monthsAhead,
              });

              const futureDates = generateFutureDates(lastDate, monthsAhead);

              const fullDates = [
                ...onlyLastDates,
                ...futureDates.map((d) => d.slice(0, 7)),
              ];

              return (
                <DeformationChart
                  dates={fullDates}
                  observed={onlyLastItems}
                  forecast={forecast.projectedValues}
                />
              );
            })()}
          <div className="bg-gray-100 p-3 rounded-md text-sm mt-4">
            <SelectorFunction value={monthsAhead} onChange={setMonthsAhead} />
            <ForecastDeformationChart />
            {data && (
              <p
                style={{
                  backgroundColor: "#f4f4f4",
                  fontStyle: "italic",
                  marginTop: "1.5rem",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  padding: "1rem",
                }}
              >
                🛰️ {simulateForecast(data.values, data.unit, monthsAhead)}
              </p>
            )}
          </div>
        </>
      ) : (
        <p>No data loaded</p>
      )}
    </div>
  );
}
