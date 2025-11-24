import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const ROLES = {
  0: "Viewer",
  1: "Operator",
  2: "Accountant",
  3: "Manager",
  4: "Admin",
}

export const AuthProvider = ({ children }) => {
  // Usuario por defecto para desarrollo
  const [user, setUser] = useState({
    name: "Usuario Demo",
    email: "demo@example.com",
    id: "demo-user-001",
    role: 4, // Admin por defecto
    status: true, // Activo por defecto
  })

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const [users, setUsers] = useState([
    {
      id: "user-001",
      name: "Juan Viewer",
      email: "viewer@example.com",
      company: "Empresa Demo",
      role: 0,
      status: true,
      createdAt: new Date("2024-01-15").toISOString(),
      updatedAt: new Date("2024-01-15").toISOString(),
    },
    {
      id: "user-002",
      name: "María Operator",
      email: "operator@example.com",
      company: "Empresa Demo",
      role: 1,
      status: true,
      createdAt: new Date("2024-02-10").toISOString(),
      updatedAt: new Date("2024-02-10").toISOString(),
    },
    {
      id: "user-003",
      name: "Carlos Accountant",
      email: "accountant@example.com",
      company: "Empresa Demo",
      role: 2,
      status: false,
      createdAt: new Date("2024-03-05").toISOString(),
      updatedAt: new Date("2024-03-05").toISOString(),
    },
    {
      id: "user-004",
      name: "Ana Manager",
      email: "manager@example.com",
      company: "Empresa Demo",
      role: 3,
      status: true,
      createdAt: new Date("2024-04-20").toISOString(),
      updatedAt: new Date("2024-04-20").toISOString(),
    },
    {
      id: "user-005",
      name: "Pedro Admin",
      email: "admin@example.com",
      company: "Empresa Demo",
      role: 4,
      status: true,
      createdAt: new Date("2024-05-12").toISOString(),
      updatedAt: new Date("2024-05-12").toISOString(),
    },
  ])

  const login = (email, password) => {
    // Simulación de login
    setUser({
      name: email.split("@")[0],
      email: email,
      id: `user-${Date.now()}`,
      role: 0,
      status: true,
    })
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const createUser = (userData) => {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: true,
    }
    setUsers((prev) => [...prev, newUser])
    return newUser
  }

  const updateUser = (userId, updates) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates, updatedAt: new Date().toISOString() } : u)),
    )
  }

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              status: !u.status,
              updatedAt: new Date().toISOString(),
            }
          : u,
      ),
    )
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    users,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
