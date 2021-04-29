/**
 * Converts given to date to UTC format date
 */
const convertDateToUTC = date => new Date(date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
  date.getUTCHours(),
  date.getUTCMinutes(),
  date.getUTCSeconds());

export default convertDateToUTC;
