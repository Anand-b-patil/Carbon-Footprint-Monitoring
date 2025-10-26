export type IngestEvent = {
  occurred_at: string;
  category: string;
  unit: string;
  value_numeric?: number | null;
  facility_id?: number | null;
  source_id?: string | null;
  subcategory?: string | null;
  currency?: string | null;
  spend_value?: number | null;
};

export type IngestRequest = {
  events: IngestEvent[];
};

export type IngestResponse = {
  created_events: number;
  skipped_duplicates: number;
  created_emissions: number;
};
