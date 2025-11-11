# Manual de Cuentas Contables

## Metadatos del Documento
- **Sistema**: Mosaite
- **País**: Argentina
- **Normativa**: RT (Resoluciones Técnicas) argentinas
- **Estructura**: Plan de cuentas de 5 dígitos
- **Total de cuentas**: 189

---

## 1. ACTIVO (1XXXX)

### 1.1 ACTIVO CORRIENTE (11XXX)
**Definición**: Bienes y derechos convertibles en efectivo dentro de 12 meses.

#### 11100 - CAJA Y BANCOS

**11101 - Caja MN**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Efectivo en moneda nacional disponible en sede
- Debita: Cobros efectivo, retiros banco, ventas contado, ingresos varios
- Acredita: Pagos efectivo, depósitos bancarios, anticipos personal
- Observaciones: Arqueos periódicos, límite máximo por seguridad
- Ejemplo: Venta contado $50,000 → Debita Caja MN / Acredita Ventas

**11102 - Caja ME**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Efectivo en moneda extranjera (USD, EUR)
- Debita: Cobros ME, compra divisas, retiros cuentas ME
- Acredita: Pagos ME, venta divisas, depósitos ME
- Valuación: Tipo cambio vigente fecha transacción
- Ajuste: Diferencia cambio al cierre ejercicio

**11103 - Banco Cuenta Corriente**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Fondos en cuentas corrientes bancarias
- Debita: Depósitos, transferencias recibidas, cobros tarjeta débito, NC bancarias
- Acredita: Cheques emitidos, transferencias realizadas, débitos automáticos, comisiones
- Control: Conciliaciones bancarias mensuales

**11104 - Banco Caja de Ahorro**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Fondos en cajas de ahorro
- Característica: Menor movimiento, genera intereses
- Uso: Fondos de reserva

**11105 - Recaudaciones a Depositar**
- Tipo: Activo corriente (transitoria)
- Naturaleza: Deudora
- Descripción: Fondos cobrados pendientes de depósito
- Debita: Cobros efectivo/cheques no depositados
- Acredita: Depósito efectivo en banco
- Objetivo: Saldo cero una vez depositado

**11106 - Fondos Fijos**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Caja chica para gastos menores
- Debita: Constitución fondo, reposición
- Acredita: Reducción/eliminación fondo
- Característica: Monto constante, reposición periódica

#### 11200 - CRÉDITOS POR VENTAS

**11201 - Deudores por Ventas**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Importes adeudados por clientes (cuenta corriente)
- Debita: Ventas crédito, intereses saldos, ND clientes
- Acredita: Cobros, devoluciones, descuentos, NC, previsión incobrables
- Control: Submayores por cliente, antigüedad mensual
- Ejemplo: Venta crédito $150,000 → Debita Deudores / Acredita Ventas

**11202 - Documentos a Cobrar**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Pagarés, letras firmadas por clientes
- Debita: Recepción documentos, refinanciación deudas, intereses
- Acredita: Cobro vencimiento, descuento bancos, devolución rechazados
- Control: Custodiar físicamente, controlar vencimientos

**11203 - Tarjetas de Crédito a Cobrar**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Ventas con TC pendientes acreditación
- Plazo acreditación: 24-72 horas según tarjeta
- Registrar comisión: Al momento acreditación

**11204 - Cheques de Terceros en Cartera**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Cheques recibidos no depositados ni endosados
- Acredita: Depósito, endoso proveedores, rechazo
- Verificar: Fecha, importe, firma, datos librador

**11205 - Cheques Diferidos**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Cheques pago diferido (fecha posterior)
- Característica: No depositables antes fecha, mayor riesgo rechazo
- Posibilidad: Descuento en bancos (costo financiero)

**11206 - Previsión para Deudores Incobrables**
- Tipo: Activo corriente (REGULARIZADORA)
- Naturaleza: Acreedora (resta del activo)
- Descripción: Estimación pérdidas por incobrables
- Debita: Castigo deudores, reducción previsión
- Acredita: Constitución, aumento previsión
- Cálculo: Según análisis antigüedad deudas
- Ejemplo: Previsión 5% sobre $500,000 = $25,000

#### 11300 - OTROS CRÉDITOS

**11301 - Anticipos a Proveedores**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Pagos anticipados a proveedores
- Acredita: Recepción mercadería/servicio, devolución anticipo
- Observación: Es derecho no gasto

**11302 - Anticipos al Personal**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Adelantos sueldo a empleados
- Acredita: Descuento liquidación, devolución
- Documentar: Recibo firmado

**11303 - Deudores Varios**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Créditos no actividad principal
- Incluye: Préstamos terceros, venta bienes uso, reclamos

**11304 - Préstamos al Personal**
- Tipo: Activo corriente/no corriente
- Naturaleza: Deudora
- Descripción: Préstamos empleados en cuotas
- Formalizar: Acuerdo firmado con plan cuotas
- Reclasificar: Si plazo >12 meses → Largo plazo

**11305 - IVA Crédito Fiscal**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: IVA compras/gastos (crédito contra fisco)
- Debita: IVA compras, gastos, importaciones, percepciones, retenciones
- Acredita: Compensación con IVA Débito, saldo favor
- Requisito: Facturas legales, proveedor inscripto

**11306 - Percepciones de IVA**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Percepciones IVA sufridas en compras
- Función: Adelanto impuesto, compensación liquidación

**11307 - Retenciones de IVA**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Retenciones IVA sufridas como vendedor
- Requisito: Certificado retención del cliente

**11308 - Saldos a Favor Impositivos**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Saldos favor ante organismos fiscales
- Incluye: IVA, Ganancias, IIBB
- Opciones: Compensación, devolución, uso futuro

**11309 - Gastos Pagados por Adelantado**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Gastos pagados períodos futuros
- Ejemplos: Seguros, alquileres, suscripciones
- Tratamiento: Devengar proporcionalmente

#### 11400 - BIENES DE CAMBIO

**11401 - Mercaderías**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Existencias bienes para venta
- Debita: Compras, devoluciones clientes, sobrantes
- Acredita: Ventas (CMV), devoluciones proveedores, faltantes, mermas
- Valuación: FIFO, PPP (Precio Promedio Ponderado)
- Control: Inventarios físicos periódicos

**11402 - Mercaderías en Tránsito**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Mercaderías compradas no recibidas
- Acredita: Recepción (pasan a 11401)
- Importante: Compras importación

**11403 - Materias Primas**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Materiales para proceso productivo
- Acredita: Consumo producción, ventas MP, mermas

**11404 - Materiales**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Auxiliares producción (no parte directa producto)
- Incluye: Envases, etiquetas, insumos menores

**11405 - Productos en Proceso**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Productos en elaboración (no terminados)
- Debita: MP, MOD, gastos fabricación
- Acredita: Transferencia productos terminados

**11406 - Productos Terminados**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Productos fabricados listos venta
- Control: Inventarios físicos, análisis obsolescencia

**11407 - Previsión para Desvalorización**
- Tipo: Activo corriente (REGULARIZADORA)
- Naturaleza: Acreedora
- Descripción: Pérdida valor por obsolescencia/deterioro
- Aplicar: Cuando valor recuperable < costo
- Común: Mercaderías temporada

#### 11500 - INVERSIONES TEMPORARIAS

**11501 - Plazos Fijos**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Plazos fijos <12 meses
- Devengar: Intereses proporcionalmente al cierre
- Reclasificar: Si >12 meses → No corriente

**11502 - Acciones**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Inversiones acciones CP (intención venta)
- Valuación: Valor mercado al cierre
- Reconocer: Resultados por tenencia

