# Mosaite

**Mosaite** es un sistema de registro contable moderno, desarrollado como proyecto académico, que permite a los usuarios gestionar sus movimientos contables desde una interfaz web centralizada. Además, incorpora un modelo de lenguaje (LLM) paa realizar consultas semánticas y acceder a información contable usando lenguaje natural.

<img src="./frontend/front/src/assets/logo.png" alt="Logo Mosaite" width=auto>

---

>[!IMPORTANT]
> En este README.md solo se tratarán algunas cuestiones generales del proyecto, ya que al estar dividido en partes que pueden funcionar por separado, se hizo un archivo README.md para cada una de las partes de forma más detallada.

---

## Manual de Usuario

Se ha incluído un [Manual de Usuario](https://github.com/luantorv/mosaite/blob/main/manual/main.pdf) hecho en LaTeX donde se explicarán en detalles distintas cuestiones relacionadas a la instalación y configuración del sistema, como también del modo de uso.

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
- mysqlclient (2.2.7)

### ConsultorIA (Módulo de IA)

- Python (3.12.7)
- llama-cpp-python (0.3.16)
- sentence-transformers (5.1.0)
- Gemma-3n-E4B-it-Q4_K_M

### FrontEnd:

- NodeJS (24.7.0)
- React (19.1.1)
- Axios (1.11.0)
- BootStrap (5.3.7)

### Otros:

- MariaDB (12.0.2)
- TeXLive (3.141592653)

>[!CAUTION]
> Estas son las versiones en las que fueron hechas y probadas todas las funcionalidades del proyecto, podría no llegar a funcionar en otras versiones o configuraciones.

---

## Funcionalidades

- ConsultarIA _(el módulo de IA)_ ya funciona, falta hacer el resto.
- Daily _(el módulo de creación de libros diarios en PDF)_ ya está listo para su implementación.
- Hay un POC básico, para utilizar.
- Ya hay algo del frontend hecho.
- El login está implementado, pero hay que arreglar errores.

---

## Prueba de Concepto (POC):

Se agregó una versión duplicada del frontend (React + Bootstrap) con funcionalidades simuladas. 

Sirve solo para mostrar el flujo y la apariencia: no hay lógica real detrás de los botones ni llamadas a API.

>[!IMPORTANT]
> No usar en producción.

---

## Por hacer

- La Base de Datos y el backend completos.

- Terminar el frontend.

- Complementar la integración de back y front.

- Terminar el POC.

- Terminar el manual de usuario.

- En algún momento implementar NGINX para manejar la comunicacíon del proyecto.

---

## Estrucutra del Proyecto

```
mosaite/
|   backend/
|   |   accounts/
|   |   |   migrations/
|   |   |   |   __init__.py
|   |   |   __init__.py
|   |   |   admin.py
|   |   |   apps.py
|   |   |   models.py
|   |   |   tests.py
|   |   |   views.py
|   |   backapi/
|   |   |   __init__.py
|   |   |   asgi.py
|   |   |   settings.py
|   |   |   urls.py
|   |   |   wsgi.py
|   |   consultorIA/
|   |   |   core/
|   |   |   |   gemma-3n-E4B-it-Q4_K_M.gguf
|   |   |   __init__.py
|   |   |   example.py
|   |   |   examples.json
|   |   |   main.py
|   |   |   schema.txt
|   |   daily/
|   |   |   __init__.py
|   |   |   main.py
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
|   |   |   |   |   |   CuentaCrear.js
|   |   |   |   |   |   DashboardHome.js
|   |   |   |   |   |   EstadisticasPanel.js
|   |   |   |   |   |   index.js
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
|   .env
|   .gitignore
|   README.md
```

>[!CAUTION]
> Para el desarrollo de este proyecto se uso `gemma-3n-E4B-it-Q4_K_M.gguf` como IA/LLM para el módulo `consultorIA`.
>
> Es necesario que esté el archivo **.GGUF** en `mosaite/backend/mosaite/consultorIA/core/`.
>
> Para más infomación (Hugging Face): [unsloth/gemma-3n-E4B-it-GGUF](https://huggingface.co/unsloth/gemma-3n-E4B-it-GGUF)

>[!IMPORTANT]
> Las carpetas `consultorIA` y `daily` dentro del backend están ubicadas de forma temporal hasta que se creen las apps de Django correspondientes.

---

## Licencia

Este proyecto es de uso libre para fines académicos. Para otros usos contactar al autor.

---

## Autor

Luis Antonio Reis Viera

### Contacto:

- Mail: `luantorv@gmail.com`
