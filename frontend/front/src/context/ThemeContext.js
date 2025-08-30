import { createContext, useContext, useState } from 'react';

// Definir los temas
const themes = {
  light: {
    name: 'light',
    background: '#e0e5ec',
    cardShadowOut: '15px 15px 30px #a3b1c6, -15px -15px 30px #ffffff',
    cardShadowIn: 'inset 15px 15px 30px #a3b1c6, inset -15px -15px 30px #ffffff',
    buttonShadowOut: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff',
    buttonShadowIn: 'inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff',
    smallButtonShadowOut: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff',
    smallButtonShadowIn: 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff',
    textColor: '#666',
    textColorSecondary: '#777',
    textColorMuted: '#999',
    hoverBackground: '#d8dde8',
    separatorGradient: 'linear-gradient(90deg, transparent, #a3b1c6, transparent)',
  },
  dark: {
    name: 'dark',
    background: '#2c3e50',
    cardShadowOut: '15px 15px 30px #1a252f, -15px -15px 30px #3e5771',
    cardShadowIn: 'inset 15px 15px 30px #1a252f, inset -15px -15px 30px #3e5771',
    buttonShadowOut: '8px 8px 16px #1a252f, -8px -8px 16px #3e5771',
    buttonShadowIn: 'inset 8px 8px 16px #1a252f, inset -8px -8px 16px #3e5771',
    smallButtonShadowOut: '6px 6px 12px #1a252f, -6px -6px 12px #3e5771',
    smallButtonShadowIn: 'inset 6px 6px 12px #1a252f, inset -6px -6px 12px #3e5771',
    textColor: '#cbd5e0',
    textColorSecondary: '#a0aec0',
    textColorMuted: '#718096',
    hoverBackground: '#34495e',
    separatorGradient: 'linear-gradient(90deg, transparent, #4a5568, transparent)',
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