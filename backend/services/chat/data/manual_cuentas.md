# Manual de Cuentas - Mosaite




# Manual de Cuentas - Activo Corriente

## 1.1 ACTIVO CORRIENTE (11XXX)

Comprende los bienes y derechos que se espera convertir en efectivo o consumir dentro del ejercicio económico (12 meses).

---

## 11100 - CAJA Y BANCOS

### 11101 - Caja MN
**Descripción:** Registra el dinero en efectivo en moneda nacional que la empresa tiene disponible en su sede.

**Se debita por:**
- Cobros en efectivo de clientes
- Retiros de fondos del banco
- Ventas de contado
- Ingresos varios en efectivo

**Se acredita por:**
- Pagos en efectivo a proveedores
- Pagos de gastos
- Depósitos bancarios
- Anticipos al personal

**Ejemplo práctico:**
```
Venta de contado $50,000
DEBE: 11101 Caja MN..................... $50,000
HABER: 41101 Ventas de Mercaderías...... $50,000
```

**Observaciones:**
- Realizar arqueos de caja periódicos
- Documentar todos los movimientos con comprobantes
- Establecer un monto máximo de efectivo por seguridad
- No mezclar fondos personales con empresariales

---

### 11102 - Caja ME
**Descripción:** Registra el dinero en efectivo en moneda extranjera (dólares, euros, etc.).

**Se debita por:**
- Cobros en moneda extranjera
- Compra de divisas
- Retiros de cuentas en ME

**Se acredita por:**
- Pagos en moneda extranjera
- Venta de divisas
- Depósitos en cuentas ME

**Ejemplo práctico:**
```
Cobro de cliente en USD 1,000 (TC: $1,000)
DEBE: 11102 Caja ME..................... $1,000,000
HABER: 11201 Deudores por Ventas........ $1,000,000
```

**Observaciones:**
- Valuar al tipo de cambio vigente a la fecha de cada transacción
- Al cierre, ajustar por diferencia de cambio
- Mantener control físico separado de la moneda nacional

---

### 11103 - Banco Cuenta Corriente
**Descripción:** Registra los fondos depositados en cuentas corrientes bancarias.

**Se debita por:**
- Depósitos de efectivo o cheques
- Transferencias recibidas
- Cobros con tarjeta de débito
- Notas de crédito bancarias

**Se acredita por:**
- Emisión de cheques
- Transferencias realizadas
- Débitos automáticos
- Comisiones y gastos bancarios
- Notas de débito bancarias

**Ejemplo práctico:**
```
Depósito de efectivo en el banco $100,000
DEBE: 11103 Banco Cta. Cte............. $100,000
HABER: 11101 Caja MN.................... $100,000
```

**Observaciones:**
- Realizar conciliaciones bancarias mensuales
- Controlar los saldos disponibles vs. comprometidos
- Registrar los débitos bancarios al conocerse

---

### 11104 - Banco Caja de Ahorro
**Descripción:** Registra los fondos depositados en cajas de ahorro.

**Se debita por:**
- Depósitos realizados
- Transferencias recibidas
- Intereses ganados

**Se acredita por:**
- Extracciones realizadas
- Transferencias a otras cuentas
- Comisiones bancarias

**Ejemplo práctico:**
```
Intereses acreditados por el banco $5,000
DEBE: 11104 Banco Caja Ahorro........... $5,000
HABER: 41201 Intereses Ganados.......... $5,000
```

**Observaciones:**
- Generalmente tienen menor movimiento que cuentas corrientes
- Pueden generar intereses a favor
- Útil para mantener fondos de reserva

---

### 11105 - Recaudaciones a Depositar
**Descripción:** Cuenta transitoria que registra los fondos cobrados que aún no fueron depositados en el banco.

**Se debita por:**
- Cobros en efectivo o cheques pendientes de depósito
- Cobranzas del día

**Se acredita por:**
- Depósito efectivo en el banco
- Transferencia a caja

**Ejemplo práctico:**
```
Cobro de clientes al cierre del día $80,000
DEBE: 11105 Recaudaciones a Depositar.. $80,000
HABER: 11201 Deudores por Ventas........ $80,000

Al día siguiente, depósito en el banco:
DEBE: 11103 Banco Cta. Cte............. $80,000
HABER: 11105 Recaudaciones a Depositar. $80,000
```

**Observaciones:**
- Debe tener saldo cero una vez depositado
- Útil para control de cobranzas
- Depositar lo antes posible por seguridad

---

### 11106 - Fondos Fijos
**Descripción:** Registra el dinero asignado a un fondo fijo (caja chica) para gastos menores.

**Se debita por:**
- Constitución del fondo fijo
- Reposición del fondo

**Se acredita por:**
- Reducción del monto del fondo fijo
- Eliminación del fondo

**Ejemplo práctico:**
```
Constitución de fondo fijo $20,000
DEBE: 11106 Fondos Fijos................ $20,000
HABER: 11103 Banco Cta. Cte............. $20,000

Reposición por gastos realizados:
DEBE: 53801 Papelería y Útiles.......... $8,000
DEBE: 53806 Refrigerios................. $5,000
HABER: 11103 Banco Cta. Cte............. $13,000
```

**Observaciones:**
- El monto del fondo se mantiene constante
- Se repone periódicamente imputando los gastos realizados
- Requiere un responsable designado
- Establecer límite por comprobante

---

## 11200 - CRÉDITOS POR VENTAS

### 11201 - Deudores por Ventas
**Descripción:** Registra los importes que los clientes adeudan por ventas de mercaderías o servicios en cuenta corriente.

**Se debita por:**
- Ventas a crédito
- Intereses sobre saldos
- Notas de débito a clientes

**Se acredita por:**
- Cobros de clientes
- Devoluciones de mercaderías
- Descuentos y bonificaciones
- Notas de crédito emitidas
- Previsión por incobrables

**Ejemplo práctico:**
```
Venta a crédito $150,000
DEBE: 11201 Deudores por Ventas......... $150,000
HABER: 41101 Ventas de Mercaderías...... $150,000

Cobro parcial:
DEBE: 11103 Banco Cta. Cte............. $100,000
HABER: 11201 Deudores por Ventas........ $100,000
```

**Observaciones:**
- Llevar control individual por cliente (submayores)
- Analizar antigüedad de saldos mensualmente
- Evaluar necesidad de previsión para incobrables
- Verificar límites de crédito

---

### 11202 - Documentos a Cobrar
**Descripción:** Registra los pagarés, letras de cambio u otros documentos firmados por clientes.

**Se debita por:**
- Recepción de documentos por ventas
- Refinanciación de deudas con documentos
- Intereses incluidos en documentos

**Se acredita por:**
- Cobro de documentos al vencimiento
- Descuento de documentos en bancos
- Devolución de documentos rechazados (contrapartida: Deudores por Ventas)

**Ejemplo práctico:**
```
Cliente entrega pagaré por $200,000 a 90 días
DEBE: 11202 Documentos a Cobrar......... $200,000
HABER: 11201 Deudores por Ventas........ $200,000

Al cobrar:
DEBE: 11103 Banco Cta. Cte............. $200,000
HABER: 11202 Documentos a Cobrar........ $200,000
```

**Observaciones:**
- Custodiar físicamente los documentos
- Controlar vencimientos
- Si se descuentan, registrar el pasivo bancario
- Documentos rechazados: volver a Deudores por Ventas + gastos

---

### 11203 - Tarjetas de Crédito a Cobrar
**Descripción:** Registra las ventas realizadas con tarjetas de crédito pendientes de acreditación bancaria.

**Se debita por:**
- Ventas con tarjeta de crédito
- Importe bruto de la operación

**Se acredita por:**
- Acreditación bancaria
- Contracargo por reclamos

**Ejemplo práctico:**
```
Venta con tarjeta $100,000 (comisión 3% = $3,000)
DEBE: 11203 Tarjetas de Crédito a Cobrar $100,000
HABER: 41101 Ventas de Mercaderías....... $100,000

Al acreditarse:
DEBE: 11103 Banco Cta. Cte.............. $97,000
DEBE: 54102 Comisiones Bancarias........ $3,000
HABER: 11203 Tarjetas de Crédito a Cobrar $100,000
```

**Observaciones:**
- El plazo de acreditación varía según la tarjeta (24-72hs)
- Registrar la comisión al momento de la acreditación
- Controlar rechazos y contracargos

---

### 11204 - Cheques de Terceros en Cartera
**Descripción:** Registra los cheques recibidos de clientes que aún no fueron depositados ni endosados.

**Se debita por:**
- Recepción de cheques en pago

**Se acredita por:**
- Depósito de cheques
- Endoso a proveedores
- Cheques rechazados (volver a Deudores por Ventas)

**Ejemplo práctico:**
```
Cobro con cheque $75,000
DEBE: 11204 Cheques de Terceros......... $75,000
HABER: 11201 Deudores por Ventas........ $75,000

Depósito del cheque:
DEBE: 11103 Banco Cta. Cte............. $75,000
HABER: 11204 Cheques de Terceros........ $75,000
```

**Observaciones:**
- Custodiar físicamente los cheques
- Verificar: fecha, importe, firma, datos del librador
- Cheques rechazados: revertir + gastos de rechazo al cliente
- No incluir cheques propios

---

### 11205 - Cheques Diferidos
**Descripción:** Registra los cheques de pago diferido (con fecha de cobro posterior) recibidos de clientes.

**Se debita por:**
- Recepción de cheques diferidos

**Se acredita por:**
- Depósito al llegar la fecha
- Endoso a terceros
- Descuento en entidades financieras
- Devolución por rechazo

**Ejemplo práctico:**
```
Cobro con cheque diferido a 60 días $120,000
DEBE: 11205 Cheques Diferidos........... $120,000
HABER: 11201 Deudores por Ventas........ $120,000

Al vencimiento, depósito:
DEBE: 11103 Banco Cta. Cte............. $120,000
HABER: 11205 Cheques Diferidos.......... $120,000
```

**Observaciones:**
- No se pueden depositar antes de la fecha
- Pueden descontarse en bancos (con costo financiero)
- Mayor riesgo de rechazo que cheques comunes
- Controlar vencimientos

---

### 11206 - Previsión para Deudores Incobrables (REGULARIZADORA)
**Descripción:** Cuenta regularizadora del activo que estima las pérdidas por créditos que no se podrán cobrar.

**Se debita por:**
- Castigo de deudores incobrables (baja definitiva)
- Reducción de la previsión

**Se acredita por:**
- Constitución de la previsión
- Aumento de la previsión

**Ejemplo práctico:**
```
Constitución de previsión 5% sobre $500,000 de deudores
DEBE: 53903 Deudores Incobrables........ $25,000
HABER: 11206 Previsión Deudores Incobr. $25,000

Castigo de deudor incobrable $10,000:
DEBE: 11206 Previsión Deudores Incobr.. $10,000
HABER: 11201 Deudores por Ventas........ $10,000
```

**Observaciones:**
- No es una cuenta de pasivo, resta del activo
- Calcular según análisis de antigüedad de deudas
- Deducible impositivamente con ciertas condiciones
- Si se recupera un deudor castigado: ingreso extraordinario

---

## 11300 - OTROS CRÉDITOS

### 11301 - Anticipos a Proveedores
**Descripción:** Registra los pagos realizados a proveedores por anticipado, antes de recibir la mercadería o el servicio.

**Se debita por:**
- Pagos anticipados a proveedores
- Señas entregadas

**Se acredita por:**
- Recepción de la mercadería/servicio (se imputa a la compra)
- Devolución del anticipo

**Ejemplo práctico:**
```
Anticipo a proveedor $50,000
DEBE: 11301 Anticipos a Proveedores..... $50,000
HABER: 11103 Banco Cta. Cte............. $50,000

Al recibir la mercadería por $150,000:
DEBE: 11401 Mercaderías................. $150,000
HABER: 11301 Anticipos a Proveedores.... $50,000
HABER: 21101 Proveedores................ $100,000
```

**Observaciones:**
- Es un derecho, no un gasto
- Controlar que se reciban las mercaderías pactadas
- Solicitar comprobantes por los anticipos

---

### 11302 - Anticipos al Personal
**Descripción:** Registra los adelantos de sueldo u otros conceptos entregados a empleados.

**Se debita por:**
- Anticipos de sueldos
- Préstamos al personal
- Adelantos varios

**Se acredita por:**
- Descuento en liquidación de sueldos
- Devolución del anticipo

**Ejemplo práctico:**
```
Anticipo de sueldo a empleado $30,000
DEBE: 11302 Anticipos al Personal....... $30,000
HABER: 11101 Caja MN.................... $30,000

Liquidación de sueldo $100,000:
DEBE: 53101 Sueldos Administración...... $100,000
HABER: 11302 Anticipos al Personal...... $30,000
HABER: 21301 Sueldos a Pagar............ $70,000
```

**Observaciones:**
- Descontar en la liquidación del mes
- Documentar con recibo firmado
- Establecer política de anticipos
- No confundir con préstamos a largo plazo

---

### 11303 - Deudores Varios
**Descripción:** Registra créditos a favor de la empresa que no provienen de la actividad principal.

**Se debita por:**
- Préstamos a terceros
- Créditos por venta de bienes de uso
- Reclamos a terceros
- Saldos a favor varios

**Se acredita por:**
- Cobro de los créditos
- Castigo de créditos incobrables

**Ejemplo práctico:**
```
Venta de equipo usado en cuenta corriente $80,000
DEBE: 11303 Deudores Varios............. $80,000
HABER: 12105 Equipos.................... $60,000
HABER: 42101 Result. Venta Bienes de Uso $20,000

Cobro:
DEBE: 11103 Banco Cta. Cte............. $80,000
HABER: 11303 Deudores Varios............ $80,000
```

**Observaciones:**
- No incluir créditos por ventas (usar 11201)
- Analizar recuperabilidad
- Documentar adecuadamente

---

### 11304 - Préstamos al Personal
**Descripción:** Registra préstamos otorgados a empleados a devolver en cuotas.

**Se debita por:**
- Otorgamiento del préstamo
- Intereses devengados

**Se acredita por:**
- Cobro de cuotas
- Descuento de cuotas en sueldos
- Cancelación del préstamo

**Ejemplo práctico:**
```
Préstamo al personal $100,000 en 10 cuotas
DEBE: 11304 Préstamos al Personal....... $100,000
HABER: 11103 Banco Cta. Cte............. $100,000

Descuento cuota mensual $10,000:
DEBE: 53101 Sueldos Administración...... $80,000
HABER: 11304 Préstamos al Personal...... $10,000
HABER: 21301 Sueldos a Pagar............ $70,000
```

**Observaciones:**
- Formalizar con acuerdo firmado
- Establecer plan de cuotas
- Puede o no devengar intereses
- Si el plazo > 12 meses, reclasificar a largo plazo

---

### 11305 - IVA Crédito Fiscal
**Descripción:** Registra el IVA incluido en las compras y gastos, que constituye un crédito contra el fisco.

**Se debita por:**
- IVA en compras de mercaderías
- IVA en gastos
- IVA en importaciones
- Percepciones sufridas
- Retenciones sufridas

**Se acredita por:**
- Compensación con IVA Débito Fiscal
- Transferencia a saldos a favor (si quedó saldo)

**Ejemplo práctico:**
```
Compra de mercaderías $100,000 + IVA 21% = $121,000
DEBE: 11401 Mercaderías................. $100,000
DEBE: 11305 IVA Crédito Fiscal.......... $21,000
HABER: 21101 Proveedores................ $121,000

Liquidación mensual (IVA Débito $50,000 - Crédito $21,000):
DEBE: 21201 IVA Débito Fiscal........... $50,000
HABER: 11305 IVA Crédito Fiscal......... $21,000
HABER: 21202 IVA a Pagar................ $29,000
```

**Observaciones:**
- Solo válido con facturas y documentos legales
- Verificar que el proveedor esté inscripto
- Las percepciones y retenciones también son crédito fiscal
- Controlar topes y limitaciones según categoría fiscal

---

### 11306 - Percepciones de IVA
**Descripción:** Registra las percepciones de IVA sufridas en compras, que actúan como adelanto del impuesto.

**Se debita por:**
- Percepciones sufridas en compras
- Percepciones bancarias
- Percepciones aduaneras

**Se acredita por:**
- Compensación en liquidación de IVA
- Transferencia a saldo a favor

**Ejemplo práctico:**
```
Compra $100,000 + IVA $21,000 + Percepción IVA $2,100
DEBE: 11401 Mercaderías................. $100,000
DEBE: 11305 IVA Crédito Fiscal.......... $21,000
DEBE: 11306 Percepciones de IVA......... $2,100
HABER: 21101 Proveedores................ $123,100
```

**Observaciones:**
- Son un pago a cuenta del IVA
- Se compensan en la declaración mensual
- Diferentes alícuotas según régimen

---

### 11307 - Retenciones de IVA
**Descripción:** Registra las retenciones de IVA sufridas como vendedor, cuando el cliente actúa como agente de retención.

**Se debita por:**
- Retenciones sufridas en ventas

**Se acredita por:**
- Compensación en liquidación de IVA

**Ejemplo práctico:**
```
Venta $100,000 + IVA $21,000 - Retención IVA $2,100
DEBE: 11103 Banco Cta. Cte............. $118,900
DEBE: 11307 Retenciones de IVA.......... $2,100
HABER: 11201 Deudores por Ventas........ $121,000
```

**Observaciones:**
- Requiere certificado de retención del cliente
- Se compensa en la liquidación mensual de IVA
- Verificar que el cliente esté inscripto como agente de retención

---

### 11308 - Saldos a Favor Impositivos
**Descripción:** Registra saldos a favor de la empresa ante organismos fiscales (IVA, Ganancias, Ingresos Brutos, etc.).

**Se debita por:**
- Saldos a favor en liquidaciones impositivas
- Créditos fiscales a favor
- Pagos en exceso

**Se acredita por:**
- Compensación con otros impuestos
- Devolución del fisco
- Utilización en próximas liquidaciones

**Ejemplo práctico:**
```
Liquidación IVA con saldo a favor $15,000
DEBE: 21201 IVA Débito Fiscal........... $40,000
HABER: 11305 IVA Crédito Fiscal......... $55,000
HABER: 11308 Saldos a Favor Impositivos. $15,000

Compensación mes siguiente:
DEBE: 11308 Saldos a Favor Impositivos.. $15,000
DEBE: 21201 IVA Débito Fiscal........... $50,000
HABER: 11305 IVA Crédito Fiscal......... $45,000
HABER: 21202 IVA a Pagar................ $20,000
```

**Observaciones:**
- Solicitar devolución si persiste en el tiempo
- Se puede compensar con otros impuestos (con autorización)
- Verificar vencimiento de saldos

---

### 11309 - Gastos Pagados por Adelantado
**Descripción:** Registra gastos pagados que corresponden a períodos futuros (seguros, alquileres, suscripciones).

**Se debita por:**
- Pago anticipado de gastos

**Se acredita por:**
- Imputación del gasto al período correspondiente (devengamiento)

**Ejemplo práctico:**
```
Pago de seguro anual $120,000 (12 meses)
DEBE: 11309 Gastos Pagados por Adelantado $120,000
HABER: 11103 Banco Cta. Cte............... $120,000

Ajuste mensual (1/12):
DEBE: 53601 Seguros sobre Bienes de Uso.. $10,000
HABER: 11309 Gastos Pagados por Adelantado $10,000
```

**Observaciones:**
- Al cierre, devengar proporcionalmente
- Común en seguros, alquileres, suscripciones
- No confundir con anticipos a proveedores (que generan derecho a recibir algo)

---

## 11400 - BIENES DE CAMBIO

### 11401 - Mercaderías
**Descripción:** Registra las existencias de bienes destinados a la venta en el curso habitual de los negocios.

**Se debita por:**
- Compras de mercaderías
- Devoluciones de clientes
- Sobrantes de inventario

**Se acredita por:**
- Ventas (costo de ventas)
- Devoluciones a proveedores
- Faltantes de inventario
- Pérdidas, roturas, mermas

**Ejemplo práctico:**
```
Compra de mercaderías $200,000
DEBE: 11401 Mercaderías................. $200,000
DEBE: 11305 IVA Crédito Fiscal.......... $42,000
HABER: 21101 Proveedores................ $242,000

Venta (costo $150,000, precio $250,000):
DEBE: 11201 Deudores por Ventas......... $250,000
HABER: 41101 Ventas de Mercaderías...... $250,000

DEBE: 51101 Costo de Mercaderías Vendidas $150,000
HABER: 11401 Mercaderías................ $150,000
```

**Observaciones:**
- Requiere control de inventario permanente o periódico
- Realizar recuentos físicos periódicos
- Valuar según método adoptado (FIFO, PPP, etc.)
- Considerar desvalorización si hay obsolescencia

---

### 11402 - Mercaderías en Tránsito
**Descripción:** Registra mercaderías compradas que aún no fueron recibidas en depósito (en camino).

**Se debita por:**
- Compras de mercaderías pendientes de recepción

**Se acredita por:**
- Recepción de mercaderías (pasan a 11401)

**Ejemplo práctico:**
```
Compra de mercaderías $300,000, en camino
DEBE: 11402 Mercaderías en Tránsito..... $300,000
DEBE: 11305 IVA Crédito Fiscal.......... $63,000
HABER: 21101 Proveedores................ $363,000

Al recibir la mercadería:
DEBE: 11401 Mercaderías................. $300,000
HABER: 11402 Mercaderías en Tránsito.... $300,000
```

**Observaciones:**
- Importante en compras de importación
- Riesgo asumido según condición de compra (FOB, CIF, etc.)
- Controlar plazos de entrega

---

### 11403 - Materias Primas
**Descripción:** Registra los materiales que serán transformados en el proceso productivo.

**Se debita por:**
- Compras de materias primas
- Devoluciones de producción

**Se acredita por:**
- Consumo en producción
- Ventas de materias primas
- Mermas, roturas

**Ejemplo práctico:**
```
Compra de materia prima $150,000
DEBE: 11403 Materias Primas............. $150,000
DEBE: 11305 IVA Crédito Fiscal.......... $31,500
HABER: 21101 Proveedores................ $181,500

Consumo en producción:
DEBE: 11405 Productos en Proceso........ $100,000
HABER: 11403 Materias Primas............ $100,000
```

**Observaciones:**
- Requiere control de stock técnico
- Calcular mermas normales del proceso
- Valuar según método adoptado

---

### 11404 - Materiales
**Descripción:** Registra materiales auxiliares y suministros para la producción (no son parte directa del producto final).

**Se debita por:**
- Compras de materiales auxiliares

**Se acredita por:**
- Consumo en producción
- Aplicación a gastos de fabricación

**Ejemplo práctico:**
```
Compra de materiales auxiliares $50,000
DEBE: 11404 Materiales.................. $50,000
DEBE: 11305 IVA Crédito Fiscal.......... $10,500
HABER: 21101 Proveedores................ $60,500
```

**Observaciones:**
- Incluye: envases, etiquetas, insumos menores
- Generalmente se imputa como costo indirecto

---

### 11405 - Productos en Proceso
**Descripción:** Registra los productos que están en proceso de elaboración (no terminados).

**Se debita por:**
- Consumo de materias primas
- Mano de obra directa aplicada
- Gastos de fabricación aplicados

**Se acredita por:**
- Transferencia a productos terminados

**Ejemplo práctico:**
```
Aplicación de costos a producción en proceso:
DEBE: 11405 Productos en Proceso........ $250,000
HABER: 11403 Materias Primas............ $150,000
HABER: 53101 Sueldos.................... $70,000
HABER: 53301 Energía Eléctrica.......... $30,000

Terminación de productos:
DEBE: 11406 Productos Terminados........ $250,000
HABER: 11405 Productos en Proceso....... $250,000
```

**Observaciones:**
- Requiere sistema de costos
- Inventariar al cierre (productos semi-elaborados)
- Incluir todos los costos directos e indirectos

---

### 11406 - Productos Terminados
**Descripción:** Registra los productos fabricados listos para la venta.

**Se debita por:**
- Transferencia desde productos en proceso
- Sobrantes de inventario

**Se acredita por:**
- Ventas (costo de ventas)
- Faltantes de inventario
- Roturas, mermas

**Ejemplo práctico:**
```
Productos terminados que pasan de proceso:
DEBE: 11406 Productos Terminados........ $250,000
HABER: 11405 Productos en Proceso....... $250,000

Venta de productos (precio $400,000):
DEBE: 11201 Deudores por Ventas......... $400,000
HABER: 41102 Ventas Productos Manufact.. $400,000

DEBE: 51102 Costo Productos Vendidos.... $250,000
HABER: 11406 Productos Terminados....... $250,000
```

**Observaciones:**
- Stock listo para comercializar
- Realizar inventarios físicos periódicos
- Comparar costo de producción vs. precio de venta
- Considerar obsolescencia

---

### 11407 - Previsión para Desvalorización (REGULARIZADORA)
**Descripción:** Cuenta regularizadora que refleja la pérdida de valor de bienes de cambio por obsolescencia, deterioro o caída de precios.

**Se debita por:**
- Baja de mercaderías desvalorizadas
- Reducción de la previsión

**Se acredita por:**
- Constitución de la previsión
- Aumento de la previsión

**Ejemplo práctico:**
```
Mercadería obsoleta valorizada en $80,000, VNR $50,000
Previsión necesaria: $30,000

DEBE: 51101 Costo de Mercaderías Vendidas $30,000
HABER: 11407 Previsión Desvalorización... $30,000

Baja definitiva de mercadería:
DEBE: 11407 Previsión Desvalorización... $30,000
DEBE: 55102 Pérdidas Extraordinarias..... $50,000
HABER: 11401 Mercaderías................. $80,000
```

**Observaciones:**
- No es una cuenta de pasivo, resta del activo
- Aplicar cuando el valor recuperable < costo
- Común en mercaderías de temporada
- Evaluar: deterioro físico, obsolescencia, caída de precios

---

## 11500 - INVERSIONES TEMPORARIAS

### 11501 - Plazos Fijos
**Descripción:** Registra las inversiones en plazos fijos bancarios a corto plazo (hasta 12 meses).

**Se debita por:**
- Constitución del plazo fijo
- Renovación automática (capital + intereses)

