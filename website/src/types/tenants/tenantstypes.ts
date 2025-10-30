export type Facility = {
  id: number;
  name: string;
  country?: string;
  grid_region?: string;
};

export type CreateFacilityRequest = {
  name: string;
  country?: string;
  grid_region?: string;
};

export type TenantUser = {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
};

export type CreateUserRequest = {
  email: string;
  password: string;
  role: string;
};
