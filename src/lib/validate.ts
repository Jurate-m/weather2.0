type validateQueryType = {
  valid: boolean;
  error?: string;
  sanitized?: string;
};

export const MIN_LENGTH = 2;
export const Q_MAX_LENGTH = 25;
export const Q_REGEX = /^[\p{L}\p{N}\s\-,.']+$/u;
export const LOCATION_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const MAX_LENGTH = 100;

export const ERROR_MESSAGE = {
  too_short: `Query must contain at least ${MIN_LENGTH} characters`,
  too_long: `Query must be under ${Q_MAX_LENGTH} characters`,
  invalid_chars: "Your query contains invalid characters",
};

export function validateParam(
  query: string,
  REGEX: RegExp,
  min_length: number,
  max_length: number,
): validateQueryType {
  const q = query.trim();

  if (!q)
    return {
      valid: false,
      error: "empty",
    };

  if (!REGEX.test(q)) {
    return { valid: false, error: "invalid_chars" };
  }

  if (q.length < min_length) {
    return {
      valid: false,
      error: "too_short",
    };
  }

  if (q.length > max_length) {
    return { valid: false, error: "too_long" };
  }

  return { valid: true, sanitized: q.toLowerCase() };
}

export function isValidCoords(lat: unknown, lon: unknown): boolean {
  if (!lat || !lon) return false;

  const latitude = Number(lat);
  const longitude = Number(lon);

  if (isNaN(latitude) || isNaN(longitude)) return false;

  return (
    latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
  );
}
