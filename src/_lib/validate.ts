type validateStringType = {
  query: unknown;
  type: keyof typeof VALIDATE_RULES | "q" | "param";
};

const MIN_LENGTH = 1;
const Q_MAX_LENGTH = 25;
const Q_REGEX = /^[\p{L}\p{N}\s\-,.']+$/u;
const LOCATION_MAX_LENGTH = 100;
const LOCATION_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const VALIDATE_RULES = {
  q: {
    regex: Q_REGEX,
    min: MIN_LENGTH,
    max: Q_MAX_LENGTH,
  },
  param: {
    regex: LOCATION_REGEX,
    min: MIN_LENGTH,
    max: LOCATION_MAX_LENGTH,
  },
};

export const err_message = (type: keyof typeof VALIDATE_RULES) => {
  return {
    too_short: `Your query must contain at least ${VALIDATE_RULES[type].min} character${VALIDATE_RULES[type].min > 1 ? "s" : ""}}`,
    too_long: `Your query must be under ${VALIDATE_RULES[type].max} characters`,
    invalid_chars: "Your query contains invalid characters",
    not_found: "No results were found based on your query",
  };
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

export const sanitize = (arg: unknown) => {
  if (typeof arg !== "string" && typeof arg !== "number") return "";
  return arg.toString().trim().toLowerCase();
};

export const validateString = (
  query: unknown,
  type: keyof typeof VALIDATE_RULES,
) => {
  const { regex, min, max } = VALIDATE_RULES[type];

  const sanitized = sanitize(query);

  if (sanitized.length < min) return { message: "too_short", sanitized };

  if (!regex.test(sanitized)) return { message: "invalid_chars", sanitized };

  if (sanitized.length > max) return { message: "too_long", sanitized };

  return { message: "", sanitized };
};
