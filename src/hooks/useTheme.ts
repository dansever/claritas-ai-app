import { useState, useEffect } from "react";
import { theme, ColorScheme } from "../theme/theme";

type TimeOfDay = "morning" | "day" | "evening" | "night";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ColorScheme>(theme.day);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");

  const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
  };

  useEffect(() => {
    const updateTheme = () => {
      const newTimeOfDay = getTimeOfDay();
      setTimeOfDay(newTimeOfDay);
      setCurrentTheme(theme[newTimeOfDay]);
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return {
    theme: currentTheme,
    timeOfDay,
  };
};
