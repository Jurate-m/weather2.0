export function isValidQuery(value: string) {
  return /^[\p{L}0-9 ,\-]{1,50}$/u.test(value);
}
