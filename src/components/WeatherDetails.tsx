
import React from "react";
import { Wind } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { getTranslation, getWindDirection } from "@/utils/translations";

const WeatherDetails: React.FC = () => {
  const { currentWeather, language } = useWeather();

  if (!currentWeather) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="weather-card animate-pulse min-h-[120px]"></div>
        <div className="weather-card animate-pulse min-h-[120px]"></div>
      </div>
    );
  }

  const windSpeed = currentWeather.wind.speed;
  const windDirection = getWindDirection(currentWeather.wind.deg);
  const humidity = currentWeather.main.humidity;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <div className="weather-card">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          {getTranslation("wind_status", language)}
        </h3>
        <div className="flex items-center justify-center">
          <Wind className="mr-2 text-primary" />
          <span className="text-2xl font-bold">{windSpeed} km/h</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">{windDirection}</div>
      </div>
      
      <div className="weather-card">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          {getTranslation("humidity", language)}
        </h3>
        <div className="text-2xl font-bold mb-2">{humidity}%</div>
        <div className="progress-bar">
          <div 
            className="progress-value" 
            style={{ width: `${humidity}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
