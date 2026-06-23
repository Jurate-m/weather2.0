import Error from "../ui/Error";
import { ERROR_MESSAGE } from "@/_lib/validate";
import { cookiesLocation } from "@/_lib/cookies-location";
import { paramsLocation } from "@/_lib/params-location";
import { cookies } from "next/headers";

import ForecastListing from "./forecastListing";

export default async function ForecastLocation({
  searchParams,
  param,
}: {
  searchParams: Promise<{ location?: string; page?: number }>;
  param: string;
}) {
  const { location, page } = await searchParams;
  const cookie = await cookies();

  const { place_id, name, country, error } = location
    ? await paramsLocation(location)
    : await cookiesLocation(cookie);

  if (error)
    return (
      <Error>
        <p className='text-2xl font-semibold pb-2'>
          {ERROR_MESSAGE[error as keyof typeof ERROR_MESSAGE]
            ? `Your query ${ERROR_MESSAGE[error as keyof typeof ERROR_MESSAGE]}`
            : error}
        </p>
        <p className=''>Please use search form and try again.</p>
      </Error>
    );

  return (
    <div>
      {/* @ts-ignore */}
      <ForecastListing
        location_id={place_id}
        name={name}
        country={country}
        page={page ?? 1}
        param={param}
      />
    </div>
  );
}
