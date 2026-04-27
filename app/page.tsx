"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import ResultCard from "@/components/ResultCard";
import type { AnalysisResult, DataRow } from "@/utils/types";

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({
        data,
        groupKey: "gender",
        outcomeKey: "selected",
      }),
    });

    const json: AnalysisResult = await res.json();
    setResult(json);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-2">Unbiased AI Checker</h1>
        <p className="text-gray-400 text-center mb-8">
          Detect bias in decision-making datasets instantly
        </p>

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
          <UploadForm onData={setData} />

          <button
            onClick={analyze}
            disabled={!data.length || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Bias"}
          </button>

          {result && <ResultCard result={result} />}
        </div>
      </div>
    </main>
  );
}
