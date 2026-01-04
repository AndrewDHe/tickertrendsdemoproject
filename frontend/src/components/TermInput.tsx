"use client";

import { useState } from "react";
import { ingestTerm } from "../lib/api";

export default function TermInput({
    // instruction from father page.tsx
    onDone,
}: {
    onDone: (term: string) => void;
}) {
    const [term, setTerm] = useState("");

    async function submit() {
        if (!term.trim()) return;

        await ingestTerm(term);

        onDone(term);
    }

    return (
        <div style={{ marginBottom: 20 }}>
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Enter keyword"
            />
            <button onClick={submit} style={{ marginLeft: 10 }}>
                Load
            </button>
        </div>
    );
}
