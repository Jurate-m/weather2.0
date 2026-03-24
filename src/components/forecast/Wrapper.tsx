import { cookies } from "next/headers";
import { isValidQuery } from "@/utils/functions";
import ClientCoords from "../ClientCoords";
import CurrentContainer from "./current/CurrentContainer";
import { notFound } from "next/navigation";
import Daily from "./Daily";
import Hourly from "./Hourly";

const ForecastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h1 className='text-4xl font-bold pb-6'>Vilnius</h1>
      {children}
    </section>
  );
};

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
      <ForecastContainer>
        <Daily />
      </ForecastContainer>
    );

  if (params === "hourly")
    return (
      <ForecastContainer>
        <Hourly />
      </ForecastContainer>
    );

  if (!params)
    return (
      <ForecastContainer>
        <CurrentContainer location={location} coords={coordsCookie} />
      </ForecastContainer>
    );
}
