import { getLocationId } from "./location";
import { fetchAPI } from "../api";

const getCurrentWeather = async (placeid?: string) => {
  let id = placeid;

  if (!id) id = await getLocationId();

  const data = await fetchAPI(`current?place_id=${id}`);

  return data;
};

export { getCurrentWeather };
