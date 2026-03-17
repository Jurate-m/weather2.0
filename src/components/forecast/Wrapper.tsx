import { cookies } from "next/headers";
import { isValidQuery } from "@/utils/functions";
import ClientCoords from "../ClientCoords";
import CurrentWeather from "./Current";
import { notFound } from "next/navigation";
import DailyWeather from "./Daily";
import HourlyWeather from "./Hourly";

export default async function WeatherWrapper({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    q?: string | undefined;
    location?: string | undefined;
  }>;
  params?: string;
}) {
  const { location } = await searchParams;

  const cookie = await cookies();

  const coordsCookie = cookie.get("c_coords")?.value;

  const validLocation =
    location && location.length ? isValidQuery(location) : false;

  if (!validLocation && !coordsCookie) return <ClientCoords />;

  if (params && params !== "daily" && params !== "hourly") return notFound();

  if (params === "daily")
    return (
      <section>
        <DailyWeather />
      </section>
    );

  if (params === "hourly")
    return (
      <section>
        <HourlyWeather />
      </section>
    );

  if (!params)
    return (
      <section>
        <CurrentWeather
          validLocation={validLocation}
          location={location}
          coords={coordsCookie}
        />
      </section>
    );
}
