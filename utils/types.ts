export type DataRow = Record<string, string>;

export type AnalysisResult = {
  rates: Record<string, number>;
  bias: number;
};
