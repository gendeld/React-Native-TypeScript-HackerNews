export const getTimestampString = (time: number) => {
  // Time comes in seconds since 1970, convert to ms since
  const date = new Date(time * 1000);
  return date.toDateString();
};