**Se acredita por:**
- Rescate del plazo fijo
- Cancelación anticipada

**Ejemplo práctico:**
```
Constitución de plazo fijo $500,000 a 90 días
DEBE: 11501 Plazos Fijos................ $500,000
HABER: 11103 Banco Cta. Cte............. $500,000

Al vencimiento (interés ganado $25,000):
DEBE: 11103 Banco Cta. Cte............. $525,000
HABER: 11501 Plazos Fijos............... $500,000
HABER: 41201 Intereses Ganados.......... $25,000
```

**Observaciones:**
- Devengar intereses proporcionalmente al cierre
- Indicar banco, plazo, tasa y vencimiento
- Considerar UVA, dólares u otras monedas
- Si plazo > 12 meses: reclasificar a Activo No Corriente

---

### 11502 - Acciones
**Descripción:** Registra inversiones en acciones de sociedades con intención de venta en el corto plazo.

**Se debita por:**
- Compra de acciones
- Dividendos en acciones recibidos

**Se acredita por:**
- Venta de acciones
- Baja por caída de valor

**Ejemplo práctico:**
```
Compra de 1,000 acciones a $100 c/u
DEBE: 11502 Acciones.................... $100,000
HABER: 11103 Banco Cta. Cte............. $100,000

Venta a $120 c/u:
DEBE: 11103 Banco Cta. Cte............. $120,000
HABER: 11502 Acciones................... $100,000
HABER: 41201 Intereses Ganados.......... $20,000
```

**Observaciones:**
- Valuar a valor de mercado al cierre
- Reconocer resultados por tenencia
- Controlar dividendos declarados
- Si intención es LP: reclasificar a Inversiones Permanentes

---

### 11503 - Títulos Públicos
**Descripción:** Registra inversiones en bonos, letras y otros títulos del gobierno.

**Se debita por:**
- Compra de títulos públicos
- Intereses devengados (renta)

**Se acredita por:**
- Venta de títulos
- Rescate al vencimiento
- Cobro de rentas

**Ejemplo práctico:**
```
Compra de bonos $200,000
DEBE: 11503 Títulos Públicos............ $200,000
HABER: 11103 Banco Cta. Cte............. $200,000

Cobro de renta semestral $10,000:
DEBE: 11103 Banco Cta. Cte............. $10,000
HABER: 41201 Intereses Ganados.......... $10,000
```

**Observaciones:**
- Valuar según cotización al cierre
- Devengar renta proporcionalmente
- Considerar riesgo país
- Variaciones de precio: resultados por tenencia

---

### 11504 - Fondos Comunes de Inversión
**Descripción:** Registra las cuotapartes de fondos comunes de inversión.

**Se debita por:**
- Suscripción de cuotapartes
- Reinversión de resultados

**Se acredita por:**
- Rescate de cuotapartes

**Ejemplo práctico:**
```
Suscripción de 5,000 cuotapartes a $50
DEBE: 11504 Fondos Comunes Inversión.... $250,000
HABER: 11103 Banco Cta. Cte............. $250,000

Rescate a $55 c/u:
DEBE: 11103 Banco Cta. Cte............. $275,000
HABER: 11504 Fondos Comunes Inversión... $250,000
HABER: 41201 Intereses Ganados.......... $25,000
```

**Observaciones:**
- Valuar al valor de la cuotaparte al cierre
- Existen distintos tipos (renta fija, variable, mixtos)
- Liquidez según tipo de fondo
- Considerar costos de gestión

---

## OBSERVACIONES GENERALES DEL ACTIVO CORRIENTE

1. **Liquidez:** Los activos corrientes deben poder convertirse en efectivo dentro de los 12 meses o el ciclo operativo.

2. **Orden de presentación:** Se presentan según el grado de liquidez (de mayor a menor).

3. **Cuentas regularizadoras:** Las previsiones (11206, 11407) se presentan restando de sus cuentas principales.

4. **Inventarios físicos:** Realizar recuentos periódicos de bienes de cambio y conciliaciones bancarias.

5. **Valuación:** 
   - Efectivo y bancos: valor nominal
   - Créditos: valor de cobro probable
   - Bienes de cambio: costo o VNR, el menor
   - Inversiones temporarias: valor de mercado

6. **Control interno:** Implementar segregación de funciones, autorizaciones y documentación de todas las operaciones.

7. **Cierre de ejercicio:** Realizar ajustes por devengamiento, valuación y previsiones necesarias.

---

# Manual de Cuentas - Activo No Corriente

## 1.2 ACTIVO NO CORRIENTE (12XXX)

Comprende los bienes, derechos e intangibles que la empresa mantiene a largo plazo (más de 12 meses) para su funcionamiento y desarrollo, sin intención de venderlos en el curso ordinario del negocio.

---

## 12100 - BIENES DE USO

### 12101 - Terrenos
**Descripción:** Registra los terrenos propiedad de la empresa destinados a la explotación del negocio (sede, depósito, fábrica, etc.).

**Se debita por:**
- Compra de terrenos
- Mejoras permanentes al terreno
- Gastos de escrituración y registración
- Revalúos técnicos

**Se acredita por:**
- Venta de terrenos
- Baja por pérdida total

**Ejemplo práctico:**
```
Compra de terreno $500,000
DEBE: 12101 Terrenos.................... $500,000
DEBE: 11305 IVA Crédito Fiscal.......... $0 (No tributa IVA)
HABER: 11103 Banco Cta. Cte............. $500,000

Gastos de escritura y registro $15,000:
DEBE: 12101 Terrenos.................... $15,000
HABER: 11103 Banco Cta. Cte............. $15,000

Venta años después en $700,000:
DEBE: 11103 Banco Cta. Cte............. $700,000
HABER: 12101 Terrenos................... $515,000
HABER: 42101 Result. Venta Bienes de Uso $185,000
```

**Observaciones:**
- NO se deprecian (vida útil indefinida)
- Incluir gastos de adquisición en el costo inicial
- Registrar ubicación y características del terreno
- Mantener título de propiedad actualizado
- En caso de revalúo: pasar a Patrimonio Neto

---

### 12102 - Edificios
**Descripción:** Registra las construcciones e inmuebles (oficinas, fábricas, almacenes) propiedad de la empresa.

**Se debita por:**
- Compra de edificios
- Ampliaciones y mejoras de larga duración
- Gastos de construcción

**Se acredita por:**
- Venta de edificios
- Baja por demolición o pérdida total

**Ejemplo práctico:**
```
Compra de edificio $1,000,000
DEBE: 12102 Edificios................... $1,000,000
HABER: 11103 Banco Cta. Cte............. $1,000,000

Ampliación del edificio $200,000:
DEBE: 12102 Edificios................... $200,000
HABER: 11103 Banco Cta. Cte............. $200,000
```

**Observaciones:**
- Se deprecia (vida útil limitada)
- Separar del terreno para depreciar correctamente
- Incluir costo de escrituración
- Mejoras que prolongan vida útil se capitalizan
- Reparaciones ordinarias se imputan a gastos

---

### 12103 - Instalaciones
**Descripción:** Registra instalaciones fijas incorporadas al inmueble (sistemas de agua, electricidad, gas, aire acondicionado, equipos de seguridad, etc.).

**Se debita por:**
- Instalación de sistemas fijos
- Ampliación o mejora de instalaciones

**Se acredita por:**
- Remoción de instalaciones
- Baja por obsolescencia

**Ejemplo práctico:**
```
Instalación de sistema de aire acondicionado $80,000
DEBE: 12103 Instalaciones............... $80,000
HABER: 11103 Banco Cta. Cte............. $80,000
```

**Observaciones:**
- Se deprecian
- Deben estar incorporadas al inmueble
- Vida útil según tipo de instalación
- Separadas del edificio para control específico

---

### 12104 - Maquinarias
**Descripción:** Registra máquinas y equipos utilizados en el proceso productivo o comercial.

**Se debita por:**
- Compra de máquinas
- Ampliaciones, adaptaciones
- Costo de instalación

**Se acredita por:**
- Venta de máquinas
- Baja por obsolescencia

**Ejemplo práctico:**
```
Compra de máquina de producción $300,000 + instalación $20,000
DEBE: 12104 Maquinarias................ $320,000
HABER: 11103 Banco Cta. Cte............ $320,000

Mantenimiento ordinario $5,000 (NO se capitaliza):
DEBE: 53205 Servicios de Mantenimiento.. $5,000
HABER: 11103 Banco Cta. Cte............ $5,000
```

**Observaciones:**
- Se deprecian (generalmente entre 5 y 20 años)
- Incluir flete, seguro y gastos de instalación
- Reparaciones ordinarias son gastos
- Repuestos importantes se pueden capitalizar

---

### 12105 - Equipos
**Descripción:** Registra equipos diversos utilizados en el negocio (laboratorio, procesamiento, etc.).

**Se debita por:**
- Compra de equipos
- Accesorios importantes

**Se acredita por:**
- Venta de equipos
- Baja

**Ejemplo práctico:**
```
Compra de equipo de laboratorio $150,000
DEBE: 12105 Equipos.................... $150,000
HABER: 11103 Banco Cta. Cte............ $150,000
```

**Observaciones:**
- Se deprecian
- Incluir costos de traslado e instalación
- Mantener registro técnico

---

### 12106 - Rodados
**Descripción:** Registra vehículos automotores (autos, camiones, etc.) utilizados por la empresa.

**Se debita por:**
- Compra de vehículos
- Accesorios importantes

**Se acredita por:**
- Venta de vehículos
- Baja

**Ejemplo práctico:**
```
Compra de camión $800,000
DEBE: 12106 Rodados.................... $800,000
HABER: 11103 Banco Cta. Cte............ $800,000

Gasto de mantenimiento $20,000:
DEBE: 53205 Servicios de Mantenimiento.. $20,000
HABER: 11103 Banco Cta. Cte............ $20,000
```

**Observaciones:**
- Se deprecian (generalmente 5-10 años)
- Mantener registro de quilometraje
- Incluir gastos de patente, seguro en gastos (no en activo)
- Separar por uso (administración, ventas, distribución)

---

### 12107 - Muebles y Útiles
**Descripción:** Registra muebles, escritorios, estantes, armarios y otros bienes menores de administración.

**Se debita por:**
- Compra de muebles y útiles

**Se acredita por:**
- Venta o baja de muebles

**Ejemplo práctico:**
```
Compra de 10 escritorios $50,000
DEBE: 12107 Muebles y Útiles........... $50,000
HABER: 11103 Banco Cta. Cte............ $50,000
```

**Observaciones:**
- Se deprecian (generalmente 10 años)
- Mantener registro detallado de items
- Realizar inventarios físicos anualmente
- Vida útil generalmente larga

---

### 12108 - Equipos de Computación
**Descripción:** Registra computadoras, servidores, impresoras, scanners y equipos informáticos.

**Se debita por:**
- Compra de equipos informáticos
- Periféricos principales

**Se acredita por:**
- Venta de equipos
- Baja por obsolescencia

**Ejemplo práctico:**
```
Compra de servidor $120,000 + 20 computadoras $100,000
DEBE: 12108 Equipos de Computación.... $220,000
HABER: 11103 Banco Cta. Cte............ $220,000

Tinta de impresora $5,000 (GASTO, no se capitaliza):
DEBE: 53801 Papelería y Útiles......... $5,000
HABER: 11103 Banco Cta. Cte............ $5,000
```

**Observaciones:**
- Se deprecian rápidamente (generalmente 3-5 años)
- Mantener registro de serie y configuración
- Consumibles (tinta, papel) son gastos
- Vida útil reducida por cambios tecnológicos

---

### 12109 - Herramientas
**Descripción:** Registra herramientas de uso en producción o servicios (taladros, sierras, compresores, etc.).

**Se debita por:**
- Compra de herramientas

**Se acredita por:**
- Baja de herramientas por uso o rotura

**Ejemplo práctico:**
```
Compra de herramientas $80,000
DEBE: 12109 Herramientas............... $80,000
HABER: 11103 Banco Cta. Cte............ $80,000
```

**Observaciones:**
- Se deprecian
- Generalmente vida útil 5-10 años
- Mantener inventario técnico
- Reparaciones menores son gastos

---

## 12200 - DEPRECIACIONES ACUMULADAS (REGULARIZADORAS)

**Concepto general:** Las depreciaciones acumuladas son cuentas regularizadoras que restan de los bienes de uso. Representan la pérdida de valor de los activos por su uso a lo largo del tiempo.

---

### 12201 - Depreciación Acum. Edificios
**Descripción:** Registra la depreciación acumulada de los edificios según la vida útil establecida.

**Se debita por:**
- Baja de edificios (contraparte: 12102)
- Reducción de depreciación

**Se acredita por:**
- Registro de depreciación mensual/anual

**Ejemplo práctico:**
```
Edificio costo $1,200,000, vida útil 50 años
Depreciación anual: $1,200,000 / 50 = $24,000
Depreciación mensual: $2,000

Al final de cada mes:
DEBE: 53701 Depreciación Bienes de Uso. $2,000
HABER: 12201 Deprec. Acum. Edificios... $2,000

Después de 10 años (120 asientos):
Saldo acreedor 12201: $240,000
En balance se presenta: Edificios $1,200,000 - Deprec. Acum. $240,000 = Neto $960,000
```

**Observaciones:**
- Vida útil: generalmente 50 años para edificios
- Método líneal es el más común
- Registrar mensualmente o acumular en cierre
- No depreciar terrenos

---

### 12202 - Depreciación Acum. Instalaciones
**Descripción:** Registra la depreciación acumulada de las instalaciones.

**Se debita por:**
- Baja de instalaciones

**Se acredita por:**
- Registro de depreciación

**Ejemplo práctico:**
```
Instalaciones $80,000, vida útil 20 años
Depreciación anual: $4,000 / 12 = $333.33 mensual

DEBE: 53701 Depreciación Bienes de Uso. $333.33
HABER: 12202 Deprec. Acum. Instalaciones $333.33
```

**Observaciones:**
- Vida útil: 15-25 años típicamente
- Método líneal generalmente

---

### 12203 - Depreciación Acum. Maquinarias
**Descripción:** Registra la depreciación acumulada de máquinas y equipos productivos.

**Se debita por:**
- Baja de máquinas

**Se acredita por:**
- Registro de depreciación

**Ejemplo práctico:**
```
Máquina $320,000, vida útil 10 años
Depreciación anual: $32,000
Depreciación mensual: $2,666.67

DEBE: 53701 Depreciación Bienes de Uso. $2,666.67
HABER: 12203 Deprec. Acum. Maquinarias $2,666.67
```

**Observaciones:**
- Vida útil: 5-15 años típicamente
- Considerar método acelerado si hay uso intensivo

---

### 12204 - Depreciación Acum. Equipos
**Descripción:** Registra la depreciación acumulada de equipos diversos.

**Observaciones:**
- Vida útil según tipo de equipo (5-20 años)
- Seguir misma metodología que maquinarias

---

### 12205 - Depreciación Acum. Rodados
**Descripción:** Registra la depreciación acumulada de vehículos.

**Se debita por:**
- Baja de vehículos

**Se acredita por:**
- Registro de depreciación

**Ejemplo práctico:**
```
Camión $800,000, vida útil 8 años
Depreciación anual: $100,000
Depreciación mensual: $8,333.33

DEBE: 53701 Depreciación Bienes de Uso. $8,333.33
HABER: 12205 Deprec. Acum. Rodados... $8,333.33
```

**Observaciones:**
- Vida útil: 5-10 años típicamente
- Considerar quilometraje si es relevante
- Pueden depreciarse más en primeros años

---

### 12206 - Depreciación Acum. Muebles y Útiles
**Descripción:** Registra la depreciación acumulada de muebles de oficina.

**Ejemplo práctico:**
```
Muebles $50,000, vida útil 10 años
Depreciación anual: $5,000
Depreciación mensual: $416.67

DEBE: 53701 Depreciación Bienes de Uso. $416.67
HABER: 12206 Deprec. Acum. Muebles.... $416.67
```

**Observaciones:**
- Vida útil: generalmente 10 años
- Vida útil larga por durabilidad

---

### 12207 - Depreciación Acum. Equipos de Computación
**Descripción:** Registra la depreciación acumulada de equipos informáticos.

**Se debita por:**
- Baja de equipos informáticos

**Se acredita por:**
- Registro de depreciación

**Ejemplo práctico:**
```
Computadoras $100,000, vida útil 4 años
Depreciación anual: $25,000
Depreciación mensual: $2,083.33

DEBE: 53701 Depreciación Bienes de Uso. $2,083.33
HABER: 12207 Deprec. Acum. Equipos Comp. $2,083.33
```

**Observaciones:**
- Vida útil: 3-5 años (rápida obsolescencia)
- Puede usarse depreciación acelerada
- Servidores pueden tener vida mayor

---

### 12208 - Depreciación Acum. Herramientas
**Descripción:** Registra la depreciación acumulada de herramientas.

**Observaciones:**
- Vida útil: 5-10 años
- Pueden tener baja más rápida por uso intensivo

---

## 12300 - ACTIVOS INTANGIBLES

### 12301 - Marcas
**Descripción:** Registra el costo de adquisición o desarrollo de marcas comerciales.

**Se debita por:**
- Compra de marcas registradas
- Costo de registro en INPI

**Se acredita por:**
- Baja de marcas

**Ejemplo práctico:**
```
Compra de marca registrada $500,000
DEBE: 12301 Marcas.................... $500,000
HABER: 11103 Banco Cta. Cte........... $500,000

Registro INPI $10,000:
DEBE: 12301 Marcas.................... $10,000
HABER: 11103 Banco Cta. Cte........... $10,000
```

**Observaciones:**
- Si se desarrolla internamente: no se capitaliza (se imputa a gastos)
- Solo se capitaliza si se compra a terceros
- Vida útil: según duración del registro

---

### 12302 - Patentes
**Descripción:** Registra derechos de patentes de procesos o productos.

**Se debita por:**
- Compra de patentes
- Gastos de solicitud y registro

**Se acredita por:**
- Baja de patentes

**Ejemplo práctico:**
```
Compra de patente $1,000,000
DEBE: 12302 Patentes.................. $1,000,000
HABER: 11103 Banco Cta. Cte........... $1,000,000
```

**Observaciones:**
- Solo se capitalizan si se compran
- Desarrollo interno se imputa a gastos
- Vida útil: según duración legal de la patente (típicamente 20 años)

---

### 12303 - Licencias
**Descripción:** Registra licencias de software, marcas u otros derechos licenciados.

**Se debita por:**
- Compra de licencias
- Renovaciones (si son de larga duración)

**Se acredita por:**
- Amortización de licencias

**Ejemplo práctico:**
```
Compra de licencia de software plurianual $200,000 (5 años)
DEBE: 12303 Licencias................ $200,000
HABER: 11103 Banco Cta. Cte.......... $200,000

Renovación anual de licencia de marca $50,000 (1 año):
Se imputa directamente a gastos:
DEBE: 53205 Servicios de Mantenimiento. $50,000
HABER: 11103 Banco Cta. Cte.......... $50,000
```

**Observaciones:**
- Licencias anuales: se imputan a gastos
- Licencias plurianuales: se capitalizan y amortizan
- Derechos no renovables según contrato

---

### 12304 - Software
**Descripción:** Registra sistemas informáticos y aplicaciones desarrolladas o compradas.

**Se debita por:**
- Compra de software
- Desarrollo interno capitalizable
- Implementación y personalización

**Se acredita por:**
- Amortización de software

**Ejemplo práctico:**
```
Compra de sistema ERP $500,000 + implementación $150,000
DEBE: 12304 Software................. $650,000
HABER: 11103 Banco Cta. Cte.......... $650,000

Licencias anuales de mantenimiento $80,000:
DEBE: 53205 Servicios de Mantenimiento. $80,000
HABER: 11103 Banco Cta. Cte.......... $80,000
```

**Observaciones:**
- Incluir costos de implementación y personalización
- Mantenimiento anual es gasto
- Vida útil: 3-10 años (según tipo)
- Actualizaciones pueden ser gasto o se capitalizan

---

### 12305 - Llave de Negocio
**Descripción:** Registra la llave de negocio (goodwill) pagada en compra de negocios en marcha.

**Se debita por:**
- Compra de negocio a precio superior a valor patrimonial

**Se acredita por:**
- Amortización anual

**Ejemplo práctico:**
```
Compra de negocio en marcha:
Activos identificables $2,000,000
Pasivos identificables $500,000
Patrimonio identificable $1,500,000
Precio pagado $2,200,000

Llave de negocio = $2,200,000 - $1,500,000 = $700,000

DEBE: Activos..................... $2,000,000
DEBE: 12305 Llave de Negocio....... $700,000
HABER: Pasivos..................... $500,000
HABER: 11103 Banco Cta. Cte........ $2,200,000
```

**Observaciones:**
- Solo se capitaliza cuando se compra
- Amortizable en período determinado
- Requiere prueba de deterioro periódica
- NIIF requiere análisis de impairment

---

### 12306 - Gastos de Organización
**Descripción:** Registra gastos de constitución de la empresa y gastos previos a la operación.

**Se debita por:**
- Gastos de escrituración
- Gastos legales de constitución
- Permisos y licencias

**Se acredita por:**
- Amortización anual

**Ejemplo práctico:**
```
Gastos de constitución:
- Escritura pública $15,000
- Registración CUIT $5,000
- Permisos municipales $10,000
Total $30,000

DEBE: 12306 Gastos de Organización... $30,000
HABER: 11103 Banco Cta. Cte......... $30,000
```

**Observaciones:**
- Se amortizan en 5 años típicamente
- No son gastos recurrentes
- Aplicable al inicio de la empresa

---

### 12307 - Gastos de Desarrollo
**Descripción:** Registra gastos en actividades de desarrollo que generan activos intangibles.

**Se debita por:**
- Gastos de desarrollo de productos
- Gastos de investigación capitalizable

**Se acredita por:**
- Amortización de desarrollo

**Ejemplo práctico:**
```
Desarrollo de nueva línea de productos:
- Investigación de mercado $50,000
- Desarrollo técnico $150,000
- Pruebas $30,000
Total $230,000

DEBE: 12307 Gastos de Desarrollo.... $230,000
HABER: 11103 Banco Cta. Cte........ $230,000
```

**Observaciones:**
- Debe tener probabilidad alta de éxito
- Investigación pura: se imputa a gastos
- Vida útil según período de beneficio esperado

---

## 12400 - AMORTIZACIONES ACUMULADAS (REGULARIZADORAS)

**Concepto general:** Las amortizaciones acumuladas son cuentas regularizadoras que restan de los intangibles. Representan la pérdida de valor de estos activos.

---

### 12401 - Amortización Acum. Marcas
**Descripción:** Registra la amortización acumulada de marcas.

**Se debita por:**
- Baja de marcas

**Se acredita por:**
- Registro de amortización

**Ejemplo práctico:**
```
Marca $510,000, vida útil 5 años
Amortización anual: $102,000
Amortización mensual: $8,500

DEBE: 53702 Amortización Intangibles... $8,500
HABER: 12401 Amort. Acum. Marcas.... $8,500
```

**Observaciones:**
- Vida útil según duración del registro de marca
- Método líneal generalmente

---

### 12402 - Amortización Acum. Patentes
**Descripción:** Registra la amortización acumulada de patentes.

**Observaciones:**
- Vida útil: típicamente 20 años
- Puede ser menor si se considera obsolescencia

---

### 12403 - Amortización Acum. Licencias
**Descripción:** Registra la amortización acumulada de licencias plurianuales.

---

### 12404 - Amortización Acum. Software
**Descripción:** Registra la amortización acumulada de sistemas de software.

**Ejemplo práctico:**
```
Software $650,000, vida útil 5 años
Amortización anual: $130,000
Amortización mensual: $10,833.33

DEBE: 53702 Amortización Intangibles... $10,833.33
HABER: 12404 Amort. Acum. Software... $10,833.33
```

**Observaciones:**
- Vida útil: 3-10 años según tipo
- Software puede tener vida útil corta

---

### 12405 - Amortización Acum. Llave de Negocio
**Descripción:** Registra la amortización acumulada de la llave de negocio.

**Ejemplo práctico:**
```
Llave de negocio $700,000, vida útil 5 años
Amortización anual: $140,000
Amortización mensual: $11,666.67

DEBE: 53702 Amortización Intangibles... $11,666.67
HABER: 12405 Amort. Acum. Llave Negoc. $11,666.67
```

**Observaciones:**
- Vida útil a definir según circunstancias
- Requiere evaluación periódica por impairment

---

### 12406 - Amortización Acum. Gastos de Organización
**Descripción:** Registra la amortización acumulada de gastos de organización.

**Ejemplo práctico:**
```
Gastos de organización $30,000, vida útil 5 años
Amortización anual: $6,000
Amortización mensual: $500

DEBE: 53702 Amortización Intangibles... $500
HABER: 12406 Amort. Acum. Org....... $500
```

**Observaciones:**
- Vida útil típica: 5 años

---

## 12500 - INVERSIONES PERMANENTES

### 12501 - Inversiones en Sociedades Vinculadas
**Descripción:** Registra inversiones en acciones de sociedades relacionadas (filiales, asociadas).

**Se debita por:**
- Compra de acciones
- Aporte de capital
- Dividendos no cobrados (en algunos sistemas)

**Se acredita por:**
- Venta de inversiones
- Reducción de capital
- Baja por pérdida total

**Ejemplo práctico:**
```
Compra de 30% de la empresa vinculada
Inversión $3,000,000

DEBE: 12501 Inv. Sociedades Vinculadas $3,000,000
HABER: 11103 Banco Cta. Cte............ $3,000,000

Dividendo cobrado $200,000:
DEBE: 11103 Banco Cta. Cte............ $200,000
HABER: 41201 Intereses Ganados (o dividendos) $200,000

O bien, reclasificar:
DEBE: 11103 Banco Cta. Cte............ $200,000
HABER: 12501 Inv. Sociedades Vinculadas $200,000
```

**Observaciones:**
- Valuar por método de la participación (si es aplicable)
- Registrar ganancias/pérdidas de la asociada
- Considerar influencia significativa

---

### 12502 - Inversiones en Otras Sociedades
**Descripción:** Registra inversiones en acciones de sociedades no vinculadas con intención de mantenerlas a LP.

