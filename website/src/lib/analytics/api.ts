import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { KpisResponse, TrendPoint, SummaryResponse } from "./types";

export async function getKpis(): Promise<KpisResponse> {
  try {
    const res = await apiClient.get<KpisResponse>("/v1/analytics/kpis");
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

export async function getTrend(): Promise<TrendPoint[]> {
  try {
    const res = await apiClient.get<TrendPoint[]>("/v1/analytics/trend");
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

export async function getSummary(): Promise<SummaryResponse> {
  try {
    const res = await apiClient.get<SummaryResponse>("/v1/analytics/summary");
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}
