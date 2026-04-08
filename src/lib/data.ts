// // import { ForecastEntry } from "@/utils/interfaces";

// async function fetchData(endpoint?: string) {
//   const url = `${process.env.RAPID_URL}${endpoint ? endpoint : ""}`;

//   const options: RequestInit = {
//     cache: "force-cache",
//     headers: {
//       "x-rapidapi-key": `${process.env.RAPID_KEY}`,
//       "x-rapidapi-host": `${process.env.RAPID_HOST}`,
//     },
//   };

//   const results = await fetch(url, options);

//   if (!results.ok)
//     // throw new Error(
//     //   "There was a problem retrieving forecast. Please try again",
//     // );
//     throw new Error(
//       `API error: ${results.status} ${results.statusText} — ${url}`,
//     );

//   return await results.json();
// }

// export async function nearestPlace(coords: string) {
//   return await fetchData(`nearest_place?${coords}`);
// }

// export async function findPlaces(searchQuery: string) {
//   return await fetchData(`find_places_prefix?text=${searchQuery}`);
// }

// export async function fetchCurrentWeather(place_id: string) {
//   return await fetchData(`current?place_id=${place_id}`);
// }

// export async function fetchHourlyWeather(place_id: string) {
//   return await fetchData(`hourly?place_id=${place_id}`);
// }

// export async function fetchDailyWeather(place_id: string) {
//   return await fetchData(`daily?place_id=${place_id}`);
// }

import { cache } from "react";
import { unstable_cache } from "next/cache";

async function fetchData(endpoint?: string) {
  const url = `${process.env.RAPID_URL}${endpoint ? endpoint : ""}`;

  const options: RequestInit = {
    headers: {
      "x-rapidapi-key": `${process.env.RAPID_KEY}`,
      "x-rapidapi-host": `${process.env.RAPID_HOST}`,
    },
  };

  const results = await fetch(url, options);

  if (!results.ok)
    throw new Error(
      `API error: ${results.status} ${results.statusText} — ${url}`,
    );

  return await results.json();
}

// cache() = deduplicates within the same render (fixes your 429s)
// unstable_cache() = persists across requests on the server (replaces force-cache)

export const nearestPlace = cache(
  unstable_cache(
    async (coords: string) => fetchData(`nearest_place?${coords}`),
    ["nearest_place"],
    { revalidate: 1800 },
  ),
);

export const findPlaces = cache(
  unstable_cache(
    async (searchQuery: string) =>
      fetchData(`find_places_prefix?text=${encodeURIComponent(searchQuery)}`),
    ["find_places"],
    { revalidate: 86400 },
  ),
);

export const fetchCurrentWeather = cache(
  unstable_cache(
    async (place_id: string) => fetchData(`current?place_id=${place_id}`),
    ["current_weather"],
    { revalidate: 900 },
  ),
);

export const fetchHourlyWeather = cache(
  unstable_cache(
    async (place_id: string) => fetchData(`hourly?place_id=${place_id}`),
    ["hourly_weather"],
    { revalidate: 1800 },
  ),
);

export const fetchDailyWeather = cache(
  unstable_cache(
    async (place_id: string) => fetchData(`daily?place_id=${place_id}`),
    ["daily_weather"],
    { revalidate: 3600 },
  ),
);
