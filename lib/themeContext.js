import React, { useContext, useState } from "react";
import { isLightTeme } from "utils/helper";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children, storage }) {
  const [theme, setTheme] = useState(
    storage.getItem("prefered-theme") || THEMES.LIGHT
  );

  function toggleTheme() {
    let newTheme = isLightTeme(theme) ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
    storage.setItem("prefered-theme", newTheme);
  }

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
        </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
