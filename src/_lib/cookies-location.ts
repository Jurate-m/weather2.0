import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { isValidCoords } from "@/_lib/validate";
import { nearestPlace } from "@/_lib/data";

type locationType = {
  place: {
    name: null | string;
    country: null | string;
  };
  id: null | string;
  error: null | string;
};

export const cookiesLocation = async (cookie: ReadonlyRequestCookies) => {
  const location = <locationType>{
    place: { name: null, country: null },
    id: null,
    error: null,
  };

  const latCookie = cookie.get("lat")?.value;
  const lonCookie = cookie.get("lon")?.value;

  const validCoords = isValidCoords(latCookie, lonCookie);

  if (!validCoords) {
    location.error = "Coordinates are not valid.";
    return location;
  }

  const coordsEndpoint = `lat=${latCookie}&lon=${lonCookie}`;
  const { place_id, name, country } = await nearestPlace(coordsEndpoint);

  // // * if place_id and name is undefined / null -> return error message
  // if (!place_id) return;

  // * else -> assign values
  location.place = { ...location.place, name, country };
  location.id = place_id;

  console.log(location);
  return location;
};