**11503 - Títulos Públicos**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Bonos, letras gobierno
- Valuación: Cotización al cierre
- Devengar: Renta proporcionalmente

**11504 - Fondos Comunes de Inversión**
- Tipo: Activo corriente
- Naturaleza: Deudora
- Descripción: Cuotapartes FCI
- Valuación: Valor cuotaparte al cierre

---

### 1.2 ACTIVO NO CORRIENTE (12XXX)
**Definición**: Bienes, derechos e intangibles >12 meses, sin intención venta.

#### 12100 - BIENES DE USO

**12101 - Terrenos**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Terrenos propiedad empresa
- NO deprecia: Vida útil indefinida
- Incluir: Gastos escrituración en costo inicial
- Revalúo: Pasa a Patrimonio Neto

**12102 - Edificios**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Construcciones inmuebles
- Deprecia: Vida útil limitada (típico 50 años)
- Separar: Del terreno para depreciación
- Mejoras LP: Se capitalizan

**12103 - Instalaciones**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Sistemas fijos (agua, electricidad, gas, AC)
- Vida útil: 15-25 años típicamente

**12104 - Maquinarias**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Máquinas proceso productivo/comercial
- Vida útil: 5-15 años
- Incluir: Flete, seguro, instalación en costo
- Mantenimiento ordinario: Gasto (no capitalizar)

**12105 - Equipos**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Equipos diversos (laboratorio, procesamiento)
- Incluir: Traslado, instalación

**12106 - Rodados**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Vehículos automotores
- Vida útil: 5-10 años
- Gastos patente/seguro: Gastos (no activo)

**12107 - Muebles y Útiles**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Muebles, escritorios, estantes
- Vida útil: 10 años generalmente
- Control: Inventarios físicos anuales

**12108 - Equipos de Computación**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Computadoras, servidores, impresoras
- Vida útil: 3-5 años (rápida obsolescencia)
- Consumibles: Gastos (no capitalizar)

**12109 - Herramientas**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Herramientas producción/servicios
- Vida útil: 5-10 años

#### 12200 - DEPRECIACIONES ACUMULADAS (REGULARIZADORAS)

**Concepto**: Cuentas regularizadoras que restan de bienes de uso.

**12201 - Depreciación Acum. Edificios**
- Tipo: Activo no corriente (REGULARIZADORA)
- Naturaleza: Acreedora (resta activo)
- Vida útil: 50 años edificios
- Método: Lineal generalmente
- Presentación: Edificios - Deprec.Acum = Neto

**12202 - Depreciación Acum. Instalaciones**
- Vida útil: 15-25 años

**12203 - Depreciación Acum. Maquinarias**
- Vida útil: 5-15 años

**12204 - Depreciación Acum. Equipos**
- Vida útil: 5-20 años según tipo

**12205 - Depreciación Acum. Rodados**
- Vida útil: 5-10 años

**12206 - Depreciación Acum. Muebles y Útiles**
- Vida útil: 10 años

**12207 - Depreciación Acum. Equipos de Computación**
- Vida útil: 3-5 años

**12208 - Depreciación Acum. Herramientas**
- Vida útil: 5-10 años

#### 12300 - ACTIVOS INTANGIBLES

**12301 - Marcas**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Marcas comerciales registradas
- Capitalizar: Solo si se compra (no desarrollo interno)
- Incluir: Costo registro INPI

**12302 - Patentes**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Derechos patentes procesos/productos
- Vida útil: Según duración legal (típico 20 años)

**12303 - Licencias**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Licencias software, marcas, derechos
- Licencias anuales: Gasto directo
- Licencias plurianuales: Capitalizar y amortizar

**12304 - Software**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Sistemas informáticos, aplicaciones
- Incluir: Implementación, personalización
- Vida útil: 3-10 años según tipo
- Mantenimiento anual: Gasto

**12305 - Llave de Negocio**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Goodwill en compra negocios
- Calcular: Precio pagado - Patrimonio identificable
- Requisito: Prueba deterioro periódica

**12306 - Gastos de Organización**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Gastos constitución empresa
- Incluye: Escritura, registro, permisos
- Amortización: 5 años típicamente

**12307 - Gastos de Desarrollo**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Gastos desarrollo capitalizable
- Condición: Alta probabilidad éxito
- Investigación pura: Gasto directo

#### 12400 - AMORTIZACIONES ACUMULADAS (REGULARIZADORAS)

**12401 - Amortización Acum. Marcas**
- Tipo: Activo no corriente (REGULARIZADORA)
- Naturaleza: Acreedora

**12402 - Amortización Acum. Patentes**
**12403 - Amortización Acum. Licencias**
**12404 - Amortización Acum. Software**
**12405 - Amortización Acum. Llave de Negocio**
**12406 - Amortización Acum. Gastos de Organización**

#### 12500 - INVERSIONES PERMANENTES

**12501 - Inversiones en Sociedades Vinculadas**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Inversiones filiales/asociadas
- Valuación: Método participación si aplica
- Considerar: Influencia significativa

**12502 - Inversiones en Otras Sociedades**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Inversiones acciones LP sin vinculación
- Sin influencia significativa

**12503 - Inmuebles para Renta**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Inmuebles para alquilar (no uso empresa)
- Deprecia: Como bienes de uso
- Genera: Ingresos por alquileres

#### 12600 - OTROS ACTIVOS NO CORRIENTES

**12601 - Depósitos en Garantía**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Depósitos garantía contratos
- Ejemplos: Caución alquileres, licitaciones
- Recupera: Al finalizar contrato

**12602 - Créditos a Largo Plazo**
- Tipo: Activo no corriente
- Naturaleza: Deudora
- Descripción: Créditos favor empresa >12 meses
- Separar: De créditos corto plazo

---

## 2. PASIVO (2XXXX)

### 2.1 PASIVO CORRIENTE (21XXX)
**Definición**: Obligaciones vencimiento ≤12 meses.

#### 21100 - DEUDAS COMERCIALES

**21101 - Proveedores**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Deudas con proveedores cuenta corriente
- Debita: Pagos, devoluciones, descuentos, NC
- Acredita: Compras crédito, gastos, intereses mora
- Control: Submayores por proveedor

**21102 - Documentos a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Pagarés, letras emitidos
- Debita: Pago, cancelación anticipada
- Formalizar: Documentos legales

**21103 - Tarjetas de Crédito a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Compras con TC empresariales
- Control: Límite crédito, evitar intereses

**21104 - Acreedores Varios**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Obligaciones terceros no proveedores habituales

#### 21200 - DEUDAS FISCALES

**21201 - IVA Débito Fiscal**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: IVA cobrado clientes (obligación fisco)
- Debita: Compensación con IVA Crédito, pago fisco, NC
- Acredita: Ventas gravadas, ND clientes
- Liquidación: Mensual AFIP

**21202 - IVA a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Saldo neto IVA pagar (después compensación)
- Cálculo: IVA Débito - IVA Crédito

**21203 - Impuesto a las Ganancias a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Obligación impuesto ganancias
- Liquidación: Anual
- Retenciones: Actúan como adelanto

**21204 - Ingresos Brutos a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Impuesto provincial ingresos
- Alícuota: Variable según provincia/actividad (1-5%)
- Liquidación: Mensual o bimestral
- Tratamiento: Gasto deducible

**21205 - Retenciones de IVA a Depositar**
**21206 - Percepciones de IVA a Depositar**
**21207 - Otros Impuestos a Pagar**

#### 21300 - DEUDAS SOCIALES

