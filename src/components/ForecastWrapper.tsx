import { cookies } from "next/headers";
import { cookiesLocation } from "@/_lib/cookies-location";
import { paramsLocation } from "@/_lib/params-location";
import { ERROR_MESSAGE } from "@/_lib/validate";
import Error from "./ui/Error";
import ForecastListing from "./params/forecastListing";
import CurrentWrapper from "./homepage/current-wrapper";

type ForecastWrapperType = {
  searchParams: Promise<{ location?: string; page?: number }>;
  slug?: "daily" | "hourly";
};

export default async function ForecastWrapper({
  searchParams,
  slug,
}: ForecastWrapperType) {
  const { location, page } = await searchParams;
  const cookie = await cookies();

  const { place_id, name, country, error } = location
    ? await paramsLocation(location)
    : await cookiesLocation(cookie);

  if (!place_id) return;

  if (error.code) {
    return (
      <Error>
        <p className='text-2xl font-semibold pb-2'>
          {ERROR_MESSAGE[error.code as keyof typeof ERROR_MESSAGE]
            ? ERROR_MESSAGE[error.code as keyof typeof ERROR_MESSAGE]
            : error.code}
          {error.query ? `: ${error.query}` : null}
        </p>
        <p className=''>Please use search form and try again.</p>
      </Error>
    );
  }

  if (place_id) {
    return (
      <>
        {slug && (
          <ForecastListing
            location_id={place_id}
            name={name ?? undefined}
            country={country ?? undefined}
            page={page ?? 1}
            param={slug}
          />
        )}

        {!slug && <CurrentWrapper location={{ place_id, name, country }} />}
      </>
    );
  }
}
