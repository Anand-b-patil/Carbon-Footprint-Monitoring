import { apiClient, setAuthToken } from "@/lib/axios/apiClient";

export type SignupRequest={
    org_name:string;
    email:string;
    password:string;
};

export type TokenResponse={
    access_token:string;
    token_type:"bearer";
};

export async function signup(data:SignupRequest){
    const response=await apiClient.post<TokenResponse>("/v1/auth/signup",data);
    return response.data;
}

export function login(token:string){
    try{
        localStorage.setItem("token",token);
        setAuthToken(token);
    }catch(err){
         
        console.error("Error in setting token in local storage",err);
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