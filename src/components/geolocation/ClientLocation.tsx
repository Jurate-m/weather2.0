import { cookies } from "next/headers";
import { isValidCoords } from "@/_lib/validate";
import DynamicWrapepr from "./DynamicWrapepr";

export default async function ClientLocation() {
  const cookie = await cookies();
  const latCookie = cookie.get("lat")?.value;
  const lonCookie = cookie.get("lon")?.value;

  let validCookies: boolean = false;
  const cookiesPresent = !!(latCookie && lonCookie);

  if (cookiesPresent) validCookies = isValidCoords(latCookie, lonCookie);

  return <DynamicWrapepr validCookies={validCookies} />;
}
