# Backend Documentation - Mosaite

## Índice

1. [Descripción General](#descripción-general)
2. [Tecnologías y Dependencias](#tecnologías-y-dependencias)
3. [Configuración e Instalación](#configuración-e-instalación)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Testing](#testing)
6. [Aplicaciones](#aplicaciones)
   - [6.1 Accounts](#61-accounts)
   - [6.2 Chat](#62-chat)
   - [6.3 Config](#63-config)
   - [6.4 Dash](#64-dash)
   - [6.5 Trans](#65-trans)
   - [6.6 Users](#66-users)
7. [Servicios](#servicios)
8. [API Reference](#api-reference)
9. [Comandos de Gestión](#comandos-de-gestión)

---

## Descripción General

Backend del sistema Mosaite, construido con Django y Django REST Framework. El proyecto incluye módulos para gestión de cuentas contables, transacciones, chat con IA, dashboard y administración de usuarios.

---

## Tecnologías y Dependencias

### Framework Principal
- **Django 5.2.6** - Framework web principal
- **Django REST Framework 3.16.1** - API RESTful
- **djangorestframework-simplejwt 5.5.1** - Autenticación JWT

### Machine Learning & IA
- **torch 2.8.0** - Framework de deep learning
- **transformers 4.56.2** - Modelos de lenguaje de Hugging Face
- **sentence-transformers 5.1.1** - Embeddings de texto
- **llama-cpp-python 0.3.16** - Integración con modelos Llama
- **faiss-cpu 1.12.0** - Búsqueda de vectores similares
- **scikit-learn 1.7.2** - Algoritmos de ML tradicional

### Almacenamiento y Cache
- **diskcache 5.6.3** - Sistema de caché en disco

### Utilidades
- **aiohttp 3.13.1** - Cliente/servidor HTTP asíncrono
- **requests 2.32.5** - Cliente HTTP
- **django-cors-headers 4.9.0** - Manejo de CORS
- **Pillow 11.3.0** - Procesamiento de imágenes
- **PyYAML 6.0.3** - Parser YAML
- **rich 14.2.0** - Salida enriquecida en terminal

### Testing
- **pytest 9.0.0** - Framework de testing
- **pytest-django 4.11.1** - Plugin pytest para Django
- **pytest-cov 7.0.0** - Cobertura de código
- **coverage 7.11.3** - Medición de cobertura

---

## Configuración e Instalación

### Requisitos Previos
- Python 3.10+
- pip
- virtualenv (recomendado)
- CUDA 12.8+ (opcional, para aceleración GPU)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/luantorv/mosaite.git
cd mosaite/backend
```

2. **Crear entorno virtual**
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

5. **Realizar migraciones**
```bash
python manage.py migrate
```

6. **Crear superusuario**
```bash
python manage.py createsuperuser
```

7. **Inicializar datos base**
```bash
python manage.py init_plan_cuentas
python manage.py init_chat
python manage.py init_dashboard_data
```

8. **Ejecutar servidor de desarrollo**
```bash
python manage.py runserver
```

---

## Estructura del Proyecto

```
backend/
├── apps/                      # Aplicaciones Django
│   ├── accounts/              # Gestión de cuentas contables
│   ├── chat/                  # Sistema de chat con IA
│   ├── config/                # Configuración del sistema
│   ├── dash/                  # Dashboard y estadísticas
│   ├── trans/                 # Transacciones contables
│   └── users/                 # Gestión de usuarios
├── config/                    # Configuración del proyecto Django
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── services/                  # Servicios auxiliares
│   ├── chat/                  # Servicio RAG para chat
│   ├── consultorIA/           # Consultor IA
│   └── daily/                 # Tareas diarias
├── manage.py                  # CLI de Django
├── requirements.txt           # Dependencias
├── pytest.ini                 # Configuración de pytest
└── conftest.py                # Fixtures globales de pytest
```

---

## Testing

El proyecto utiliza **pytest** como framework de testing con integración Django.

### Configuración

```ini
# pytest.ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings
python_files = tests.py test_*.py *_tests.py
addopts = -v
filterwarnings =
    ignore:.*SwigPyObject.*:DeprecationWarning
```

### Fixtures Globales

El archivo `conftest.py` proporciona fixtures reutilizables:

**`api_client`**: Cliente DRF para peticiones HTTP
```python
@pytest.fixture
def api_client():
    return APIClient()
```

**`user_data`**: Datos base para creación de usuario
```python
@pytest.fixture
def user_data():
    return {
        "email": "test@example.com",
        "name": "Test User",
        "password": "pass1234",
        "group": "default",
        "rol": 0,
        "status": 0,
    }
```

**`user`**: Crea un usuario en BD
```python
@pytest.fixture
def user(db, user_data):
    User = get_user_model()
    obj = User.objects.create_user(
        email=user_data["email"],
        password=user_data["password"],
        name=user_data["name"],
        group=user_data["group"],
        rol=user_data["rol"],
    )
    obj.status = 0
    obj.save()
    return obj
```

### Ejecutar Tests

```bash
# Todos los tests
pytest

# Con cobertura
pytest --cov

# Aplicación específica
pytest apps/accounts/tests/

# Test específico
pytest apps/accounts/tests/test_accounts_models.py

# Con salida verbosa
pytest -v

# Detener en primer fallo
pytest -x
```

### Estructura de Tests por Aplicación

Cada aplicación tiene su directorio `tests/` con:
- `test_*_models.py` - Tests de modelos
- `test_*_serializers.py` - Tests de serializadores
- `test_*_views.py` - Tests de vistas/endpoints
- `test_*_permissions.py` - Tests de permisos (si aplica)

---

## Aplicaciones

### 6.1 Accounts

**Descripción:** Gestión del plan de cuentas contables del sistema. Maneja las cuentas que se utilizan en las transacciones contables, incluyendo su código, nombre, saldo, naturaleza (deudora/acreedora) y estado.

#### Características
- Plan de cuentas con códigos únicos
- Naturaleza de cuentas (deudora/acreedora)
- Gestión de saldos automática
- Estado activo/inactivo
- Búsqueda por código o nombre
- Filtros por naturaleza y estado

#### Modelo: Account

**Tabla:** `accounts`

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `acc_id` | AutoField (PK) | ID único de la cuenta | - |
| `code` | TextField (unique) | Código de la cuenta | - |
| `name` | TextField | Nombre de la cuenta | - |
| `saldo` | IntegerField | Saldo actual de la cuenta | 0 |
| `nature` | Boolean | Naturaleza (True: Deudora, False: Acreedora) | - |
| `status` | Boolean | Estado (True: Activa, False: Inactiva) | True |

**Orden por defecto:** `code` (ascendente)

**Método especial:**
- `__str__()`: Retorna `"{code} - {name}"`

#### Naturaleza de Cuentas

**Deudora (nature=True):**
- El saldo aumenta con débitos (debe)
- El saldo disminuye con créditos (haber)
- Ejemplos: Activos, Gastos

**Acreedora (nature=False):**
- El saldo aumenta con créditos (haber)
- El saldo disminuye con débitos (debe)
- Ejemplos: Pasivos, Patrimonio, Ingresos

#### Serializers

**1. AccountSerializer**

Serializer completo para CRUD de cuentas.

```python
Campos:
├── acc_id (read-only)
├── code
├── name
├── saldo (read-only)
├── nature
└── status
```

**Campos read-only:**
- `acc_id`: Asignado automáticamente
- `saldo`: Actualizado por transacciones (no editable directamente)

**2. AccountListSerializer**

Versión ligera para listados con información adicional.

```python
Campos:
├── acc_id
├── code
├── name
├── saldo
├── nature
├── nature_display (calculado: "Deudora" o "Acreedora")
└── status
```

**Campo calculado:**
- `nature_display`: Retorna texto legible de la naturaleza

#### ViewSet

**AccountViewSet**

CRUD completo de cuentas contables.

```python
queryset = Account.objects.all()
serializer_class = AccountSerializer
permission_classes = [IsAuthenticated]
```

**Serializer dinámico:**
- **list:** Usa `AccountListSerializer` (incluye nature_display)
- **Otras acciones:** Usa `AccountSerializer`

#### Endpoints

**Base URL:** `/api/accounts/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar cuentas | IsAuthenticated |
| POST | `/` | Crear cuenta | IsAuthenticated |
| GET | `/{id}/` | Detalle de cuenta | IsAuthenticated |
| PUT | `/{id}/` | Actualizar cuenta | IsAuthenticated |
| PATCH | `/{id}/` | Actualizar parcial | IsAuthenticated |
| DELETE | `/{id}/` | Eliminar cuenta | IsAuthenticated |
| GET | `/active/` | Listar solo cuentas activas | IsAuthenticated |

#### Filtros Disponibles

**Query Parameters:**

**1. Por estado:**
```bash
GET /api/accounts/?status=true   # Solo activas
GET /api/accounts/?status=false  # Solo inactivas
```

**2. Por naturaleza:**
```bash
GET /api/accounts/?nature=true   # Solo deudoras
GET /api/accounts/?nature=false  # Solo acreedoras
```

**3. Por búsqueda (código o nombre):**
```bash
GET /api/accounts/?search=caja   # Busca en code y name
GET /api/accounts/?search=1.1    # Busca por código
```

**4. Combinación de filtros:**
```bash
GET /api/accounts/?status=true&nature=true&search=banco
# Cuentas activas, deudoras, que contengan "banco"
```

#### Acción Personalizada

**active/ - GET**

Retorna únicamente las cuentas activas, útil para selects y formularios.

```bash
GET /api/accounts/active/
```

**Response:**
```json
[
  {
    "acc_id": 1,
    "code": "1.1.1",
    "name": "Caja",
    "saldo": 50000,
    "nature": true,
    "nature_display": "Deudora",
    "status": true
  },
  {
    "acc_id": 2,
    "code": "1.1.2",
    "name": "Banco Nación",
    "saldo": 150000,
    "nature": true,
    "nature_display": "Deudora",
    "status": true
  }
]
```

#### Ejemplos de Uso

**Crear cuenta:**
```bash
curl -X POST http://localhost:8000/api/accounts/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "1.1.1",
    "name": "Caja",
    "nature": true,
    "status": true
  }'
```

**Listar cuentas activas deudoras:**
```bash
curl -X GET "http://localhost:8000/api/accounts/?status=true&nature=true" \
  -H "Authorization: Bearer {token}"
```

**Buscar cuenta por código o nombre:**
```bash
curl -X GET "http://localhost:8000/api/accounts/?search=banco" \
  -H "Authorization: Bearer {token}"
```

**Actualizar estado de cuenta:**
```bash
curl -X PATCH http://localhost:8000/api/accounts/5/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"status": false}'  # Desactivar cuenta
```

**Obtener solo cuentas activas:**
```bash
curl -X GET http://localhost:8000/api/accounts/active/ \
  -H "Authorization: Bearer {token}"
```

#### Admin Django

**AccountAdmin:**
- **Listado:** acc_id, code, name, saldo, nature, status
- **Filtros:** nature, status
- **Búsqueda:** code, name
- **Orden:** Por código

#### Validaciones

1. **Código único:** No pueden existir dos cuentas con el mismo código
2. **Saldo read-only:** El saldo no se puede modificar directamente
   - Se actualiza automáticamente mediante transacciones
3. **Naturaleza requerida:** Debe especificarse si es deudora o acreedora
4. **Estado por defecto:** Las cuentas nuevas son activas por defecto

#### Inicialización de Datos

El sistema incluye un comando para inicializar el plan de cuentas:

```bash
python manage.py init_plan_cuentas
```

Este comando carga el plan de cuentas inicial desde:
- `apps/accounts/data/plan_cuentas_inicial.py`

#### Estructura de Códigos Contables

Aunque el sistema acepta cualquier código, se recomienda seguir una estructura jerárquica:

**Ejemplo de estructura:**
```
1       - ACTIVO
1.1     - Activo Corriente
1.1.1   - Caja
1.1.2   - Bancos
1.1.3   - Cuentas a Cobrar
1.2     - Activo No Corriente
1.2.1   - Bienes de Uso
2       - PASIVO
2.1     - Pasivo Corriente
2.1.1   - Proveedores
2.1.2   - Deudas Bancarias
3       - PATRIMONIO NETO
3.1     - Capital
4       - INGRESOS
4.1     - Ventas
5       - GASTOS
5.1     - Gastos Operativos
```

#### Integración con Transacciones

Las cuentas se relacionan con el módulo de transacciones:
- Los asientos contables afectan el saldo de las cuentas
- Solo se pueden usar cuentas activas en transacciones
- El saldo se actualiza según la naturaleza:
  - **Deudora:** Debe suma, Haber resta
  - **Acreedora:** Debe resta, Haber suma

#### Response Structures

**Cuenta individual:**
```json
{
  "acc_id": 1,
  "code": "1.1.1",
  "name": "Caja",
  "saldo": 50000,
  "nature": true,
  "status": true
}
```

**Lista de cuentas:**
```json
[
  {
    "acc_id": 1,
    "code": "1.1.1",
    "name": "Caja",
    "saldo": 50000,
    "nature": true,
    "nature_display": "Deudora",
    "status": true
  },
  {
    "acc_id": 5,
    "code": "2.1.1",
    "name": "Proveedores",
    "saldo": -30000,
    "nature": false,
    "nature_display": "Acreedora",
    "status": true
  }
]
```

#### Conceptos Contables

**Naturaleza Deudora:**
- Se incrementa con anotaciones en el DEBE
- Se decrementa con anotaciones en el HABER
- Incluye: Activos y Gastos
- Ejemplo: Cuando compro mercadería, DEBE Mercaderías (aumenta)

**Naturaleza Acreedora:**
- Se incrementa con anotaciones en el HABER
- Se decrementa con anotaciones en el DEBE
- Incluye: Pasivos, Patrimonio e Ingresos
- Ejemplo: Cuando vendo, HABER Ventas (aumenta)

#### Tests

Archivos de test:
- `test_accounts_models.py` - Tests del modelo Account
- `test_accounts_serializers.py` - Tests de serializers
- `test_accounts_views.py` - Tests de endpoints y filtros

#### Notas Importantes

- El saldo es read-only en la API, solo se actualiza mediante transacciones
- Las cuentas inactivas no se pueden usar en nuevas transacciones
- El código debe ser único en todo el sistema
- La naturaleza de la cuenta no se debe cambiar una vez creada
- Se recomienda usar una estructura jerárquica de códigos
- El orden por defecto es por código para facilitar navegación del plan de cuentas

### 6.2 Chat

**Descripción:** Sistema de chat inteligente con Retrieval-Augmented Generation (RAG) para consultas sobre contabilidad. Utiliza embeddings vectoriales, búsqueda semántica y LLM para proporcionar respuestas contextualizadas.

#### Características
- Chat con IA basado en RAG (Retrieval-Augmented Generation)
- Búsqueda semántica con embeddings vectoriales
- Historial de consultas por usuario
- Reconstrucción de índice en background
- Cancelación de peticiones en curso
- Métricas de rendimiento (response_time)
- Control de estado del servicio

#### Modelos

**1. ChatQuery**

Registra todas las consultas realizadas al chat.

**Tabla:** `chat_queries`

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `query_id` | AutoField (PK) | ID único de la consulta | - |
| `user` | ForeignKey(User) | Usuario que realizó la consulta | - |
| `question` | TextField | Pregunta realizada | - |
| `answer` | TextField | Respuesta generada | - |
| `sources` | JSONField | Fuentes utilizadas (lista) | [] |
| `context_used` | Boolean | Si se utilizó contexto RAG | False |
| `created_at` | TextField | Fecha de creación (ISO) | - |
| `response_time` | FloatField | Tiempo de respuesta en segundos | null |

**Orden por defecto:** `-created_at` (más recientes primero)

**2. IndexStatus**

Estado del índice de embeddings vectoriales.

**Tabla:** `index_status`

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `status_id` | AutoField (PK) | ID del estado | - |
| `is_available` | Boolean | Si el servicio está disponible | True |
| `is_rebuilding` | Boolean | Si está en reconstrucción | False |
| `last_rebuild` | TextField | Fecha última reconstrucción (ISO) | null |
| `total_vectors` | IntegerField | Total de vectores en el índice | 0 |
| `total_documents` | IntegerField | Total de documentos indexados | 0 |
| `rebuild_by` | ForeignKey(User) | Usuario que inició reconstrucción | null |

**Método de clase:**
```python
IndexStatus.get_current_status()
# Obtiene o crea el estado actual (singleton en pk=1)
```

#### Serializers

**1. ChatQuerySerializer**

Serializer completo para historial de consultas.

```python
Campos:
├── query_id (read-only)
├── user
├── user_name (read-only, desde user.name)
├── user_email (read-only, desde user.email)
├── question
├── answer
├── sources (JSON)
├── context_used
├── created_at (read-only)
└── response_time
```

**2. ChatRequestSerializer**

Valida las peticiones de chat.

```python
Campos:
└── question (max 2000 chars, mínimo 3 chars después de strip)
```

**3. ChatResponseSerializer**

Estructura de las respuestas del chat.

```python
Campos:
├── answer
├── sources (lista de diccionarios)
├── context_used
├── response_time (opcional)
└── query_id (opcional)
```

**4. IndexStatusSerializer**

Estado del índice vectorial.

```python
Campos:
├── status_id (read-only)
├── is_available
├── is_rebuilding
├── last_rebuild
├── total_vectors (read-only)
├── total_documents (read-only)
├── rebuild_by
└── rebuild_by_name (read-only, desde rebuild_by.name)
```

**5. RebuildIndexSerializer**

Valida solicitudes de reconstrucción.

```python
Campos:
└── confirm (Boolean, debe ser True)
```

#### Permisos

**1. CanUseChat**
- Todos los usuarios autenticados pueden usar el chat
- No hay restricciones por rol

**2. CanRebuildIndex**
- Solo Admin (rol 0) puede reconstruir el índice
- Superusers siempre tienen permiso
- Operación administrativa crítica

**3. CanViewHistory**
- **Nivel permiso:** Todos los usuarios autenticados
- **Nivel objeto:**
  - Admin/Profesor (rol 0): pueden ver todas las consultas
  - Otros usuarios: solo ven su propio historial

#### ViewSets

**1. ChatViewSet**

Maneja las operaciones del chat con RAG.

```python
permission_classes = [IsAuthenticated, CanUseChat]
```

**Atributos de clase:**
- `active_requests`: Dict para trackear peticiones activas

**2. ChatHistoryViewSet**

ViewSet de solo lectura para historial.

```python
permission_classes = [IsAuthenticated, CanViewHistory]
queryset: Depende del rol del usuario
```

**Filtros del queryset:**
- Admin/Profesor: ven todas las consultas
- Otros: solo sus propias consultas

#### Endpoints

**Base URL:** `/api/chat/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| POST | `/query/` | Realizar consulta al chat | CanUseChat |
| POST | `/cancel/` | Cancelar petición activa | CanUseChat |
| GET | `/status/` | Estado del servicio | CanUseChat |
| POST | `/rebuild/` | Reconstruir índice | CanRebuildIndex (Solo Admin) |

**Historial:**

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/history/` | Listar historial | CanViewHistory |
| GET | `/history/{id}/` | Detalle de consulta | CanViewHistory |

#### Acciones Detalladas

**1. query/ - POST**

Procesa una consulta al chat utilizando RAG.

**Request:**
```json
{
  "question": "¿Qué es el debe y el haber?"
}
```

**Response exitosa (200):**
```json
{
  "answer": "El debe y el haber son...",
  "sources": [
    {
      "content": "...",
      "metadata": {...}
    }
  ],
  "context_used": true,
  "response_time": 1.23,
  "query_id": 42
}
```

**Response error - Servicio no disponible (503):**
```json
{
  "error": "El servicio de chat no está disponible...",
  "is_rebuilding": true,
  "is_available": false
}
```

**Flujo:**
1. Verifica estado del índice
2. Valida la pregunta
3. Genera ID único para la petición
4. Inicializa RAG service si es necesario
5. Procesa la query con RAG
6. Guarda en historial (ChatQuery)
7. Retorna respuesta con fuentes

**2. cancel/ - POST**

Cancela una petición en curso.

**Request:**
```json
{
  "request_id": "uuid-aqui"
}
```

**Response (200):**
```json
{
  "message": "Petición cancelada exitosamente"
}
```

**Response error (404):**
```json
{
  "error": "Petición no encontrada o ya finalizada"
}
```

**3. status/ - GET**

Obtiene el estado actual del servicio de chat.

**Response:**
```json
{
  "status_id": 1,
  "is_available": true,
  "is_rebuilding": false,
  "last_rebuild": "2025-01-15T10:30:00",
  "total_vectors": 1500,
  "total_documents": 45,
  "rebuild_by": 1,
  "rebuild_by_name": "Admin User"
}
```

**4. rebuild/ - POST**

Reconstruye el índice de embeddings en background.

**Permisos:** Solo Admin (rol 0)

**Request:**
```json
{
  "confirm": true
}
```

**Response (202 - Accepted):**
```json
{
  "message": "Reconstrucción del índice iniciada. El servicio no estará disponible hasta que finalice.",
  "is_rebuilding": true
}
```

**Response error - Ya en reconstrucción (409):**
```json
{
  "error": "Ya hay una reconstrucción en curso",
  "is_rebuilding": true
}
```

**Proceso:**
1. Valida que `confirm=true`
2. Verifica que no haya reconstrucción en curso
3. Inicia tarea en background (`start_rebuild_index`)
4. Retorna inmediatamente (202)
5. El thread actualiza el estado al finalizar

#### Tareas en Background (tasks.py)

**rebuild_index_task(user_id)**

Función que se ejecuta en thread separado para reconstruir el índice.

**Proceso:**
1. Actualiza `IndexStatus`: `is_available=False`, `is_rebuilding=True`
2. Ejecuta `rag_service.rebuild_index()`
3. Obtiene estadísticas actualizadas
4. Actualiza `IndexStatus`:
   - `is_available=True`
   - `is_rebuilding=False`
   - `last_rebuild=now`
   - `total_vectors` y `total_documents`
   - `rebuild_by_id=user_id`
5. En caso de error, restaura disponibilidad

**start_rebuild_index(user_id)**

Inicia el rebuild en un thread daemon.

```python
thread = threading.Thread(target=rebuild_index_task, args=(user_id,))
thread.daemon = True
thread.start()
```

#### Historial de Consultas

**Filtros disponibles:**

```bash
# Por usuario (solo Admin)
GET /api/chat/history/?user=5

# Por rango de fechas
GET /api/chat/history/?date_from=2025-01-01&date_to=2025-01-31
```

**Permisos de visualización:**
- **Admin/Profesor (rol 0):** Ven todas las consultas de todos los usuarios
- **Otros usuarios:** Solo ven sus propias consultas

#### Integración con RAG Service

El chat se integra con `services.chat.rag_service`:

**Métodos utilizados:**
```python
rag_service.initialize()          # Inicializa el servicio
rag_service.query(question, request_id, stream=False)  # Procesa query
rag_service.cancel_request(request_id)  # Cancela petición
rag_service.rebuild_index()       # Reconstruye índice
rag_service.get_stats()           # Obtiene estadísticas
```

#### Ejemplos de Uso

**Realizar consulta:**
```bash
curl -X POST http://localhost:8000/api/chat/query/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "¿Cómo registro una venta al contado?"
  }'
```

**Verificar estado del servicio:**
```bash
curl -X GET http://localhost:8000/api/chat/status/ \
  -H "Authorization: Bearer {token}"
```

**Reconstruir índice (solo Admin):**
```bash
curl -X POST http://localhost:8000/api/chat/rebuild/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "confirm": true
  }'
```

**Ver historial propio:**
```bash
curl -X GET http://localhost:8000/api/chat/history/ \
  -H "Authorization: Bearer {token}"
```

**Ver historial de usuario específico (solo Admin):**
```bash
curl -X GET "http://localhost:8000/api/chat/history/?user=5" \
  -H "Authorization: Bearer {token}"
```

**Cancelar petición:**
```bash
curl -X POST http://localhost:8000/api/chat/cancel/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

#### Admin Django

**ChatQueryAdmin:**
- **Listado:** query_id, user, question_preview (50 chars), context_used, created_at, response_time
- **Filtros:** context_used, created_at, user
- **Búsqueda:** question, answer, user__email
- **Read-only:** query_id, created_at, response_time

**IndexStatusAdmin:**
- **Listado:** status_id, is_available, is_rebuilding, total_vectors, total_documents, last_rebuild
- **Read-only:** total_vectors, total_documents, last_rebuild, rebuild_by

#### Validaciones

1. **Pregunta mínima:** Al menos 3 caracteres después de strip()
2. **Pregunta máxima:** Máximo 2000 caracteres
3. **Servicio disponible:** Verifica `is_available` y `!is_rebuilding`
4. **Confirmación rebuild:** Debe ser explícitamente `confirm=true`
5. **Rebuild único:** No permite reconstrucciones concurrentes

#### Manejo de Errores

**Estados del servicio:**
- `503 SERVICE_UNAVAILABLE` - Índice en reconstrucción
- `400 BAD_REQUEST` - Validación fallida
- `404 NOT_FOUND` - Petición no encontrada
- `409 CONFLICT` - Reconstrucción ya en curso
- `500 INTERNAL_SERVER_ERROR` - Error en procesamiento

**Respuesta de error genérica:**
```json
{
  "error": "Error procesando la consulta: ...",
  "answer": "Lo siento, ocurrió un error al procesar tu pregunta.",
  "sources": [],
  "context_used": false
}
```

#### Comandos de Gestión

```bash
# Inicializar chat (crear índice inicial)
python manage.py init_chat

# Reconstruir índice desde línea de comandos
python manage.py rebuild_chat_index
```

#### Métricas y Monitoreo

**Datos guardados por consulta:**
- Pregunta y respuesta completas
- Fuentes utilizadas (con metadata)
- Si se usó contexto RAG
- Tiempo de respuesta en segundos
- Usuario que realizó la consulta
- Timestamp de creación

**Estadísticas del índice:**
- Total de vectores indexados
- Total de documentos procesados
- Fecha de última reconstrucción
- Usuario que realizó última reconstrucción

#### Arquitectura RAG

**Componentes (ver Sección 7 - Servicios):**
1. **Embedder:** Genera embeddings vectoriales
2. **Vector Store:** Almacena y busca vectores (FAISS)
3. **LLM Client:** Genera respuestas con contexto
4. **RAG Service:** Orquesta todo el proceso

**Flujo de consulta:**
1. Usuario hace pregunta
2. Se genera embedding de la pregunta
3. Búsqueda de documentos similares (top-k)
4. Construcción de contexto con fuentes
5. LLM genera respuesta con contexto
6. Se retorna respuesta + fuentes

#### Tests

Archivos de test:
- `test_chat_models.py` - Tests de ChatQuery e IndexStatus
- `test_chat_serializers.py` - Tests de serializers
- `test_chat_views.py` - Tests de endpoints y flujos
- `test_chat_permissions.py` - Tests de permisos

#### Notas Importantes

- El servicio usa threading para operaciones pesadas
- Los threads de reconstrucción son daemon (no bloquean shutdown)
- El índice es singleton (pk=1 en IndexStatus)
- Las peticiones activas se trackean para permitir cancelación
- El servicio se inicializa lazy (primera consulta)
- Las respuestas incluyen metadata de las fuentes para trazabilidad

### 6.3 Config

**Descripción:** Gestión de la configuración global del sistema, incluyendo modo de operación (educativo/empresarial), formato de fechas y moneda.

#### Características
- Configuración singleton (solo un registro)
- Dos modos de operación: Educativo y Empresarial
- Middleware para inyectar configuración en cada request
- Mapeo dinámico de roles según modo del sistema

#### Modelo: Config

**Tabla:** `config`

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `config_id` | AutoField (PK) | ID único de configuración | - |
| `system_mode` | Boolean | Modo del sistema (False: educativo, True: empresarial) | False |
| `date_format` | TextField | Formato de fechas | 'DD/MM/YYYY' |
| `currency` | TextField | Moneda del sistema | 'ARS' |

**Métodos especiales:**
- `save()`: Valida que solo exista un registro de configuración
- `__str__()`: Retorna descripción del modo activo

#### Serializer

```python
ConfigSerializer
├── config_id
├── system_mode
├── date_format
└── currency
```

#### Middleware: SystemModeMiddleware

Inyecta el modo del sistema en cada request como `request.system_mode`.

**Uso:**
```python
# En cualquier vista
if request.system_mode:
    # Modo empresarial
else:
    # Modo educativo
```

**Configuración en settings.py:**
```python
MIDDLEWARE = [
    ...
    'apps.config.middleware.SystemModeMiddleware',
    ...
]
```

#### Endpoints

**Base URL:** `/api/config/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar configuraciones | IsAuthenticated |
| POST | `/` | Crear configuración | IsAuthenticated |
| GET | `/{id}/` | Detalle de configuración | IsAuthenticated |
| PUT | `/{id}/` | Actualizar configuración | IsAuthenticated |
| PATCH | `/{id}/` | Actualizar parcial | IsAuthenticated |
| DELETE | `/{id}/` | Eliminar configuración | IsAuthenticated |
| GET | `/current/` | Obtener configuración actual | IsAuthenticated |
| GET | `/role_names/` | Obtener nombres de roles según modo | IsAuthenticated |

#### Acciones Personalizadas

**`current/`** - GET
- Retorna la configuración actual del sistema
- Si no existe, crea una configuración por defecto
- Respuesta: Objeto Config serializado

```json
{
  "config_id": 1,
  "system_mode": false,
  "date_format": "DD/MM/YYYY",
  "currency": "ARS"
}
```

**`role_names/`** - GET
- Retorna el mapeo de roles según el modo del sistema
- **Modo Educativo** (system_mode=False):
  ```json
  {
    "0": "Profesor",
    "2": "Alumno"
  }
  ```
- **Modo Empresarial** (system_mode=True):
  ```json
  {
    "0": "Admin",
    "1": "Manager",
    "2": "Accountant",
    "3": "Operator",
    "4": "Viewer"
  }
  ```

#### Ejemplos de Uso

**Obtener configuración actual:**
```bash
curl -X GET http://localhost:8000/api/config/current/ \
  -H "Authorization: Bearer {token}"
```

**Cambiar modo del sistema:**
```bash
curl -X PATCH http://localhost:8000/api/config/1/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"system_mode": true}'
```

**Obtener nombres de roles:**
```bash
curl -X GET http://localhost:8000/api/config/role_names/ \
  -H "Authorization: Bearer {token}"
```

#### Admin Django

Panel de administración configurado con:
- Listado: config_id, system_mode, date_format, currency
- Búsqueda y filtros disponibles

#### Validaciones

- **Singleton:** Solo puede existir un registro de configuración
- Intentar crear un segundo registro lanza `ValueError`

#### Tests

Archivos de test:
- `test_config_models.py` - Tests del modelo Config
- `test_config_serializers.py` - Tests del serializer
- `test_config_views.py` - Tests de endpoints
- `test_config_middleware.py` - Tests del middleware

### 6.4 Dash

**Descripción:** Dashboard con estadísticas y métricas del sistema educativo/empresarial. Proporciona información agregada sobre usuarios, transacciones, balance general y actividad por grupos.

#### Características
- Estadísticas en tiempo real
- Evolución histórica (últimos 6 meses)
- Actividad por grupo/clase
- Verificación de balance general
- Alertas de desbalances contables
- Sin modelos de BD (datos calculados on-the-fly)

#### Modelos

Esta aplicación no tiene modelos propios. Calcula estadísticas en tiempo real usando los modelos de otras aplicaciones:
- `User` (de apps.users)
- `Transaction` y `TransactionEntry` (de apps.trans)
- `Account` (de apps.accounts)

#### Serializers

**1. EvolucionHistoricaSerializer**

Datos mensuales de evolución.

```python
Campos:
├── mes (String, ej: "Ene", "Feb")
├── asientos (Integer, cantidad de asientos)
└── cobertura (Integer, usuarios activos)
```

**2. ActividadGrupoSerializer**

Actividad por grupo/clase.

```python
Campos:
├── grupo (String, nombre del grupo)
├── asientos (Integer, cantidad de asientos)
└── cobertura (Integer, usuarios con al menos 1 transacción)
```

**3. DashboardDataSerializer**

Datos completos del dashboard.

```python
Campos:
├── total_alumnos (Integer)
├── cantidad_grupos (Integer)
├── asientos_cargados (Integer)
├── libros_diarios (Integer)
├── evolucion_historica (Array de EvolucionHistoricaSerializer)
├── actividad_por_grupo (Array de ActividadGrupoSerializer)
└── alerta (String, opcional, alertas de balance)
```

#### Vista: DashboardStatsView

APIView para obtener estadísticas agregadas.

```python
permission_classes = [IsAuthenticated]
```

**Endpoint único:**
```
GET /api/dashboard/stats/
```

#### Métricas Calculadas

**1. Total de Alumnos**
- Cuenta usuarios con `rol=2` (Alumno) y `status=0` (Activo)
- En modo empresarial, podría adaptarse a roles específicos

**2. Cantidad de Grupos**
- Cuenta grupos únicos de usuarios activos con `rol=2`
- Representa clases o divisiones

**3. Asientos Cargados**
- Cuenta transacciones con status `CHECKED` (1) o `CLOSED` (2)
- Excluye transacciones en estado "Para verificar"

**4. Libros Diarios**
- Cuenta transacciones con status `CLOSED` (2)
- Representa transacciones finalizadas e inmutables

**5. Evolución Histórica**
- Datos de los últimos 6 meses (aproximadamente 30 días por mes)
- Por cada mes:
  - **Mes:** Nombre abreviado en español
  - **Asientos:** Transacciones verificadas/cerradas del mes
  - **Cobertura:** Usuarios únicos que crearon transacciones

**6. Actividad por Grupo**
- Por cada grupo activo:
  - **Grupo:** Nombre del grupo
  - **Asientos:** Cantidad de transacciones del grupo
  - **Cobertura:** Usuarios del grupo con al menos 1 transacción
- Ordenado por cantidad de asientos (descendente)

**7. Alerta de Balance**
- Verifica el principio contable: **Activo = Pasivo + Patrimonio**
- Calcula:
  - **Saldo Deudor:** Suma de saldos de cuentas deudoras (Activo)
  - **Saldo Acreedor:** Suma de saldos de cuentas acreedoras (Pasivo + Patrimonio)
- Si hay diferencia > $0.01, genera alerta
- Retorna `null` si está balanceado

#### Endpoint Detallado

**GET /api/dashboard/stats/**

Obtiene todas las estadísticas del dashboard en una sola llamada.

**Permisos:** IsAuthenticated (todos los usuarios autenticados)

**Response (200):**
```json
{
  "total-alumnos": 45,
  "cantidad-grupos": 3,
  "asientos-cargados": 128,
  "libros-diarios": 42,
  "evolucionHistorica": [
    {
      "mes": "Ago",
      "asientos": 15,
      "cobertura": 12
    },
    {
      "mes": "Sep",
      "asientos": 23,
      "cobertura": 18
    },
    {
      "mes": "Oct",
      "asientos": 31,
      "cobertura": 25
    },
    {
      "mes": "Nov",
      "asientos": 28,
      "cobertura": 22
    },
    {
      "mes": "Dic",
      "asientos": 19,
      "cobertura": 15
    },
    {
      "mes": "Ene",
      "asientos": 12,
      "cobertura": 10
    }
  ],
  "actividadPorGrupo": [
    {
      "grupo": "A1",
      "asientos": 56,
      "cobertura": 18
    },
    {
      "grupo": "B2",
      "asientos": 42,
      "cobertura": 15
    },
    {
      "grupo": "C3",
      "asientos": 30,
      "cobertura": 12
    }
  ],
  "alerta": "Hay una diferencia de $150.50 a favor del Saldo Deudor"
}
```

**Si está balanceado (sin alerta):**
```json
{
  "total-alumnos": 45,
  "cantidad-grupos": 3,
  "asientos-cargados": 128,
  "libros-diarios": 42,
  "evolucionHistorica": [...],
  "actividadPorGrupo": [...]
}
```

#### Métodos Privados de Cálculo

**_calcular_evolucion_historica()**

Calcula datos de los últimos 6 meses.

**Proceso:**
1. Obtiene fecha de hace 6 meses
2. Itera por cada mes (aproximadamente 30 días)
3. Para cada mes:
   - Cuenta transacciones verificadas/cerradas
   - Cuenta usuarios únicos que crearon transacciones
4. Retorna array con datos mensuales

**Nombres de meses:**
```python
meses_es = {
    1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 
    5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 
    9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"
}
```

**_calcular_actividad_por_grupo()**

Calcula actividad por cada grupo de estudiantes.

**Proceso:**
1. Obtiene lista de grupos únicos (usuarios con rol=2, activos)
2. Para cada grupo:
   - Cuenta transacciones verificadas/cerradas de usuarios del grupo
   - Cuenta usuarios del grupo con al menos 1 transacción
3. Ordena por cantidad de asientos (descendente)
4. Retorna array de actividad

**_verificar_balance_general()**

Verifica que el sistema esté contablemente balanceado.

**Fórmula contable:**
```
Activo = Pasivo + Patrimonio

O equivalentemente:
Saldo Deudor = Saldo Acreedor
```

**Proceso:**
1. Suma saldos de cuentas deudoras (nature=True) → Activo
2. Suma saldos de cuentas acreedoras (nature=False) → Pasivo + Patrimonio
3. Calcula diferencia (con tolerancia de $0.01)
4. Si hay diferencia, genera alerta descriptiva
5. Si está balanceado, retorna `None`

**Formato de alerta:**
- Diferencia positiva: "Hay una diferencia de $X.XX a favor del Saldo Deudor"
- Diferencia negativa: "Hay una diferencia de $X.XX a favor del Saldo Acreedor"

#### Ejemplos de Uso

**Obtener estadísticas del dashboard:**
```bash
curl -X GET http://localhost:8000/api/dashboard/stats/ \
  -H "Authorization: Bearer {token}"
```

**Uso desde frontend (ejemplo React):**
```javascript
import DashboardService from './services/DashboardService';

// Obtener estadísticas
const stats = await DashboardService.getStats();

console.log(`Total alumnos: ${stats['total-alumnos']}`);
console.log(`Asientos cargados: ${stats['asientos-cargados']}`);

// Mostrar evolución histórica
stats.evolucionHistorica.forEach(mes => {
  console.log(`${mes.mes}: ${mes.asientos} asientos, ${mes.cobertura} usuarios`);
});

// Mostrar alerta si existe
if (stats.alerta) {
  console.warn(`⚠️ ${stats.alerta}`);
}
```

#### Casos de Uso

**1. Dashboard de Profesor (Modo Educativo)**
- Ver total de alumnos activos
- Monitorear cantidad de grupos/clases
- Revisar progreso de asientos cargados
- Identificar grupos más/menos activos
- Detectar problemas de balance

**2. Dashboard de Manager (Modo Empresarial)**
- Ver usuarios activos del sistema
- Monitorear departamentos/áreas
- Analizar evolución de registros contables
- Identificar áreas con mayor actividad
- Asegurar integridad contable

**3. Análisis de Tendencias**
- Evolución histórica para ver patrones
- Comparar actividad entre períodos
- Identificar meses con baja actividad
- Evaluar cobertura de usuarios

**4. Control de Calidad**
- Alerta de balance para detectar errores
- Verificar consistencia contable
- Identificar transacciones problemáticas

#### Interpretación de Métricas

**Cobertura:**
- **Alta cobertura (≈ 100%):** Todos los usuarios están activos
- **Baja cobertura (< 50%):** Muchos usuarios sin actividad
- Útil para identificar usuarios que necesitan seguimiento

**Evolución de Asientos:**
- **Tendencia creciente:** Sistema en uso activo
- **Tendencia decreciente:** Posible baja de actividad
- **Picos irregulares:** Pueden indicar fechas de entrega o eventos

**Actividad por Grupo:**
- **Grupos con 0 asientos:** Requieren atención
- **Distribución desigual:** Puede indicar diferencias en dificultad o motivación
- **Cobertura vs asientos:** Indica si la actividad está concentrada o distribuida

**Alerta de Balance:**
- **Sin alerta:** Sistema contablemente correcto
- **Con alerta pequeña (< $10):** Posible error de redondeo
- **Con alerta grande (> $100):** Requiere revisión urgente

#### Optimizaciones

**Queries optimizadas:**
- Uso de `aggregate()` para sumas
- `values().distinct()` para contar únicos
- Filtros en queries para evitar datos innecesarios
- Sin joins innecesarios

**Caching (futuro):**
```python
# Ejemplo de implementación con cache
from django.core.cache import cache

def get(self, request):
    cache_key = 'dashboard_stats'
    stats = cache.get(cache_key)
    
    if stats is None:
        stats = self._calcular_estadisticas()
        cache.set(cache_key, stats, timeout=300)  # 5 minutos
    
    return Response(stats)
```

#### Comandos de Gestión

El sistema incluye comandos para gestionar datos del dashboard:

```bash
# Inicializar datos del dashboard
python manage.py init_dashboard_data

# Verificar estadísticas
python manage.py check_dashboard_stats

# Limpiar datos del dashboard (si hubiera cache)
python manage.py clear_dahsboard_data  # Nota: typo en nombre original
```

#### Consideraciones de Rendimiento

**Para sistemas con muchos datos:**

1. **Implementar cache:** Redis o Memcached
2. **Precalcular datos:** Tarea periódica (Celery)
3. **Paginar resultados:** Si hay muchos grupos
4. **Índices de BD:** En campos de fecha y estado
5. **Vistas materializadas:** Para evolución histórica

**Ejemplo de índices recomendados:**
```sql
CREATE INDEX idx_transaction_status ON transactions(status);
CREATE INDEX idx_transaction_date ON transactions(date);
CREATE INDEX idx_user_rol_status ON users(rol, status);
```

#### Extensiones Futuras

**Posibles mejoras:**

1. **Filtros por fecha:**
   - `?date_from=2025-01-01&date_to=2025-01-31`
   - Evolución histórica personalizable

2. **Exportación de reportes:**
   - PDF con gráficos
   - Excel con datos crudos

3. **Comparaciones:**
   - Comparar períodos (mes actual vs anterior)
   - Benchmarks entre grupos

4. **Métricas adicionales:**
   - Promedio de asientos por usuario
   - Tiempo promedio entre transacciones
   - Distribución por tipo de cuenta

5. **Alertas configurables:**
   - Umbral de balance personalizable
   - Notificaciones automáticas

#### Tests

Archivos de test:
- `test_dash_views.py` - Tests de cálculo de estadísticas y endpoint

**Aspectos a testear:**
- Cálculo correcto de totales
- Evolución histórica con datos de varios meses
- Actividad por grupo con múltiples grupos
- Detección de desbalances
- Tolerancia en verificación de balance
- Rendimiento con grandes volúmenes de datos

#### Notas Importantes

- No tiene modelos de BD, todo es calculado en tiempo real
- Las consultas están optimizadas con agregaciones
- La evolución histórica usa períodos aproximados de 30 días
- La tolerancia de balance es $0.01 para evitar errores de redondeo
- Los datos se calculan on-the-fly, sin cache por defecto
- Adaptable a modo educativo y empresarial
- Útil para profesores, administradores y managers

### 6.5 Trans

**Descripción:** Gestión de transacciones contables (asientos contables) con el principio de partida doble. Cada transacción contiene múltiples entradas que deben estar balanceadas (total débito = total crédito).

#### Características
- Sistema de partida doble
- Validación automática de balance
- Estados de transacción (por verificar, verificado, cerrado)
- Protección de transacciones cerradas
- Historial de cambios con timestamps
- Relación con usuarios y cuentas
- Búsqueda y filtros avanzados

#### Modelos

**1. Transaction**

Representa una transacción contable completa.

**Tabla:** `transactions`

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `trans_id` | AutoField (PK) | ID único de la transacción | - |
| `user` | ForeignKey(User) | Usuario que creó la transacción | - |
| `status` | IntegerField | Estado de la transacción | 0 |
| `date` | TextField | Fecha de la transacción (ISO) | - |
| `legend` | TextField | Descripción/leyenda | null |
| `created_at` | TextField | Fecha de creación (ISO) | - |
| `updated_at` | TextField | Fecha de actualización (ISO) | - |

**Estados de Transacción:**

| Valor | Constante | Nombre | Descripción |
|-------|-----------|--------|-------------|
| 0 | STATUS_TO_CHECK | Para verificar | Estado inicial, puede editarse |
| 1 | STATUS_CHECKED | Verificado | Revisada, puede editarse |
| 2 | STATUS_CLOSED | Cerrado | En libro diario, NO puede editarse |

**Orden por defecto:** `-date, -created_at` (más recientes primero)

**2. TransactionEntry**

Representa cada línea de la transacción (debe o haber).

**Tabla:** `transaction_entries`

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `entr_id` | AutoField (PK) | ID único de la entrada | - |
| `trans` | ForeignKey(Transaction) | Transacción a la que pertenece | - |
| `acc` | ForeignKey(Account) | Cuenta contable (PROTECT) | - |
| `debit` | IntegerField | Monto en el DEBE | 0 |
| `credit` | IntegerField | Monto en el HABER | 0 |

**Validaciones del modelo:**
- No puede tener débito y crédito al mismo tiempo
- Debe tener al menos uno (débito o crédito)
- Usa `on_delete=PROTECT` para cuentas (no se pueden eliminar cuentas en uso)

#### Principio de Partida Doble

**Regla fundamental:**
```
TOTAL DÉBITO = TOTAL CRÉDITO
```

**Ejemplo de transacción balanceada:**
```
Compra de mercadería al contado $10,000

DEBE:
  Mercaderías ............... $10,000

HABER:
  Caja ...................... $10,000
```

#### Serializers

**1. TransactionEntrySerializer**

Serializer para entradas individuales.

```python
Campos:
├── entr_id (read-only)
├── acc_id (write-only)
├── account (read-only, AccountListSerializer completo)
├── debit
└── credit
```

**Validaciones:**
- No puede tener débito y crédito simultáneamente
- Debe tener al menos uno (débito o crédito)
- Los montos no pueden ser negativos

**2. TransactionSerializer**

Serializer completo para CRUD de transacciones.

```python
Campos:
├── trans_id (read-only)
├── user (read-only)
├── user_name (read-only, desde user.name)
├── status
├── status_display (read-only, "Para verificar", etc.)
├── date
├── legend
├── created_at (read-only)
├── updated_at (read-only)
├── entries (nested, TransactionEntrySerializer)
├── total_debit (calculado)
├── total_credit (calculado)
└── is_balanced (calculado, booleano)
```

**Campos calculados:**
- `total_debit`: Suma de todos los débitos
- `total_credit`: Suma de todos los créditos
- `is_balanced`: True si total_debit == total_credit
- `status_display`: Texto legible del estado

**Validaciones:**
- Mínimo 2 entradas por transacción
- Status válido (0, 1 o 2)
- Transacción balanceada (débito = crédito)
- No editar transacciones cerradas

**3. TransactionListSerializer**

Versión para listados con información resumida pero incluyendo entries completos.

```python
Campos:
├── trans_id
├── user_name
├── status
├── status_display
├── date
├── legend
├── created_at
├── entries_count (calculado)
├── total_amount (calculado, suma de débitos)
└── entries (nested completo con accounts)
```

#### Permisos: CanManageTransactions

Sistema de permisos granular según rol y acción.

**Permisos por método:**

| Acción | Roles Permitidos | Restricción Adicional |
|--------|------------------|----------------------|
| GET | Todos | - |
| POST (crear) | Todos excepto Viewer (rol 4) | - |
| PUT/PATCH (editar) | Admin (0) y Accountant (2) | Solo si NO está cerrada |
| DELETE | Solo Admin (0) | Solo si NO está cerrada |

**Protección de transacciones cerradas:**
- No se pueden editar (PUT/PATCH)
- No se pueden eliminar (DELETE)
- Esto garantiza integridad de libros diarios

#### ViewSet: TransactionViewSet

```python
queryset = Transaction.objects.all()
serializer_class = TransactionSerializer
permission_classes = [IsAuthenticated, CanManageTransactions]
```

**Optimización de queries:**
```python
.select_related('user')
.prefetch_related('entries__acc')
```

#### Endpoints

**Base URL:** `/api/trans/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar transacciones | Todos |
| POST | `/` | Crear transacción | Todos excepto Viewer |
| GET | `/{id}/` | Detalle de transacción | Todos |
| PUT | `/{id}/` | Actualizar transacción | Admin, Accountant (no cerradas) |
| PATCH | `/{id}/` | Actualizar parcial | Admin, Accountant (no cerradas) |
| DELETE | `/{id}/` | Eliminar transacción | Solo Admin (no cerradas) |
| GET | `/recent/` | Transacciones recientes | Todos |
| POST | `/{id}/toggle_status/` | Cambiar estado (0↔1) | Admin, Accountant |
| POST | `/{id}/close/` | Cerrar transacción (→2) | Admin, Accountant |

#### Filtros Disponibles

**Query Parameters:**

**1. Por estado:**
```bash
GET /api/trans/?status=0   # Para verificar
GET /api/trans/?status=1   # Verificadas
GET /api/trans/?status=2   # Cerradas
```

**2. Por usuario:**
```bash
GET /api/trans/?user=5
```

**3. Por rango de fechas:**
```bash
GET /api/trans/?date_from=2025-01-01&date_to=2025-01-31
```

**4. Por búsqueda (leyenda o ID):**
```bash
GET /api/trans/?search=compra
GET /api/trans/?search=45  # Por trans_id
```

**5. Combinación:**
```bash
GET /api/trans/?status=1&date_from=2025-01-01&search=venta
```

#### Acciones Detalladas

**1. Crear Transacción - POST /**

**Request:**
```json
{
  "date": "2025-01-15",
  "legend": "Compra de mercadería al contado",
  "status": 0,
  "entries": [
    {
      "acc_id": 10,
      "debit": 10000,
      "credit": 0
    },
    {
      "acc_id": 1,
      "debit": 0,
      "credit": 10000
    }
  ]
}
```

**Validaciones automáticas:**
- Mínimo 2 entradas
- Débito = Crédito
- Usuario asignado automáticamente
- Timestamps automáticos

**Response (201):**
```json
{
  "trans_id": 42,
  "user": 5,
  "user_name": "Juan Pérez",
  "status": 0,
  "status_display": "Para verificar",
  "date": "2025-01-15",
  "legend": "Compra de mercadería al contado",
  "created_at": "2025-01-15T10:30:00",
  "updated_at": "2025-01-15T10:30:00",
  "entries": [
    {
      "entr_id": 100,
      "acc_id": 10,
      "account": {
        "acc_id": 10,
        "code": "1.3.1",
        "name": "Mercaderías",
        "saldo": 10000,
        "nature": true,
        "nature_display": "Deudora",
        "status": true
      },
      "debit": 10000,
      "credit": 0
    },
    {
      "entr_id": 101,
      "acc_id": 1,
      "account": {
        "acc_id": 1,
        "code": "1.1.1",
        "name": "Caja",
        "saldo": -10000,
        "nature": true,
        "nature_display": "Deudora",
        "status": true
      },
      "debit": 0,
      "credit": 10000
    }
  ],
  "total_debit": 10000,
  "total_credit": 10000,
  "is_balanced": true
}
```

**2. recent/ - GET**

Obtiene las transacciones más recientes.

**Query Parameters:**
- `limit` (default: 10): Cantidad de transacciones a retornar

```bash
GET /api/trans/recent/?limit=20
```

**Response:**
Array de transacciones con serializer completo (incluyendo entries y accounts).

**3. toggle_status/ - POST /{id}/toggle_status/**

Alterna el estado entre 0 (Para verificar) y 1 (Verificado).

**Request:**
```bash
POST /api/trans/42/toggle_status/
```

**Comportamiento:**
- Si status=0 → cambia a 1
- Si status=1 → cambia a 0
- Si status=2 → retorna error (cerradas no se pueden modificar)

**Response (200):**
```json
{
  "trans_id": 42,
  "status": 1,
  "status_display": "Verificado",
  ...
}
```

**Response error (400):**
```json
{
  "error": "No se puede cambiar el estado de una transacción cerrada",
  "message": "Esta transacción está en un libro diario y no puede ser modificada"
}
```

**4. close/ - POST /{id}/close/**

Cierra una transacción (status=2). Acción irreversible.

**Request:**
```bash
POST /api/trans/42/close/
```

**Uso:**
- Se ejecuta cuando la transacción se agrega a un libro diario
- Una vez cerrada, no se puede editar ni eliminar

**Response (200):**
```json
{
  "trans_id": 42,
  "status": 2,
  "status_display": "Cerrado",
  ...
}
```

**Response error (400):**
```json
{
  "error": "La transacción ya está cerrada"
}
```

#### Ejemplos de Uso

**Crear transacción de venta:**
```bash
curl -X POST http://localhost:8000/api/trans/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-01-15",
    "legend": "Venta de mercadería - Factura 001",
    "entries": [
      {
        "acc_id": 1,
        "debit": 15000,
        "credit": 0
      },
      {
        "acc_id": 20,
        "debit": 0,
        "credit": 15000
      }
    ]
  }'
```

**Crear transacción compleja (3+ entradas):**
```bash
curl -X POST http://localhost:8000/api/trans/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-01-15",
    "legend": "Pago parcial a proveedor",
    "entries": [
      {
        "acc_id": 15,
        "debit": 5000,
        "credit": 0
      },
      {
        "acc_id": 1,
        "debit": 0,
        "credit": 3000
      },
      {
        "acc_id": 2,
        "debit": 0,
        "credit": 2000
      }
    ]
  }'
```

**Listar transacciones verificadas del último mes:**
```bash
curl -X GET "http://localhost:8000/api/trans/?status=1&date_from=2025-01-01" \
  -H "Authorization: Bearer {token}"
```

**Verificar transacción:**
```bash
curl -X POST http://localhost:8000/api/trans/42/toggle_status/ \
  -H "Authorization: Bearer {token}"
```

**Cerrar transacción:**
```bash
curl -X POST http://localhost:8000/api/trans/42/close/ \
  -H "Authorization: Bearer {token}"
```

#### Admin Django

**TransactionAdmin:**
- **Listado:** trans_id, user, date, status, legend, created_at
- **Filtros:** status, date, user
- **Búsqueda:** legend, trans_id
- **Inlines:** TransactionEntryInline (2 extras)
- **Read-only:** created_at, updated_at

**TransactionEntryAdmin:**
- **Listado:** entr_id, trans, acc, debit, credit
- **Filtros:** trans

#### Validaciones

**A nivel de entrada (TransactionEntry):**
1. No puede tener débito y crédito simultáneos
2. Debe tener al menos uno (débito o crédito)
3. Los montos no pueden ser negativos

**A nivel de transacción (Transaction):**
1. Mínimo 2 entradas
2. Débito total = Crédito total
3. Status válido (0, 1 o 2)
4. No editar/eliminar si status=2 (cerrada)

**A nivel de permisos:**
1. Viewer (rol 4) no puede crear transacciones
2. Solo Admin y Accountant pueden editar
3. Solo Admin puede eliminar
4. Transacciones cerradas están protegidas

#### Flujos de Estado

**Ciclo normal de una transacción:**

```
1. Creación
   └─> Status 0 (Para verificar)

2. Revisión
   └─> toggle_status() → Status 1 (Verificado)

3. Corrección (si es necesario)
   └─> toggle_status() → Status 0 (Para verificar)
   └─> Editar transacción
   └─> toggle_status() → Status 1 (Verificado)

4. Cierre (al agregar a libro diario)
   └─> close() → Status 2 (Cerrado)
   └─> ¡IRREVERSIBLE! No se puede editar ni eliminar
```

#### Protección de Integridad

**Transacciones cerradas:**
- `perform_update()`: Bloquea edición
- `perform_destroy()`: Bloquea eliminación
- `toggle_status()`: Retorna error
- Permisos de objeto: Deniegan modificación

**Cuentas protegidas:**
- `on_delete=PROTECT` en `TransactionEntry.acc`
- No se pueden eliminar cuentas que tienen transacciones

#### Integración con Accounts

Las transacciones actualizan los saldos de las cuentas:

**Ejemplo:**
```
Cuenta: Caja (Deudora, nature=True)
Saldo inicial: $50,000

Transacción 1: DEBE Caja $10,000
└─> Saldo: $50,000 + $10,000 = $60,000

Transacción 2: HABER Caja $5,000
└─> Saldo: $60,000 - $5,000 = $55,000
```

#### Response Structures

**Transacción completa:**
```json
{
  "trans_id": 42,
  "user": 5,
  "user_name": "Juan Pérez",
  "status": 1,
  "status_display": "Verificado",
  "date": "2025-01-15",
  "legend": "Compra de mercadería",
  "created_at": "2025-01-15T10:30:00",
  "updated_at": "2025-01-15T11:00:00",
  "entries": [
    {
      "entr_id": 100,
      "acc_id": 10,
      "account": {
        "acc_id": 10,
        "code": "1.3.1",
        "name": "Mercaderías",
        "saldo": 10000,
        "nature": true,
        "nature_display": "Deudora",
        "status": true
      },
      "debit": 10000,
      "credit": 0
    },
    {
      "entr_id": 101,
      "acc_id": 1,
      "account": {
        "acc_id": 1,
        "code": "1.1.1",
        "name": "Caja",
        "saldo": -10000,
        "nature": true,
        "nature_display": "Deudora",
        "status": true
      },
      "debit": 0,
      "credit": 10000
    }
  ],
  "total_debit": 10000,
  "total_credit": 10000,
  "is_balanced": true
}
```

#### Tests

Archivos de test:
- `test_trans_models.py` - Tests de Transaction y TransactionEntry
- `test_trans_serializers.py` - Tests de validaciones y balance
- `test_trans_views.py` - Tests de endpoints y flujos de estado
- `test_trans_permissions.py` - Tests de permisos por rol

#### Notas Importantes

- Todas las transacciones deben estar balanceadas (débito = crédito)
- El usuario se asigna automáticamente al crear
- Los timestamps se gestionan automáticamente
- Las transacciones cerradas son inmutables
- Se recomienda verificar antes de cerrar
- Las cuentas usadas no se pueden eliminar (PROTECT)
- El sistema usa optimización con select_related y prefetch_related

### 6.6 Users

**Descripción:** Gestión completa de usuarios con modelo de autenticación personalizado, sistema de roles jerárquico adaptable al modo del sistema (educativo/empresarial) y autenticación JWT.

#### Características
- Modelo de usuario personalizado basado en email
- Sistema de roles adaptable según modo del sistema
- Autenticación JWT con tokens refresh
- Permisos granulares por rol y acción
- Validaciones contextuales según configuración
- Gestión de estado de usuarios (activo/inactivo)

#### Modelo: User

**Tabla:** `users`

Extiende `AbstractBaseUser` y `PermissionsMixin`.

| Campo | Tipo | Descripción | Default |
|-------|------|-------------|---------|
| `user_id` | AutoField (PK) | ID único del usuario | - |
| `name` | TextField | Nombre completo | - |
| `email` | TextField (unique) | Email (usado como username) | - |
| `password` | TextField | Hash de contraseña | - |
| `created_at` | TextField | Fecha de creación (ISO) | - |
| `updated_at` | TextField | Fecha de actualización (ISO) | - |
| `status` | IntegerField | Estado (0: activo, 1: inactivo) | 1 |
| `group` | TextField | Grupo/Clase asignada | - |
| `rol` | IntegerField | Rol del usuario | - |
| `is_staff` | BooleanField | Acceso admin Django | False |
| `is_active` | BooleanField | Usuario activo | True |

**Manager personalizado:** `UserManager`
- `create_user(email, name, password, **extra_fields)` - Crea usuario estándar
- `create_superuser(email, name, password, **extra_fields)` - Crea superusuario

**Métodos especiales:**
- `save()`: Sincroniza `status` con `is_active` (status 0 = activo)
- `id` (property): Alias de `user_id` para compatibilidad con JWT
- `__str__()`: Retorna el email del usuario

**Configuración de autenticación:**
- `USERNAME_FIELD = 'email'`
- `REQUIRED_FIELDS = ['name']`

#### Sistema de Roles

Los roles disponibles cambian según el modo del sistema:

**Modo Educativo** (`system_mode=False`):
| Rol | Nombre | Permisos |
|-----|--------|----------|
| 0 | Profesor | Gestión completa |
| 2 | Alumno | Acceso limitado |

**Modo Empresarial** (`system_mode=True`):
| Rol | Nombre | Permisos |
|-----|--------|----------|
| 0 | Admin | Acceso total |
| 1 | Manager | Gestión operativa |
| 2 | Accountant | Gestión contable |
| 3 | Operator | Operaciones básicas |
| 4 | Viewer | Solo lectura |

#### Grupos de Roles Predefinidos

Para facilitar permisos, se definen grupos en `permissions.py`:

```python
ROLE_GROUPS = {
    'A': [0, 1, 2, 3, 4],   # All - Todos los roles
    'N': [0, 1, 2, 3],      # Not Viewer - Todos menos Viewer
    'X': [0, 1, 2],         # eXecutive - Admin, Manager, Accountant
    'Y': [0, 2],            # Year-end - Admin, Accountant
    'Z': [0, 1],            # Zone managers - Admin, Manager
    'S': [0],               # Super - Solo Admin
}
```

#### Clases de Permisos

**1. HasRolePermission**

Verifica si el usuario tiene uno de los roles permitidos.

```python
# Uso en ViewSet
class MyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_roles = 'S'  # Solo Admin
    # o
    required_roles = [0, 1, 2]  # Admin, Manager, Accountant
    # o
    required_roles = 0  # Solo Admin
```

**2. HasRoleForAction**

Define roles diferentes según la acción HTTP.

```python
# Uso en ViewSet
class MyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasRoleForAction]
    action_roles = {
        'list': 'A',        # Todos pueden listar
        'retrieve': 'X',    # Admin, Manager, Accountant
        'create': 'Z',      # Admin y Manager
        'update': 'S',      # Solo Admin
        'destroy': 'S',     # Solo Admin
    }
```

**3. CanManageUsers**

Permiso específico para gestión de usuarios con validación de modo educativo.

- Solo Admin (rol 0) y Accountant (rol 2) pueden gestionar usuarios
- En modo educativo, solo permite crear usuarios con rol 0 o 2

**4. IsOwnerOrAdmin**

Permite acceso al propietario del objeto o a admins.

```python
# Verifica:
# - Si es superuser → True
# - Si rol es 0 (Admin) → True
# - Si obj.user == request.user → True
```

#### Funciones de Utilidad (utils.py)

**`get_available_roles_for_creation()`**
- Retorna roles disponibles según modo del sistema
- Útil para validaciones en serializers

**`validate_role_for_system(rol)`**
- Valida si un rol es válido para el modo actual

**`get_role_display_name(rol, system_mode=None)`**
- Retorna el nombre legible del rol según el modo

#### Serializers

**1. CustomTokenObtainPairSerializer**

Extiende el serializer JWT para validar el estado del usuario antes de autenticar.

```python
# Valida que status == 0 (activo)
# Retorna error si usuario inactivo
```

**2. UserSerializer**

Serializer completo para CRUD de usuarios.

```python
Campos:
├── user_id (read-only)
├── name
├── email
├── password (write-only)
├── created_at (read-only)
├── updated_at (read-only)
├── status
├── group
├── rol
└── role_name (read-only, calculado)
```

**Validaciones:**
- `validate_rol()`: Verifica que el rol sea válido para el modo actual
- Password con validadores de Django

**Métodos:**
- `create()`: Hashea password y establece timestamps
- `update()`: Actualiza timestamp y hashea nueva password si se proporciona

**3. UserListSerializer**

Versión ligera para listados.

```python
Campos:
├── user_id
├── name
├── email
├── status
├── group
├── rol
├── role_name (calculado)
└── created_at
```

#### ViewSets y Vistas

**UserViewSet**

CRUD completo de usuarios con permisos por acción.

```python
permission_classes = [IsAuthenticated, HasRoleForAction]

action_roles = {
    'list': 'Z',              # Admin y Manager
    'retrieve': 'X',          # Admin, Manager, Accountant
    'create': 'Z',            # Admin y Manager
    'update': 'S',            # Solo Admin
    'partial_update': 'Z',    # Admin y Manager
    'destroy': 'S',           # Solo Admin
    'me': 'A',                # Todos (propio perfil)
}
```

**Filtros disponibles:**
- `?status=0` - Filtrar por estado
- `?rol=2` - Filtrar por rol
- `?group=A1` - Filtrar por grupo (búsqueda parcial)

**CustomTokenObtainPairView**

Vista de login personalizada.

```python
POST /api/users/token/
{
    "email": "user@example.com",
    "password": "pass1234"
}

Response:
{
    "access": "eyJ0eXAiOiJKV1QiLCJh...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJh..."
}
```

**LogoutView**

Invalida el refresh token.

```python
POST /api/users/logout/
{
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJh..."
}

Response:
{
    "message": "Logout exitoso"
}
```

#### Endpoints

**Base URL:** `/api/users/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar usuarios | Rol Z (Admin, Manager) |
| POST | `/` | Crear usuario | Rol Z (Admin, Manager) |
| GET | `/{id}/` | Detalle de usuario | Rol X (Admin, Manager, Accountant) |
| PUT | `/{id}/` | Actualizar usuario | Rol S (Solo Admin) |
| PATCH | `/{id}/` | Actualizar parcial | Rol Z (Admin, Manager) |
| DELETE | `/{id}/` | Eliminar usuario | Rol S (Solo Admin) |
| GET | `/me/` | Perfil del usuario autenticado | Todos (A) |

#### Autenticación JWT

**Configuración requerida en settings.py:**

```python
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

INSTALLED_APPS = [
    ...
    'rest_framework_simplejwt.token_blacklist',
]
```

**Endpoints de autenticación:**

```bash
# Login
POST /api/auth/token/
{
    "email": "user@example.com",
    "password": "pass1234"
}

# Refresh token
POST /api/auth/token/refresh/
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJh..."
}

# Logout
POST /api/users/logout/
{
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJh..."
}
```

#### Ejemplos de Uso

**Crear usuario (Modo Educativo):**
```bash
curl -X POST http://localhost:8000/api/users/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "SecurePass123!",
    "group": "A1",
    "rol": 2,
    "status": 0
  }'
```

**Crear usuario (Modo Empresarial):**
```bash
curl -X POST http://localhost:8000/api/users/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María López",
    "email": "maria@example.com",
    "password": "SecurePass123!",
    "group": "Ventas",
    "rol": 3,
    "status": 0
  }'
```

**Obtener perfil propio:**
```bash
curl -X GET http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer {token}"
```

**Listar usuarios con filtros:**
```bash
# Usuarios activos del grupo A1
curl -X GET "http://localhost:8000/api/users/?status=0&group=A1" \
  -H "Authorization: Bearer {token}"
```

**Actualizar estado de usuario:**
```bash
curl -X PATCH http://localhost:8000/api/users/5/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"status": 1}'  # Desactivar usuario
```

#### Admin Django

Panel de administración configurado con:

**Listado:**
- Campos: email, name, rol, status, group, created_at
- Filtros: status, rol, group
- Búsqueda: email, name
- Orden: -created_at (más recientes primero)

**Formularios:**
- Campos agrupados por secciones (Info Personal, Permisos, Fechas)
- created_at y updated_at en read-only
- Formulario especial para agregar usuarios

#### Validaciones

1. **Email obligatorio y único**
2. **Password con validadores de Django:**
   - Mínimo 8 caracteres
   - No completamente numérico
   - No muy común
   - No muy similar a información del usuario

3. **Validación de rol según modo:**
   - Modo educativo: solo 0 (Profesor) o 2 (Alumno)
   - Modo empresarial: 0-4

4. **Validación de estado en login:**
   - Solo usuarios con `status=0` pueden autenticarse

5. **Sincronización status/is_active:**
   - `status=0` → `is_active=True`
   - `status=1` → `is_active=False`

#### Integración con Config

El módulo Users se integra estrechamente con Config:

- Valida roles disponibles según `system_mode`
- Obtiene nombres de roles dinámicamente
- Restringe creación de usuarios en modo educativo
- Utiliza `Config.objects.first()` para verificar configuración

#### Tests

Archivos de test:
- `test_users_models.py` - Tests del modelo User y UserManager
- `test_users_serializers.py` - Tests de serializers y validaciones
- `test_users_views.py` - Tests de endpoints y autenticación

**Fixtures disponibles en conftest.py:**
```python
@pytest.fixture
def user(db, user_data):
    # Crea usuario de prueba
    
@pytest.fixture
def api_client():
    # Cliente DRF para peticiones
```

#### Notas de Seguridad

- Passwords siempre hasheados con `set_password()`
- Tokens JWT con expiración configurable
- Blacklist de tokens al hacer logout
- Validación de estado antes de autenticar
- Permisos granulares por rol y acción
- Superusers bypassean restricciones de permisos

---

## Servicios

Los servicios son componentes auxiliares que proporcionan funcionalidades específicas al backend. No exponen endpoints directamente, sino que son utilizados por las aplicaciones Django.

### 7.1 Chat Service (RAG)

**Ubicación:** `services/chat/`

**Descripción:** Servicio completo de Retrieval-Augmented Generation (RAG) para el sistema de chat inteligente. Combina búsqueda semántica con generación de lenguaje natural usando modelos locales.

#### Arquitectura del Sistema RAG

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Pregunta
       ▼
┌─────────────────┐
│  RAG Service    │ ← Orquestador principal
└────┬───┬───┬────┘
     │   │   │
     │   │   └──────────────────┐
     │   │                      │
     ▼   ▼                      ▼
┌────────────┐  ┌──────────┐  ┌──────────────┐
│  Embedder  │  │  Vector  │  │  LLM Client  │
│            │  │  Store   │  │              │
└────────────┘  └──────────┘  └──────────────┘
     │               │              │
     │               │              │
     ▼               ▼              ▼
 Sentence      FAISS Index      Llama 3.1
Transformers                    (local)
```

#### Componentes

**1. config.py** - Configuración central

Define todas las constantes y configuraciones del sistema.

**Rutas:**
```python
BASE_DIR = services/chat/
DATA_DIR = services/chat/data/          # Documentos fuente
VECTOR_STORE_DIR = services/chat/vector_store/
MODEL_PATH = services/consultorIA/core/Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf
```

**Modelo de Embeddings:**
```python
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384
```

**Modelo LLM:**
```python
LLM_MODEL_PATH = str(MODEL_PATH)
LLM_CONTEXT_SIZE = 2048    # Tokens de contexto
LLM_MAX_TOKENS = 512       # Tokens máximos de respuesta
LLM_TEMPERATURE = 0.7      # Creatividad (0-1)
LLM_TOP_P = 0.9           # Nucleus sampling
```

**Configuración RAG:**
```python
CHUNK_SIZE = 500           # Tamaño de chunks de texto
CHUNK_OVERLAP = 50         # Superposición entre chunks
TOP_K_RESULTS = 3          # Documentos más relevantes
```

**Archivos FAISS:**
```python
FAISS_INDEX_FILE = vector_store/index.faiss
FAISS_METADATA_FILE = vector_store/metadata.json
```

**System Prompt:**
Prompt optimizado que define el comportamiento del LLM:
- Rol: Asistente de contabilidad experto
- Restricción: Solo usar información del contexto proporcionado
- Objetivo: Responder de forma concisa (máx 3 párrafos)
- Regla de escape: Solo si es imposible responder

**User Prompt Template:**
```python
USER_PROMPT_TEMPLATE = """Contexto:
{context}

Pregunta: {question}"""
```

**2. embedder.py** - Generador de Embeddings

Clase que genera representaciones vectoriales del texto usando Sentence Transformers.

**Clase: Embedder**

```python
class Embedder:
    model: SentenceTransformer
    is_loaded: bool
```

**Métodos principales:**

**`load_model()`**
- Carga el modelo de embeddings (lazy loading)
- Modelo: `sentence-transformers/all-MiniLM-L6-v2`
- Solo se carga una vez

**`embed_text(text: str) -> np.ndarray`**
- Genera embedding para un texto individual
- Retorna: Array numpy de dimensión 384

**`embed_texts(texts: List[str]) -> np.ndarray`**
- Genera embeddings para múltiples textos
- Usa batch processing (batch_size=32)
- Muestra progress bar
- Más eficiente que llamadas individuales

**`get_embedding_dimension() -> int`**
- Retorna: 384 (dimensión del modelo)

**Instancia global:**
```python
embedder = Embedder()  # Singleton
```

**3. vector_store.py** - Almacén Vectorial con FAISS

Gestiona el índice de vectores y la búsqueda semántica.

**Clase: VectorStore**

```python
class VectorStore:
    index: faiss.Index          # Índice FAISS
    metadata: List[Dict]        # Metadata de documentos
    is_initialized: bool
```

**Métodos principales:**

**`initialize()`**
- Inicializa el índice FAISS
- Carga índice existente o crea uno nuevo
- Si está vacío, carga documentos automáticamente

**`_create_new_index()`**
- Crea nuevo índice FAISS con `IndexFlatL2`
- Búsqueda exacta con distancia L2 (euclidiana)

**`_chunk_text(text: str, chunk_size: int, overlap: int) -> List[str]`**
- Divide texto en chunks con superposición
- Chunk mínimo: 50 caracteres
- Evita chunks vacíos o muy cortos

**`load_documents_from_directory()`**
- Carga todos los archivos .md y .txt de `DATA_DIR`
- Procesa cada archivo:
  1. Lee contenido
  2. Divide en chunks
  3. Crea metadata por chunk
  4. Genera embeddings
  5. Agrega al índice FAISS
- Guarda índice al finalizar

**Estructura de metadata:**
```json
{
  "source": "manual_cuentas.md",
  "chunk_id": 0,
  "total_chunks": 15,
  "text": "contenido del chunk..."
}
```

**`search(query: str, k: int = 3) -> List[Dict]`**
- Busca los k documentos más relevantes
- Proceso:
  1. Genera embedding de la query
  2. Busca en índice FAISS (k-NN)
  3. Retorna resultados con metadata
- Calcula similarity: `1 / (1 + distance)`

**Formato de resultados:**
```python
[
  {
    'source': 'manual_cuentas.md',
    'chunk_id': 2,
    'text': 'contenido...',
    'distance': 0.45,
    'similarity': 0.69
  },
  ...
]
```

**`save()`**
- Guarda índice FAISS en disco
- Guarda metadata como JSON
- Ubicación: `vector_store/`

**`load()`**
- Carga índice y metadata desde disco
- Crea nuevo si falla la carga

**`rebuild()`**
- Reconstruye índice desde cero
- Vuelve a procesar todos los documentos

**`get_stats() -> Dict`**
- Retorna estadísticas del índice:
  - `total_vectors`: Cantidad de vectores
  - `total_documents`: Cantidad de archivos fuente
  - `embedding_dimension`: 384

**Instancia global:**
```python
vector_store = VectorStore()  # Singleton
```

**4. llm_client.py** - Cliente LLM Local

Interfaz para interactuar con el modelo de lenguaje Llama 3.1 usando llama.cpp.

**Clase: LLMClient**

```python
class LLMClient:
    model: Llama               # Modelo cargado
    is_loaded: bool
    _lock: threading.Lock      # Thread-safe
    _stop_generation: bool     # Flag de cancelación
```

**Métodos principales:**

**`load_model()`**
- Carga modelo Llama 3.1 8B (cuantizado Q3_K_S)
- Thread-safe con lock
- Configuración:
  ```python
  Llama(
      model_path=LLM_MODEL_PATH,
      n_ctx=2048,           # Contexto
      n_threads=4,          # Threads CPU
      n_batch=512,          # Batch size
      use_mlock=True,       # Evitar swap
      verbose=False
  )
  ```

**`generate(user_prompt, system_prompt, max_tokens, temperature, top_p, stream) -> str`**
- Genera respuesta usando API de Chat
- Parámetros:
  - `user_prompt`: Contexto + pregunta
  - `system_prompt`: Reglas del sistema
  - `max_tokens`: Máximo 512
  - `temperature`: 0.7 (default)
  - `top_p`: 0.9 (default)
  - `stream`: True para streaming

**Formato de mensajes:**
```python
messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": user_prompt}
]
```

**Configuración de generación:**
```python
create_chat_completion(
    messages=messages,
    max_tokens=512,
    temperature=0.7,
    top_p=0.9,
    stop=["<|eot_id|>"],    # Token de parada Llama 3
    repeat_penalty=1.1
)
```

**Validación de respuesta:**
- Verifica que no esté vacía (mín 10 chars)
- Fallback si error o respuesta inválida

**`_generate_stream(messages, max_tokens, temperature, top_p) -> Generator`**
- Generación en modo streaming
- Yield por cada token generado
- Respeta flag de cancelación

**`stop_generation()`**
- Detiene generación en curso
- Útil para cancelar peticiones largas

**`unload_model()`**
- Descarga modelo de memoria
- Libera recursos

**Instancia global:**
```python
llm_client = LLMClient()  # Singleton
```

**5. rag_service.py** - Orquestador Principal

Servicio que coordina todos los componentes del RAG.

**Clase: RAGService**

```python
class RAGService:
    _generation_threads: Dict[str, threading.Thread]
    _stop_flags: Dict[str, bool]
```

**Métodos principales:**

**`initialize()`**
- Inicializa todos los componentes:
  1. Vector Store
  2. LLM Client
- Se debe llamar antes de usar el servicio

**`query(question: str, request_id: str = None, stream: bool = False) -> Dict`**
- Método principal para procesar consultas
- Flujo completo:

```
1. Buscar contexto relevante
   └─> vector_store.search(question, k=3)

2. Construir contexto
   └─> _build_context(results)
   
3. Validar longitud (máx 1800 chars)
   └─> Truncar si es necesario

4. Crear user_prompt
   └─> USER_PROMPT_TEMPLATE.format(context, question)

5. Generar respuesta
   └─> llm_client.generate(user_prompt, system_prompt)

6. Validar respuesta
   └─> Fallback si error

7. Retornar resultado
   └─> {answer, sources, context_used}
```

**Manejo de errores:**
- Si no hay resultados → Respuesta "No encontré información relevante"
- Si LLM falla → `_generate_fallback_response()`
- Si excepción → Respuesta genérica de error

**Formato de respuesta (modo normal):**
```python
{
    'answer': 'Respuesta generada...',
    'sources': [
        {'name': 'manual_cuentas.md', 'similarity': 0.85},
        {'name': 'SIC1.md', 'similarity': 0.72}
    ],
    'context_used': True,
    'streaming': False
}
```

**Formato de respuesta (streaming):**
```python
{
    'answer': <generator>,  # Generador que yield chunks
    'sources': [...],
    'context_used': True,
    'streaming': True
}
```

**`_generate_fallback_response(question: str, results: list) -> str`**
- Genera respuesta simple sin usar LLM
- Usa solo el texto del resultado más relevante
- Backup cuando el LLM falla

**`_build_context(results: list) -> str`**
- Construye contexto a partir de resultados
- Formato:
  ```
  [Fuente 1: archivo.md]
  texto del chunk...
  
  [Fuente 2: otro.md]
  texto del chunk...
  ```
- Limita cada fragmento a 300 caracteres

**`_extract_sources(results: list) -> list`**
- Extrae información de fuentes únicas
- Incluye nombre y similarity score
- Elimina duplicados

**`cancel_request(request_id: str)`**
- Cancela petición en curso
- Marca flag de stop
- Llama a `llm_client.stop_generation()`

**`rebuild_index()`**
- Reconstruye índice vectorial
- Wrapper de `vector_store.rebuild()`

**`get_stats() -> Dict`**
- Obtiene estadísticas del servicio
- Wrapper de `vector_store.get_stats()`

**Instancia global:**
```python
rag_service = RAGService()  # Singleton
```

**6. init_index.py** - Script de Inicialización

Script standalone para inicializar el sistema RAG.

**Función: initialize_index()**

Proceso completo de inicialización:

```
1. Verificar archivos en data/
   └─> Buscar .md y .txt
   └─> Advertir si no hay archivos

2. Inicializar componentes:
   ├─> embedder.load_model()
   ├─> vector_store.initialize()
   └─> llm_client.load_model()

3. Obtener estadísticas
   └─> rag_service.get_stats()

4. Actualizar BD
   └─> IndexStatus.get_current_status()
   └─> Guardar totales

5. Mostrar resumen
```

**Uso:**
```bash
python services/chat/init_index.py
```

O desde Django:
```bash
python manage.py init_chat
```

#### Flujo Completo de una Query

**Ejemplo: Usuario pregunta "¿Qué es el debe?"**

```
1. apps/chat/views.py - ChatViewSet.query()
   └─> Valida request
   └─> Genera request_id
   
2. rag_service.query("¿Qué es el debe?")
   
3. vector_store.search("¿Qué es el debe?", k=3)
   ├─> embedder.embed_text("¿Qué es el debe?")
   └─> FAISS k-NN search
   └─> Retorna 3 chunks más similares
   
4. _build_context(results)
   └─> Combina chunks en texto cohesivo
   
5. Crear prompts
   ├─> system_prompt (reglas)
   └─> user_prompt (contexto + pregunta)
   
6. llm_client.generate(user_prompt, system_prompt)
   ├─> Llama 3.1 procesa
   └─> Genera respuesta contextualizada
   
7. Validar y retornar
   └─> {answer, sources, context_used}
   
8. apps/chat/views.py
   └─> Guarda en ChatQuery
   └─> Retorna al usuario
```

#### Configuración de Documentos

**Ubicación:** `services/chat/data/`

**Archivos soportados:**
- `.md` (Markdown)
- `.txt` (Texto plano)

**Ejemplo de estructura:**
```
services/chat/data/
├── manual_cuentas.md       # Plan de cuentas
├── SIC1.md                 # Manual contable
└── conceptos_basicos.txt   # Conceptos
```


#### Optimizaciones Implementadas

**1. Lazy Loading:**
- Modelos se cargan solo cuando se usan
- Ahorra memoria si el servicio no se usa

**2. Batch Processing:**
- Embeddings se generan en batches de 32
- Más eficiente que uno por uno

**3. Chunking Inteligente:**
- Superposición de 50 caracteres
- Preserva contexto entre chunks

**4. Thread Safety:**
- Locks en carga de modelos
- Previene race conditions

**5. Caching de Índice:**
- FAISS se guarda en disco
- Carga rápida en siguiente inicio

**6. Cancelación de Peticiones:**
- Flags de stop para interrumpir
- Libera recursos rápidamente

#### Dependencias

**Python packages:**
```
sentence-transformers==5.1.1    # Embeddings
faiss-cpu==1.12.0              # Vector search
llama-cpp-python==0.3.16       # LLM local
numpy==2.3.3                   # Arrays
torch==2.8.0                   # Backend de transformers
```

**Modelos descargados:**
- `sentence-transformers/all-MiniLM-L6-v2` (embeddings)
- `Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf` (LLM local)

#### Comandos de Gestión Django

**Inicializar chat:**
```bash
python manage.py init_chat
```
- Carga embedder
- Crea índice FAISS
- Procesa documentos
- Actualiza IndexStatus en BD

**Reconstruir índice:**
```bash
python manage.py rebuild_chat_index
```
- Borra índice existente
- Reprocesa todos los documentos
- Regenera embeddings
- Crea nuevo índice FAISS

#### Métricas y Monitoreo

**Estadísticas disponibles:**
```python
stats = rag_service.get_stats()
# {
#   'total_vectors': 150,
#   'total_documents': 3,
#   'embedding_dimension': 384
# }
```

**Logs importantes:**
```
"Cargando modelo de embeddings: sentence-transformers/all-MiniLM-L6-v2"
"Modelo de embeddings cargado exitosamente"
"Cargando modelo LLM desde: .../Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf"
"Modelo LLM cargado exitosamente"
"Índice cargado: 150 vectores"
"Buscando contexto para: ¿Qué es el debe?..."
"Generando respuesta..."
```

#### Troubleshooting

**Problema: "No se encontraron archivos en data/"**
- Solución: Agregar archivos .md o .txt en `services/chat/data/`

**Problema: "Error al cargar modelo LLM"**
- Verificar que existe: `services/consultorIA/core/Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf`
- Verificar permisos de lectura

**Problema: "Índice vacío"**
- Ejecutar: `python manage.py init_chat`
- O agregar documentos y reconstruir

**Problema: Respuestas lentas**
- Considerar GPU (cambiar `faiss-cpu` a `faiss-gpu`)
- Reducir `LLM_MAX_TOKENS`
- Reducir `TOP_K_RESULTS`

**Problema: Respuestas sin contexto**
- Verificar que los documentos contengan la información
- Ajustar `CHUNK_SIZE` y `CHUNK_OVERLAP`
- Aumentar `TOP_K_RESULTS`

#### Extensiones Futuras

**Posibles mejoras:**

1. **Múltiples modelos de embeddings**
   - Cambiar modelo según tipo de query
   - Embeddings multilingües

2. **Reranking de resultados**
   - Segunda fase de scoring
   - Mejorar relevancia

3. **Caché de respuestas**
   - Guardar respuestas frecuentes
   - Reducir latencia

4. **Feedback loop**
   - Aprender de correcciones del usuario
   - Fine-tuning del modelo

5. **Soporte de más formatos**
   - PDF, DOCX, HTML
   - Extracción de tablas

6. **Vector DB escalable**
   - Migrar a Pinecone, Weaviate o Qdrant
   - Mayor capacidad y velocidad

#### Notas Importantes

- Los modelos se ejecutan **localmente** (sin APIs externas)
- El modelo LLM pesa ~3.5GB en disco
- Requiere ~4GB RAM para operar
- Primera query es más lenta (carga modelos)
- El índice FAISS es persistente entre reinicios
- Los documentos se procesan una sola vez (rebuild manual)
- System prompt optimizado para evitar alucinaciones
- Respuestas limitadas a información del contexto

---

### 7.2 ConsultorIA Service (Text-to-SQL)

**Ubicación:** `services/consultorIA/`

**Estado:** En desarrollo - Documentación provisional

**Descripción:** Servicio de consultas en lenguaje natural sobre transacciones y libros diarios. Traduce preguntas del usuario a consultas SQL mediante un LLM local, permitiendo búsquedas personalizadas sin necesidad de conocer SQL.

#### Concepto General

El servicio permite consultas como:
- "¿Cuántas transacciones hice en enero?"
- "Muéstrame todas las transacciones con la cuenta Caja"
- "¿Cuál es el saldo total de cuentas deudoras?"
- "Listar asientos del usuario Juan Pérez"

Y las convierte en consultas SQL válidas:
```sql
SELECT COUNT(*) FROM transactions WHERE date LIKE '2025-01%';
SELECT * FROM transactions t 
  JOIN transaction_entries e ON t.trans_id = e.trans_id
  JOIN accounts a ON e.acc_id = a.acc_id
  WHERE a.name = 'Caja';
```

#### Arquitectura Propuesta

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Pregunta en lenguaje natural
       ▼
┌─────────────────┐
│ ConsultorIA     │
│ Service         │
└────┬───────┬────┘
     │       │
     │       └──────────────────┐
     │                          │
     ▼                          ▼
┌────────────┐         ┌──────────────┐
│  Schema    │         │  LLM Client  │
│  Loader    │         │  (Llama 3.1) │
└────────────┘         └──────────────┘
     │                          │
     │                          │
     ▼                          ▼
 schema.txt              Text-to-SQL
 (BD schema)             Generation
                              │
                              ▼
                         ┌──────────┐
                         │  SQLite  │
                         │  Engine  │
                         └──────────┘
```

#### Componentes Previstos

**1. schema.txt** - Esquema de BD en texto plano

**2. main.py** - Orquestador principal

**3. examples.json** - Ejemplos de queries para few-shot learning

**4. LLM Client** - Reutiliza Llama 3.1 del servicio chat

#### Características Planificadas

- Solo consultas SELECT (DQL - lectura)
- Validación de sintaxis SQL
- Whitelist de tablas
- Timeout y límite de resultados
- 100% local, sin APIs externas

#### Limitaciones

- En desarrollo, no en producción
- Solo SQLite
- Solo SELECT (no modificaciones)
- Dependiente de calidad del prompt

---

### 7.3 Daily Service (Generación de Libros Diarios)

**Ubicación:** `services/daily/`

**Estado:** Planificado - Documentación provisional

**Descripción:** Servicio para generar libros diarios contables en formato PDF utilizando plantillas LaTeX. Toma transacciones cerradas y las formatea según normas contables profesionales.

#### Concepto General

Genera PDFs profesionales de libros diarios con formato contable estándar:
- Encabezado con empresa y período
- Asientos detallados con debe/haber
- Totales balanceados
- Numeración de páginas
- Metadata del documento

#### Arquitectura Propuesta

```
Transacciones → Daily Service → LaTeX Template → pdflatex → PDF
(status=2)         ↓                                         ↓
              Formateo                                  libro_diario.pdf
```

#### Componentes Previstos

**1. main.py** - Generador principal

**2. templates/libro_diario.tex** - Plantilla LaTeX

**3. utils.py** - Funciones auxiliares (formateo, escapado)

#### Características Planificadas

**Formatos:**
- PDF (principal)
- LaTeX source (edición)
- HTML (preview)

**Opciones:**
- Por período (fechas)
- Por usuario/grupo
- Personalización (logo, colores)

#### Dependencias

```bash
pip install jinja2
apt-get install texlive-full  # Linux
```

#### Limitaciones

- Planificado, no implementado
- Requiere LaTeX en servidor
- Compilación puede tardar 5-10 seg
- Un solo template disponible

---

### Comparación de Servicios

| Aspecto | Chat (RAG) | ConsultorIA | Daily |
|---------|-----------|-------------|-------|
| Estado | Operativo | En desarrollo | Planificado |
| LLM | Llama 3.1 | Llama 3.1 | No usa LLM |
| Input | Texto libre | Texto libre | Fechas |
| Output | Respuestas | SQL + Resultados | PDF |
| Propósito | Ayuda conceptual | Búsquedas BD | Docs oficiales |
| Modifica BD | No | No | No |
| Local | 100% | 100% | 100% |

---

## API Reference

Esta sección consolida todos los endpoints disponibles en el backend, organizados por aplicación.

### Autenticación

Todos los endpoints (excepto login) requieren autenticación JWT mediante header:
```
Authorization: Bearer {access_token}
```

**Endpoints de autenticación:**

| Método | Endpoint | Descripción | Público |
|--------|----------|-------------|---------|
| POST | `/api/auth/token/` | Login (obtener tokens) | Sí |
| POST | `/api/auth/token/refresh/` | Refrescar access token | Sí |
| POST | `/api/users/logout/` | Logout (invalidar token) | No |

### Resumen por Aplicación

#### Config - Configuración del Sistema

**Base URL:** `/api/config/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar configuraciones | IsAuthenticated |
| POST | `/` | Crear configuración | IsAuthenticated |
| GET | `/{id}/` | Detalle de configuración | IsAuthenticated |
| PUT | `/{id}/` | Actualizar configuración | IsAuthenticated |
| PATCH | `/{id}/` | Actualizar parcial | IsAuthenticated |
| DELETE | `/{id}/` | Eliminar configuración | IsAuthenticated |
| GET | `/current/` | Obtener configuración actual | IsAuthenticated |
| GET | `/role_names/` | Obtener nombres de roles según modo | IsAuthenticated |

**Total: 8 endpoints**

#### Users - Gestión de Usuarios

**Base URL:** `/api/users/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar usuarios | Rol Z (Admin, Manager) |
| POST | `/` | Crear usuario | Rol Z (Admin, Manager) |
| GET | `/{id}/` | Detalle de usuario | Rol X (Admin, Manager, Accountant) |
| PUT | `/{id}/` | Actualizar usuario | Rol S (Solo Admin) |
| PATCH | `/{id}/` | Actualizar parcial | Rol Z (Admin, Manager) |
| DELETE | `/{id}/` | Eliminar usuario | Rol S (Solo Admin) |
| GET | `/me/` | Perfil del usuario autenticado | Todos (A) |

**Filtros disponibles:** `?status={0,1}`, `?rol={0-4}`, `?group={nombre}`

**Total: 7 endpoints**

#### Accounts - Plan de Cuentas

**Base URL:** `/api/accounts/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar cuentas | IsAuthenticated |
| POST | `/` | Crear cuenta | IsAuthenticated |
| GET | `/{id}/` | Detalle de cuenta | IsAuthenticated |
| PUT | `/{id}/` | Actualizar cuenta | IsAuthenticated |
| PATCH | `/{id}/` | Actualizar parcial | IsAuthenticated |
| DELETE | `/{id}/` | Eliminar cuenta | IsAuthenticated |
| GET | `/active/` | Listar solo cuentas activas | IsAuthenticated |

**Filtros disponibles:** `?status={true,false}`, `?nature={true,false}`, `?search={texto}`

**Total: 7 endpoints**

#### Trans - Transacciones Contables

**Base URL:** `/api/trans/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/` | Listar transacciones | Todos |
| POST | `/` | Crear transacción | Todos excepto Viewer (rol 4) |
| GET | `/{id}/` | Detalle de transacción | Todos |
| PUT | `/{id}/` | Actualizar transacción | Admin (0), Accountant (2) - no cerradas |
| PATCH | `/{id}/` | Actualizar parcial | Admin (0), Accountant (2) - no cerradas |
| DELETE | `/{id}/` | Eliminar transacción | Solo Admin (0) - no cerradas |
| GET | `/recent/` | Transacciones recientes | Todos |
| POST | `/{id}/toggle_status/` | Cambiar estado (0↔1) | Admin, Accountant - no cerradas |
| POST | `/{id}/close/` | Cerrar transacción (→2) | Admin, Accountant |

**Filtros disponibles:** `?status={0,1,2}`, `?user={id}`, `?date_from={fecha}`, `?date_to={fecha}`, `?search={texto}`, `?limit={n}`

**Total: 9 endpoints**

#### Chat - Sistema RAG con IA

**Base URL:** `/api/chat/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| POST | `/query/` | Realizar consulta al chat | CanUseChat (todos) |
| POST | `/cancel/` | Cancelar petición activa | CanUseChat (todos) |
| GET | `/status/` | Estado del servicio | CanUseChat (todos) |
| POST | `/rebuild/` | Reconstruir índice | CanRebuildIndex (Solo Admin/Profesor) |
| GET | `/history/` | Listar historial | CanViewHistory |
| GET | `/history/{id}/` | Detalle de consulta | CanViewHistory |

**Filtros disponibles (historial):** `?user={id}`, `?date_from={fecha}`, `?date_to={fecha}`

**Total: 6 endpoints**

#### Dash - Dashboard y Estadísticas

**Base URL:** `/api/dashboard/`

| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/stats/` | Obtener estadísticas completas | IsAuthenticated |

**Total: 1 endpoint**

### Resumen Global

**Total de endpoints:** 38 endpoints

**Distribución por aplicación:**
- Config: 8 endpoints
- Users: 7 endpoints
- Accounts: 7 endpoints
- Trans: 9 endpoints
- Chat: 6 endpoints
- Dash: 1 endpoint

### Códigos de Estado HTTP

**Respuestas exitosas:**
- `200 OK` - Operación exitosa (GET, PUT, PATCH, algunas acciones)
- `201 Created` - Recurso creado exitosamente (POST)
- `202 Accepted` - Petición aceptada, procesamiento en background (rebuild)
- `204 No Content` - Operación exitosa sin contenido (DELETE)

**Errores del cliente:**
- `400 Bad Request` - Datos inválidos o validación fallida
- `401 Unauthorized` - No autenticado o token inválido
- `403 Forbidden` - No tiene permisos para esta acción
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Conflicto (ej: rebuild ya en curso)

**Errores del servidor:**
- `500 Internal Server Error` - Error inesperado del servidor
- `503 Service Unavailable` - Servicio temporalmente no disponible

### Formatos de Request/Response

**Content-Type:** `application/json`

**Estructura de error estándar:**
```json
{
  "error": "Descripción del error",
  "detail": "Detalles adicionales (opcional)"
}
```

**Estructura de validación fallida:**
```json
{
  "field_name": [
    "Error de validación del campo"
  ]
}
```

### Paginación

Los endpoints de listado pueden implementar paginación:

```json
{
  "count": 100,
  "next": "http://api.example.com/endpoint/?page=2",
  "previous": null,
  "results": [...]
}
```

### Filtros Comunes

**Por fecha:**
- `?date_from=2025-01-01` - Desde fecha (inclusive)
- `?date_to=2025-01-31` - Hasta fecha (inclusive)

**Por estado:**
- `?status=0` o `?status=true` - Estado específico

**Por búsqueda:**
- `?search=texto` - Búsqueda en campos relevantes

**Por usuario:**
- `?user=5` - Filtrar por usuario específico

**Por límite:**
- `?limit=20` - Limitar cantidad de resultados

### Grupos de Roles (para permisos)

- **A (All):** Todos los roles [0, 1, 2, 3, 4]
- **N (Not Viewer):** Todos menos Viewer [0, 1, 2, 3]
- **X (eXecutive):** Admin, Manager, Accountant [0, 1, 2]
- **Y (Year-end):** Admin, Accountant [0, 2]
- **Z (Zone managers):** Admin, Manager [0, 1]
- **S (Super):** Solo Admin [0]

### Ejemplos de Uso Completo

**1. Flujo de autenticación y consulta:**
```bash
# 1. Login
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "pass1234"}'

# Response: {"access": "...", "refresh": "..."}

# 2. Consultar perfil
curl -X GET http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer {access_token}"

# 3. Refrescar token
curl -X POST http://localhost:8000/api/auth/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "{refresh_token}"}'

# 4. Logout
curl -X POST http://localhost:8000/api/users/logout/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "{refresh_token}"}'
```

**2. Flujo de transacción contable:**
```bash
# 1. Listar cuentas activas
curl -X GET http://localhost:8000/api/accounts/active/ \
  -H "Authorization: Bearer {token}"

# 2. Crear transacción
curl -X POST http://localhost:8000/api/trans/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-01-15",
    "legend": "Venta al contado",
    "entries": [
      {"acc_id": 1, "debit": 10000, "credit": 0},
      {"acc_id": 20, "debit": 0, "credit": 10000}
    ]
  }'

# 3. Verificar transacción
curl -X POST http://localhost:8000/api/trans/{id}/toggle_status/ \
  -H "Authorization: Bearer {token}"

# 4. Ver estadísticas
curl -X GET http://localhost:8000/api/dashboard/stats/ \
  -H "Authorization: Bearer {token}"
```

**3. Flujo de chat con IA:**
```bash
# 1. Verificar estado del servicio
curl -X GET http://localhost:8000/api/chat/status/ \
  -H "Authorization: Bearer {token}"

# 2. Realizar consulta
curl -X POST http://localhost:8000/api/chat/query/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"question": "¿Qué es el debe y el haber?"}'

# 3. Ver historial
curl -X GET http://localhost:8000/api/chat/history/ \
  -H "Authorization: Bearer {token}"
```

### Rate Limiting

Actualmente no hay rate limiting implementado. Para producción, se recomienda:

- **Autenticación:** 5 intentos por minuto
- **Endpoints regulares:** 100 requests por minuto
- **Chat queries:** 10 requests por minuto
- **Rebuild index:** 1 request por hora

### CORS

Configurado mediante `django-cors-headers`. Ajustar en `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend en desarrollo
    "https://yourdomain.com",  # Frontend en producción
]
```

### Webhooks

Actualmente no implementados. Posibles webhooks futuros:

- `transaction.created` - Nueva transacción creada
- `transaction.closed` - Transacción cerrada
- `index.rebuilt` - Índice RAG reconstruido
- `balance.alert` - Alerta de desbalance contable

### Versionado de API

Actualmente no hay versionado. Para versiones futuras:

```
/api/v1/users/
/api/v2/users/
```

### Testing de API

**Colecciones recomendadas:**
- Postman/Insomnia: Importar endpoints
- pytest-django: Tests automatizados
- curl/httpie: Tests manuales

**Variables de entorno:**
```bash
export API_URL=http://localhost:8000
export ACCESS_TOKEN=your_token_here
```

---

**Documentación generada automáticamente:** Esta sección se genera a partir de las definiciones de ViewSets y Serializers. Para documentación interactiva, considerar implementar Django REST Framework's browsable API o Swagger/OpenAPI.

---

## Comandos de Gestión

### Accounts
```bash
python manage.py init_plan_cuentas        # Inicializar plan de cuentas
```

### Chat
```bash
python manage.py init_chat                # Inicializar sistema de chat
python manage.py rebuild_chat_index       # Reconstruir índice vectorial
```

### Dashboard
```bash
python manage.py init_dashboard_data      # Inicializar datos del dashboard
python manage.py check_dashboard_stats    # Verificar estadísticas
python manage.py clear_dahsboard_data     # Limpiar datos del dashboard
```

---

## Notas de Desarrollo

- El proyecto utiliza **JWT** para autenticación
- Los tests requieren fixtures definidas en `conftest.py`
- Se recomienda GPU con CUDA para servicios de IA
- El sistema de caché utiliza disco para persistencia
