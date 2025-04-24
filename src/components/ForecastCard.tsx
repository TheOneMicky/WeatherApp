
import React from "react";
import { ForecastItem, Language } from "@/types/weather";
import { formatTemperature, formatDay, getTranslation } from "@/utils/translations";
import { getWeatherIcon } from "@/utils/weatherIcons";

interface ForecastCardProps {
  forecast: ForecastItem;
  temperatureUnit: "celsius" | "fahrenheit";
  language: Language;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ 
  forecast, 
  temperatureUnit, 
  language 
}) => {
  const weatherIcon = forecast.weather[0]?.icon || "01d";
  const date = forecast.dt;
  const maxTemp = forecast.main.temp_max;
  const minTemp = forecast.main.temp_min;

  return (
    <div className="weather-card flex flex-col items-center justify-between h-full">
      <div className="font-medium">
        {formatDay(date, language)}
      </div>
      <div className="my-4">
        {getWeatherIcon(weatherIcon, 40)}
      </div>
      <div className="flex justify-between w-full text-sm">
        <span>{formatTemperature(minTemp, temperatureUnit)}</span>
        <span>{formatTemperature(maxTemp, temperatureUnit)}</span>
      </div>
    </div>
  );
};

export default ForecastCard;
