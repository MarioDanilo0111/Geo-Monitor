import { useEffect, useState } from "react";
import DeformationChart from "./components/DeformationChart";
import { City, ObservationEntry, ObservationType } from "./types/types";
import { fetchObservation } from "./services/fetchObservations";
import { simulateForecast } from "./services/predic";
import SelectorFunction from "./components/Selector";

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
    console.log("Data Values: ", data?.values);
  };

  useEffect(() => {
    getObservation();
  }, [location, type]);

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

          <DeformationChart dates={data.dates} values={data.values} />

          <div className="bg-gray-100 p-3 rounded-md text-sm mt-4">
            <SelectorFunction value={monthsAhead} onChange={setMonthsAhead} />
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
