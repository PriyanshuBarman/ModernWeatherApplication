export const getImageName = (description, isDayOrNight) => {
  if (["overcast clouds", "scattered clouds"].includes(description)) {
    return "scatteredOvercastClouds";
  }
  if (["few clouds", "broken clouds"].includes(description)) {
    return "fewBrokenClouds";
  }

  if (["light rain", "moderate rain"].includes(description)) {
    return "lightModerateRain";
  }

  if (["heavy intensity rain", "very heavy rain"].includes(description)) {
    return "heavyRain";
  }

  if (["light snow", "snow", "heavy snow"].includes(description)) {
    return "snow";
  }

  if (
    ["light intensity drizzle", "drizzle", "heavy intensity drizzle"].includes(
      description,
    )
  ) {
    return "lightModerateRain";
  }

  if (
    ["thunderstorm with light rain", "thunderstorm with heavy rain"].includes(
      description,
    )
  ) {
    return "thunderstorm";
  }
  
  if (["smoke", "fog"].includes(description)) {
    return "smokeFog";
  }

  if (["mist", "haze", "tornado"].includes(description)) {
    return description; // Return the description as the image name
  }
  // Special case for "clear sky" based on day or night
  if (description === "clear sky") {
    return isDayOrNight === "d" ? "clearSky" : "moon";
  }

  // Default fallback image
  return "scatteredOvercastClouds";
};
