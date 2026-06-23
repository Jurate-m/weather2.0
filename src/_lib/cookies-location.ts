import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { validCoords } from "./validate";
import { nearestPlace } from "@/_lib/data";

type LocationType = {
  place_id: null | string;
  name: null | string;
  country: null | string;
  error: null | string;
};

export const cookiesLocation = async (cookie: ReadonlyRequestCookies) => {
  const location = <LocationType>{
    place_id: null,
    name: null,
    country: null,
    error: null,
  };

  const latCookie = cookie.get("lat")?.value;
  const lonCookie = cookie.get("lon")?.value;

  const coords = validCoords(latCookie, lonCookie);

  if (!coords) {
    location.error = "Coordinates are not valid.";
    return location;
  }

  const coordsEndpoint = `lat=${latCookie}&lon=${lonCookie}`;
  const { place_id, name, country } = await nearestPlace(coordsEndpoint);

  location.place_id = place_id;
  location.name = name;
  location.country = country;

  return location;
};
