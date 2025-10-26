"use client";
import React, { useEffect, useState } from "react";
import { getKpis, getTrend, getSummary } from "@/lib/analytics/api";
import type { KpisResponse, TrendPoint, SummaryResponse } from "@/lib/analytics/types";

export default function AnalyticsPage() {
  const [kpis, setKpis] = useState<KpisResponse | null>(null);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const [k, t, s] = await Promise.all([getKpis(), getTrend(), getSummary()]);
      setKpis(k);
      setTrend(t);
      setSummary(s);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <main>
      <h1>Analytics</h1>
      {loading && <div>Loading...</div>}
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      {kpis && <div><h2>KPIs</h2><pre>{JSON.stringify(kpis, null, 2)}</pre></div>}
      {trend && trend.length > 0 && <div><h2>Trend</h2><pre>{JSON.stringify(trend, null, 2)}</pre></div>}
      {summary && <div><h2>Summary</h2><pre>{JSON.stringify(summary, null, 2)}</pre></div>}
    </main>
  );
}
