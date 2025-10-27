export default function FactorsTable(props: Record<string, unknown>) {
  // Accept props from callers (filters, etc.) and render a simple placeholder
  return (
    <div className="text-white">Factors table (stub) {JSON.stringify(props || {})}</div>
  );
}
