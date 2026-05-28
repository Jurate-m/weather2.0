import { NextRequest, NextResponse } from "next/server";
import {
  validateParam,
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
} from "@/lib/validate";
import { findPlaces } from "@/lib/data";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") ?? undefined;
  const { valid, sanitized } = validateParam(
    raw,
    Q_REGEX,
    MIN_LENGTH,
    Q_MAX_LENGTH,
  );

  if (!valid || !sanitized) return NextResponse.json([]);

  const results = await findPlaces(sanitized);

  return NextResponse.json(results);
}
