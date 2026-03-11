import { cookies } from "next/headers";
import { isValidQuery } from "@/utils/functions";
import ClientCoords from "../ClientCoords";

import CurrentWeather from "./CurrentWeather";

export default async function WeatherWrapper({
  params,
}: {
  params: Promise<{
    q: string | undefined;
    location: string | undefined;
  }>;
}) {
  const { location } = await params;

  const cookie = await cookies();

  const coordsCookie = cookie.get("c_coords")?.value;

  const validLocation =
    location && location.length ? isValidQuery(location) : false;

  if (!validLocation && !coordsCookie) return <ClientCoords />;

  return (
    <>
      <CurrentWeather
        validLocation={validLocation}
        location={location}
        coords={coordsCookie}
      />
    </>
  );
}
