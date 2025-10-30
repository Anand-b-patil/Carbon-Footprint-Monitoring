export type IngestEvent = {
  occurred_at: string; // ISO-8601
  category: string;
  unit: string;
  value_numeric: number; // >=0, required
  facility_id?: number | null;
  source_id?: string | null;
  subcategory?: string | null;
  currency?: string | null;
  spend_value?: number | null; // >=0
};

export type IngestRequest = {
  events: IngestEvent[];
};

export type IngestResponse = {
  created_events: number;
  skipped_duplicates: number;
  created_emissions: number;
};
