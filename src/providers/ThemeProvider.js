'use client';

import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme/theme';

// Kontekst dla stanu ciemnego motywu
export const ThemeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

// Hook do używania kontekstu motywu
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createAppTheme(darkMode);
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}