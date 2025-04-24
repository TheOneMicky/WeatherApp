
import React from "react";
import { WeatherProvider, useWeather } from "@/context/WeatherContext";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastSection from "@/components/ForecastSection";
import WeatherDetails from "@/components/WeatherDetails";
import UnitToggle from "@/components/UnitToggle";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorToast from "@/components/ErrorToast";

const Index: React.FC = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen max-w-5xl mx-auto px-4 py-6">
        <ErrorToast />
        <Header />
        
        <div className="mb-6">
          <SearchBox />
        </div>
        
        <div className="mb-4">
          <UnitToggle />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <CurrentWeather />
          </div>
          
          <div className="lg:col-span-2">
            <ForecastSection />
          </div>
        </div>
        
        <WeatherDetails />
        
        <WeatherLoader />
      </div>
    </WeatherProvider>
  );
};

// This component conditionally renders the loading spinner
const WeatherLoader: React.FC = () => {
  const { loading } = useWeather();
  
  if (!loading) return null;
  return <LoadingSpinner />;
};

export default Index;
