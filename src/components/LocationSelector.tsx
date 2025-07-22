import React, { useState, useEffect } from "react";
import { fetchLocations } from "../services/geoMonitorAPI";
import { Location } from "../types/apiTypes";

interface locationInterface {
  onSelect: (id: string) => void;
}

export default function LocationSelectorFunction(props: locationInterface) {
  const [location, setLocation] = useState<Location[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstance = async () => {
    setLoading(true);
    try {
      const res = await fetchLocations();
      setLocation(res);
      setLoading(false);
    } catch (err) {
      console.error("Error once Fetching data: ", err);
      setError("Error loading data, contatct Dev-Team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstance();
  }, []);

  if (error)
    return <h2 style={{ color: "red", fontWeight: "bold" }}>{error}</h2>;

  return (
    <div>
      {loading ? (
        <p>Loding data, have to await...</p>
      ) : (
        <select onChange={(e) => props.onSelect(e.target.value)}>
          <option>Select a location</option>
          {location &&
            location.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}
