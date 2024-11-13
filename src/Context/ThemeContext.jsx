import React, { createContext, useContext, useEffect, useState } from "react";

// Step 1: Create a context to hold theme data
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Step 2: Set up state to track the current theme
  const [currentTheme, setCurrentTheme] = useState(); // Default theme is 'light'

  // Step 3: Apply the selected theme to the document
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Step 4: On mount, check for saved theme in localStorage and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Step 5: Toggle theme function
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
