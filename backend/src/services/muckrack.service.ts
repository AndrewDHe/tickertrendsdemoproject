export interface TimeseriesPoint {
  date: string;
  value: number;
}

function parseMuckrackResponse(raw: any): TimeseriesPoint[] {
  const data = raw.trend_data.data;
  const termKey = Object.keys(data)[0];
  const series = data[termKey].series;

  return series.map(([timestamp, value]: [number, number]) => ({
    date: new Date(timestamp).toISOString().slice(0, 10),
    value,
  }));
}

export async function fetchMuckrackTimeseries(term: string) {
  const encodedTerm = encodeURIComponent(`"${term}"`);

  const url = `https://muckrack.com/trends/report/data/?terms=${encodedTerm}&daterange_starts=2020-02-24&daterange_ends=2025-02-24`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X)",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`MuckRack request failed: ${res.status}`);
  }

  const raw = await res.json();
  return parseMuckrackResponse(raw);
}
