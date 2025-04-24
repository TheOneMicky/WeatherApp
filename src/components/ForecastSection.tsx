
import React from "react";
import { useWeather } from "@/context/WeatherContext";
import ForecastCard from "./ForecastCard";

const ForecastSection: React.FC = () => {
  const { forecast, temperatureUnit, language } = useWeather();

  if (!forecast) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="weather-card animate-pulse min-h-[150px]"></div>
        <div className="weather-card animate-pulse min-h-[150px]"></div>
        <div className="weather-card animate-pulse min-h-[150px]"></div>
      </div>
    );
  }

  // Get one forecast per day at around midday (closest to 12:00)
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0];
    
    if (!acc[dateString] || Math.abs(12 - date.getHours()) < Math.abs(12 - new Date(acc[dateString].dt * 1000).getHours())) {
      acc[dateString] = item;
    }
    
    return acc;
  }, {} as Record<string, typeof forecast.list[0]>);
  
  // Get next 3 days (excluding today)
  const today = new Date().toISOString().split('T')[0];
  const forecastDays = Object.values(dailyForecasts)
    .filter(item => new Date(item.dt * 1000).toISOString().split('T')[0] !== today)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
      {forecastDays.map((day) => (
        <ForecastCard 
          key={day.dt} 
          forecast={day} 
          temperatureUnit={temperatureUnit}
          language={language}
        />
      ))}
    </div>
  );
};

export default ForecastSection;
