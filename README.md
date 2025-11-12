# Mosaite

**Mosaite** es una plataforma interactiva para la **enseñanza y práctica de la contabilidad básica**.

Permite registrar asientos contables, generar libros diarios y explorar conceptos clave desde una interfaz web intuitiva.

Además, incluye herramientas basadas en lenguaje natural —como búsquedas y un asistente contable (RAG)— que ayudan a comprender el porqué de cada registro y a reforzar el aprendizaje.

Mosaite está diseñado para su uso tanto individual como en entornos educativos, permitiendo que profesores y estudiantes trabajen sobre el mismo sistema.

<img src="./frontend/front/src/assets/logo.png" alt="Logo Mosaite" width=auto>

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/luantorv/mosaite)

---

>[!IMPORTANT]
> En este README.md solo se tratarán algunas cuestiones generales del proyecto, ya que al estar dividido en partes que pueden funcionar por separado, se hizo un archivo README.md para cada una de las partes de forma más detallada.

---

## Instalación del Proyecto

1. Tener instaladas las dependencias:

- [Python](https://www.python.org/downloads/)
- [NodeJS](https://nodejs.org/es/download)
- [TeXLive](https://www.tug.org/texlive/acquire-netinstall.html)

2. Clonar el repositorio:

```bash
git clone https://github.com/luantorv/mosaite.git
```

>[!TIP]
> Se recomienda eliminar la carpeta `.git` que se creará:
>
> ```bash
> rm -rf .git
> ```

3. Instalar las librerías para el backend:

```bash
# Instalar virtualenv si no lo tiene instalado
pip install virtualenv

# Cambiar a la carpeta del backend
cd ./backend

# Crear el entorno virtual
python venv -m venv

# Activar el entorno virtual
source venv/bin/activate # En Linux/MacOS
.venv/Scripts/activate # En Windows

# Instalar las librerías mediante pip
pip install -r requirements.txt
```

4. Migrar los modelos a la base de datos y crear el superusuario de Django:

```bash
# Crear las migraciones
python manage.py makemigrations

# Realizar las migraciones
python manage.py migrate

# Crear el superusuario de Django
python manage.py createsuperuser 
```

5. Instalar las librerías del frontend mediante npm:

```bash
# Cambiar a la carpeta del frontend
cd .. && cd ./frontend/front/

# Instalar las librerías
npm install
```

>[!TIP]
> Es recomendable crear una versión optimizada:
>
> ```bash
> npm run build
> npm install -g serve
> ```

## Levantar el Proyecto

1. Abrir una terminal en la carpeta del backend y hacer:

```bash
python manage.py runserver 0.0.0.0:8000
```

2. Abrir una segunda terminal en la carpeta del frontend y hacer:

```bash
# Si creaste la version optimizada
serve -s build

# Sino
npm start
```

3. En la terminal aparecerá algo como:

```txt
You can now view front in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://*.*.*.*:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Haciendo Ctrl+Click en el primer link podrá acceder al proyecto, de igual forma las máquinas dentro de la misma red prodrán acceder al proyecto usando el segundo enlace.

>[!CAUTION]
> La aplicación se sirve en 0.0.0.0, lo que permite acceder desde otros dispositivos dentro de la LAN (por ejemplo: http://192.168.x.x:3000).
>
> Sin embargo, algunos routers o puntos de acceso tienen activada la opción `AP Isolation` / `Client Isolation`, que bloquea la comunicación entre dispositivos conectados a la misma red WiFi.
>
> Si no podés acceder desde otro dispositivo aún estando en la misma red, probablemente sea por esta configuración del router.

---

## Gestor de Proyecto TUI (Terminal User Interface)

Se ha implementado un gestor de proyecto interactivo basado en una Interfaz de Usuario por Terminal (TUI) utilizando la librería Textual de Python. Esta herramienta simplifica el proceso de instalación, configuración y ejecución del proyecto Mosaite, eliminando la necesidad de comandos manuales en la consola.

### Funcionalidades Principales

El TUI guía al usuario a través de los siguientes pasos:

- *Verificación de Dependencias:* Chequea automáticamente las versiones de Python, NodeJS y TeXLive instaladas en el sistema para asegurar la compatibilidad.

- *Instalación Inicial:* Gestiona la creación del entorno virtual de Python (venv), la instalación de dependencias de Pip y la inicialización de dependencias de NPM (NodeJS).

- *Gestión de Entornos de Datos:* Permite crear, renombrar y seleccionar entornos de datos separados, definiendo rutas específicas para el archivo SQLite de la base de datos y la carpeta de PDFs generados.

- *Configuración de Django:* Facilita la ejecución de migraciones de base de datos (migrate) y la creación de un Superusuario de Django.

- *Ejecución del Proyecto:* Permite iniciar y detener los servidores de Django (Backend) y React (Frontend) simultáneamente desde una única terminal, mostrando los logs en tiempo real.

### Uso

Para iniciar el gestor TUI, ejecuta el archivo principal del proyecto:

```bash
python3 main.py # en Windows
python main.py # en MacOS o Linux
```

> **Estado:** No terminado.

---

## Manual de Usuario

Se ha incluído un [Manual de Usuario](https://github.com/luantorv/mosaite/blob/main/manual/main.pdf) hecho en LaTeX donde se explicarán en detalle distintas cuestiones relacionadas a la instalación y configuración del sistema, como también del modo de uso.

En éste repositorio también se dejarán los archivos `.tex` para quien quiera verlos y/o compilarlos, así como el `.pdf` correspondiente para su lectura.

> **Estado:** No terminado.

---

## Consultas por Lenguaje Natural

El sistema permitirá a los usuarios hacer preguntas como:

> _"¿Cuánto gasté en proveedores en abril?"_

Y obterner respuestas automáticas usando un modelo de lenguaje que interpreta la intensión y busca los datos contables correspondientes.

> **Estado:** Está listo para implementarlo en el backend _(todavía no está terminado el backend)_.

---

## Tecnologías Utilizadas

### BackEnd:

- Python (3.12.7)
- Django (5.2.4)
- Django REST FrameWork (3.16.0)
- Simple JWT (5.5.1)
- Django CORS Headers (4.9.0)
- llama-cpp-python (0.3.16)
- sentence-transformers (5.1.0)
- faiss-cpu (1.12.0)
- PyTest (9.0.0)
- PyTest-Cov (7.0.0)
- PyTest-Django (4.11.1)
- Meta Llama 3.1 8B

### FrontEnd:

- NodeJS (24.7.0)
- React (19.1.1)
- Axios (1.11.0)
- BootStrap (5.3.7)
- Recharts (3.2.1)

### Otros:

- Textual (6.4.0)
- TeXLive (3.141592653)

>[!CAUTION]
> Estas son las versiones en las que fueron hechas y probadas todas las funcionalidades del proyecto, podría no llegar a funcionar en otras versiones o configuraciones.

---

## Funcionalidades

- ConsultarIA _(el módulo de IA)_ ya funciona, falta implementarlo.
- Daily _(el módulo de creación de libros diarios en PDF)_ ya está listo para su implementación.
- Hay un POC para experimentar el flujo de uso del proyecto.
- Hay un Ayudante basado en LLM/RAG para consultar información contable.
- El frontend está hecho (Falta terminar la integración con el backend).
- El login funciona y hay manejo de usuarios mediante el componente UsuariosLista.js.

---

## Prueba de Concepto (POC):

Se agregó una versión duplicada del frontend con funcionalidades simuladas. 

Sirve solo para mostrar el flujo y la apariencia: no hay lógica real detrás de los botones ni llamadas a la API.

> **Estado:** Terminado.

>[!IMPORTANT]
> No usar en producción.

---

## Por hacer

- Terminar el backend _(en progreso)_.
- Hacer el testing _(en progreso)_.
- Realizar la documentación _(en progreso)_
- Terminar el frontend _(en progreso)_.
- Complementar la integración de back y front _(en progreso)_.
- Terminar el manual de usuario.

---

## Estrucutra del Proyecto

```
mosaite/
|   backend/
|   |   apps/
|   |   |   accounts/
|   |   |   |   data/
|   |   |   |   |   __init__.py
|   |   |   |   |   plan_cuentas_inicial.py
|   |   |   |   management/
|   |   |   |   |   commands/
|   |   |   |   |   |   __init__.py
|   |   |   |   |   |   init_plan_cuentas.py
|   |   |   |   |   __init__.py
|   |   |   |   __init__.py
|   |   |   |   admin.py
|   |   |   |   apps.py
|   |   |   |   models.py
|   |   |   |   serializers.py
|   |   |   |   tests.py
|   |   |   |   urls.py
|   |   |   |   views.py
|   |   |   chat/
|   |   |   |   management/
|   |   |   |   |   commands/
|   |   |   |   |   |   __init__.py
|   |   |   |   |   |   init_chat.py
|   |   |   |   |   |   rebuild_chat_index.py
|   |   |   |   |   __init__.py
|   |   |   |   tests/
|   |   |   |   |   test_chat_models.py
|   |   |   |   |   test_chat_permissions.py
|   |   |   |   |   test_chat_serializers.py
|   |   |   |   |   test_chat_views.py
|   |   |   |   __init__.py
|   |   |   |   admin.py
|   |   |   |   apps.py
|   |   |   |   models.py
|   |   |   |   permissions.py
|   |   |   |   serializers.py
|   |   |   |   tasks.py
|   |   |   |   urls.py
|   |   |   |   views.py
|   |   |   config/
|   |   |   |   tests/
|   |   |   |   |   test_config_middleware.py
|   |   |   |   |   test_config_models.py
|   |   |   |   |   test_config_serializers.py
|   |   |   |   |   test_config_views.py
|   |   |   |   __init__.py
|   |   |   |   admin.py
|   |   |   |   apps.py
|   |   |   |   middleware.py
|   |   |   |   models.py
|   |   |   |   serializers.py
|   |   |   |   urls.py
|   |   |   |   views.py
|   |   |   trans/
|   |   |   |   __init__.py
|   |   |   |   admin.py
|   |   |   |   apps.py
|   |   |   |   models.py
|   |   |   |   permissions.py
|   |   |   |   serializers.py
|   |   |   |   urls.py
|   |   |   |   views.py
|   |   |   users/
|   |   |   |   tests/
|   |   |   |   |   test_users_models.py
|   |   |   |   |   test_users_serializers.py
|   |   |   |   |   test_users_views.py
|   |   |   |   __init__.py
|   |   |   |   admin.py
|   |   |   |   apps.py
|   |   |   |   models.py
|   |   |   |   permissions.py
|   |   |   |   urls.py
|   |   |   |   utils.py
|   |   |   |   views.py
|   |   config/
|   |   |   __init__.py
|   |   |   asgi.py
|   |   |   settings.py
|   |   |   urls.py
|   |   |   wsgi.py
|   |   services/
|   |   |   chat/
|   |   |   |   data/
|   |   |   |   |   manual_cuentas.md
|   |   |   |   |   SIC1.md
|   |   |   |   __init__.py
|   |   |   |   config.py
|   |   |   |   embedder.py
|   |   |   |   init_index.py
|   |   |   |   llm.client.py
|   |   |   |   rag_service.py
|   |   |   |   vector_store.py
|   |   |   consultorIA/
|   |   |   |   core/
|   |   |   |   |   Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf
|   |   |   |   __init__.py
|   |   |   |   example.py
|   |   |   |   examples.json
|   |   |   |   main.py
|   |   |   |   schema.txt
|   |   |   daily/
|   |   |   |   __init__.py
|   |   |   |   main.py
|   |   manage.py
|   |   README.md
|   |   requirements.txt
|   frontend/
|   |   front/
|   |   |   public/
|   |   |   |   icon.png
|   |   |   |   index.html
|   |   |   |   logo.png
|   |   |   |   manifest.json
|   |   |   |   robots.txt
|   |   |   src/
|   |   |   |   assets/
|   |   |   |   |   icon.png
|   |   |   |   |   logo.png
|   |   |   |   components/
|   |   |   |   |   Content/
|   |   |   |   |   |   Chat.js
|   |   |   |   |   |   Configuracion.js
|   |   |   |   |   |   CuentaCrear.js
|   |   |   |   |   |   DashboardHome.js
|   |   |   |   |   |   index.js
|   |   |   |   |   |   LibroDiarioCard.js
|   |   |   |   |   |   LibroDiarioBuscar.js
|   |   |   |   |   |   LibroDiarioCrear.js
|   |   |   |   |   |   LibroDiariosRecientes.js
|   |   |   |   |   |   TransaccionBuscar.js
|   |   |   |   |   |   TransaccionCard.js
|   |   |   |   |   |   TransaccionCrear.js
|   |   |   |   |   |   TransaccionRecientes.js
|   |   |   |   |   |   UsuariosLista.js
|   |   |   |   |   Dashboard.js
|   |   |   |   |   Login.js
|   |   |   |   |   LogoutButton.js
|   |   |   |   |   ProtectedRoute.js
|   |   |   |   |   Searchbar.js
|   |   |   |   |   SideBar.js
|   |   |   |   |   SidebarMenu.js
|   |   |   |   |   ThemeToggle.js
|   |   |   |   |   UserMenu.js
|   |   |   |   context/
|   |   |   |   |   AuthContext.js
|   |   |   |   |   ThemeContext.js
|   |   |   |   services/
|   |   |   |   |   AccountService.js
|   |   |   |   |   api.js
|   |   |   |   |   AuthService.js
|   |   |   |   |   ChatService.js
|   |   |   |   |   ConfigService.js
|   |   |   |   |   TransactionService.js
|   |   |   |   |   UserService.js
|   |   |   |   App.css
|   |   |   |   App.js
|   |   |   |   App.test.js
|   |   |   |   index.css
|   |   |   |   index.js
|   |   |   |   reportWebVitals.js
|   |   |   |   setupTests.js
|   |   |   .gitignore
|   |   |   package-lock.json
|   |   |   package.json
|   |   |   README.md
|   manual/
|   |   cap/
|   |   |   cap1.tex
|   |   |   cap2.tex
|   |   img/
|   |   |   logo.png
|   |   other/
|   |   |   intro.tex
|   |   |   portada.tex
|   |   main.pdf
|   |   main.tex
|   POC/
|   |   front/
|   |   |   public/
|   |   |   |   icon.png
|   |   |   |   index.html
|   |   |   |   manifest.json
|   |   |   |   logo.png
|   |   |   |   robots.txt
|   |   |   src/
|   |   |   |   assets/
|   |   |   |   |   icon.png
|   |   |   |   |   logo.png
|   |   |   |   components/
|   |   |   |   |   Content/
|   |   |   |   |   |   Chat.js
|   |   |   |   |   |   Configuracion.js
|   |   |   |   |   |   CuentaCrear.js
|   |   |   |   |   |   DashboardHome.js
|   |   |   |   |   |   index.js
|   |   |   |   |   |   LibroDiarioCard.js
|   |   |   |   |   |   LibroDiarioBuscar.js
|   |   |   |   |   |   LibroDiarioCrear.js
|   |   |   |   |   |   LibroDiariosRecientes.js
|   |   |   |   |   |   TransaccionBuscar.js
|   |   |   |   |   |   TransaccionCard.js
|   |   |   |   |   |   TransaccionCrear.js
|   |   |   |   |   |   TransaccionRecientes.js
|   |   |   |   |   |   UsuariosLista.js
|   |   |   |   |   Dashboard.js
|   |   |   |   |   Login.js
|   |   |   |   |   LogoutButton.js
|   |   |   |   |   ProtectedRoute.js
|   |   |   |   |   Searchbar.js
|   |   |   |   |   SideBar.js
|   |   |   |   |   SidebarMenu.js
|   |   |   |   |   ThemeToggle.js
|   |   |   |   |   UserMenu.js
|   |   |   |   context/
|   |   |   |   |   AuthContext.js
|   |   |   |   |   ThemeContext.js
|   |   |   |   App.css
|   |   |   |   App.js
|   |   |   |   App.test.js
|   |   |   |   index.css
|   |   |   |   index.js
|   |   |   |   reportWebVitals.js
|   |   |   |   setupTests.js
|   |   |   .gitignore
|   |   |   package-lock.json
|   |   |   package.json
|   |   |   README.md
|   tui/
|   |   __init__.py
|   |   app.py
|   |   constants.py
|   |   logic.py
|   |   README.md
|   |   screens.py
|   .env
|   .gitignore
|   main.py
|   main.tcss
|   README.md
```

---

## Licencia

Este proyecto es de uso libre para fines académicos y de investigación. Para otros usos contactar al autor.

---

## Autor

### Luis Antonio Reis Viera

*Estudiante de la Tecnicatura Superior en Ciencia de Datos e Inteligencia Articial | [Instituto Superior de Formación Docente y Técnica.](https://web.esim.edu.ar/)*

*Este proyecto fue desarrollado como parte de las materias Práctica Profesionalizante I e Inteligencia Artificial de 1er Año.*

### Contacto:

- **Mail**: `luantorv@gmail.com`
- **GitHub**: [luantorv](https://github.com/luantorv)
