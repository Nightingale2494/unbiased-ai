import type { AnalysisResult } from "@/utils/types";

type ResultCardProps = {
  result: AnalysisResult;
};

export default function ResultCard({ result }: ResultCardProps) {
  const isBiased = result.bias > 0.2;

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h2 className="text-xl font-semibold mb-3">Results</h2>

      <p className="text-lg">
        Bias Score: <span className="font-bold">{result.bias.toFixed(2)}</span>
      </p>

      <div className="mt-3">
        {isBiased ? (
          <p className="text-red-400 font-semibold">⚠️ Bias Detected</p>
        ) : (
          <p className="text-green-400 font-semibold">✅ Fair Dataset</p>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-300">
        <p className="mb-1 font-medium">Group Selection Rates:</p>
        {Object.entries(result.rates).map(([group, rate]) => (
          <p key={group}>
            {group}: {(rate * 100).toFixed(1)}%
          </p>
        ))}
      </div>
    </div>
  );
}
