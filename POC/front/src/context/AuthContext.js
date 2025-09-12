// context/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      setLoading(true);
      // Simular verificación de sesión - en un POC podemos usar variables en memoria
      // o localStorage si queremos persistir entre recargas de página
      const savedUser = sessionStorage.getItem('poc_user');
      
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    try {
      // Simular delay mínimo para hacer más realista
      const enhancedUserData = {
        id: Date.now(), // ID único basado en timestamp
        email: userData.email,
        name: userData.name,
        company: userData.company || 'Empresa Demo',
        role: userData.role || 'Usuario',
        avatar: null, // Podrías agregar avatars por defecto después
        loginTime: new Date().toISOString()
      };

      setUser(enhancedUserData);
      setIsAuthenticated(true);
      
      // Guardar en sessionStorage para persistir durante la sesión
      sessionStorage.setItem('poc_user', JSON.stringify(enhancedUserData));
      
      return { success: true };
    } catch (error) {
      console.error('Error in login:', error);
      return { 
        success: false, 
        error: 'Error al iniciar sesión' 
      };
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      
      // Limpiar datos guardados
      sessionStorage.removeItem('poc_user');
      
      return { success: true };
    } catch (error) {
      console.error('Error in logout:', error);
      // Incluso si hay error, limpiamos el estado local
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('poc_user');
      
      return { 
        success: false, 
        error: 'Error al cerrar sesión, pero se limpió la sesión local' 
      };
    }
  };

  // Función adicional para actualizar datos del usuario (útil para el POC)
  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      sessionStorage.setItem('poc_user', JSON.stringify(updatedUser));
      return { success: true };
    }
    return { success: false, error: 'No hay usuario logueado' };
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus,
    updateUser // Función adicional para el POC
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};