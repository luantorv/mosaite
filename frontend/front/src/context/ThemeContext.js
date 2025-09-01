import React, { createContext, useContext, useState } from 'react';

// Definir los temas
const themes = {
  light: {
    name: 'light',
    background: '#e0e5ec',
    cardShadowOut: '8px 8px 16px #a3b1c6, -8px -8px 16px #FFFFFF',
    cardShadowIn: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #FFFFFF',
    buttonShadowOut: '4px 4px 8px #a3b1c6, -4px -4px 8px #FFFFFF',
    buttonShadowIn: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #FFFFFF',
    smallButtonShadowOut: '6px 6px 12px #a3b1c6, -6px -6px 12px #FFFFFF',
    smallButtonShadowIn: 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #FFFFFF',
    textColor: '#2D2D2D',
    textColorSecondary: '#4F4F4F',
    textColorMuted: '#999',
    hoverBackground: '#d8dde8',
    separatorGradient: 'linear-gradient(90deg, transparent, #a3b1c6, transparent)',
    primaryColor: '#7C9A5D',
    accentColor: '#E9C46A',
  },
  dark: {
    name: 'dark',
    background: '#2c3e50',
    cardShadowOut: '8px 8px 16px #1a252f, -8px -8px 16px #3e5771',
    cardShadowIn: 'inset 4px 4px 8px #1a252f, inset -4px -4px 8px #3e5771',
    buttonShadowOut: '4px 4px 8px #1a252f, -4px -4px 8px #3e5771',
    buttonShadowIn: 'inset 4px 4px 8px #1a252f, inset -4px -4px 8px #3e5771',
    smallButtonShadowOut: '6px 6px 12px #1a252f, -6px -6px 12px #3e5771',
    smallButtonShadowIn: 'inset 6px 6px 12px #1a252f, inset -6px -6px 12px #3e5771',
    textColor: '#F4F4F4',
    textColorSecondary: '#C0C0C0',
    textColorMuted: '#718096',
    hoverBackground: '#34495e',
    separatorGradient: 'linear-gradient(90deg, transparent, #4a5568, transparent)',
    primaryColor: '#93B676',
    accentColor: '#F4BF4A',
  }
};

// Crear el contexto
const ThemeContext = createContext();

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

// Provider del tema
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = themes[currentTheme];

  const value = {
    theme,
    currentTheme,
    toggleTheme,
    isLight: currentTheme === 'light',
    isDark: currentTheme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};