"use client";

import { useState } from "react";
import TermInput from "../components/TermInput";
import TimeseriesChart from "../components/TimeseriesChart";
import GrowthTable from "../components/GrowthTable";
import { fetchTimeseries, fetchGrowth } from "../lib/api";
import type { TimeseriesPoint, GrowthRow } from "../lib/types";


export default function Page() {
  const [series, setSeries] = useState<TimeseriesPoint[]>([]);
  const [growth, setGrowth] = useState<GrowthRow[]>([]);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  // ONLY called when user clicks Load
  async function handleLoad(term: string) {
    setActiveTerm(term);

    // load timeseries for this term
    const ts = await fetchTimeseries(term);
    setSeries(ts);

    // refresh exploding trends AFTER ingest
    const g = await fetchGrowth();
    setGrowth(g);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>TickerTrends</h1>

      <TermInput onDone={handleLoad} />

      {activeTerm && (
        <div style={{ marginTop: 30, width: "100%", maxWidth: 1000 }}>
          <h3>Timeseries for "{activeTerm}"</h3>
          <TimeseriesChart data={series} />
        </div>
      )}


      {growth.length > 0 && <GrowthTable rows={growth} />}
    </main>
  );
}
