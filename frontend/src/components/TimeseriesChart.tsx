"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TimeseriesPoint } from "../lib/types";

export default function TimeseriesChart({
  data,
}: {
  data: TimeseriesPoint[];
}) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginTop: 30, width: "100%", height: 320 }}>
      <h3>Timeseries</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
