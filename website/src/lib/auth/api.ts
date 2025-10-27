import { apiClient, setAuthToken } from "@/lib/axios/apiClient";
import { categorizeAxiosError } from "@/lib/errors";

export type SignupRequest={
    org_name:string;
    email:string;
    password:string;
};

export type TokenResponse={
    access_token:string;
    token_type:"bearer";
};

export type MeResponse = {
    id: number;
    email: string;
    role: string;
    org_id: number;
    is_active: boolean;
};

export async function signup(data:SignupRequest){
    try {
        const response = await apiClient.post<TokenResponse>("/v1/auth/signup", data);
        return response.data;
    } catch (err) {
        throw categorizeAxiosError(err);
    }
}

export function login(token:string){
    try{
        localStorage.setItem("token",token);
        setAuthToken(token);
    }catch(err){
        console.error("Error in setting token in local storage", err);
    }
}

/** Call backend login endpoint and return token response */
export async function loginApi(credentials: { email: string; password: string }) {
    try {
        const res = await apiClient.post<TokenResponse>("/v1/auth/login", credentials);
        return res.data;
    } catch (err) {
        throw categorizeAxiosError(err);
    }
}

/** Call backend /v1/auth/me to get current user */
export async function me(): Promise<MeResponse> {
    try {
        const res = await apiClient.get<MeResponse>("/v1/auth/me");
        return res.data;
    } catch (err) {
        throw categorizeAxiosError(err);
    }
}

export function logout(){
    try{
        localStorage.removeItem("token");
        setAuthToken(undefined);
    }catch(err){
         
        console.error("Error while removing token", err);
    }
}