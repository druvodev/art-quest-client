import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") || false
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.theme = isDarkMode;
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`${isDarkMode ? "bg-slate-900 " : "bg-base-200"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
