import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

import { normalize, validateString } from "@/_lib/validate";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "weather_app",
});

export default async function proxy(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const location = req.nextUrl.searchParams.get("location");

  if (!q && !location) return;

  const normalized = q ? normalize(q) : null;

  const invalidMessage = normalized ? validateString(normalized, "q") : null;

  if (invalidMessage?.message) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("q");
    return NextResponse.redirect(url);
  }

  const query = normalized || location;

  const ip =
    req.headers.get("x-real-ip") ?? //* Vercel added header
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? //* default header from request
    "unknown";

  if (query) {
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);

      if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Too many requests" },
          {
            status: 429,
            headers: {
              "Retry-After": retryAfter.toString(),
            },
          },
        );
      }

      return NextResponse.rewrite(new URL("/something-went-wrong", req.url), {
        request: {
          headers: new Headers({
            ...Object.fromEntries(req.headers),
            //* custom headers
            "x-rate-limit-reason": "ip",
            "retry-after": retryAfter.toString(),
            "x-RateLimit-Reset": reset.toString(),
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
