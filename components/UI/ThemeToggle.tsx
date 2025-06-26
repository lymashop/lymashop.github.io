
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './Icon';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light transition-colors duration-200"
      aria-label={theme === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
