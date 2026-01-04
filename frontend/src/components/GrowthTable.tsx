"use client";

import { GrowthRow } from "../lib/types";

export default function GrowthTable({ rows }: { rows: GrowthRow[] }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Exploding Trends</h3>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Growth %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.keyword}>
              <td>{r.keyword}</td>
              <td>{r.growth.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
