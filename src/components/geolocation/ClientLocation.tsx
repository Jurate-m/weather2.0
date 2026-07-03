import { cookies } from "next/headers";
import { validCoords } from "@/_lib/validate";
import UserConsent from "./UserConsent";

export default async function ClientLocation() {
  const cookie = await cookies();
  const latCookie = cookie.get("lat")?.value;
  const lonCookie = cookie.get("lon")?.value;

  let validCookies = false;
  const cookiesPresent = !!(latCookie && lonCookie);

  if (cookiesPresent) validCookies = validCoords(latCookie, lonCookie);

  return <UserConsent cookies={validCookies} />;
}