**21301 - Sueldos a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Sueldos devengados pendientes pago
- Debita: Pago liquidación, descuentos
- Documentar: Recibos sueldo

**21302 - Cargas Sociales a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Aportes patronales
- Tasa: 23-27% sobre sueldos
- Incluye: AFIP, obra social, ART

**21303 - Aportes y Contribuciones a Depositar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Aportes personal descontados
- Depositar: AFIP (vencimiento día 5 mes siguiente)

**21304 - Retenciones al Personal a Depositar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Retenciones Ganancias personal
- Genera: Certificado retención

**21305 - Provisión SAC**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Provisión aguinaldo
- Pago: 50% junio, 50% diciembre
- Provisión: 1/12 mensual

**21306 - Provisión Vacaciones**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Provisión días vacaciones
- Mínimo legal: 21 días hábiles
- Provisión: 1/12 mensual

#### 21400 - DEUDAS BANCARIAS Y FINANCIERAS CP

**21401 - Préstamos Bancarios**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Préstamos bancarios <12 meses
- Reclasificar: Parte LP que vence próximos 12 meses

**21402 - Descubiertos Bancarios**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Saldos negativos cuentas bancarias
- Costo: Alto, evitar en lo posible

**21403 - Tarjetas de Crédito Empresariales**
**21404 - Intereses a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Intereses devengados no pagados
- Separar: Del capital

#### 21500 - OTRAS DEUDAS

**21501 - Anticipos de Clientes**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Dinero recibido antes entregar
- Es obligación: No ingreso hasta entrega
- Importante: Construcción, pedidos especiales

**21502 - Dividendos a Pagar**
- Tipo: Pasivo corriente
- Naturaleza: Acreedora
- Descripción: Dividendos declarados no pagados
- Requiere: Aprobación asamblea

**21503 - Honorarios Directorio a Pagar**
**21504 - Acreedores Varios**

---

### 2.2 PASIVO NO CORRIENTE (22XXX)
**Definición**: Obligaciones vencimiento >12 meses.

#### 22100 - DEUDAS BANCARIAS Y FINANCIERAS LP

**22101 - Préstamos Bancarios Largo Plazo**
- Tipo: Pasivo no corriente
- Naturaleza: Acreedora
- Descripción: Préstamos >12 meses
- Reclasificar anualmente: Porción CP
- Documentar: Garantías en notas

**22102 - Obligaciones Negociables**
- Tipo: Pasivo no corriente
- Naturaleza: Acreedora
- Descripción: Bonos, ON mercados capitales
- Requiere: Aprobación CNV
- Características: Cotización bolsa, rating

**22103 - Documentos a Pagar Largo Plazo**
- Tipo: Pasivo no corriente
- Naturaleza: Acreedora
- Descripción: Pagarés, letras >12 meses

#### 22200 - PREVISIONES

**Concepto**: Obligaciones estimadas en monto o fecha.

**22201 - Previsión para Juicios**
- Tipo: Pasivo no corriente
- Naturaleza: Acreedora
- Descripción: Estimación pérdida juicios
- Constituir: Alta probabilidad perder
- Revisar anualmente: Ajustar estimación

**22202 - Previsión para Indemnizaciones**
- Tipo: Pasivo no corriente
- Naturaleza: Acreedora
- Descripción: Estimación indemnizaciones despido
- Constituir: Decisión firme/plan formal

**22203 - Previsión para Garantías**
- Tipo: Pasivo no corriente
- Naturaleza: Acreedora
- Descripción: Costo estimado garantías clientes
- Basarse: Experiencia histórica
- Común: Electrodomésticos, tecnología

**22204 - Otras Previsiones**
- Incluye: Desmantelamiento, pasivos ambientales

---

## 3. PATRIMONIO NETO (3XXXX)

**Definición**: PN = Activo - Pasivo

### 3.1 PATRIMONIO NETO (31XXX)

#### 31100 - CAPITAL SOCIAL

**31101 - Capital Suscripto**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Capital comprometido socios/accionistas
- Debita: Reducción capital, absorción pérdidas
- Acredita: Constitución, aumento capital, capitalización
- Modificaciones: Requieren acta asamblea

**31102 - Capital Integrado**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Parte capital efectivamente aportada
- SA: Integración mínima 25% al constituir
- SRL: Integración 100% al constituir

**31103 - Aportes Irrevocables a Cuenta Futuras Suscripciones**
- Tipo: Patrimonio Neto (transitoria)
- Naturaleza: Acreedora
- Descripción: Aportes para futuros aumentos capital
- Formalizar: En asamblea dentro plazo legal

#### 31200 - AJUSTES AL PATRIMONIO

**31201 - Ajuste por Revalúo Técnico**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Mayor valor bienes uso por revaluación
- No genera resultado: Va directo a PN
- Requiere: Tasación profesional matriculado
- Al vender bien: Transferir a resultados acumulados

**31202 - Diferencias de Conversión**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora/Deudora
- Descripción: Diferencias conversión estados contables sucursales extranjero
- Aplica: Empresas con operaciones exterior

#### 31300 - RESERVAS

**Concepto**: Apropiaciones resultados acumulados con destino específico.

**31301 - Reserva Legal**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Reserva obligatoria Ley Sociedades
- SA: 5% ganancias hasta 20% capital
- SRL: No obligatoria
- No distribuible: Solo absorber pérdidas o capitalizar

**31302 - Reserva Estatutaria**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Reservas establecidas en estatuto
- Destino específico: Según estatuto
- Modificar: Requiere asamblea

**31303 - Reserva Facultativa**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Reservas voluntarias por asamblea
- No requiere: Modificación estatuto
- Fines diversos: Expansión, contingencias, modernización
- Liberable: Cuando asamblea decida

**31304 - Reserva por Revalúo**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora
- Descripción: Reserva por capitalización revalúo
- No distribuible: Solo capitalizar o absorber pérdidas

#### 31400 - RESULTADOS ACUMULADOS

**31401 - Resultados No Asignados**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora (ganancias) / Deudora (pérdidas)
- Descripción: Ganancias/pérdidas acumuladas no distribuidas/asignadas
- Debita: Dividendos, constitución reservas, pérdidas
- Acredita: Resultado positivo ejercicio, liberación reservas
- Destino natural: Resultado del ejercicio al cierre

**31402 - Resultados de Ejercicios Anteriores**
- Similar a 31401: Algunas empresas unifican ambas

#### 31500 - RESULTADO DEL EJERCICIO

**31501 - Resultado del Ejercicio**
- Tipo: Patrimonio Neto
- Naturaleza: Acreedora (ganancia) / Deudora (pérdida)
- Descripción: Resultado ejercicio en curso
- Cálculo: Ingresos - Egresos
- Al cierre: Transferir a Resultados No Asignados
- Ejercicio siguiente: Comienza en cero

---

## 4. INGRESOS (4XXXX)

**Naturaleza**: ACREEDORA

### 4.1 INGRESOS ORDINARIOS (41XXX)

#### 41100 - VENTAS

**41101 - Ventas de Mercaderías**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ingresos venta bienes comercialización
- Debita: Devoluciones, descuentos, cierre ejercicio
- Acredita: Ventas (contado o crédito)
- Registrar: NETO de IVA
- Momento reconocimiento: Al transferir riesgos/beneficios

**41102 - Ventas de Productos Manufacturados**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ingresos venta productos fabricados
- Costo incluye: MP + MOD + Gastos fabricación

**41103 - Servicios Prestados**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ingresos prestación servicios
- Momento reconocimiento: Al completar o por % avance
- IVA: 21% o 10.5% según tipo

