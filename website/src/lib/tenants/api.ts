import { apiClient } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";
import type { Facility, CreateFacilityRequest, TenantUser, CreateUserRequest } from "./types";

/** Fetch list of facilities for the current tenant */
export async function fetchFacilities(): Promise<Facility[]> {
  try {
    const res = await apiClient.get<Facility[]>('/v1/tenants/facilities');
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** Create a new facility */
export async function createFacility(payload: CreateFacilityRequest): Promise<Facility> {
  try {
    const res = await apiClient.post<Facility>('/v1/tenants/facilities', payload);
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** Fetch tenant users */
export async function fetchUsers(): Promise<TenantUser[]> {
  try {
    const res = await apiClient.get<TenantUser[]>('/v1/tenants/users');
    return res.data;
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}

/** Create a tenant user */
export async function createUser(payload: CreateUserRequest): Promise<void> {
  try {
    // backend returns 200 OK with empty body per spec; we still await to ensure success
    await apiClient.post('/v1/tenants/users', payload);
  } catch (err) {
    throw categorizeAxiosError(err);
  }
}
