import { fetchHourlyWeather } from "@/lib/data";
import { HourlyData } from "@/utils/interfaces";
import Current from "./Current";

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
    return <div>{errorMsg}</div>;
  }

  return <Current data={forecast} />;
}