**41104 - Devoluciones de Ventas (REGULARIZADORA)**
- Tipo: Ingreso ordinario (REGULARIZADORA)
- Naturaleza: DEUDORA (resta ingresos)
- Descripción: Mercaderías devueltas por clientes
- Emitir: Nota Crédito
- Reingreso stock: Al costo

**41105 - Bonificaciones sobre Ventas (REGULARIZADORA)**
- Tipo: Ingreso ordinario (REGULARIZADORA)
- Naturaleza: DEUDORA
- Descripción: Descuentos comerciales otorgados
- Tipos: Por volumen, pronto pago, promocionales

**41106 - Descuentos sobre Ventas (REGULARIZADORA)**
- Tipo: Ingreso ordinario (REGULARIZADORA)
- Naturaleza: DEUDORA
- Descripción: Descuentos pronto pago, ajustes posteriores

#### 41200 - OTROS INGRESOS OPERATIVOS

**41201 - Intereses Ganados**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Intereses plazos fijos, préstamos otorgados, inversiones
- Devengar: Proporcionalmente aunque no cobrados
- Incluye: Plazos fijos, préstamos, bonos, ON

**41202 - Descuentos Obtenidos**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Descuentos pronto pago de proveedores
- Ingreso financiero: Beneficio pagar anticipadamente

**41203 - Recupero de Créditos Incobrables**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Cobros créditos dados baja incobrables

**41204 - Alquileres Ganados**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ingresos alquiler inmuebles, equipos
- Devengar: Mensualmente aunque no cobrado
- IVA: 21% (alquileres comerciales)

**41205 - Regalías Ganadas**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ingresos concesión uso marcas, patentes, derechos autor
- Base cálculo: Ventas, unidades, monto fijo

**41206 - Comisiones Ganadas**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Comisiones intermediación, representación
- Reconocimiento: Al concretar operación

#### 41300 - RESULTADOS POR TENENCIA

**41301 - Diferencias de Cambio Positivas**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ganancias variación TC en activos/pasivos ME
- Activo ME sube: Ganancia
- Pasivo ME baja: Ganancia
- Devengar: Al cierre aunque no realice

**41302 - Resultado por Exposición Inflación (REI) Positivo**
- Tipo: Ingreso ordinario
- Naturaleza: Acreedora
- Descripción: Ganancias ajuste inflación
- PMN negativa + inflación: Ganancia
- Aplica: Cuando hay ajuste inflación contable

### 4.2 INGRESOS EXTRAORDINARIOS (42XXX)

**Concepto**: Ingresos atípicos, no recurrentes.

**42101 - Resultado por Venta de Bienes de Uso**
- Tipo: Ingreso extraordinario
- Naturaleza: Acreedora (ganancia) / Deudora (pérdida)
- Descripción: Resultado venta bienes uso
- No habitual: No actividad empresa
- Cálculo: Precio venta - Valor neto libros

**42102 - Resultado por Venta de Inversiones**
- Tipo: Ingreso extraordinario
- Naturaleza: Acreedora/Deudora
- Descripción: Resultado venta inversiones
- Incluye: Acciones, bonos
- Diferencia: Precio venta - Costo

**42103 - Recupero de Previsiones**
- Tipo: Ingreso extraordinario
- Naturaleza: Acreedora
- Descripción: Reversión previsiones no utilizadas
- Mejora resultado: Ejercicio actual

**42104 - Ingresos Extraordinarios Varios**
- Tipo: Ingreso extraordinario
- Naturaleza: Acreedora
- Descripción: Otros ingresos atípicos
- Incluye: Indemnizaciones seguro, donaciones, prescripciones, condonaciones

---

## 5. EGRESOS (5XXXX)

**Naturaleza**: DEUDORA

### 5.1 COSTO DE VENTAS (51XXX)

**51101 - Costo de Mercaderías Vendidas**
- Tipo: Egreso
- Naturaleza: Deudora
- Descripción: Costo mercaderías vendidas
- Registrar: Simultáneamente con venta
- Método valuación: FIFO, PPP
- Afecta: Margen bruto directamente

**51102 - Costo de Productos Manufacturados Vendidos**
- Tipo: Egreso
- Naturaleza: Deudora
- Descripción: Costo producción productos vendidos
- Incluye: MP + MOD + Gastos fabricación
- Requiere: Sistema costos

**51103 - Costo de Servicios Prestados**
- Tipo: Egreso
- Naturaleza: Deudora
- Descripción: Costos directos servicios
- Incluye: Costos atribuibles directamente

### 5.2 GASTOS DE COMERCIALIZACIÓN (52XXX)

**Concepto**: Gastos venta y distribución.

**52101 - Sueldos y Jornales Ventas**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Remuneraciones área comercial/ventas
- Incluye: Sueldos base, comisiones, premios

**52102 - Cargas Sociales Ventas**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Contribuciones patronales ventas
- Porcentaje: 23-27% según actividad

**52103 - Comisiones sobre Ventas**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Comisiones vendedores, representantes
- Variable: Según ventas realizadas

**52104 - Publicidad y Propaganda**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Gastos marketing, publicidad, promoción
- Incluye: Redes sociales, Google, TV, radio, gráfica
- Analizar: ROI publicidad

**52105 - Fletes y Acarreos**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Transporte mercaderías a clientes
- Solo: Fletes venta (distribución)

**52106 - Gastos de Distribución**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Almacenamiento, distribución productos
- Incluye: Alquiler depósitos, combustible, mantenimiento vehículos

**52107 - Gastos de Representación**
- Tipo: Egreso comercialización
- Naturaleza: Deudora
- Descripción: Atención clientes, eventos comerciales
- Deducibilidad: Limitada impositivamente

### 5.3 GASTOS DE ADMINISTRACIÓN (53XXX)

**Concepto**: Gastos generales funcionamiento.

#### 53100 - GASTOS DE PERSONAL

**53101 - Sueldos y Jornales Administración**
- Tipo: Egreso administración
- Naturaleza: Deudora
- Descripción: Remuneraciones personal administrativo
- Incluye: Personal no productivo ni ventas

**53102 - Cargas Sociales Administración**
**53103 - Indemnizaciones**
- Deducible: Impositivamente
- Puede haber: Previsión anticipada

**53104 - Capacitación Personal**
**53105 - Ropa de Trabajo**
**53106 - Medicina Laboral**

#### 53200 - SERVICIOS Y HONORARIOS

**53201 - Honorarios Profesionales**
- Tipo: Egreso administración
- Naturaleza: Deudora
- Descripción: Honorarios contadores, abogados, consultores
- Retención: Ganancias e IVA
- Separar: De sueldos (relación dependencia vs autónomos)

**53202 - Honorarios Directorio**
- Requiere: Aprobación asamblea
- Limitaciones: Según utilidades

**53203 - Servicios de Limpieza**
**53204 - Servicios de Vigilancia**
**53205 - Servicios de Mantenimiento**
- Solo: Mantenimiento ordinario
- Mejoras: Se capitalizan

#### 53300 - SERVICIOS PÚBLICOS Y COMUNICACIONES

**53301 - Energía Eléctrica**
**53302 - Gas**
**53303 - Agua**
**53304 - Teléfono**
**53305 - Internet**
**53306 - Servicio de Correo**

#### 53400 - ALQUILERES Y ARRENDAMIENTOS

**53401 - Alquileres de Inmuebles**
- Tipo: Egreso administración
- Naturaleza: Deudora
- Descripción: Alquiler oficinas, depósitos, locales
- Deducible: Impositivamente
- Retención: Ganancias al propietario
- IVA: 21%

