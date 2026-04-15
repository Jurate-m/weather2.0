import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  timeout: 1000,
  analytics: true,
  prefix: "weather_app",
});

export default async function proxy(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";

  const location =
    req.nextUrl.searchParams.get("location")?.trim().toLowerCase() ?? "";

  const query = q || location;

  // * IF neither location or query present - do nothing
  if (!query) return NextResponse.next();

  const ip =
    req.headers.get("x-real-ip") ?? //* Vercel added header
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? //* default header from request
    "unknown";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.rewrite(new URL("/something-went-wrong", req.url), {
      request: {
        headers: new Headers({
          ...Object.fromEntries(req.headers),
          "x-rate-limit-reason": "ip", //* custom header
        }),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|something-went-wrong).*)",
  ],
};
