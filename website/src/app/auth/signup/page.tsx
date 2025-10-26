// website/app/(auth)/signup/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// auth API is used via Redux thunks
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { signupUser, setToken } from "@/lib/auth/authSlice";
import { Logger, LogTags } from "@/lib/logger";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const action = await (dispatch as AppDispatch)(
        signupUser({ org_name: orgName, email, password })
      );
      if (signupUser.fulfilled.match(action)) {
        const token = action.payload.access_token;
        dispatch(setToken(token));
        Logger.i(LogTags.AUTH, `User signed up: ${email}`);
        router.push("/");
      } else {
        const payload = (action as { payload?: unknown }).payload;
        Logger.e(LogTags.AUTH, `Signup failed: ${JSON.stringify(payload)}`);
        let message = "Signup failed";
        if (payload && typeof payload === "object") {
          const p = payload as Record<string, unknown>;
          if (typeof p.message === "string") message = p.message;
          else {
            try {
              message = JSON.stringify(payload);
            } catch {
              message = String(payload);
            }
          }
        }
        setError(message);
      }
    } catch (err: unknown) {
      const categorizedError = err as Error;
      Logger.e(LogTags.AUTH, `Unexpected error in signup: ${categorizedError.message}`);
      setError(categorizedError.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 540, margin: "4rem auto" }}>
      <h1>Create account</h1>
      <form onSubmit={onSubmit}>
        <label>
          Organization name
          <input value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </button>
        {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      </form>
    </main>
  );
}