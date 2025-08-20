# ConsultorIA

Este proyecto implementa un **módulo de IA para transformar preguntas en lenguaje natural en consultas SQL válidas**.  
La solución está pensada para funcionar de manera local utilizando modelos LLM en formato **GGUF** (compatibles con [llama.cpp](https://github.com/ggerganov/llama.cpp) y librerías derivadas como `llama-cpp-python`).

## 🚀 Características principales

- Conversión de preguntas en lenguaje natural a consultas SQL (`SELECT`).
- Validación automática de la consulta generada:
  - Rechaza consultas que intenten modificar la base de datos (`INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, etc.).
  - Responde con mensajes de error detallados según el tipo de instrucción inválida.
- Modularidad:
  - Ejemplos NL → SQL gestionados desde `example.json`.
  - Esquema de la base de datos cargado dinámicamente desde un archivo `.txt` externo.
- Uso de dos modelos:
  1. **Modelo pequeño**: para seleccionar ejemplos de referencia.
  2. **Modelo grande**: para refinar y generar la consulta final.

## Estructura del proyecto

```
ConsultorIA
├── core/               # Carpeta contenedora del archivo GGUF
├── model-ia/           # Carpeta del entorno virtual
├── example.json        # Ejemplos de preguntas y consultas SQL
├── pipeline.py         # Código principal del módulo
├── README.md           # Documentación
├── schema.txt          # Esquema de la base de datos (editable)
├── test.py             # Pequeño test de los modelos por consola

````

>[!IMPORTANT]
> Los modelos `.gguf` **no están incluidos** en este repositorio.  
> Cada usuario debe descargar o preparar sus propios modelos y especificar la ruta en el código.

## Instalación

1. Clonar este repositorio:

```bash
git clone https://github.com/luantorv/mosaite
cd mosaite/consultorIA/
````

2. Instalar dependencias de Python:

```bash
pip install -r requirements.txt
```

3. Descargar modelos en formato `.gguf` y colocarlos en el directorio `./core/`.

## Configuración

* **Ruta del modelo**: se define en el código (`MODEL_PATH`).
* **Esquema de la base de datos**: se carga desde `schema.txt`.

Ejemplo:

```
Tabla clientes (id_cliente, nombre, email)
Tabla pedidos (id_pedido, id_cliente, fecha, total)
```

* **Ejemplos de referencia**: almacenados en `example.json`.
  
Ejemplo:

```json
[
  {
    "pregunta": "Listar todos los clientes",
    "sql": "SELECT * FROM clientes;"
  },
  {
    "pregunta": "Obtener pedidos de enero 2024",
    "sql": "SELECT * FROM pedidos WHERE fecha BETWEEN '2024-01-01' AND '2024-01-31';"
  }
]
```

## Uso

La función `generar_sql` es la que generaliza la funcionalidad de todo el módulo.

### La función `generar_sql`

Toma como único argumento un string que será tomado como la pregunta en lenguaje natural a convertir a SQL.

Devuelve un diccionario de la siguiente estructura:

```json
{
  "valida": bool,
  "codigo": int,
  "consulta": str,
  "error_tecnico": str,
  "error_usuario": str
}
```

El campo `valida` indica mediante un valor booleano si se detecó algún error (True -> Error, Falso -> No Error).

El campo `codigo` indica que caso se produjo al validar la salida del modelo.

En el campo `consulta` se pasará el SQL resultante en caso de que `valida == False` o un string vacío si `valida == True`

Los campos `error_tecnico` y `error_usuario` son esencialmente lo mismo, con la diferencia de que `error_tecnico` tiene descripciones más detalladas del error y `error_usuario` es más simple.

### Ejemplo de uso:

```python
from pipeline import generar_sql

pregunta = "¿Qué clientes hicieron pedidos en enero de 2024?"
sql = generar_sql(pregunta)

print("Consulta generada:")
print(sql)
```

#### Salida esperada:

```sql
SELECT c.nombre, c.email
FROM clientes c
JOIN pedidos p ON c.id_cliente = p.id_cliente
WHERE p.fecha BETWEEN '2024-01-01' AND '2024-01-31';
```

## Validación de consultas

La función `validar_sql(sql)` clasifica las consultas en:

* **Caso 0** → Se detecta `CREATE`, `ALTER`.
* **Caso 1** → Se detecta `UPDATE`, `INSERT`.
* **Caso 2** → Se detecta `DELETE`, `DROP`.
* **Caso 3** → Se detecta `SELECT` inválido.
* **Caso -1** → SQL válido (`SELECT`).

Ejemplo:

```python
from pipeline import validar_sql

print(validar_sql("DROP TABLE clientes;"))
# (False, "Error caso 0: se detectó intento de creación o eliminación de estructuras (DROP/ALTER/CREATE).")
```

## Test

El módulo contiene un pequeño test por consola el cuál pueda usar para probar de forma rápida como funciona el módulo.

## Limitaciones

* Este módulo **solo genera y valida consultas de lectura (`SELECT`)**.
* No se incluyen los modelos `.gguf` por temas de licencia y tamaño. Deben ser descargados o entrenados por el usuario.
* La calidad de los resultados depende del modelo usado y de los ejemplos de referencia.

## Licencia

Este proyecto es de uso libre para fines académicos. Para otros usos contactar al autor.
