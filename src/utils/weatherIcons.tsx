
import React from "react";
import { Cloud, CloudRain, CloudSnow, CloudSun, CloudLightning, Wind, Sun, CloudFog } from "lucide-react";

export const getWeatherIcon = (iconCode: string, size = 24, color?: string) => {
  // OpenWeatherMap icon codes:
  // https://openweathermap.org/weather-conditions
  
  // Extract main code (first 2 characters)
  const mainCode = iconCode.substring(0, 2);
  
  // Extract day/night indicator (last character)
  const isDaytime = iconCode.endsWith("d");
  
  switch (mainCode) {
    case "01": // Clear sky
      return <Sun size={size} className={color || "text-weather-sunny"} />;
      
    case "02": // Few clouds
    case "03": // Scattered clouds
    case "04": // Broken clouds
      return isDaytime 
        ? <CloudSun size={size} className={color || "text-weather-cloud"} />
        : <Cloud size={size} className={color || "text-weather-cloud"} />;
      
    case "09": // Shower rain
    case "10": // Rain
      return <CloudRain size={size} className={color || "text-weather-rain"} />;
      
    case "11": // Thunderstorm
      return <CloudLightning size={size} className={color || "text-weather-blue"} />;
      
    case "13": // Snow
      return <CloudSnow size={size} className={color || "text-white"} />;
      
    case "50": // Mist, fog, etc.
      return <CloudFog size={size} className={color || "text-weather-cloud"} />;
      
    default:
      // Fallback to cloud
      return <Cloud size={size} className={color || "text-weather-cloud"} />;
  }
};
