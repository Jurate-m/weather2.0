"use server";

import { cookies } from "next/headers";
import { isValidCoords } from "@/lib/validate";

export async function saveClientCoordsCookie(lat: number, lon: number) {
  const latitude = Math.round(lat * 10) / 10;
  const longitude = Math.round(lon * 10) / 10;

  const validCoords = isValidCoords(latitude, longitude);

  if (!validCoords) return;

  const cookie = await cookies();

  const options = {
    httpOnly: true,
    sameSite: "strict" as const,
    maxAge: 8400,
    secure: true,
    path: "/",
  };

  cookie.set("lat", String(latitude), options);
  cookie.set("lon", String(longitude), options);
}

export async function deleteClientCoordsCookie() {
  const cookie = await cookies();

  if (cookie.get("lat")) cookie.delete("lat");
  if (cookie.get("lon")) cookie.delete("lon");
}