**53402 - Alquileres de Equipos**
**53403 - Leasing**
- Tratamiento: Especial (operativo o financiero)
- Deducible: Impositivamente

#### 53500 - IMPUESTOS Y TASAS

**53501 - Impuesto Inmobiliario**
**53502 - Impuesto a los Débitos y Créditos**
- Impuesto cheque: 0.6% por movimiento
- Deducible: Ganancias
- Puede computarse: Pago a cuenta

**53503 - Ingresos Brutos**
- Tipo: Egreso administración
- Naturaleza: Deudora
- Descripción: Impuesto provincial ingresos
- Alícuota: 1-5% según provincia/actividad
- Tratamiento: Gasto deducible

**53504 - Tasas Municipales**
**53505 - Otros Impuestos**

#### 53600 - SEGUROS

**53601 - Seguros sobre Bienes de Uso**
- Si pago adelantado: Usar 11309 Gastos Pagados Adelantado
- Devengo: Mensual

**53602 - Seguros sobre Mercaderías**
**53603 - Seguros de Responsabilidad Civil**
**53604 - Seguros de Vida Obligatorio (ART)**
- Obligatorio: Por ley
- Porcentaje: Sobre nómina salarial

#### 53700 - DEPRECIACIONES Y AMORTIZACIONES

**53701 - Depreciación Bienes de Uso**
- Tipo: Egreso administración (NO EROGABLE)
- Naturaleza: Deudora
- Descripción: Depreciación mensual bienes uso
- No genera: Salida efectivo
- Método: Lineal generalmente
- Registro: Mensual o acumulado cierre

**53702 - Amortización Activos Intangibles**
- Tipo: Egreso administración (NO EROGABLE)
- Naturaleza: Deudora
- Descripción: Amortización intangibles

#### 53800 - GASTOS GENERALES

**53801 - Papelería y Útiles**
**53802 - Impresos y Formularios**
**53803 - Artículos de Limpieza**
**53804 - Gastos de Movilidad**
- Incluye: Viáticos, pasajes, combustible viajes trabajo

**53805 - Gastos de Representación**
**53806 - Refrigerios y Cafetería**
**53807 - Suscripciones y Publicaciones**

#### 53900 - OTROS GASTOS ADMINISTRATIVOS

**53901 - Gastos Bancarios**
- Diferente de: Comisiones (54102), intereses (54101)

**53902 - Gastos de Cobranza**
**53903 - Deudores Incobrables**
- Tipo: Egreso administración
- Naturaleza: Deudora
- Descripción: Castigo incobrables o constitución previsión
- Cálculo: Según análisis antigüedad

**53904 - Donaciones**
- Deducibilidad: Limitada impositivamente
- Requiere: Documentación, certificado donatario

### 5.4 GASTOS FINANCIEROS (54XXX)

**54101 - Intereses Pagados**
- Tipo: Egreso financiero
- Naturaleza: Deudora
- Descripción: Intereses préstamos, descubiertos, financiaciones
- Devengar: Aunque no pagados
- Deducible: Impositivamente
- Incluye: Préstamos bancarios, ON, documentos pagar

**54102 - Comisiones Bancarias**
- Tipo: Egreso financiero
- Naturaleza: Deudora
- Descripción: Comisiones servicios bancarios, TC
- Incluye: Comisiones tarjetas, transferencias
- Deducible: Impositivamente

**54103 - Gastos Bancarios**

**54104 - Diferencias de Cambio Negativas**
- Tipo: Egreso financiero
- Naturaleza: Deudora
- Descripción: Pérdidas variación TC
- Activo ME baja: Pérdida
- Pasivo ME sube: Pérdida
- Devengar: Al cierre aunque no realice

**54105 - Resultado por Exposición Inflación (REI) Negativo**
- Tipo: Egreso financiero
- Naturaleza: Deudora
- Descripción: Pérdidas ajuste inflación
- PMN positiva + inflación: Pérdida

**54106 - Descuentos Concedidos**
- Tipo: Egreso financiero
- Naturaleza: Deudora
- Descripción: Descuentos financieros pronto pago
- Costo: Por acelerar cobranza
- Diferente: Descuentos comerciales

### 5.5 OTROS EGRESOS (55XXX)

**Concepto**: Egresos extraordinarios, no recurrentes.

**55101 - Baja de Bienes de Uso**
- Tipo: Egreso extraordinario
- Naturaleza: Deudora
- Descripción: Pérdida baja bienes obsoletos
- Solo: Valor neto libros es pérdida

**55102 - Pérdidas Extraordinarias**
- Tipo: Egreso extraordinario
- Naturaleza: Deudora
- Descripción: Pérdidas atípicas no clasificadas
- Incluye: Multas, obsolescencia stock
- No recurrente

**55103 - Siniestros**
- Tipo: Egreso extraordinario
- Naturaleza: Deudora
- Descripción: Pérdidas siniestros no cubiertas seguro
- Solo: Parte no cubierta

**55104 - Pérdidas por Juicios**
- Tipo: Egreso extraordinario
- Naturaleza: Deudora
- Descripción: Pérdidas sentencias adversas
- Deducible: Al pagar
- Si prevision: Usar primero previsión

---

## CONCEPTOS CLAVE TRANSVERSALES

### Reconocimiento de Ingresos y Egresos

**Principio de Devengamiento**
- Ingreso: Se reconoce al transferir riesgos/beneficios (no al cobrar)
- Egreso: Se reconoce al adquirir obligación (no al pagar)
- Base: RT 17 (Argentina)

**Ingresos vs Cobros / Egresos vs Pagos**
- Venta crédito $100,000: Ingreso reconocido
- Cobro 30 días después: No es ingreso, es movimiento activo
- Similar: Gastos devengados vs pagos

### IVA en Operaciones

**Principio Fundamental**
- Ingresos: Registrar NETO de IVA
- Egresos: Registrar NETO de IVA
- IVA va: Cuentas específicas (11305, 21201)

**Ejemplo Correcto**
```
Venta $100,000 + IVA $21,000 = Total $121,000
DEBE: 11201 Deudores......$121,000
HABER: 41101 Ventas........$100,000
HABER: 21201 IVA Débito....$21,000
```

### Gastos vs Inversiones

**GASTO** → Resultado (consume período)
- Sueldos, luz, alquileres
- No beneficios futuros

**INVERSIÓN** → Activo (beneficios futuros)
- Maquinaria, software, edificio
- Deprecia/amortiza en tiempo

### Gastos Erogables vs No Erogables

**EROGABLES** (salida efectivo)
- Sueldos, servicios, compras, impuestos

**NO EROGABLES** (sin salida efectivo)
- Depreciaciones (53701)
- Amortizaciones (53702)
- Previsiones (al constituir)
- Ajustes inflación

**Importancia**: Cálculo flujo efectivo (EBITDA)
- EBITDA = Resultado + Deprec + Amort + Intereses + Impuestos

### Depreciaciones y Amortizaciones

**Bienes que Deprecian**
- Edificios, instalaciones, maquinarias, equipos, rodados, muebles, computación, herramientas
- Vida útil limitada

**NO Deprecian**
- Terrenos (vida útil indefinida)
- Inversiones permanentes
- Depósitos garantía

**Intangibles que Amortizan**
- Marcas, patentes, licencias, software, llave negocio, gastos organización

**Vidas Útiles Típicas**
- Edificios: 50 años
- Maquinarias: 5-15 años
- Rodados: 5-10 años
- Equipos computación: 3-5 años
- Software: 3-10 años

