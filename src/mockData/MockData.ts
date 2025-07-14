import { ObservationDataset } from "../types";

export const deformationData: ObservationDataset = {
  Stockholm: {
    deformation: {
      unit: "mm",
      trend: "rising",
      values: [2.3, 3.1, 4.0, 3.8, 4.5, 5.2],
      dates: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
      summary:
        "Ground deformation increased steadily since January, reaching 5.2mm in June.",
    },
    water: {
      unit: "cm",
      trend: "stable",
      values: [15, 14.8, 15.2, 15.0, 15.0],
      dates: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
      summary: "Water levels in Stockholm remain stable.",
    },
  },
  Kiruna: {
    deformation: {
      unit: "mm",
      trend: "rising",
      values: [1.0, 1.4, 1.9, 2.5, 2.9, 3.2],
      dates: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
      summary: "Kiruna shows a steady upward ground movement.",
    },
    water: {
      unit: "cm",
      trend: "declining",
      values: [20.0, 19.5, 18.9, 18.0, 17.2, 16.8],
      dates: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
      summary: "Water levels in Kiruna are declining.",
    },
  },
};
