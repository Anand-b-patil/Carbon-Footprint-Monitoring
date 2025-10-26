import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";

/** Get the current reporting period string from the backend */
export async function getReportPeriod(): Promise<string> {
  try {
    const res = await apiClient.get<string>("/v1/reports/period");
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}
