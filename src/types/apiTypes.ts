/* Get /locations */
export type Location = {
  id: string;
  name: string;
  country: string;
};

/* GET /forecast/:locationId */
export type ForecastEntry = {
  timestamp: string;
  observed: number;
  predicted: number;
};

export type ForecastResponse = {
  locationId: string;
  unit: "mm" | "cm";
  forecast: ForecastEntry[];
};

/* POST /report-issue */
export type IssueReport = {
  locationId: string;
  timestamp: string;
  message: string;
};

/* Response */
export type IssueResponse = {
  status: "ok" | "error";
  receivedAt: string;
};
