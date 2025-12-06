import React, { createContext, useContext } from "react";
import { lightColors, darkColors } from "../theme/theme.js";

export const ThemeContext = createContext({
  isDarkMode: true,
  colors: darkColors,
  setScheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const defaultTheme = {
    isDarkMode: true, // Always true
    colors: darkColors, // Always provide dark colors
    setScheme: () => {}, // No-op
    toggleTheme: () => {}, // No-op
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);