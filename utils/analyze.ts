export function analyzeBias(data: any[], groupKey: string, outcomeKey: string) {
  const groups: any = {};

  data.forEach((row) => {
    const group = row[groupKey];
    const outcome = row[outcomeKey];

    if (!groups[group]) {
      groups[group] = { total: 0, selected: 0 };
    }

    groups[group].total += 1;

    if (outcome === "yes") {
      groups[group].selected += 1;
    }
  });

  const rates: any = {};

  Object.keys(groups).forEach((g) => {
    rates[g] = groups[g].selected / groups[g].total;
  });

  const values = Object.values(rates);
  const bias = Math.abs(values[0] - values[1]);

  return { rates, bias };
}