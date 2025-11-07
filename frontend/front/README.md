# Frontend - Sistema de Contabilidad Educativo

Aplicación web desarrollada con React para un sistema de práctica de contabilidad básica con interfaz neumórfica y soporte para temas claro/oscuro.

## Arquitectura

### Tecnologías Principales
- **React** - Biblioteca de UI
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP para API
- **Bootstrap** - Framework CSS base
- **Recharts** - Gráficos y visualizaciones

### Estructura del Proyecto

```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Imágenes y recursos
│   ├── components/     # Componentes React
│   │   ├── Content/   # Componentes de contenido
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Sidebar.js
│   │   └── ...
│   ├── context/        # Contextos de React
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── services/       # Servicios para API
│   │   ├── api.js
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   └── ConfigService.js
│   └── App.js
└── package.json
```

## Sistema de Temas

### Neumorfismo (Soft UI)
La aplicación utiliza un diseño neumórfico que simula extrusión y profundidad mediante sombras y luces, creando una apariencia suave y moderna.

### Temas Disponibles

#### Tema Claro (`light`)
```javascript
{
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
  accentColor: '#E9C46A'
}
```

#### Tema Oscuro (`dark`)
```javascript
{
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
  accentColor: '#F4BF4A'
}
```

### ThemeContext

El contexto proporciona acceso global al tema actual y funciones para manipularlo.

**Propiedades disponibles:**
- `theme`: Objeto con todas las propiedades del tema actual
- `currentTheme`: String con el nombre del tema (`'light'` o `'dark'`)
- `toggleTheme()`: Función para alternar entre temas
- `isLight`: Boolean - `true` si el tema es claro
- `isDark`: Boolean - `true` si el tema es oscuro

**Uso básico:**
```javascript
import { useTheme } from '../context/ThemeContext';

function MiComponente() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div style={{ background: theme.background }}>
      <h1 style={{ color: theme.textColor }}>Título</h1>
      
      <button 
        onClick={toggleTheme}
        style={{
          background: theme.background,
          boxShadow: theme.buttonShadowOut
        }}
      >
        Cambiar a tema {isDark ? 'Claro' : 'Oscuro'}
      </button>
    </div>
  );
}
```

**Ejemplo con sombras neumórficas:**
```javascript
// Botón con efecto de presionar
const [pressed, setPressed] = useState(false);

<button
  style={{
    background: theme.background,
    boxShadow: pressed ? theme.buttonShadowIn : theme.buttonShadowOut,
    transition: 'all 0.2s ease'
  }}
  onMouseDown={() => setPressed(true)}
  onMouseUp={() => setPressed(false)}
>
  Click me
</button>
```

## Sistema de Autenticación

### AuthContext

Gestiona el estado de autenticación y proporciona:

**Estado:**
- `user`: Objeto con datos del usuario actual
- `isAuthenticated`: Boolean de estado de sesión
- `loading`: Boolean de carga
- `users`: Array de usuarios (para gestión)
- `roles`: Objeto con nombres de roles según modo
- `systemConfig`: Configuración del sistema

**Métodos:**
- `login(email, password)`: Inicia sesión
- `logout()`: Cierra sesión
- `loadUsers(filters)`: Carga lista de usuarios
- `createUser(userData)`: Crea usuario
- `updateUser(userId, updates)`: Actualiza usuario
- `deleteUser(userId)`: Elimina usuario
- `toggleUserStatus(userId)`: Cambia estado activo/inactivo
- `checkAuthentication()`: Verifica sesión actual

