import { useState, useEffect, type FC, type ReactNode } from 'react';
import {
  type Theme,
  getInitialTheme,
  applyTheme,
  saveTheme,
  toggleThemeValue,
} from './themeUtils';
import { ThemeContext } from './useTheme';

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => toggleThemeValue(prev));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
