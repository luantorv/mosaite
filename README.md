# Mosaite

**Mosaite** es un sistema de registro contable moderno, desarrollado como proyecto académico, que permite a los usuarios gestionar sus movimientos contables desde una interfaz web centralizada. Además, incorpora un modelo de lenguaje (LLM) paa realizar consultas semánticas y acceder a información contable usando lenguaje natural.

<img src="./frontend/front/src/assets/logo.png" alt="Logo Mosaite" width=auto>

---

>[!IMPORTANT]
> En este README.md solo se tratarán algunas cuestiones generales del proyecto, ya que al estar dividido en partes que pueden funcionar por separado, se hizo un archivo README.md para cada una de las partes de forma más detallada.

## Tecnologías Utilizadas

### BackEnd:

- Python 
- Django 
- Django REST FrameWork
- MySQL

### ConsultorIA (Módulo de IA)

- Python
- llama.cpp
- sentence-transformers
- Gemma-3n-E4B-it-Q4_K_M

### FrontEnd:

- React
- BootStrap

### Otros:

---

## Funcionalidades

- ConsultarIA _(el módulo de IA)_ ya funciona, falta hacer el resto.
- Ya hay algo del frontend hecho.

---

## Estrucutra del Proyecto

```
mosaite/
|   backend/
|   |   backapi/
|   |   |   __init__.py
|   |   |   asgi.py
|   |   |   settings.py
|   |   |   urls.py
|   |   |   wsgi.py
|   |   mosaite/
|   |   |   consultorIA/
|   |   |   |   core/
|   |   |   |   |   gemma-3n-E4B-it-Q4_K_M.gguf
|   |   |   |   example.py
|   |   |   |   examples.json
|   |   |   |   main.py
|   |   |   |   schema.txt
|   |   |   migrations/
|   |   |   |   __init__.py
|   |   |   __init__.py
|   |   |   admin.py
|   |   |   apps.py
|   |   |   models.py
|   |   |   tests.py
|   |   |   views.py
|   |   manage.py
|   |   README.md
|   frontend/
|   |   public/
|   |   |   icon.png
|   |   |   index.html
|   |   |   manifest.json
|   |   |   robots.txt
|   |   src/
|   |   |   assets/
|   |   |   |   icon.png
|   |   |   |   logo.png
|   |   |   components/
|   |   |   |   Content.js
|   |   |   |   Dashboard.js
|   |   |   |   Login.js
|   |   |   |   ProtectedRoute.js
|   |   |   |   Searchbar.js
|   |   |   |   SideBar.js
|   |   |   |   SidebarMenu.js
|   |   |   |   ThemeToggle.js
|   |   |   |   UserMenu.js
|   |   |   context/
|   |   |   |   AuthContext.js
|   |   |   |   ThemeContext.js
|   |   |   App.css
|   |   |   App.js
|   |   |   App.test.js
|   |   |   index.css
|   |   |   index.js
|   |   |   reportWebVitals.js
|   |   |   setupTests.js
|   |   .gitignore
|   |   package-lock.json
|   |   package.json
|   |   README.md
|   .env
|   .gitignore
|   README.md
```

>[!CAUTION]
> Para el desarrollo de éste proyecto se uso `gemma-3n-E4B-it-Q4_K_M.gguf` como IA/LLM para el módulo `consultorIA`.
>
> Es necesario que esté el archivo **.GGUF** en `mosaite/backend/mosaite/consultorIA/core/`.
>
> Para más infomación (Hugging Face): [unsloth/gemma-3n-E4B-it-GGUF](https://huggingface.co/unsloth/gemma-3n-E4B-it-GGUF)

---

## Consultas por Lenguaje Natural

El sistema permitirá a los usuarios hacer preguntas como:

> _"¿Cuánto gasté en proveedores en abril?"_

Y obterner respuestas automáticas usando un modelo de lenguaje que interpreta la intensión y busca los datos contables correspondientes.

> **Estado:** Está listo para implementarlo en el backend _(todavía no está hecho el backend)_.

## Por hacer

- La Base de Datos y el backend completos.

- Terminar el frontend.

- Complementar la integración de back y front.

- En algún momento implementar NGINX para manejar la comunicacíon del proyecto.

## Licencia

Este proyecto es de uso libre para fines académicos. Para otros usos contactar al autor.

## Autor

Luis Antonio Reis Viera

### Contacto:

- Mail: `luantorv@gmail.com`