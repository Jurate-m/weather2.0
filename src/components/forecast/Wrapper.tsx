import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { nearestPlace } from "@/lib/data";
import { isValidQuery } from "@/utils/functions";

import CurrentContainer from "./current/CurrentContainer";
import DynamiContainer from "./dynamic/DynamiContainer";

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

  // * await search params
  const { location, name, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  // * if no location search param
  if (!location) {
    // * try to get a cookie value
    const cookie = await cookies();
    const coordsCookie = cookie.get("c_coords")?.value;

    // * if no cookie present
    if (!coordsCookie) return;

    // * if cookies exists - retrieve closest location with cookies value (need some sort of safe guard for value)
    if (coordsCookie) {
      const { place_id, name } = await nearestPlace(coordsCookie);

      // * if place_id and name is undefined / null -> return error message
      if (!place_id) return;

      // * else -> assign values
      locationName = name;
      locationId = place_id;
    }
  }

  // * if location exists
  if (location && name) {
    // * check if location is 'valid'
    const validLocation =
      location && location.length ? isValidQuery(location) : false;

    // * if invalid -> return error message
    if (!validLocation) return;

    // * else -> assign values
    locationName = name;
    locationId = location;
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
