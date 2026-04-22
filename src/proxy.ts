import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

import {
  validateParam,
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
} from "@/lib/validate";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "weather_app",
});

export default async function proxy(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const location = req.nextUrl.searchParams.get("location");

  // * validate q
  const validateQ =
    q && q.toString()
      ? validateParam(q.toString(), Q_REGEX, MIN_LENGTH, Q_MAX_LENGTH)
      : "";

  const validQ = validateQ && validateQ.sanitized ? validateQ.sanitized : "";

  if (q && !validQ) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("q");
    return NextResponse.redirect(url);
  }

  const query = validQ || location;

  const ip =
    req.headers.get("x-real-ip") ?? //* Vercel added header
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? //* default header from request
    "unknown";

  if (query) {
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.rewrite(new URL("/something-went-wrong", req.url), {
        request: {
          headers: new Headers({
            ...Object.fromEntries(req.headers),
            //* custom headers
            "x-rate-limit-reason": "ip",
          }),
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|something-went-wrong).*)",
  ],
};
