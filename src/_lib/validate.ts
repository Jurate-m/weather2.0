export const MIN_LENGTH = 2;
export const Q_MAX_LENGTH = 25;
export const Q_REGEX = /^[\p{L}\p{N}\s\-,.']+$/u;
export const LOCATION_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const MAX_LENGTH = 100;

export const ERROR_MESSAGE = {
  too_short: `Your query must contain at least ${MIN_LENGTH} characters`,
  too_long: `Your query must be under ${Q_MAX_LENGTH} characters`,
  invalid_chars: "Your query contains invalid characters",
  not_found: "No results were found based on your query",
};

const blankCoordsVal = (val: unknown) =>
  (typeof val !== "string" && typeof val !== "number") ||
  (typeof val === "string" && !val.trim());

const inRange = (val: unknown, range: number) => {
  if (blankCoordsVal(val)) return false;

  const numb = Number(val);

  return !isNaN(numb) && numb >= -range && numb <= range;
};

export function validCoords(lat: unknown, lon: unknown): boolean {
  return inRange(lat, 90) && inRange(lon, 180);
}

export const sanitize = (arg: any) => {
  return arg.toString().trim().toLowerCase() || "";
};

export const validateString = (
  query: string,
  REGEX: RegExp,
  min_length: number,
  max_length: number,
) => {
  const error = {
    message: "",
  };

  const q = query.trim();

  if (!q) error.message = "empty";

  if (!REGEX.test(q)) error.message = "invalid_chars";

  if (q.length < min_length) error.message = "too_short";

  if (q.length > max_length) error.message = "too_long";

  return error;
};
