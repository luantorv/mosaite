import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/AuthService";
import userService from "../services/UserService";
import configService from "../services/ConfigService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});
  const [systemConfig, setSystemConfig] = useState(null);

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Cargar configuración y roles cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadConfig();
      loadRoles();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    setLoading(true);
    try {
      const result = await authService.checkAuth();
      if (result.isAuthenticated) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadConfig = async () => {
    const result = await configService.getCurrentConfig();
    if (result.success) {
      setSystemConfig(result.config);
    }
  };

  const loadRoles = async () => {
    const result = await configService.getRoleNames();
    if (result.success) {
      setRoles(result.roles);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { 
        success: false, 
        error: "Error inesperado al iniciar sesión" 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setUsers([]);
      setRoles({});
      setSystemConfig(null);
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Funciones de gestión de usuarios
  const loadUsers = async (filters = {}) => {
    const result = await userService.getUsers(filters);
    if (result.success) {
      setUsers(result.users);
    }
    return result;
  };

  const createUser = async (userData) => {
    const result = await userService.createUser(userData);
    if (result.success) {
      await loadUsers(); // Recargar lista
    }
    return result;
  };

  const updateUser = async (userId, updates) => {
    const result = await userService.updateUser(userId, updates);
    if (result.success) {
      await loadUsers(); // Recargar lista
      
      // Si el usuario actualizado es el actual, actualizar también el estado
      if (user && user.user_id === userId) {
        setUser(result.user);
      }
    }
    return result;
  };

  const deleteUser = async (userId) => {
    const result = await userService.deleteUser(userId);
    if (result.success) {
      await loadUsers(); // Recargar lista
    }
    return result;
  };

  const toggleUserStatus = async (userId) => {
    const userToToggle = users.find(u => u.user_id === userId);
    if (!userToToggle) return { success: false, error: "Usuario no encontrado" };

    const result = await userService.toggleUserStatus(userId, userToToggle.status);
    if (result.success) {
      await loadUsers(); // Recargar lista
    }
    return result;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    users,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    roles,
    systemConfig,
    loadConfig,
    checkAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};