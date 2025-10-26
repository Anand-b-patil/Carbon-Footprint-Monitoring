import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { Emission, RecomputeRequest, RecomputeResponse } from "./types";

/** List emissions */
export async function listEmissions(): Promise<Emission[]> {
  try {
    const res = await apiClient.get<Emission[]>('/v1/emissions');
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** Recompute emissions for a time window */
export async function recomputeEmissions(payload: RecomputeRequest): Promise<RecomputeResponse> {
  try {
    const res = await apiClient.post<RecomputeResponse>('/v1/emissions/recompute', payload);
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}
