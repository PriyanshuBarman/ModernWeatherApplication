export const epochTimeConverter = (epochTime, timeZone) => {
  if (!timeZone) return undefined; // Guard clause for undefined `live` or `zoneName`
  const utcTime = new Date(epochTime * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  });
  return formatter.format(utcTime);
};

export const epochDayConverter = (epochTime, timeZone) => {
  const date = new Date(epochTime * 1000);
  const dayName = date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: timeZone,
  });
  return dayName;
};
