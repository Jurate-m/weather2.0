async function fetchData(endpoint?: string) {
  console.log("RAPID_KEY:", process.env.RAPID_KEY ?? "❌ UNDEFINED");
  // const url = `${process.env.RAPID_URL}${endpoint ? endpoint : ""}`;
  const url = `https://ai-weather-by-meteosource.p.rapidapi.com/${endpoint ? endpoint : ""}`;

  const options: RequestInit = {
    cache: "force-cache",
    // headers: {
    //   "x-rapidapi-key": `${process.env.RAPID_KEY}`,
    //   "x-rapidapi-host": `${process.env.RAPID_HOST}`,
    // },
    // @ts-ignore
    headers: {
      "x-rapidapi-key": process.env.RAPID_KEY,
      "x-rapidapi-host": process.env.RAPID_HOST,
      "Content-Type": "application/json",
    },
  };

  const results = await fetch(url, options);
  const body = await results.text();

  if (!results.ok) {
    // throw new Error(
    //   "There was a problem retrieving forecast. Please try again",
    // );
    console.log("API ERROR BODY:", results.status, body);
    throw new Error(
      `API error: ${results.status} ${results.statusText} — ${url}`,
    );
  }

  return await results.json();
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
