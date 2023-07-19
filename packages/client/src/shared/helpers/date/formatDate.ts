import { DateTime } from 'luxon';
import { wrapDateFromUTCString } from './wrapDate';

export enum FormatEnum {
  date = 'dd.LL.yyyy HH:mm', // '12.12.2023'
}

export const formatDateFromDateTime = (
  dateTime: DateTime,
  format: string | FormatEnum = FormatEnum['date']
) => {
  return dateTime.toFormat(format);
};

export const formatDateFromUTCString = (
  UTCString?: Nullable<string>,
  format: string | FormatEnum = FormatEnum['date']
) => {
  if (!UTCString) {
    return UTCString;
  }
  return wrapDateFromUTCString(UTCString).toFormat(format);
};
