// website/app/(auth)/signup/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup, login } from "@/libs/auth/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await signup({
        org_name: orgName,
        email,
        password,
      });
    login(resp.access_token);
      // Redirect to app
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Signup failed");
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