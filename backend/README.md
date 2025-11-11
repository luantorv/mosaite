# Backend - Sistema de Contabilidad Educativo

API REST desarrollada con Django REST Framework para un sistema de práctica de contabilidad básica con soporte para modos educativo y empresarial.

## Arquitectura

### Tecnologías Principales
- **Django** - Framework web
- **Django REST Framework** - API REST
- **SimpleJWT** - Autenticación con tokens JWT
- **SQLite** - Base de datos
- **django-cors-headers ** - Manejo de CORS para frontend

### Estructura del Proyecto

```
backend/
├── apps/
│   ├── chat/            # Intereacción con el servicio de RAG (chat)
│   ├── config/          # Configuración del sistema
│   └── users/           # Gestión de usuarios y autenticación
├── config/              # Configuración de Django
├── services/
│   ├── chat/            # Servicio de Chat mediante un RAG
└── manage.py
```

## Modelos de Datos

### Usuario (User)
Modelo personalizado de usuario con los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `user_id` | AutoField (PK) | Identificador único |
| `name` | TextField | Nombre completo |
| `email` | TextField (Unique) | Email (usado para login) |
| `password` | TextField | Contraseña hasheada |
| `created_at` | TextField | Fecha de creación (ISO) |
| `updated_at` | TextField | Fecha de última actualización (ISO) |
| `status` | IntegerField | 0=Activo, 1=Inactivo |
| `group` | TextField | Grupo/Curso/Departamento |
| `rol` | IntegerField | Rol del usuario (0-4) |

### Configuración (Config)
Configuración global del sistema:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `config_id` | AutoField (PK) | Identificador único |
| `system_mode` | BooleanField | false=Educativo, true=Empresarial |
| `date_format` | TextField | Formato de fecha (ej: DD/MM/YYYY) |
| `currency` | TextField | Moneda (ej: ARS) |

## Sistema de Autenticación

### JWT (JSON Web Tokens)
- **Access Token**: 8 horas de duración
- **Refresh Token**: 7 días de duración
- Rotación automática de tokens
- Blacklist de tokens en logout

### Endpoints de Autenticación

#### POST `/api/auth/login/`
Inicia sesión y retorna tokens JWT.

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Validaciones:**
- El usuario debe existir
- La contraseña debe ser correcta
- El usuario debe estar activo (status=0)

#### POST `/api/auth/refresh/`
Refresca el access token usando el refresh token.

**Request:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### POST `/api/auth/logout/`
Invalida el refresh token (blacklist).

**Request:**
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:**
```json
{
  "message": "Logout exitoso"
}
```

## Gestión de Usuarios

### Roles del Sistema

#### Modo Empresarial
| Número | Rol | Descripción |
|--------|-----|-------------|
| 0 | Admin | Acceso total al sistema |
| 1 | Manager | Gestión operativa |
| 2 | Accountant | Operaciones contables |
| 3 | Operator | Operaciones básicas |
| 4 | Viewer | Solo lectura |

#### Modo Educativo
| Número | Rol | Descripción |
|--------|-----|-------------|
| 0 | Profesor | Acceso total al sistema |
| 2 | Alumno | Acceso limitado |

**Nota:** En modo educativo solo se pueden crear usuarios con rol 0 (Profesor) o 2 (Alumno).

### Sistema de Permisos

#### Grupos Predefinidos
El sistema utiliza letras para definir grupos de roles:

| Letra | Roles Incluidos | Uso |
|-------|----------------|-----|
| `A` | [0,1,2,3,4] | All - Todos los roles |
| `N` | [0,1,2,3] | Not Viewer - Todos menos Viewer |
| `X` | [0,1,2] | eXecutive - Admin, Manager, Accountant |
| `Y` | [0,2] | Year-end - Admin, Accountant |
| `Z` | [0,1] | Zone managers - Admin, Manager |
| `S` | [0] | Super - Solo Admin |

#### Clases de Permisos

**HasRolePermission**
Verifica que el usuario tenga uno de los roles permitidos.

```python
class MiViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_roles = 'X'  # o [0, 1, 2] o 0
```

**HasRoleForAction**
Permite definir roles diferentes según la acción HTTP.

```python
class MiViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasRoleForAction]
    action_roles = {
        'list': 'A',      # Todos pueden listar
        'create': 'Y',    # Solo Admin y Accountant pueden crear
        'destroy': 'S',   # Solo Admin puede eliminar
    }
```

### Endpoints de Usuarios

