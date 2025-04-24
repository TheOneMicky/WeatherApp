
import React from "react";
import { useWeather } from "@/context/WeatherContext";
import { formatDate, formatTemperature, getTranslation } from "@/utils/translations";
import { getWeatherIcon } from "@/utils/weatherIcons";

const CurrentWeather: React.FC = () => {
  const { currentWeather, location, temperatureUnit, language } = useWeather();

  if (!currentWeather || !location) {
    return (
      <div className="weather-card animate-pulse min-h-[300px] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
      </div>
    );
  }

  const temperature = currentWeather.main.temp;
  const weatherDescription = currentWeather.weather[0]?.description || "";
  const weatherIcon = currentWeather.weather[0]?.icon || "01d";
  const date = currentWeather.dt;

  return (
    <div className="weather-card flex flex-col items-center justify-center animate-fade-in">
      <div className="mb-4">
        {getWeatherIcon(weatherIcon, 80)}
      </div>
      <div className="text-4xl font-bold mb-2">
        {formatTemperature(temperature, temperatureUnit)}
      </div>
      <div className="text-xl mb-4 capitalize">
        {getTranslation(weatherDescription, language)}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {formatDate(date, language)}
        <br />
        {location.name}, {location.country}
      </div>
    </div>
  );
};

export default CurrentWeather;
