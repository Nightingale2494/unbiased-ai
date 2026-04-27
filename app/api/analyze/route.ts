// app/api/analyze/route.ts
import { NextResponse } from "next/server";
import { analyzeBias } from "@/utils/analyze";

export async function POST(req: Request) {
  const { data, groupKey, outcomeKey } = await req.json();

  const result = analyzeBias(data, groupKey, outcomeKey);

  return NextResponse.json(result);
}