import { fetchCurrentWeather, nearestPlace } from "@/lib/data";
import Current from "./Current";

import { HomeForecastSkeleton } from "@/components/skeletons";

import { forecastData } from "@/lib/data";

export default async function CurrentContainer({
  location,
  coords,
}: {
  location: string | undefined;
  coords: string | undefined;
}) {
  // "use cache";

  // if (location) {
  //   forecast = await fetchCurrentWeather(location);
  // }

  // if (!location && coords) {
  //   const locationID = (await nearestPlace(coords))?.place_id;
  //   forecast = await fetchCurrentWeather(locationID);
  // }

  const promiseDelay = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Lorem");
    }, 1500);
  });

  await promiseDelay;

  return (
    <>
      {/* <HomeForecastSkeleton /> */}
      <Current data={forecastData} />
    </>
  );
}