**Se debita por:**
- Compra de acciones
- Dividendos no cobrados en algunos sistemas

**Se acredita por:**
- Venta de acciones
- Baja

**Ejemplo práctico:**
```
Compra de 5% de empresa no vinculada
Inversión $500,000

DEBE: 12502 Inv. Otras Sociedades..... $500,000
HABER: 11103 Banco Cta. Cte........... $500,000

Dividendo cobrado:
DEBE: 11103 Banco Cta. Cte........... $30,000
HABER: 41201 Intereses Ganados....... $30,000
```

**Observaciones:**
- Valuar a costo o valor de mercado
- Considerar deterioro de valor
- Sin influencia significativa

---

### 12503 - Inmuebles para Renta
**Descripción:** Registra inmuebles destinados a generar rentas (no son para uso de la empresa).

**Se debita por:**
- Compra de inmuebles para alquilar
- Mejoras al inmueble

**Se acredita por:**
- Venta del inmueble
- Baja

**Ejemplo práctico:**
```
Compra de departamento para alquilar $400,000
DEBE: 12503 Inmuebles para Renta..... $400,000
HABER: 11103 Banco Cta. Cte.......... $400,000

Renta mensual cobrada $8,000:
DEBE: 11103 Banco Cta. Cte.......... $8,000
HABER: 41204 Alquileres Ganados..... $8,000
```

**Observaciones:**
- Se deprecian como bienes de uso
- Separar terreno de construcción
- Gastos de mantenimiento se restan de ingresos
- Genera ingresos para la empresa

---

## 12600 - OTROS ACTIVOS NO CORRIENTES

### 12601 - Depósitos en Garantía
**Descripción:** Registra depósitos realizados como garantía para contratos (depósito caución de alquileres, depósitos por licitaciones, etc.).

**Se debita por:**
- Depósito en garantía

**Se acredita por:**
- Devolución del depósito
- Aplicación del depósito (si se pierde)

**Ejemplo práctico:**
```
Depósito caución por alquiler de oficina (3 meses de renta)
DEBE: 12601 Depósitos en Garantía.... $120,000
HABER: 11103 Banco Cta. Cte.......... $120,000

Al finalizar contrato (devolución):
DEBE: 11103 Banco Cta. Cte............ $120,000
HABER: 12601 Depósitos en Garantía... $120,000
```

**Observaciones:**
- No genera ingresos ni gastos directos
- Se recupera al finalizar el contrato
- Puede estar retenido parcialmente si hay reclamos

---

### 12602 - Créditos a Largo Plazo
**Descripción:** Registra créditos a favor de la empresa con vencimiento superior a 12 meses.

**Se debita por:**
- Otorgamiento de créditos a LP
- Intereses devengados

**Se acredita por:**
- Cobro de cuotas
- Cancelación anticipada

**Ejemplo práctico:**
```
Venta de bien de uso en 24 cuotas, total $600,000
(Primera cuota vence en >12 meses)

DEBE: 12602 Créditos a Largo Plazo... $600,000
HABER: 12101 Terrenos (o equipo vendido) $400,000
HABER: 42101 Result. Venta Bienes de Uso $200,000

Cobro mensual cuota (después del mes 12):
DEBE: 11103 Banco Cta. Cte.......... $25,000
HABER: 12602 Créditos a Largo Plazo. $25,000
```

**Observaciones:**
- Separar de créditos a corto plazo (11303)
- Considerar intereses si corresponde
- Evaluar recuperabilidad

---

## OBSERVACIONES GENERALES DEL ACTIVO NO CORRIENTE

### 1. Capitalización vs. Gasto
**Se capitaliza (activo):**
- Compra de bienes de uso
- Gastos de instalación, transporte, montaje
- Ampliaciones que aumentan capacidad o vida útil
- Gastos de desarrollo con alta probabilidad de éxito

**Se imputa a gastos:**
- Reparaciones y mantenimiento ordinario
- Reemplazos menores
- Consumibles (tinta, papel, combustible)
- Investigación pura (sin aplicación comercial)

---

### 2. Depreciación y Amortización
**Activos que se deprecian:**
- Edificios, instalaciones, maquinarias, equipos, rodados, muebles, computación, herramientas

**Activos que NO se deprecian:**
- Terrenos (vida útil indefinida)
- Inversiones permanentes
- Depósitos en garantía

**Activos que se amortizan:**
- Marcas, patentes, licencias, software, llave de negocio, gastos de organización, gastos de desarrollo

**Método de depreciación/amortización:**
- Línea recta es el más común
- Puede usarse depreciación acelerada en ciertos casos

---

### 3. Vidas Útiles Recomendadas

| Activo | Vida Útil |
|--------|-----------|
| Edificios | 50 años |
| Instalaciones | 15-25 años |
| Maquinarias | 5-15 años |
| Equipos | 5-10 años |
| Rodados | 5-10 años |
| Muebles | 10 años |
| Equipos Computación | 3-5 años |
| Herramientas | 5-10 años |
| Marcas | 5-10 años |
| Patentes | 20 años |
| Software | 3-10 años |
| Llave de Negocio | 5-10 años |
| Gastos Organización | 5 años |

---

### 4. Baja de Activos
Al vender o dar de baja un activo:

```
Venta de máquina:
- Costo original: $300,000
- Depreciación acumulada: $200,000
- Valor neto en libros: $100,000
- Precio de venta: $120,000
- Ganancia: $20,000

DEBE: 11103 Banco Cta. Cte............ $120,000
DEBE: 12203 Deprec. Acum. Maquinarias $200,000
HABER: 12104 Maquinarias.............. $300,000
HABER: 42101 Result. Venta Bienes Uso $20,000
```

---

### 5. Mejoras vs. Reparaciones

**MEJORAS (se capitalizan):**
- Ampliación de edificio: + costo, + vida útil
- Renovación de instalaciones: mejora funcionalidad
- Actualización de maquinaria: + capacidad
- Ampliación de software: + funcionalidades

**REPARACIONES (se gastan):**
- Repintado de pared
- Reparación de motor
- Cambio de tuberías dañadas
- Parches de software

**Criterio:** Si aumenta vida útil, capacidad o mejora significativa → Capitalizar. Si solo mantiene en condiciones normales → Gasto.

---

### 6. Ajuste por Inflación
En períodos de inflación significativa:
- Puede requerirse revalúo técnico de bienes de uso
- Las revaluaciones se registran en Patrimonio Neto
- La depreciación se calcula sobre valor revaluado

---

### 7. Impairment (Deterioro)
Anualmente evaluar si el valor del activo se ha deteriorado:
- Intangibles (especialmente llave de negocio)
- Bienes de uso obsoletos
- Inversiones permanentes con problemas

Si hay deterioro:
```
Baja por impairment de software $50,000:
DEBE: 53702 Amortización Intangibles.. $50,000
HABER: 12304 Software................. $50,000
```

---

### 8. Control Interno
- Mantener registro detallado de cada activo (código, descripción, ubicación, responsable)
- Realizar inventarios físicos anualmente
- Controlar transferencias de activos
- Autorizar altas y bajas
- Separar funciones: compra, recepción, contabilización, custodia

---

### 9. Presentación en Balance
Los activos no corrientes se presentan neto (después de restar depreciaciones/amortizaciones acumuladas):

**ACTIVO NO CORRIENTE**
Bienes de Uso:
- Edificios: $1,200,000
- Menos: Deprec. Acum.: ($240,000)
- Neto: $960,000

Activos Intangibles:
- Software: $650,000
- Menos: Amort. Acum.: ($130,000)
- Neto: $520,000

Inversiones Permanentes:
- Sociedades Vinculadas: $3,000,000

---

### 10. Notas al Balance
Es recomendable incluir en notas:
- Composición de bienes de uso
- Vidas útiles aplicadas
- Depreciaciones del período
- Cambios en intangibles
- Bajas realizadas
- Compromisos de compra

---

## RESUMEN POR RUBRO

**12100 - BIENES DE USO (9 cuentas):**
- Tangibles de larga duración
- Destinados al funcionamiento del negocio
- Se deprecian (excepto terrenos)

**12200 - DEPRECIACIONES ACUMULADAS (8 cuentas regularizadoras):**
- Restan de bienes de uso
- Acumulan desgaste a lo largo del tiempo

**12300 - ACTIVOS INTANGIBLES (7 cuentas):**
- Sin sustancia física
- Derechos, licencias, software, llave de negocio

**12400 - AMORTIZACIONES ACUMULADAS (6 cuentas regularizadoras):**
- Restan de activos intangibles
- Acumulan pérdida de valor

**12500 - INVERSIONES PERMANENTES (3 cuentas):**
- Intención de mantener a LP
- Generan ingresos (dividendos, rentas)

**12600 - OTROS ACTIVOS NO CORRIENTES (2 cuentas):**
- Depósitos, créditos LP
- Otros derechos de larga duración

---

# Manual de Cuentas - Pasivo Corriente

## 2.1 PASIVO CORRIENTE (21XXX)

Comprende las obligaciones de la empresa que deben cumplirse dentro del ejercicio económico (12 meses) o del ciclo operativo de la empresa.

---

## 21100 - DEUDAS COMERCIALES

### 21101 - Proveedores
**Descripción:** Registra las obligaciones contraídas con proveedores por compra de mercaderías, materiales o servicios en cuenta corriente.

**Se debita por:**
- Pagos a proveedores
- Devoluciones de mercaderías
- Descuentos y bonificaciones recibidas
- Notas de crédito recibidas

**Se acredita por:**
- Compras en cuenta corriente
- Gastos incurridos con proveedores
- Intereses por mora

**Ejemplo práctico:**
```
Compra de mercaderías a crédito $100,000 + IVA $21,000
DEBE: 11401 Mercaderías................. $100,000
DEBE: 11305 IVA Crédito Fiscal.......... $21,000
HABER: 21101 Proveedores................ $121,000

Pago parcial $80,000:
DEBE: 21101 Proveedores................ $80,000
HABER: 11103 Banco Cta. Cte............ $80,000

Devolución de mercadería por $20,000:
DEBE: 21101 Proveedores................ $20,000
HABER: 11401 Mercaderías............... $20,000
```

**Observaciones:**
- Mantener control por proveedor (submayores)
- Verificar facturas y documentación
- Aprovechar descuentos por pronto pago cuando sea conveniente
- Solicitar recibos de pago
- Revisar antigüedad de saldos

---

### 21102 - Documentos a Pagar
**Descripción:** Registra pagarés, letras de cambio u otros documentos emitidos por la empresa en favor de acreedores.

**Se debita por:**
- Pago de documentos
- Cancelación anticipada
- Descuento de documentos

**Se acredita por:**
- Emisión de documentos
- Refinanciación de deudas

**Ejemplo práctico:**
```
Emisión de pagaré a proveedor $150,000 a 90 días
DEBE: 21101 Proveedores................ $150,000
HABER: 21102 Documentos a Pagar........ $150,000

Al vencimiento (pago):
DEBE: 21102 Documentos a Pagar........ $150,000
HABER: 11103 Banco Cta. Cte........... $150,000

Si se descuenta en banco antes del vencimiento:
DEBE: 21102 Documentos a Pagar........ $150,000
HABER: 11103 Banco Cta. Cte (neto)... $145,000
HABER: 54102 Comisiones Bancarias..... $5,000
```

**Observaciones:**
- Documentos deben estar formalizados
- Mantener copia de documentos emitidos
- Controlar fechas de vencimiento
- Si se descuentan, se genera costo financiero
- Al descuento, se registra como pasivo en el banco

---

### 21103 - Tarjetas de Crédito a Pagar
**Descripción:** Registra las compras realizadas con tarjetas de crédito empresariales (débito futuro).

**Se debita por:**
- Pago de tarjeta
- Abonos (cancelación parcial)

**Se acredita por:**
- Compras con tarjeta
- Gastos pagados con tarjeta

**Ejemplo práctico:**
```
Compra de suministros con tarjeta $50,000
DEBE: 52104 Publicidad y Propaganda.... $50,000
HABER: 21103 Tarjetas de Crédito a Pagar $50,000

Pago de resumen de tarjeta $150,000:
DEBE: 21103 Tarjetas de Crédito a Pagar $150,000
HABER: 11103 Banco Cta. Cte........... $150,000

Interés financiero por pago tardío $5,000:
DEBE: 54102 Comisiones Bancarias...... $5,000
HABER: 21103 Tarjetas de Crédito a Pagar $5,000
```

**Observaciones:**
- Controlar límite de crédito disponible
- Revisar estado de cuenta mensual
- Evitar intereses por pago tardío
- Algunos gastos pueden no ser deducibles impositivamente

---

### 21104 - Acreedores Varios
**Descripción:** Registra obligaciones con terceros que no son proveedores habituales (servicios ocasionales, gastos diversos).

**Se debita por:**
- Pagos a acreedores

**Se acredita por:**
- Servicios o gastos incurridos
- Facturas recibidas

**Ejemplo práctico:**
```
Reparación de equipo $80,000 en cuenta corriente
DEBE: 53205 Servicios de Mantenimiento. $80,000
HABER: 21104 Acreedores Varios........ $80,000

Pago:
DEBE: 21104 Acreedores Varios........ $80,000
HABER: 11103 Banco Cta. Cte.......... $80,000
```

**Observaciones:**
- Para gastos puntuales de terceros
- Obtener comprobante siempre
- Validar que corresponda al período

---

## 21200 - DEUDAS FISCALES

### 21201 - IVA Débito Fiscal
**Descripción:** Registra el IVA cobrado a clientes en ventas, que constituye una obligación con el fisco.

**Se debita por:**
- Compensación con IVA Crédito Fiscal (liquidación)
- Pago al fisco
- Notas de crédito emitidas

**Se acredita por:**
- Ventas gravadas (IVA cobrado)
- Notas de débito a clientes

**Ejemplo práctico:**
```
Venta $100,000 + IVA 21% = $121,000
DEBE: 11201 Deudores por Ventas....... $121,000
HABER: 41101 Ventas de Mercaderías.... $100,000
HABER: 21201 IVA Débito Fiscal........ $21,000

Liquidación mensual:
IVA Débito Fiscal (acreedor): $50,000
IVA Crédito Fiscal (deudor): $30,000
IVA a Pagar al Fisco: $20,000

DEBE: 21201 IVA Débito Fiscal......... $50,000
HABER: 11305 IVA Crédito Fiscal....... $30,000
HABER: 21202 IVA a Pagar............. $20,000

Pago al fisco $20,000:
DEBE: 21202 IVA a Pagar.............. $20,000
HABER: 11103 Banco Cta. Cte.......... $20,000
```

**Observaciones:**
- Liquidar mensuales al AFIP (en general)
- Incluye también ventas exentas o no gravadas en su análisis
- Controlar percepciones y retenciones sufridas
- Documentar todas las ventas con facturas legales
- Categoría fiscal afecta obligaciones

---

### 21202 - IVA a Pagar
**Descripción:** Registra el saldo neto de IVA a pagar al fisco después de compensar débito y crédito.

**Se debita por:**
- Pago al fisco
- Compensación con saldos a favor

**Se acredita por:**
- Liquidación de período con saldo a favor de la empresa

**Observaciones:**
- Saldo surgido de la liquidación mensual
- Si es positivo (empresa paga): 21202 acreedor
- Si es negativo (saldo a favor): 11308 deudor
- Fechas de vencimiento según AFIP

---

### 21203 - Impuesto a las Ganancias a Pagar
**Descripción:** Registra la obligación de pagar impuesto a las ganancias (Ingresos Brutos en algunos casos).

**Se debita por:**
- Pago de impuesto
- Retenciones sufridas (crédito)
- Adelantos pagados

**Se acredita por:**
- Determinación de impuesto del período
- Provisión del impuesto anual

**Ejemplo práctico:**
```
Ganancia estimada $500,000
Impuesto a las ganancias (35% aproximado) $175,000

DEBE: 54101 Impuesto a las Ganancias (Gasto) $175,000
HABER: 21203 Impuesto Ganancias a Pagar $175,000

Retención sufrida en venta $25,000:
DEBE: 11305 IVA Crédito Fiscal....... $25,000
HABER: 21203 Impuesto Ganancias a Pagar $25,000

Pago:
DEBE: 21203 Impuesto Ganancias a Pagar $150,000
HABER: 11103 Banco Cta. Cte......... $150,000
```

**Observaciones:**
- Impuesto anual liquidado en período fiscal
- Retenciones en ventas actúan como adelanto
- Declaración jurada ante AFIP
- Puede requerir pago en cuotas
- No es deducible (no va en gastos de IR)

---

### 21204 - Ingresos Brutos a Pagar
**Descripción:** Registra la obligación de pagar impuesto a los Ingresos Brutos (tributo provincial).

**Se debita por:**
- Pago al órgano recaudador
- Retenciones sufridas

**Se acredita por:**
- Liquidación mensual

**Ejemplo práctico:**
```
Ventas mes $1,000,000
Alícuota de Ingresos Brutos: 3%
Impuesto: $30,000

DEBE: 52104 Publicidad (o gasto según concepto) $30,000
HABER: 21204 Ingresos Brutos a Pagar. $30,000

Retención sufrida en compra $5,000:
DEBE: 21204 Ingresos Brutos a Pagar. $5,000
HABER: 11305 IVA Crédito Fiscal...... $5,000

Pago:
DEBE: 21204 Ingresos Brutos a Pagar. $25,000
HABER: 11103 Banco Cta. Cte......... $25,000
```

**Observaciones:**
- Varía según provincia (Buenos Aires, Córdoba, etc.)
- Liquidación mensual o bimestral según provincia
- Retenciones en compras actúan como adelanto
- Alícuota varía según actividad económica
- Se imputa como gasto (es deducible)

---

### 21205 - Retenciones de IVA a Depositar
**Descripción:** Registra las retenciones de IVA que la empresa sufrió como proveedor y debe depositar al fisco.

**Se debita por:**
- Depósito al fisco
- Compensación

**Se acredita por:**
- Retenciones sufridas (cuando cliente retiene)

**Ejemplo práctico:**
```
Venta $100,000 + IVA $21,000 - Retención IVA $2,100
Cobro neto: $118,900

DEBE: 11103 Banco Cta. Cte........... $118,900
DEBE: 21205 Retenciones IVA a Depositar $2,100
HABER: 11201 Deudores por Ventas..... $121,000

Depósito de retención:
DEBE: 21205 Retenciones IVA a Depositar $2,100
HABER: 11103 Banco Cta. Cte......... $2,100
```

**Observaciones:**
- El cliente actúa como agente de retención
- Debe entregar certificado de retención
- Se compensa en liquidación de IVA
- Requiere que cliente esté inscripto

---

### 21206 - Percepciones de IVA a Depositar
**Descripción:** Registra las percepciones de IVA que la empresa sufrió y debe depositar.

**Se debita por:**
- Depósito al fisco

**Se acredita por:**
- Percepciones sufridas en compras

**Ejemplo práctico:**
```
Compra $100,000 + IVA $21,000 + Percepción IVA $2,100
DEBE: 11401 Mercaderías.............. $100,000
DEBE: 11305 IVA Crédito Fiscal....... $21,000
DEBE: 21206 Percepciones IVA a Depositar $2,100
HABER: 21101 Proveedores............ $123,100

Depósito:
DEBE: 21206 Percepciones IVA a Depositar $2,100
HABER: 11103 Banco Cta. Cte........ $2,100
```

**Observaciones:**
- El proveedor actúa como agente de percepción
- Es un pago a cuenta de IVA
- Diferente de retención (quien percibe es el vendedor)
- Se compensa en liquidación de IVA

---

### 21207 - Otros Impuestos a Pagar
**Descripción:** Registra obligaciones impositivas diversas (sellos, contribuciones, etc.).

**Se debita por:**
- Pago de impuestos

**Se acredita por:**
- Devengamiento de obligaciones

**Observaciones:**
- Según jurisdicción pueden variar
- Documentar cada obligación
- Cumplir fechas de vencimiento

---

## 21300 - DEUDAS SOCIALES

### 21301 - Sueldos a Pagar
**Descripción:** Registra las obligaciones con el personal por sueldos y jornales devengados pendientes de pago.

**Se debita por:**
- Pago de liquidación de sueldos
- Descuentos al personal

**Se acredita por:**
- Devengamiento de sueldos
- Cargas sociales del empleador

**Ejemplo práctico:**
```
Liquidación de sueldos (10 empleados a $50,000 c/u):
DEBE: 53101 Sueldos Administración.... $500,000
HABER: 21301 Sueldos a Pagar......... $300,000
HABER: 21302 Cargas Sociales a Pagar $100,000
HABER: 21304 Retenciones a Depositar. $100,000

Descuentos y retenciones incluidos:
- Obra Social: $50,000
- Aportes AFIP: $40,000
- Crédito Fiscal (ley de promoción): $10,000

Pago de sueldos:
DEBE: 21301 Sueldos a Pagar......... $300,000
HABER: 11103 Banco Cta. Cte........ $300,000
```

**Observaciones:**
- Saldo a pagar al personal
- Se paga generalmente al mes siguiente
- Incluir todas las categorías de personal
- Documentar con recibos

---

### 21302 - Cargas Sociales a Pagar
**Descripción:** Registra las obligaciones del empleador por aportes patronales (obra social, SSPF, SUSS, etc.).

**Se debita por:**
- Pago de contribuciones sociales

**Se acredita por:**
- Devengamiento de cargas sociales

**Ejemplo práctico:**
```
Cargas sociales patronales (23-27% del sueldo):
Sobre sueldos $500,000 = $125,000

DEBE: 53102 Cargas Sociales Administración $125,000
HABER: 21302 Cargas Sociales a Pagar $125,000

Pago:
DEBE: 21302 Cargas Sociales a Pagar. $125,000
HABER: 11103 Banco Cta. Cte........ $125,000
```

**Observaciones:**
- Incluye aportes AFIP, obra social, etc.
- Tasa aprox. 23-27% según actividad
- Se paga generalmente mes siguiente
- Es gasto deducible

---

### 21303 - Aportes y Contribuciones a Depositar
**Descripción:** Registra los aportes del personal (que son descuentos de sueldos) que la empresa debe depositar ante AFIP.

**Se debita por:**
- Depósito a AFIP

**Se acredita por:**
- Aportes descontados al personal

**Ejemplo práctico:**
```
Aportes del personal descontados en liquidación:
- AFIP (aportes jubilación): $50,000
- Obra Social: $30,000
Total: $80,000

DEBE: 21303 Aportes a Depositar..... $80,000
HABER: 21301 Sueldos a Pagar....... $80,000

Depósito a AFIP:
DEBE: 21303 Aportes a Depositar..... $80,000
HABER: 11103 Banco Cta. Cte........ $80,000
```

**Observaciones:**
- Dinero del trabajador que la empresa recauda
- Deposit portal@afip (medio de pago oficial)
- Vencimiento a 05 del mes siguiente

---

### 21304 - Retenciones al Personal a Depositar
**Descripción:** Registra las retenciones de Impuesto a las Ganancias realizadas al personal que la empresa debe depositar.

**Se debita por:**
- Depósito a AFIP

**Se acredita por:**
- Retenciones realizadas

**Ejemplo práctico:**
```
Retención a la Ganancia al personal $100,000

DEBE: 21304 Retenciones a Depositar. $100,000
HABER: 21301 Sueldos a Pagar....... $100,000

Depósito:
DEBE: 21304 Retenciones a Depositar. $100,000
HABER: 11103 Banco Cta. Cte........ $100,000
```

**Observaciones:**
- Dinero descontado a personal por impuesto
- Depositar ante AFIP
- Genera certificado de retención

---

### 21305 - Provisión SAC
**Descripción:** Registra la provisión del Sueldo Anual Complementario (aguinaldo) que debe pagarse dos veces al año.

**Se debita por:**
- Pago del SAC (junio y diciembre)

**Se acredita por:**
- Provisión mensual

**Ejemplo práctico:**
```
Provisión mensual de SAC:
Sueldos mes: $500,000
Provisión SAC (1/12): $41,666.67

DEBE: 53101 Sueldos Administración.... $41,666.67
HABER: 21305 Provisión SAC.......... $41,666.67

En junio, pago de SAC $500,000:
DEBE: 21305 Provisión SAC.......... $500,000
HABER: 11103 Banco Cta. Cte....... $500,000
```

**Observaciones:**
- Se paga 50% en junio, 50% en diciembre
- Corresponde 1/12 de salario anual cada mes
- Se resetea después de cada pago

---

### 21306 - Provisión Vacaciones
**Descripción:** Registra la provisión de días de vacaciones que deben pagarse anualmente.

**Se debita por:**
- Pago de vacaciones

**Se acredita por:**
- Provisión mensual

**Ejemplo práctico:**
```
Provisión mensual de vacaciones:
Sueldos mes: $500,000
Provisión vacaciones (1/12 de 21 días): $35,000

DEBE: 53101 Sueldos Administración.... $35,000
HABER: 21306 Provisión Vacaciones... $35,000

Pago de vacaciones en febrero $420,000:
DEBE: 21306 Provisión Vacaciones... $420,000
HABER: 11103 Banco Cta. Cte....... $420,000
```

**Observaciones:**
- Acumula anualmente (derecho adquirido)
- Generalmente se toma en febrero-marzo
- 21 días hábiles mínimo por ley
- Incremento por antigüedad según acuerdos
- Se paga al salario vigente

---

## 21400 - DEUDAS BANCARIAS Y FINANCIERAS CORTO PLAZO

### 21401 - Préstamos Bancarios
**Descripción:** Registra préstamos obtenidos de bancos con vencimiento dentro de 12 meses.

**Se debita por:**
- Pago de cuotas
- Cancelación anticipada

**Se acredita por:**
- Obtención del préstamo
- Intereses devengados

**Ejemplo práctico:**
```
Obtención de préstamo $500,000, 24 cuotas
Cuota mensual: $25,000

DEBE: 11103 Banco Cta. Cte........... $500,000
HABER: 21401 Préstamos Bancarios.... $500,000

Pago mensual cuota + interés:
Cuota principal: $20,833
Interés: $6,250
Total: $27,083

DEBE: 21401 Préstamos Bancarios.... $20,833
DEBE: 54101 Intereses Pagados....... $6,250
HABER: 11103 Banco Cta. Cte........ $27,083
```