**Uso:**
```javascript
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  const handleLogin = async () => {
    const result = await login('email@ejemplo.com', 'password');
    if (result.success) {
      console.log('Login exitoso');
    }
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Hola, {user.name}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Servicios API

### Configuración Base (services/api.js)

Instancia de Axios configurada con:
- Base URL desde variable de entorno
- Headers por defecto
- Interceptor para agregar token JWT
- Interceptor para refrescar token automáticamente

### AuthService (services/authService.js)

**`login(email, password)`**
Inicia sesión y guarda tokens en localStorage.

**`logout()`**
Cierra sesión e invalida tokens.

**`checkAuth()`**
Verifica si hay sesión activa.

**`refreshToken()`**
Refresca el access token.

### UserService (services/UserService.js)

**`getUsers(filters)`**
Obtiene lista de usuarios con filtros opcionales.

**`getUser(userId)`**
Obtiene un usuario específico.

**`createUser(userData)`**
Crea un nuevo usuario.

**`updateUser(userId, userData)`**
Actualiza datos de un usuario.

**`deleteUser(userId)`**
Elimina un usuario.

**`toggleUserStatus(userId, currentStatus)`**
Cambia el estado activo/inactivo.

### ChatService (services/ChatService.js)

**`query(question)`**
Envía una consulta al asistente de chat.

**`cancelQuery(requestId)`**
Cancela una consulta en curso.

**`getStatus()`**
Obtiene el estado del servicio (disponible, reconstruyendo, etc.).

**`rebuildIndex()`**
Reconstruye el índice de embeddings (solo Admin/Profesor).

**`getHistory(filters)`**
Obtiene el historial de consultas del chat.

## Componentes Principales

### Login (components/Login.js)

Pantalla de inicio de sesión con:
- Validación de campos
- Manejo de errores del backend
- Estados de carga
- Diseño neumórfico
- Redirección automática si ya está autenticado

### Dashboard (components/Dashboard.js)

Contenedor principal de la aplicación con:
- Sidebar de navegación
- Header con búsqueda y menú de usuario
- Área de contenido dinámico
- Layout responsivo

### ProtectedRoute (components/ProtectedRoute.js)

HOC para proteger rutas que requieren autenticación:
- Verifica estado de autenticación
- Muestra loading mientras verifica
- Redirige a login si no está autenticado

**Uso:**
```javascript
<Route 
  path="/" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### UserMenu (components/UserMenu.js)

Menú desplegable con información del usuario:
- Avatar con iniciales
- Nombre y email
- Rol y estado
- Botón de logout

### UsuariosLista (components/Content/UsuariosLista.js)

**Funcionalidades implementadas:**

✅ **Listado de usuarios**
- Vista en cards con información completa
- Filtrado por rol
- Toggle para mostrar/ocultar inactivos
- Contador de usuarios

✅ **Creación de usuarios**
- Modal con formulario
- Validación de campos
- Roles disponibles según modo del sistema
- Manejo de errores del backend

✅ **Edición de usuarios**
- Modal pre-poblado con datos
- Contraseña opcional (no se cambia si está vacía)
- Actualización en tiempo real

✅ **Eliminación de usuarios**
- Confirmación antes de eliminar
- Feedback visual

✅ **Cambio de estado**
- Toggle activo/inactivo
- Indicadores visuales de estado
- Actualización inmediata

**Campos del formulario:**
- Nombre (obligatorio)
- Email (obligatorio)
- Contraseña (obligatorio en creación, opcional en edición)
- Grupo (opcional)
- Rol (según modo del sistema)

### ChatLLM (components/Content/Chat.js)

**Sistema de chat con RAG implementado:**

✅ **Interfaz de chat**
- Área de mensajes scrolleable
- Input fijo en la parte inferior
- Header con estado del servicio
- Diseño neumórfico consistente

✅ **Funcionalidades de mensajería**
- Envío de mensajes al asistente de IA
- Visualización de respuestas con contexto
- Timestamps en cada mensaje
- Indicador de usuario vs asistente
- Scroll automático a nuevos mensajes

✅ **Gestión del servicio**
- Estado en tiempo real (activo/reconstruyendo)
- Contador de vectores indexados
- Banner informativo cuando no está disponible
- Polling automático del estado (cada 10s durante reconstrucción)

✅ **Control de generación**
- Botón de cancelar mensaje (mientras genera)
- Deshabilitación de input cuando no disponible
- Loading states con animación de puntos

✅ **Fuentes y metadata**
- Visualización de fuentes consultadas
- Nivel de relevancia por fuente
- Tiempo de respuesta de cada consulta
- Indicadores de uso de contexto

✅ **Gestión del índice (Admin/Profesor)**
- Botón de reconstruir índice
- Confirmación antes de reconstruir
- Feedback del proceso
- Actualización automática al finalizar

✅ **Manejo de errores**
- Mensajes diferenciados visualmente
- Errores del backend mostrados claramente
- Recuperación automática de estado

**Características UX:**
- Enter para enviar mensaje (Shift+Enter para nueva línea)
- Mensajes de bienvenida informativos
- Placeholders contextuales
- Indicadores visuales de estado del servicio
- Efectos hover en botones

## Componentes de UI Reutilizables

### Sidebar (components/Sidebar.js)
Barra lateral de navegación con:
- Logo
- Opciones del menú
- Indicador de ruta activa
- Toggle para expandir/contraer

### SearchBar (components/SearchBar.js)
Barra de búsqueda con:
- Input con diseño neumórfico
- Icono de búsqueda
- Placeholder dinámico

