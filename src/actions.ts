"use server";

import { cookies } from "next/headers";
import { validateCoords } from "@/lib/validate";

export async function saveClientCoordsCookie(lat: number, lon: number) {
  const latitude = lat;
  const longitude = lon;

  const validCoords = validateCoords(latitude, longitude);

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
