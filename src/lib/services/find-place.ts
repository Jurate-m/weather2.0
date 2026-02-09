import { fetchAPI } from "../api";

const findPlace = async (fragment: string | null) => {
  const data = await fetchAPI(`find_places_prefix?text=${fragment}`);

  return data;
};

export { findPlace };
