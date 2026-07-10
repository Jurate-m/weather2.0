import { NextRequest, NextResponse } from "next/server";
import {
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
  sanitize,
  validateString,
} from "@/_lib/validate";
import { findPlaces } from "@/_lib/data";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") ?? undefined;

  const sanitized = sanitize(raw);

  const invalid = validateString(sanitized, Q_REGEX, MIN_LENGTH, Q_MAX_LENGTH);

  if (invalid.message) return NextResponse.json([]);

  const results = await findPlaces(sanitized);

  return NextResponse.json(results);
}
