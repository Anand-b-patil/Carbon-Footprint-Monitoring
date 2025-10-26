"use client";
import React, { useState } from "react";
import { getReportPeriod } from "@/lib/reports/api";

export default function ReportPeriodPage() {
  const [period, setPeriod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPeriod() {
    setLoading(true);
    setError(null);
    try {
      const p = await getReportPeriod();
      setPeriod(p);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Report Period</h1>
      <button onClick={fetchPeriod} disabled={loading}>
        {loading ? "Loading..." : "Get Period"}
      </button>
      {error && <pre style={{ color: "red" }}>{error}</pre>}
      {period && <div>Current period: {period}</div>}
    </main>
  );
}
