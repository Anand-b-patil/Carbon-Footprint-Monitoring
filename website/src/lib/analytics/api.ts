import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { KpisResponse, TrendPoint, SummaryResponse } from "./types";

export async function getKpis(from?: string, to?: string): Promise<KpisResponse> {
  try {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    
    const url = `/v1/analytics/kpis${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await apiClient.get<KpisResponse>(url);
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

export async function getTrend(from?: string, to?: string, grain?: 'day' | 'month'): Promise<TrendPoint[]> {
  try {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (grain) params.append('grain', grain);
    
    const url = `/v1/analytics/trend${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await apiClient.get<TrendPoint[]>(url);
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
