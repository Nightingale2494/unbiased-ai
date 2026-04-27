"use client";

import type { ChangeEvent } from "react";
import Papa from "papaparse";
import type { DataRow } from "@/utils/types";

type UploadFormProps = {
  onData: (data: DataRow[]) => void;
};

export default function UploadForm({ onData }: UploadFormProps) {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: DataRow[] }) => {
        onData(results.data);
      },
    });
  };

  return (
    <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 transition">
      <p className="mb-2 text-gray-300">Upload your dataset</p>
      <input type="file" accept=".csv" onChange={handleFile} className="text-sm" />
    </div>
  );
}