**Observaciones:**
- Si la deuda es > 12 meses en total, la parte pagable en 12 meses va en 21401, el resto en 22101
- Registrar intereses en gasto financiero
- Mantener documentación del contrato
- Controlar saldo de deuda

---

### 21402 - Descubiertos Bancarios
**Descripción:** Registra saldos negativos en cuentas bancarias (débito automático sin fondos disponibles).

**Se debita por:**
- Regularización del descubierto
- Pago

**Se acredita por:**
- Registración del descubierto
- Intereses devengados

**Ejemplo práctico:**
```
Débito que genera descubierto $50,000
DEBE: 54101 Intereses Pagados....... $50,000
HABER: 21402 Descubiertos Bancarios $50,000

Depósito que regulariza:
DEBE: 11103 Banco Cta. Cte......... $50,000
HABER: 21402 Descubiertos Bancarios $50,000
```

**Observaciones:**
- Alto costo financiero
- Evitar en lo posible
- Puede generar comisiones adicionales
- Registrar intereses diarios

---

### 21403 - Tarjetas de Crédito Empresariales
**Descripción:** Registra obligaciones con tarjetas de crédito empresariales (diferente de 21103 por origen).

**Observaciones:**
- Similar a 21103 pero para tarjetas específicamente empresariales
- Pueden tener tasas diferentes
- Datos incluyen límite, resumen, etc.

---

### 21404 - Intereses a Pagar
**Descripción:** Registra intereses de deudas devengados pero no pagados.

**Se debita por:**
- Pago de intereses

**Se acredita por:**
- Devengamiento de intereses

**Ejemplo práctico:**
```
Préstamo con intereses devengados $80,000
DEBE: 54101 Intereses Pagados....... $80,000
HABER: 21404 Intereses a Pagar..... $80,000

Pago:
DEBE: 21404 Intereses a Pagar..... $80,000
HABER: 11103 Banco Cta. Cte....... $80,000
```

**Observaciones:**
- Separar intereses del capital
- Devengar proporcionalmente
- Gasto deducible

---

## 21500 - OTRAS DEUDAS

### 21501 - Anticipos de Clientes
**Descripción:** Registra dinero recibido de clientes por adelantado (antes de entregar mercadería o servicio).

**Se debita por:**
- Entrega de mercadería/servicio (contra ingreso)
- Devolución de anticipos

**Se acredita por:**
- Recepción de anticipos

**Ejemplo práctico:**
```
Cliente anticipa $200,000 para compra de mercadería
DEBE: 11103 Banco Cta. Cte......... $200,000
HABER: 21501 Anticipos de Clientes. $200,000

Entrega de mercadería $200,000:
DEBE: 21501 Anticipos de Clientes. $200,000
HABER: 41101 Ventas de Mercaderías.. $200,000

Además:
DEBE: 51101 Costo Mercaderías Vendidas $120,000
HABER: 11401 Mercaderías............ $120,000
```

**Observaciones:**
- Es una obligación, no un ingreso
- Se convierte en ingreso cuando se entrega
- Si cliente solicita devolución, se devuelve dinero
- Importante en industria de construcción o bajo encargo

---

### 21502 - Dividendos a Pagar
**Descripción:** Registra dividendos declarados a accionistas pero aún no pagados.

**Se debita por:**
- Pago de dividendos

**Se acredita por:**
- Declaración de dividendos

**Ejemplo práctico:**
```
Asamblea declara dividendos en acciones por $1,000,000
DEBE: 31501 Resultado del Ejercicio.. $1,000,000
HABER: 21502 Dividendos a Pagar.... $1,000,000

Pago en efectivo:
DEBE: 21502 Dividendos a Pagar.... $1,000,000
HABER: 11103 Banco Cta. Cte....... $1,000,000
```

**Observaciones:**
- Solo se registra cuando está declarado
- Requiere aprobación de asamblea
- Debe deducirse de resultados acumulados o PN

---

### 21503 - Honorarios Directorio a Pagar
**Descripción:** Registra honorarios de directores devengados pero no pagados.

**Se debita por:**
- Pago de honorarios

**Se acredita por:**
- Devengamiento de honorarios

**Ejemplo práctico:**
```
Asignación de honorarios de directorio $300,000
DEBE: 53202 Honorarios Directorio... $300,000
HABER: 21503 Honorarios Directorio a Pagar $300,000

Pago:
DEBE: 21503 Honorarios Directorio a Pagar $300,000
HABER: 11103 Banco Cta. Cte....... $300,000
```

**Observaciones:**
- Sujeto a retención de impuesto a las ganancias
- Requiere acta de directorio
- Es gasto deducible

---

### 21504 - Acreedores Varios
**Descripción:** Registra obligaciones diversas con terceros (arriendos, servicios, etc.) que no entran en otras categorías.

**Se debita por:**
- Pago de obligaciones

**Se acredita por:**
- Devengamiento de obligaciones

**Observaciones:**
- Categoría residual de pasivos corrientes
- Documentar con comprobantes
- Verificar que sean obligaciones reales

---

## OBSERVACIONES GENERALES DEL PASIVO CORRIENTE

### 1. Clasificación Corriente vs. No Corriente
**Es CORRIENTE si:**
- Vencimiento <= 12 meses
- Parte de ciclo operativo normal
- Intención de liquidar en corto plazo

**Es NO CORRIENTE si:**
- Vencimiento > 12 meses
- Refinanciable a plazo mayor

---

### 2. Orden de Presentación
Se presenta generalmente en orden de exigibilidad:
1. Deudas Comerciales (proveedores, documentos)
2. Deudas Fiscales (IVA, Ganancias)
3. Deudas Sociales (sueldos, cargas)
4. Deudas Bancarias (préstamos, intereses)
5. Otras Deudas

---

### 3. Devengamiento
**Principio fundamental:** Una obligación se registra cuando:
- Se adquiere la obligación (no cuando se paga)
- Se ha recibido bien o servicio
- Existe obligación legal

```
Ejemplo - Compra en cuenta corriente:
DEBE: 11401 Mercaderías    $100,000
HABER: 21101 Proveedores   $100,000
(al momento de factura, no al pago)
```

---

### 4. Cálculo de Pasivos por Acumular

**Sueldos mensual:**
```
Sueldos (10 empleados x $50,000) = $500,000
Cargas patronales (25%) = $125,000
SAC (1/12) = $41,667
Vacaciones (1/12) = $35,000
Total: $701,667
```

**IVA (ejemplo):**
```
Débito Fiscal (IVA vendedor): $100,000
Crédito Fiscal (IVA comprador): $60,000
IVA a pagar: $40,000
```

---

### 5. Gestión de Pasivos
- Mantener calendario de vencimientos
- Aprovechar plazos de pago
- Negociar condiciones con acreedores
- Controlar retenciones y percepciones
- Pagar a tiempo para mantener buena reputación
- Solicitar certificados de deuda para auditoría

---

### 6. Control de Obligaciones Tributarias

**Fechas clave (Argentina):**
- IVA: liquidación y pago hasta día 10 del mes siguiente
- Ganancias: liquidación anual (aprox. abril)
- Ingresos Brutos: liquidación mensual o bimestral (varía por provincia)
- Cargas Sociales: pago hasta día 05 del mes siguiente
- Aportes Personal: pago hasta día 05 del mes siguiente

**Importante:** Verificar calendarios según jurisdicción

---

### 7. Análisis de Solvencia

**Índice de Liquidez Corriente:**
```
= Activo Corriente / Pasivo Corriente

Si > 1.5 = Buena liquidez
Si 1 a 1.5 = Liquidez normal
Si < 1 = Problemas de liquidez (alerta)
```

**Índice de Endeudamiento:**
```
= Pasivo Corriente / (Pasivo Corriente + Patrimonio Neto)

Si < 0.5 = Bajo endeudamiento
Si 0.5 a 0.7 = Endeudamiento moderado
Si > 0.7 = Alto endeudamiento (riesgo)
```

---

### 8. Reconciliación de Pasivos

**Mensualmente:**
- Conciliar saldos de proveedores con extractos
- Verificar facturas pendientes
- Controlar retenciones realizadas
- Comparar sueldos a pagar vs. nómina

**Trimestralmente:**
- Revisar vencimiento de obligaciones
- Evaluar refinanciación de deudas
- Análisis de condiciones de pago

---

### 9. Reclasificación de Pasivos

Cuando se cierra el ejercicio:
- Parte de deuda no corriente que vence en próximos 12 meses → se reclasifica a corriente
- Deuda refinanciada para plazo > 12 meses → se reclasifica a no corriente

```
Ejemplo: Préstamo $1,000,000 a 5 años

Inicio: 21401 (CP) $200,000 / 22101 (LP) $800,000

Final año 1: Se pagan $200,000
Año 2 será CP: $200,000 / LP: $600,000
Actualizar saldo al cierre
```

---

### 10. Notas al Balance

Incluir en notas información sobre:
- Composición de deudas (por acreedor, por tipo)
- Tasas de interés aplicadas
- Vencimientos de deudas
- Garantías otorgadas
- Refinanciaciones realizadas
- Controversias impositivas pendientes
- Compromisos futuros

---

### 11. Impacto en Resultado

**No son gastos (se registran en Pasivo):**
- Compra de mercaderías → Activo
- Compra de bienes de uso → Activo
- Anticipos recibidos → Pasivo (se convierten en ingresos luego)

**Sí son gastos:**
- Sueldos
- Cargas sociales patronales
- Intereses pagados
- Comisiones bancarias
- Gastos de servicios

---

### 12. Pasivos Contingentes

Aunque no se registren, es importante mencionar:
- Juicios en curso
- Garantías otorgadas
- Avales emitidos
- Compromisos de compra
- Leasing operativo

---

## RESUMEN POR RUBRO

**21100 - DEUDAS COMERCIALES (4 cuentas):**
- Obligaciones con proveedores de mercaderías y servicios
- Plazo típico: 30 a 120 días

**21200 - DEUDAS FISCALES (7 cuentas):**
- Obligaciones con el fisco (AFIP, provincias, municipios)
- Incluyendo IVA, Ganancias, Ingresos Brutos

**21300 - DEUDAS SOCIALES (6 cuentas):**
- Obligaciones con personal y organismos de seguridad social
- Sueldos, cargas patronales, aportes, retenciones

**21400 - DEUDAS BANCARIAS CP (4 cuentas):**
- Préstamos y obligaciones financieras a corto plazo
- Incluye tarjetas, descubiertos, intereses

**21500 - OTRAS DEUDAS (4 cuentas):**
- Obligaciones diversas (anticipos clientes, dividendos, etc.)

---

## CHECKLIST MENSUAL PARA CIERRE

- Conciliación de saldos de proveedores
- Recepción de facturas del mes
- Cálculo y provisión de sueldos
- Cálculo y provisión de cargas sociales
- Provisión SAC y vacaciones
- Liquidación de IVA
- Liquidación de Ingresos Brutos
- Devengo de intereses de deudas
- Revisión de vencimientos próximos
- Verificación de retenciones realizadas
- Análisis de índices de liquidez

---

# Manual de Cuentas - Pasivo No Corriente

## 2.2 PASIVO NO CORRIENTE (22XXX)

Comprende las obligaciones de la empresa cuyo vencimiento es superior a 12 meses o al ciclo operativo de la empresa. También se conoce como Pasivo a Largo Plazo.

---

## 22100 - DEUDAS BANCARIAS Y FINANCIERAS LARGO PLAZO

### 22101 - Préstamos Bancarios Largo Plazo
**Descripción:** Registra préstamos obtenidos de entidades financieras con vencimiento superior a 12 meses.

**Se debita por:**
- Pago de cuotas de capital
- Cancelación anticipada total o parcial
- Reclasificación a corto plazo (parte que vence en próximos 12 meses)

**Se acredita por:**
- Obtención del préstamo
- Refinanciación de deuda de corto a largo plazo

**Ejemplo práctico:**
```
Obtención de préstamo bancario $5,000,000 a 5 años
Cuota mensual: $100,000

DEBE: 11103 Banco Cta. Cte............. $5,000,000
HABER: 22101 Préstamos Bancarios LP.... $5,000,000

Cuotas año 1 ($1,200,000) → reclasificar a CP:
DEBE: 22101 Préstamos Bancarios LP.... $1,200,000
HABER: 21401 Préstamos Bancarios CP... $1,200,000

Pago mensual (capital $83,333 + interés $20,000):
DEBE: 21401 Préstamos Bancarios CP... $83,333
DEBE: 54101 Intereses Pagados......... $20,000
HABER: 11103 Banco Cta. Cte........... $103,333

Al cierre del ejercicio:
22101 Préstamos Bancarios LP: $3,800,000
21401 Préstamos Bancarios CP: $316,667 (saldo pendiente año 2)
```

**Observaciones:**
- Al cierre de cada ejercicio, reclasificar a CP la porción que vence en próximos 12 meses
- Mantener tabla de amortización actualizada
- Registrar garantías otorgadas (prendas, hipotecas) en notas
- Los intereses se registran como gasto financiero (54101)
- Verificar cláusulas del contrato (anticipación, mora, seguros)
- Puede tener períodos de gracia (solo intereses)

---

### 22102 - Obligaciones Negociables
**Descripción:** Registra deudas provenientes de emisión de títulos valores (bonos, obligaciones negociables) en mercados de capitales.

**Se debita por:**
- Amortización de capital
- Rescate anticipado
- Reclasificación a corto plazo

**Se acredita por:**
- Emisión de obligaciones negociables
- Refinanciación

**Ejemplo práctico:**
```
Emisión de ON por $10,000,000 a 7 años
Tasa cupón: 8% anual
Amortización: al vencimiento

DEBE: 11103 Banco Cta. Cte............. $9,500,000
DEBE: 54102 Comisiones Bancarias....... $500,000
HABER: 22102 Obligaciones Negociables.. $10,000,000

Pago de intereses semestrales ($400,000):
DEBE: 54101 Intereses Pagados......... $400,000
HABER: 11103 Banco Cta. Cte........... $400,000

Al año previo al vencimiento:
DEBE: 22102 Obligaciones Negociables.. $10,000,000
HABER: 21102 Documentos a Pagar CP.... $10,000,000

Al vencimiento:
DEBE: 21102 Documentos a Pagar CP.... $10,000,000
HABER: 11103 Banco Cta. Cte.......... $10,000,000
```

**Observaciones:**
- Requiere aprobación de CNV (Comisión Nacional de Valores)
- Costo de emisión se imputa a gastos o se amortiza
- Puede tener garantías (quirografarias, con garantía real)
- Cotización en bolsa (mercado secundario)
- Puede rescatarse anticipadamente según condiciones
- Rating de la emisión afecta la tasa

---

### 22103 - Documentos a Pagar Largo Plazo
**Descripción:** Registra pagarés, letras u otros documentos firmados con vencimiento superior a 12 meses.

**Se debita por:**
- Pago de documentos
- Cancelación anticipada
- Reclasificación a corto plazo

**Se acredita por:**
- Emisión de documentos a largo plazo
- Refinanciación de deudas

**Ejemplo práctico:**
```
Compra de maquinaria en 36 cuotas documentadas
Precio: $3,600,000
Cuota mensual: $100,000

DEBE: 12104 Maquinarias................ $3,000,000
DEBE: 54101 Intereses Pagados (adelantado) $600,000
HABER: 22103 Documentos a Pagar LP..... $3,600,000

Método alternativo (devengar intereses):
DEBE: 12104 Maquinarias................ $3,000,000
HABER: 22103 Documentos a Pagar LP..... $3,000,000

Reclasificación anual a CP ($1,200,000):
DEBE: 22103 Documentos a Pagar LP..... $1,200,000
HABER: 21102 Documentos a Pagar CP.... $1,200,000

Pago mensual:
DEBE: 21102 Documentos a Pagar CP.... $100,000
HABER: 11103 Banco Cta. Cte.......... $100,000
```

**Observaciones:**
- Documentar correctamente (pagaré, letra)
- Protocolizar si el monto es significativo
- Controlar vencimientos
- Puede incluir intereses implícitos o explícitos
- Separar intereses del capital si están implícitos

---

## 22200 - PREVISIONES

**Concepto general:** Las previsiones son obligaciones estimadas en monto o fecha de ocurrencia. Se constituyen cuando existe una obligación presente (legal o implícita), es probable que se requiera una salida de recursos y el monto puede estimarse razonablemente.

---

### 22201 - Previsión para Juicios
**Descripción:** Registra el monto estimado que la empresa deberá pagar por juicios en curso donde es probable que pierda.

**Se debita por:**
- Pago de la sentencia
- Reversión de previsión (juicio ganado o desestimado)
- Ajuste por cambio de estimación

**Se acredita por:**
- Constitución de la previsión
- Aumento de la previsión

**Ejemplo práctico:**
```
Juicio laboral en curso por $500,000
Abogados estiman probabilidad de pérdida: 70%
Monto estimado: $350,000

Constitución de previsión:
DEBE: 55104 Pérdidas por Juicios....... $350,000
HABER: 22201 Previsión para Juicios... $350,000

Si se pierde el juicio y se paga $400,000:
DEBE: 22201 Previsión para Juicios... $350,000
DEBE: 55104 Pérdidas por Juicios....... $50,000
HABER: 11103 Banco Cta. Cte........... $400,000

Si se gana el juicio:
DEBE: 22201 Previsión para Juicios... $350,000
HABER: 42103 Recupero de Previsiones.. $350,000
```

**Observaciones:**
- Solo se constituye si hay alta probabilidad de perder
- Requiere asesoramiento legal para estimar
- Puede ser juicio laboral, civil, comercial, impositivo
- Revisar anualmente y ajustar
- Si probabilidad es baja: informar en notas (no registrar)
- No deducible impositivamente hasta que se pague

---

### 22202 - Previsión para Indemnizaciones
**Descripción:** Registra el monto estimado de indemnizaciones por despido u otras contingencias laborales.

**Se debita por:**
- Pago de indemnizaciones
- Reversión de previsión
- Ajuste por cambio de estimación

**Se acredita por:**
- Constitución de la previsión
- Aumento de la previsión

**Ejemplo práctico:**
```
Empresa planea reestructuración en 6 meses
Estimación de despidos: 5 empleados
Indemnización promedio: $200,000 c/u
Total: $1,000,000

Constitución:
DEBE: 53103 Indemnizaciones............ $1,000,000
HABER: 22202 Previsión Indemnizaciones $1,000,000

Al despedir (pago real $950,000):
DEBE: 22202 Previsión Indemnizaciones $1,000,000
HABER: 11103 Banco Cta. Cte........... $950,000
HABER: 42103 Recupero de Previsiones.. $50,000

Si no se realiza la reestructuración:
DEBE: 22202 Previsión Indemnizaciones $1,000,000
HABER: 42103 Recupero de Previsiones.. $1,000,000
```

**Observaciones:**
- Constituir solo si hay decisión firme o plan formal
- Calcular según antigüedad, mejor remuneración
- Considerar convenio colectivo aplicable
- Revisar ante cambios en la nómina
- Incluir SAC, vacaciones no gozadas

---

### 22203 - Previsión para Garantías
**Descripción:** Registra el costo estimado de reparaciones o reemplazos por garantías otorgadas a clientes.

**Se debita por:**
- Erogaciones por garantías
- Reversión de previsión
- Ajuste por experiencia real

**Se acredita por:**
- Constitución de la previsión
- Aumento de la previsión

**Ejemplo práctico:**
```
Ventas del año con garantía: $10,000,000
Experiencia histórica: 2% de garantías reclamadas
Costo promedio reparación: 50% del precio de venta
Previsión: $10,000,000 × 2% × 50% = $100,000

Constitución:
DEBE: 51101 Costo de Mercaderías Vendidas $100,000
HABER: 22203 Previsión para Garantías... $100,000

Reparación bajo garantía (costo real $8,000):
DEBE: 22203 Previsión para Garantías... $8,000
HABER: 11401 Mercaderías................ $5,000
HABER: 21101 Proveedores (repuestos).... $3,000

Al cierre del año:
- Evaluar previsión vs. experiencia real
- Ajustar si es necesario
```

**Observaciones:**
- Basarse en experiencia histórica
- Período de garantía: 6 meses, 1 año, 2 años, etc.
- Incluir costos de mano de obra y repuestos
- Común en venta de electrodomésticos, autos, tecnología
- Revisar anualmente por cambios en calidad de productos

---

### 22204 - Otras Previsiones
**Descripción:** Registra otras contingencias u obligaciones estimadas no clasificadas en otras previsiones.

**Se debita por:**
- Pago de la contingencia
- Reversión de previsión

**Se acredita por:**
- Constitución de la previsión

**Ejemplo práctico:**
```
Previsión por pasivo ambiental $300,000
(Remediación futura de terreno contaminado)

DEBE: 55102 Pérdidas Extraordinarias.... $300,000
HABER: 22204 Otras Previsiones......... $300,000

Erogación por remediación:
DEBE: 22204 Otras Previsiones......... $300,000
HABER: 11103 Banco Cta. Cte........... $300,000
```

**Observaciones:**
- Puede incluir: costos de desmantelamiento, obligaciones por contratos onerosos, pasivos ambientales, etc.
- Debe cumplir criterios de reconocimiento de previsión
- Documentar supuestos y cálculos

---

## OBSERVACIONES GENERALES DEL PASIVO NO CORRIENTE

### 1. Clasificación y Reclasificación

**Criterio fundamental:**
- **No Corriente:** vencimiento > 12 meses
- **Corriente:** vencimiento <= 12 meses

**Reclasificación anual obligatoria:**
```
Préstamo $5,000,000 a 5 años (60 cuotas de $83,333)

Año 1:
- 22101 (LP): $4,000,000 (cuotas 13-60)
- 21401 (CP): $1,000,000 (cuotas 1-12)

Año 2 (después de pagar 12 cuotas):
- 22101 (LP): $3,000,000 (cuotas 25-60)
- 21401 (CP): $1,000,000 (cuotas 13-24)

...y así sucesivamente
```

---

### 2. Valor Presente de Deudas

Cuando hay diferencia temporal significativa, se descuenta a valor presente:

```
Compra maquinaria $1,000,000 pagadero en 3 años sin interés explícito
Tasa de mercado: 12% anual
VP = $1,000,000 / (1.12)^3 = $711,780

DEBE: 12104 Maquinarias................ $711,780
DEBE: 54101 Intereses a Devengar....... $288,220
HABER: 22103 Documentos a Pagar LP..... $1,000,000

Cada año devengar intereses proporcionalmente
```

**Nota:** En la práctica argentina simplificada, esto puede no aplicarse en empresas pequeñas.

---

### 3. Garantías Reales

**Hipoteca:**
- Préstamo garantizado con inmueble
- Registración en Registro de la Propiedad
- En caso de incumplimiento, el banco ejecuta el bien

**Prenda:**
- Préstamo garantizado con bien mueble (rodado, máquina)
- Registración en Registro Prendario
- En caso de incumplimiento, se ejecuta el bien

**Nota:** Las garantías deben informarse en notas al balance.

```
Nota al Balance:
"La sociedad mantiene un préstamo bancario por $2,000,000 
garantizado con hipoteca sobre el inmueble de Av. XX N° 123, 
Ciudad YY, valuado en $3,500,000."
```

---

### 4. Covenants (Cláusulas Restrictivas)

Los contratos de préstamos pueden incluir:
- Ratio mínimo de liquidez
- Ratio máximo de endeudamiento
- Prohibición de repartir dividendos
- Obligación de mantener seguros
- Información periódica al acreedor

**Incumplimiento:** puede generar vencimiento anticipado de la deuda.

---

### 5. Costos de Financiación

**Incluyen:**
- Intereses
- Comisiones bancarias
- Gastos de otorgamiento
- Seguros obligatorios
- Costos de emisión (en ON)

**Tratamiento contable:**
```
Opción A: Imputar directamente a gasto
DEBE: 54101 Intereses Pagados
DEBE: 54102 Comisiones Bancarias

Opción B: Capitalizar si se vincula a construcción de activo
DEBE: 12102 Edificios (capitalizar intereses durante obra)
```

---

### 6. Refinanciación de Deudas

**De CP a LP:**
```
Deuda corriente $500,000 se refinancia a 3 años

DEBE: 21401 Préstamos Bancarios CP.... $500,000
HABER: 22101 Préstamos Bancarios LP... $500,000
```

**Condiciones:**
- Acuerdo formal antes del cierre
- Nueva documentación
- Cambio de vencimiento real

---

### 7. Análisis de Estructura de Deuda

**Indicadores clave:**

**Ratio de Endeudamiento Total:**
```
= (Pasivo Corriente + Pasivo No Corriente) / Patrimonio Neto

< 1: Bajo endeudamiento
1 a 2: Endeudamiento moderado
> 2: Alto endeudamiento
```

**Ratio de Endeudamiento LP:**
```
= Pasivo No Corriente / Patrimonio Neto

Mide dependencia de financiación de largo plazo
```

**Cobertura de Intereses:**
```
= EBITDA / Intereses Pagados

> 3: Buena cobertura
2 a 3: Cobertura aceptable
< 2: Cobertura insuficiente (riesgo)
```

---

### 8. Previsiones vs. Pasivos Ciertos

**PREVISIÓN (contingencia):**
- Monto o fecha inciertos
- Estimación basada en probabilidades
- Ejemplo: juicios, garantías

**PASIVO CIERTO:**
- Monto y fecha conocidos
- Obligación definitiva
- Ejemplo: proveedores, préstamos

**Criterios para reconocer previsión:**
1. Obligación presente (legal o implícita)
2. Probable salida de recursos (> 50%)
3. Estimación confiable del monto

---

### 9. Presentación en Balance

**PASIVO NO CORRIENTE**
```
Deudas Bancarias y Financieras:
  Préstamos Bancarios LP         $3,800,000
  Obligaciones Negociables       $10,000,000
  Documentos a Pagar LP          $1,800,000
  Subtotal                       $15,600,000

Previsiones:
  Previsión para Juicios         $350,000
  Previsión para Indemnizaciones $1,000,000
  Previsión para Garantías       $92,000
  Otras Previsiones              $300,000
  Subtotal                       $1,742,000

TOTAL PASIVO NO CORRIENTE        $17,342,000
```

