export const fetchWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=462af939b63db301f7c3708e452b2874&units=metric`,
  );
  const data = await response.json();

  if (!response.ok || !data.coord) {
    throw new Error(
      "City not found. Please check the spelling, or try searching for another city.",
    );
  }
  return data;
};

export const fetchForecastData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=462af939b63db301f7c3708e452b2874&units=metric`,
  );
  return response.json();
};

export const fetchTimeZoneData = async (lat, lon) => {
  const timeResponse = await fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=BEG60N6QBE1T&format=json&by=position&lat=${lat}&lng=${lon}`,
  );
  return timeResponse.json();
};
