import { cookies } from "next/headers";
import { isValidCoords } from "@/lib/validate";
import UserConsent from "./UserConsent";
import { Suspense } from "react";

export default async function ClientLocation() {
  const cookie = await cookies();
  const latCookie = cookie.get("lat")?.value;
  const lonCookie = cookie.get("lon")?.value;

  let validCookies: boolean = false;
  const cookiesPresent = !!(latCookie && lonCookie);

  if (cookiesPresent) validCookies = isValidCoords(latCookie, lonCookie);

  return (
    <Suspense>
      <UserConsent cookies={validCookies} />
    </Suspense>
  );
}
