import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import * as api from "@/lib/auth/api";
import { setAuthToken } from "@/lib/axios/apiClient";

export type User = {
  id: number;
  email: string;
  role: string;
  org_id: number;
  is_active: boolean;
};

type AuthState = {
  token?: string | null;
  user?: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
};

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload: api.SignupRequest, { rejectWithValue }) => {
    try {
      const resp = await api.signup(payload);
      return resp;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const u = await api.me();
      return u;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) localStorage.setItem("token", action.payload);
        else localStorage.removeItem("token");
      }
      setAuthToken(action.payload ?? undefined);
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      if (typeof window !== "undefined") localStorage.removeItem("token");
      setAuthToken(undefined);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.access_token;
        state.error = null;
        setAuthToken(action.payload.access_token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        // Build a safe error message from payload or error
        let message = "Signup failed";
        if (action.payload && typeof action.payload === "object") {
          try {
            message = JSON.stringify(action.payload);
          } catch {
            message = String(action.payload);
          }
        } else if (action.error && action.error.message) {
          message = String(action.error.message);
        }
        state.error = message;
      });
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload as User;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });
  },
});

export const { setToken, setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