---

### 10. Notas Complementarias

Información a revelar en notas:
- Detalle de préstamos (acreedor, tasa, vencimiento, garantías)
- Cronograma de vencimientos
- Restricciones (covenants)
- Refinanciaciones realizadas
- Detalle de previsiones (naturaleza, estimación)
- Movimiento de previsiones (saldo inicial, constituciones, utilizaciones, reversiones, saldo final)
- Contingencias no registradas (probabilidad baja)

**Ejemplo de nota:**
```
Nota 5: Préstamos Bancarios Largo Plazo

Banco XYZ SA:
- Capital original: $5,000,000
- Saldo al cierre: $3,800,000
- Tasa: 18% anual
- Vencimiento: Octubre 2029
- Garantía: Hipoteca sobre inmueble Av. XX 123
- Cuota mensual: $103,333
- Covenant: Mantener ratio corriente > 1.2

Vencimientos proyectados:
- Año 2026: $1,000,000
- Año 2027: $1,000,000
- Año 2028: $1,000,000
- Año 2029: $800,000
```

---

### 11. Previsiones - Movimiento del Ejercicio

Presentación típica:

```
                            Juicios    Indemn.   Garantías    Total
Saldo inicial             $200,000   $500,000    $80,000   $780,000
+ Constituciones          $350,000   $800,000    $100,000  $1,250,000
- Utilizaciones           ($150,000) ($200,000)  ($88,000) ($438,000)
- Reversiones             ($50,000)  ($100,000)  $0        ($150,000)
Saldo final               $350,000   $1,000,000  $92,000   $1,442,000
```

---

### 12. Control de Vencimientos

Mantener calendario de deuda:

| Período | Préstamo 1 | Préstamo 2 | ON | Total |
|---------|------------|------------|-----|--------|
| 2026    | $1,000,000 | $500,000   | $0  | $1,500,000 |
| 2027    | $1,000,000 | $500,000   | $0  | $1,500,000 |
| 2028    | $1,000,000 | $500,000   | $0  | $1,500,000 |
| 2029    | $800,000   | $300,000   | $10,000,000 | $11,100,000 |

---

### 13. Estrategias de Gestión

**Ventajas del Pasivo No Corriente:**
- Mayor plazo para generar flujos
- Menor presión de liquidez
- Posibilidad de inversiones de largo plazo

**Desventajas:**
- Costo financiero acumulado mayor
- Restricciones (covenants)
- Compromete flujos futuros

**Balance óptimo:**
- Financiar activos corrientes con pasivos corrientes
- Financiar activos no corrientes con pasivos no corrientes + patrimonio neto
- Mantener colchón de liquidez

---

## RESUMEN POR RUBRO

**22100 - DEUDAS BANCARIAS Y FINANCIERAS LP (3 cuentas):**
- Financiación de largo plazo (> 12 meses)
- Incluye préstamos, obligaciones negociables, documentos
- Reclasificar anualmente a corto plazo

**22200 - PREVISIONES (4 cuentas):**
- Obligaciones estimadas en monto o fecha
- Requieren alta probabilidad de ocurrencia
- Revisar y ajustar anualmente

---

## CHECKLIST ANUAL PARA CIERRE

- Reclasificar a CP la porción de deuda que vence en próximos 12 meses
- Actualizar tabla de amortización de préstamos
- Verificar cumplimiento de covenants
- Revisar estimaciones de previsiones
- Ajustar previsiones según nueva información
- Documentar garantías reales otorgadas
- Preparar nota de vencimientos futuros
- Calcular indicadores de endeudamiento
- Evaluar capacidad de pago futura
- Preparar movimiento de previsiones

---

# Manual de Cuentas - Patrimonio Neto

## 3.1 PATRIMONIO NETO (31XXX)

Representa la participación de los propietarios en los activos de la empresa. Es la diferencia entre el total de activos y el total de pasivos. También se conoce como Capital Contable o Fondos Propios.

**Fórmula básica:** 
```
Patrimonio Neto = Activo Total - Pasivo Total
```

---

## 31100 - CAPITAL SOCIAL

### 31101 - Capital Suscripto
**Descripción:** Registra el capital comprometido por los socios o accionistas según el estatuto o contrato social.

**Se debita por:**
- Reducción de capital (con autorización)
- Absorción de pérdidas
- Cancelación de acciones

**Se acredita por:**
- Constitución de la sociedad
- Aumento de capital
- Capitalización de resultados o reservas

**Ejemplo práctico:**
```
Constitución de SA con 100,000 acciones a $10 c/u
Capital: $1,000,000

DEBE: 11103 Banco Cta. Cte............. $1,000,000
HABER: 31101 Capital Suscripto......... $1,000,000

Aumento de capital por capitalización de resultados:
Asamblea decide capitalizar $500,000 de resultados

DEBE: 31401 Resultados No Asignados.... $500,000
HABER: 31101 Capital Suscripto......... $500,000

Reducción de capital (voluntaria) $200,000:
DEBE: 31101 Capital Suscripto......... $200,000
HABER: 11103 Banco Cta. Cte........... $200,000

Absorción de pérdidas con capital:
DEBE: 31101 Capital Suscripto......... $300,000
HABER: 31501 Resultado del Ejercicio.. $300,000
```

**Observaciones:**
- Requiere acta de asamblea para modificaciones
- En SA: representado por acciones
- En SRL: representado por cuotas sociales
- Aumento de capital puede ser: en efectivo, bienes, capitalización
- Reducción de capital: requiere publicación y período de oposición
- Debe estar totalmente integrado o parcialmente según tipo societario
- Inscripción en IGJ (Inspección General de Justicia)

---

### 31102 - Capital Integrado
**Descripción:** Registra la parte del capital suscripto que efectivamente fue aportada por los socios.

**Se debita por:**
- Reducción de capital integrado
- Devolución de aportes

**Se acredita por:**
- Integración efectiva de aportes

**Ejemplo práctico:**
```
Suscripción de capital $1,000,000
Integración inmediata 25% = $250,000
Saldo a integrar $750,000

Al suscribir:
DEBE: 11303 Deudores Varios (Accionistas) $1,000,000
HABER: 31101 Capital Suscripto.......... $1,000,000

Al integrar 25%:
DEBE: 11103 Banco Cta. Cte............. $250,000
HABER: 11303 Deudores Varios........... $250,000

DEBE: 31101 Capital Suscripto......... $250,000
HABER: 31102 Capital Integrado........ $250,000

Segunda integración (otros $250,000):
DEBE: 11103 Banco Cta. Cte............ $250,000
HABER: 11303 Deudores Varios.......... $250,000

DEBE: 31101 Capital Suscripto........ $250,000
HABER: 31102 Capital Integrado....... $250,000
```

**Observaciones:**
- SA: integración mínima 25% al constituir
- SRL: integración 100% al constituir
- Plazo máximo para completar: 2 años
- El capital no integrado es una deuda de los socios
- Balance muestra: Capital Suscripto - Capital No Integrado

**Alternativa simplificada (empresas pequeñas):**
Muchas empresas usan solo 31101 si el capital se integra totalmente.

---

### 31103 - Aportes Irrevocables a Cuenta de Futuras Suscripciones
**Descripción:** Registra aportes de socios destinados a futuros aumentos de capital, pero que aún no fueron formalizados.

**Se debita por:**
- Capitalización (pasa a Capital Suscripto)
- Devolución de aportes (si la asamblea no aprueba)

**Se acredita por:**
- Recepción de aportes irrevocables

**Ejemplo práctico:**
```
Socio aporta $300,000 para futuro aumento de capital
(Pendiente de aprobación en asamblea)

DEBE: 11103 Banco Cta. Cte............. $300,000
HABER: 31103 Aportes Irrevocables...... $300,000

Asamblea aprueba aumento de capital:
DEBE: 31103 Aportes Irrevocables...... $300,000
HABER: 31101 Capital Suscripto........ $300,000

Si asamblea NO aprueba (devolución):
DEBE: 31103 Aportes Irrevocables...... $300,000
HABER: 11103 Banco Cta. Cte........... $300,000
```

**Observaciones:**
- Es una cuenta transitoria
- Debe formalizarse en asamblea dentro del plazo legal
- Si no se capitaliza, debe devolverse o puede generar intereses
- Común cuando se necesita capital urgente antes de formalizar aumento
- Fortalece el patrimonio aunque no sea capital formal

---

## 31200 - AJUSTES AL PATRIMONIO

### 31201 - Ajuste por Revalúo Técnico
**Descripción:** Registra el mayor valor de bienes de uso determinado por revaluación técnica (aplicable en contextos inflacionarios o según normas contables).

**Se debita por:**
- Desvalorización posterior
- Venta del bien revaluado
- Reversión del revalúo

**Se acredita por:**
- Revalúo de bienes de uso

**Ejemplo práctico:**
```
Edificio: costo original $1,000,000
Depreciación acumulada $200,000
Valor neto en libros: $800,000
Revalúo técnico: $1,500,000
Incremento: $700,000

DEBE: 12102 Edificios.................. $700,000
HABER: 31201 Ajuste por Revalúo Técnico $700,000

O bien, si se ajusta neto de depreciación:
DEBE: 12102 Edificios.................. $500,000
DEBE: 12201 Deprec. Acum. Edificios.... $200,000
HABER: 31201 Ajuste por Revalúo Técnico $700,000

Al vender el edificio en $1,600,000:
DEBE: 11103 Banco Cta. Cte............ $1,600,000
DEBE: 12201 Deprec. Acum. Edificios... $200,000
HABER: 12102 Edificios................ $1,700,000
HABER: 42101 Result. Venta Bienes Uso $100,000

Transferir revalúo a resultados:
DEBE: 31201 Ajuste por Revalúo Técnico $700,000
HABER: 31401 Resultados No Asignados.. $700,000
```

**Observaciones:**
- No genera resultado en el ejercicio (va directo a PN)
- Requiere tasación de profesional matriculado
- La depreciación se calcula sobre valor revaluado
- Al vender el bien, el revalúo pasa a resultados acumulados
- En Argentina: aplicable según RT (Resoluciones Técnicas)
- No es deducible impositivamente hasta la venta

---

### 31202 - Diferencias de Conversión
**Descripción:** Registra diferencias por conversión de estados contables de sucursales en el extranjero.

**Se debita por:**
- Diferencias negativas de conversión
- Baja de inversión en el extranjero

**Se acredita por:**
- Diferencias positivas de conversión

**Ejemplo práctico:**
```
Sucursal en Brasil con patrimonio de R$ 1,000,000
TC inicial: R$ 1 = $ 200 → PN = $200,000,000
TC final: R$ 1 = $ 220 → PN = $220,000,000
Diferencia positiva: $20,000,000

DEBE: Activos en Brasil (ajuste)....... $20,000,000
HABER: 31202 Diferencias de Conversión. $20,000,000

Si TC baja:
TC final: R$ 1 = $ 180 → PN = $180,000,000
Diferencia negativa: $20,000,000

DEBE: 31202 Diferencias de Conversión. $20,000,000
HABER: Activos en Brasil (ajuste)..... $20,000,000
```

**Observaciones:**
- Solo aplica a empresas con operaciones en el exterior
- No afecta resultados del ejercicio
- Al cierre de la inversión, pasa a resultados
- Común en multinacionales o con sucursales

---

## 31300 - RESERVAS

**Concepto general:** Las reservas son apropiaciones de resultados acumulados con destino específico, decididas por la asamblea. No son deudas ni obligaciones, sino apartados del patrimonio.

---

### 31301 - Reserva Legal
**Descripción:** Reserva obligatoria establecida por la Ley de Sociedades Comerciales (LSC).

**Se debita por:**
- Capitalización de reservas
- Absorción de pérdidas

**Se acredita por:**
- Constitución anual (hasta alcanzar el tope)

**Ejemplo práctico:**
```
Sociedad Anónima:
Capital Social: $1,000,000
Ganancia del ejercicio: $500,000
Reserva legal obligatoria: 5% de ganancia = $25,000
Tope: 20% del capital = $200,000

Si reserva legal actual es $150,000:
Puede constituir hasta $50,000 más

Constitución de reserva $25,000:
DEBE: 31501 Resultado del Ejercicio.... $25,000
HABER: 31301 Reserva Legal............. $25,000

O bien, desde resultados acumulados:
DEBE: 31401 Resultados No Asignados.... $25,000
HABER: 31301 Reserva Legal............. $25,000
```

**Observaciones:**
- **SA:** 5% de ganancias hasta alcanzar 20% del capital
- **SRL:** No obligatoria, pero recomendable
- No puede distribuirse como dividendos
- Solo se usa para: absorber pérdidas o capitalizar
- Una vez alcanzado el tope, no se constituye más
- Si aumenta el capital, aumenta el tope

---

### 31302 - Reserva Estatutaria
**Descripción:** Reservas establecidas en el estatuto social con propósitos específicos.

**Se debita por:**
- Utilización según destino estatutario
- Modificación del estatuto

**Se acredita por:**
- Constitución según estatuto

**Ejemplo práctico:**
```
Estatuto establece: reserva del 10% de ganancias para
"Fondo de renovación de equipamiento"

Ganancia: $500,000
Reserva estatutaria: $50,000

DEBE: 31501 Resultado del Ejercicio.... $50,000
HABER: 31302 Reserva Estatutaria....... $50,000

Utilización para comprar equipamiento:
DEBE: 31302 Reserva Estatutaria....... $200,000
HABER: 31401 Resultados No Asignados.. $200,000

Luego:
DEBE: 12105 Equipos................... $200,000
HABER: 11103 Banco Cta. Cte.......... $200,000
```

**Observaciones:**
- Debe estar prevista en estatuto
- Tiene destino específico
- Requiere asamblea para modificar
- Puede establecer porcentaje o monto fijo

---

### 31303 - Reserva Facultativa
**Descripción:** Reservas creadas voluntariamente por decisión de asamblea sin estar en el estatuto.

**Se debita por:**
- Utilización aprobada por asamblea
- Distribución como dividendos

**Se acredita por:**
- Constitución por asamblea

**Ejemplo práctico:**
```
Asamblea decide reservar $200,000 para
"Futura expansión comercial"

DEBE: 31501 Resultado del Ejercicio.... $200,000
HABER: 31303 Reserva Facultativa....... $200,000

Años después, asamblea decide liberar la reserva:
DEBE: 31303 Reserva Facultativa....... $200,000
HABER: 31401 Resultados No Asignados.. $200,000

Ahora puede distribuirse como dividendos:
DEBE: 31401 Resultados No Asignados.. $150,000
HABER: 21502 Dividendos a Pagar...... $150,000
```

**Observaciones:**
- Totalmente voluntaria
- No requiere modificación de estatuto
- Fines diversos: expansión, contingencias, modernización, etc.
- Puede liberarse cuando la asamblea decida
- Demuestra solidez patrimonial

---

### 31304 - Reserva por Revalúo
**Descripción:** Reserva que se constituye cuando se capitaliza el revalúo de bienes de uso.

**Se debita por:**
- Capitalización
- Venta del bien revaluado

**Se acredita por:**
- Transferencia desde 31201 al capitalizar

**Ejemplo práctico:**
```
Revalúo de edificio $700,000 (en 31201)
Asamblea decide capitalizar el revalúo

Paso 1: Transferir a reserva
DEBE: 31201 Ajuste por Revalúo Técnico $700,000
HABER: 31304 Reserva por Revalúo....... $700,000

Paso 2: Capitalizar
DEBE: 31304 Reserva por Revalúo....... $700,000
HABER: 31101 Capital Suscripto........ $700,000
```

**Observaciones:**
- Originada en revaluaciones
- No distribuible como dividendos
- Solo se capitaliza o absorbe pérdidas
- Al vender el bien, puede liberarse

---

## 31400 - RESULTADOS ACUMULADOS

### 31401 - Resultados No Asignados
**Descripción:** Registra las ganancias (o pérdidas) acumuladas de ejercicios anteriores que no han sido distribuidas ni asignadas a reservas.

**Se debita por:**
- Distribución de dividendos
- Constitución de reservas
- Absorción con capital (si son pérdidas)
- Pérdidas acumuladas

**Se acredita por:**
- Resultado positivo del ejercicio (al cierre)
- Liberación de reservas
- Ganancias acumuladas

**Ejemplo práctico:**
```
Cierre del ejercicio con ganancia $500,000:
DEBE: 31501 Resultado del Ejercicio.... $500,000
HABER: 31401 Resultados No Asignados... $500,000

Asamblea del año siguiente decide:
- Reserva Legal 5%: $25,000
- Reserva Facultativa: $100,000
- Dividendos: $300,000
- No asignado: $75,000

Reserva Legal:
DEBE: 31401 Resultados No Asignados.... $25,000
HABER: 31301 Reserva Legal............. $25,000

Reserva Facultativa:
DEBE: 31401 Resultados No Asignados.... $100,000
HABER: 31303 Reserva Facultativa....... $100,000

Dividendos:
DEBE: 31401 Resultados No Asignados.... $300,000
HABER: 21502 Dividendos a Pagar........ $300,000

Saldo final 31401: $75,000
```

**Observaciones:**
- Saldo acreedor: ganancias acumuladas
- Saldo deudor: pérdidas acumuladas
- Es el destino natural del resultado del ejercicio
- Dividendos solo de ganancias (no de capital ni reservas)
- Pérdidas acumuladas deben cubrirse antes de distribuir

---

### 31402 - Resultados de Ejercicios Anteriores
**Descripción:** Cuenta utilizada en algunos sistemas para separar los resultados ya tratados en asambleas anteriores.

**Observaciones:**
- Similar a 31401 pero con separación temporal
- Algunas empresas unifican todo en 31401
- Útil para tracking histórico
- Se debita/acredita igual que 31401

**Nota:** En muchos planes de cuentas modernos se usa solo 31401, fusionando ambos conceptos.

---

## 31500 - RESULTADO DEL EJERCICIO

### 31501 - Resultado del Ejercicio
**Descripción:** Registra el resultado (ganancia o pérdida) del ejercicio económico en curso. Se calcula como diferencia entre ingresos y egresos.

**Se debita por:**
- Pérdida del ejercicio (saldo deudor)
- Cierre del ejercicio (si hay ganancia, para llevar a 31401)

**Se acredita por:**
- Ganancia del ejercicio (saldo acreedor)
- Cierre del ejercicio (si hay pérdida, para llevar a 31401)

**Ejemplo práctico:**
```
Durante el ejercicio:
Ingresos totales: $10,000,000
Egresos totales: $7,500,000
Ganancia: $2,500,000

Al cierre (cálculo automático del sistema):
Ingresos (acreedor): $10,000,000
Egresos (deudor): $7,500,000
31501 (acreedor): $2,500,000

Asiento de cierre al finalizar ejercicio:
DEBE: 31501 Resultado del Ejercicio.... $2,500,000
HABER: 31401 Resultados No Asignados... $2,500,000

Si hubiera sido pérdida de $500,000:
31501 tendría saldo deudor de $500,000

Asiento de cierre:
DEBE: 31401 Resultados No Asignados... $500,000
HABER: 31501 Resultado del Ejercicio.. $500,000
```

**Observaciones:**
- Saldo se determina automáticamente: Ingresos - Egresos
- Saldo acreedor = Ganancia
- Saldo deudor = Pérdida
- Al cierre del ejercicio, se transfiere a 31401
- Durante el ejercicio siguiente, comienza en cero
- Es una cuenta de patrimonio neto, no de resultado
- En balance, aparece en PN (no se suma/resta en el estado de resultados)

---

## OBSERVACIONES GENERALES DEL PATRIMONIO NETO

### 1. Ecuación Patrimonial

**Fórmula fundamental:**
```
ACTIVO = PASIVO + PATRIMONIO NETO

Por lo tanto:
PATRIMONIO NETO = ACTIVO - PASIVO
```

**Componentes del PN:**
```
Patrimonio Neto = Capital + Reservas + Resultados Acumulados + Resultado del Ejercicio + Ajustes
```

---

### 2. Evolución del Patrimonio Neto

**Aumenta por:**
- Aportes de capital
- Ganancias del ejercicio
- Revalúos de activos
- Aportes irrevocables

**Disminuye por:**
- Retiros de capital
- Pérdidas del ejercicio
- Distribución de dividendos
- Desvalorización de activos

---

### 3. Estado de Evolución del Patrimonio Neto (EEPN)

Presentación típica:

```
                    Capital  Res.Legal  Res.Fac. Result.Acum  Result.Ej. Total PN
Saldo inicial      $1,000    $150       $300      $500         $0          $1,950
Resultado ejercicio $0       $0         $0        $0           $800        $800
Distribución:
- Reserva Legal     $0       $40        $0        ($40)        $0          $0
- Dividendos        $0       $0         $0        ($400)       $0          ($400)
- A Resultados Acum $0       $0         $0        $360         ($360)      $0
Aumento de capital  $500     $0         $0        $0           $0          $500
Saldo final        $1,500    $190       $300      $420         $440        $2,850
```

---

### 4. Tratamiento de Dividendos

**Dividendos en efectivo:**
```
Asamblea declara dividendos $300,000:
DEBE: 31401 Resultados No Asignados... $300,000
HABER: 21502 Dividendos a Pagar....... $300,000

Pago:
DEBE: 21502 Dividendos a Pagar....... $300,000
HABER: 11103 Banco Cta. Cte.......... $300,000
```

**Dividendos en acciones (capitalización):**
```
DEBE: 31401 Resultados No Asignados... $300,000
HABER: 31101 Capital Suscripto........ $300,000
```

---

### 5. Limitaciones a la Distribución

**No pueden distribuirse:**
- Capital Social
- Reserva Legal (hasta absorber pérdidas)
- Reservas Estatutarias (según destino)
- Ajustes por revalúo (hasta capitalizar o vender)

**Pueden distribuirse:**
- Resultados No Asignados (positivos)
- Reservas Facultativas (previa liberación)

**Orden de prioridad:**
1. Cubrir pérdidas acumuladas
2. Constituir Reserva Legal
3. Constituir reservas estatutarias
4. Constituir reservas facultativas (opcional)
5. Distribuir dividendos

---

### 6. Absorción de Pérdidas

**Orden sugerido:**
```
1° Resultados Acumulados positivos
2° Reservas Facultativas
3° Reservas Estatutarias (si estatuto permite)
4° Reserva Legal
5° Capital Social (reducción de capital)

Ejemplo: Pérdida $800,000

Si hay:
- Resultados Acumulados: $200,000
- Reserva Facultativa: $300,000
- Reserva Legal: $200,000
- Capital: $1,000,000

Absorción:
DEBE: 31501 Resultado del Ejercicio... $800,000
HABER: 31401 Resultados No Asignados. $200,000
HABER: 31303 Reserva Facultativa...... $300,000
HABER: 31301 Reserva Legal............ $200,000
HABER: 31101 Capital Suscripto........ $100,000
```

---

### 7. Causales de Disolución Societaria

**Pérdida del Capital (Ley 19.550):**
- Si pérdidas absorben todo el capital social
- Debe llamarse a asamblea inmediatamente
- Opciones: reconstituir capital o disolver sociedad

```
Situación crítica:
Capital: $1,000,000
Pérdidas acumuladas: ($1,200,000)
PN negativo: ($200,000)

Acción inmediata requerida por ley
```

---

### 8. Índices Patrimoniales

**Rentabilidad sobre Patrimonio (ROE):**
```
ROE = Resultado del Ejercicio / Patrimonio Neto

> 15%: Excelente rentabilidad
10-15%: Buena rentabilidad
5-10%: Rentabilidad moderada
< 5%: Baja rentabilidad
```

**Solvencia:**
```
Solvencia = Activo Total / Pasivo Total

> 2: Muy solvente
1.5-2: Solvente
1-1.5: Solvencia justa
< 1: Insolvente (Pasivo > Activo)
```

**Ratio de Endeudamiento:**
```
Endeudamiento = Pasivo Total / Patrimonio Neto

< 1: Bajo endeudamiento (más patrimonio que deuda)
1-2: Endeudamiento moderado
> 2: Alto endeudamiento
```

---

### 9. Valuación de Acciones/Cuotas

**Valor Patrimonial Proporcional (VPP):**
```
VPP = Patrimonio Neto / Cantidad de Acciones

Ejemplo:
PN: $2,850,000
Acciones: 100,000
VPP = $28.50 por acción

Socio con 10,000 acciones tiene:
Participación: 10% del PN = $285,000
```

**Valor de Mercado:**
Puede ser diferente del VPP (considera expectativas, llave de negocio, etc.)

---

### 10. Presentación en Balance

**PATRIMONIO NETO**
```
Capital Social
  Capital Suscripto                    $1,500,000
  (-) Capital no integrado             ($300,000)
  Subtotal                             $1,200,000

Aportes Irrevocables                   $0

Ajustes al Patrimonio
  Ajuste por Revalúo Técnico           $700,000

Reservas
  Reserva Legal                        $190,000
  Reserva Estatutaria                  $0
  Reserva Facultativa                  $300,000
  Subtotal Reservas                    $490,000

Resultados Acumulados
  Resultados No Asignados              $420,000

Resultado del Ejercicio                $440,000

TOTAL PATRIMONIO NETO                  $3,250,000
```

---

### 11. Documentación Societaria

**Decisiones que requieren asamblea:**
- Aumento o reducción de capital
- Distribución de dividendos
- Constitución de reservas
- Absorción de pérdidas
- Revaluación de activos
- Modificación de estatuto

**Documentación necesaria:**
- Acta de asamblea
- Inscripción en IGJ/Registro Público
- Publicación (según monto)
- Modificación de estatuto (si corresponde)

---

### 12. Diferencias por Tipo Societario

**Sociedad Anónima (SA):**
- Reserva Legal obligatoria (5% hasta 20%)
- Capital representado por acciones
- Integración mínima 25%
- Órganos: Directorio, Asamblea, Sindicatura

**Sociedad de Responsabilidad Limitada (SRL):**
- Reserva Legal no obligatoria (recomendable)
- Capital representado por cuotas
- Integración 100%
- Órganos: Gerencia, Reunión de Socios

**Sociedad Simple / Unipersonal:**
- Sin reserva legal obligatoria
- Capital del titular
- Menor formalidad

