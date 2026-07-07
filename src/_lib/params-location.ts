import {
  sanitize,
  validateString,
  MIN_LENGTH,
  LOCATION_REGEX,
  MAX_LENGTH,
} from "./validate";

import { findPlaces } from "@/_lib/data";

type LocationType = {
  place_id: null | string;
  name: null | string;
  country: null | string;
  error: {
    query: null | string;
    code: null | string;
  };
};

export const paramsLocation = async (param: string) => {
  const location = <LocationType>{
    place_id: null,
    name: null,
    country: null,
    error: {
      query: null,
      code: null,
    },
  };

  const sanitized = sanitize(param);

  if (!sanitized) {
    location.error.code = "too_short";
    location.error.query = param.toString();
    return location;
  }

  const invalid = validateString(
    sanitized,
    LOCATION_REGEX,
    MIN_LENGTH,
    MAX_LENGTH,
  );

  if (invalid.message) {
    location.error.code = invalid.message;
    return location;
  }

  const places = await findPlaces(sanitized);
  const match = places?.find((p: any) => p.place_id === sanitized);

  if (!match) {
    location.error.code = "not_found";
    location.error.query = sanitized;
    return location;
  }

  const { name, place_id, country } = match;

  location.name = name;
  location.place_id = place_id;
  location.country = country;

  return location;
};
