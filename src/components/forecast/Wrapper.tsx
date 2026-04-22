import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { nearestPlace } from "@/lib/data";
import { isValidCoords } from "@/lib/validate";
import {
  validateParam,
  MIN_LENGTH,
  LOCATION_REGEX,
  MAX_LENGTH,
} from "@/lib/validate";

import CurrentContainer from "./current/CurrentContainer";
import DynamiContainer from "./dynamic/DynamiContainer";
import Error from "../ui/Error";

export default async function Wrapper({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    location?: string | undefined;
    name?: string | undefined;
    page?: string | undefined;
  }>;
  params?: string;
}) {
  // * check if params exist but they don't fall under: "daily" || "hourly" - trigger not found page
  if (params && params !== "daily" && params !== "hourly") return notFound();

  let locationName = null;
  let locationId = null;
  let locationError = null;

  // * await search params
  const { location, name, page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  // * if no location search param
  if (!location) {
    // * try to get a cookie value
    const cookie = await cookies();
    const latCookie = cookie.get("lat")?.value;
    const lonCookie = cookie.get("lon")?.value;

    const validCoords = isValidCoords(latCookie, lonCookie);

    // * if no cookie present
    if (!validCoords) return;

    // * if cookies exists - retrieve closest location with cookies value (need some sort of safe guard for value)
    if (validCoords) {
      const coordsEndpoint = `lat=${latCookie}&lon=${lonCookie}`;
      const { place_id, name } = await nearestPlace(coordsEndpoint);

      // * if place_id and name is undefined / null -> return error message
      if (!place_id) return;

      // * else -> assign values
      locationName = name;
      locationId = place_id;
    }
  }

  // * if location exists
  if (location && name) {
    const { sanitized, error } = validateParam(
      location,
      LOCATION_REGEX,
      MIN_LENGTH,
      MAX_LENGTH,
    );

    locationError = error;

    if (error) {
      return (
        <Error>
          <p className='text-2xl font-semibold pb-2'>
            Location <span className='underline'>{location.toString()}</span>{" "}
            does not exist.
          </p>
          <p className=''>Please use search form and try again.</p>
        </Error>
      );
    }

    locationName = name;
    locationId = sanitized;
  }

  return (
    <section className={`relative ${params ? "narrow" : ""}`}>
      <h1 className='text-4xl font-bold pb-6 max-w-full'>{locationName}</h1>

      {!params && <CurrentContainer location={locationId} />}
      {params && (
        <DynamiContainer
          params={params}
          locationID={locationId}
          page={currentPage}
        />
      )}
    </section>
  );
}
