const API_BASE = "http://localhost:3001";

export async function ingestTerm(term: string) {
    await fetch(`${API_BASE}/terms/${term}`, {
        method: "POST",
    });
}

export async function fetchTimeseries(term: string) {
    const res = await fetch(`${API_BASE}/terms/${term}/timeseries`);
    return res.json();
}

export async function fetchGrowth() {
    const res = await fetch(`${API_BASE}/terms/analytics/growth`);
    return res.json();
}
