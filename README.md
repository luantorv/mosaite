# Mosaite

**Mosaite** es una plataforma interactiva para la **enseñanza y práctica de la contabilidad básica**.

Permite registrar asientos contables, generar libros diarios y explorar conceptos clave desde una interfaz web intuitiva.

Además, incluye herramientas basadas en lenguaje natural —como búsquedas y un asistente contable (RAG)— que ayudan a comprender el porqué de cada registro y a reforzar el aprendizaje.

Mosaite está diseñado para su uso tanto individual como en entornos educativos, permitiendo que profesores y estudiantes trabajen sobre el mismo sistema.

<img src=https:github.com/luantorv/mosaite/blob/main/frontend/front/src/assets/logo.png alt="Logo Mosaite" width=auto>

---

>[!IMPORTANT]
> En este README.md solo se tratarán algunas cuestiones generales del proyecto, ya que al estar dividido en partes que pueden funcionar por separado, se hizo un archivo README.md para cada una de las partes de forma más detallada.

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
python3 main.py
# o si ya está configurado:
./main.py
```

---

## Manual de Usuario

Se ha incluído un [Manual de Usuario](https://github.com/luantorv/mosaite/blob/main/manual/main.pdf) hecho en LaTeX donde se explicarán en detalle distintas cuestiones relacionadas a la instalación y configuración del sistema, como también del modo de uso.

En éste repositorio también se dejarán los archivos `.tex` para quien quiera verlos y/o compilarlos, así como el `.pdf` correspondiente para su lectura.

---

## Consultas por Lenguaje Natural

El sistema permitirá a los usuarios hacer preguntas como:

> _"¿Cuánto gasté en proveedores en abril?"_

Y obterner respuestas automáticas usando un modelo de lenguaje que interpreta la intensión y busca los datos contables correspondientes.

> **Estado:** Está listo para implementarlo en el backend _(todavía no está hecho el backend)_.

---

## Tecnologías Utilizadas

### BackEnd:

- Python (3.12.7)
- Django (5.2.4)
- Django REST FrameWork (3.16.0)
- llama-cpp-python (0.3.16)
- sentence-transformers (5.1.0)
- Gemma-3n-E4B-it-Q4_K_M

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

- ConsultarIA _(el módulo de IA)_ ya funciona, implementarlo.
- Daily _(el módulo de creación de libros diarios en PDF)_ ya está listo para su implementación.
- Hay un POC para utilizar (No terminado).
- Ya hay algo del frontend hecho (No terminado).
- El login está implementado, pero tiene errores (Falta corregir).

---

## Prueba de Concepto (POC):

Se agregó una versión duplicada del frontend con funcionalidades simuladas. 

Sirve solo para mostrar el flujo y la apariencia: no hay lógica real detrás de los botones ni llamadas a la API.

>[!IMPORTANT]
> No usar en producción.

---

## Por hacer

- La Base de Datos y el backend completos.

- Terminar el frontend _(en progreso)_.

- Complementar la integración de back y front.

- Terminar el POC _(en progreso)_.

- Terminar el manual de usuario.

- Implementar un RAG para el uso del sistema y cuestiones contables _(en progreso)_.

- En algún momento implementar NGINX y dockerizar la solución.

---

## Estrucutra del Proyecto

```
mosaite/
|   backend/
|   |   apps/
|   |   |   accounts/
|   |   |   |   migrations/
|   |   |   |   |   __init__.py
|   |   |   |   __init__.py
|   |   |   |   admin.py
|   |   |   |   apps.py
|   |   |   |   models.py
|   |   |   |   tests.py
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
|   |   |   |   __init__.py
|   |   |   consultorIA/
|   |   |   |   core/
|   |   |   |   |   gemma-3n-E4B-it-Q4_K_M.gguf
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
|   |   |   |   |   Content.js
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
|   |   |   |   |   authService.js
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
