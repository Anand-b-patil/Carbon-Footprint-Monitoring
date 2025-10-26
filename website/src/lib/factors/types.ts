export type CreateFactorRequest = {
  namespace?: string; // default 'global' typically
  category: string;
  unit_in: string;
  unit_out: string;
  factor_value: number;
  gwp_horizon?: number;
  geography?: string;
  vendor?: string;
  method?: string;
  valid_from?: string;
  valid_to?: string;
  version?: number;
};

export type Factor = {
  id: number;
  namespace: string;
  category: string;
  unit_in: string;
  unit_out: string;
  factor_value: number;
  gwp_horizon: number;
  geography: string;
  vendor: string;
  method: string;
  valid_from: string;
  valid_to: string;
  version: number;
};

export type FactorPreview = {
  id: number;
  category: string;
  geography: string;
  version: number;
  factor_value: number;
};
