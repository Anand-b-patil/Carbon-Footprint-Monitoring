import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { IngestRequest, IngestResponse } from "./types";

/** Send a batch of events to the ingest endpoint */
export async function ingestEvents(payload: IngestRequest): Promise<IngestResponse> {
  try {
    const res = await apiClient.post<IngestResponse>("/v1/ingest/events", payload);
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** Upload a CSV file to the upload-csv endpoint. Returns the same ingest response shape. */
export async function uploadCsv(file: File | Blob): Promise<IngestResponse> {
  try {
    const fd = new FormData();
    fd.append("file", file);
    const res = await apiClient.post<IngestResponse>("/v1/ingest/upload-csv", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}
