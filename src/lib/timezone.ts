import { format, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const EUROPEAN_TIMEZONE = "Europe/London";

export const formatDateInUserTimezone = (
  date: string | Date,
  formatString: string = "PPP",
  timezone: string = EUROPEAN_TIMEZONE
) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatInTimeZone(dateObj, timezone, formatString);
};

export const getCurrentDateInTimezone = (timezone: string = EUROPEAN_TIMEZONE) => {
  return toZonedTime(new Date(), timezone);
};

export const formatTimeInUserTimezone = (
  date: string | Date,
  timezone: string = EUROPEAN_TIMEZONE
) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatInTimeZone(dateObj, timezone, "HH:mm");
};

export const formatDateTimeInUserTimezone = (
  date: string | Date,
  timezone: string = EUROPEAN_TIMEZONE
) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatInTimeZone(dateObj, timezone, "PPP 'at' HH:mm");
};