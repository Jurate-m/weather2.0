import { fetchAPI } from "../api";

const getIp = async () => {
  const response = await fetch(`${process.env.IPAPI_URL}`);

  if (!response.ok)
    throw new Error(
      `There was a problem retrieving client IP Address: ${response.status} /n${response.statusText}`,
    );

  const data = await response.json();

  return data;
};

const getLocationId = async () => {
  const ip = await getIp();

  const { lat, lon } = ip;

  const data = await fetchAPI(`nearest_place?lat=${lat}&lon=${lon}`);

  return data.place_id;
};

export { getLocationId };
