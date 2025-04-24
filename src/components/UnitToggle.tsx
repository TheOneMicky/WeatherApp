
import React from "react";
import { useWeather } from "@/context/WeatherContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const UnitToggle: React.FC = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useWeather();

  return (
    <div className="flex justify-end mb-4">
      <ToggleGroup type="single" value={temperatureUnit} onValueChange={(value) => {
        if (value) toggleTemperatureUnit();
      }}>
        <ToggleGroupItem value="celsius" aria-label="Celsius">
          °C
        </ToggleGroupItem>
        <ToggleGroupItem value="fahrenheit" aria-label="Fahrenheit">
          °F
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default UnitToggle;