### Análisis Financiero

**Margen Bruto**
```
= (Ventas Netas - Costo Ventas) / Ventas Netas × 100
```

**EBITDA Margin**
```
= EBITDA / Ventas × 100
> 20%: Excelente
10-15%: Aceptable
< 10%: Bajo
```

**ROE (Rentabilidad Patrimonio)**
```
= Resultado Ejercicio / Patrimonio Neto × 100
> 15%: Excelente
< 5%: Baja
```

**Ratio Liquidez Corriente**
```
= Activo Corriente / Pasivo Corriente
> 1.5: Buena liquidez
< 1: Problemas liquidez
```

**Ratio Endeudamiento**
```
= Pasivo Total / Patrimonio Neto
< 1: Bajo endeudamiento
> 2: Alto endeudamiento
```

### Deducibilidad Impositiva

**DEDUCIBLES (Impuesto Ganancias)**
- Sueldos, cargas sociales
- Honorarios profesionales
- Alquileres, servicios públicos
- Seguros, impuestos (excepto Ganancias)
- Intereses, depreciaciones, amortizaciones

**NO DEDUCIBLES**
- Impuesto Ganancias
- Multas, recargos
- Donaciones (limitadas)
- Gastos sin comprobante
- Gastos representación (limitados)

### Estado de Resultados

**Estructura**
```
INGRESOS ORDINARIOS
+ Ventas Netas
+ Servicios Prestados
+ Otros Ingresos Operativos

EGRESOS ORDINARIOS
- Costo de Ventas
= UTILIDAD BRUTA

- Gastos Comercialización
- Gastos Administración
= RESULTADO OPERATIVO

+ Ingresos Financieros
- Gastos Financieros
= RESULTADO ANTES IMP/EXT

+ Ingresos Extraordinarios
- Egresos Extraordinarios
= RESULTADO DEL EJERCICIO
```

---

## GLOSARIO DE TÉRMINOS

**Activo Corriente**: Bienes/derechos convertibles efectivo ≤12 meses
**Activo No Corriente**: Bienes/derechos >12 meses
**Amortización**: Pérdida valor activos intangibles
**CABA**: Ciudad Autónoma Buenos Aires
**CMV**: Costo Mercaderías Vendidas
**CP**: Corto Plazo (≤12 meses)
**Depreciación**: Pérdida valor bienes uso por uso/tiempo
**Devengar**: Reconocer contablemente (independiente cobro/pago)
**EBITDA**: Earnings Before Interest, Taxes, Depreciation, Amortization
**FIFO**: First In, First Out (primero entrada, primero salida)
**IGJ**: Inspección General Justicia
**IIBB**: Ingresos Brutos
**IVA**: Impuesto Valor Agregado
**LP**: Largo Plazo (>12 meses)
**ME**: Moneda Extranjera
**MN**: Moneda Nacional
**MOD**: Mano Obra Directa
**MP**: Materias Primas
**NC**: Nota Crédito
**ND**: Nota Débito
**NIIF**: Normas Internacionales Información Financiera
**ON**: Obligaciones Negociables
**PMN**: Posición Monetaria Neta
**PN**: Patrimonio Neto
**PPP**: Precio Promedio Ponderado
**Previsión**: Obligación estimada monto/fecha
**REI**: Resultado Exposición Inflación
**ROE**: Return On Equity (Rentabilidad Patrimonio)
**ROI**: Return On Investment (Retorno Inversión)
**RT**: Resolución Técnica
**SA**: Sociedad Anónima
**SAC**: Sueldo Anual Complementario (Aguinaldo)
**SRL**: Sociedad Responsabilidad Limitada
**TC**: Tipo Cambio
**VNR**: Valor Neto Realización

---

## ÍNDICE POR TIPO DE OPERACIÓN

### Operaciones Comerciales
- Ventas: 41101, 41102, 41103
- Cobros: 11103, 11201, 11202, 11203, 11204, 11205
- Compras: 11401, 21101
- Pagos: 11103, 21101
- Devoluciones: 41104, 11401
- Descuentos: 41105, 41106, 41202

### Operaciones con Personal
- Sueldos: 52101, 53101, 21301
- Cargas Sociales: 52102, 53102, 21302
- Aportes: 21303
- Retenciones: 21304
- SAC: 21305
- Vacaciones: 21306
- Anticipos: 11302
- Préstamos: 11304
- Indemnizaciones: 53103, 22202

### Operaciones Fiscales
- IVA Compras: 11305
- IVA Ventas: 21201
- IVA a Pagar: 21202
- Percepciones IVA: 11306, 21206
- Retenciones IVA: 11307, 21205
- Ganancias: 21203
- Ingresos Brutos: 53503, 21204
- Saldos Favor: 11308

### Operaciones Financieras
- Préstamos Tomados: 21401, 22101
- Intereses Pagados: 54101, 21404
- Intereses Ganados: 41201
- Diferencias Cambio: 41301, 54104
- Comisiones: 54102
- Inversiones: 11501-11504, 12501-12503

### Operaciones con Bienes de Uso
- Alta: 12101-12109
- Depreciación: 53701, 12201-12208
- Baja/Venta: 42101, 55101

### Operaciones con Intangibles
- Alta: 12301-12307
- Amortización: 53702, 12401-12406

### Operaciones Patrimoniales
- Aportes Capital: 31101, 31102, 31103
- Constitución Reservas: 31301-31304
- Distribución Dividendos: 21502, 31401
- Resultado Ejercicio: 31501

---

## BÚSQUEDA RÁPIDA POR PALABRA CLAVE

**Alquiler**: 41204, 53401-53403
**Anticipo**: 11301, 11302, 21501
**Banco**: 11103, 11104
**Bonificación**: 41105
**Caja**: 11101, 11102
**Capital**: 31101-31103
**Cargo Social**: 52102, 53102, 21302
**Cliente**: 11201-11205, 21501
**Comisión**: 41206, 52103, 54102
**Depreciación**: 53701, 12201-12208
**Descuento**: 41106, 41202, 54106
**Deudor**: 11201-11205, 11303, 11206, 53903
**Diferencia Cambio**: 41301, 54104
**Dividendo**: 21502, 31401
**Edificio**: 12102, 12201
**Energía**: 53301
**Flete**: 52105
**Fondo Fijo**: 11106
**Ganancia**: 21203, 31501
**Gasto**: 51XXX-55XXX
**Honorario**: 53201, 53202
**Impuesto**: 11305-11308, 21201-21207, 53501-53505
**Indemnización**: 53103, 22202
**Ingreso**: 41XXX-42XXX
**Interés**: 41201, 54101, 21404
**Inventario**: 11401-11407
**Inversión**: 11501-11504, 12501-12503
**IVA**: 11305-11308, 21201-21202, 21205-21206
**Juicio**: 22201, 55104
**Leasing**: 53403
**Licencia**: 12303, 12403
**Maquinaria**: 12104, 12203
**Marca**: 12301, 12401
**Mercadería**: 11401, 41101, 51101
**Patente**: 12302, 12402
**Personal**: 11302, 11304, 21301-21306, 52101-52102, 53101-53106
**Plazo Fijo**: 11501
**Préstamo**: 11304, 21401, 22101
**Previsión**: 11206, 11407, 22201-22204, 42103
**Proveedor**: 21101-21104
**Publicidad**: 52104
**Regalía**: 41205
**Reserva**: 31301-31304
**Resultado**: 31501, 42101-42104, 55101-55104
**Revalúo**: 31201, 31304
**Rodado**: 12106, 12205
**Seguro**: 53601-53604
**Servicio**: 41103, 51103, 53203-53205
**Software**: 12304, 12404
**Sueldo**: 52101, 53101, 21301
**Tarjeta**: 11203, 21103, 21403
**Terreno**: 12101
**Venta**: 41101-41106

