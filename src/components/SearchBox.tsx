import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { countries } from "@/data/countries";
import { useWeather } from "@/context/WeatherContext";
import { getTranslation } from "@/utils/translations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBox: React.FC = () => {
  const { searchLocation, language, setSelectedLocation, location } = useWeather();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setActiveCountry(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchLocation(searchTerm);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  const handleCountryClick = (countryCode: string) => {
    if (activeCountry === countryCode) {
      setActiveCountry(null);
    } else {
      setActiveCountry(countryCode);
    }
  };

  const handleCityClick = (city: string, countryCode: string) => {
    const searchQuery = `${city},${countryCode}`;
    searchLocation(searchQuery);
    setSearchTerm("");
    setIsDropdownOpen(false);
    setActiveCountry(null);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={getTranslation("search", language)}
            className="w-full pl-10 pr-4 py-2"
            onClick={() => setIsDropdownOpen(true)}
            aria-label={getTranslation("search", language)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-500" />
          </div>
        </div>
        <Button type="submit" className="bg-primary hover:bg-primary/80" aria-label={getTranslation("search_button", language)}>
          {getTranslation("search_button", language)}
        </Button>
      </form>

      {location?.name === "Nairobi" && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {getTranslation("allow_location", language)}
        </div>
      )}

      {isDropdownOpen && (
        <div 
          ref={dropdownRef} 
          className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          <div className="p-2">
            {countries.map((country) => (
              <div key={country.code} className="mb-1">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"
                  onClick={() => handleCountryClick(country.code)}
                >
                  <span>{country.name}</span>
                  <span className="text-xs text-gray-500">{country.code}</span>
                </div>

                {activeCountry === country.code && (
                  <div className="ml-4 mt-1 border-l-2 border-primary pl-2">
                    {country.cities.map((city) => (
                      <div
                        key={city}
                        className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"
                        onClick={() => handleCityClick(city, country.code)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
