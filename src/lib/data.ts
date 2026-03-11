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
