import { NextRequest } from "next/server";
import { findPlace } from "@/lib/services/find-place";

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location");

  try {
    const data = await findPlace(location);

    return Response.json(data);
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
}