---

## RESUMEN POR RUBRO

**31100 - CAPITAL SOCIAL (3 cuentas):**
- Aportes de los socios/accionistas
- Base patrimonial de la empresa

**31200 - AJUSTES AL PATRIMONIO (2 cuentas):**
- Revalúos, diferencias de conversión
- No afectan resultado del ejercicio

**31300 - RESERVAS (4 cuentas):**
- Apropiaciones de resultados
- Distintos fines y grados de obligatoriedad

**31400 - RESULTADOS ACUMULADOS (2 cuentas):**
- Ganancias/pérdidas no distribuidas de ejercicios anteriores

**31500 - RESULTADO DEL EJERCICIO (1 cuenta):**
- Ganancia o pérdida del ejercicio en curso

---

## CHECKLIST ANUAL - CIERRE Y ASAMBLEA

- Calcular resultado del ejercicio (Ingresos - Egresos)
- Transferir resultado a Resultados No Asignados
- Preparar Estado de Evolución del PN
- Calcular Reserva Legal (si corresponde)
- Convocar asamblea dentro de plazo legal
- Preparar orden del día de asamblea
- Aprobar estados contables
- Decidir distribución de resultados
- Constituir reservas
- Declarar dividendos (si corresponde)
- Labrar acta de asamblea
- Registrar decisiones contablemente
- Inscribir acta en IGJ (si hay modificaciones)
- Informar a AFIP (si hay dividendos)

---

# Manual de Cuentas - Ingresos

## 4. INGRESOS

Comprende todos los incrementos en los beneficios económicos durante el ejercicio, en forma de entradas o aumentos del valor de los activos, o disminuciones de los pasivos, que resultan en aumentos del patrimonio neto (distintos de los aportes de capital).

**Importante:** En este sistema, las cuentas de Ingresos tienen naturaleza ACREEDORA.

---

## 4.1 INGRESOS ORDINARIOS (41XXX)

Son los ingresos provenientes de las actividades principales y habituales de la empresa.

---

## 41100 - VENTAS

### 41101 - Ventas de Mercaderías
**Descripción:** Registra los ingresos por venta de bienes adquiridos para su comercialización.

**Se debita por:**
- Devoluciones de ventas
- Descuentos y bonificaciones
- Anulaciones
- Cierre del ejercicio (contra Resultado del Ejercicio)

**Se acredita por:**
- Ventas de mercaderías (contado o crédito)
- Facturación de mercaderías

**Ejemplo práctico:**
```
Venta de mercaderías $100,000 + IVA 21%
Total facturado: $121,000

DEBE: 11201 Deudores por Ventas........ $121,000
HABER: 41101 Ventas de Mercaderías..... $100,000
HABER: 21201 IVA Débito Fiscal......... $21,000

Además, registrar el costo:
DEBE: 51101 Costo Mercaderías Vendidas. $60,000
HABER: 11401 Mercaderías............... $60,000

Venta de contado:
DEBE: 11103 Banco Cta. Cte............. $121,000
HABER: 41101 Ventas de Mercaderías..... $100,000
HABER: 21201 IVA Débito Fiscal......... $21,000

Devolución de mercadería vendida $10,000:
DEBE: 41104 Devoluciones de Ventas..... $10,000
DEBE: 21201 IVA Débito Fiscal.......... $2,100
HABER: 11201 Deudores por Ventas....... $12,100
```

**Observaciones:**
- Siempre registrar neto de IVA (IVA va a cuenta 21201)
- Momento de reconocimiento: al transferir riesgos y beneficios al comprador
- Requiere emisión de factura o documento legal
- El costo se registra simultáneamente (51101)
- Devoluciones: usar cuenta regularizadora 41104
- En empresas comerciales, es el ingreso principal

---

### 41102 - Ventas de Productos Manufacturados
**Descripción:** Registra los ingresos por venta de productos fabricados por la propia empresa.

**Se debita por:**
- Devoluciones
- Descuentos y bonificaciones
- Cierre del ejercicio

**Se acredita por:**
- Ventas de productos fabricados

**Ejemplo práctico:**
```
Venta de productos terminados $200,000 + IVA
Costo de producción: $120,000

DEBE: 11201 Deudores por Ventas........ $242,000
HABER: 41102 Ventas Productos Manufact. $200,000
HABER: 21201 IVA Débito Fiscal......... $42,000

DEBE: 51102 Costo Productos Vendidos... $120,000
HABER: 11406 Productos Terminados...... $120,000
```

**Observaciones:**
- Para empresas industriales o manufactureras
- El costo incluye: materias primas + mano de obra + gastos de fabricación
- Diferenciarlo de 41101 para análisis de rentabilidad por línea
- Control de stock más complejo (proceso productivo)

---

### 41103 - Servicios Prestados
**Descripción:** Registra los ingresos por prestación de servicios.

**Se debita por:**
- Anulaciones de servicios
- Descuentos otorgados
- Cierre del ejercicio

**Se acredita por:**
- Facturación de servicios prestados

**Ejemplo práctico:**
```
Servicio de consultoría $80,000 + IVA
DEBE: 11201 Deudores por Ventas........ $96,800
HABER: 41103 Servicios Prestados....... $80,000
HABER: 21201 IVA Débito Fiscal......... $16,800

DEBE: 51103 Costo Servicios Prestados.. $45,000
HABER: 53101 Sueldos (horas trabajadas) $30,000
HABER: 53800 Gastos Generales.......... $15,000
```

**Observaciones:**
- Momento de reconocimiento: al completar el servicio o por grado de avance
- En servicios de larga duración: reconocer por % de avance
- IVA puede ser 21% o 10.5% según tipo de servicio
- Costo incluye: mano de obra + materiales + gastos directos
- Ejemplos: consultoría, reparaciones, mantenimiento, honorarios profesionales

---

### 41104 - Devoluciones de Ventas (REGULARIZADORA)
**Descripción:** Cuenta regularizadora que disminuye las ventas por mercaderías devueltas por clientes.

**Se debita por:**
- Devoluciones de mercaderías vendidas
- Productos rechazados por clientes

**Se acredita por:**
- Cierre del ejercicio (contra ventas)

**Ejemplo práctico:**
```
Cliente devuelve mercadería por $15,000 + IVA
Venta original fue por $15,000

DEBE: 41104 Devoluciones de Ventas..... $15,000
DEBE: 21201 IVA Débito Fiscal.......... $3,150
HABER: 11201 Deudores por Ventas....... $18,150

Reingreso de mercadería al stock:
DEBE: 11401 Mercaderías................ $9,000
HABER: 51101 Costo Mercaderías Vendidas $9,000
```

**Observaciones:**
- Naturaleza DEUDORA (resta de ingresos acreedores)
- Emitir Nota de Crédito al cliente
- Reingresar mercadería al stock al costo
- En balance: se presenta neto (Ventas - Devoluciones)
- Analizar causas: defectos, errores, insatisfacción
- Control de calidad importante si es recurrente

---

### 41105 - Bonificaciones sobre Ventas (REGULARIZADORA)
**Descripción:** Cuenta regularizadora que registra descuentos comerciales otorgados a clientes.

**Se debita por:**
- Bonificaciones por volumen
- Descuentos especiales
- Rappels

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Bonificación del 10% sobre compras del trimestre
Cliente compró $500,000 en el trimestre
Bonificación: $50,000

DEBE: 41105 Bonificaciones sobre Ventas $50,000
DEBE: 21201 IVA Débito Fiscal.......... $10,500
HABER: 11201 Deudores por Ventas....... $60,500

O bien, si es al momento de venta:
Venta $100,000 con 10% de descuento
Facturar: $90,000

DEBE: 11201 Deudores por Ventas........ $108,900
HABER: 41101 Ventas de Mercaderías..... $90,000
HABER: 21201 IVA Débito Fiscal......... $18,900

No usar cuenta regularizadora si se factura neto
```

**Observaciones:**
- Naturaleza DEUDORA
- Descuentos comerciales (no financieros)
- Pueden ser: por volumen, por pronto pago, promocionales
- Emitir Nota de Crédito
- Diferente de 41106 (descuentos financieros)

---

### 41106 - Descuentos sobre Ventas (REGULARIZADORA)
**Descripción:** Cuenta regularizadora para descuentos por pronto pago u otros ajustes posteriores a la venta.

**Se debita por:**
- Descuentos por pronto pago
- Ajustes de precio posteriores

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Cliente paga antes de 10 días, descuento 5%
Deuda: $100,000
Descuento: $5,000

DEBE: 11103 Banco Cta. Cte............. $95,000
DEBE: 41106 Descuentos sobre Ventas.... $5,000
HABER: 11201 Deudores por Ventas....... $100,000
```

**Observaciones:**
- Naturaleza DEUDORA
- Incentiva pago anticipado
- No emite Nota de Crédito siempre (puede ser ajuste contable)
- Analizar si el costo financiero justifica el descuento

---

## 41200 - OTROS INGRESOS OPERATIVOS

### 41201 - Intereses Ganados
**Descripción:** Registra ingresos por intereses de plazos fijos, préstamos otorgados, inversiones, etc.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Intereses devengados o cobrados
- Rentas de inversiones

**Ejemplo práctico:**
```
Plazo fijo $500,000 al 10% anual por 90 días
Intereses: $12,329

Al vencimiento:
DEBE: 11103 Banco Cta. Cte............. $512,329
HABER: 11501 Plazos Fijos.............. $500,000
HABER: 41201 Intereses Ganados......... $12,329

Devengo mensual de intereses (si es a largo plazo):
DEBE: 12602 Créditos a Largo Plazo..... $4,110
HABER: 41201 Intereses Ganados......... $4,110
```

**Observaciones:**
- Devengar proporcionalmente (aunque no se cobren)
- Incluye: plazos fijos, préstamos otorgados, bonos, ON
- Puede estar sujeto a retención de Ganancias
- No confundir con diferencias de cambio

---

### 41202 - Descuentos Obtenidos
**Descripción:** Registra descuentos por pronto pago obtenidos de proveedores.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Descuentos recibidos de proveedores

**Ejemplo práctico:**
```
Deuda con proveedor $80,000
Pago antes de 10 días con descuento 3%
Descuento: $2,400

DEBE: 21101 Proveedores................ $80,000
HABER: 11103 Banco Cta. Cte............ $77,600
HABER: 41202 Descuentos Obtenidos...... $2,400
```

**Observaciones:**
- Ingreso financiero
- Beneficio por pagar anticipadamente
- Analizar conveniencia (costo de oportunidad del dinero)
- Puede recibirse Nota de Crédito

---

### 41203 - Recupero de Créditos Incobrables
**Descripción:** Registra cobros de créditos que habían sido dados de baja como incobrables.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Cobro de deudores previamente castigados

**Ejemplo práctico:**
```
Deudor castigado años atrás por $30,000
Cobra inesperadamente $30,000

DEBE: 11103 Banco Cta. Cte............. $30,000
HABER: 41203 Recupero Créditos Incobr.. $30,000
```

**Observaciones:**
- Ingreso extraordinario por naturaleza
- No se puede revertir la baja (es cobro nuevo)
- Puede ubicarse en Ingresos Extraordinarios también

---

### 41204 - Alquileres Ganados
**Descripción:** Registra ingresos por alquiler de inmuebles, equipos u otros bienes.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Cobro o devengamiento de alquileres

**Ejemplo práctico:**
```
Alquiler mensual de local $50,000 + IVA
DEBE: 11201 Deudores por Ventas........ $60,500
HABER: 41204 Alquileres Ganados........ $50,000
HABER: 21201 IVA Débito Fiscal......... $10,500

Si el inquilino está en el uso y no ha pagado:
DEBE: 11201 Deudores por Ventas........ $60,500
HABER: 41204 Alquileres Ganados........ $50,000
HABER: 21201 IVA Débito Fiscal......... $10,500
```

**Observaciones:**
- Devengar mensualmente aunque no se cobre
- IVA 21% (alquileres comerciales)
- Retención de Ganancias puede aplicar
- Gastos del inmueble (expensas, impuestos) son egresos

---

### 41205 - Regalías Ganadas
**Descripción:** Registra ingresos por concesión de uso de marcas, patentes, derechos de autor, etc.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Cobro o devengamiento de regalías

**Ejemplo práctico:**
```
Regalía 5% sobre ventas del licenciatario
Ventas del mes: $1,000,000
Regalía: $50,000

DEBE: 11201 Deudores por Ventas........ $60,500
HABER: 41205 Regalías Ganadas.......... $50,000
HABER: 21201 IVA Débito Fiscal......... $10,500
```

**Observaciones:**
- Común en licencias de marcas, patentes, software
- Base de cálculo: ventas, unidades, monto fijo
- Requiere contrato formal
- Puede tener retención de Ganancias

---

### 41206 - Comisiones Ganadas
**Descripción:** Registra ingresos por comisiones de intermediación, representación, etc.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Comisiones devengadas o cobradas

**Ejemplo práctico:**
```
Comisión 10% sobre venta intermediada de $500,000
Comisión: $50,000

DEBE: 11201 Deudores por Ventas........ $60,500
HABER: 41206 Comisiones Ganadas........ $50,000
HABER: 21201 IVA Débito Fiscal......... $10,500
```

**Observaciones:**
- Momento de reconocimiento: al concretar la operación
- Común en agentes, representantes, intermediarios
- Base: porcentaje sobre venta o monto fijo

---

## 41300 - RESULTADOS POR TENENCIA

### 41301 - Diferencias de Cambio Positivas
**Descripción:** Registra ganancias por variación del tipo de cambio en activos o pasivos en moneda extranjera.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Revaluación positiva de activos en ME
- Revaluación negativa de pasivos en ME

**Ejemplo práctico:**
```
Deudor en dólares: USD 10,000
TC al momento de venta: $1,000 = $10,000,000
TC al cobro: $1,100 = $11,000,000
Diferencia positiva: $1,000,000

DEBE: 11103 Banco Cta. Cte............. $11,000,000
HABER: 11201 Deudores por Ventas....... $10,000,000
HABER: 41301 Diferencias Cambio Posit.. $1,000,000

Pasivo en dólares: USD 5,000
TC al contraer deuda: $1,000 = $5,000,000
TC al pago: $900 = $4,500,000
Diferencia positiva: $500,000

DEBE: 21101 Proveedores................ $5,000,000
HABER: 11103 Banco Cta. Cte............ $4,500,000
HABER: 41301 Diferencias Cambio Posit.. $500,000
```

**Observaciones:**
- Resultado financiero por tenencia de ME
- Se devenga al cierre (aunque no se realice)
- Activo en ME sube → ganancia
- Pasivo en ME baja → ganancia
- Impacto en inflación y devaluación

---

### 41302 - Resultado por Exposición a la Inflación (REI) Positivo
**Descripción:** Registra ganancias por aplicación del ajuste por inflación en contextos de alta inflación.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Ajuste por inflación con resultado positivo

**Ejemplo práctico:**
```
Posición monetaria neta negativa en contexto inflacionario
(Más pasivos que activos monetarios)
Inflación del período: 25%
PMN: ($5,000,000)
REI positivo: $1,250,000

DEBE: Activos y Pasivos (ajuste)....... (varios)
HABER: 41302 REI Positivo.............. $1,250,000
```

**Observaciones:**
- Solo aplica cuando hay ajuste por inflación contable
- PMN negativa (más pasivos que activos monetarios) → ganancia
- En Argentina: RT 6 y modificatorias
- Complejo cálculo técnico

---

## 4.2 INGRESOS EXTRAORDINARIOS (42XXX)

Son ingresos atípicos, no recurrentes, ajenos a la actividad principal de la empresa.

---

## 42100 - RESULTADOS EXTRAORDINARIOS

### 42101 - Resultado por Venta de Bienes de Uso
**Descripción:** Registra el resultado (ganancia o pérdida) por venta de bienes de uso.

**Se debita por:**
- Pérdida en venta de bienes de uso
- Cierre del ejercicio

**Se acredita por:**
- Ganancia en venta de bienes de uso

**Ejemplo práctico:**
```
Venta de rodado usado:
Costo original: $800,000
Depreciación acumulada: $500,000
Valor neto en libros: $300,000
Precio de venta: $400,000
Ganancia: $100,000

DEBE: 11103 Banco Cta. Cte............. $400,000
DEBE: 12205 Deprec. Acum. Rodados...... $500,000
HABER: 12106 Rodados................... $800,000
HABER: 42101 Result. Venta Bienes Uso.. $100,000

Si se vendiera en $250,000 (pérdida $50,000):
DEBE: 11103 Banco Cta. Cte............. $250,000
DEBE: 12205 Deprec. Acum. Rodados...... $500,000
DEBE: 42101 Result. Venta Bienes Uso.. $50,000
HABER: 12106 Rodados................... $800,000
```

**Observaciones:**
- Puede ser ganancia o pérdida
- No es actividad habitual de la empresa
- Emitir factura o documento
- IVA puede aplicar según el bien
- Impuesto a las Ganancias grava el resultado

---

### 42102 - Resultado por Venta de Inversiones
**Descripción:** Registra el resultado por venta de inversiones permanentes o temporarias.

**Se debita por:**
- Pérdida en venta de inversiones
- Cierre del ejercicio

**Se acredita por:**
- Ganancia en venta de inversiones

**Ejemplo práctico:**
```
Venta de acciones:
Costo de adquisición: $200,000
Precio de venta: $280,000
Ganancia: $80,000

DEBE: 11103 Banco Cta. Cte............. $280,000
HABER: 11502 Acciones.................. $200,000
HABER: 42102 Result. Venta Inversiones. $80,000
```

**Observaciones:**
- Incluye acciones, bonos, plazos fijos rescatados
- Diferencia entre precio de venta y costo
- Puede haber retención de Ganancias
- No confundir con intereses (41201)

---

### 42103 - Recupero de Previsiones
**Descripción:** Registra ingresos por reversión de previsiones que no se utilizaron.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Reversión de previsiones no utilizadas

**Ejemplo práctico:**
```
Previsión para juicio $350,000
Juicio ganado, se revierte previsión

DEBE: 22201 Previsión para Juicios..... $350,000
HABER: 42103 Recupero de Previsiones... $350,000

Previsión para garantías $100,000
Al año siguiente, solo se usaron $30,000
Reversión del exceso: $70,000

DEBE: 22203 Previsión para Garantías.. $70,000
HABER: 42103 Recupero de Previsiones.. $70,000
```

**Observaciones:**
- Ingreso extraordinario
- Mejora el resultado del ejercicio
- Reverso de gastos de ejercicios anteriores
- No es recurrente

---

### 42104 - Ingresos Extraordinarios Varios
**Descripción:** Registra otros ingresos atípicos no clasificados en otras cuentas.

**Se debita por:**
- Cierre del ejercicio

**Se acredita por:**
- Ingresos no recurrentes diversos

**Ejemplo práctico:**
```
Indemnización de seguro por siniestro $500,000
DEBE: 11103 Banco Cta. Cte............. $500,000
HABER: 42104 Ingresos Extraordinarios Varios $500,000

Donación recibida $100,000
DEBE: 11103 Banco Cta. Cte............. $100,000
HABER: 42104 Ingresos Extraordinarios Varios $100,000

Prescripción de deuda $80,000
DEBE: 21101 Proveedores................ $80,000
HABER: 42104 Ingresos Extraordinarios Varios $80,000
```

**Observaciones:**
- Incluye: indemnizaciones, donaciones, prescripciones, condonaciones
- No son parte de la actividad normal
- Analizar impacto impositivo
- Documentar adecuadamente

---

## OBSERVACIONES GENERALES DE INGRESOS

### 1. Reconocimiento de Ingresos

**Criterios según RT 17:**
1. **Transferencia de riesgos y beneficios:** al entregar el bien o prestar el servicio
2. **Monto medible confiablemente**
3. **Probable flujo de beneficios económicos**
4. **Costos identificables**

**Momento de reconocimiento:**
- Ventas de bienes: al transferir la propiedad
- Prestación de servicios: al completar o por grado de avance
- Intereses: por devengamiento temporal
- Regalías: según acuerdo contractual

---

### 2. Ingresos vs. Cobros

```
INGRESO (devengamiento) ≠ COBRO (percepción)

Venta a crédito $100,000:
Ingreso: se reconoce al momento de venta
Cobro: se produce 30/60/90 días después

DEBE: 11201 Deudores por Ventas....... $121,000
HABER: 41101 Ventas de Mercaderías..... $100,000
HABER: 21201 IVA Débito Fiscal......... $21,000

Cobro posterior:
DEBE: 11103 Banco Cta. Cte............. $121,000
HABER: 11201 Deudores por Ventas....... $121,000
```

---

### 3. Ingresos Netos

**Presentación en Estado de Resultados:**
```
Ventas Brutas                   $10,000,000
(-) Devoluciones                   ($500,000)
(-) Bonificaciones                 ($300,000)
(-) Descuentos                     ($200,000)
= VENTAS NETAS                   $9,000,000
```

---

### 4. IVA en Ingresos

**Principio fundamental:** Los ingresos se registran NETOS de IVA

```
Incorrecto:
DEBE: Clientes.................... $121,000
HABER: Ventas..................... $121,000

Correcto:
DEBE: 11201 Deudores por Ventas...... $121,000
HABER: 41101 Ventas de Mercaderías... $100,000
HABER: 21201 IVA Débito Fiscal....... $21,000
```

---

### 5. Análisis de Ingresos

**Indicadores clave:**

**Margen Bruto:**
```
= (Ventas Netas - Costo de Ventas) / Ventas Netas × 100

Ejemplo:
Ventas: $9,000,000
Costo: $5,400,000
Margen Bruto: 40%
```

**Rotación de Ventas:**
```
= Ventas Netas / Activo Total

Mide eficiencia en uso de activos
```

**Ticket Promedio:**
```
= Ventas Totales / Cantidad de Transacciones
```

---

### 6. Clasificación por Segmento

Analizar ingresos por:
- Línea de productos
- Canal de venta
- Región geográfica
- Cliente
- Vendedor

```
Ventas por Línea:
- Producto A: $3,000,000 (30%)
- Producto B: $4,500,000 (45%)
- Producto C: $1,500,000 (15%)
- Servicios: $1,000,000 (10%)
Total: $10,000,000
```

---

### 7. Estacionalidad

Considerar patrones estacionales:
```
Ventas mensuales:
Enero: bajo (post fiestas)
Febrero-Marzo: medio
Abril-Julio: alto
Agosto: bajo (vacaciones)
Septiembre-Noviembre: alto
Diciembre: muy alto (fiestas)
```

---

### 8. Ingresos Diferidos

**Anticipos de clientes:** No son ingresos hasta entregar

```
Cliente paga adelantado $200,000:
DEBE: 11103 Banco Cta. Cte............ $200,000
HABER: 21501 Anticipos de Clientes.... $200,000

Al entregar mercadería:
DEBE: 21501 Anticipos de Clientes.... $200,000
HABER: 41101 Ventas de Mercaderías... $200,000
```

---

### 9. Cierre de Cuentas de Resultado

Al finalizar el ejercicio, todas las cuentas de ingresos se cierran contra Resultado del Ejercicio:

```
Total ingresos del año: $12,000,000

DEBE: 41101 Ventas de Mercaderías....... $9,000,000
DEBE: 41103 Servicios Prestados......... $2,000,000
DEBE: 41201 Intereses Ganados........... $500,000
DEBE: 42101 Result. Venta Bienes Uso.... $500,000
HABER: 31501 Resultado del Ejercicio.... $12,000,000

Luego se cierra contra egresos para obtener resultado neto
```

---

### 10. Estado de Resultados

**Presentación:**
```
INGRESOS ORDINARIOS
Ventas Netas                      $9,000,000
Servicios Prestados               $2,000,000
Otros Ingresos Operativos           $500,000
Resultados por Tenencia             $300,000
Subtotal Ordinarios              $11,800,000

INGRESOS EXTRAORDINARIOS
Venta de Bienes de Uso              $100,000
Recupero de Previsiones             $350,000
Otros Extraordinarios               $150,000
Subtotal Extraordinarios            $600,000

TOTAL INGRESOS                   $12,400,000
```

---

## RESUMEN POR RUBRO

**41100 - VENTAS (6 cuentas):**
- Actividad principal de la empresa
- 3 cuentas regularizadoras (devoluciones, bonificaciones, descuentos)

**41200 - OTROS INGRESOS OPERATIVOS (6 cuentas):**
- Ingresos secundarios pero recurrentes
- Complementan la actividad principal

**41300 - RESULTADOS POR TENENCIA (2 cuentas):**
- Diferencias de cambio
- Ajuste por inflación (REI)

**42100 - RESULTADOS EXTRAORDINARIOS (4 cuentas):**
- Eventos atípicos y no recurrentes
- No forman parte de la operación normal

---

## CHECKLIST MENSUAL - INGRESOS

-  Registrar todas las ventas con factura
-  Verificar IVA separado del ingreso
-  Registrar devoluciones con Notas de Crédito
-  Devengar servicios en curso
-  Registrar intereses devengados
-  Actualizar diferencias de cambio
-  Verificar anticipos de clientes pendientes
-  Conciliar ventas con stock
-  Analizar margen bruto
-  Comparar vs. presupuesto
-  Identificar ingresos extraordinarios
-  Documentar adecuadamente cada ingreso

---

## CASOS ESPECIALES

### 1. Ventas en Consignación

**No reconocer ingreso hasta que el consignatario venda:**

```
Envío en consignación (NO es venta):
DEBE: 11402 Mercaderías en Tránsito.... $100,000
HABER: 11401 Mercaderías............... $100,000

Cuando el consignatario vende:
DEBE: 11201 Deudores por Ventas........ $150,000
HABER: 41101 Ventas de Mercaderías..... $150,000
HABER: 21201 IVA Débito Fiscal......... $0 (liquidado por consignatario)

DEBE: 51101 Costo Mercaderías Vendidas. $100,000
HABER: 11402 Mercaderías en Tránsito... $100,000
```

---

### 2. Ventas con Cláusula de Retorno

**Si el cliente puede devolver sin costo:**
- No reconocer ingreso hasta vencimiento del plazo de devolución
- O reconocer con previsión por devoluciones estimadas

