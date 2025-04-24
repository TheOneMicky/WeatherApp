
import { WeatherTranslations } from "@/types/weather";

export const translations: WeatherTranslations = {
  "search": {
    "en": "Search city...",
    "sw": "Tafuta jiji..."
  },
  "search_button": {
    "en": "Search",
    "sw": "Tafuta"
  },
  "wind_status": {
    "en": "Wind Status",
    "sw": "Hali ya Upepo"
  },
  "humidity": {
    "en": "Humidity",
    "sw": "Unyevu"
  },
  "allow_location": {
    "en": "Use My Location",
    "sw": "Tumia Eneo Langu"
  },
  "location_tip": {
    "en": "Allow location access for precise weather readings",
    "sw": "Ruhusu ufikiaji wa eneo kwa usomaji sahihi wa hali ya hewa"
  },
  "today": {
    "en": "Today",
    "sw": "Leo"
  },
  "tomorrow": {
    "en": "Tomorrow",
    "sw": "Kesho"
  },
  "day_after_tomorrow": {
    "en": "Day after tomorrow",
    "sw": "Kesho kutwa"
  },
  "error": {
    "en": "An error occurred. Please try again.",
    "sw": "Hitilafu imetokea. Tafadhali jaribu tena."
  },
  "loading": {
    "en": "Loading...",
    "sw": "Inapakia..."
  },
  "english": {
    "en": "English",
    "sw": "Kiingereza"
  },
  "swahili": {
    "en": "Swahili",
    "sw": "Kiswahili"
  },
  "light_mode": {
    "en": "Light Mode",
    "sw": "Hali ya Mchana"
  },
  "dark_mode": {
    "en": "Dark Mode",
    "sw": "Hali ya Usiku"
  },
  // Weather descriptions
  "clear sky": {
    "en": "Clear sky",
    "sw": "Anga safi"
  },
  "few clouds": {
    "en": "Few clouds",
    "sw": "Mawingu machache"
  },
  "scattered clouds": {
    "en": "Scattered clouds",
    "sw": "Mawingu yaliyotawanyika"
  },
  "broken clouds": {
    "en": "Broken clouds",
    "sw": "Mawingu yaliyovunjika"
  },
  "overcast clouds": {
    "en": "Overcast clouds",
    "sw": "Mawingu yanayofunika"
  },
  "light rain": {
    "en": "Light rain",
    "sw": "Mvua nyepesi"
  },
  "moderate rain": {
    "en": "Moderate rain",
    "sw": "Mvua ya wastani"
  },
  "heavy rain": {
    "en": "Heavy rain",
    "sw": "Mvua kubwa"
  },
  "thunderstorm": {
    "en": "Thunderstorm",
    "sw": "Dhoruba ya radi"
  },
  "snow": {
    "en": "Snow",
    "sw": "Theluji"
  },
  "mist": {
    "en": "Mist",
    "sw": "Ukungu"
  },
  "sunny": {
    "en": "Sunny",
    "sw": "Jua"
  },
  "cloudy": {
    "en": "Cloudy",
    "sw": "Mawingu"
  },
  "rainy": {
    "en": "Rainy",
    "sw": "Mvua"
  },
  "windy": {
    "en": "Windy",
    "sw": "Upepo"
  },
  "foggy": {
    "en": "Foggy",
    "sw": "Ukungu"
  },
  "snowy": {
    "en": "Snowy",
    "sw": "Theluji"
  }
};

export const getTranslation = (key: string, language: string): string => {
  if (translations[key.toLowerCase()]) {
    return translations[key.toLowerCase()][language as "en" | "sw"] || key;
  }
  return key;
};

export const formatDate = (timestamp: number, language: string): string => {
  const date = new Date(timestamp * 1000);
  
  if (language === "en") {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } else if (language === "sw") {
    // Custom Swahili date formatting
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Swahili month names
    const months = [
      "Januari", "Februari", "Machi", "Aprili", "Mei", "Juni",
      "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"
    ];
    
    const month = months[date.getMonth()];
    
    return `${day} ${month} ${year}`;
  }
  
  return date.toDateString();
};

export const formatDay = (timestamp: number, language: string): string => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  
  const dateDay = new Date(date);
  dateDay.setHours(0, 0, 0, 0);
  
  if (dateDay.getTime() === today.getTime()) {
    return getTranslation("today", language);
  } else if (dateDay.getTime() === tomorrow.getTime()) {
    return getTranslation("tomorrow", language);
  } else if (dateDay.getTime() === dayAfterTomorrow.getTime()) {
    return getTranslation("day_after_tomorrow", language);
  }
  
  // Fallback to date
  if (language === "en") {
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  } else {
    const day = date.getDate();
    const months = [
      "Jan", "Feb", "Mac", "Apr", "Mei", "Jun",
      "Jul", "Ago", "Sep", "Okt", "Nov", "Des"
    ];
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  }
};

export const convertTemperature = (
  temperature: number,
  unit: "celsius" | "fahrenheit"
): number => {
  if (unit === "fahrenheit") {
    return (temperature * 9) / 5 + 32;
  }
  return temperature;
};

export const formatTemperature = (
  temperature: number,
  unit: "celsius" | "fahrenheit"
): string => {
  const converted = convertTemperature(temperature, unit);
  const rounded = Math.round(converted);
  return `${rounded}°${unit === "celsius" ? "C" : "F"}`;
};

export const getWindDirection = (degrees: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
};
