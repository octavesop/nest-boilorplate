import { formatInTimeZone } from 'date-fns-tz';

export const convertUtcIso9075Format = (date: Date) =>
  formatInTimeZone(date, 'UTC', 'yyyy-MM-dd HH:mm:ss');
