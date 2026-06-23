import { cookies } from "next/headers";
import { cookiesLocation } from "@/_lib/cookies-location";
import { paramsLocation } from "@/_lib/params-location";
import Error from "../ui/Error";
import CurrentWrapper from "./current-wrapper";
import { ERROR_MESSAGE } from "@/_lib/validate";

export default async function Current({
  params,
}: {
  params: Promise<{ location?: string }>;
}) {
  const { location } = await params;
  const cookie = await cookies();

  const { place_id, name, country, error } = location
    ? await paramsLocation(location)
    : await cookiesLocation(cookie);

  if (error) {
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
  }

  if (place_id && location) {
    return <CurrentWrapper location={{ place_id, name, country }} />;
  }
}
