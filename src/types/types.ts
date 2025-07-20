export type ObservationType = "deformation" | "water";

export type City = "Stockholm" | "Kiruna";

export type ObservationEntry = {
  unit: string;
  trend: string;
  values: number[];
  dates: string[];
  summary: string;
};

export type ObservationDataset = {
  [city in City]: {
    [type in ObservationType]: ObservationEntry;
  };
};

export type ForecastSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
};

export type ForecastInputProps = {
  values: number[];
  monthsAhead: number;
};

export type ForecastOutputProps = {
  projectedValues: number[];
  summary?: string;
};
