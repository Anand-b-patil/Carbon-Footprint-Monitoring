import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { CreateFactorRequest, Factor, FactorPreview } from "./types";

/** Create a new factor */
export async function createFactor(payload: CreateFactorRequest): Promise<Factor> {
  try {
    const res = await apiClient.post<Factor>("/v1/factors", payload);
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** List all factors */
export async function listFactors(): Promise<Factor[]> {
  try {
    const res = await apiClient.get<Factor[]>("/v1/factors");
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** Get preview(s) for factors. The backend may return a single object or an array; normalize to an array. */
export async function previewFactors(): Promise<FactorPreview[]> {
  try {
    const res = await apiClient.get<FactorPreview | FactorPreview[]>("/v1/factors/preview");
    const d = res.data as FactorPreview | FactorPreview[];
    if (Array.isArray(d)) return d;
    return [d];
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}
