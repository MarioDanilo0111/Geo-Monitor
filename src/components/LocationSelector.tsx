import React, { useState, useEffect } from "react";
import { fetchLocations } from "../services/geoMonitorAPI";
import { Location } from "../types/apiTypes";

interface LocationSelectorProps {
  onSelect: (id: string) => void;
}

export default function LocationSelectorFunction({
  onSelect,
}: LocationSelectorProps) {
  const [location, setLocation] = useState<Location[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Location: ", location);

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

  if (error) return <h2 className=" text-red-500 font-bold">{error}</h2>;

  return (
    <div className="mb-4">
      {loading ? (
        <p>Loding data, have to await...</p>
      ) : (
        <select
          className="bg-gray-700 text-white rounded p-2"
          onChange={(e) => onSelect(e.target.value)}
        >
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
