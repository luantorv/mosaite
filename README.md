# Mosaite

**Mosaite** es un sistema de registro contable moderno, desarrollado como proyecto académico, que permite a los usuarios gestionar sus movimientos contables desde una interfaz web centralizada. Además, incorpora un modelo de lenguaje (LLM) paa realizar consultas semánticas y acceder a información contable usando lenguaje natural.

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

### Otros:

---

## Funcionalidades

- ConsultarIA _(el módulo de IA)_ ya funciona _relativamente_ bien, falta hacer más prubas y añadir una validación de salida para integrarlo al backend.

---

## Estrucutra del Proyecto

```
mosaite/
|   backend/
|   |   back-api/
|   |   README.md
|   consultorIA/
|   |   core/
|   |   |   gemma-3n-E4B-it-Q4_K_M.gguf
|   |   model-ia/
|   |   examples.json
|   |   pipeline.py
|   |   schema.txt
|   |   test.py
|   frontend/
|   |   public/
|   |   src/
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
> Es necesario que esté el archivo **.GGUF** en `mosaite/consultorIA/core/`.
> Para más infomación (Hugging Face): [unsloth/gemma-3n-E4B-it-GGUF](https://huggingface.co/unsloth/gemma-3n-E4B-it-GGUF)

---

## Consultas por Lenguaje Natural

El sistema permitirá a los usuarios hacer preguntas como:

> _"¿Cuánto gasté en proveedores en abril?"_

Y obterner respuestas automáticas usando un modelo de lenguaje que interpreta la intensión y busca los datos contables correspondientes.

> **Estado:** Hay un test disponible de una versión utilizable, pero falta hacer validaciones de salida para poder implementarlo en el backend.

## Por hacer

- El backend y el frontend solo tienen una estructura básica.

- Hacer validaciones de salida de consultorIA.

## Licencia

Este proyecto es de uso libre para fines académicos. Para otros usos contactar al autor.

## Autor

Luis Antonio Reis Viera - Estudiante