Todos los endpoints requieren autenticación con token JWT en el header:
```
Authorization: Bearer <access_token>
```

#### GET `/api/users/`
Lista todos los usuarios (paginado).

**Permisos:** Rol Z (Admin, Manager)

**Query Parameters:**
- `status`: Filtrar por estado (0=activo, 1=inactivo)
- `rol`: Filtrar por rol (0-4)
- `group`: Búsqueda por grupo (case-insensitive)

**Response:**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "user_id": 1,
      "name": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "status": 0,
      "group": "Curso A",
      "rol": 2,
      "role_name": "Accountant",
      "created_at": "2024-11-04T12:00:00"
    }
  ]
}
```

#### GET `/api/users/{id}/`
Obtiene detalles de un usuario específico.

**Permisos:** Rol X (Admin, Manager, Accountant)

#### POST `/api/users/`
Crea un nuevo usuario.

**Permisos:** Rol Z (Admin, Manager)

**Request:**
```json
{
  "name": "María García",
  "email": "maria@ejemplo.com",
  "password": "contraseña123",
  "group": "Curso B",
  "rol": 2
}
```

**Response:** Usuario creado con código 201

**Validaciones:**
- Email único
- Contraseña con validaciones de Django
- Rol válido según modo del sistema

#### PATCH `/api/users/{id}/`
Actualización parcial de un usuario.

**Permisos:** Rol Z (Admin, Manager) para partial_update

**Request:**
```json
{
  "name": "María García López",
  "group": "Curso C"
}
```

**Nota:** La contraseña es opcional. Si no se envía, no se modifica.

#### PUT `/api/users/{id}/`
Actualización completa de un usuario.

**Permisos:** Rol S (Solo Admin)

#### DELETE `/api/users/{id}/`
Elimina un usuario.

**Permisos:** Rol S (Solo Admin)

#### GET `/api/users/me/`
Obtiene información del usuario autenticado.

**Permisos:** Cualquier usuario autenticado (Rol A)

**Response:**
```json
{
  "user_id": 5,
  "name": "Usuario Actual",
  "email": "usuario@ejemplo.com",
  "status": 0,
  "group": "Mi Grupo",
  "rol": 2,
  "role_name": "Accountant",
  "created_at": "2024-11-04T12:00:00",
  "updated_at": "2024-11-04T12:00:00"
}
```

## Configuración del Sistema

### Endpoints de Configuración

#### GET `/api/config/current/`
Obtiene la configuración actual del sistema.

**Response:**
```json
{
  "config_id": 1,
  "system_mode": false,
  "date_format": "DD/MM/YYYY",
  "currency": "ARS"
}
```

#### GET `/api/config/role_names/`
Obtiene los nombres de roles según el modo actual.

**Response (Modo Educativo):**
```json
{
  "0": "Profesor",
  "2": "Alumno"
}
```

**Response (Modo Empresarial):**
```json
{
  "0": "Admin",
  "1": "Manager",
  "2": "Accountant",
  "3": "Operator",
  "4": "Viewer"
}
```

## Utilidades

### Funciones Helper (users/utils.py)

**`get_available_roles_for_creation()`**
Retorna los roles disponibles según el modo del sistema.

**`validate_role_for_system(rol)`**
Valida si un rol es válido para el modo actual.

**`get_role_display_name(rol, system_mode=None)`**
Retorna el nombre del rol según el modo.

## Acceso en Red Local (LAN)

Para permitir acceso desde otras computadoras en la red local:

1. Ejecutar el servidor en todas las interfaces:
```bash
python manage.py runserver 0.0.0.0:8000
```

2. Acceder desde otros dispositivos usando la IP privada:
```
http://192.168.X.X:8000/api/
```

3. Configurar el frontend para usar la IP del servidor:
```env
REACT_APP_API_URL=http://192.168.X.X:8000/api
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 204 | Sin contenido (eliminación exitosa) |
| 400 | Solicitud incorrecta |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | Recurso no encontrado |
| 500 | Error del servidor |

## Seguridad

- Todas las contraseñas se hashean con PBKDF2
- Los tokens JWT tienen expiración
- CORS configurado para el frontend
- Validación de estado de usuario en login
- Validación de permisos por rol en cada endpoint
- Blacklist de tokens en logout

## Chat con RAG (Retrieval-Augmented Generation)

Sistema de asistente conversacional con inteligencia artificial para consultas contables.

### Arquitectura del Sistema

