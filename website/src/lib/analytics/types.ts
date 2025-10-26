export type KpisResponse = {
  total_co2e_kg: number;
  scope1_kg: number;
  scope2_kg: number;
  scope3_kg: number;
};

export type TrendPoint = {
  period: string;
  co2e_kg: number;
};

export type SummaryResponse = {
  total_co2e_kg: number;
  scope1_kg: number;
  scope2_kg: number;
  scope3_kg: number;
  facilities_count: number;
  last_event_at?: string | null;
  // top_categories: array of [category, value] pairs; backend may return nulls — keep as unknown[][] to be safe
  top_categories: Array<[string | null, number | null] | (unknown[])>;
};
