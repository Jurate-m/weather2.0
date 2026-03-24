import { cookies } from "next/headers";
import { nearestPlace } from "@/lib/data";

import { isValidQuery } from "@/utils/functions";
import ClientCoords from "../ClientCoords";
import CurrentContainer from "./current/CurrentContainer";
import { notFound } from "next/navigation";
import Daily from "./Daily";
import Hourly from "./Hourly";

const ForecastContainer = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string | undefined;
}) => {
  return (
    <section>
      <h1 className='text-4xl font-bold pb-6'>{name}</h1>
      {children}
    </section>
  );
};

export default async function Wrapper({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    location?: string | undefined;
    name?: string | undefined;
  }>;
  params?: string;
}) {
  // * check if params exist but they don't fall under: "daily" || "hourly" - trigger not found page
  if (params && params !== "daily" && params !== "hourly") return notFound();

  let locationName = null;
  let locationId = null;

  // * await search params
  const { location, name } = await searchParams;

  // * if no location search param
  if (!location) {
    // * try to get a cookie value
    const cookie = await cookies();
    const coordsCookie = cookie.get("c_coords")?.value;

    // * if no cookie present
    if (!coordsCookie)
      return (
        <section>
          <ClientCoords />
        </section>
      );
    // * ^ triggers permissions or returns 'denied' message

    // * if cookies location exists - retrieve closest location with cookies value (need some sort of safe guard for value)
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

  if (params === "daily")
    return (
      <ForecastContainer name={locationName}>
        <Daily />
      </ForecastContainer>
    );

  if (params === "hourly")
    return (
      <ForecastContainer name={locationName}>
        <Hourly />
      </ForecastContainer>
    );

  if (!params)
    return (
      <>
        <ForecastContainer name={locationName}>
          <CurrentContainer location={locationId} />
        </ForecastContainer>
      </>
    );
}
