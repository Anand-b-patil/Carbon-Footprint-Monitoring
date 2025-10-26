"use client";
import React, { useState } from "react";
import { ingestEvents, uploadCsv } from "@/lib/ingest/api";
import type { IngestResponse } from "@/lib/ingest/types";

export default function IngestPage() {
  const [jsonText, setJsonText] = useState("{\n  \"events\": []\n}");
  const [result, setResult] = useState<IngestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitJson(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = JSON.parse(jsonText);
      const res = await ingestEvents(payload);
      setResult(res);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadCsv(file);
      setResult(res);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Ingest</h1>
      <form onSubmit={submitJson}>
        <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={12} cols={80} />
        <div>
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send JSON'}</button>
        </div>
      </form>
      <hr />
      <div>
        <label>Upload CSV: <input type="file" accept="text/csv" onChange={onFile} /></label>
      </div>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
