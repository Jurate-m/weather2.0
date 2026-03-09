"use server";

import { cookies } from "next/headers";

export async function saveClientCoordsCookie(lat: number, lon: number) {
  const cookieVal = `lat=${lat}&lon=${lon}`;
  const cookie = await cookies();

  cookie.set("c_coords", cookieVal, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 8400,
    secure: true,
    path: "/",
  });
}

export async function deleteClientCoordsCookie() {
  const cookie = await cookies();

  if (cookie.get("c_coords")) cookie.delete("c_coords");
}
