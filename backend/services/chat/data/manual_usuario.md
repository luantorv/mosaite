# Manual de Usuario - Mosaite

## Índice

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Inicio de Sesión](#inicio-de-sesión)
4. [Interfaz Principal](#interfaz-principal)
5. [Configuración del Sistema](#configuración-del-sistema)
6. [Gestión del Plan de Cuentas](#gestión-del-plan-de-cuentas)
7. [Gestión de Usuarios](#gestión-de-usuarios)
8. [Registro de Transacciones](#registro-de-transacciones)
9. [Validación de Transacciones](#validación-de-transacciones)
10. [Búsqueda de Transacciones](#búsqueda-de-transacciones)
11. [Libros Diarios](#libros-diarios)
12. [Dashboard](#dashboard)
13. [Asistente Contable (Chat RAG)](#asistente-contable-chat-rag)
14. [Búsqueda por Lenguaje Natural (ConsultorIA)](#búsqueda-por-lenguaje-natural-consultoria)
15. [Roles y Permisos](#roles-y-permisos)
16. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

Mosaite es una plataforma web educativa diseñada para la enseñanza y práctica de la contabilidad básica. Permite registrar asientos contables, generar libros diarios en formato PDF y consultar información teórica mediante herramientas basadas en inteligencia artificial.

### ¿Qué puedo hacer con Mosaite?

- Registrar operaciones contables mediante asientos
- Validar y cerrar transacciones
- Generar libros diarios en formato PDF
- Buscar transacciones por diferentes criterios
- Consultar información teórica sobre contabilidad
- Realizar búsquedas en lenguaje natural sobre tus datos contables
- Visualizar estadísticas de actividad en el dashboard

### ¿Para quién está pensado Mosaite?

Mosaite está diseñado para su uso en entornos educativos, tanto para estudiantes que están aprendiendo contabilidad básica como para profesores que supervisan el proceso de aprendizaje. También puede utilizarse en un modo empresarial simulado para práctica más avanzada.

---

## Primeros Pasos

### Configuración Inicial del Sistema

Antes de comenzar a usar Mosaite, el administrador del sistema debe realizar una configuración inicial. Esta configuración se realiza una sola vez y establece los parámetros básicos de funcionamiento.

#### Aspectos a configurar inicialmente:

1. **Modo de operación del sistema**: Educativo o Empresarial
2. **Formato de fecha**: Cómo se mostrarán las fechas en todo el sistema
3. **Moneda**: La moneda que se utilizará para todos los registros contables
4. **Plan de cuentas**: Revisar y ajustar el plan de cuentas predeterminado si es necesario

Nota: El formato de fecha y la moneda pueden modificarse posteriormente, pero se recomienda definirlos correctamente desde el inicio para mantener la consistencia en los registros.

### Creación de Usuarios

El administrador debe crear las cuentas de usuario para todos los participantes del sistema. No existe un registro público, por lo que todos los usuarios deben ser dados de alta manualmente.

En modo educativo, el profesor crea las cuentas de los estudiantes. En modo empresarial, el administrador crea las cuentas según los roles necesarios.

---

## Inicio de Sesión

### Acceso al Sistema

Para acceder a Mosaite, ingrese la URL proporcionada por su institución o administrador en su navegador web. Típicamente será algo como:

```
http://192.168.x.x:3000
```

La dirección exacta dependerá de la configuración de red local donde esté desplegado el sistema.

### Credenciales de Acceso

Utilice las credenciales proporcionadas por su profesor o administrador del sistema:

- **Usuario**: Su nombre de usuario asignado
- **Contraseña**: La contraseña que le fue proporcionada o que haya configurado

### Primer Inicio de Sesión

Al ingresar por primera vez al sistema, se recomienda:

1. Verificar que sus datos de perfil sean correctos
2. Familiarizarse con la interfaz principal
3. Revisar los permisos y funcionalidades disponibles según su rol

---

## Interfaz Principal

### Estructura General

La interfaz de Mosaite está organizada en las siguientes secciones principales:

#### Barra Superior

Contiene los siguientes elementos:

- **Logo de Mosaite**: Permite regresar a la pantalla principal
- **Barra de búsqueda**: Para buscar transacciones rápidamente
- **Selector de tema**: Cambia entre modo claro y modo oscuro
- **Menú de usuario**: Acceso a configuración de perfil y cierre de sesión

#### Menú Lateral (Sidebar)

El menú lateral proporciona acceso rápido a todas las funcionalidades del sistema:

- **Dashboard**: Vista general con estadísticas y métricas
- **Transacciones**: Gestión de asientos contables
  - Crear Transacción
  - Buscar Transacciones
  - Transacciones Recientes
- **Libros Diarios**: Gestión de libros contables
  - Crear Libro Diario
  - Buscar Libros
  - Libros Recientes
- **Plan de Cuentas**: Administración de cuentas contables
  - Ver Plan de Cuentas
  - Crear Cuenta
- **Usuarios**: Gestión de usuarios (solo administradores)
- **Chat**: Asistente contable inteligente
- **Configuración**: Ajustes del sistema

#### Área de Contenido Principal

Es el espacio central donde se muestra el contenido de la sección seleccionada en el menú lateral.

### Navegación

Para navegar entre secciones, simplemente haga clic en las opciones del menú lateral. El sistema actualizará el contenido principal sin recargar toda la página, proporcionando una experiencia fluida.

### Temas Visuales

Mosaite ofrece dos temas visuales:

- **Tema Claro**: Fondo blanco con texto oscuro, ideal para ambientes bien iluminados
- **Tema Oscuro**: Fondo oscuro con texto claro, reduce la fatiga visual en ambientes con poca luz

Puede cambiar entre temas en cualquier momento usando el selector en la barra superior.

---

## Configuración del Sistema

La sección de Configuración permite ajustar los parámetros generales del sistema. El acceso a esta sección está restringido según los permisos del usuario.

### Parámetros Configurables

#### Modo de Operación

Define si el sistema funciona en modo Educativo o Empresarial. Este parámetro determina:

- Los roles disponibles en el sistema
- La estructura de permisos
- El enfoque de las funcionalidades

**Modo Educativo**: Diseñado para instituciones educativas con roles de Profesor y Estudiante.

**Modo Empresarial**: Incluye roles adicionales como Admin, Manager, Accountant, Operator y Viewer.

Nota: Este parámetro solo puede ser modificado por el administrador del sistema y requiere consideración cuidadosa, ya que afecta el funcionamiento global de la plataforma.

#### Formato de Fecha

Determina cómo se mostrarán las fechas en todo el sistema. Algunos formatos comunes:

- DD/MM/YYYY (día/mes/año)
- MM/DD/YYYY (mes/día/año)
- YYYY-MM-DD (año-mes-día)

Este parámetro puede modificarse después de la configuración inicial, pero se recomienda mantener consistencia en los registros.

#### Moneda

Establece la moneda utilizada para todos los registros contables. Ejemplos:

- ARS (Peso Argentino)
- USD (Dólar Estadounidense)
- EUR (Euro)

La moneda puede modificarse posteriormente, aunque es recomendable definirla correctamente desde el inicio.

#### Plan de Cuentas Inicial

El sistema incluye un plan de cuentas predeterminado que puede ser revisado y ajustado según las necesidades específicas de la institución o práctica contable.

### Cómo Modificar la Configuración

Para usuarios con permisos de administrador:

1. Acceda a la sección **Configuración** desde el menú lateral
2. Revise los parámetros actuales
3. Modifique los valores que desee cambiar
4. Guarde los cambios
5. Verifique que los cambios se reflejen correctamente en el sistema

Advertencia: Cambios en la configuración pueden afectar el funcionamiento del sistema para todos los usuarios. Realice modificaciones con precaución y preferentemente cuando el sistema no esté siendo utilizado activamente.

---

## Gestión del Plan de Cuentas

El Plan de Cuentas es la estructura fundamental de clasificación contable en Mosaite. Define las cuentas disponibles para registrar las operaciones.

### Plan de Cuentas Predeterminado

Mosaite incluye un plan de cuentas inicial basado en estándares contables básicos. Este plan incluye las principales categorías:

- Activo
- Pasivo
- Patrimonio Neto
- Resultados (Ingresos y Egresos)

### Visualización del Plan de Cuentas

Para ver el plan de cuentas completo:

1. Seleccione **Plan de Cuentas** en el menú lateral
2. Haga clic en **Ver Plan de Cuentas**
3. Se mostrará la lista completa de cuentas disponibles con su código, nombre, naturaleza y estado

### Estructura de una Cuenta

Cada cuenta contiene la siguiente información:

- **Código**: Identificador numérico único de la cuenta
- **Nombre**: Denominación descriptiva de la cuenta
- **Naturaleza**: Indica si la cuenta es de naturaleza Deudora o Acreedora
- **Estado**: Activo o Inactivo

### Creación de Nuevas Cuentas

Los usuarios con permisos adecuados pueden agregar nuevas cuentas al plan:

1. Acceda a **Plan de Cuentas** en el menú lateral
2. Seleccione **Crear Cuenta**
3. Complete los campos obligatorios:
   - **Código de cuenta**: Número único que identifica la cuenta
   - **Nombre de la cuenta**: Denominación clara y descriptiva
   - **Naturaleza**: Seleccione Deudora o Acreedora según corresponda
4. Guarde la nueva cuenta

#### Consideraciones al Crear Cuentas:

- El código de cuenta debe ser único en el sistema
- Siga la numeración coherente con el plan de cuentas existente
- La naturaleza debe reflejar el comportamiento contable correcto de la cuenta
- Use nombres descriptivos que faciliten su identificación posterior

### Modificación de Cuentas

Las cuentas una vez creadas no pueden modificarse. Esta restricción existe para mantener la integridad contable del sistema.

Si necesita corregir una cuenta:

1. Desactive la cuenta incorrecta
2. Cree una nueva cuenta con los datos correctos

### Desactivación de Cuentas

En lugar de eliminar cuentas, Mosaite utiliza un sistema de estados:

- **Activo**: La cuenta está disponible para usar en nuevas transacciones
- **Inactivo**: La cuenta no se puede usar en nuevas transacciones pero se mantiene en el sistema por integridad

Para desactivar una cuenta:

1. Acceda a la lista del Plan de Cuentas
2. Identifique la cuenta que desea desactivar
3. Cambie su estado a Inactivo

Nota Importante: Una cuenta que ya ha sido utilizada en transacciones no puede ser eliminada del sistema, solo desactivada. Esto garantiza la integridad histórica de los registros contables.

### Búsqueda de Cuentas

Puede buscar cuentas específicas utilizando:

- Código de cuenta
- Nombre parcial o completo
- Filtros por naturaleza (Deudora/Acreedora)
- Filtros por estado (Activo/Inactivo)

---

## Gestión de Usuarios

La gestión de usuarios permite crear, modificar y administrar las cuentas de acceso al sistema. Esta funcionalidad está restringida a usuarios con permisos administrativos.

### Roles Disponibles

#### En Modo Educativo:

- **Professor**: Equivalente al administrador. Puede crear usuarios, configurar el sistema y supervisar todas las operaciones
- **Student**: Usuario estándar para práctica contable. Puede registrar transacciones y generar libros diarios

#### En Modo Empresarial:

- **Admin**: Control total del sistema
- **Manager**: Rol de supervisión con permisos amplios excepto configuración
- **Accountant**: Encargado de registros contables y libros
- **Operator**: Usuario operativo con permisos de carga básica
- **Viewer**: Solo consulta, sin permisos de modificación

### Creación de Usuarios

Para crear un nuevo usuario:

1. Acceda a **Usuarios** en el menú lateral
2. Seleccione **Crear Usuario**
3. Complete los campos requeridos:
   - **Nombre de usuario**: Identificador único para el inicio de sesión
   - **Correo electrónico**: Email del usuario
   - **Contraseña**: Contraseña inicial (el usuario podrá cambiarla después)
   - **Rol**: Seleccione el rol apropiado según los permisos necesarios
   - **Grupo**: En modo educativo, asigne el grupo o comisión correspondiente
   - **Estado**: Activo o Inactivo
4. Guarde el nuevo usuario

### Visualización de Usuarios

La lista de usuarios muestra:

- Nombre de usuario
- Correo electrónico
- Rol asignado
- Grupo (en modo educativo)
- Estado (Activo/Inactivo)
- Fecha de creación

### Modificación de Usuarios

Para editar la información de un usuario:

1. Acceda a la lista de usuarios
2. Seleccione el usuario que desea modificar
3. Edite los campos permitidos
4. Guarde los cambios

Puede modificar:

- Correo electrónico
- Rol asignado
- Grupo
- Estado

No se puede modificar el nombre de usuario una vez creado.

### Desactivación de Usuarios

En lugar de eliminar usuarios, puede desactivarlos:

1. Acceda a la lista de usuarios
2. Seleccione el usuario
3. Cambie su estado a Inactivo

Los usuarios inactivos no pueden iniciar sesión pero sus registros históricos permanecen en el sistema.

### Restablecimiento de Contraseña

Los administradores pueden restablecer la contraseña de cualquier usuario:

1. Acceda a la información del usuario
2. Seleccione la opción de restablecer contraseña
3. Establezca una nueva contraseña temporal
4. Informe al usuario su nueva contraseña

Se recomienda que el usuario cambie la contraseña temporal en su primer inicio de sesión posterior.

### Grupos y Comisiones

En modo educativo, los usuarios pueden organizarse en grupos o comisiones para facilitar:

- La organización de estudiantes por curso
- La generación de estadísticas segmentadas
- La supervisión por parte de profesores

Para asignar grupos:

1. Al crear o editar un usuario, seleccione el grupo correspondiente
2. Los grupos deben haber sido creados previamente en la configuración

---

## Registro de Transacciones

El registro de transacciones es la funcionalidad central de Mosaite. Permite crear asientos contables siguiendo el principio de partida doble.

### Conceptos Básicos

Una transacción en Mosaite representa un asiento contable que registra un hecho económico. Cada transacción debe cumplir con el principio de partida doble: el total de los débitos debe ser igual al total de los créditos.

#### Componentes de una Transacción:

- **Fecha**: Fecha en que ocurrió la operación
- **Leyenda**: Descripción del hecho económico registrado
- **Entradas**: Conjunto de movimientos que componen el asiento (débitos y créditos)

### Creación de una Nueva Transacción

Para registrar una nueva transacción:

1. Acceda a **Transacciones** en el menú lateral
2. Seleccione **Crear Transacción**
3. Complete los datos del asiento:

#### Datos Generales:

- **Fecha de la transacción**: Seleccione la fecha en que ocurrió la operación
- **Leyenda**: Escriba una descripción clara del hecho económico

#### Entradas del Asiento:

Para cada entrada (línea del asiento):

1. Haga clic en **Agregar Entrada**
2. Seleccione la **Cuenta** del plan de cuentas
3. Ingrese el **Importe**
4. Especifique si es **Debe** o **Haber**
5. Repita para cada línea del asiento

Puede agregar tantas entradas como sean necesarias para el asiento.

#### Verificación de Balance:

El sistema mostrará en tiempo real:

- **Total Debe**: Suma de todos los importes en el debe
- **Total Haber**: Suma de todos los importes en el haber
- **Diferencia**: Indica si el asiento está balanceado

El asiento solo podrá guardarse cuando la diferencia sea cero, es decir, cuando el total del debe sea igual al total del haber.

4. Una vez verificado el balance, haga clic en **Guardar Transacción**

### Estado de las Transacciones

Las transacciones en Mosaite pueden tener tres estados:

#### Por Validar

Estado inicial cuando se crea una transacción. Indica que el asiento ha sido registrado pero aún no ha sido revisado o confirmado.

Características:

- Puede ser editada
- Puede ser eliminada
- No se incluye en libros diarios
- Permite correcciones antes de la validación

#### Validada

Estado intermedio que indica que la transacción ha sido revisada y confirmada como correcta.

Características:

- Ya no puede ser editada
- No puede ser eliminada
- Está lista para ser incluida en un libro diario
- Se considera firme pero aún no cerrada

#### Cerrada

Estado final cuando la transacción ha sido incluida en un libro diario.

Características:

- Forma parte oficial de un libro diario
- No puede ser modificada bajo ninguna circunstancia
- Protegida para mantener integridad contable
- Solo puede consultarse

### Ejemplo Práctico de Registro

Supongamos que necesitamos registrar la compra de mercadería en efectivo por $10,000:

1. Creamos una nueva transacción con fecha actual
2. Leyenda: "Compra de mercadería en efectivo"
3. Agregamos las entradas:
   - Entrada 1: Cuenta "Mercaderías", Debe $10,000
   - Entrada 2: Cuenta "Caja", Haber $10,000
4. Verificamos que Total Debe = Total Haber = $10,000
5. Guardamos la transacción

La transacción quedará en estado "Por Validar" hasta que sea revisada.

### Edición de Transacciones

Las transacciones solo pueden editarse cuando están en estado "Por Validar":

1. Acceda a la transacción desde la búsqueda o transacciones recientes
2. Haga clic en **Editar**
3. Realice los cambios necesarios
4. Verifique nuevamente el balance
5. Guarde los cambios

Si la transacción ya fue validada o cerrada, no podrá editarse.

### Eliminación de Transacciones

Solo pueden eliminarse transacciones en estado "Por Validar":

1. Acceda a la transacción
2. Haga clic en **Eliminar**
3. Confirme la eliminación

Las transacciones validadas o cerradas no pueden eliminarse para mantener la integridad contable.

### Consideraciones Importantes

- Verifique siempre que el asiento esté balanceado antes de guardar
- Use leyendas descriptivas que faciliten la comprensión posterior del asiento
- Revise cuidadosamente las cuentas seleccionadas
- Los importes deben ser positivos; el sistema maneja los signos según Debe/Haber
- No puede usar cuentas inactivas en nuevas transacciones

---

## Validación de Transacciones

La validación es el proceso mediante el cual una transacción pasa del estado "Por Validar" al estado "Validada", indicando que ha sido revisada y confirmada como correcta.

### ¿Por Qué Validar?

La validación permite:

- Distinguir entre asientos en borrador y asientos confirmados
- Prevenir modificaciones accidentales de registros ya revisados
- Mantener un flujo de trabajo ordenado
- Preparar las transacciones para su inclusión en libros diarios

### Proceso de Validación

Para validar una o más transacciones:

1. Acceda a **Transacciones** en el menú lateral
2. Seleccione **Buscar Transacciones**
3. Aplique el filtro para mostrar transacciones "Por Validar"
4. Revise cada transacción:
   - Verifique que la fecha sea correcta
   - Confirme que la leyenda describa adecuadamente la operación
   - Revise que las cuentas seleccionadas sean las apropiadas
   - Verifique que los importes sean correctos
   - Confirme que el asiento esté balanceado
5. Si la transacción es correcta, haga clic en **Validar**
6. La transacción cambiará al estado "Validada"

### Validación Individual vs. Masiva

#### Validación Individual:

Permite revisar y validar transacciones una por una, útil cuando:

- Se quiere revisar cuidadosamente cada asiento
- Solo hay algunas transacciones pendientes
- Se está en proceso de aprendizaje

#### Validación Masiva:

Permite validar múltiples transacciones simultáneamente, útil cuando:

- Hay muchas transacciones pendientes
- Las transacciones han sido previamente revisadas
- Se necesita agilizar el proceso

Para validación masiva:

1. En la lista de transacciones, seleccione las que desea validar
2. Use la opción de selección múltiple
3. Haga clic en **Validar Seleccionadas**

### Reversión de Validación

Si una transacción validada contiene un error, los usuarios con permisos apropiados pueden revertir la validación:

1. Acceda a la transacción validada
2. Seleccione **Revertir Validación**
3. La transacción volverá al estado "Por Validar"
4. Edite la transacción para corregir el error
5. Valide nuevamente

Nota: Solo pueden revertirse validaciones de transacciones que aún no han sido cerradas en un libro diario.

### Recomendaciones

- Valide transacciones regularmente para mantener el flujo de trabajo actualizado
- No valide transacciones con errores; corrija primero y luego valide
- En entornos educativos, el profesor puede revisar antes de que los estudiantes validen
- Mantenga un registro mental de qué transacciones ha revisado

### Permisos de Validación

La capacidad de validar transacciones depende del rol del usuario:

- **Modo Educativo**: Tanto profesores como estudiantes pueden validar sus propias transacciones
- **Modo Empresarial**: Depende del nivel de permisos asignado

---

## Búsqueda de Transacciones

Mosaite ofrece diversas opciones para buscar y filtrar transacciones, facilitando la localización de asientos específicos.

### Métodos de Búsqueda

#### Búsqueda Rápida

Desde la barra superior de la interfaz:

1. Escriba términos en el campo de búsqueda
2. El sistema buscará coincidencias en:
   - Leyendas de transacciones
   - Números de transacción
3. Presione Enter o haga clic en buscar
4. Se mostrarán los resultados relevantes

#### Búsqueda Avanzada

Desde el menú lateral, acceda a **Transacciones > Buscar Transacciones**:

##### Filtros Disponibles:

- **Por Fecha**:
  - Fecha específica
  - Rango de fechas (desde - hasta)
  
- **Por Estado**:
  - Por Validar
  - Validada
  - Cerrada
  - Todas

- **Por Usuario**:
  - Transacciones creadas por un usuario específico
  - Útil para profesores que supervisan estudiantes

- **Por Cuenta**:
  - Transacciones que incluyan una cuenta específica
  - Útil para seguir el movimiento de una cuenta particular

- **Por Monto**:
  - Rango de montos (mínimo - máximo)
  - Transacciones mayores o menores a un valor específico

- **Por Texto**:
  - Búsqueda en leyendas
  - Búsqueda por palabras clave

##### Uso de Filtros Combinados:

Puede aplicar múltiples filtros simultáneamente:

1. Seleccione los filtros deseados
2. Ingrese los valores de búsqueda
3. Haga clic en **Buscar**
4. El sistema mostrará solo las transacciones que cumplan todos los criterios

Ejemplo: Transacciones validadas del mes de marzo que incluyan la cuenta "Caja".

### Resultados de Búsqueda

Los resultados se presentan en una lista que muestra:

- Número de transacción
- Fecha
- Leyenda
- Total del asiento
- Estado
- Usuario que la creó
- Acciones disponibles (Ver, Editar, Validar, según permisos)

### Ordenamiento de Resultados

Puede ordenar los resultados por:

- Fecha (ascendente o descendente)
- Monto (menor a mayor o mayor a menor)
- Estado
- Número de transacción

Haga clic en el encabezado de la columna para cambiar el orden.

### Exportación de Resultados

Los usuarios con permisos apropiados pueden exportar los resultados de búsqueda:

1. Realice la búsqueda con los filtros deseados
2. Seleccione **Exportar**
3. Elija el formato (generalmente PDF o CSV)
4. El archivo se descargará automáticamente

### Transacciones Recientes

Para acceso rápido a las últimas transacciones:

1. Acceda a **Transacciones > Transacciones Recientes**
2. Se mostrarán las últimas transacciones registradas
3. Por defecto, se muestran las 20 más recientes

Esta vista es útil para continuar trabajando en asientos recién creados o para revisar rápidamente el trabajo reciente.

---

## Libros Diarios

El Libro Diario es un documento contable fundamental que registra cronológicamente todas las operaciones de un período determinado. En Mosaite, los libros diarios se generan en formato PDF a partir de las transacciones validadas.

### Concepto de Libro Diario

El libro diario en Mosaite:

- Agrupa transacciones validadas de un período específico
- Genera un documento PDF formal
- Cierra las transacciones incluidas, impidiendo modificaciones posteriores
- Sirve como registro oficial de las operaciones

### Creación de un Libro Diario

Para crear un nuevo libro diario:

1. Acceda a **Libros Diarios** en el menú lateral
2. Seleccione **Crear Libro Diario**
3. Configure los parámetros del libro:

#### Parámetros de Creación:

- **Nombre del Libro**: Identificador descriptivo (ej: "Libro Diario Enero 2025")
- **Rango de Fechas**:
  - Fecha inicial: Primera transacción a incluir
  - Fecha final: Última transacción a incluir
- **Filtros Adicionales** (opcionales):
  - Por usuario (en modo educativo, para libros individuales)
  - Por tipo de transacción

4. Haga clic en **Vista Previa** para revisar qué transacciones se incluirán
5. El sistema mostrará:
   - Cantidad de transacciones validadas en el rango
   - Total general
   - Lista de transacciones a incluir
6. Si todo es correcto, haga clic en **Generar Libro Diario**

### Proceso de Generación

Al generar un libro diario:

1. El sistema selecciona todas las transacciones validadas del período especificado
2. Las ordena cronológicamente
3. Genera un documento PDF estructurado
4. Cambia el estado de todas las transacciones incluidas a "Cerrada"
5. Guarda el libro en el sistema

Nota Importante: Una vez generado un libro diario, las transacciones incluidas quedan cerradas permanentemente y no pueden modificarse ni eliminarse.

### Contenido del Libro Diario

El PDF generado incluye:

#### Encabezado:

- Nombre del libro
- Período cubierto
- Fecha de generación
- Usuario o grupo (según corresponda)

#### Cuerpo:

Para cada transacción:

- Número de asiento
- Fecha
- Leyenda descriptiva
- Detalle de cuentas afectadas con sus débitos y créditos
- Totales parciales

#### Pie:

- Total general del libro
- Cantidad de asientos incluidos
- Firma o validación (según configuración)

### Búsqueda de Libros Diarios

Para localizar libros diarios existentes:

1. Acceda a **Libros Diarios > Buscar Libros**
2. Use los filtros disponibles:
   - Por nombre
   - Por fecha de creación
   - Por período que cubren
   - Por usuario creador
3. Haga clic en **Buscar**

### Visualización de Libros

Para ver un libro diario:

1. Desde los resultados de búsqueda o libros recientes
2. Haga clic en el libro deseado
3. Opciones disponibles:
   - **Ver en línea**: Visualiza el PDF en el navegador
   - **Descargar**: Guarda el PDF en su dispositivo
   - **Ver Detalles**: Muestra información del libro y las transacciones incluidas

### Libros Recientes

Para acceso rápido a los últimos libros generados:

1. Acceda a **Libros Diarios > Libros Recientes**
2. Se mostrarán los libros más recientes con:
   - Nombre
   - Fecha de generación
   - Período que cubren
   - Cantidad de asientos
   - Opciones de descarga

### Eliminación de Libros Diarios

Los usuarios con permisos de administrador pueden eliminar libros diarios:

1. Acceda al libro que desea eliminar
2. Seleccione **Eliminar**
3. Confirme la acción

Advertencia: Al eliminar un libro diario:

- Las transacciones incluidas volverán al estado "Validada"
- Podrán ser incluidas en un nuevo libro
- No se pierden las transacciones, solo se desvinculan del libro eliminado

Esta funcionalidad es útil cuando:

- Se cometió un error en la generación del libro
- Se necesita reorganizar períodos contables
- Se desea regenerar un libro con parámetros diferentes

### Recomendaciones

- Genere libros diarios periódicamente para mantener registros organizados
- Use nombres descriptivos que incluyan el período (mes, bimestre, etc.)
- Descargue y respalde los PDF generados
- En entornos educativos, considere generar libros individuales por estudiante
- Revise la vista previa antes de generar el libro definitivo

---

## Dashboard

El Dashboard es la vista general del sistema que proporciona métricas, estadísticas y alertas sobre la actividad contable. Es particularmente útil para profesores y administradores que supervisan el uso del sistema.

### Acceso al Dashboard

Para acceder al Dashboard:

1. Inicie sesión en Mosaite
2. El Dashboard se muestra automáticamente como pantalla inicial
3. También puede acceder desde el menú lateral seleccionando **Dashboard**

### Indicadores Principales

El Dashboard muestra varios indicadores clave de rendimiento:

#### Total de Alumnos / Usuarios

- Muestra el número total de usuarios registrados en el sistema
- En modo educativo, cuenta los estudiantes
- En modo empresarial, cuenta todos los usuarios activos

#### Cantidad de Grupos

- Indica el número de cursos o comisiones creadas
- Solo visible en modo educativo
- Útil para organizar y segmentar estudiantes

#### Asientos Totales Cargados

- Representa el volumen total de transacciones registradas
- Incluye transacciones en todos los estados
- Métrica útil para medir el nivel de actividad global

#### Libros Diarios Creados

- Muestra cuántos libros diarios se han generado
- Indica el nivel de formalización de los registros
- Útil para seguimiento de cierre de períodos

### Gráficos de Actividad

El Dashboard incluye representaciones gráficas de la actividad:

#### Gráfico de Actividad Temporal

Muestra la evolución mensual de:

- **Cantidad de asientos cargados**: Barras que representan el volumen de transacciones por mes
- **Porcentaje de cobertura**: Línea que muestra el ratio de transacciones validadas sobre el total

La cobertura es un indicador importante de calidad que representa:

```
Cobertura = (Transacciones Validadas o Cerradas / Total de Transacciones) × 100
```

Una cobertura alta indica que la mayoría de las transacciones han sido revisadas y validadas.

#### Gráfico de Actividad por Grupo

En modo educativo, muestra comparaciones entre grupos:

- Asientos cargados por cada grupo
- Porcentaje de cobertura por grupo
- Permite identificar grupos más activos o que necesitan apoyo

Este gráfico es especialmente útil para profesores que desean:

- Identificar grupos con bajo rendimiento
- Reconocer grupos destacados
- Ajustar estrategias pedagógicas según la actividad

### Alertas de Consistencia Contable

El Dashboard incluye un sistema de alertas que detecta inconsistencias:

#### Alerta de Descuadre Contable

Se activa cuando existe una diferencia entre el total de saldos deudores y acreedores en el sistema.

Esta alerta es crítica porque:

- Indica un error en algún asiento (no cumple partida doble)
- Señala posibles problemas de integridad de datos
- Requiere atención inmediata para corregir

Cuando aparece esta alerta:

1. Identifique las transacciones problemáticas
2. Revise los asientos indicados
3. Corrija los errores encontrados
4. Verifique que la alerta desaparezca

#### Otras Alertas

Según la configuración, el Dashboard puede mostrar:

- Usuarios inactivos por períodos prolongados
- Transacciones pendientes de validación por mucho tiempo
- Grupos sin actividad reciente

### Interpretación de Métricas

#### Para Profesores:

- Use el total de asientos para medir el nivel de práctica de sus estudiantes
- Monitoree la cobertura para identificar estudiantes que no validan sus trabajos
- Compare grupos para equilibrar la carga de trabajo
- Revise alertas regularmente para mantener la calidad de los registros

#### Para Administradores:

- Supervise el uso general del sistema
- Identifique patrones de uso y períodos de mayor actividad
- Planifique recursos según las métricas de actividad
- Use las estadísticas para reportes institucionales

### Actualización de Datos

Los datos del Dashboard se actualizan:

- Automáticamente cada vez que accede a la vista
- Puede forzar la actualización recargando la página
- Las métricas reflejan el estado actual del sistema

### Personalización del Dashboard

Según los permisos del usuario, algunas secciones del Dashboard pueden:

- Mostrar solo información relevante al rol
- Filtrar datos por usuario o grupo
- Ocultar métricas no autorizadas

---

## Asistente Contable (Chat RAG)

El Asistente Contable es una herramienta de consulta basada en inteligencia artificial que ayuda a comprender conceptos contables y obtener información sobre el sistema.

### ¿Qué es el Chat RAG?

RAG significa "Retrieval Augmented Generation" (Generación Aumentada por Recuperación). Es un sistema que:

- Responde preguntas en lenguaje natural
- Busca información en documentos teóricos previamente indexados
- Genera respuestas contextualizadas y precisas
- Ayuda en el aprendizaje de conceptos contables

### Acceso al Asistente

Para usar el Asistente Contable:

1. Acceda a **Chat** desde el menú lateral
2. Se abrirá la interfaz conversacional
3. Escriba su pregunta en el campo de texto
4. Presione Enter o haga clic en Enviar
5. El asistente procesará su consulta y responderá

### Tipos de Consultas Soportadas

El Asistente Contable puede responder preguntas sobre:

#### Teoría Contable Básica

Ejemplos:

- "¿Qué es el principio de partida doble?"
- "¿Cuál es la diferencia entre activo y pasivo?"
- "¿Cómo se registra una venta al contado?"
- "¿Qué es un libro diario?"

#### Plan de Cuentas

Ejemplos:

- "¿Para qué se usa la cuenta Caja?"
- "¿Cuál es la naturaleza de la cuenta Proveedores?"
- "¿Qué cuentas se usan para registrar una compra de mercadería?"

#### Funcionamiento del Sistema

Ejemplos:

- "¿Cómo creo una nueva transacción?"
- "¿Qué estados puede tener una transacción?"
- "¿Cómo genero un libro diario?"
- "¿Cuál es la diferencia entre validar y cerrar un asiento?"

El asistente basa sus respuestas en:

- Manual de usuario del sistema
- Documentación del plan de cuentas predeterminado
- Material teórico sobre contabilidad básica

### Cómo Hacer Buenas Preguntas

Para obtener mejores respuestas:

#### Sea Específico:

- Malo: "Háblame de cuentas"
- Bueno: "¿Qué es una cuenta de naturaleza deudora?"

#### Proporcione Contexto:

- Malo: "¿Cómo registro esto?"
- Bueno: "¿Cómo registro una compra de mercadería a crédito?"

#### Una Pregunta a la Vez:

- Malo: "¿Qué es un activo y cómo registro una venta y qué es el debe?"
- Bueno: "¿Qué es un activo en contabilidad?"

#### Use Lenguaje Natural:

- No necesita usar términos técnicos complejos
- Pregunte como le preguntaría a un profesor
- El sistema entiende diversas formas de expresar la misma consulta

### Limitaciones del Asistente

Es importante entender qué NO puede hacer el asistente:

#### No Accede a Sus Datos Contables:

- No puede ver sus transacciones específicas
- No puede decirle cuánto gastó en proveedores
- No puede generar reportes de sus datos

Para consultas sobre sus datos, use la **Búsqueda por Lenguaje Natural (ConsultorIA)**.

#### No Realiza Cálculos Complejos:

- No es una calculadora contable
- No genera asientos automáticamente
- No realiza análisis financieros

#### No Ofrece Asesoramiento Profesional:

- Es una herramienta educativa, no un asesor contable
- Sus respuestas son orientativas
- Para situaciones reales, consulte a un profesional

### Historial de Conversación

El asistente mantiene el contexto de la conversación:

- Recuerda las preguntas anteriores en la sesión actual
- Puede hacer preguntas de seguimiento
- Puede pedir aclaraciones basadas en respuestas previas

Ejemplo de conversación contextual:

```
Usuario: "¿Qué es un activo?"
Asistente: [Explica qué es un activo]
Usuario: "Dame ejemplos"
Asistente: [Proporciona ejemplos de activos]
Usuario: "¿Y el pasivo?"
Asistente: [Explica el pasivo, manteniendo contexto]
```

### Reinicio de Conversación

Para iniciar una nueva conversación desde cero:

1. Haga clic en **Nueva Conversación**
2. El historial se borrará
3. El asistente no recordará el contexto anterior

Esto es útil cuando cambia completamente de tema.

### Consejos de Uso Efectivo

- Use el asistente para aprender conceptos antes de registrar operaciones
- Si no entiende una respuesta, pida una explicación más simple
- Aproveche para explorar temas relacionados
- No dude en reformular su pregunta si la respuesta no es clara
- Use el asistente como complemento, no como reemplazo del material de estudio

### Mejora Continua

El asistente mejora continuamente:

- Se actualiza con nueva documentación
- Aprende de las consultas frecuentes
- Se ajusta para dar respuestas más precisas

Si encuentra respuestas incorrectas o poco útiles, repórtelo al administrador del sistema para mejorar el servicio.

---

## Búsqueda por Lenguaje Natural (ConsultorIA)

ConsultorIA es una herramienta avanzada que permite realizar consultas sobre sus datos contables usando lenguaje natural, sin necesidad de conocer SQL o comandos complejos.

### ¿Qué es ConsultorIA?

ConsultorIA es un sistema que:

- Interpreta preguntas en lenguaje cotidiano
- Las convierte automáticamente en consultas SQL
- Busca en su base de datos de transacciones
- Presenta los resultados de forma comprensible

Es diferente del Chat RAG porque:

- ConsultorIA accede a SUS datos contables específicos
- El Chat RAG solo responde sobre teoría y uso del sistema

### Acceso a ConsultorIA

Para usar ConsultorIA:

1. Acceda a **Transacciones** en el menú lateral
2. Seleccione **Búsqueda por Lenguaje Natural** o **ConsultorIA**
3. Escriba su pregunta en lenguaje natural
4. Haga clic en **Consultar**
5. El sistema procesará la pregunta y mostrará los resultados

### Tipos de Consultas Soportadas

#### Consultas sobre Gastos o Ingresos

Ejemplos:

- "¿Cuánto gasté en proveedores en abril?"
- "¿Cuál fue el total de ventas este mes?"
- "¿Cuánto ingresó por servicios en el primer trimestre?"

#### Consultas sobre Cuentas Específicas

Ejemplos:

- "¿Cuál es el saldo de la cuenta Caja?"
- "Muéstrame todos los movimientos de Bancos"
- "¿Qué transacciones afectaron a Proveedores?"

#### Consultas Temporales

Ejemplos:

- "¿Cuántas transacciones registré ayer?"
- "Muestra asientos de la semana pasada"
- "¿Qué operaciones hice entre enero y marzo?"

#### Consultas Comparativas

Ejemplos:

- "¿Gasté más en marzo o abril?"
- "Compara ventas de enero con febrero"
- "¿Cuál mes tuvo más movimientos?"

#### Consultas de Resumen

Ejemplos:

- "Resume mi actividad del mes"
- "¿Cuánto es el total de mis asientos?"
- "Dame un resumen de transacciones por validar"

### Cómo Formular Consultas Efectivas

#### Sea Claro y Específico:

- Malo: "¿Cuánto hay?"
- Bueno: "¿Cuánto es el total de gastos en proveedores?"

#### Especifique Períodos Cuando Sea Relevante:

- "¿Cuánto gasté en mayo de 2025?"
- "Muéstrame ventas del último trimestre"
- "Transacciones de esta semana"

#### Use Nombres de Cuentas Correctos:

- El sistema busca coincidencias con su plan de cuentas
- Use nombres completos o palabras clave reconocibles
- Si no recuerda el nombre exacto, use términos generales

#### Especifique el Tipo de Dato Deseado:

- "¿Cuántas transacciones...?" (cantidad)
- "¿Cuánto dinero...?" (monto)
- "Muéstrame las transacciones..." (lista)

### Interpretación de Resultados

Los resultados de ConsultorIA pueden presentarse como:

#### Valores Numéricos:

```
Respuesta: El total gastado en proveedores en abril fue $45,320.00
```

#### Listas de Transacciones:

```
Se encontraron 5 transacciones:

1. Fecha: 15/04/2025 - Compra mercadería - $8,500
2. Fecha: 18/04/2025 - Pago a proveedor - $12,000
...
```

#### Tablas Comparativas:

```
Comparación por mes:
Enero:  $23,450
Febrero: $28,900
Marzo:  $31,200
```

#### Respuestas Descriptivas:

```
Tu actividad en mayo incluye:
- 23 transacciones registradas
- 18 validadas, 5 pendientes
- Total operado: $125,400
```

### Consulta SQL Generada

Para usuarios avanzados, el sistema puede mostrar:

- La consulta SQL que generó automáticamente
- Esto es útil para entender cómo interpretó su pregunta
- Puede ayudar a refinar consultas futuras

Para ver la consulta SQL:

1. Realice su consulta en lenguaje natural
2. Haga clic en **Ver Consulta SQL** (si está disponible)
3. Se mostrará el código SQL generado

### Limitaciones de ConsultorIA

#### No Modifica Datos:

- Solo consulta y muestra información
- No puede crear, editar o eliminar transacciones
- Es una herramienta de solo lectura

#### Alcance de la Base de Datos:

- Solo accede a transacciones y cuentas
- No puede consultar configuraciones del sistema
- No accede a información de otros usuarios (según permisos)

#### Complejidad de Consultas:

- Funciona mejor con consultas directas
- Consultas muy complejas pueden no interpretarse correctamente
- Si no obtiene resultados esperados, simplifique la pregunta

### Diferencias con Búsqueda Avanzada

ConsultorIA vs. Búsqueda Avanzada:

| Característica | ConsultorIA | Búsqueda Avanzada |
|----------------|-------------|-------------------|
| Interfaz | Lenguaje natural | Formularios y filtros |
| Flexibilidad | Alta | Media |
| Precisión | Depende de la IA | Total |
| Facilidad de uso | Muy fácil | Requiere conocer filtros |
| Tipos de consulta | Limitado a lo entrenado | Todas las combinaciones |

Recomendación: Use ConsultorIA para consultas rápidas e intuitivas. Use Búsqueda Avanzada cuando necesite control total sobre los filtros.

### Ejemplos Prácticos

#### Escenario 1: Seguimiento de Gastos

Pregunta: "¿Cuánto gasté en sueldos y cargas sociales en marzo?"

Resultado esperado:

```
Total en Sueldos y Cargas Sociales - Marzo 2025: $58,400.00

Detalle:
- Sueldos: $45,000.00
- Cargas Sociales: $13,400.00
```

#### Escenario 2: Control de Ventas

Pregunta: "Muéstrame las ventas de esta semana"

Resultado esperado:

```
Ventas de la semana del 10/11 al 16/11:

1. 10/11/2025 - Venta al contado - $8,500
2. 12/11/2025 - Venta a crédito - $15,200
3. 14/11/2025 - Venta al contado - $6,800

Total: $30,500
```

#### Escenario 3: Análisis de Actividad

Pregunta: "¿Cuántos asientos registré este mes y cuántos están validados?"

Resultado esperado:

```
Actividad de Noviembre 2025:

Total de asientos: 34
- Validados: 28
- Por validar: 6
- Cerrados: 20 (incluidos en libros)

Cobertura: 82.35%
```

### Consejos para Mejores Resultados

- Comience con consultas simples para familiarizarse
- Si no obtiene el resultado esperado, reformule la pregunta
- Use fechas en formatos claros (15 de marzo, 15/03/2025, marzo 2025)
- Especifique si quiere montos totales o detalles
- Para consultas complejas, divídalas en varias consultas simples

### Mejora del Sistema

ConsultorIA aprende y mejora:

- Las consultas frecuentes se interpretan mejor con el tiempo
- Los administradores pueden entrenar el sistema con ejemplos
- Se actualizan los patrones de consulta según el uso real

Si encuentra que cierta pregunta no funciona como esperaba, puede reportarlo para que se mejore en futuras versiones.

---

## Roles y Permisos

Mosaite implementa un sistema de control de acceso basado en roles que determina qué acciones puede realizar cada usuario en el sistema.

### Modos de Operación

El sistema puede funcionar en dos modos que determinan la estructura de roles:

#### Modo Educativo (system_mode = False)

Modo predeterminado, diseñado para instituciones educativas.

**Roles disponibles:**

- **Professor**: Rol administrativo con control total
- **Student**: Rol de usuario estándar para práctica

#### Modo Empresarial (system_mode = True)

Amplía la estructura de roles para simulación de entornos contables reales.

**Roles disponibles:**

- **Admin**: Control total del sistema
- **Manager**: Supervisión y gestión
- **Accountant**: Operaciones contables
- **Operator**: Carga operativa
- **Viewer**: Solo consulta

### Descripción Detallada de Roles

#### En Modo Educativo:

**Professor**

Permisos equivalentes a Admin. Puede:

- Crear, editar y eliminar usuarios
- Configurar el sistema
- Administrar el plan de cuentas
- Crear, validar y cerrar transacciones
- Generar libros diarios
- Acceder al dashboard completo
- Supervisar el trabajo de todos los estudiantes
- Usar todas las herramientas del sistema

Uso típico: Docentes que supervisan el aprendizaje y configuran el entorno de práctica.

**Student**

Permisos equivalentes a Accountant. Puede:

- Crear y editar sus propias transacciones (hasta que sean validadas)
- Validar sus transacciones
- Generar libros diarios de su propio trabajo
- Consultar el plan de cuentas
- Usar el Chat RAG y ConsultorIA
- Ver su propio dashboard

No puede:

- Modificar la configuración del sistema
- Crear o gestionar otros usuarios
- Editar el plan de cuentas
- Ver o modificar transacciones de otros estudiantes

Uso típico: Estudiantes que practican registro contable.

#### En Modo Empresarial:

**Admin**

Control total del sistema. Puede:

- Todas las operaciones disponibles
- Configurar el sistema
- Gestionar usuarios y roles
- Administrar el plan de cuentas sin restricciones
- Realizar todas las operaciones contables
- Eliminar cualquier registro
- Acceder a toda la información

Uso típico: Administrador del sistema o contador principal en simulaciones.

**Manager**

Rol de supervisión con acceso amplio. Puede:

- Ver y editar transacciones
- Generar reportes y libros diarios
- Supervisar el trabajo de otros usuarios
- Gestionar usuarios (crear, editar)
- Acceder al dashboard completo

No puede:

- Modificar la configuración global del sistema
- Eliminar elementos críticos sin aprobación

Uso típico: Gerente o supervisor contable en simulaciones.

**Accountant**

Rol operativo contable. Puede:

- Crear, editar y validar transacciones
- Generar libros diarios
- Administrar el plan de cuentas (crear cuentas, marcar como inactivas)
- Usar todas las herramientas de consulta
- Acceder a su dashboard

No puede:

- Configurar el sistema
- Gestionar usuarios
- Ver o modificar transacciones de otros sin autorización

Uso típico: Contador o asistente contable que realiza registros.

**Operator**

Rol operativo básico. Puede:

- Crear transacciones
- Consultar el plan de cuentas
- Ver sus propias transacciones
- Usar herramientas de consulta básicas

No puede:

- Validar transacciones
- Generar libros diarios
- Editar el plan de cuentas
- Acceder a configuraciones

Uso típico: Personal de ingreso de datos o registros básicos.

**Viewer**

Rol de solo lectura. Puede:

- Consultar transacciones
- Ver libros diarios generados
- Consultar el plan de cuentas
- Ver dashboards y reportes

No puede:

- Crear, editar o eliminar ningún registro
- Modificar ninguna configuración
- Validar transacciones

Uso típico: Auditor, supervisor externo o personal que solo necesita consultar información.

### Sistema de Niveles de Permiso

Internamente, Mosaite usa códigos de nivel para controlar el acceso a operaciones específicas:

| Código | Roles Admitidos | Descripción |
|--------|----------------|-------------|
| A | Todos los registrados | Acceso general a consultas |
| S | Solo Admin | Operaciones críticas |
| N | Todos excepto Viewer | Creación y edición básica |
| X | Accountant, Manager, Admin | Operaciones contables extendidas |
| Y | Accountant, Admin | Creación/modificación de elementos contables |
| Z | Manager, Admin | Supervisión y gestión de usuarios |

### Permisos por Funcionalidad

#### Transacciones / Asientos:

- **Crear**: Nivel N (todos excepto Viewer)
- **Ver**: Nivel A (todos)
- **Editar**: Nivel X (Accountant, Manager, Admin)
- **Eliminar**: Nivel S (Solo Admin)
- **Listar**: Nivel A (todos)

#### Libros Diarios:

- **Crear**: Nivel Y (Accountant, Admin)
- **Ver**: Nivel A (todos)
- **Editar**: Nivel S (Solo Admin)
- **Eliminar**: Nivel S (Solo Admin)
- **Listar**: Nivel A (todos)

#### Usuarios:

- **Crear**: Nivel S (Solo Admin)
- **Ver**: Nivel Z (Manager, Admin)
- **Editar**: Nivel S (Solo Admin)
- **Eliminar**: Nivel S (Solo Admin)
- **Listar**: Nivel Z (Manager, Admin)

#### Configuración:

- **Crear**: Nivel S (Solo Admin)
- **Ver**: Nivel Z (Manager, Admin)
- **Editar**: Nivel S (Solo Admin)
- **Eliminar**: Nivel S (Solo Admin)
- **Listar**: Nivel Z (Manager, Admin)

#### Plan de Cuentas:

- **Crear cuenta**: Nivel Y (Accountant, Admin)
- **Ver**: Nivel X (Accountant, Manager, Admin)
- **Editar cuenta**: Nivel Y (Accountant, Admin)
- **Eliminar cuenta**: Nivel S (Solo Admin)
- **Listar**: Nivel X (Accountant, Manager, Admin)

#### Herramientas de IA (Chat RAG, ConsultorIA):

- **Usar**: Nivel A (todos los usuarios registrados)

### Reglas Especiales de Permisos

#### Alcance de Datos:

- Los **Students** solo ven sus propias transacciones y libros
- Los **Professors** ven todo el contenido de sus grupos/comisiones
- Los **Accountants** ven sus propios registros
- Los **Managers y Admins** ven todos los registros

#### Edición de Transacciones:

- Solo se pueden editar transacciones en estado "Por Validar"
- Una vez validada, solo Admin puede revertir la validación
- Transacciones cerradas no pueden editarse por nadie

#### Eliminación Protegida:

- Cuentas usadas en transacciones no pueden eliminarse, solo desactivarse
- Transacciones en libros cerrados no pueden eliminarse

### Cambio de Rol

Solo los administradores pueden cambiar el rol de un usuario:

1. Acceda a la gestión de usuarios
2. Seleccione el usuario
3. Modifique el campo "Rol"
4. Guarde los cambios

El cambio de rol se aplica inmediatamente. El usuario verá las nuevas opciones disponibles en su próximo inicio de sesión.

### Verificación de Permisos

Para verificar qué puede hacer con su rol actual:

1. Los menús y opciones no disponibles aparecerán deshabilitados o no visibles
2. Si intenta realizar una acción sin permiso, el sistema mostrará un mensaje de error
3. Consulte con su profesor o administrador si cree que debería tener acceso a alguna funcionalidad

---

## Preguntas Frecuentes

### Sobre el Sistema

**¿Qué es Mosaite?**

Mosaite es una plataforma web educativa para la práctica de contabilidad básica. Permite registrar asientos contables, generar libros diarios y consultar información teórica mediante herramientas de inteligencia artificial.

**¿Necesito instalar algo en mi computadora?**

No. Mosaite funciona completamente en el navegador web. Solo necesita la URL de acceso proporcionada por su institución y una conexión a la red local.

**¿Funciona en mi celular o tablet?**

Mosaite está optimizado para navegadores de escritorio. Aunque puede acceder desde dispositivos móviles, la experiencia será mejor en una computadora con pantalla grande.

**¿Puedo acceder desde mi casa?**

Depende de cómo esté configurado el sistema. Por defecto, Mosaite funciona en la red local de la institución. Para acceso remoto, consulte con su administrador.

**¿Mis datos están seguros?**

Mosaite almacena todos los datos localmente en el servidor de su institución. No se envía información a servicios externos en la nube. Sin embargo, como es un entorno de práctica, no debe ingresar datos reales o sensibles de empresas.

### Sobre el Uso

**Olvidé mi contraseña, ¿qué hago?**

Contacte a su profesor o administrador del sistema. Ellos pueden restablecer su contraseña. No existe una opción de recuperación automática.

**¿Puedo cambiar mi contraseña?**

Sí. Acceda a su perfil de usuario en el menú superior y seleccione "Cambiar contraseña".

**¿Cómo sé qué permisos tengo?**

Su rol determina sus permisos. Puede ver su rol en su perfil de usuario. Las opciones no disponibles aparecerán deshabilitadas en los menús.

**¿Puedo ver las transacciones de otros estudiantes?**

No, a menos que sea un profesor o administrador. Los estudiantes solo pueden ver sus propias transacciones.

### Sobre Transacciones

**Cometí un error en una transacción, ¿puedo corregirla?**

Sí, si la transacción está en estado "Por Validar". Edítela antes de validarla. Si ya fue validada, solo un administrador puede revertir la validación para que pueda editarla.

**¿Qué significa que una transacción esté "cerrada"?**

Significa que está incluida en un libro diario generado. Las transacciones cerradas no pueden editarse ni eliminarse para mantener la integridad contable.

**Mi asiento no balancea, ¿qué hago?**

Verifique que el total del Debe sea igual al total del Haber. El sistema no le permitirá guardar hasta que estén balanceados. Revise los importes de cada entrada.

**¿Puedo eliminar una transacción?**

Sí, si está en estado "Por Validar" y tiene los permisos necesarios. Las transacciones validadas o cerradas no pueden eliminarse.

**¿Cuántas entradas puedo tener en un asiento?**

No hay límite específico. Un asiento puede tener múltiples entradas siempre que el total del Debe iguale al total del Haber.

### Sobre el Plan de Cuentas

**¿Puedo agregar mis propias cuentas?**

Sí, si tiene permisos de Accountant o superior. Acceda a "Plan de Cuentas > Crear Cuenta".

**¿Puedo modificar una cuenta existente?**

No. Las cuentas no pueden modificarse una vez creadas. Si cometió un error, desactive la cuenta incorrecta y cree una nueva.

**¿Puedo eliminar una cuenta?**

Solo puede desactivarla (marcarla como Inactiva). Las cuentas que ya se usaron en transacciones no pueden eliminarse completamente para mantener la integridad histórica.

**¿Qué significa "naturaleza" de una cuenta?**

Indica si la cuenta es de naturaleza Deudora (aumenta con el Debe) o Acreedora (aumenta con el Haber). Esta característica determina el comportamiento contable de la cuenta.

### Sobre Libros Diarios

**¿Cuándo debo generar un libro diario?**

Cuando haya completado un período contable (por ejemplo, un mes) y tenga transacciones validadas que desee formalizar.

**¿Puedo generar varios libros del mismo período?**

Técnicamente sí, pero no es recomendable. Cada transacción debe estar en un solo libro. El sistema incluirá solo las transacciones validadas que no estén en otro libro.

**¿Puedo modificar un libro diario después de generarlo?**

No. Los libros diarios son documentos finales y no pueden modificarse. Si necesita cambios, debe eliminar el libro (solo Admin) y regenerarlo.

**No puedo descargar mi libro diario, ¿qué hago?**

Verifique que no tenga bloqueadores de ventanas emergentes activados en su navegador. También asegúrese de tener una conexión estable.

### Sobre las Herramientas de IA

**¿Qué diferencia hay entre el Chat y ConsultorIA?**

El Chat RAG responde preguntas sobre teoría contable y uso del sistema. ConsultorIA consulta SUS datos contables específicos (sus transacciones).

**¿El Chat puede hacer mis asientos automáticamente?**

No. El Chat es una herramienta de aprendizaje que responde preguntas, pero no crea transacciones automáticamente.

**ConsultorIA no entiende mi pregunta, ¿qué hago?**

Reformule la pregunta de manera más simple y específica. Use nombres de cuentas correctos y especifique períodos claramente.

**¿Las respuestas del Chat son 100% confiables?**

El Chat se basa en material teórico indexado y es generalmente preciso para conceptos básicos. Sin embargo, es una herramienta educativa y no reemplaza la supervisión del profesor o material de estudio oficial.

### Sobre el Dashboard

**No veo el Dashboard, ¿por qué?**

Algunos roles tienen acceso limitado al Dashboard. Verifique sus permisos con su profesor o administrador.

**Los números del Dashboard no coinciden con lo que esperaba**

El Dashboard se actualiza en tiempo real. Asegúrese de recargar la página para ver los datos más recientes. Si persiste el problema, consulte con su administrador.

**¿Qué significa "Cobertura" en los gráficos?**

Es el porcentaje de transacciones que han sido validadas o cerradas sobre el total de transacciones. Una cobertura alta indica que la mayoría de los asientos han sido revisados.

### Problemas Técnicos

**La página se quedó congelada, ¿qué hago?**

Intente recargar la página (F5). Si el problema persiste, cierre y vuelva a abrir el navegador.

**Perdí mi trabajo porque se cerró el navegador**

Mosaite guarda automáticamente cuando hace clic en "Guardar". Si estaba trabajando en una transacción y no guardó, lamentablemente se perderá. Guarde frecuentemente.

**El sistema está muy lento**

Esto puede deberse a:

- Muchos usuarios conectados simultáneamente
- Conexión de red débil
- Navegador con muchas pestañas abiertas

Cierre pestañas innecesarias y verifique su conexión. Si persiste, consulte con su administrador.

**Aparece un mensaje de error que no entiendo**

Tome nota del mensaje de error y contacte a su profesor o administrador. Proporcione información sobre qué estaba haciendo cuando apareció el error.

### Sobre Evaluaciones y Aprendizaje

**¿Mi profesor puede ver todo lo que hago?**

Sí. Los profesores tienen acceso a todas las transacciones y actividades de sus estudiantes.

**¿El sistema me califica automáticamente?**

No. Mosaite es una herramienta de práctica, no de evaluación. Su profesor revisará su trabajo para evaluarlo.

**¿Puedo practicar todo lo que quiera?**

Sí. No hay límite en la cantidad de transacciones que puede crear. Practique tanto como necesite.

**¿Cómo sé si estoy haciendo bien los asientos?**

El sistema verifica que los asientos estén balanceados (Debe = Haber), pero no valida si usó las cuentas correctas. Su profesor revisará la correctitud conceptual de sus registros.

### Mejores Prácticas

**¿Cuál es la mejor forma de organizar mis transacciones?**

- Use fechas correctas y cronológicas
- Escriba leyendas claras y descriptivas
- Valide regularmente sus transacciones
- Genere libros diarios por período (mensual, bimestral, etc.)

**¿Debo validar inmediatamente después de crear un asiento?**

No necesariamente. Puede crear varios asientos y validarlos juntos después de revisarlos. Sin embargo, no deje muchas transacciones sin validar por períodos largos.

**¿Con qué frecuencia debo generar libros diarios?**

Depende de las instrucciones de su profesor. Una práctica común es generar un libro diario al finalizar cada mes o período de práctica.

**¿Qué hago si no entiendo un concepto contable?**

1. Use el Chat RAG para consultar teoría
2. Revise su material de estudio
3. Consulte a su profesor
4. Practique con ejercicios simples antes de avanzar a casos complejos

---

## Glosario de Términos

**Asiento Contable**: Registro de una operación económica que afecta al patrimonio de una entidad. En Mosaite, sinónimo de transacción.

**Balance**: Igualdad entre el total del Debe y el total del Haber en un asiento. Es un requisito fundamental de la partida doble.

**Cerrar**: Acción de incluir una transacción en un libro diario, después de lo cual no puede modificarse.

**Cuenta**: Elemento del plan de cuentas que representa un tipo específico de activo, pasivo, patrimonio, ingreso o egreso.

**Cobertura**: Porcentaje de transacciones que han sido validadas o cerradas sobre el total de transacciones registradas.

**Debe**: Lado izquierdo de un asiento contable. Registra aumentos en activos y gastos, disminuciones en pasivos e ingresos.

**Entrada**: Cada línea individual dentro de un asiento contable. Una transacción contiene múltiples entradas.

**Estado**: Situación actual de una transacción (Por Validar, Validada, Cerrada).

**Haber**: Lado derecho de un asiento contable. Registra disminuciones en activos y gastos, aumentos en pasivos e ingresos.

**Libro Diario**: Registro cronológico de todas las operaciones contables de un período. En Mosaite se genera en formato PDF.

**Leyenda**: Descripción textual del hecho económico registrado en un asiento.

**Naturaleza**: Característica de una cuenta que indica si es Deudora (aumenta con el Debe) o Acreedora (aumenta con el Haber).

**Partida Doble**: Principio contable que establece que toda operación tiene un doble efecto: lo que entra debe ser igual a lo que sale (Debe = Haber).

**Plan de Cuentas**: Listado ordenado y codificado de todas las cuentas utilizadas en la contabilidad.

**RAG**: Retrieval Augmented Generation. Técnica de IA que combina búsqueda de información con generación de respuestas.

**Rol**: Conjunto de permisos asignados a un usuario que determina qué acciones puede realizar en el sistema.

**Saldo**: Diferencia entre el total del Debe y el total del Haber de una cuenta.

**Transacción**: Registro completo de una operación contable. En Mosaite, sinónimo de asiento contable.

**Validar**: Acción de confirmar que una transacción está correcta y pasarla del estado "Por Validar" a "Validada".

---

## Soporte y Contacto

### Soporte Técnico

Para problemas técnicos con el sistema:

1. Consulte primero este manual
2. Verifique las preguntas frecuentes
3. Contacte a su profesor o administrador del sistema

### Reportar Problemas

Si encuentra un error o comportamiento inesperado:

1. Documente qué estaba haciendo cuando ocurrió
2. Tome nota de cualquier mensaje de error
3. Reporte al administrador del sistema con esta información

### Sugerencias de Mejora

Mosaite es un proyecto educativo en desarrollo. Sus sugerencias son valiosas:

- Funcionalidades que facilitarían su aprendizaje
- Mejoras en la interfaz
- Documentación adicional necesaria
- Casos de uso que no están cubiertos

Comparta sus ideas con su profesor o directamente con el equipo de desarrollo.

### Recursos Adicionales

**Documentación del Proyecto**:

El código fuente y documentación técnica están disponibles en: https://github.com/luantorv/mosaite

**Material de Aprendizaje**:

Consulte con su profesor sobre material complementario de contabilidad básica que pueda ayudarle a aprovechar mejor el sistema.

---

## Notas Finales

Este manual cubre las funcionalidades principales de Mosaite en su versión actual. El sistema está en desarrollo continuo y pueden agregarse nuevas características.

Recuerde que Mosaite es una herramienta educativa para práctica de contabilidad básica. No debe utilizarse para registros contables reales de empresas o entidades.

Para obtener la mejor experiencia:

- Use Mosaite regularmente para familiarizarse con el flujo de trabajo contable
- Experimente con diferentes tipos de asientos y situaciones
- Use las herramientas de IA para reforzar su aprendizaje teórico
- Revise el Dashboard para monitorear su progreso
- No dude en consultar cuando tenga dudas

La práctica constante y la curiosidad son las mejores formas de dominar tanto Mosaite como los conceptos contables fundamentales.

---

**Versión del Manual**: 1.0
**Última Actualización**: Noviembre 2025
**Sistema**: Mosaite - Plataforma Educativa de Contabilidad
**Autor**: Luis Antonio Reis Viera
**Institución**: ESIM - ISFDyT