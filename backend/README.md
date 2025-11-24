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
   - [7.1 LLM Gateway](#71-llm-gateway)
   - [7.2 Chat Service (RAG)](#72-chat-service-rag)
   - [7.3 ConsultorIA (SQL)](#73-consultoria-sql)
8. [API Reference](#api-reference)
9. [Comandos de Gestión](#comandos-de-gestión)

---

## Descripción General

Backend del sistema Mosaite, construido con Django y Django REST Framework. El proyecto incluye módulos para gestión de cuentas contables, transacciones, chat con IA, dashboard y administración de usuarios.

**Actualización:** El sistema ahora cuenta con un **LLM Gateway centralizado** que permite usar múltiples proveedores de modelos de lenguaje (OpenAI, Anthropic, Google Gemini) con fallback automático al modelo local, optimizando recursos y mejorando la disponibilidad.

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
- **llama-cpp-python 0.3.16** - Integración con modelos Llama (local)
- **faiss-cpu 1.12.0** - Búsqueda de vectores similares
- **scikit-learn 1.7.2** - Algoritmos de ML tradicional

### APIs de LLM (Nuevas)
- **openai ≥1.0.0** - API de OpenAI (GPT-4, GPT-3.5)
- **anthropic ≥0.21.0** - API de Anthropic (Claude)
- **google-generativeai ≥0.3.0** - API de Google (Gemini)
- **python-dotenv ≥1.0.0** - Gestión de variables de entorno

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
- CUDA 12.8+ (opcional, para aceleración GPU del modelo local)
- Al menos una API key de: OpenAI, Anthropic o Google (opcional pero recomendado)

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
# Crear .env principal (para Django)
cp .env.example .env

# Crear .env para LLM Gateway (APIs opcionales)
cp services/llm_gateway/.env.example services/llm_gateway/.env

# Editar ambos archivos con tus configuraciones
nano .env
nano services/llm_gateway/.env
```

**Variables de entorno importantes para LLM Gateway:**
```bash
# En services/llm_gateway/.env (todas opcionales)
OPENAI_API_KEY=sk-...              # Para usar GPT-4, GPT-3.5
ANTHROPIC_API_KEY=sk-ant-...       # Para usar Claude
GOOGLE_API_KEY=...                 # Para usar Gemini (recomendado, gratis)
```

5. **Configurar PYTHONPATH (importante para servicios)**
```bash
# Agregar al .env principal o a tu shell
echo 'export PYTHONPATH="/ruta/completa/a/backend/services:$PYTHONPATH"' >> ~/.bashrc
source ~/.bashrc
```

O en Django settings.py:
```py
import sys
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / 'services'))
```

6. **Verificar LLM Gateway**
```bash
cd services/llm_gateway
python test.py
cd ../..
```

7. **Realizar migraciones**
```bash
python manage.py migrate
```

8. **Crear superusuario**
```bash
python manage.py createsuperuser
```

9. **Inicializar datos base**
```bash
python manage.py init_plan_cuentas
python manage.py init_chat
python manage.py init_dashboard_data
```

10. **Ejecutar servidor de desarrollo**
```bash
python manage.py runserver
```

---

## Estructura del Proyecto

```
backend/
├── apps/                          # Aplicaciones Django
│   ├── accounts/                  # Gestión de cuentas contables
│   ├── chat/                      # Sistema de chat con IA
│   ├── config/                    # Configuración del sistema
│   ├── dash/                      # Dashboard y estadísticas
│   ├── trans/                     # Transacciones contables
│   └── users/                     # Gestión de usuarios
├── config/                        # Configuración del proyecto Django
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── services/                      # Servicios auxiliares
│   ├── llm_gateway/              # Gateway centralizado de LLM
│   │   ├── providers/            # Implementaciones de providers
│   │   │   ├── openai_provider.py
│   │   │   ├── anthropic_provider.py
│   │   │   ├── google_provider.py
│   │   │   └── local_provider.py
│   │   ├── core/                 # Modelo local (.gguf)
│   │   ├── gateway.py            # Orquestador principal
│   │   ├── config.py             # Configuración
│   │   ├── test.py               # Script de pruebas
│   │   └── README.md             # Documentación completa
│   ├── chat/                     # Servicio RAG para chat
│   │   ├── config.py
│   │   ├── embedder.py           # Generación de embeddings
│   │   ├── vector_store.py       # Almacén FAISS
│   │   ├── llm_client.py         # Usa llm_gateway
│   │   ├── rag_service.py        # Servicio principal
│   │   ├── data/                 # Documentos para RAG
│   │   └── vector_store/         # Índice FAISS
│   ├── consultorIA/              # Consultor SQL (modularizado)
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── sql_classifier.py     # Clasificador de consultas
│   │   ├── sql_validator.py      # Validador de seguridad
│   │   ├── llm_client.py         # ★ Usa llm_gateway
│   │   ├── consultor_service.py  # Servicio principal
│   │   ├── main.py               # Script de ejemplo
│   │   ├── examples.json         # Ejemplos NL -> SQL
│   │   └── schema.txt            # Esquema de BD
│   └── daily/                    # Tareas diarias
├── manage.py                      # CLI de Django
├── requirements.txt               # Dependencias principales
├── pytest.ini                     # Configuración de pytest
├── conftest.py                    # Fixtures globales de pytest
└── .env                           # Variables de entorno
```

### Cambios importantes en la estructura:
- ★ **llm_gateway/**: Nuevo servicio centralizado para acceso a LLMs
- ★ **chat/llm_client.py**: Ahora usa el gateway en lugar de llama.cpp directo
- ★ **consultorIA/**: Completamente refactorizado y modularizado

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

### Testing de Servicios

**LLM Gateway:**
```bash
cd services/llm_gateway
python test.py
```

**Chat Service:**
```bash
cd services/chat
python ../llm_gateway/examples/rag_example.py
```

**ConsultorIA:**
```bash
cd services/consultorIA
python test_consultor_service.py
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
# Todos los tests de Django
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

## Servicios

### 7.1 LLM Gateway

**Ubicación:** `services/llm_gateway/`

**Descripción:** Gateway centralizado que proporciona acceso unificado a múltiples proveedores de modelos de lenguaje (LLMs) con sistema de fallback automático.

#### Características

- **Múltiples Providers**: OpenAI, Anthropic (Claude), Google (Gemini), Modelo Local
- **Fallback Automático**: Si un provider falla o se queda sin cuota, cambia al siguiente
- **Lazy Loading**: El modelo local solo se carga cuando es necesario
- **Health Checks**: Verificación automática de disponibilidad de providers
- **API Unificada**: Interfaz consistente independiente del provider usado
- **Optimización de Recursos**: Reduce consumo de RAM de 8GB+ a ~100MB (con APIs)

#### Providers Disponibles

1. **OpenAI** (GPT-4, GPT-3.5)
   - Modelo por defecto: `gpt-4o-mini`
   - Económico y rápido (~$0.15 por 1M tokens)
   - Requiere: `OPENAI_API_KEY`

2. **Anthropic** (Claude)
   - Modelo por defecto: `claude-3-5-haiku-20241022`
   - Excelente con contexto largo
   - Requiere: `ANTHROPIC_API_KEY`

3. **Google** (Gemini)
   - Modelo por defecto: `gemini-2.0-flash-exp`
   - **Recomendado para desarrollo** (gratis, generoso)
   - Requiere: `GOOGLE_API_KEY`

4. **Local** (Llama)
   - Modelo: `Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf`
   - Fallback automático
   - No requiere internet ni API keys
   - Ubicación: `services/llm_gateway/core/`

#### Prioridad de Providers

El gateway intenta usar los providers en este orden:
1. APIs configuradas (OpenAI, Anthropic, Google)
2. Modelo local (fallback final)

Si un provider falla, automáticamente intenta el siguiente.

#### Uso Básico

```python
from llm_gateway import get_gateway

# Obtener instancia del gateway (singleton)
gateway = get_gateway()

# Generación simple
response = gateway.generate_simple(
    prompt="¿Qué es Python?",
    max_tokens=100
)

# Generación con contexto (para RAG)
response = gateway.generate(
    user_prompt="Contexto + Pregunta",
    system_prompt="Instrucciones del sistema",
    max_tokens=512,
    temperature=0.7
)

# Verificar estado
status = gateway.get_status()
print(f"Providers disponibles: {status['available_providers']}")
```

#### Configuración

**Variables de entorno** (`services/llm_gateway/.env`):
```bash
# APIs (todas opcionales)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...

# Si no configuras ninguna, usará el modelo local automáticamente
```

**Configurar modelos** (`services/llm_gateway/config.py`):
```python
DEFAULT_MODELS = {
    "openai": "gpt-4o-mini",
    "anthropic": "claude-3-5-haiku-20241022",
    "google": "gemini-2.0-flash-exp",
}
```

#### Testing

```bash
cd services/llm_gateway
python test.py
```

#### Documentación Completa

- `services/llm_gateway/README.md` - Documentación completa del API
- `services/llm_gateway/QUICKSTART.md` - Inicio rápido
- `services/llm_gateway/MODELS.md` - Modelos disponibles
- `services/llm_gateway/ENV_GUIDE.md` - Configuración de variables de entorno
- `services/llm_gateway/IMPORT_TROUBLESHOOTING.md` - Solución de problemas

---

### 7.2 Chat Service (RAG)

**Ubicación:** `services/chat/`

**Descripción:** Servicio de Retrieval-Augmented Generation (RAG) para responder preguntas basadas en documentos contables usando el LLM Gateway.

#### Componentes

1. **Embedder** (`embedder.py`)
   - Genera embeddings usando `sentence-transformers`
   - Modelo: `all-MiniLM-L6-v2`
   - Dimensión: 384

2. **Vector Store** (`vector_store.py`)
   - Almacenamiento de vectores con FAISS
   - Búsqueda de similitud eficiente
   - Persistencia en disco

3. **LLM Client** (`llm_client.py`)
   - **Actualizado**: Ahora usa `llm_gateway`
   - Interfaz compatible con código anterior
   - Soporte para streaming

4. **RAG Service** (`rag_service.py`)
   - Orquesta todo el flujo RAG
   - Búsqueda de contexto relevante
   - Generación de respuestas contextualizadas

#### Flujo de Funcionamiento

1. Usuario hace una pregunta
2. Se genera embedding de la pregunta
3. Se buscan los documentos más relevantes (FAISS)
4. Se construye contexto con los documentos encontrados
5. LLM Gateway genera respuesta basada en el contexto
6. Se retorna respuesta con fuentes

#### Uso

```python
from services.chat import rag_service

# Inicializar
rag_service.initialize()

# Consultar
resultado = rag_service.query("¿Qué es el IVA?")

if resultado['context_used']:
    print(resultado['answer'])
    print("Fuentes:", resultado['sources'])
```

#### Configuración

**Documentos** (`services/chat/data/`):
- Coloca archivos `.md` o `.txt` con información contable
- Se indexan automáticamente al inicializar

**Parámetros** (`services/chat/config.py`):
```python
CHUNK_SIZE = 500         # Tamaño de chunks de texto
CHUNK_OVERLAP = 50       # Superposición entre chunks
TOP_K_RESULTS = 3        # Documentos a recuperar
LLM_MAX_TOKENS = 512     # Tokens máximos de respuesta
```

#### Ventajas de la Migración

**Antes:**
- Modelo siempre cargado (8GB+ RAM)
- Solo modelo local disponible
- Sin fallback si falla

**Después:**
- Lazy loading del modelo
- Múltiples providers (APIs + local)
- Fallback automático
- Menor consumo de recursos

#### Testing

```bash
# Test del servicio completo
cd services/chat
python ../llm_gateway/examples/rag_example.py
```

#### Migración

Si tienes el servicio antiguo, solo necesitas actualizar 2 archivos:
1. `config.py` - Removida referencia al modelo local
2. `llm_client.py` - Ahora usa el gateway

Ver: `services/chat_service_updated/MIGRATION.md`

---

### 7.3 ConsultorIA (SQL)

**Ubicación:** `services/consultorIA/`

**Descripción:** Servicio para generar consultas SQL desde lenguaje natural usando clasificación por embeddings y LLM Gateway. **Completamente refactorizado y modularizado.**

#### Componentes

1. **SQL Classifier** (`sql_classifier.py`)
   - Encuentra consulta SQL más similar usando embeddings
   - Modelo: `all-MiniLM-L6-v2`
   - Base: `examples.json` (ejemplos NL -> SQL)

2. **SQL Validator** (`sql_validator.py`)
   - Valida que consultas sean seguras (solo SELECT)
   - Detecta operaciones destructivas (DROP, DELETE, etc.)
   - Limpia formato markdown

3. **LLM Client** (`llm_client.py`)
   - **Actualizado**: Usa `llm_gateway`
   - Genera/corrige consultas SQL
   - Soporte para múltiples providers

4. **Consultor Service** (`consultor_service.py`)
   - Servicio principal orquestador
   - Integra clasificador, LLM y validador
   - API unificada

#### Flujo de Funcionamiento

1. Usuario hace pregunta en lenguaje natural
2. Clasificador encuentra SQL candidata similar
3. LLM ajusta/corrige la consulta según esquema de BD
4. Se valida que sea segura (solo SELECT)
5. Se retorna SQL o error de validación

#### Arquitectura

**Antes (monolítico):**
```
main.py  (todo en un archivo, ~150 líneas)
```

**Después (modular):**
```
consultorIA/
├── __init__.py              # API pública
├── config.py                # Configuración
├── sql_classifier.py        # Clasificador
├── sql_validator.py         # Validador
├── llm_client.py           # Cliente LLM
├── consultor_service.py    # Servicio principal
└── main.py                 # Ejemplo de uso
```

#### Uso

```python
from services.consultorIA import consultor_service

# Inicializar
consultor_service.initialize()

# Generar SQL
resultado = consultor_service.generar_sql("¿Cuántos usuarios hay?")

if resultado['valida']:
    sql = resultado['consulta']
    # Ejecutar SQL...
else:
    print(resultado['error_usuario'])
```

#### Respuesta del Servicio

```python
{
    'valida': bool,           # True si la consulta es válida
    'consulta': str,          # SQL generada (si es válida)
    'codigo': int,            # Código de error (si inválida)
    'error_tecnico': str,     # Descripción técnica
    'error_usuario': str      # Mensaje amigable
}
```

#### Configuración

**Ejemplos** (`examples.json`):
```json
[
  {
    "question": "¿Cuántos usuarios hay?",
    "sql": "SELECT COUNT(*) FROM usuarios"
  },
  ...
]
```

**Esquema** (`schema.txt`):
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    ...
);
```

#### Ventajas de la Modularización

**Antes:**
- Todo en un archivo
- Difícil de testear
- Difícil de mantener
- Modelo siempre cargado

**Después:**
- 7 módulos especializados
- Fácil de testear cada componente
- Fácil de mantener y extender
- Lazy loading de recursos
- Usa APIs o modelo local

#### Testing

```bash
# Test completo
cd services/consultorIA
python test_consultor_service.py

# Script de ejemplo
python main.py
```

#### Migración

El servicio fue completamente refactorizado. Ver guía completa:
- `services/consultor_service_updated/MIGRATION.md`
- `services/consultor_service_updated/README.md`

---

## API Reference

[... Mantener toda la sección de API Reference existente ...]

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

### LLM Gateway (Nuevo)
```bash
# Verificar configuración
cd services/llm_gateway
python test.py

# Ver estado de providers
python -c "from llm_gateway import print_configuration_status; print_configuration_status()"
```

---

## Notas de Desarrollo

### Generales
- El proyecto utiliza **JWT** para autenticación
- Los tests requieren fixtures definidas en `conftest.py`
- Se recomienda GPU con CUDA para servicios de IA
- El sistema de caché utiliza disco para persistencia

### LLM Gateway (Nuevo)
- **Recomendado**: Configurar al menos una API (Google Gemini es gratis)
- **Fallback**: El modelo local se usa automáticamente si no hay APIs
- **Recursos**: Con APIs el consumo es ~100MB vs 8GB+ del modelo local
- **PYTHONPATH**: Asegurarse de configurar correctamente para imports

### Servicios de IA
- **Chat Service**: Requiere documentos en `services/chat/data/`
- **ConsultorIA**: Requiere `examples.json` y `schema.txt` configurados
- **Lazy Loading**: Los modelos se cargan solo cuando se necesitan
- **Concurrencia**: Mejor manejo con APIs vs modelo local

### Variables de Entorno
- **Principal**: `.env` en la raíz del proyecto (Django)
- **LLM Gateway**: `services/llm_gateway/.env` (APIs opcionales)
- **Prioridad**: Variables del sistema > .env del gateway > .env principal

### Troubleshooting

**ImportError: No module named 'llm_gateway'**
```python
# En settings.py
import sys
sys.path.insert(0, str(BASE_DIR / 'services'))
```

**No hay providers disponibles**
```bash
# Configurar al menos una API o verificar modelo local
cd services/llm_gateway
python test.py
```

**Errores de memoria**
```bash
# Usar APIs en lugar de modelo local
# O reducir workers de Django/Gunicorn
```

---

## Documentación Adicional

### LLM Gateway
- `services/llm_gateway/README.md` - Documentación completa
- `services/llm_gateway/INDEX.md` - Índice de toda la documentación
- `services/llm_gateway/QUICKSTART.md` - Inicio rápido en 5 minutos
- `services/llm_gateway/MODELS.md` - Modelos disponibles por provider
- `services/llm_gateway/ENV_GUIDE.md` - Guía de variables de entorno

### Servicios
- `services/chat_service_updated/MIGRATION.md` - Migrar servicio chat
- `services/consultor_service_updated/MIGRATION.md` - Migrar consultorIA
- `services/consultor_service_updated/README.md` - ConsultorIA modular

---

## Changelog

### v2.0.0 (2025-01)
- ✨ **Nuevo**: LLM Gateway centralizado con soporte multi-provider
- ✨ **Nuevo**: Soporte para APIs de OpenAI, Anthropic y Google Gemini
- ♻️ **Refactor**: Servicio chat ahora usa LLM Gateway
- ♻️ **Refactor**: ConsultorIA completamente modularizado (7 módulos)
- 🔧 **Optimización**: Reducción de consumo de RAM de 8GB+ a ~100MB (con APIs)
- 🔧 **Mejora**: Fallback automático entre providers
- 🔧 **Mejora**: Lazy loading de modelo local
- 📝 **Docs**: 10+ guías de documentación agregadas

### v1.0.0 (2024)
- Versión inicial del backend
- Sistema de cuentas contables
- Transacciones contables
- Chat RAG con modelo local
- ConsultorIA para SQL
- Dashboard y estadísticas

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0.0
