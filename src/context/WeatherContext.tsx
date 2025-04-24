import React, { createContext, useContext, useState, useEffect } from "react";
import { TemperatureUnit, Language, WeatherData, ForecastData, GeoLocation } from "@/types/weather";

interface WeatherContextType {
  location: GeoLocation | null;
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  temperatureUnit: TemperatureUnit;
  language: Language;
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  searchLocation: (query: string) => Promise<void>;
  setSelectedLocation: (location: GeoLocation) => Promise<void>;
  toggleTemperatureUnit: () => void;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  useCurrentLocation: () => void;
}

const DEFAULT_LOCATION: GeoLocation = {
  name: "Nairobi",
  lat: -1.2921,
  lon: 36.8219,
  country: "KE",
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("celsius");
  const [language, setLanguage] = useState<Language>("en");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const API_KEY = "31d920d091ee7887541f558b3a5dc51a";

  useEffect(() => {
    const savedLocation = localStorage.getItem("weatherLocation");
    const savedUnit = localStorage.getItem("temperatureUnit") as TemperatureUnit;
    const savedLanguage = localStorage.getItem("language") as Language;
    const savedDarkMode = localStorage.getItem("darkMode");
    
    if (savedDarkMode) {
      const isDark = savedDarkMode === "true";
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
    
    if (savedUnit) setTemperatureUnit(savedUnit);
    if (savedLanguage) setLanguage(savedLanguage);
    
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        setLocation(parsedLocation);
        fetchWeatherData(parsedLocation);
      } catch (err) {
        console.error("Error parsing saved location", err);
        setLocation(DEFAULT_LOCATION);
        fetchWeatherData(DEFAULT_LOCATION);
      }
    } else {
      setLocation(DEFAULT_LOCATION);
      fetchWeatherData(DEFAULT_LOCATION);
    }
  }, []);

  const fetchWeatherData = async (loc: GeoLocation) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch current weather");
      }
      
      const weatherData = await weatherResponse.json();
      setCurrentWeather(weatherData);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error("Failed to fetch forecast");
      }
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to search location");
      }
      
      const data: GeoLocation[] = await response.json();
      
      if (data.length === 0) {
        setError("No locations found. Please try a different search.");
        return;
      }
      
      const newLocation = data[0];
      setLocation(newLocation);
      localStorage.setItem("weatherLocation", JSON.stringify(newLocation));
      
      await fetchWeatherData(newLocation);
    } catch (err) {
      console.error("Error searching location:", err);
      setError("Failed to search location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setSelectedLocation = async (loc: GeoLocation) => {
    setLocation(loc);
    localStorage.setItem("weatherLocation", JSON.stringify(loc));
    await fetchWeatherData(loc);
  };

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === "celsius" ? "fahrenheit" : "celsius";
    setTemperatureUnit(newUnit);
    localStorage.setItem("temperatureUnit", newUnit);
  };

  const toggleLanguage = () => {
    const languages: Language[] = ["en", "sw", "es", "fr", "ar", "zh", "hi"];
    const currentIndex = languages.indexOf(language as Language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[nextIndex];
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const useCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );
            
            if (!response.ok) {
              throw new Error("Failed to get location name");
            }
            
            const data: GeoLocation[] = await response.json();
            
            if (data.length === 0) {
              throw new Error("Location not found");
            }
            
            const newLocation = data[0];
            setLocation(newLocation);
            localStorage.setItem("weatherLocation", JSON.stringify(newLocation));
            
            await fetchWeatherData(newLocation);
          } catch (err) {
            console.error("Error getting current location:", err);
            setError("Failed to get current location. Using default location instead.");
            
            if (!location) {
              setLocation(DEFAULT_LOCATION);
              fetchWeatherData(DEFAULT_LOCATION);
            }
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Failed to access your location. Using default location instead.");
          setLoading(false);
          
          if (!location) {
            setLocation(DEFAULT_LOCATION);
            fetchWeatherData(DEFAULT_LOCATION);
          }
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Using default location instead.");
      
      if (!location) {
        setLocation(DEFAULT_LOCATION);
        fetchWeatherData(DEFAULT_LOCATION);
      }
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        currentWeather,
        forecast,
        temperatureUnit,
        language,
        loading,
        error,
        darkMode,
        searchLocation,
        setSelectedLocation,
        toggleTemperatureUnit,
        toggleLanguage,
        toggleDarkMode,
        useCurrentLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  
  return context;
};
