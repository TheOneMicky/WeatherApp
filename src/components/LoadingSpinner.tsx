
import React from "react";
import { useWeather } from "@/context/WeatherContext";
import { getTranslation } from "@/utils/translations";

const LoadingSpinner: React.FC = () => {
  const { language } = useWeather();
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p>{getTranslation("loading", language)}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
