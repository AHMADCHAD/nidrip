import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "../theme/theme.js";

export const ThemeContext = createContext({
  isDarkMode: false,
  colors: lightColors,
  setScheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // 'dark', 'light', or 'null'
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    isDarkMode,
    colors: isDarkMode ? darkColors : lightColors,
    setScheme: (scheme) => setIsDarkMode(scheme === "dark"),
    toggleTheme: () => setIsDarkMode(!isDarkMode),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);