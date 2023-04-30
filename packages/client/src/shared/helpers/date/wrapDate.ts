import { DateTime } from 'luxon';

/**
 *
 * Create Luxon instance from UTC string
 *
 * @example
 * wrapDate('Tue, 27 Sep 2022 00:00:00 GMT')
 */
export const wrapDateFromUTCString = (UTCString: string): DateTime => {
  const JSDate = new Date(UTCString);
  if (isNaN(+JSDate)) {
    console.error('Invalid UTCString argument');
  }
  return DateTime.fromJSDate(JSDate);
};