---

## FLUJOS CONTABLES TÍPICOS

### Flujo 1: Venta a Crédito
```
1. Venta mercadería $100,000 + IVA
   DEBE: 11201 Deudores.......$121,000
   HABER: 41101 Ventas........$100,000
   HABER: 21201 IVA Débito....$21,000

2. Registrar costo $60,000
   DEBE: 51101 CMV............$60,000
   HABER: 11401 Mercaderías...$60,000

3. Cobro posterior
   DEBE: 11103 Banco..........$121,000
   HABER: 11201 Deudores......$121,000
```

### Flujo 2: Compra Mercadería
```
1. Compra $100,000 + IVA
   DEBE: 11401 Mercaderías....$100,000
   DEBE: 11305 IVA Crédito....$21,000
   HABER: 21101 Proveedores...$121,000

2. Pago a proveedor
   DEBE: 21101 Proveedores....$121,000
   HABER: 11103 Banco.........$121,000
```

### Flujo 3: Liquidación Sueldos
```
1. Devengamiento sueldo $100,000
   DEBE: 53101 Sueldos Adm....$100,000
   HABER: 21301 Sueldos Pagar.$70,000
   HABER: 21302 Cargas Social.$25,000
   HABER: 21304 Retenciones...$5,000

2. Cargas patronales 25%
   DEBE: 53102 Cargas Soc.....$25,000
   HABER: 21302 Cargas Soc....$25,000

3. Pago sueldo
   DEBE: 21301 Sueldos Pagar..$70,000
   HABER: 11103 Banco.........$70,000

4. Pago cargas y aportes
   DEBE: 21302 Cargas Soc.....$50,000
   DEBE: 21304 Retenciones....$5,000
   HABER: 11103 Banco.........$55,000
```

### Flujo 4: Liquidación IVA Mensual
```
1. Fin de mes:
   IVA Débito (ventas): $50,000
   IVA Crédito (compras): $30,000
   IVA a Pagar: $20,000

2. Liquidación
   DEBE: 21201 IVA Débito.....$50,000
   HABER: 11305 IVA Crédito...$30,000
   HABER: 21202 IVA a Pagar...$20,000

3. Pago AFIP
   DEBE: 21202 IVA a Pagar....$20,000
   HABER: 11103 Banco.........$20,000
```

### Flujo 5: Compra Bien de Uso
```
1. Compra maquinaria $300,000
   DEBE: 12104 Maquinarias....$300,000
   DEBE: 11305 IVA Crédito....$63,000
   HABER: 11103 Banco.........$363,000

2. Depreciación mensual (10 años)
   Vida útil: 120 meses
   Deprec mensual: $2,500
   
   DEBE: 53701 Deprec Bienes..$2,500
   HABER: 12203 Deprec Acum...$2,500
```

### Flujo 6: Préstamo Bancario
```
1. Obtención préstamo $500,000
   DEBE: 11103 Banco..........$500,000
   HABER: 21401 Préstamos CP..$500,000

2. Pago cuota mensual
   Capital: $20,000
   Interés: $6,000
   Total: $26,000
   
   DEBE: 21401 Préstamos CP...$20,000
   DEBE: 54101 Intereses......$6,000
   HABER: 11103 Banco.........$26,000
```

### Flujo 7: Constitución Previsión
```
1. Previsión incobrables 5%
   Deudores: $500,000
   Previsión: $25,000
   
   DEBE: 53903 Deud Incobr....$25,000
   HABER: 11206 Previsión.....$25,000

2. Castigo deudor $10,000
   DEBE: 11206 Previsión......$10,000
   HABER: 11201 Deudores......$10,000
```

### Flujo 8: Cierre Ejercicio
```
1. Total Ingresos: $10,000,000
   Total Egresos: $9,000,000
   Resultado: $1,000,000 (ganancia)

2. Cierre ingresos
   DEBE: 41XXX Ingresos......$10,000,000
   HABER: 31501 Result Ejerc.$10,000,000

3. Cierre egresos
   DEBE: 31501 Result Ejerc..$9,000,000
   HABER: 5XXXX Egresos......$9,000,000

4. Transferir resultado
   DEBE: 31501 Result Ejerc..$1,000,000
   HABER: 31401 Result No Asig$1,000,000
```

### Flujo 9: Distribución Resultados
```
Ganancia: $1,000,000
Decisión asamblea:
- Reserva Legal 5%: $50,000
- Reserva Facultativa: $200,000
- Dividendos: $600,000
- No asignado: $150,000

1. Reserva Legal
   DEBE: 31401 Result No Asig.$50,000
   HABER: 31301 Res Legal.....$50,000

2. Reserva Facultativa
   DEBE: 31401 Result No Asig.$200,000
   HABER: 31303 Res Facultat..$200,000

3. Dividendos
   DEBE: 31401 Result No Asig.$600,000
   HABER: 21502 Div a Pagar...$600,000

4. Pago dividendos
   DEBE: 21502 Div a Pagar....$600,000
   HABER: 11103 Banco.........$600,000
```

### Flujo 10: Diferencia Cambio
```
1. Deudor USD 10,000 (TC $1,000)
   Valor inicial: $10,000,000
   
   DEBE: 11201 Deudores......$10,000,000
   HABER: 41101 Ventas.......$10,000,000

2. Al cierre (TC $1,100)
   Ajuste: $1,000,000
   
   DEBE: 11201 Deudores......$1,000,000
   HABER: 41301 Dif Cambio +.$1,000,000

3. Cobro (TC $1,050)
   Valor cobrado: $10,500,000
   Diferencia: -$500,000
   
   DEBE: 11103 Banco.........$10,500,000
   DEBE: 54104 Dif Cambio -...$500,000
   HABER: 11201 Deudores.....$11,000,000
```

---

## CONTROLES Y VALIDACIONES

### Control Mensual Básico
1. ✓ Conciliación bancaria
2. ✓ Antigüedad deudores
3. ✓ Vencimientos proveedores
4. ✓ Liquidación IVA
5. ✓ Liquidación sueldos
6. ✓ Depreciaciones/amortizaciones
7. ✓ Gastos vs presupuesto
8. ✓ Margen bruto
9. ✓ Ratio liquidez

### Control Anual
1. ✓ Inventario físico bienes cambio
2. ✓ Inventario bienes uso
3. ✓ Revisión previsiones
4. ✓ Reclasificación CP/LP
5. ✓ Análisis deterioro activos
6. ✓ Estado evolución PN
7. ✓ Notas estados contables
8. ✓ Declaración jurada Ganancias
9. ✓ Asamblea socios

### Validaciones Contables
**Balance debe cuadrar:**
- Activo = Pasivo + PN

**Mayor debe coincidir:**
- Suma débitos = Suma créditos

**Subcuentas coherentes:**
- Σ Deudores individuales = 11201
- Σ Proveedores individuales = 21101

**Regularizadoras correctas:**
- 11206, 11407: Naturaleza acreedora
- 12201-12208: Naturaleza acreedora
- 12401-12406: Naturaleza acreedora
- 41104-41106: Naturaleza deudora

---

## NORMATIVA APLICABLE (ARGENTINA)