**Componentes:**
- **Embedder**: sentence-transformers (all-MiniLM-L6-v2)
- **Vector Store**: FAISS (Facebook AI Similarity Search)
- **LLM**: Llama 3 (local, usando llama-cpp-python)
- **Documentos**: Archivos .md y .txt en `services/chat/data/`

### Proceso de RAG

1. **Indexación**:
   - Los documentos se dividen en chunks de 500 caracteres (con 50 de overlap)
   - Se generan embeddings usando sentence-transformers
   - Se almacenan en índice FAISS para búsqueda rápida

2. **Consulta**:
   - Se genera embedding de la pregunta
   - Se buscan los 3 chunks más relevantes en FAISS
   - Se construye un prompt con contexto
   - El LLM genera respuesta basada en el contexto

3. **Respuesta**:
   - Se retorna la respuesta generada
   - Se incluyen las fuentes consultadas
   - Se registra en historial

### Endpoints del Chat

#### POST `/api/chat/query/`
Procesa una consulta al chat.

**Permisos:** Cualquier usuario autenticado

**Request:**
```json
{
  "question": "¿Qué es el debe y el haber?"
}
```

**Response (200):**
```json
{
  "answer": "El debe y el haber son los dos lados...",
  "sources": [
    {
      "name": "manual_cuentas.md",
      "similarity": 0.89
    }
  ],
  "context_used": true,
  "response_time": 2.45,
  "query_id": 123
}
```

**Response (503) - Servicio no disponible:**
```json
{
  "error": "El servicio de chat no está disponible...",
  "is_rebuilding": true,
  "is_available": false
}
```

#### POST `/api/chat/cancel/`
Cancela una consulta en curso.

**Request:**
```json
{
  "request_id": "uuid-here"
}
```

**Response:**
```json
{
  "message": "Petición cancelada exitosamente"
}
```

#### GET `/api/chat/status/`
Obtiene el estado del servicio de chat.

**Response:**
```json
{
  "status_id": 1,
  "is_available": true,
  "is_rebuilding": false,
  "last_rebuild": "2024-11-05T10:30:00",
  "total_vectors": 416,
  "total_documents": 5,
  "rebuild_by": 1,
  "rebuild_by_name": "Profesor Admin"
}
```

#### POST `/api/chat/rebuild/`
Reconstruye el índice de embeddings desde cero.

**Permisos:** Solo Admin (rol 0) y Profesor (rol 0 en modo educativo)

**Request:**
```json
{
  "confirm": true
}
```

**Response (202):**
```json
{
  "message": "Reconstrucción del índice iniciada. El servicio no estará disponible hasta que finalice.",
  "is_rebuilding": true
}
```

**Response (409) - Ya reconstruyendo:**
```json
{
  "error": "Ya hay una reconstrucción en curso",
  "is_rebuilding": true
}
```

#### GET `/api/chat/history/`
Obtiene el historial de consultas.

**Permisos:** 
- Admin/Profesor: Ven todo el historial
- Otros usuarios: Solo su propio historial

**Query Parameters:**
- `user`: Filtrar por usuario (solo Admin/Profesor)
- `date_from`: Fecha desde (ISO format)
- `date_to`: Fecha hasta (ISO format)

**Response:**
```json
{
  "count": 50,
  "results": [
    {
      "query_id": 123,
      "user": 5,
      "user_name": "Juan Pérez",
      "user_email": "juan@ejemplo.com",
      "question": "¿Qué es el debe?",
      "answer": "El debe es...",
      "sources": [...],
      "context_used": true,
      "created_at": "2024-11-05T10:15:00",
      "response_time": 2.3
    }
  ]
}
```

### Gestión del Índice

#### Inicialización Automática

Al iniciar el servicio por primera vez, el índice se crea automáticamente si no existe:

```bash
python manage.py init_chat
```

Este comando:
1. Carga el modelo de embeddings
2. Lee todos los archivos .md y .txt de `services/chat/data/`
3. Genera chunks y embeddings
4. Crea el índice FAISS
5. Actualiza el estado en la base de datos

#### Reconstrucción Manual

```bash
python manage.py rebuild_chat_index
```

O desde la API (Admin/Profesor solamente):
```bash
POST /api/chat/rebuild/
```

### Configuración del Servicio

Archivo: `services/chat/config.py`

