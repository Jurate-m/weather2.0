import { cookies } from "next/headers";
import { isValidCoords } from "@/lib/validate";
import ClientCoordsInner from "./ClientCoordsInner";

export default async function ClientCoords({
  locationQuery,
}: {
  locationQuery?: Promise<{ location?: string }>;
}) {
  const cookie = await cookies();
  const latCookie = cookie.get("lat")?.value;
  const lonCookie = cookie.get("lon")?.value;
  let validCookies: boolean = false;

  const cookiesPresent = !!(latCookie && lonCookie);

  if (cookiesPresent) validCookies = isValidCoords(latCookie, lonCookie);

  return (
    <ClientCoordsInner
      locationQuery={locationQuery}
      validCookies={validCookies}
    />
  );
}