```
Venta $200,000 con derecho a devolución 30 días
Estimación: 10% de devoluciones

DEBE: 11201 Deudores por Ventas........ $242,000
HABER: 41101 Ventas de Mercaderías..... $200,000
HABER: 21201 IVA Débito Fiscal......... $42,000

Previsión:
DEBE: 41104 Devoluciones de Ventas..... $20,000
HABER: 21501 Anticipos de Clientes..... $20,000
```

---

### 3. Servicios de Larga Duración

**Método del porcentaje de avance:**

```
Contrato de construcción $1,000,000
Duración: 12 meses
Avance mes 1: 15%
Ingreso a reconocer: $150,000

DEBE: 11201 Deudores por Ventas........ $181,500
HABER: 41103 Servicios Prestados....... $150,000
HABER: 21201 IVA Débito Fiscal......... $31,500

Costos incurridos mes 1: $90,000
DEBE: 51103 Costo Servicios Prestados.. $90,000
HABER: (diversas cuentas de gastos).... $90,000
```

---

### 4. Canjes y Permutas

**Venta de mercadería por activo:**

```
Permuta: Mercadería ($80,000) por Rodado (valor $100,000)
Diferencia a favor: $20,000

DEBE: 12106 Rodados.................... $100,000
HABER: 41101 Ventas de Mercaderías..... $80,000
HABER: 41202 Descuentos Obtenidos...... $20,000

DEBE: 51101 Costo Mercaderías Vendidas. $50,000
HABER: 11401 Mercaderías............... $50,000
```

---

### 5. Venta con Instalación

**Ingresos separables:**

```
Venta de equipo $500,000 + Instalación $100,000

Al vender:
DEBE: 11201 Deudores por Ventas........ $726,000
HABER: 41102 Ventas Productos Manufact. $500,000
HABER: 21501 Anticipos de Clientes..... $100,000
HABER: 21201 IVA Débito Fiscal......... $126,000

Al instalar:
DEBE: 21501 Anticipos de Clientes..... $100,000
HABER: 41103 Servicios Prestados...... $100,000
```

---

### 6. Ventas con Garantía Extendida

**Separar precio de venta y garantía:**

```
Venta $100,000 + Garantía extendida $20,000

DEBE: 11201 Deudores por Ventas........ $145,200
HABER: 41101 Ventas de Mercaderías..... $100,000
HABER: 21501 Anticipos de Clientes..... $20,000
HABER: 21201 IVA Débito Fiscal......... $25,200

Devengar garantía proporcionalmente durante período de cobertura
```

---

### 7. Descuentos por Volumen Retrospectivos

**Cliente alcanza volumen que genera descuento retroactivo:**

```
Cliente compró $1,000,000 en el trimestre
Al llegar a ese monto, descuento 5% retroactivo
Descuento: $50,000

DEBE: 41105 Bonificaciones sobre Ventas $50,000
DEBE: 21201 IVA Débito Fiscal.......... $10,500
HABER: 11201 Deudores por Ventas....... $60,500
```

---

### 8. Ingresos en Moneda Extranjera

**Registrar al tipo de cambio del día:**

```
Venta USD 10,000 (TC $1,000)
Valor en pesos: $10,000,000

DEBE: 11201 Deudores por Ventas ME..... $10,000,000
HABER: 41101 Ventas de Mercaderías..... $10,000,000

Al cobro (TC $1,100):
DEBE: 11103 Banco Cta. Cte............. $11,000,000
HABER: 11201 Deudores por Ventas ME.... $10,000,000
HABER: 41301 Diferencias Cambio Posit.. $1,000,000
```

---

### 9. Ingresos por Suscripciones

**Devengar proporcionalmente:**

```
Suscripción anual cobrada adelantado $120,000

DEBE: 11103 Banco Cta. Cte............. $145,200
HABER: 21501 Anticipos de Clientes..... $120,000
HABER: 21201 IVA Débito Fiscal......... $25,200

Devengo mensual ($10,000):
DEBE: 21501 Anticipos de Clientes..... $10,000
HABER: 41103 Servicios Prestados...... $10,000
```

---

### 10. Ingresos por Franquicias

**Canon inicial + regalías:**

```
Canon inicial $500,000 (reconocer al inicio)
DEBE: 11103 Banco Cta. Cte............. $605,000
HABER: 41205 Regalías Ganadas.......... $500,000
HABER: 21201 IVA Débito Fiscal......... $105,000

Regalía mensual 5% sobre ventas del franquiciado
Ventas mes: $200,000
Regalía: $10,000

DEBE: 11201 Deudores por Ventas........ $12,100
HABER: 41205 Regalías Ganadas.......... $10,000
HABER: 21201 IVA Débito Fiscal......... $2,100
```

---

## ASPECTOS IMPOSITIVOS

### 1. Impuesto a las Ganancias

**Ingresos gravados:**
- Ventas de mercaderías
- Servicios prestados
- Intereses ganados
- Alquileres ganados
- Resultado por venta de bienes de uso
- Diferencias de cambio

**Exenciones:**
- Algunos intereses de títulos públicos
- Ciertas indemnizaciones
- Donaciones (no son ganancia)

---

### 2. IVA

**Alícuota general: 21%**
- Ventas de bienes
- Servicios generales
- Alquileres comerciales

**Alícuota reducida: 10.5%**
- Ciertos servicios profesionales
- Algunos alimentos básicos
- Medicina prepaga

**Exento:**
- Servicios educativos
- Servicios de salud (algunos)
- Venta de inmuebles usados

**No gravado:**
- Exportaciones
- Algunas operaciones financieras

---

### 3. Ingresos Brutos

**Base:** Ingresos totales (generalmente)
**Alícuota:** Varía según provincia y actividad (1% a 5%)
**Tratamiento:** Se imputa como gasto

```
Ventas del mes $1,000,000
Alícuota IIBB: 3%
Impuesto: $30,000

DEBE: 53503 Ingresos Brutos............ $30,000
HABER: 21204 Ingresos Brutos a Pagar.. $30,000
```

---

## CONTROL INTERNO DE INGRESOS

### 1. Segregación de Funciones

**Separar:**
- Quien vende (vendedor)
- Quien factura (administración)
- Quien cobra (tesorería)
- Quien registra (contabilidad)

---

### 2. Documentación

**Obligatoria:**
- Factura o documento equivalente
- Remito (si entrega posterior)
- Orden de compra (si aplica)
- Comprobante de pago

---

### 3. Autorización

**Niveles de autorización:**
- Ventas normales: vendedor
- Descuentos especiales: gerente comercial
- Condiciones de pago excepcionales: gerencia general
- Ventas importantes: directorio

---

### 4. Verificaciones

**Diarias:**
- Conciliar ventas vs. cobranzas
- Verificar facturación completa
- Controlar stock vs. ventas

**Mensuales:**
- Análisis de margen bruto
- Comparación vs. presupuesto
- Análisis de clientes morosos
- Revisión de devoluciones

---

### 5. Indicadores de Alerta

**Revisar si:**
- Aumento de devoluciones (> 5%)
- Caída brusca de margen bruto
- Incremento de descuentos otorgados
- Aumento de clientes morosos
- Ventas sin documentación
- Diferencias inventario vs. registros

---

## COMPARACIÓN INTERNACIONAL

### NIIF (Normas Internacionales)

**NIIF 15 - Ingresos de Actividades Ordinarias:**

**5 pasos para reconocimiento:**
1. Identificar el contrato con el cliente
2. Identificar obligaciones de desempeño
3. Determinar precio de transacción
4. Asignar precio a obligaciones
5. Reconocer ingreso al cumplir obligación

**Diferencias con práctica argentina simplificada:**
- Mayor énfasis en análisis por componente
- Reconocimiento más detallado en contratos complejos
- Disclosure más extenso

---

## CASOS PRÁCTICOS INTEGRADOS

### Caso 1: Empresa Comercial

```
Mes de actividad:
- Compras: $600,000 + IVA
- Ventas: $1,000,000 + IVA
- Devoluciones: $50,000 + IVA
- Descuentos otorgados: $30,000 + IVA
- Gastos operativos: $200,000

Cálculo:
Ventas Netas: $1,000,000 - $50,000 - $30,000 = $920,000
Costo (60%): $552,000
Margen Bruto: $368,000 (40%)
Gastos Operativos: $200,000
Resultado: $168,000
```

---

### Caso 2: Empresa de Servicios

```
Mes de actividad:
- Servicios prestados: $500,000 + IVA
- Intereses ganados: $20,000
- Gastos operativos: $300,000
- Gastos financieros: $10,000

Resultado:
Ingresos totales: $520,000
Gastos totales: $310,000
Resultado: $210,000
```

---

### Caso 3: Empresa Industrial

```
Mes de actividad:
- Ventas de productos: $2,000,000 + IVA
- Costo de producción: $1,200,000
- Gastos de comercialización: $200,000
- Gastos de administración: $300,000
- Gastos financieros: $50,000

Resultado:
Ventas: $2,000,000
Costo de Ventas: $1,200,000
Margen Bruto: $800,000 (40%)
Gastos Operativos: $500,000
Resultado Operativo: $300,000
Gastos Financieros: $50,000
Resultado Neto: $250,000
```

---

## PROYECCIÓN DE INGRESOS

### Métodos de Proyección

**1. Histórico con tendencia:**
```
Ventas 2023: $10,000,000
Crecimiento estimado: 15%
Proyección 2024: $11,500,000
```

**2. Por unidades:**
```
Unidades estimadas: 50,000
Precio promedio: $200
Ventas proyectadas: $10,000,000
```

**3. Por participación de mercado:**
```
Mercado total: $500,000,000
Participación estimada: 2%
Ventas proyectadas: $10,000,000
```

---

## MEJORES PRÁCTICAS

1. **Reconocer ingresos conservadoramente** (cuando hay certeza)
2. **Documentar todas las operaciones** (factura, remito, pago)
3. **Separar IVA del ingreso** (siempre)
4. **Analizar margen bruto mensualmente**
5. **Devengar proporcionalmente** (servicios largos)
6. **Controlar devoluciones** (analizar causas)
7. **Mantener precios actualizados**
8. **Segmentar por línea de producto**
9. **Comparar vs. presupuesto**
10. **Proyectar flujos futuros**

---

# Manual de Cuentas - Egresos

## 5. EGRESOS

Comprende todas las disminuciones en los beneficios económicos durante el ejercicio, en forma de salidas o disminuciones del valor de los activos, o incrementos de los pasivos, que resultan en disminuciones del patrimonio neto (distintos de distribuciones a los propietarios).

**Importante:** En este sistema, las cuentas de Egresos tienen naturaleza DEUDORA.

---

## 5.1 COSTO DE VENTAS (51XXX)

Representa el costo de adquisición o producción de los bienes vendidos o servicios prestados.

---

## 51100 - COSTO DE MERCADERÍAS Y SERVICIOS

### 51101 - Costo de Mercaderías Vendidas
**Descripción:** Registra el costo de las mercaderías vendidas (empresas comerciales).

**Se debita por:**
- Costo de mercaderías al momento de la venta

**Se acredita por:**
- Devoluciones de clientes (reingreso al stock)
- Cierre del ejercicio

**Ejemplo práctico:**
```
Venta de mercaderías $100,000
Costo de las mercaderías vendidas: $60,000

Venta:
DEBE: 11201 Deudores por Ventas........ $121,000
HABER: 41101 Ventas de Mercaderías..... $100,000
HABER: 21201 IVA Débito Fiscal......... $21,000

Costo:
DEBE: 51101 Costo Mercaderías Vendidas. $60,000
HABER: 11401 Mercaderías............... $60,000

Devolución posterior ($10,000 venta, costo $6,000):
DEBE: 41104 Devoluciones de Ventas..... $10,000
HABER: 11201 Deudores por Ventas....... $10,000

Reingreso al stock:
DEBE: 11401 Mercaderías................ $6,000
HABER: 51101 Costo Mercaderías Vendidas $6,000
```

**Observaciones:**
- Se registra simultáneamente con la venta
- Método de valuación: FIFO, PPP (Precio Promedio Ponderado)
- Control permanente o periódico de inventario
- Afecta directamente el margen bruto
- Fórmula: Margen Bruto = Ventas - Costo de Ventas

---

### 51102 - Costo de Productos Manufacturados Vendidos
**Descripción:** Registra el costo de producción de los productos fabricados y vendidos.

**Se debita por:**
- Costo de productos terminados al momento de venta

**Se acredita por:**
- Devoluciones de productos
- Cierre del ejercicio

**Ejemplo práctico:**
```
Venta de productos manufacturados $200,000
Costo de producción: $120,000

Venta:
DEBE: 11201 Deudores por Ventas........ $242,000
HABER: 41102 Ventas Productos Manufact. $200,000
HABER: 21201 IVA Débito Fiscal......... $42,000

Costo:
DEBE: 51102 Costo Productos Vendidos... $120,000
HABER: 11406 Productos Terminados...... $120,000
```

**Observaciones:**
- Incluye: materias primas + mano de obra directa + gastos de fabricación
- Requiere sistema de costos
- Diferente de 51101 (productos fabricados vs. comprados)
- Control de costos estándar vs. reales

**Composición del costo:**
```
Materias Primas:        $60,000 (50%)
Mano de Obra Directa:   $36,000 (30%)
Gastos de Fabricación:  $24,000 (20%)
Total Costo Producción: $120,000
```

---

### 51103 - Costo de Servicios Prestados
**Descripción:** Registra el costo de los servicios facturados a clientes.

**Se debita por:**
- Costos incurridos en prestación de servicios

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Servicio de consultoría facturado $80,000
Costos del servicio:
- Honorarios profesionales: $30,000
- Materiales utilizados: $10,000
- Gastos de viaje: $5,000
Total costo: $45,000

DEBE: 51103 Costo Servicios Prestados.. $45,000
HABER: 53201 Honorarios Profesionales.. $30,000
HABER: 11404 Materiales................ $10,000
HABER: 53804 Gastos de Movilidad....... $5,000
```

**Observaciones:**
- Incluye costos directos atribuibles al servicio
- Puede ser difícil de medir (requiere control de horas)
- No incluye gastos generales (van en gastos operativos)
- Margen = Servicios - Costo Servicios

---

## 5.2 GASTOS DE COMERCIALIZACIÓN (52XXX)

Comprende los gastos relacionados con la venta y distribución de productos/servicios.

---

## 52100 - GASTOS DE VENTAS

### 52101 - Sueldos y Jornales Ventas
**Descripción:** Registra las remuneraciones del personal del área comercial y ventas.

**Se debita por:**
- Liquidación de sueldos del área ventas
- Comisiones de vendedores

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Liquidación mensual área ventas:
- 5 vendedores a $60,000 c/u: $300,000
- Comisiones: $50,000
Total: $350,000

DEBE: 52101 Sueldos Jornales Ventas.... $350,000
HABER: 21301 Sueldos a Pagar........... $250,000
HABER: 21302 Cargas Sociales a Pagar... $87,500
HABER: 21304 Retenciones a Depositar... $12,500
```

**Observaciones:**
- Incluye: sueldos base, comisiones, premios
- Separar de sueldos administrativos para análisis
- Control por vendedor (análisis productividad)
- Incluir cargas sociales en 52102

---

### 52102 - Cargas Sociales Ventas
**Descripción:** Registra las contribuciones patronales sobre sueldos del área ventas.

**Se debita por:**
- Cargas sociales sobre sueldos de ventas

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Sueldos ventas: $350,000
Cargas sociales (25%): $87,500

DEBE: 52102 Cargas Sociales Ventas..... $87,500
HABER: 21302 Cargas Sociales a Pagar... $87,500
```

**Observaciones:**
- Porcentaje típico: 23-27% según actividad
- Incluye: aportes patronales, obra social, ART, etc.

---

### 52103 - Comisiones sobre Ventas
**Descripción:** Registra comisiones pagadas a vendedores, representantes o agentes externos.

**Se debita por:**
- Comisiones devengadas sobre ventas

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Ventas del mes: $1,000,000
Comisión vendedores 3%: $30,000

DEBE: 52103 Comisiones sobre Ventas.... $30,000
HABER: 21301 Sueldos a Pagar........... $30,000

Comisión agente externo $50,000:
DEBE: 52103 Comisiones sobre Ventas.... $50,000
HABER: 21104 Acreedores Varios......... $50,000
```

**Observaciones:**
- Variable según ventas realizadas
- Base: ventas brutas, netas o cobradas
- Puede incluir retención de Ganancias

---

### 52104 - Publicidad y Propaganda
**Descripción:** Registra gastos de marketing, publicidad y promoción.

**Se debita por:**
- Campañas publicitarias
- Publicidad en medios
- Material promocional

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Campaña publicitaria:
- Publicidad en Google Ads: $80,000
- Diseño gráfico: $20,000
- Material POP: $30,000
Total: $130,000

DEBE: 52104 Publicidad y Propaganda.... $130,000
HABER: 11103 Banco Cta. Cte............ $130,000
```

**Observaciones:**
- Puede ser significativo en empresas comerciales
- Analizar ROI (retorno sobre inversión publicitaria)
- Incluye: redes sociales, Google, TV, radio, gráfica
- Deducible impositivamente

---

### 52105 - Fletes y Acarreos
**Descripción:** Registra costos de transporte de mercaderías a clientes.

**Se debita por:**
- Fletes de distribución
- Gastos de envío a clientes

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Transporte de mercaderías a clientes:
- Flete nacional: $50,000
- Embalaje: $10,000
Total: $60,000

DEBE: 52105 Fletes y Acarreos.......... $60,000
HABER: 21101 Proveedores............... $60,000
```

**Observaciones:**
- Solo fletes de venta (distribución)
- Fletes de compra van al costo de la mercadería
- Puede facturarse separado al cliente (no es gasto entonces)

---

### 52106 - Gastos de Distribución
**Descripción:** Registra gastos relacionados con almacenamiento y distribución de productos.

**Se debita por:**
- Alquiler de depósitos
- Gastos de almacenaje
- Mantenimiento de vehículos de reparto

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Gastos mensuales de distribución:
- Alquiler depósito: $40,000
- Combustible vehículos: $30,000
- Mantenimiento vehículos: $15,000
Total: $85,000

DEBE: 52106 Gastos de Distribución..... $85,000
HABER: (diversas cuentas).............. $85,000
```

**Observaciones:**
- Incluye toda la logística de salida
- Separar de gastos administrativos

---

### 52107 - Gastos de Representación
**Descripción:** Registra gastos de atención a clientes, eventos comerciales, etc.

**Se debita por:**
- Atención a clientes
- Eventos comerciales
- Obsequios a clientes

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Cena con clientes: $25,000
Obsequios navideños: $15,000
Total: $40,000

DEBE: 52107 Gastos de Representación.. $40,000
HABER: 11103 Banco Cta. Cte........... $40,000
```

**Observaciones:**
- Deducibilidad limitada impositivamente
- Mantener documentación de propósito comercial
- No confundir con viáticos

---

## 5.3 GASTOS DE ADMINISTRACIÓN (53XXX)

Comprende los gastos generales de funcionamiento de la empresa.

---

## 53100 - GASTOS DE PERSONAL

### 53101 - Sueldos y Jornales Administración
**Descripción:** Registra remuneraciones del personal administrativo.

**Se debita por:**
- Liquidación de sueldos administración

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Liquidación mensual:
- Gerente General: $150,000
- Contador: $80,000
- Administrativos (5): $50,000 c/u = $250,000
Total bruto: $480,000
Descuentos: $120,000
Neto a pagar: $360,000

DEBE: 53101 Sueldos Administración...... $480,000
HABER: 21301 Sueldos a Pagar........... $360,000
HABER: 21302 Cargas Sociales a Pagar... $120,000
```

**Observaciones:**
- Incluye todo el personal no productivo ni de ventas
- Cargas sociales van en 53102
- Provisionar SAC y vacaciones

---

### 53102 - Cargas Sociales Administración
**Descripción:** Contribuciones patronales sobre sueldos administrativos.

**Se debita por:**
- Cargas sociales devengadas

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Sueldos administración: $480,000
Cargas sociales (25%): $120,000

DEBE: 53102 Cargas Sociales Administr.. $120,000
HABER: 21302 Cargas Sociales a Pagar... $120,000
```

---

### 53103 - Indemnizaciones
**Descripción:** Registra indemnizaciones por despido.

**Se debita por:**
- Pago de indemnizaciones

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Despido de empleado:
Antigüedad: 5 años
Mejor sueldo: $80,000
Indemnización: $400,000

DEBE: 53103 Indemnizaciones............ $400,000
HABER: 11103 Banco Cta. Cte........... $400,000

Si había previsión:
DEBE: 22202 Previsión Indemnizaciones. $300,000
DEBE: 53103 Indemnizaciones............ $100,000
HABER: 11103 Banco Cta. Cte........... $400,000
```

**Observaciones:**
- Deducible impositivamente
- Puede generarse previsión anticipada
- Incluye: preaviso, antigüedad, SAC proporcional, vacaciones

---

### 53104 - Capacitación Personal
**Descripción:** Gastos de formación y capacitación del personal.

**Se debita por:**
- Cursos, seminarios, capacitaciones

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Curso de capacitación para personal:
Costo: $50,000

DEBE: 53104 Capacitación Personal...... $50,000
HABER: 11103 Banco Cta. Cte........... $50,000
```

**Observaciones:**
- Inversión en el personal
- Deducible impositivamente
- Mejora productividad

---

### 53105 - Ropa de Trabajo
**Descripción:** Uniformes y elementos de protección personal.

**Se debita por:**
- Compra de uniformes, EPP

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Compra de uniformes: $30,000

DEBE: 53105 Ropa de Trabajo............ $30,000
HABER: 21101 Proveedores............... $30,000
```

**Observaciones:**
- Obligatorio en muchas actividades
- Deducible impositivamente

---

### 53106 - Medicina Laboral
**Descripción:** Exámenes médicos laborales, servicio médico en planta.

**Se debita por:**
- Exámenes preocupacionales
- Exámenes periódicos
- Servicio médico

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Exámenes médicos anuales: $40,000

DEBE: 53106 Medicina Laboral........... $40,000
HABER: 21104 Acreedores Varios......... $40,000
```

**Observaciones:**
- Obligatorio por ley
- Deducible

---

## 53200 - SERVICIOS Y HONORARIOS

### 53201 - Honorarios Profesionales
**Descripción:** Honorarios de contadores, abogados, consultores, etc.

**Se debita por:**
- Honorarios devengados

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Honorarios mensuales:
- Contador: $80,000
- Abogado: $50,000
Total: $130,000

DEBE: 53201 Honorarios Profesionales... $130,000
HABER: 21104 Acreedores Varios......... $130,000
```

**Observaciones:**
- Retención de Ganancias e IVA
- Separar de sueldos (relación de dependencia vs. autónomos)
- Deducible impositivamente

---

### 53202 - Honorarios Directorio
**Descripción:** Honorarios de directores y síndicos (SA).

**Se debita por:**
- Honorarios asignados por asamblea

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Asamblea asigna honorarios directorio: $300,000

DEBE: 53202 Honorarios Directorio...... $300,000
HABER: 21503 Honorarios Directorio a Pagar $300,000
```

**Observaciones:**
- Requiere aprobación de asamblea
- Retención de Ganancias
- Limitaciones según utilidades

---

### 53203 - Servicios de Limpieza
**Descripción:** Servicios de limpieza e higiene de las instalaciones.

**Se debita por:**
- Servicios de limpieza

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Servicio mensual de limpieza: $40,000

DEBE: 53203 Servicios de Limpieza...... $40,000
HABER: 21104 Acreedores Varios......... $40,000
```

---

### 53204 - Servicios de Vigilancia
**Descripción:** Servicios de seguridad y vigilancia.

**Se debita por:**
- Servicios de seguridad

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Servicio de vigilancia mensual: $60,000

DEBE: 53204 Servicios de Vigilancia.... $60,000
HABER: 21104 Acreedores Varios......... $60,000
```

---

### 53205 - Servicios de Mantenimiento
**Descripción:** Reparaciones y mantenimiento de instalaciones y equipos.

**Se debita por:**
- Mantenimiento preventivo/correctivo

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Mantenimiento de equipos: $35,000

DEBE: 53205 Servicios de Mantenimiento. $35,000
HABER: 21104 Acreedores Varios......... $35,000
```

**Observaciones:**
- Solo mantenimiento ordinario (no mejoras)
- Mejoras se capitalizan en el activo

---

## 53300 - SERVICIOS PÚBLICOS Y COMUNICACIONES

### 53301 - Energía Eléctrica
**Descripción:** Consumo de energía eléctrica.

**Se debita por:**
- Facturas de electricidad

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Factura mensual luz: $50,000 + IVA

DEBE: 53301 Energía Eléctrica.......... $50,000
DEBE: 11305 IVA Crédito Fiscal......... $10,500
HABER: 21104 Acreedores Varios......... $60,500
```

---

### 53302 - Gas
**Descripción:** Consumo de gas natural o envasado.

---

### 53303 - Agua
**Descripción:** Consumo de agua.

---

### 53304 - Teléfono
**Descripción:** Servicios de telefonía fija.

---

### 53305 - Internet
**Descripción:** Servicios de internet y conectividad.

---

### 53306 - Servicio de Correo
**Descripción:** Servicios postales y mensajería.

---

## 53400 - ALQUILERES Y ARRENDAMIENTOS

### 53401 - Alquileres de Inmuebles
**Descripción:** Alquiler de oficinas, depósitos, locales.

**Se debita por:**
- Alquileres devengados

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Alquiler mensual oficina: $100,000 + IVA

DEBE: 53401 Alquileres de Inmuebles.... $100,000
DEBE: 11305 IVA Crédito Fiscal......... $21,000
HABER: 21104 Acreedores Varios......... $121,000
```

**Observaciones:**
- Deducible impositivamente
- Retención de Ganancias al propietario
- IVA 21%

---

### 53402 - Alquileres de Equipos
**Descripción:** Alquiler de maquinarias, equipos, vehículos.

---

### 53403 - Leasing
**Descripción:** Cuotas de leasing (arrendamiento financiero).

**Ejemplo práctico:**
```
Cuota mensual leasing vehículo: $25,000

