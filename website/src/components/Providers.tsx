"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/lib/store";
import { fetchCurrentUser, setToken } from "@/lib/auth/authSlice";
import { setAuthToken } from "@/lib/axios/apiClient";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  useEffect(() => {
    // If token exists in localStorage, attempt to fetch current user
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        // Set token in axios client and Redux store
        setAuthToken(token);
        store.dispatch(setToken(token));
        // dispatch fetchCurrentUser to populate user
        store.dispatch(fetchCurrentUser());
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
