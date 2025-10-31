import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { Emission, RecomputeRequest, RecomputeResponse } from "@/types/emission/emissiontypes";

/** List emissions with optional filters */
export async function listEmissions(params?: {
  from?: string; // ISO-8601
  to?: string; // ISO-8601
  limit?: number; // 1-1000, default 100
  offset?: number; // >=0, default 0
}): Promise<Emission[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.from) searchParams.append('from', params.from);
    if (params?.to) searchParams.append('to', params.to);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    
    const url = `/v1/emissions${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const res = await apiClient.get<Emission[]>(url);
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
