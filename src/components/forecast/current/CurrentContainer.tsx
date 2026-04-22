import { fetchHourlyWeather } from "@/lib/data";
import { HourlyData } from "@/utils/interfaces";
import Current from "./Current";

import Error from "@/components/ui/Error";

export default async function CurrentContainer({
  location,
}: {
  location: string;
}) {
  "use cache";

  let forecast: HourlyData | null = null;
  let errorMsg: string | null = null;

  try {
    forecast = await fetchHourlyWeather(location);
  } catch (error: unknown) {
    errorMsg = (error as Error).message;
  }

  if (errorMsg) {
    return (
      <Error>
        <p className='text-2xl font-semibold pb-2'>
          Couldn't retrieve foreacast data.
        </p>
        <p className=''>Please use search form and try again.</p>
      </Error>
    );
  }

  return <Current data={forecast} />;
}
