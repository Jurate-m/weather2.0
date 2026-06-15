import { cookies } from "next/headers";
import { cookiesLocation } from "@/_lib/cookies-location";
import { paramsLocation } from "@/_lib/params-location";
import Error from "../ui/Error";
import CurrentWrapper from "./current-wrapper";

export default async function Current({
  params,
}: {
  params: Promise<{ location?: string }>;
}) {
  const { location } = await params;
  const cookie = await cookies();

  let details = null;

  if (!location) {
    details = await cookiesLocation(cookie);
  }

  if (location) {
    details = await paramsLocation(location);
  }

  if (details?.error) {
    return (
      <Error>
        <p className='text-2xl font-semibold pb-2'>{details.error}</p>
        <p className=''>Please use search form and try again.</p>
      </Error>
    );
  }

  if (details && location) {
    return <CurrentWrapper location={details} />;
  }
}
