import { isAxiosError } from 'axios';

/**
 *
 * This is a guard to determine if the payload is an error thrown by axios
 */
export function isAPIError(payload) {
  return isAxiosError(payload) && payload.response.data === 'object';
}

export function isValidUrl(string) {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

export function convertStringToUpperCase(string) {
  if (string.length <= 3) {
    return string.toUpperCase();
  }
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}
