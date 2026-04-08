// import { ForecastEntry } from "@/utils/interfaces";

async function fetchData(endpoint?: string) {
  const url = `${process.env.RAPID_URL}${endpoint ? endpoint : ""}`;

  const options: RequestInit = {
    cache: "force-cache",
    headers: {
      "x-rapidapi-key": `${process.env.RAPID_KEY}`,
      "x-rapidapi-host": `${process.env.RAPID_HOST}`,
    },
  };

  const results = await fetch(url, options);

  if (!results.ok)
    // throw new Error(
    //   "There was a problem retrieving forecast. Please try again",
    // );
    throw new Error(
      `API error: ${results.status} ${results.statusText} — ${url}`,
    );

  return await results.json();
}

export async function nearestPlace(coords: string) {
  return await fetchData(`nearest_place?${coords}`);
}

export async function findPlaces(searchQuery: string) {
  return await fetchData(`find_places_prefix?text=${searchQuery}`);
}

export async function fetchCurrentWeather(place_id: string) {
  return await fetchData(`current?place_id=${place_id}`);
}

export async function fetchHourlyWeather(place_id: string) {
  return await fetchData(`hourly?place_id=${place_id}`);
}

export async function fetchDailyWeather(place_id: string) {
  return await fetchData(`daily?place_id=${place_id}`);
}