### ThemeToggle (components/ThemeToggle.js)
Botón para cambiar tema con:
- Icono de sol/luna
- Animación de transición
- Estado visual del tema actual

### LogoutButton (components/LogoutButton.js)
Botón de cierre de sesión con:
- Estado de carga
- Confirmación implícita
- Diseño consistente

## Flujo de Autenticación

```
1. Usuario ingresa credenciales en Login
   ↓
2. AuthService.login() hace POST a /api/auth/login/
   ↓
3. Backend valida y retorna tokens JWT
   ↓
4. Tokens se guardan en localStorage
   ↓
5. AuthService.checkAuth() obtiene datos del usuario
   ↓
6. AuthContext actualiza estado global
   ↓
7. Usuario es redirigido a Dashboard
   ↓
8. Todas las peticiones incluyen token en header
   ↓
9. Si token expira, interceptor lo refresca automáticamente
   ↓
10. Al hacer logout, token se invalida en backend
```

## Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del frontend:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Para acceso en LAN, usar la IP privada del servidor:

```env
REACT_APP_API_URL=http://192.168.X.X:8000/api
```

## Navegación

### Rutas Disponibles

| Ruta | Componente | Protegida | Descripción |
|------|-----------|-----------|-------------|
| `/login` | Login | No | Inicio de sesión |
| `/` | Dashboard | Sí | Panel principal |

### Estructura del Dashboard

El Dashboard actúa como contenedor y utiliza un sistema de navegación interna donde los componentes se cargan dinámicamente según la opción seleccionada en el Sidebar.

## Gestión de Estado

### Estado Local
Componentes individuales manejan su propio estado con `useState` para:
- Formularios
- Modales
- Filtros
- Loading states

### Estado Global
Contextos (AuthContext, ThemeContext) manejan estado compartido entre componentes.

### Persistencia
- **Tokens JWT**: localStorage
- **Tema**: localStorage
- **Configuración**: Desde API

## Buenas Prácticas Implementadas

- **Separación de responsabilidades**: Servicios separados para API
- **Componentes reutilizables**: UI components compartidos
- **Manejo de errores**: Try-catch en todas las operaciones async
- **Loading states**: Feedback visual durante operaciones
- **Validación**: En frontend y backend
- **Seguridad**: Tokens en headers, rutas protegidas
- **UX**: Estados de carga, mensajes de error claros
- **Accesibilidad**: Labels, títulos descriptivos

## Guía de Estilos

### Paleta de Colores

#### Tema Claro
- **Background**: `#e0e5ec`
- **Primary**: `#7C9A5D` (verde oliva)
- **Accent**: `#E9C46A` (amarillo mostaza)
- **Text**: `#2D2D2D`
- **Text Secondary**: `#4F4F4F`
- **Text Muted**: `#999`
- **Hover**: `#d8dde8`

#### Tema Oscuro
- **Background**: `#2c3e50`
- **Primary**: `#93B676` (verde claro)
- **Accent**: `#F4BF4A` (amarillo)
- **Text**: `#F4F4F4`
- **Text Secondary**: `#C0C0C0`
- **Text Muted**: `#718096`
- **Hover**: `#34495e`

### Colores de Estado
- **Success**: `#4caf50` (verde)
- **Error**: `#f44336` (rojo)
- **Warning**: `#ff9800` (naranja)
- **Info**: `#2196f3` (azul)

### Sombras Neumórficas

El sistema utiliza tres niveles de sombras:

1. **Cards**: Sombras grandes para superficies principales
   - Out: `8px 8px 16px` (sombra clara y oscura)
   - In: `inset 4px 4px 8px`

2. **Buttons**: Sombras medianas para botones
   - Out: `4px 4px 8px`
   - In: `inset 4px 4px 8px`

3. **Small Buttons**: Sombras para botones pequeños/iconos
   - Out: `6px 6px 12px`
   - In: `inset 6px 6px 12px`

### Espaciado
- **Padding de cards**: `20px - 32px`
- **Gap entre elementos**: `8px - 20px`
- **Margin entre secciones**: `16px - 24px`
- **Border radius**: `8px - 16px`

### Tipografía
- **Títulos principales**: `20px - 24px`, weight `600`
- **Títulos secundarios**: `18px`, weight `600`
- **Texto normal**: `14px`, weight `400`
- **Texto secundario**: `12px - 13px`
- **Fuente**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.)

### Transiciones
- **Duración estándar**: `0.2s - 0.3s`
- **Easing**: `ease`, `ease-in-out`
- **Hover effects**: Transform scale(1.05), translateY(-1px)

### Breakpoints (Responsividad)
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px