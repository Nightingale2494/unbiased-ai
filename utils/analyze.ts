import type { DataRow } from "@/utils/types";

export function analyzeBias(
  data: DataRow[],
  groupKey: string,
  outcomeKey: string
) {
  const groups: Record<string, { total: number; selected: number }> = {};

  data.forEach((row) => {
    const group = row[groupKey];
    const outcome = row[outcomeKey];

    if (!group) return;

    if (!groups[group]) {
      groups[group] = { total: 0, selected: 0 };
    }

    groups[group].total += 1;

    if (outcome === "yes") {
      groups[group].selected += 1;
    }
  });

  const rates: Record<string, number> = {};

  Object.keys(groups).forEach((g) => {
    rates[g] = groups[g].selected / groups[g].total;
  });

  const values = Object.values(rates);
  const bias =
    values.length >= 2 ? Math.abs(values[0] - values[1]) : 0;

  return { rates, bias };
}
