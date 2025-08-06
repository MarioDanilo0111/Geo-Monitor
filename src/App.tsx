import { useEffect, useState } from "react";
import DeformationChart from "./components/DeformationChart";
import { City, ObservationEntry, ObservationType } from "./types/types";
import { fetchObservation } from "./services/fetchObservations";
import { simulateForecast } from "./services/predic";
import SelectorFunction from "./components/ForecastSelector";
import generateLinearForecast from "./forecast/ForecastEngine";
import ForecastDeformationChart from "./components/ForecastDeformationChart";
import { Dropdowns } from "./components/Dropdowns";
import { deformationData } from "./mockData/MockData";

export default function App() {
  const [location, setLocation] = useState<City>("Stockholm");
  const [type, setType] = useState<ObservationType>("deformation");
  const [data, setData] = useState<ObservationEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [monthsAhead, setMonthsAhead] = useState(1);

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

    for (let i = 1; i <= count; i++) {
      let newDate = new Date(baseDate);
      newDate.setMonth(baseDate.getMonth() + i);
      const iso = newDate.toISOString().slice(0, 7);
      futureDate.push(iso);
    }
    return futureDate;
  }

  let deformationChart = null;
  let linearForecast = null;
  let summeryText = null;

  if (data) {
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

    summeryText = (
      <p>🛰️ {simulateForecast(data.values, data.unit, monthsAhead)}</p>
    );

    linearForecast = (
      <SelectorFunction value={monthsAhead} onChange={setMonthsAhead} />
    );
    deformationChart = (
      <DeformationChart
        dates={fullDates}
        observed={onlyLastItems}
        forecast={forecast.projectedValues}
      />
    );
  }

  let loadingState = null;
  {
    loading ? <p>Loading data</p> : <p>No Data loaded...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      {loadingState}
      <div className="container mx-auto px-4">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-start">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-lg font-semibold mb-2">
                <h1>
                  {location} - {type}
                </h1>
              </div>
              <Dropdowns
                city={Object.keys(deformationData) as City[]}
                selectedCity={location}
                onCityChange={setLocation}
                selectedType={type}
                onTypeChange={setType}
              />
              <div>
                <div>{deformationChart}</div>
              </div>
              {linearForecast}
              <div className="py-8 ps-3">
                <div className="pt-1">
                  <p> - {data?.summary}</p>
                </div>
                <div className="pt-1 pb-3">
                  <p> - {summeryText}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                Risk Pattern (Radar)
              </h2>
              <ForecastDeformationChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
