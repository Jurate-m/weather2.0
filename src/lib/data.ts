async function fetchData(endpoint?: string) {
  const url = `${process.env.RAPID_URL}${endpoint ? endpoint : ""}`;

  const options: RequestInit = {
    cache: "force-cache",
    // @ts-ignore
    headers: {
      "x-rapidapi-key": process.env.RAPID_KEY,
      "x-rapidapi-host": process.env.RAPID_HOST,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `API error: ${response.status} ${response.statusText} — ${url}`,
    );
  }

  return await response.json();
}

export async function nearestPlace(coords: string) {
  "use cache";
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