```python
# Modelo de embeddings
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
EMBEDDING_DIMENSION = 384

# Modelo LLM local
LLM_MODEL_PATH = "services/consultorIA/core/Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf"
LLM_CONTEXT_SIZE = 2048
LLM_MAX_TOKENS = 512
LLM_TEMPERATURE = 0.7

# RAG
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
TOP_K_RESULTS = 3

# Rutas
DATA_DIR = "services/chat/data/"
VECTOR_STORE_DIR = "services/chat/vector_store/"
```

### Agregar Documentos

1. Colocar archivos .md o .txt en `services/chat/data/`
2. Reconstruir el índice:
   ```bash
   python manage.py rebuild_chat_index
   ```
   O usar el endpoint `/api/chat/rebuild/`

### Estructura de Archivos

```
services/
└── chat/
    ├── config.py           # Configuración
    ├── embedder.py         # Generación de embeddings
    ├── llm_client.py       # Cliente LLM local
    ├── vector_store.py     # Índice FAISS
    ├── rag_service.py      # Servicio principal
    ├── init_index.py       # Script de inicialización
    ├── data/               # Documentos fuente
    │   └── manual_cuentas.md
    └── vector_store/       # Índice generado
        ├── index.faiss
        └── metadata.json
```

### Modelos de Base de Datos

**ChatQuery**: Historial de consultas
- `query_id`: ID único
- `user`: Usuario que consultó
- `question`: Pregunta realizada
- `answer`: Respuesta generada
- `sources`: Fuentes consultadas (JSON)
- `context_used`: Si se usó contexto
- `response_time`: Tiempo de respuesta
- `created_at`: Fecha de consulta

**IndexStatus**: Estado del índice
- `is_available`: Si el servicio está disponible
- `is_rebuilding`: Si está reconstruyendo
- `last_rebuild`: Última reconstrucción
- `total_vectors`: Total de vectores indexados
- `total_documents`: Total de documentos
- `rebuild_by`: Usuario que inició la reconstrucción

### Troubleshooting

**El índice tiene 0 vectores:**
- Verificar que existan archivos en `services/chat/data/`
- Los archivos deben ser .md o .txt
- Ejecutar `python manage.py rebuild_chat_index`

**Error al cargar el modelo LLM:**
- Verificar que el archivo .gguf exista en la ruta configurada
- Verificar que llama-cpp-python esté instalado correctamente
- En sistemas con GPU, instalar la versión con soporte CUDA

**Error GGML_ASSERT durante la generación:**
- El prompt es demasiado largo: El sistema ahora trunca automáticamente
- Configurar `TOKENIZERS_PARALLELISM=false` para evitar warnings
- Si persiste, verificar que el modelo sea compatible con llama-cpp-python
- Considerar usar un modelo más pequeño o estable

**Respuestas vacías o errores del LLM:**
- El sistema implementa respuestas fallback automáticas
- Si el LLM falla, retorna el contexto recuperado directamente
- Ajustar `LLM_MAX_TOKENS` y `LLM_TEMPERATURE` en config.py
- Verificar que el modelo tenga suficiente memoria disponible

**Warnings de tokenizers/forking:**
- Configurar `export TOKENIZERS_PARALLELISM=false` antes de ejecutar
- O agregar `os.environ['TOKENIZERS_PARALLELISM'] = 'false'` en settings.py

**Respuestas irrelevantes:**
- Agregar más documentos relevantes en `data/`
- Ajustar `CHUNK_SIZE` y `CHUNK_OVERLAP`
- Aumentar `TOP_K_RESULTS` para más contexto
- Verificar la calidad de los documentos fuente

**El servicio se cae durante consultas:**
- Implementado manejo robusto de errores con fallbacks
- Truncado automático de prompts largos (máx 1500 chars)
- Validación de respuestas antes de retornarlas
- Si persiste, revisar logs de Django para detalles

### Manejo de Errores y Fallbacks

El sistema implementa múltiples capas de protección:

1. **Truncado de prompts**: Limita automáticamente a 1500 caracteres
2. **Truncado de contexto**: Cada chunk se limita a 300 caracteres
3. **Validación de respuestas**: Verifica que las respuestas sean válidas
4. **Respuesta fallback**: Si el LLM falla, retorna el contexto directamente
5. **Manejo de excepciones**: Captura todos los errores sin crashear
6. **Timeout implícito**: Evita generaciones infinitas

Ejemplo de respuesta fallback (cuando el LLM falla):
```
"Según la información disponible en manual_cuentas.md:

[Fragmento relevante del documento]

También encontré información relacionada en otros 2 documento(s)."
```