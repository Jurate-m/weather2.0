import {
  validateParam,
  MIN_LENGTH,
  LOCATION_REGEX,
  MAX_LENGTH,
  ERROR_MESSAGE,
} from "@/_lib/validate";
import { findPlaces } from "@/_lib/data";

type locationType = {
  place: {
    name: null | string;
    country: null | string;
  };
  id: null | string;
  error: null | string;
};

export const paramsLocation = async (param: string) => {
  const location = <locationType>{
    place: { name: null, country: null },
    id: null,
    error: null,
  };

  const { sanitized, error } = validateParam(
    param,
    LOCATION_REGEX,
    MIN_LENGTH,
    MAX_LENGTH,
  );

  if (error) {
    //@ts-ignore
    location.error = `Location query ${ERROR_MESSAGE[error]}`;
    return location;
  }

  //@ts-ignore
  const places = await findPlaces(sanitized);
  const match = places?.find((p: any) => p.place_id === sanitized);

  if (!match) {
    location.error = "Location doesn't exist. Try again.";
    return location;
  }

  if (sanitized) {
    location.id = sanitized;

    location.place = {
      ...location.place,
      name: match.name,
      country: match.country,
    };
  }

  return location;
};
