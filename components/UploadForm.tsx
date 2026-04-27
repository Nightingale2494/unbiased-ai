"use client";
import Papa from "papaparse";

export default function UploadForm({ onData }: any) {
  const handleFile = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onData(results.data);
      },
    });
  };

  return (
    <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 transition">
      <p className="mb-2 text-gray-300">Upload your dataset</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="text-sm"
      />
    </div>
  );
}