DEBE: 53403 Leasing.................... $25,000
HABER: 11103 Banco Cta. Cte........... $25,000
```

**Observaciones:**
- Tratamiento especial (puede ser operativo o financiero)
- Deducible impositivamente

---

## 53500 - IMPUESTOS Y TASAS

### 53501 - Impuesto Inmobiliario
**Descripción:** Impuesto sobre inmuebles propios.

---

### 53502 - Impuesto a los Débitos y Créditos
**Descripción:** Impuesto al cheque (0.6% por movimiento bancario).

**Ejemplo práctico:**
```
Débito bancario genera impuesto $6,000

DEBE: 53502 Imp. Débitos y Créditos... $6,000
HABER: 11103 Banco Cta. Cte........... $6,000
```

**Observaciones:**
- Deducible de Ganancias
- Puede computarse como pago a cuenta

---

### 53503 - Ingresos Brutos
**Descripción:** Impuesto provincial sobre ingresos.

**Ejemplo práctico:**
```
Ventas $1,000,000
Alícuota 3%: $30,000

DEBE: 53503 Ingresos Brutos............ $30,000
HABER: 21204 Ingresos Brutos a Pagar.. $30,000
```

---

### 53504 - Tasas Municipales
**Descripción:** Tasas municipales (ABL, seguridad e higiene, etc.).

---

### 53505 - Otros Impuestos
**Descripción:** Otros impuestos no clasificados.

---

## 53600 - SEGUROS

### 53601 - Seguros sobre Bienes de Uso
**Descripción:** Seguros de incendio, robo, todo riesgo sobre activos fijos.

**Ejemplo práctico:**
```
Seguro anual edificio $120,000

Si se paga todo adelantado:
DEBE: 11309 Gastos Pagados Adelantado. $120,000
HABER: 11103 Banco Cta. Cte........... $120,000

Devengo mensual:
DEBE: 53601 Seguros Bienes de Uso..... $10,000
HABER: 11309 Gastos Pagados Adelantado $10,000
```

---

### 53602 - Seguros sobre Mercaderías
**Descripción:** Seguros sobre stock de mercaderías.

---

### 53603 - Seguros de Responsabilidad Civil
**Descripción:** Seguros de responsabilidad civil profesional o empresarial.

---

### 53604 - Seguros de Vida Obligatorio (ART)
**Descripción:** Aseguradora de Riesgos del Trabajo.

**Ejemplo práctico:**
```
ART mensual $45,000

DEBE: 53604 Seguros Vida Obligatorio... $45,000
HABER: 21104 Acreedores Varios......... $45,000
```

**Observaciones:**
- Obligatorio
- Porcentaje sobre nómina salarial

---

## 53700 - DEPRECIACIONES Y AMORTIZACIONES

### 53701 - Depreciación Bienes de Uso
**Descripción:** Depreciación mensual de bienes de uso.

**Se debita por:**
- Depreciación calculada del período

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Depreciación mensual:
- Edificios: $2,000
- Maquinarias: $5,000
- Rodados: $8,000
- Equipos computación: $3,000
Total: $18,000

DEBE: 53701 Depreciación Bienes de Uso $18,000
HABER: 12201 Deprec. Acum. Edificios.. $2,000
HABER: 12203 Deprec. Acum. Maquinarias $5,000
HABER: 12205 Deprec. Acum. Rodados.... $8,000
HABER: 12207 Deprec. Acum. Eq. Comput. $3,000
```

**Observaciones:**
- No genera salida de efectivo (gasto no erogable)
- Método líneal generalmente
- Registrar mensual o acumulado al cierre

---

### 53702 - Amortización Activos Intangibles
**Descripción:** Amortización de intangibles (software, marcas, etc.).

**Ejemplo práctico:**
```
Amortización mensual:
- Software: $10,000
- Marcas: $2,000
Total: $12,000

DEBE: 53702 Amortización Intangibles... $12,000
HABER: 12404 Amort. Acum. Software..... $10,000
HABER: 12401 Amort. Acum. Marcas....... $2,000
```

---

## 53800 - GASTOS GENERALES

### 53801 - Papelería y Útiles
**Descripción:** Materiales de oficina, papelería, útiles.

---

### 53802 - Impresos y Formularios
**Descripción:** Facturas, remitos, otros impresos.

---

### 53803 - Artículos de Limpieza
**Descripción:** Productos de limpieza e higiene.

---

### 53804 - Gastos de Movilidad
**Descripción:** Viáticos, pasajes, combustible para viajes de trabajo.

**Ejemplo práctico:**
```
Viaje de trabajo:
- Pasajes: $15,000
- Hotel: $20,000
- Comidas: $8,000
Total: $43,000

DEBE: 53804 Gastos de Movilidad....... $43,000
HABER: 11103 Banco Cta. Cte........... $43,000
```

---

### 53805 - Gastos de Representación
**Descripción:** Gastos de representación administrativa (diferente de ventas).

---

### 53806 - Refrigerios y Cafetería
**Descripción:** Café, refrigerios para personal y reuniones.

---

### 53807 - Suscripciones y Publicaciones
**Descripción:** Revistas especializadas, software subscriptions, etc.

---

## 53900 - OTROS GASTOS ADMINISTRATIVOS

### 53901 - Gastos Bancarios
**Descripción:** Mantenimiento de cuentas, emisión de chequeras, etc.

**Ejemplo práctico:**
```
Mantenimiento cuenta bancaria: $5,000

DEBE: 53901 Gastos Bancarios........... $5,000
HABER: 11103 Banco Cta. Cte........... $5,000
```

**Observaciones:**
- Diferente de comisiones bancarias (54102) e intereses (54101)

---

### 53902 - Gastos de Cobranza
**Descripción:** Gastos de gestión de cobranza.

---

### 53903 - Deudores Incobrables
**Descripción:** Castigo de créditos incobrables o constitución de previsión.

**Ejemplo práctico:**
```
Constitución previsión 5% sobre deudores $500,000

DEBE: 53903 Deudores Incobrables....... $25,000
HABER: 11206 Previsión Incobrables..... $25,000

Castigo definitivo de deudor:
DEBE: 11206 Previsión Incobrables..... $10,000
HABER: 11201 Deudores por Ventas...... $10,000
```

---

### 53904 - Donaciones
**Descripción:** Donaciones realizadas por la empresa.

**Ejemplo práctico:**
```
Donación a institución benéfica: $50,000

DEBE: 53904 Donaciones................ $50,000
HABER: 11103 Banco Cta. Cte........... $50,000
```

**Observaciones:**

- Deducibilidad limitada impositivamente
- Requiere documentación y certificado del donat

**Observaciones:**
- Deducibilidad limitada impositivamente
- Requiere documentación y certificado del donatario
- Puede ser en efectivo o en especie

---

## 5.4 GASTOS FINANCIEROS (54XXX)

Comprende los costos financieros de la empresa.

---

## 54100 - RESULTADOS FINANCIEROS

### 54101 - Intereses Pagados
**Descripción:** Intereses por préstamos, descubiertos, financiaciones.

**Se debita por:**
- Intereses devengados o pagados

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Préstamo bancario $1,000,000
Tasa: 18% anual
Interés mensual: $15,000

DEBE: 54101 Intereses Pagados.......... $15,000
HABER: 21404 Intereses a Pagar......... $15,000

O al pagar:
DEBE: 54101 Intereses Pagados.......... $15,000
HABER: 11103 Banco Cta. Cte............ $15,000
```

**Observaciones:**
- Devengar aunque no se paguen
- Deducible impositivamente
- Incluye: préstamos bancarios, ON, documentos a pagar
- No confundir con comisiones (54102)

---

### 54102 - Comisiones Bancarias
**Descripción:** Comisiones por servicios bancarios, tarjetas de crédito, etc.

**Se debita por:**
- Comisiones bancarias

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Comisión tarjeta de crédito 3% sobre $100,000

DEBE: 54102 Comisiones Bancarias....... $3,000
HABER: 11103 Banco Cta. Cte............ $3,000

Comisión por transferencia bancaria:
DEBE: 54102 Comisiones Bancarias....... $500
HABER: 11103 Banco Cta. Cte............ $500
```

**Observaciones:**
- Incluye: comisiones tarjetas, transferencias, etc.
- Diferente de gastos bancarios (53901)
- Deducible impositivamente

---

### 54103 - Gastos Bancarios
**Descripción:** Otros gastos bancarios no clasificados como comisiones.

**Observaciones:**
- Puede fusionarse con 54102
- Incluye: gastos administrativos bancarios

---

### 54104 - Diferencias de Cambio Negativas
**Descripción:** Pérdidas por variación del tipo de cambio.

**Se debita por:**
- Revaluación negativa de activos en ME
- Revaluación positiva de pasivos en ME

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Deudor en dólares: USD 10,000
TC al momento de venta: $1,100 = $11,000,000
TC al cobro: $1,000 = $10,000,000
Diferencia negativa: $1,000,000

DEBE: 11103 Banco Cta. Cte............. $10,000,000
DEBE: 54104 Diferencias Cambio Negat... $1,000,000
HABER: 11201 Deudores por Ventas....... $11,000,000

Pasivo en dólares: USD 5,000
TC al contraer deuda: $900 = $4,500,000
TC al pago: $1,100 = $5,500,000
Diferencia negativa: $1,000,000

DEBE: 21101 Proveedores................ $4,500,000
DEBE: 54104 Diferencias Cambio Negat... $1,000,000
HABER: 11103 Banco Cta. Cte............ $5,500,000
```

**Observaciones:**
- Resultado financiero por tenencia de ME
- Activo en ME baja → pérdida
- Pasivo en ME sube → pérdida
- Se devenga al cierre aunque no se realice

---

### 54105 - Resultado por Exposición a la Inflación (REI) Negativo
**Descripción:** Pérdidas por ajuste por inflación.

**Se debita por:**
- REI negativo del período

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Posición monetaria neta positiva en contexto inflacionario
(Más activos que pasivos monetarios)
Inflación del período: 25%
PMN: $5,000,000
REI negativo: $1,250,000

DEBE: 54105 REI Negativo............... $1,250,000
HABER: (diversas cuentas de activos)... $1,250,000
```

**Observaciones:**
- Solo aplica cuando hay ajuste por inflación
- PMN positiva → pérdida
- Complejo cálculo técnico

---

### 54106 - Descuentos Concedidos
**Descripción:** Descuentos financieros otorgados a clientes por pronto pago.

**Se debita por:**
- Descuentos financieros otorgados

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Cliente paga antes de plazo, descuento 5%
Deuda: $100,000
Descuento: $5,000
Cobra: $95,000

DEBE: 11103 Banco Cta. Cte............. $95,000
DEBE: 54106 Descuentos Concedidos...... $5,000
HABER: 11201 Deudores por Ventas....... $100,000
```

**Observaciones:**
- Costo financiero por acelerar cobranza
- Diferente de descuentos comerciales (41106)
- Analizar si conviene vs. costo del dinero

---

## 5.5 OTROS EGRESOS (55XXX)

Comprende egresos extraordinarios, no recurrentes.

---

## 55100 - EGRESOS EXTRAORDINARIOS

### 55101 - Baja de Bienes de Uso
**Descripción:** Pérdida por baja de bienes de uso obsoletos o inservibles.

**Se debita por:**
- Valor neto en libros de bien dado de baja

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Baja de maquinaria obsoleta sin valor de recupero:
Costo original: $300,000
Depreciación acumulada: $200,000
Valor neto en libros: $100,000

DEBE: 55101 Baja de Bienes de Uso...... $100,000
DEBE: 12203 Deprec. Acum. Maquinarias. $200,000
HABER: 12104 Maquinarias............... $300,000
```

**Observaciones:**
- Solo el valor neto es pérdida
- Diferente de venta (42101)
- Requiere autorización

---

### 55102 - Pérdidas Extraordinarias
**Descripción:** Pérdidas atípicas no clasificadas en otras cuentas.

**Se debita por:**
- Pérdidas extraordinarias

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Multa por incumplimiento contractual: $150,000

DEBE: 55102 Pérdidas Extraordinarias... $150,000
HABER: 11103 Banco Cta. Cte............ $150,000

Obsolescencia de stock:
DEBE: 55102 Pérdidas Extraordinarias... $80,000
HABER: 11401 Mercaderías............... $80,000
```

**Observaciones:**
- No es recurrente
- Analizar deducibilidad impositiva caso por caso

---

### 55103 - Siniestros
**Descripción:** Pérdidas por siniestros (incendios, robos, etc.) no cubiertas por seguro.

**Se debita por:**
- Pérdida no cubierta por seguro

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Incendio destruye mercaderías:
Valor de mercaderías: $500,000
Indemnización del seguro: $300,000
Pérdida neta: $200,000

DEBE: 11103 Banco Cta. Cte (seguro).... $300,000
DEBE: 55103 Siniestros................. $200,000
HABER: 11401 Mercaderías............... $500,000
```

**Observaciones:**
- Solo la parte no cubierta
- Si indemnización > valor: ingreso extraordinario
- Mantener documentación completa

---

### 55104 - Pérdidas por Juicios
**Descripción:** Pérdidas por sentencias judiciales adversas.

**Se debita por:**
- Sentencias perdidas o acuerdos

**Se acredita por:**
- Cierre del ejercicio

**Ejemplo práctico:**
```
Pérdida de juicio laboral:
Sentencia: $400,000
Previsión constituida: $350,000
Pérdida adicional: $50,000

DEBE: 22201 Previsión para Juicios..... $350,000
DEBE: 55104 Pérdidas por Juicios....... $50,000
HABER: 11103 Banco Cta. Cte............ $400,000
```

**Observaciones:**
- Deducible impositivamente al pagar
- Si hay previsión, usar primero la previsión

---

## OBSERVACIONES GENERALES DE EGRESOS

### 1. Clasificación de Gastos

**Por función:**
- Costo de Ventas (51XXX)
- Gastos de Comercialización (52XXX)
- Gastos de Administración (53XXX)
- Gastos Financieros (54XXX)
- Otros Egresos (55XXX)

**Por naturaleza:**
- Personal (sueldos, cargas sociales)
- Servicios (honorarios, mantenimiento)
- Servicios públicos (luz, agua, gas)
- Impuestos y tasas
- Depreciaciones y amortizaciones
- Financieros (intereses, comisiones)

---

### 2. Egresos vs. Pagos

```
EGRESO (devengamiento) ≠ PAGO (erogación)

Provisión de sueldo $100,000:
Egreso: se reconoce al devengar
Pago: se produce días/semanas después

DEBE: 53101 Sueldos Administración...... $100,000
HABER: 21301 Sueldos a Pagar........... $100,000

Pago posterior:
DEBE: 21301 Sueldos a Pagar........... $100,000
HABER: 11103 Banco Cta. Cte........... $100,000
```

---

### 3. Gastos vs. Inversiones

**GASTO (va a resultado):**
- Consumo del período
- No genera beneficios futuros
- Ejemplos: sueldos, luz, alquileres

**INVERSIÓN (va a activo):**
- Genera beneficios futuros
- Se deprecia/amortiza en el tiempo
- Ejemplos: maquinaria, software, edificio

```
Incorrecto:
Compra de computadora $50,000
DEBE: 53800 Gastos Generales........... $50,000
HABER: Banco........................... $50,000

Correcto:
DEBE: 12108 Equipos de Computación..... $50,000
HABER: 11103 Banco Cta. Cte............ $50,000

Luego depreciar en varios años
```

---

### 4. Gastos Erogables vs. No Erogables

**EROGABLES (generan salida de efectivo):**
- Sueldos
- Servicios
- Compras
- Impuestos (la mayoría)

**NO EROGABLES (no generan salida de efectivo):**
- Depreciaciones (53701)
- Amortizaciones (53702)
- Previsiones (cuando se constituyen)
- Ajustes por inflación

**Importancia:** Para calcular flujo de efectivo (EBITDA)

```
EBITDA = Resultado + Depreciaciones + Amortizaciones + Intereses + Impuestos
```

---

### 5. Análisis de Gastos

**Gastos Fijos:**
- No varían con el nivel de actividad
- Ejemplos: alquileres, sueldos administrativos, seguros

**Gastos Variables:**
- Varían con el nivel de actividad
- Ejemplos: comisiones, fletes, materias primas

**Gastos Semifijos:**
- Tienen componente fijo + variable
- Ejemplos: luz, teléfono, combustible

---

### 6. Punto de Equilibrio

```
Punto de Equilibrio = Gastos Fijos / (Precio Venta - Costo Variable Unitario)

Ejemplo:
Gastos Fijos mensuales: $500,000
Precio de venta unitario: $100
Costo variable unitario: $60
Margen de contribución: $40

PE = $500,000 / $40 = 12,500 unidades

Ventas necesarias: 12,500 × $100 = $1,250,000
```

---

### 7. Estructura de Costos

**Análisis típico de gastos:**
```
                              Monto        %
Costo de Ventas           $5,400,000    60%
Gastos de Comercialización  $900,000    10%
Gastos de Administración  $1,800,000    20%
Gastos Financieros          $450,000     5%
Otros Egresos               $450,000     5%
TOTAL EGRESOS            $9,000,000   100%

Ventas:                  $10,000,000
Resultado:                $1,000,000   10% margen
```

---

### 8. Deducibilidad Impositiva

**DEDUCIBLES (Impuesto a las Ganancias):**
- Sueldos y cargas sociales
- Honorarios profesionales
- Alquileres
- Servicios públicos
- Seguros
- Impuestos (excepto Ganancias)
- Intereses
- Depreciaciones y amortizaciones
- Gastos de cobranza

**NO DEDUCIBLES:**
- Impuesto a las Ganancias
- Multas y recargos
- Donaciones (limitadas)
- Gastos sin comprobante
- Gastos de representación (limitados)

**LIMITACIONES:**
- Donaciones: hasta 5% ganancia
- Ciertos gastos de representación
- Gastos con no inscriptos

---

### 9. IVA en Gastos

**Principio:** Los gastos se registran NETOS de IVA

```
Incorrecto:
DEBE: 53301 Energía Eléctrica.......... $60,500
HABER: Banco........................... $60,500

Correcto:
DEBE: 53301 Energía Eléctrica.......... $50,000
DEBE: 11305 IVA Crédito Fiscal......... $10,500
HABER: 11103 Banco Cta. Cte............ $60,500
```

**IVA no computable:**
- Gastos con no inscriptos
- Ciertos gastos de representación
- Uso personal

---

### 10. Control de Gastos

**Presupuesto vs. Real:**
```
                    Presupuesto    Real    Desvío    %
Sueldos              $500,000  $520,000  $20,000   4%
Servicios            $150,000  $145,000  ($5,000) -3%
Alquileres           $100,000  $100,000      $0    0%
Publicidad           $200,000  $250,000  $50,000  25%
Total              $950,000 $1,015,000  $65,000   7%
```

**Análisis:**
- Identificar desvíos significativos
- Investigar causas
- Tomar acciones correctivas

---

### 11. Cierre de Cuentas de Resultado

Al finalizar el ejercicio, todas las cuentas de egresos se cierran contra Resultado del Ejercicio:

```
Total egresos del año: $9,000,000

DEBE: 31501 Resultado del Ejercicio.... $9,000,000
HABER: 51101 Costo Mercaderías Vendidas $5,400,000
HABER: 52XXX Gastos de Comercialización  $900,000
HABER: 53XXX Gastos de Administración. $1,800,000
HABER: 54XXX Gastos Financieros........ $450,000
HABER: 55XXX Otros Egresos............. $450,000

Luego se cierra contra ingresos para obtener resultado neto
```

---

### 12. Estado de Resultados

**Presentación por función:**
```
INGRESOS
Ventas Netas                      $9,000,000

EGRESOS
Costo de Ventas                  ($5,400,000)
UTILIDAD BRUTA                    $3,600,000  40%

Gastos de Comercialización         ($900,000)
Gastos de Administración         ($1,800,000)
RESULTADO OPERATIVO                 $900,000  10%

Resultados Financieros
  Ingresos Financieros               $300,000
  Gastos Financieros                ($450,000)
RESULTADO ANTES DE IMP/EXT          $750,000

Otros Ingresos                       $600,000
Otros Egresos                       ($450,000)
RESULTADO DEL EJERCICIO            $900,000  10%
```

---

## CASOS ESPECIALES

### 1. Gastos Preoperativos

**Gastos antes de comenzar operaciones:**
```
Opción A: Capitalizar (12306 Gastos de Organización)
DEBE: 12306 Gastos de Organización..... $100,000
HABER: 11103 Banco Cta. Cte............ $100,000

Luego amortizar en 5 años

Opción B: Imputar a resultado directamente
DEBE: 53XXX Gastos Administración...... $100,000
HABER: 11103 Banco Cta. Cte............ $100,000
```

---

### 2. Gastos de Investigación y Desarrollo

**Investigación:** A resultado (gasto)
**Desarrollo:** Puede capitalizarse si cumple criterios

```
Investigación de mercado $50,000:
DEBE: 53201 Honorarios Profesionales... $50,000
HABER: 11103 Banco Cta. Cte............ $50,000

Desarrollo de producto (capitalizable) $200,000:
DEBE: 12307 Gastos de Desarrollo....... $200,000
HABER: 11103 Banco Cta. Cte............ $200,000
```

---

### 3. Gastos Compartidos (Prorrateo)

**Luz del edificio (40% ventas, 60% administración):**
```
Factura total: $50,000

DEBE: 52106 Gastos de Distribución..... $20,000
DEBE: 53301 Energía Eléctrica.......... $30,000
DEBE: 11305 IVA Crédito Fiscal......... $10,500
HABER: 11103 Banco Cta. Cte............ $60,500
```

---

### 4. Provisiones de Gastos

**Al cierre, provisionar gastos devengados no facturados:**

```
Luz del mes aún no facturada (estimado $50,000):
DEBE: 53301 Energía Eléctrica.......... $50,000
HABER: 21104 Acreedores Varios......... $50,000

Al recibir factura real $52,000:
DEBE: 21104 Acreedores Varios......... $50,000
DEBE: 53301 Energía Eléctrica.......... $2,000
DEBE: 11305 IVA Crédito Fiscal......... $10,920
HABER: 21104 Acreedores Varios......... $62,920
```

---

### 5. Gastos Anticipados

**Ya tratado en activos (11309), recordar:**
```
Seguro anual $120,000 pagado en enero:
DEBE: 11309 Gastos Pagados Adelantado. $120,000
HABER: 11103 Banco Cta. Cte............ $120,000

Devengo mensual:
DEBE: 53601 Seguros Bienes de Uso...... $10,000
HABER: 11309 Gastos Pagados Adelantado $10,000
```

---

## INDICADORES DE GESTIÓN

### 1. Eficiencia Operativa

**Ratio de Gastos Operativos:**
```
= (Gastos Comercialización + Gastos Administración) / Ventas

Objetivo: < 30%
```

**EBITDA Margin:**
```
= EBITDA / Ventas × 100

> 20%: Excelente
15-20%: Bueno
10-15%: Aceptable
< 10%: Bajo
```

---

### 2. Productividad del Personal

**Ventas por Empleado:**
```
= Ventas Totales / Cantidad de Empleados
```

**Costo de Personal / Ventas:**
```
= (Sueldos + Cargas Sociales) / Ventas × 100

Objetivo típico: 15-25%
```

---

### 3. Control Financiero

**Carga Financiera:**
```
= Gastos Financieros / Ventas × 100

< 5%: Baja
5-10%: Moderada
> 10%: Alta (revisar endeudamiento)
```

**Cobertura de Intereses:**
```
= EBITDA / Intereses Pagados

> 5: Excelente cobertura
3-5: Buena cobertura
< 3: Cobertura insuficiente
```

---

## MEJORES PRÁCTICAS

1. **Registrar todos los gastos** con comprobante válido
2. **Separar IVA del gasto** (siempre)
3. **Clasificar correctamente** por función y naturaleza
4. **Provisionar gastos devengados** al cierre
5. **Controlar presupuesto mensualmente**
6. **Analizar desvíos significativos**
7. **Buscar eficiencias** sin afectar calidad
8. **Negociar con proveedores** mejores condiciones
9. **Revisar gastos fijos** periódicamente
10. **Distinguir gastos de inversiones**

---

## CHECKLIST MENSUAL - EGRESOS

-  Registrar todas las compras y gastos
-  Verificar IVA crédito fiscal
-  Liquidar sueldos y cargas sociales
-  Registrar depreciaciones y amortizaciones
-  Provisionar gastos devengados no facturados
-  Devengar gastos pagados por adelantado
-  Analizar gastos vs. presupuesto
-  Identificar desvíos significativos
-  Calcular márgenes (bruto, operativo, neto)
-  Revisar eficiencia operativa
-  Controlar gastos extraordinarios
-  Documentar adecuadamente cada egreso

---

## RESUMEN POR RUBRO

**51XXX - COSTO DE VENTAS (3 cuentas):**
- Costo directo de lo vendido
- Afecta margen bruto

**52XXX - GASTOS DE COMERCIALIZACIÓN (7 cuentas):**
- Gastos de venta y distribución
- Variables con la actividad comercial

**53XXX - GASTOS DE ADMINISTRACIÓN (39 cuentas):**
- Gastos generales de funcionamiento
- Mayormente fijos

**54XXX - GASTOS FINANCIEROS (6 cuentas):**
- Costo del financiamiento
- Depende del nivel de endeudamiento

**55XXX - OTROS EGRESOS (4 cuentas):**
- Egresos extraordinarios
- No recurrentes

---

**FIN DEL MANUAL DE EGRESOS**

---

# CONCLUSIÓN DEL MANUAL DE CUENTAS COMPLETO

Has completado el **Manual de Cuentas** que incluye:

1. **Activo Corriente** (24 cuentas)
2. **Activo No Corriente** (36 cuentas)
3. **Pasivo Corriente** (25 cuentas)
4. **Pasivo No Corriente** (7 cuentas)
5. **Patrimonio Neto** (11 cuentas)
6. **Ingresos** (18 cuentas)
7. **Egresos** (70 cuentas)

**TOTAL: 189 cuentas detalladas**

Este manual proporciona una guía completa para el uso correcto del plan de cuentas, con ejemplos prácticos, observaciones importantes y mejores prácticas contables adaptadas a la normativa argentina.# Manual de Cuentas - Egresos