### Leyes
- **Ley 19.550**: Sociedades Comerciales
- **Ley 20.744**: Contrato Trabajo
- **Ley 23.576**: Obligaciones Negociables
- **Ley 24.241**: Sistema Jubilatorio

### Impuestos
- **Ley Impuesto Ganancias**: Personas Jurídicas
- **Ley IVA**: Impuesto Valor Agregado
- **Convenio Multilateral**: Ingresos Brutos
- **Ley 25.413**: Impuesto Cheque

### Resoluciones Técnicas FACPCE
- **RT 8**: Normas Generales Exposición
- **RT 9**: Normas Particulares Exposición
- **RT 11**: Normas Consolidación
- **RT 16**: Marco Conceptual
- **RT 17**: Normas Valuación
- **RT 18**: Desarrollo Agropecuario
- **RT 21**: VP Patrimonial
- **RT 22**: Actividad Financiera
- **RT 26**: Adopción NIIF
- **RT 41**: Desarrollo Inmobiliario

### Organismos
- **AFIP**: Administración Federal Ingresos Públicos
- **IGJ**: Inspección General Justicia
- **FACPCE**: Federación Consejos Profesionales
- **CNV**: Comisión Nacional Valores
- **BCRA**: Banco Central República Argentina

---

## FORMATOS ESTADOS CONTABLES

### Balance General (Estructura)
```
ACTIVO
  Activo Corriente
    Caja y Bancos
    Créditos por Ventas (neto)
    Otros Créditos
    Bienes de Cambio
    Inversiones Temporarias
  Activo No Corriente
    Bienes de Uso (neto)
    Activos Intangibles (neto)
    Inversiones Permanentes
    Otros Activos NC

PASIVO
  Pasivo Corriente
    Deudas Comerciales
    Deudas Fiscales
    Deudas Sociales
    Deudas Bancarias CP
    Otras Deudas
  Pasivo No Corriente
    Deudas Bancarias LP
    Previsiones

PATRIMONIO NETO
  Capital Social
  Ajustes al Patrimonio
  Reservas
  Resultados Acumulados
  Resultado del Ejercicio
```

### Estado de Resultados (Estructura)
```
INGRESOS ORDINARIOS
+ Ventas Netas
+ Servicios Prestados
+ Otros Ingresos Operativos
+ Resultados por Tenencia

EGRESOS ORDINARIOS
- Costo de Ventas
= UTILIDAD BRUTA

- Gastos de Comercialización
- Gastos de Administración
= RESULTADO OPERATIVO

+ Ingresos Financieros
- Gastos Financieros
= RESULTADO ORDINARIO

+ Ingresos Extraordinarios
- Egresos Extraordinarios
= RESULTADO ANTES IMPUESTOS

- Impuesto a las Ganancias
= RESULTADO DEL EJERCICIO
```

### Estado Evolución Patrimonio Neto
```
Columnas:
- Capital Social
- Reserva Legal
- Reservas Facultativas
- Ajustes Patrimonio
- Resultados Acumulados
- Resultado Ejercicio
- Total PN

Filas:
- Saldo Inicial
- Resultado del Ejercicio
- Distribución Resultados
- Aumentos/Reducciones Capital
- Otros Movimientos
- Saldo Final
```

### Estado de Flujo de Efectivo
```
ACTIVIDADES OPERATIVAS
+ Cobros clientes
- Pagos proveedores
- Pagos personal
- Pagos impuestos
= Flujo Neto Operativo

ACTIVIDADES INVERSIÓN
- Compra bienes uso
+ Venta bienes uso
- Compra inversiones
+ Venta inversiones
= Flujo Neto Inversión

ACTIVIDADES FINANCIACIÓN
+ Aportes capital
+ Préstamos tomados
- Pago préstamos
- Pago dividendos
= Flujo Neto Financiación

VARIACIÓN NETA EFECTIVO
+ Saldo Inicial
= SALDO FINAL EFECTIVO
```

---

## CASOS ESPECIALES Y EXCEPCIONES

### Moneda Extranjera
- Registrar: TC fecha transacción
- Ajustar: TC cierre ejercicio
- Diferencias: 41301 o 54104

### Inflación
- Ajuste: Cuando aplicable (alta inflación)
- REI: 41302 o 54105
- Complejo: Requiere cálculo técnico

### Empresa en Marcha
- Si NO continúa: Valuar liquidación
- Afecta: Todas valuaciones

### Hechos Posteriores al Cierre
- Ajustables: Modifican EECC
- No ajustables: Informar en notas

### Cambios Estimaciones
- Prospectivo: Desde ejercicio corriente
- Ejemplo: Cambio vida útil

### Cambios Criterios Contables
- Retrospectivo: Ajustar ejercicios anteriores
- Ejemplo: Cambio método valuación

### Errores Ejercicios Anteriores
- Corregir: Resultados No Asignados
- No: Resultado ejercicio actual

---

## MEJORES PRÁCTICAS

### Registro Contable
1. Documentar todas operaciones
2. Registrar oportunamente (devengamiento)
3. Separar IVA de base imponible
4. Clasificar correctamente por naturaleza
5. Mantener respaldo comprobantes
6. Conciliar mensualmente
7. Provisionar gastos devengados
8. Devengar gastos anticipados

### Control Interno
1. Segregar funciones
2. Autorizar operaciones significativas
3. Documentar procedimientos
4. Inventarios físicos periódicos
5. Conciliaciones bancarias
6. Arqueos caja sorpresivos
7. Revisión analítica gastos
8. Backup información

### Análisis Financiero
1. Calcular indicadores mensualmente
2. Comparar vs presupuesto
3. Analizar desvíos significativos
4. Proyectar flujos futuros
5. Evaluar estructura capital
6. Monitorear liquidez
7. Gestionar capital trabajo
8. Optimizar costos

### Cumplimiento Fiscal
1. Liquidar impuestos plazo
2. Conservar documentación 10 años
3. Emitir comprobantes legales
4. Realizar retenciones/percepciones
5. Presentar DDJJ oportunamente
6. Mantener registros IVA
7. Documentar operaciones ME
8. Actualizar categorías fiscales

---

## CONTACTO Y ACTUALIZACIONES

**Sistema**: Mosaite
**Versión Manual**: 1.0
**Fecha**: 2024
**Actualizar**: Según cambios normativos

**Normativa a monitorear**:
- Resoluciones Técnicas FACPCE
- Leyes impositivas
- Decretos reglamentarios
- Resoluciones generales AFIP

**Consultas frecuentes**: Revisar sitios oficiales
- AFIP: www.afip.gob.ar
- FACPCE: www.facpce.org.ar
- IGJ: www.argentina.gob.ar/igj

---

## RESUMEN EJECUTIVO

**Total Cuentas**: 189
- Activo Corriente: 24 cuentas
- Activo No Corriente: 36 cuentas
- Pasivo Corriente: 25 cuentas
- Pasivo No Corriente: 7 cuentas
- Patrimonio Neto: 11 cuentas
- Ingresos: 18 cuentas
- Egresos: 68 cuentas

**Estructura**: 5 dígitos (1XXXX-5XXXX)

**Principios Clave**:
1. Devengamiento (no percepción)
2. Partida doble (débito = crédito)
3. IVA separado de base
4. Gastos ≠ Inversiones
5. Depreciar/amortizar activos

**Ecuaciones Fundamentales**:
- Activo = Pasivo + PN
- Resultado = Ingresos - Egresos
- PN = Capital + Reservas + Resultados

**Para RAG**: Cada cuenta tiene metadata completa (tipo, naturaleza, descripción, débitos, créditos, observaciones, ejemplos) para recuperación precisa y contextualizada.