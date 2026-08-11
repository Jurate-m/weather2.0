import { NextRequest, NextResponse } from "next/server";
import { normalize, validateString } from "@/_lib/validate";
import { findPlaces } from "@/_lib/data";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") ?? undefined;

  const normalized = normalize(raw);

  const invalid = validateString(normalized, "q");

  if (invalid.message) return NextResponse.json([]);

  const results = await findPlaces(normalized);

  return NextResponse.json(results);
}
