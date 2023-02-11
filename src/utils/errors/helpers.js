import { isAxiosError } from 'axios';

/**
 *
 * This is a guard to determine if the payload is an error thrown by axios
 */
export function isAPIError(payload) {
  return isAxiosError(payload) && payload.response.data === 'object';
}
