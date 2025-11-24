# Frontend - Mosaite

Frontend de **Mosaite**, una plataforma interactiva para la enseñanza y práctica de la contabilidad básica.

Aplicación web desarrollada en React que proporciona una interfaz intuitiva para registrar asientos contables, generar libros diarios, gestionar transacciones y consultar información contable mediante un asistente basado en IA.

---

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
- [Contextos Globales](#contextos-globales)
- [Servicios](#servicios)
- [Componentes Principales](#componentes-principales)
- [Componentes de Contenido](#componentes-de-contenido)
- [Rutas y Navegación](#rutas-y-navegación)
- [Integración con Backend](#integración-con-backend)
- [Estado del Desarrollo](#estado-del-desarrollo)

---

## Tecnologías

### Core

- **React** 19.1.1 - Librería principal para la construcción de la interfaz
- **React Router DOM** 7.8.1 - Manejo de rutas y navegación
- **React Scripts** 5.0.1 - Configuración y scripts de Create React App

### UI/UX

- **Bootstrap** 5.3.7 - Framework CSS para diseño responsive
- **React Bootstrap** 2.10.10 - Componentes de Bootstrap adaptados a React
- **Lucide React** 0.540.0 - Librería de iconos
- **Motion** 12.23.12 - Animaciones y transiciones

### Comunicación y Datos

- **Axios** 1.11.0 - Cliente HTTP para comunicación con el backend
- **Recharts** 3.2.1 - Librería de gráficos para visualización de datos

### Testing

- **@testing-library/react** 16.3.0 - Utilidades para testing de componentes
- **@testing-library/jest-dom** 6.7.0 - Matchers personalizados para Jest
- **@testing-library/user-event** 13.5.0 - Simulación de eventos de usuario

### Utilidades

- **web-vitals** 2.1.4 - Métricas de rendimiento web
- **serve** 14.2.5 - Servidor estático para producción

---

## Requisitos Previos

- **Node.js**: 24.7.0 o superior
- **npm**: 10.x o superior
- **Backend de Mosaite**: Debe estar corriendo

---

## Instalación

1. Navegar al directorio del frontend:

```bash
cd mosaite/frontend/front
```

2. Instalar las dependencias:

```bash
npm install
```

3. Configurar las variables de entorno (si es necesario):

```bash
# Crear archivo .env en la raíz del frontend si se requiere
# Ejemplo:
# REACT_APP_API_URL=http://localhost:8000
```

---

## Scripts Disponibles

### `npm start`

Ejecuta la aplicación en modo de desarrollo.

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

La página se recargará automáticamente cuando hagas cambios en el código.

### `npm test`

Ejecuta los tests en modo interactivo.

```bash
npm test
```

### `npm run build`

Crea una versión optimizada para producción en la carpeta `build`.

```bash
npm run build
```

La aplicación estará lista para ser desplegada.

### Servir build de producción

Para servir la versión de producción localmente:

```bash
# Si no tienes serve instalado globalmente
npm install -g serve

# Servir la aplicación
serve -s build
```

---

## Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos (imágenes, logos)
│   ├── icon.png
│   └── logo.png
│
├── components/          # Componentes de React
│   ├── Content/         # Componentes de contenido específico
│   │   ├── Chat.js
│   │   ├── Configuracion.js
│   │   ├── CuentaCrear.js
│   │   ├── DashboardHome.js
│   │   ├── LibroDiarioCard.js
│   │   ├── LibroDiarioBuscar.js
│   │   ├── LibroDiarioCrear.js
│   │   ├── LibroDiariosRecientes.js
│   │   ├── TransaccionBuscar.js
│   │   ├── TransaccionCard.js
│   │   ├── TransaccionCrear.js
│   │   ├── TransaccionRecientes.js
│   │   ├── UsuariosLista.js
│   │   └── index.js
│   │
│   ├── Dashboard.js     # Layout principal de la aplicación
│   ├── Login.js         # Página de inicio de sesión
│   ├── LogoutButton.js  # Botón para cerrar sesión
│   ├── ProtectedRoute.js # HOC para rutas protegidas
│   ├── Searchbar.js     # Barra de búsqueda
│   ├── SideBar.js       # Barra lateral de navegación
│   ├── SidebarMenu.js   # Menú de la barra lateral
│   ├── ThemeToggle.js   # Switch para cambiar tema claro/oscuro
│   └── UserMenu.js      # Menú de usuario
│
├── context/             # Contextos de React
│   ├── AuthContext.js   # Gestión de autenticación
│   └── ThemeContext.js  # Gestión del tema (claro/oscuro)
│
├── services/            # Servicios para comunicación con API
│   ├── api.js           # Configuración de Axios
│   ├── AccountService.js     # Operaciones de cuentas contables
│   ├── AuthService.js        # Operaciones de autenticación
│   ├── ChatService.js        # Operaciones del chat/asistente IA
│   ├── ConfigService.js      # Operaciones de configuración
│   ├── DashboardService.js   # Operaciones del dashboard
│   ├── TransactionService.js # Operaciones de transacciones
│   └── UserService.js        # Operaciones de usuarios
│
├── App.js               # Componente principal
├── App.css              # Estilos del componente principal
├── index.js             # Punto de entrada de la aplicación
├── index.css            # Estilos globales
├── setupTests.js        # Configuración de testing
└── reportWebVitals.js   # Métricas de rendimiento
```

---

## Arquitectura de la Aplicación

### Flujo de Renderizado

```
index.js
  └─> ThemeProvider
       └─> App.js
            └─> ThemeProvider (redundante, se mantiene por compatibilidad)
                 └─> AuthProvider
                      └─> Router
                           └─> Routes
```

### Jerarquía de Componentes

```
App
├─> Login (ruta pública)
└─> ProtectedRoute
     └─> Dashboard (ruta protegida)
          ├─> SideBar
          │    └─> SidebarMenu
          ├─> Searchbar
          ├─> UserMenu
          ├─> ThemeToggle
          └─> [Componentes de Contenido]
```

---

## Contextos Globales

Los contextos proporcionan estado global accesible desde cualquier componente de la aplicación sin necesidad de prop drilling.

### AuthContext

**Ubicación**: `src/context/AuthContext.js`

Gestiona todo el estado relacionado con la autenticación, usuarios y configuración del sistema.

#### Hook personalizado

```javascript
import { useAuth } from '../context/AuthContext';

// Uso en componentes
const { user, isAuthenticated, login, logout } = useAuth();
```

#### Estado Gestionado

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `user` | Object \| null | Información del usuario autenticado |
| `isAuthenticated` | Boolean | Indica si hay un usuario autenticado |
| `loading` | Boolean | Estado de carga durante operaciones asíncronas |
| `users` | Array | Lista de usuarios del sistema (para administración) |
| `roles` | Object | Mapeo de roles disponibles en el sistema |
| `systemConfig` | Object \| null | Configuración general del sistema |

#### Métodos Principales

##### Autenticación

**`login(email, password)`**
- Inicia sesión con credenciales
- Actualiza el estado del usuario y tokens
- Retorna: `{ success: boolean, error?: string }`

**`logout()`**
- Cierra sesión del usuario actual
- Limpia todos los estados relacionados
- Retorna: `{ success: boolean, error?: string }`

**`checkAuthentication()`**
- Verifica si hay una sesión activa válida
- Se ejecuta automáticamente al montar la aplicación

##### Gestión de Usuarios

**`loadUsers(filters = {})`**
- Carga la lista de usuarios con filtros opcionales
- Actualiza el estado `users`
- Retorna: `{ success: boolean, users?: Array, error?: string }`

**`createUser(userData)`**
- Crea un nuevo usuario en el sistema
- Recarga automáticamente la lista de usuarios
- Retorna: `{ success: boolean, user?: Object, error?: string }`

**`updateUser(userId, updates)`**
- Actualiza información de un usuario existente
- Si es el usuario actual, actualiza también `user`
- Retorna: `{ success: boolean, user?: Object, error?: string }`

**`deleteUser(userId)`**
- Elimina un usuario del sistema
- Recarga automáticamente la lista de usuarios
- Retorna: `{ success: boolean, error?: string }`

**`toggleUserStatus(userId)`**
- Activa/desactiva el estado de un usuario
- Recarga automáticamente la lista de usuarios
- Retorna: `{ success: boolean, error?: string }`

##### Configuración

**`loadConfig()`**
- Carga la configuración actual del sistema
- Se ejecuta automáticamente al autenticarse
- Actualiza el estado `systemConfig`

**`loadRoles()`**
- Carga los roles disponibles del sistema
- Se ejecuta automáticamente al autenticarse
- Actualiza el estado `roles`

#### Ciclo de Vida

```
App Mount
    ↓
checkAuthentication()
    ↓
isAuthenticated = true
    ↓
    ├─> loadConfig()
    └─> loadRoles()
```

#### Ejemplo de Uso

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    login, 
    logout 
  } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password');
    if (result.success) {
      console.log('Login exitoso');
    } else {
      console.error(result.error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bienvenido, {user.email}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <button onClick={handleLogin}>Iniciar Sesión</button>
      )}
    </div>
  );
}
```

---

### ThemeContext

**Ubicación**: `src/context/ThemeContext.js`

Gestiona el tema visual de la aplicación, permitiendo alternar entre modo claro y oscuro con estilos Neumorphism.

#### Hook personalizado

```javascript
import { useTheme } from '../context/ThemeContext';

// Uso en componentes
const { theme, toggleTheme, isLight, isDark } = useTheme();
```

#### Temas Disponibles

##### Tema Claro (Light)

| Propiedad | Valor | Descripción |
|-----------|-------|-------------|
| `background` | `#e0e5ec` | Color de fondo principal |
| `textColor` | `#2D2D2D` | Color de texto principal |
| `textColorSecondary` | `#4F4F4F` | Color de texto secundario |
| `textColorMuted` | `#999` | Color de texto atenuado |
| `primaryColor` | `#7C9A5D` | Color primario (verde) |
| `accentColor` | `#E9C46A` | Color de acento (amarillo) |
| `hoverBackground` | `#d8dde8` | Color de fondo al hover |

**Sombras Neumorphism:**
- `cardShadowOut`: Sombra externa de tarjetas
- `cardShadowIn`: Sombra interna de tarjetas
- `buttonShadowOut`: Sombra externa de botones
- `buttonShadowIn`: Sombra interna de botones (presionado)
- `smallButtonShadowOut`: Sombra externa de botones pequeños
- `smallButtonShadowIn`: Sombra interna de botones pequeños

##### Tema Oscuro (Dark)

| Propiedad | Valor | Descripción |
|-----------|-------|-------------|
| `background` | `#2c3e50` | Color de fondo principal |
| `textColor` | `#F4F4F4` | Color de texto principal |
| `textColorSecondary` | `#C0C0C0` | Color de texto secundario |
| `textColorMuted` | `#718096` | Color de texto atenuado |
| `primaryColor` | `#93B676` | Color primario (verde claro) |
| `accentColor` | `#F4BF4A` | Color de acento (amarillo claro) |
| `hoverBackground` | `#34495e` | Color de fondo al hover |

**Sombras Neumorphism** (ajustadas para modo oscuro)

#### Estado y Métodos

| Propiedad/Método | Tipo | Descripción |
|------------------|------|-------------|
| `theme` | Object | Objeto con todas las propiedades del tema actual |
| `currentTheme` | String | Nombre del tema actual ('light' o 'dark') |
| `toggleTheme()` | Function | Alterna entre tema claro y oscuro |
| `isLight` | Boolean | `true` si el tema actual es claro |
| `isDark` | Boolean | `true` si el tema actual es oscuro |

#### Ejemplo de Uso

```javascript
import { useTheme } from '../context/ThemeContext';

function ThemedComponent() {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.textColor,
        boxShadow: theme.cardShadowOut,
        padding: '20px',
        borderRadius: '15px'
      }}
    >
      <h2 style={{ color: theme.primaryColor }}>
        Modo {isLight ? 'Claro' : 'Oscuro'}
      </h2>
      <button 
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.textColor,
          boxShadow: theme.buttonShadowOut,
          border: 'none',
          padding: '10px 20px',
          borderRadius: '10px'
        }}
      >
        Cambiar Tema
      </button>
    </div>
  );
}
```

#### Estilo Neumorphism

El ThemeContext implementa el estilo **Neumorphism** (o Soft UI), caracterizado por:

- Sombras suaves que crean efecto de relieve
- Colores de fondo sutiles
- Transiciones suaves entre estados
- Aspecto "elevado" o "hundido" según el contexto

**Aplicación de sombras:**

```javascript
// Elemento elevado (por defecto)
boxShadow: theme.cardShadowOut

// Elemento presionado/hundido
boxShadow: theme.cardShadowIn

// Botón normal
boxShadow: theme.buttonShadowOut

// Botón presionado
boxShadow: theme.buttonShadowIn
```

#### Persistencia

Actualmente, el tema no persiste entre sesiones. Para implementar persistencia:

```javascript
// En ThemeContext.js, modificar el estado inicial:
const [currentTheme, setCurrentTheme] = useState(() => {
  return localStorage.getItem('theme') || 'light';
});

// Y en toggleTheme:
const toggleTheme = () => {
  setCurrentTheme(prev => {
    const newTheme = prev === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return newTheme;
  });
};
```

---

## Servicios

Los servicios encapsulan toda la lógica de comunicación con el backend, proporcionando una interfaz limpia y consistente para realizar operaciones CRUD y otras funcionalidades.

Todos los servicios siguen un patrón de respuesta consistente:

```javascript
{
  success: boolean,
  data?: any,           // Varía según el servicio
  error?: string | Object
}
```

---

### api.js

**Ubicación**: `src/services/api.js`

Configuración centralizada de Axios con interceptors para manejo de autenticación y tokens.

#### Configuración Base

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

La URL base se puede configurar mediante la variable de entorno `REACT_APP_API_URL`.

#### Request Interceptor

Agrega automáticamente el token JWT a todas las peticiones:

```javascript
Authorization: `Bearer ${access_token}`
```

#### Response Interceptor

Maneja automáticamente la renovación de tokens cuando expiran:

**Flujo de renovación:**

1. Detecta respuesta 401 (No autorizado)
2. Intenta renovar el token usando el refresh token
3. Si tiene éxito, reintenta la petición original
4. Si falla, limpia los tokens y redirige a `/login`

**Características:**

- Previene múltiples intentos de renovación simultáneos (`_retry` flag)
- Limpieza automática de tokens en caso de fallo
- Redirección automática al login cuando la sesión expira

#### Ejemplo de Uso

```javascript
import api from './api';

// Las peticiones automáticamente incluyen el token
const response = await api.get('/accounts/');
const data = await api.post('/trans/', transactionData);
```

---

### AuthService

**Ubicación**: `src/services/AuthService.js`

Gestiona todas las operaciones de autenticación y sesión.

#### Métodos

##### `login(email, password)`

Inicia sesión y obtiene tokens JWT.

**Parámetros:**
- `email`: String - Email del usuario
- `password`: String - Contraseña

**Respuesta exitosa:**
```javascript
{
  success: true,
  user: {
    user_id: number,
    email: string,
    first_name: string,
    last_name: string,
    rol: number,
    status: number,
    // ... otros campos
  },
  tokens: {
    access: string,
    refresh: string
  }
}
```

**Proceso:**
1. Envía credenciales al endpoint `/auth/login/`
2. Guarda tokens en localStorage
3. Obtiene información del usuario desde `/users/me/`
4. Retorna usuario y tokens

##### `logout()`

Cierra la sesión actual.

**Proceso:**
1. Envía refresh token al endpoint `/auth/logout/`
2. Limpia tokens del localStorage
3. Maneja errores silenciosamente (siempre limpia tokens)

##### `checkAuth()`

Verifica si existe una sesión activa válida.

**Respuesta:**
```javascript
{
  isAuthenticated: boolean,
  user: Object | null
}
```

**Proceso:**
1. Verifica existencia de access token
2. Intenta obtener información del usuario
3. Si falla, limpia tokens y retorna `isAuthenticated: false`

##### `refreshToken()`

Renueva el access token usando el refresh token.

**Respuesta exitosa:**
```javascript
{
  success: true,
  access: string
}
```

**Nota:** Este método es usado principalmente por el interceptor de `api.js`.

---

### AccountService

**Ubicación**: `src/services/AccountService.js`

Gestiona operaciones CRUD sobre cuentas contables.

#### Métodos

##### `getAccounts(filters = {})`

Obtiene lista de cuentas con filtros opcionales.

**Filtros disponibles:**
- `status`: Boolean - Filtrar por estado (activo/inactivo)
- `nature`: String - Filtrar por naturaleza de la cuenta
- `search`: String - Búsqueda por nombre o código

**Respuesta:**
```javascript
{
  success: true,
  accounts: [...]
}
```

##### `getActiveAccounts()`

Obtiene solo cuentas activas (endpoint optimizado).

##### `getAccount(accountId)`

Obtiene una cuenta específica por ID.

##### `createAccount(accountData)`

Crea una nueva cuenta contable.

**Datos requeridos:**
```javascript
{
  code: string,
  name: string,
  nature: string, // 'debit' | 'credit'
  status: boolean,
  // ... otros campos según modelo
}
```

##### `updateAccount(accountId, accountData)`

Actualiza parcialmente una cuenta existente.

##### `deleteAccount(accountId)`

Elimina una cuenta del sistema.

##### `toggleAccountStatus(accountId, currentStatus)`

Cambia el estado de una cuenta (activo ↔ inactivo).

---

### TransactionService

**Ubicación**: `src/services/TransactionService.js`

Gestiona operaciones sobre transacciones y asientos contables.

#### Métodos

##### `getTransactions(filters = {})`

Obtiene lista de transacciones con filtros opcionales.

**Filtros disponibles:**
- `status`: Number - Filtrar por estado
- `user`: Number - Filtrar por usuario
- `date_from`: String (ISO) - Fecha desde
- `date_to`: String (ISO) - Fecha hasta
- `search`: String - Búsqueda general

##### `getRecentTransactions(limit = 10)`

Obtiene las transacciones más recientes.

**Parámetros:**
- `limit`: Number - Cantidad de transacciones (default: 10)

##### `getTransaction(transactionId)`

Obtiene una transacción específica con todos sus detalles.

##### `createTransaction(transactionData)`

Crea una nueva transacción/asiento contable.

**Estructura típica:**
```javascript
{
  date: string,        // ISO format
  description: string,
  entries: [           // Array de movimientos
    {
      account_id: number,
      debit: number,
      credit: number,
      description: string
    }
  ]
}
```

##### `updateTransaction(transactionId, transactionData)`

Actualiza una transacción existente.

##### `deleteTransaction(transactionId)`

Elimina una transacción del sistema.

##### `toggleTransactionStatus(transactionId)`

Cambia el estado de una transacción (borrador ↔ completada).

---

### ChatService

**Ubicación**: `src/services/ChatService.js`

Gestiona la comunicación con el asistente contable basado en IA (RAG).

#### Métodos

##### `query(question)`

Envía una consulta al asistente IA.

**Parámetros:**
- `question`: String - Pregunta en lenguaje natural

**Respuesta exitosa:**
```javascript
{
  success: true,
  data: {
    answer: string,
    sources: [...],
    confidence: number,
    // ... otros metadatos
  }
}
```

**Respuesta cuando servicio no disponible:**
```javascript
{
  success: false,
  error: string,
  is_rebuilding: boolean,
  unavailable: true
}
```

**Códigos de estado especiales:**
- `503`: Servicio no disponible (posiblemente reconstruyendo índice)

##### `cancelQuery(requestId)`

Cancela una consulta en progreso (para streaming futuro).

##### `getStatus()`

Obtiene el estado actual del servicio de chat.

**Respuesta:**
```javascript
{
  success: true,
  status: {
    available: boolean,
    is_rebuilding: boolean,
    index_last_updated: string,
    // ... otros datos de estado
  }
}
```

##### `rebuildIndex()`

Reconstruye el índice vectorial del RAG (solo Admin/Profesor).

**Respuesta:**
```javascript
{
  success: true,
  message: string
}
```

**Códigos de estado especiales:**
- `409`: Ya hay una reconstrucción en curso

##### `getHistory(filters = {})`

Obtiene el historial de consultas realizadas.

**Filtros disponibles:**
- `user`: Number - Filtrar por usuario
- `date_from`: String (ISO) - Fecha desde
- `date_to`: String (ISO) - Fecha hasta

---

### DashboardService

**Ubicación**: `src/services/DashboardService.js`

Obtiene métricas y estadísticas para el dashboard.

#### Métodos

##### `getStats()`

Obtiene todas las estadísticas del dashboard.

**Respuesta:**
```javascript
{
  success: true,
  stats: {
    total_accounts: number,
    active_accounts: number,
    total_transactions: number,
    recent_transactions: number,
    total_users: number,
    active_users: number,
    // ... otras métricas
  }
}
```

---

### ConfigService

**Ubicación**: `src/services/ConfigService.js`

Gestiona la configuración del sistema.

#### Métodos

##### `getCurrentConfig()`

Obtiene la configuración actual del sistema.

**Respuesta:**
```javascript
{
  success: true,
  config: {
    config_id: number,
    mode: string,        // 'individual' | 'educativo'
    system_name: string,
    // ... otras configuraciones
  }
}
```

##### `getRoleNames()`

Obtiene los nombres de roles según el modo de configuración.

**Respuesta:**
```javascript
{
  success: true,
  roles: {
    0: string,  // Ejemplo: "Usuario" o "Estudiante"
    1: string,  // Ejemplo: "Administrador" o "Profesor"
  }
}
```

##### `updateConfig(configId, configData)`

Actualiza la configuración del sistema.

**Datos actualizables:**
```javascript
{
  mode: string,
  system_name: string,
  // ... otros campos configurables
}
```

---

### UserService

**Ubicación**: `src/services/UserService.js`

Gestiona operaciones CRUD sobre usuarios del sistema.

#### Métodos

##### `getUsers(filters = {})`

Obtiene lista de usuarios con filtros opcionales.

**Filtros disponibles:**
- `status`: Number - Filtrar por estado (0: inactivo, 1: activo)
- `rol`: Number - Filtrar por rol
- `group`: String - Filtrar por grupo

##### `getUser(userId)`

Obtiene un usuario específico por ID.

##### `createUser(userData)`

Crea un nuevo usuario en el sistema.

**Datos requeridos:**
```javascript
{
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  rol: number,
  status: number,
  // ... otros campos opcionales
}
```

##### `updateUser(userId, userData)`

Actualiza parcialmente un usuario existente.

##### `deleteUser(userId)`

Elimina un usuario del sistema.

##### `toggleUserStatus(userId, currentStatus)`

Cambia el estado de un usuario (activo ↔ inactivo).

**Lógica:**
```javascript
currentStatus === 0 ? 1 : 0  // Alterna entre activo/inactivo
```

---

### Convenciones de los Servicios

#### Estructura de Respuesta

Todos los servicios siguen el mismo patrón:

```javascript
// Éxito
{
  success: true,
  [dataKey]: actualData  // El nombre varía: users, accounts, transaction, etc.
}

// Error
{
  success: false,
  error: string | Object
}
```

#### Manejo de Errores

Los servicios capturan errores y los transforman en respuestas consistentes:

```javascript
try {
  const response = await api.get('/endpoint/');
  return { success: true, data: response.data };
} catch (error) {
  return {
    success: false,
    error: error.response?.data?.detail || 'Mensaje de error genérico'
  };
}
```

#### Uso de Query Parameters

Los servicios construyen URLs con parámetros usando `URLSearchParams`:

```javascript
const params = new URLSearchParams();
if (filters.status !== undefined) params.append('status', filters.status);
const response = await api.get(`/endpoint/?${params.toString()}`);
```

#### Ejemplo de Uso en Componentes

```javascript
import accountService from '../services/AccountService';

const MyComponent = () => {
  const loadAccounts = async () => {
    const result = await accountService.getAccounts({
      status: true,
      search: 'caja'
    });

    if (result.success) {
      console.log('Cuentas:', result.accounts);
    } else {
      console.error('Error:', result.error);
    }
  };

  return <button onClick={loadAccounts}>Cargar Cuentas</button>;
};
```

---

## Componentes Principales

Los componentes principales son la base de la estructura y navegación de la aplicación.

---

### ProtectedRoute

**Ubicación**: `src/components/ProtectedRoute.js`

Higher-Order Component (HOC) que protege rutas que requieren autenticación.

#### Funcionalidad

**Tres estados posibles:**

1. **Loading**: Muestra spinner mientras verifica la autenticación
2. **No autenticado**: Redirige a `/login` guardando la ubicación previa
3. **Autenticado**: Renderiza el componente hijo

#### Flujo de Autenticación

```
Usuario accede a ruta protegida
         ↓
¿AuthContext.loading?
    ↓ SI → Mostrar spinner
    ↓ NO
¿isAuthenticated?
    ↓ NO → Redirect a /login (con state.from)
    ↓ SI → Renderizar children
```

#### Características

- Preserva la ruta original en `location.state.from`
- Spinner con tema responsive durante verificación
- Redirección automática con `replace` para evitar historial de navegación

#### Ejemplo de Uso

```javascript
// En App.js
<Route path="/" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

### Login

**Ubicación**: `src/components/Login.js`

Componente de inicio de sesión con validación y manejo de errores.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `email` | String | Email del usuario |
| `password` | String | Contraseña del usuario |
| `loading` | Boolean | Estado de carga durante login |
| `error` | String | Mensaje de error a mostrar |

#### Funcionalidad

**Características principales:**

- Validación de campos requeridos
- Manejo de errores con mensajes claros
- Redirección automática si ya está autenticado
- Estados de carga con spinner
- Diseño Neumorphic consistente con el tema

**Flujo de Login:**

```
Usuario ingresa credenciales
         ↓
Validación básica
         ↓
Llamada a login() del AuthContext
         ↓
    ¿Success?
    ↓ SI → navigate('/')
    ↓ NO → Mostrar error
```

#### Validaciones

- Campos no vacíos
- Formato de email (validación HTML5)
- Feedback visual durante el proceso

#### Manejo de Errores

```javascript
// Errores capturados:
- "Por favor, completa todos los campos"
- Mensajes del backend (result.error)
- "Error inesperado al iniciar sesión"
```

#### Efectos

```javascript
// Redirección automática si ya está autenticado
useEffect(() => {
  if (isAuthenticated) {
    navigate('/');
  }
}, [isAuthenticated, navigate]);
```

---

### Dashboard

**Ubicación**: `src/components/Dashboard.js`

Layout principal de la aplicación que contiene todos los componentes de UI y gestiona la navegación entre paneles.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `isOpen` | Boolean | Estado del sidebar (abierto/cerrado) |
| `activePanel` | String | Panel activo actual (ej: "Dashboard", "Transacciones-Crear") |
| `searchQuery` | String | Término de búsqueda actual |

#### Estructura del Layout

```
Dashboard (Contenedor flex)
│
├─> Sidebar (columna izquierda)
│   └─> SidebarMenu
│
└─> Contenido Principal
    ├─> Tarjeta Neumorphic Principal
    │   └─> Grid Container (Bootstrap)
    │       ├─> Fila Superior (controles)
    │       │   ├─> Botón Toggle Sidebar
    │       │   ├─> SearchBar (centrado)
    │       │   ├─> ThemeToggle
    │       │   └─> UserMenu
    │       │
    │       └─> Fila Contenido (flex-grow)
    │           └─> Content (componente dinámico)
```

#### Métodos Principales

##### `toggleSidebar()`

Alterna la visibilidad del sidebar con animación.

##### `handlePanelChange(mainCategory, option)`

Cambia el panel activo basándose en la navegación del sidebar.

**Formato del panelKey:**
- Con opción: `"Transacciones-Crear"`
- Sin opción: `"Dashboard"`

##### `handleSearchChange(e)`

Actualiza el término de búsqueda en el estado.

##### `handleSearch()`

Ejecuta la búsqueda y cambia al panel de búsqueda de transacciones.

#### Características

**Responsive Layout:**
- Sidebar colapsable con animación suave
- Grid Bootstrap para distribución flexible
- Contenido adaptable al espacio disponible

**Animaciones:**
- Sidebar slide-in/out (transform translateX)
- Transiciones suaves en todos los elementos
- Efectos hover en botones

**Gestión del Espacio:**
```javascript
marginLeft: isOpen ? "0" : "-250px"
// Compensa el espacio del sidebar cuando está cerrado
```

---

### Sidebar

**Ubicación**: `src/components/Sidebar.js`

Barra lateral de navegación con logo y menú.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `closeMenuTrigger` | Number | Contador para forzar cierre del menú |

#### Características

**Logo Interactivo:**
- Clickeable para volver al Dashboard
- Efectos hover (scale y opacity)
- Cierra automáticamente cualquier menú abierto

**Estructura:**
- Contenedor Neumorphic con scroll si es necesario
- Logo superior centrado
- SidebarMenu con scroll independiente

#### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onPanelChange` | Function | Callback para cambiar panel activo |
| `activePanel` | String | Panel actualmente activo |

#### Comportamiento

```javascript
handleLogoClick():
  1. Incrementar closeMenuTrigger
  2. Llamar onPanelChange("Dashboard", "")
  → Resultado: Volver al Dashboard y cerrar menús
```

---

### SidebarMenu

**Ubicación**: `src/components/SidebarMenu.js`

Menú de navegación dinámico con control de permisos basado en roles.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `openMenu` | String \| null | Categoría de menú actualmente abierta |

#### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onPanelChange` | Function | Callback para cambiar panel |
| `activePanel` | String | Panel activo actual |
| `closeMenuTrigger` | Number | Trigger para cerrar menús |

#### Sistema de Permisos por Rol

**Roles disponibles:**
- `0`: Admin (acceso total)
- `1`: Manager (gestión de usuarios)
- `2`: Accountant (crear libros diarios)
- `4`: Viewer (solo lectura)

**Estructura base del menú:**
```javascript
{
  "Transacciones": ["Recientes", "Buscar"],
  "Libros Diarios": ["Recientes"],
  "Plan de Cuentas": null,
  "Ayuda": null
}
```

**Modificaciones según rol:**

| Funcionalidad | Roles con acceso |
|--------------|------------------|
| Transacciones → Crear | 0, 1, 2, 3 (NO 4) |
| Libros Diarios → Crear | 0, 2 |
| Usuarios | 0, 1 |
| Configuración | 0 |

#### Tipos de Menú

**1. Menú Directo** (opciones: null)
- Click directo sin desplegar
- Ejemplo: "Plan de Cuentas", "Ayuda"

**2. Menú Desplegable** (opciones: Array)
- Header clickeable para expandir/colapsar
- Lista de opciones con animación
- Ejemplo: "Transacciones", "Libros Diarios"

#### Características Visuales

**Estados de Elementos:**
- **Activo**: Color primario con fondo tintado
- **Hover**: Background hover con transición
- **Expandido**: Flecha rotada 180°

**Animaciones:**
- Expansión suave con max-height
- Opciones con stagger (delay incremental)
- Hover con desplazamiento horizontal

**Separador Visual:**
- Gradiente sutil entre header y opciones
- Opacidad condicionada a estado abierto

#### Métodos

##### `getFilteredMenuData()`

Retorna el menú filtrado según el rol del usuario actual.

##### `toggleMenu(menuKey)`

Alterna estado abierto/cerrado de un menú desplegable.
Solo permite un menú abierto a la vez.

##### `handleOptionClick(mainCategory, option)`

Maneja el click en una opción del menú.
No cierra el menú al seleccionar (solo cambia panel).

##### `isOptionActive(mainCategory, option)`

Verifica si una opción está activa.

##### `isDirectMenuActive(mainCategory)`

Verifica si un menú directo está activo.

---

### SearchBar

**Ubicación**: `src/components/SearchBar.js`

Barra de búsqueda reutilizable con diseño Neumorphic.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | String | "" | Valor actual de búsqueda |
| `onChange` | Function | - | Callback al cambiar texto |
| `onSearch` | Function | - | Callback al presionar Enter |
| `placeholder` | String | "Buscar..." | Texto placeholder |
| `disabled` | Boolean | false | Deshabilita el input |

#### Características

**Elementos:**
1. **Ícono de búsqueda**: SVG con círculo Neumorphic
2. **Input**: Transparente con estilos del tema
3. **Botón limpiar**: Muestra "×", solo visible con texto

**Interactividad:**
- Enter para ejecutar búsqueda
- Click en "×" para limpiar
- Focus/blur cambia sombra del contenedor
- Botón deshabilitado cuando no hay texto

**Efectos Visuales:**
```javascript
onFocus: boxShadow → cardShadowIn (hundido)
onBlur: boxShadow → cardShadowOut (elevado)
```

#### Ejemplo de Uso

```javascript
<SearchBar 
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onSearch={handleSearch}
  placeholder="Buscar transacciones..."
  disabled={loading}
/>
```

---

### ThemeToggle

**Ubicación**: `src/components/ThemeToggle.js`

Switch animado para alternar entre modo claro y oscuro con elementos visuales decorativos.

#### Características Visuales

**Modo Claro:**
- Fondo: Cielo azul (`#87CEEB`)
- Switch: Sol dorado (`#FFD700`) con resplandor
- Decoración: Nubes flotantes con animación
- Rayos de sol concéntricos

**Modo Oscuro:**
- Fondo: Noche oscura (`#1a252f`)
- Switch: Luna con cráteres
- Decoración: Estrellas parpadeantes
- Animación de titilación

#### Estructura del Switch

```
Container (Neumorphic)
└─> Label (60x34px)
    ├─> Input (checkbox oculto)
    ├─> Background (fondo del switch)
    │   ├─> Slider (Sol/Luna)
    │   │   ├─> Cráteres (modo oscuro)
    │   │   └─> Rayos (modo claro)
    │   ├─> Estrellas (modo oscuro)
    │   └─> Nubes (modo claro)
```

#### Animaciones

**@keyframes star-twinkle:**
```css
Parpadeo y scale de estrellas
0%, 100%: opacity 0.3, scale 1
50%: opacity 1, scale 1.2
```

**@keyframes cloud-float:**
```css
Movimiento horizontal de nubes
0%, 100%: translateX(0)
50%: translateX(2px)
```

**Transición del Slider:**
```javascript
transform: isDark ? "translateX(26px)" : "translateX(0)"
transition: "0.4s"
```

#### Detalles Técnicos

- Checkbox nativo oculto para accesibilidad
- Toggle mediante useTheme().toggleTheme
- Todos los elementos con transiciones de 0.4s
- Sombras internas para profundidad

---

### UserMenu

**Ubicación**: `src/components/UserMenu.js`

Menú desplegable del usuario con información de perfil y opción de logout.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `isUserMenuOpen` | Boolean | Controla visibilidad del menú |

#### Características

**Botón de Usuario:**
- Muestra iniciales del nombre
- Diseño circular Neumorphic
- Estados activo/hover diferenciados

**Menú Desplegable:**
- Posicionado absolutamente (top-right)
- Animación de aparición suave
- Overlay transparente para cerrar al click externo

**Información Mostrada:**

1. **Avatar con iniciales**
   - Círculo con color primario
   - Hasta 2 letras mayúsculas

2. **Datos del usuario**
   - Nombre completo
   - Email
   - Rol (traducido según configuración)
   - Estado (Activo/Inactivo con color)

3. **LogoutButton**
   - Botón integrado en el menú

#### Métodos

##### `getInitials(name)`

Extrae iniciales del nombre.

**Lógica:**
```javascript
"Juan Pérez" → "JP"
"María" → "M"
null → "U"
```

##### `getRoleName(rolNumber)`

Obtiene el nombre del rol desde AuthContext.roles.

##### `getStatusText(status)`

Convierte código de estado a texto legible.

#### Overlay Pattern

```javascript
{isUserMenuOpen && (
  <div 
    style={{ position: "fixed", fullscreen }}
    onClick={closeUserMenu}
  />
)}
```

**Propósito:** Cerrar menú al hacer click fuera de él.

---

### LogoutButton

**Ubicación**: `src/components/LogoutButton.js`

Botón especializado para cerrar sesión con estados de carga.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `className` | String | "" | Clases CSS adicionales |
| `style` | Object | {} | Estilos inline adicionales |

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `loading` | Boolean | Estado de carga durante logout |

#### Funcionalidad

**Flujo de Logout:**

```
Click en botón
     ↓
loading = true
     ↓
logout() del AuthContext
     ↓
¿Success?
  ↓ SI → navigate('/login')
  ↓ NO → console.error
     ↓
loading = false
```

#### Características

**Estados Visuales:**
- **Normal**: Texto "Cerrar Sesión"
- **Loading**: Spinner + "Cerrando sesión..."
- **Disabled**: Previene múltiples clicks

**Estilos:**
- Color de texto rojo (`#d73027`) para indicar acción destructiva
- Ancho completo del contenedor
- Efectos hover con sombras Neumorphic

#### Ejemplo de Uso

```javascript
// En UserMenu
<LogoutButton />

// Con props personalizadas
<LogoutButton 
  className="my-custom-class"
  style={{ marginTop: '20px' }}
/>
```

---

### Patrones Comunes

#### Uso del ThemeContext

Todos los componentes principales usan el tema:

```javascript
import { useTheme } from '../context/ThemeContext';

const { theme, isLight, isDark } = useTheme();

// Aplicar estilos
style={{
  background: theme.background,
  color: theme.textColor,
  boxShadow: theme.cardShadowOut
}}
```

#### Efectos Hover Neumorphic

Patrón común para botones:

```javascript
onMouseEnter={(e) => {
  e.target.style.boxShadow = theme.buttonShadowIn;
}}
onMouseLeave={(e) => {
  e.target.style.boxShadow = theme.buttonShadowOut;
}}
```

#### Gestión de Estados de Carga

```javascript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await someAsyncAction();
  } finally {
    setLoading(false);
  }
};
```

#### Props Opcionales con Defaults

```javascript
function Component({ 
  value = "", 
  onChange, 
  disabled = false 
}) {
  // ...
}
```

---

## Componentes de Contenido

Los componentes de contenido son las vistas específicas de cada funcionalidad de la aplicación.

---

### index.js (Content Router)

**Ubicación**: `src/components/Content/index.js`

Componente enrutador que gestiona qué contenido mostrar según el panel activo.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `transacciones` | Array | Todas las transacciones cargadas |
| `loadingTransactions` | Boolean | Estado de carga de transacciones |

#### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `activePanel` | String | Panel activo actual (ej: "Dashboard", "Transacciones-Crear") |
| `searchQuery` | String | Término de búsqueda actual |
| `setSearchQuery` | Function | Función para actualizar búsqueda |

#### Funcionalidad

**Carga inicial:**
- Obtiene todas las transacciones al montar
- Mantiene estado global de transacciones para búsqueda y otras vistas

**Callbacks compartidos:**
- `handleTransaccionCreada`: Agrega nueva transacción a la lista
- `eliminarTransaccion`: Elimina y actualiza la lista
- `actualizarEstadoTransaccion`: Cambia estado y actualiza
- `editarTransaccion`: (En desarrollo) Modal de edición

#### Mapeo de Paneles

| Panel | Componente Renderizado |
|-------|----------------------|
| `"Dashboard"` | DashboardHome |
| `"Transacciones-Crear"` | TransaccionCrear |
| `"Transacciones-Recientes"` | TransaccionRecientes |
| `"Transacciones-Buscar"` | TransaccionBuscar |
| `"Libros Diarios-Crear"` | LibroDiarioCrear |
| `"Libros Diarios-Recientes"` | LibroDiarioRecientes |
| `"Plan de Cuentas"` | CuentaCrear |
| `"Usuarios"` | UsuariosLista |
| `"Configuración"` | Configuracion |
| `"Ayuda"` | ChatLLM |
| Default | DashboardHome |

---

### DashboardHome

**Ubicación**: `src/components/Content/DashboardHome.js`

Dashboard principal con estadísticas y gráficos del sistema.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `dashboardData` | Object \| null | Datos estadísticos del dashboard |
| `loading` | Boolean | Estado de carga |
| `error` | String | Mensaje de error |

#### Estructura de Datos

**dashboardData:**
```javascript
{
  "total-alumnos": number,
  "cantidad-grupos": number,
  "asientos-cargados": number,
  "libros-diarios": number,
  "alerta": string | null,  // Alerta de desbalance
  "evolucionHistorica": [
    { mes: string, asientos: number, cobertura: number }
  ],
  "actividadPorGrupo": [
    { grupo: string, asientos: number, cobertura: number }
  ]
}
```

#### Componentes Visuales

**1. Tarjetas de Métricas** (4 tarjetas responsive)
- Total de Alumnos
- Cantidad de Grupos
- Asientos Totales Cargados
- Libros Diarios Creados

**2. Alerta de Balance**
- Se muestra solo si existe `dashboardData.alerta`
- Fondo amarillo con ícono de advertencia

**3. Gráficos** (Recharts)

**LineChart - Evolución Histórica:**
- Línea azul: Asientos por mes
- Línea verde: Cobertura por mes
- Últimos 6 meses

**BarChart - Actividad por Grupo:**
- Barras moradas: Asientos
- Barras celestes: Cobertura
- Por grupo

#### Características

- Grid responsive de Bootstrap
- Gráficos con tema adaptable
- Botón de actualización manual
- Estados de carga y error
- Mensajes cuando no hay datos

---

### TransaccionCrear

**Ubicación**: `src/components/Content/TransaccionCrear.js`

Formulario completo para crear transacciones contables con validación de balance.

#### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onTransaccionCreada` | Function | Callback al crear transacción exitosamente |

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `accounts` | Array | Cuentas activas disponibles |
| `loadingAccounts` | Boolean | Cargando cuentas |
| `saving` | Boolean | Guardando transacción |
| `fecha` | String | Fecha de la transacción (yyyy-mm-dd) |
| `lines` | Array | Líneas de la transacción (entries) |
| `leyenda` | String | Descripción de la transacción |
| `showAccountMenu` | Number \| null | Índice de línea con menú abierto |
| `showUnbalancedModal` | Boolean | Modal de error de balance |
| `diferencia` | Number | Diferencia entre debe y haber |
| `error` | String | Mensaje de error |

#### Estructura de Línea (Entry)

```javascript
{
  acc_id: number | null,  // ID de cuenta seleccionada
  debe: number,           // Monto en debe
  haber: number           // Monto en haber
}
```

#### Funcionalidad Principal

**Carga inicial:**
```javascript
useEffect → loadAccounts()
  ↓
accountService.getActiveAccounts()
  ↓
Actualiza estado con cuentas activas
```

**Gestión de líneas:**

**`agregarLinea()`**
- Agrega nueva línea vacía al final

**`seleccionarCuenta(index, accId)`**
- Asigna cuenta a una línea
- Cierra el menú de cuentas

**`actualizarMonto(index, campo, valor)`**
- Actualiza debe o haber
- **Regla exclusiva**: Si debe > 0 → haber = 0 y viceversa

**`eliminarLinea(index)`**
- Elimina línea si hay más de una

**Validaciones:**

**Pre-guardado:**
1. Mínimo 1 línea con cuenta y monto
2. Mínimo 2 entradas (partida doble)
3. Balance perfecto (diferencia < 0.01)
4. No puede haber valores en debe y haber simultáneamente

**Proceso de creación:**

```
Validaciones básicas
        ↓
Verificar balance
        ↓
    ¿Desbalanceado?
    ↓ SI → Mostrar modal con diferencia
    ↓ NO
Preparar datos para backend
        ↓
    {
      date: string,
      legend: string | null,
      status: 0,  // Por verificar
      entries: [
        {
          acc_id: number,
          debit: number (en centavos),
          credit: number (en centavos)
        }
      ]
    }
        ↓
transactionService.createTransaction()
        ↓
    ¿Éxito?
    ↓ SI → Notificar padre + Limpiar formulario
    ↓ NO → Mostrar errores detallados
```

#### UI del Formulario

**Estructura:**
1. Input de fecha (default: hoy)
2. Tabla de líneas:
   - Código cuenta (readonly, 100px)
   - Nombre cuenta (dropdown, flex)
   - Debe (input number, 150px)
   - Haber (input number, 150px)
   - Botón eliminar (40px)
3. Botón agregar línea (+)
4. Fila de totales
5. Indicador de balance
6. Textarea de leyenda
7. Botones: Limpiar | Crear

**Ordenamiento de líneas:**
- Debe primero
- Haber después

**Estados visuales:**

**Balance correcto:**
- Fondo verde (`#d4edda`)
- Ícono: ✓
- Mensaje: "Transacción balanceada"

**Balance incorrecto:**
- Fondo rojo (`#f8d7da`)
- Ícono: ⚠
- Mensaje: "Diferencia: $X.XX"

#### Modal de Desbalance

**Trigger:** Diferencia > 0.01 al intentar crear

**Contenido:**
- Título con icono de advertencia
- Diferencia exacta
- Explicación
- Botón "Entendido"

**Comportamiento:**
- Bloquea creación
- No permite cerrar mientras guarda
- Overlay transparente

#### Menú de Cuentas

**Características:**
- Dropdown con scroll
- Lista completa de cuentas activas
- Formato: "CÓDIGO - Nombre"
- Click fuera cierra el menú
- Posicionado cerca de la línea

#### Manejo de Errores

**Errores del backend:**
- Parser inteligente para errores estructurados
- Maneja errores de entries (por entrada)
- Maneja errores de campos generales
- Formatea múltiples mensajes de error

**Ejemplo de error:**
```
Entrada 1 - acc_id: Campo requerido
Entrada 2 - debit: Debe ser mayor a 0
date: Formato inválido
```

#### Características Especiales

- **Conversión de montos**: Pesos a centavos (× 100)
- **Loading states**: Deshabilita todos los inputs mientras guarda
- **Logging detallado**: Consola muestra todo el flujo
- **Limpieza automática**: Resetea form después de crear
- **Fecha por defecto**: Siempre hoy al montar/limpiar

---

### TransaccionRecientes

**Ubicación**: `src/components/Content/TransaccionRecientes.js`

Lista de las transacciones más recientes del sistema.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `transacciones` | Array | Lista de transacciones |
| `loading` | Boolean | Estado de carga |
| `error` | String | Mensaje de error |

#### Funcionalidad

**Carga de datos:**
```javascript
loadTransactions()
  ↓
transactionService.getRecentTransactions(10)
  ↓
Actualiza estado con las últimas 10 transacciones
```

**Operaciones disponibles:**
- `handleEliminar`: Elimina transacción y actualiza lista
- `handleActualizarEstado`: Toggle estado (borrador/completada)
- `handleEditar`: (En desarrollo) Editar transacción

#### Características

- Botón de actualización manual
- Estados de loading y error
- Integración con TransaccionesApp (cards)
- Logs detallados en consola para debugging

---

### TransaccionBuscar

**Ubicación**: `src/components/Content/TransaccionBuscar.js`

Componente de búsqueda de transacciones con filtrado local.

#### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `searchQuery` | String | Término de búsqueda |
| `setSearchQuery` | Function | Actualizar búsqueda |
| `transacciones` | Array | Todas las transacciones |
| `loadingTransactions` | Boolean | Estado de carga |
| `onEliminar` | Function | Callback eliminar |
| `onActualizarEstado` | Function | Callback cambiar estado |
| `onEditar` | Function | Callback editar |

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `isSearching` | Boolean | Búsqueda en progreso |
| `searchResults` | Array | Resultados filtrados |
| `hasSearched` | Boolean | Si ya se realizó búsqueda |

#### Lógica de Búsqueda

**Campos buscables:**
- Leyenda (legend)
- Fecha (date)
- Autor (user_name)
- ID de transacción (trans_id)
- Código de cuenta
- Nombre de cuenta

**Algoritmo:**
```javascript
Filtrar transacciones donde:
  - query coincide con algún campo (case-insensitive)
  - Búsqueda en entries para cuentas
  - Delay de 500ms para UX
```

#### Estados de UI

**1. Sin búsqueda:**
- Ícono de portapapeles
- Mensaje de ayuda
- Lista de campos buscables

**2. Buscando:**
- Spinner animado
- Mensaje "Buscando transacciones..."

**3. Con resultados:**
- Contador de resultados
- Badge con query
- Lista de transacciones (TransaccionesApp)
- Botón para limpiar búsqueda si no hay resultados

#### Características

- Búsqueda automática al cambiar query
- Delay de 500ms para evitar búsquedas excesivas
- Case-insensitive
- Búsqueda en múltiples campos
- UX con feedback visual constante

---

### TransaccionCard

**Ubicación**: `src/components/Content/TransaccionCard.js`

Tarjeta expandible para visualizar transacciones contables con sistema de estados.

#### Exports

```javascript
export default TransaccionesApp       // Contenedor de lista
export { TransactionCard }            // Tarjeta individual
```

#### Props (TransactionCard)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `transaction` | Object | Datos de la transacción |
| `onStatusChange` | Function | Callback cambiar estado |
| `onEdit` | Function | Callback editar |
| `onDelete` | Function | Callback eliminar |

#### Estructura de Transaction

```javascript
{
  trans_id: number,
  date: string,               // yyyy-mm-dd
  legend: string | null,
  status: boolean,            // false=0 (Por verificar), true=1 (Verificado)
  locked: boolean,            // true=2 (Cerrado - en libro diario)
  user_name: string,
  created_at: string,         // ISO format
  entries: [
    {
      entry_id: number,
      acc_id: number,
      debit: number,          // En centavos
      credit: number,         // En centavos
      account: {
        acc_id: number,
        code: string,
        name: string
      }
    }
  ]
}
```

#### Sistema de Estados (Git-style)

**3 estados posibles:**

| Estado | Valor | Ícono | Color | Background | Descripción |
|--------|-------|-------|-------|------------|-------------|
| Por verificar | 0 | 📋 | #ffc107 | #fff3cd | Recién creada, puede editarse |
| Verificado | 1 | ✓ | #17a2b8 | #d1ecf1 | Aprobada, lista para libro diario |
| Cerrado | 2 | 🔒 | #28a745 | #d4edda | En libro diario, bloqueada |

**Lógica de estado:**
```javascript
estadoActual = locked ? 2 : (status ? 1 : 0)
```

**Reglas de transición:**
- Estado 0 → 1: Toggle manual
- Estado 1 → 0: Toggle manual
- Estado 2: No se puede cambiar (locked)

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `isExpanded` | Boolean | Card expandido/colapsado |
| `hoveredButton` | String \| null | Botón con hover ("status"\|"edit"\|"delete") |

#### Funcionalidad de la Card

**Procesamiento de datos:**

**Conversión de centavos a pesos:**
```javascript
debit / 100 = debe
credit / 100 = haber
```

**Separación de entries:**
```javascript
debeLines = entries.filter(e => e.debit > 0)
haberLines = entries.filter(e => e.credit > 0)
sortedLines = [...debeLines, ...haberLines]  // Debe primero
```

**Cálculos:**
```javascript
totalDebe = sum(debeLines.debe)
totalHaber = sum(haberLines.haber)
```

**Formato de moneda:**
```javascript
formatCurrency(amount) → "$X,XXX.XX" (es-AR)
```

#### UI de la Card

**Vista colapsada:**
- Triángulo expandir (▼)
- Resumen: "CuentaDebe / CuentaHaber || Monto: $X"
- Leyenda en cursiva (si existe)
- 3 botones de acción
- Estado badge (solo cuando expandida)

**Vista expandida:**
- Triángulo colapsar (▲)
- Bloque de leyenda (si existe)
- Tabla completa de entries:
  - Código
  - Nombre
  - Debe (verde si > 0)
  - Haber (rojo si > 0)
  - Fila de totales
- Información adicional:
  - Badge de estado
  - Creado por
  - Fecha
  - ID de transacción

#### Botones de Acción

**1. Botón de Estado**
- Ícono según estado actual
- Click: Toggle entre estados 0 ↔ 1
- Deshabilitado si locked (estado 2)
- Tooltip muestra próxima acción

**2. Botón Editar** (✏️)
- Fondo celeste (`#e3f2fd`)
- Click: Callback onEdit
- Deshabilitado si locked
- Tooltip: "Editar transacción" o "No se puede editar (cerrada)"

**3. Botón Eliminar** (🗑️)
- Fondo rojo claro (`#f8d7da`)
- Click: Confirmación + Callback onDelete
- Deshabilitado si locked
- Tooltip: "Eliminar transacción" o "No se puede eliminar (cerrada)"

**Estados de botones:**
- **Normal**: Shadow out
- **Hover**: Shadow in
- **Locked**: Opacidad 0.6, cursor not-allowed, gris

#### Props (TransaccionesApp)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `transacciones` | Array | Lista de transacciones |
| `onEliminar` | Function | Callback eliminar por trans_id |
| `onActualizarEstado` | Function | Callback toggle estado por trans_id |
| `onEditar` | Function | Callback editar transacción completa |

#### Funcionalidad del Contenedor

**Validación de datos:**
```javascript
transaccionesValidas = transacciones.filter(
  t => t && typeof t === 'object' && t.trans_id
)
```

**Ordenamiento:**
```javascript
sort((a, b) => 
  fechaB.getTime() - fechaA.getTime()
)  // Más reciente primero
```

**Handlers:**

**handleStatusChange:**
- Verifica que no esté locked
- Llama onActualizarEstado con trans_id

**handleEdit:**
- Verifica que no esté locked
- Llama onEditar con transacción completa

**handleDelete:**
- Verifica que no esté locked
- Muestra confirmación
- Llama onEliminar con trans_id

**Estado vacío:**
- Mensaje: "No hay transacciones para mostrar"
- Submensaje: "Las transacciones creadas aparecerán aquí"

#### Características Especiales

**Validación robusta:**
- Maneja transactions null/undefined
- Maneja accounts faltantes en entries
- Logs de advertencia en consola
- Fallback a valores por defecto

**Adaptabilidad:**
- Funciona con datos del backend
- Maneja múltiples formatos de fecha
- Código de cuenta flexible (account.code o acc_id)

**Accesibilidad:**
- Tooltips descriptivos
- Estados visuales claros
- Confirmación antes de eliminar
- Feedback de hover

---

### LibroDiarioCrear

**Ubicación**: `src/components/Content/LibroDiarioCrear.js`

Componente para crear libros diarios verificando transacciones.

#### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `transacciones` | Array | Todas las transacciones |
| `plan` | Object | Plan de cuentas |
| `onEliminar` | Function | Callback eliminar |
| `onActualizarEstado` | Function | Callback cambiar estado |
| `onEditar` | Function | Callback editar |

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `hoveredButton` | Boolean | Estado hover del botón crear |

#### Estructura del Componente

**Dos secciones principales:**

**1. Para Verificar** (estado = 0)
- Badge amarillo con contador
- Lista de transacciones pendientes
- Mensaje si está vacía

**2. Verificadas** (estado = 1)
- Badge celeste con contador
- Lista de transacciones verificadas
- Mensaje si está vacía

#### Funcionalidad

**Filtrado de transacciones:**
```javascript
transaccionesParaVerificar = transacciones.filter(t => t.estado === 0)
transaccionesVerificadas = transacciones.filter(t => t.estado === 1)
```

**Toggle de estado:**
```javascript
handleActualizarEstado(id, estadoActual):
  nuevoEstado = estadoActual === 0 ? 1 : 0
  Mueve entre secciones
```

**Botón "Crear":**
- Posicionado absolutamente (bottom-right)
- Gradiente morado
- Hover con elevación
- (Funcionalidad pendiente de implementación)

#### Layout

```
┌─────────────────────────────────────┐
│ Para Verificar  [N]                 │
│ ├─ TransaccionCard                  │
│ └─ TransaccionCard                  │
│                                     │
│ Verificadas  [N]                    │
│ ├─ TransaccionCard                  │
│ └─ TransaccionCard                  │
│                                     │
│                     [Crear Button]  │
└─────────────────────────────────────┘
```

---

### LibroDiarioRecientes

**Ubicación**: `src/components/Content/LibroDiarioRecientes.js`

Lista de libros diarios generados con filtrado por fecha.

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `fechaDesde` | String | Fecha inicio (yyyy-mm-dd) |
| `fechaHasta` | String | Fecha fin (yyyy-mm-dd) |
| `librosDiarios` | Array | Lista de libros generados |

#### Inicialización

**Fechas por defecto:**
- `fechaDesde`: Hace 7 días
- `fechaHasta`: Hoy

**Generación automática:**
- Genera libros para cada día en el rango
- Solo fechas pasadas (no incluye hoy)
- Hora random entre 19:00 - 20:00
- Autor fijo: "usuario_poc"

#### Estructura de Libro Diario

```javascript
{
  id: string,        // Fecha como ID
  fecha: string,     // yyyy-mm-dd
  hora: string,      // HH:mm
  autor: string
}
```

#### Funcionalidad

**Operaciones:**

**`handleDescargar(libro)`:**
- Logs en consola
- TODO: Implementar descarga de PDF

**`handleBorrar(libro)`:**
- Confirmación con window.confirm
- Elimina del estado local
- TODO: Sincronizar con backend

**Filtrado por fechas:**
```javascript
useEffect(() => {
  Genera libros entre fechaDesde y fechaHasta
  Excluye el día actual
  Ordena de más reciente a más antiguo
}, [fechaDesde, fechaHasta])
```

#### UI

**Controles superiores:**
- Input date "Desde"
- Input date "Hasta"
- Diseño Neumorphic

**Lista de libros:**
- Renderiza con LibroDiarioCard
- Ordenados cronológicamente (desc)
- Mensaje si no hay resultados

---

### LibroDiarioCard

**Ubicación**: `src/components/Content/LibroDiarioCard.js`

Tarjeta para mostrar información de un libro diario.

#### Exports

```javascript
export default LibroDiarioCard       // Card individual
export { LibrosDiariosApp }          // Contenedor de lista
```

#### Props (LibroDiarioCard)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `libroDiario` | Object | Datos del libro |
| `onDescargar` | Function | Callback descargar |
| `onBorrar` | Function | Callback eliminar |

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `isExpanded` | Boolean | Card expandido/colapsado |
| `hoveredButton` | String \| null | Botón con hover ("download" \| "delete") |

#### Estructura del Card

**Contenido principal:**
- Triángulo expandir/colapsar (▼/▲)
- Fecha (grande, negrita)
- Información expandida: Autor
- Hora (solo cuando expandido)

**Botones de acción:**

**Descargar:**
- Fondo celeste claro
- Ícono: ⬇
- Color: #17a2b8

**Borrar:**
- Fondo rojo claro
- Ícono: 🗑
- Color: #dc3545
- Confirmación con window.confirm

#### Props (LibrosDiariosApp)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `librosDiarios` | Array | Lista de libros |
| `onDescargar` | Function | Callback descargar |
| `onBorrar` | Function | Callback eliminar |

**Funcionalidad:**
- Maneja lista vacía con mensaje
- Ordena por fecha (más reciente primero)
- Renderiza LibroDiarioCard para cada libro

---

### Chat (ChatLLM)

**Ubicación**: `src/components/Content/Chat.js`

Interfaz de chat con el asistente contable basado en IA (RAG).

#### Estado Local

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `messages` | Array | Historial de mensajes |
| `inputValue` | String | Texto del input |
| `isLoading` | Boolean | Esperando respuesta |
| `serviceStatus` | Object | Estado del servicio RAG |
| `currentRequestId` | String | ID de petición actual |

#### Estructura de Mensaje

```javascript
{
  id: number,
  role: "user" | "assistant",
  content: string,
  timestamp: string,
  // Solo para assistant:
  sources: Array,
  context_used: string,
  response_time: number,
  query_id: string,
  isError: boolean
}
```

#### Funcionalidad

**Envío de mensajes:**
```javascript
Usuario escribe → Enter/Click
      ↓
Agregar mensaje user al historial
      ↓
setIsLoading(true)
      ↓
ChatService.query(mensaje)
      ↓
  ¿Éxito?
  ↓ SI → Agregar respuesta assistant
  ↓ NO → Agregar mensaje de error
      ↓
setIsLoading(false)
```

**Verificación de servicio:**
- Poll cada 10 segundos si está reconstruyendo
- Muestra alerta si servicio no disponible
- Actualiza estado automáticamente

**Características:**
- Scroll automático al último mensaje
- Textarea con Enter para enviar
- Diferenciación visual usuario/asistente
- Muestra fuentes de información
- Manejo de errores 503 (servicio reconstruyendo)
- Botón para reconstruir índice (Admin/Profesor)

#### UI del Chat

**Elementos principales:**
1. **Contenedor de mensajes** (scroll vertical)
   - Burbujas diferenciadas por rol
   - Timestamp en cada mensaje
   - Fuentes en respuestas del asistente

2. **Input de texto**
   - Textarea multilinea
   - Botón enviar
   - Deshabilita durante loading

3. **Indicador de estado**
   - Servicio disponible/no disponible
   - Reconstruyendo índice
   - Tiempo de respuesta

4. **Controles (si es Admin/Profesor)**
   - Botón "Reconstruir Índice"
   - Confirmación antes de reconstruir

---

### CuentaCrear

**Ubicación**: `src/components/Content/CuentaCrear.js`

*(Documentación resumida basada en funcionalidad esperada)*

Gestión del plan de cuentas contable.

#### Funcionalidad Esperada

**Operaciones CRUD:**
- Listar todas las cuentas
- Crear nueva cuenta
- Editar cuenta existente
- Toggle estado activo/inactivo
- Eliminar cuenta (si no tiene transacciones)

**Campos de Cuenta:**
```javascript
{
  acc_id: number,
  code: string,        // Código contable
  name: string,        // Nombre de la cuenta
  nature: string,      // "debit" | "credit"
  status: boolean,     // Activo/Inactivo
  parent_id: number    // Para jerarquía (si aplica)
}
```

**Filtros:**
- Por estado (activo/inactivo)
- Por naturaleza (debe/haber)
- Búsqueda por código o nombre

**Validaciones:**
- Código único
- Nombre requerido
- Naturaleza requerida

---

### UsuariosLista

**Ubicación**: `src/components/Content/UsuariosLista.js`

Administración de usuarios del sistema (restringido a Admin/Manager).

#### Funcionalidad

**Operaciones CRUD:**
- Listar usuarios con filtros
- Crear nuevo usuario
- Editar usuario existente
- Toggle estado activo/inactivo
- Eliminar usuario

**Campos de Usuario:**
```javascript
{
  user_id: number,
  email: string,
  first_name: string,
  last_name: string,
  rol: number,         // 0=Admin, 1=Manager, 2=Accountant, 3=User, 4=Viewer
  status: number,      // 0=Inactivo, 1=Activo
  group: string,       // Grupo (modo educativo)
  created_at: string
}
```

**Filtros disponibles:**
- Por estado (activo/inactivo)
- Por rol
- Por grupo (modo educativo)

**Características:**
- Tabla con columnas ordenables
- Modal para crear/editar
- Confirmación antes de eliminar
- Validación de email único
- Asignación de contraseña
- Badges de estado y rol

**Validaciones:**
- Email único y válido
- Nombre y apellido requeridos
- Contraseña (solo al crear)
- Rol requerido

---

### Configuracion

**Ubicación**: `src/components/Content/Configuracion.js`

Panel de configuración del sistema (restringido a Admin).

#### Funcionalidad

**Configuraciones disponibles:**

**1. Modo del sistema**
- Individual: Uso personal/empresarial
- Educativo: Uso académico con grupos

**2. Nombre del sistema**
- Personalizable
- Se muestra en header/login

**3. Otras configuraciones**
- (Según implementación del backend)

**Campos:**
```javascript
{
  config_id: number,
  mode: string,          // "individual" | "educativo"
  system_name: string,
  // ... otros campos configurables
}
```

**Características:**
- Formulario de edición
- Guardar cambios con confirmación
- Visualización de roles según modo
- Preview de cambios antes de guardar

**Impacto del modo:**
- **Individual**: 
  - Roles: Usuario, Administrador
  - Sin grupos
  
- **Educativo**:
  - Roles: Estudiante, Profesor
  - Grupos obligatorios
  - Features educativas activadas

---

## Patrones Comunes en Componentes de Contenido

### Gestión de Estado con Servicios

```javascript
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")

useEffect(() => {
  loadData()
}, [])

const loadData = async () => {
  setLoading(true)
  setError("")
  
  const result = await someService.getData()
  
  if (result.success) {
    setData(result.data)
  } else {
    setError(result.error)
  }
  
  setLoading(false)
}
```

### Estados de UI

**1. Loading:**
```javascript
if (loading) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="spinner-border" />
      <p>Cargando...</p>
    </div>
  )
}
```

**2. Error:**
```javascript
if (error) {
  return (
    <div style={{ background: "#ff4d4f20", ... }}>
      Error: {error}
    </div>
  )
}
```

**3. Vacío:**
```javascript
if (data.length === 0) {
  return (
    <div style={{ textAlign: "center" }}>
      <p>No hay datos para mostrar</p>
    </div>
  )
}
```

### Operaciones CRUD

**Crear:**
```javascript
const handleCreate = async (data) => {
  const result = await service.create(data)
  if (result.success) {
    setItems([result.item, ...items])  // Agregar al inicio
  } else {
    alert(result.error)
  }
}
```

**Actualizar:**
```javascript
const handleUpdate = async (id, updates) => {
  const result = await service.update(id, updates)
  if (result.success) {
    setItems(items.map(item => 
      item.id === id ? result.item : item
    ))
  }
}
```

**Eliminar:**
```javascript
const handleDelete = async (id) => {
  if (!window.confirm("¿Seguro?")) return
  
  const result = await service.delete(id)
  if (result.success) {
    setItems(items.filter(item => item.id !== id))
  }
}
```

### Logging para Debugging

```javascript
console.log("🔥 Cargando datos...")
console.log("✅ Datos cargados:", result.data)
console.log("❌ Error:", error)
console.log("🗑️ Eliminando:", id)
console.log("🔄 Actualizando:", id)
console.log("📊 Primera entrada (debug):", data[0])
```

### Botones con Tema

```javascript
<button
  onClick={handleAction}
  style={{
    background: theme.background,
    color: theme.textColor,
    boxShadow: theme.cardShadowOut,
    ...
  }}
  onMouseEnter={(e) => (e.target.style.boxShadow = theme.cardShadowIn)}
  onMouseLeave={(e) => (e.target.style.boxShadow = theme.cardShadowOut)}
>
  Acción
</button>
```

---

## Rutas y Navegación

### Rutas Públicas

- `/login` - Página de inicio de sesión

### Rutas Protegidas

- `/` - Dashboard principal
- Otras rutas protegidas por implementar

Las rutas protegidas requieren autenticación y son manejadas por el componente `ProtectedRoute`.

---

## Integración con Backend

La aplicación se comunica con el backend Django REST API en `http://localhost:8000`.

### Configuración de Axios

Todas las peticiones HTTP se realizan a través de una instancia configurada de Axios definida en `services/api.js`.

### Autenticación

Se utiliza autenticación basada en tokens JWT (Simple JWT) gestionada por el `AuthContext`.

---

## Estado del Desarrollo

### Completado

- Estructura base de la aplicación
- Sistema de autenticación y rutas protegidas
- Gestión de temas (claro/oscuro)
- Componentes principales de UI
- Servicios de comunicación con backend
- Componentes de contenido para todas las funcionalidades

### En Progreso

- Integración completa con el backend
- Testing de componentes
- Documentación de componentes individuales

### Por Hacer

- Optimización de rendimiento
- Accesibilidad (a11y)
- Internacionalización (i18n)
- Guías de estilo y convenciones de código

---

## Notas Adicionales

### Compatibilidad de Red

La aplicación se sirve en `0.0.0.0:3000`, lo que permite acceder desde otros dispositivos en la misma LAN.

Sin embargo, algunos routers tienen activada la opción `AP Isolation` / `Client Isolation`, que bloquea la comunicación entre dispositivos conectados a la misma red WiFi.

Si no puedes acceder desde otro dispositivo estando en la misma red, verifica la configuración de aislamiento del router.

---

## Resumen de la Arquitectura

### Flujo de Datos

```
Usuario interactúa con UI
        ↓
Componentes React (Context Providers)
        ↓
Servicios (capa de abstracción)
        ↓
Axios (api.js con interceptors)
        ↓
Django REST API Backend
        ↓
Base de datos / Servicios externos
```

### Jerarquía de Componentes Simplificada

```
App
├─> ThemeProvider (tema claro/oscuro)
└─> AuthProvider (autenticación y usuarios)
    └─> Router
        ├─> Login (ruta pública)
        └─> ProtectedRoute
            └─> Dashboard
                ├─> Sidebar
                │   └─> SidebarMenu (navegación dinámica)
                ├─> SearchBar
                ├─> ThemeToggle
                ├─> UserMenu
                └─> Content Router
                    ├─> DashboardHome
                    ├─> TransaccionCrear
                    ├─> TransaccionRecientes
                    ├─> TransaccionBuscar
                    ├─> LibroDiarioCrear
                    ├─> LibroDiarioRecientes
                    ├─> CuentaCrear
                    ├─> UsuariosLista
                    ├─> Configuracion
                    └─> Chat (RAG Assistant)
```

### Patrones de Diseño Utilizados

**1. Context API Pattern**
- Manejo global de autenticación (AuthContext)
- Manejo global de tema (ThemeContext)
- Evita prop drilling

**2. Service Layer Pattern**
- Abstracción de lógica de API
- Respuestas consistentes
- Manejo centralizado de errores

**3. HOC Pattern**
- ProtectedRoute para rutas privadas
- Reutilización de lógica de autenticación

**4. Compound Components**
- TransactionCard + TransaccionesApp
- LibroDiarioCard + LibrosDiariosApp
- Encapsulación de lógica relacionada

**5. Controlled Components**
- Todos los formularios
- Estado sincronizado con React

**6. Container/Presentational**
- Content (container) + componentes específicos
- Separación de lógica y presentación

---

## Convenciones de Código

### Nomenclatura

**Archivos:**
- Componentes: PascalCase (TransaccionCrear.js)
- Servicios: PascalCase con sufijo Service (AuthService.js)
- Utilidades: camelCase (api.js)

**Variables y funciones:**
- camelCase (handleSubmit, userData, isLoading)

**Constantes:**
- UPPER_SNAKE_CASE (API_URL)

**Componentes React:**
- PascalCase (Dashboard, UserMenu)

### Estructura de Componentes

```javascript
// 1. Imports
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import service from '../services/Service'

// 2. Componente
function ComponentName({ prop1, prop2 }) {
  // 3. Hooks
  const { theme } = useTheme()
  const [state, setState] = useState(initial)
  
  // 4. Effects
  useEffect(() => {
    // ...
  }, [])
  
  // 5. Handlers
  const handleAction = () => {
    // ...
  }
  
  // 6. Render
  return (
    // JSX
  )
}

// 7. Export
export default ComponentName
```

### Manejo de Async/Await

```javascript
const handleAsyncAction = async () => {
  setLoading(true)
  setError("")
  
  try {
    const result = await service.action()
    
    if (result.success) {
      // Manejar éxito
    } else {
      setError(result.error)
    }
  } catch (err) {
    console.error("Error:", err)
    setError("Error inesperado")
  } finally {
    setLoading(false)
  }
}
```

---

## Testing

### Estructura de Tests

```
src/
├─> components/
│   ├─> Component.js
│   └─> Component.test.js
└─> services/
    ├─> Service.js
    └─> Service.test.js
```

### Herramientas Disponibles

- **@testing-library/react**: Testing de componentes
- **@testing-library/jest-dom**: Matchers personalizados
- **@testing-library/user-event**: Simulación de eventos

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Modo watch
npm test -- --watch

# Con cobertura
npm test -- --coverage
```

---

## Optimización y Performance

### Recomendaciones Implementadas

1. **Lazy Loading de Rutas** (por implementar)
   ```javascript
   const Dashboard = lazy(() => import('./components/Dashboard'))
   ```

2. **Memoización** (por implementar en componentes pesados)
   ```javascript
   const MemoizedComponent = React.memo(Component)
   ```

3. **useMemo y useCallback** (aplicar en cálculos pesados)

4. **Debouncing en búsquedas**
   - TransaccionBuscar usa delay de 500ms

### Métricas con web-vitals

```javascript
// reportWebVitals.js ya configurado
import reportWebVitals from './reportWebVitals'

reportWebVitals(console.log)
```

---

## Deployment

### Build de Producción

```bash
# Generar build optimizado
npm run build

# Servir localmente para testing
npm install -g serve
serve -s build
```

### Variables de Entorno

Crear archivo `.env` en la raíz:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### Checklist de Deployment

- [ ] Variables de entorno configuradas
- [ ] Build de producción generado
- [ ] Tests pasando
- [ ] Backend accesible desde el frontend
- [ ] CORS configurado en backend
- [ ] Assets optimizados
- [ ] Service worker configurado (opcional)

---

## Troubleshooting

### Problemas Comunes

**1. Error de CORS**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solución**: Verificar configuración de `django-cors-headers` en backend

**2. Token expirado**
```
401 Unauthorized
```
**Solución**: El interceptor de axios debería manejarlo automáticamente. Verificar refresh token.

**3. Componente no re-renderiza**
**Solución**: Verificar que el estado se esté actualizando correctamente (inmutabilidad)

**4. Búsqueda no funciona**
**Solución**: Verificar que `transacciones` esté cargada en Content/index.js

**5. Tema no cambia**
**Solución**: Verificar que el componente esté dentro del ThemeProvider

---

## Próximos Pasos

### Features Pendientes

**Alta Prioridad:**
- [ ] Completar integración con backend
- [ ] Implementar edición de transacciones (modal)
- [ ] Completar CuentaCrear con CRUD completo
- [ ] Completar UsuariosLista con tabla y modales
- [ ] Implementar Configuracion completa
- [ ] Testing de todos los componentes

**Media Prioridad:**
- [ ] Generación real de libros diarios (PDF)
- [ ] Persistencia del tema en localStorage
- [ ] Implementar búsqueda de libros diarios
- [ ] Historial de chat persistente
- [ ] Exportar transacciones (Excel/CSV)

**Baja Prioridad:**
- [ ] Modo offline (Service Worker)
- [ ] Notificaciones push
- [ ] Temas personalizables
- [ ] Internacionalización (i18n)
- [ ] Accesibilidad completa (WCAG)
- [ ] Optimización de renders
- [ ] Lazy loading de componentes

### Mejoras de UX

- [ ] Animaciones de transición entre rutas
- [ ] Skeleton loaders durante carga
- [ ] Toasts en lugar de alerts
- [ ] Drag & drop para reordenar entries
- [ ] Autocompletar en búsquedas
- [ ] Filtros avanzados con chips
- [ ] Vista de impresión optimizada
- [ ] Modo pantalla completa para tablas

### Mejoras Técnicas

- [ ] Migrar a TypeScript
- [ ] Implementar React Query
- [ ] Agregar Storybook
- [ ] Implementar E2E testing (Cypress)
- [ ] CI/CD pipeline
- [ ] Monitoring de errores (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] PWA completo

---

## Contribución

### Guía de Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código

- Seguir convenciones de nomenclatura
- Comentar código complejo
- Escribir tests para nuevas features
- Mantener componentes pequeños y enfocados
- Documentar props con PropTypes o TypeScript

---

## Recursos Adicionales

### Documentación Oficial

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Recharts](https://recharts.org/)

### Tutoriales Recomendados

- React Context API
- JWT Authentication in React
- REST API Integration
- Testing React Applications
- Neumorphism Design

---

## Notas Finales

Este README documenta el estado actual del frontend de Mosaite. Mantenerlo actualizado es crucial para facilitar el onboarding de nuevos desarrolladores y documentar decisiones de arquitectura.

Para más información sobre el proyecto completo, consultar:
- [README principal](../../../README.md)
- [Documentación del backend](../../backend/README.md)
- [Manual de usuario](../../manual/main.pdf)

---

**Última actualización**: Noviembre 2024
**Versión documentada**: 0.1.0
**Autor de la documentación**: Generado con asistencia de Claude (Anthropic)