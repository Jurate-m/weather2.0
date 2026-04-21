type validateQueryType = {
  valid: boolean;
  error?: string;
  sanitized?: string;
};

export const Q_MIN_LENGTH = 2;
export const Q_MAX_LENGTH = 25;
export const Q_REGEX = /^[\p{L}\p{N}\s\-,.']+$/u;

export function validateQuery(query: string): validateQueryType {
  const q = query.trim();

  if (!q)
    return {
      valid: false,
      error: "empty",
    };

  if (!Q_REGEX.test(q)) {
    return { valid: false, error: "invalid_chars" };
  }

  if (q.length < Q_MIN_LENGTH) {
    return {
      valid: false,
      error: "too_short",
    };
  }

  if (q.length > Q_MAX_LENGTH) {
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
