// services/fetchObservation.ts
import { ObservationEntry, ObservationType, City } from "../types/types";
import { deformationData } from "../mockData/MockData";

export async function fetchObservation(
  location: City,
  type: ObservationType
): Promise<ObservationEntry> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(deformationData[location][type]);
    }, 1500);
  });
}
