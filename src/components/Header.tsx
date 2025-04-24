
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { Button } from "@/components/ui/button";
import { getTranslation } from "@/utils/translations";
import { Toggle } from "@/components/ui/toggle";

const Header: React.FC = () => {
  const { toggleLanguage, toggleDarkMode, language, darkMode, useCurrentLocation } = useWeather();

  // Language display mapping
  const languageDisplay: Record<string, string> = {
    en: "EN",
    sw: "SW",
    es: "ES",
    fr: "FR",
    ar: "AR",
    zh: "ZH",
    hi: "HI"
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold">Weather App</h1>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={useCurrentLocation}
          className="text-xs"
        >
          {getTranslation("allow_location", language)}
        </Button>
        
        <Toggle
          aria-label="Toggle language"
          pressed={language !== "en"}
          onPressedChange={toggleLanguage}
        >
          {languageDisplay[language]}
        </Toggle>
        
        <Toggle
          aria-label="Toggle theme"
          pressed={darkMode}
          onPressedChange={toggleDarkMode}
        >
          {darkMode ? <Moon size={16} /> : <Sun size={16} />}
        </Toggle>
      </div>
    </header>
  );
};

export default Header;
