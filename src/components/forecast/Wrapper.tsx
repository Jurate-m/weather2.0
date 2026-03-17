import { cookies } from "next/headers";
import { isValidQuery } from "@/utils/functions";
import ClientCoords from "../ClientCoords";
import Current from "./Current";
import { notFound } from "next/navigation";
import Daily from "./Daily";
import Hourly from "./Hourly";

export default async function Wrapper({
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
        <Daily />
      </section>
    );

  if (params === "hourly")
    return (
      <section>
        <Hourly />
      </section>
    );

  if (!params)
    return (
      <section>
        <Current
          validLocation={validLocation}
          location={location}
          coords={coordsCookie}
        />
      </section>
    );
}
