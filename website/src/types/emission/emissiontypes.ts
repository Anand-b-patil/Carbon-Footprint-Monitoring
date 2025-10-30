export type Emission = {
  id: number;
  event_id: number;
  factor_id: number;
  scope: string;
  co2e_kg: number;
  occurred_at: string;
  category: string;
};

export type RecomputeRequest = {
  since?: string;
  until?: string;
};

export type RecomputeResponse = {
  recalculated_events: number;
};
