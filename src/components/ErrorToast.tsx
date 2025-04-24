
import { useEffect } from "react";
import { useWeather } from "@/context/WeatherContext";
import { useToast } from "@/hooks/use-toast";
import { getTranslation } from "@/utils/translations";

const ErrorToast: React.FC = () => {
  const { error, language } = useWeather();
  const { toast } = useToast();
  
  useEffect(() => {
    if (error) {
      toast({
        title: getTranslation("error", language),
        description: error,
        variant: "destructive",
      });
    }
  }, [error, language, toast]);
  
  return null;
};

export default ErrorToast;
