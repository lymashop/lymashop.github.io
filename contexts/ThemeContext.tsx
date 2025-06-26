
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from '../types';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '../constants';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return (storedTheme as Theme) || DEFAULT_THEME;
    } catch (error) {
      console.error("Error reading theme from localStorage", error);
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
         document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#7C3AED');
      } else {
        root.classList.remove('dark');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#A78BFA');
      }
    } catch (error) {
      console.error("Error setting theme in localStorage or DOM", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
