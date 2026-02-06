import { type NextRequest } from "next/server";

import { getCurrentWeather } from "@/lib/services/current-weather";

export async function GET(request: NextRequest) {
  const location = request.nextUrl.searchParams.get("location") || undefined;

  try {
    const data = await getCurrentWeather(location);
    return Response.json(data);
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
}
