# apps/accounts/data/plan_cuentas_inicial.py
"""
Plan de cuentas inicial para el sistema
Format: [code, name, nature, status]
- nature: 0 = Deudor, 1 = Acreedor
- status: 0 = Inactiva, 1 = Activa
"""

PLAN_CUENTAS_INICIAL = [
    # Activo Corriente - Disponibilidades
    [11101, "Caja MN", 0, 1],
    [11102, "Caja ME", 0, 1],
    [11103, "Banco Cuenta Corriente", 0, 1],
    [11104, "Banco Caja de Ahorro", 0, 1],
    [11105, "Recaudaciones a Depositar", 0, 1],
    [11106, "Fondos Fijos", 0, 1],
    
    # Activo Corriente - Créditos
    [11201, "Deudores por Ventas", 0, 1],
    [11202, "Documentos a Cobrar", 0, 1],
    [11203, "Tarjetas de Crédito a Cobrar", 0, 1],
    [11204, "Cheques de Terceros en Cartera", 0, 1],
    [11205, "Cheques Diferidos", 0, 1],
    [11206, "Previsión para Deudores Incobrables", 1, 1],
    
    # Activo Corriente - Otros Créditos
    [11301, "Anticipos a Proveedores", 0, 1],
    [11302, "Anticipos al Personal", 0, 1],
    [11303, "Deudores Varios", 0, 1],
    [11304, "Préstamos al Personal", 0, 1],
    [11305, "IVA Crédito Fiscal", 0, 1],
    [11306, "Percepciones de IVA", 0, 1],
    [11307, "Retenciones de IVA", 0, 1],
    [11308, "Saldos a Favor Impositivos", 0, 1],
    [11309, "Gastos Pagados por Adelantado", 0, 1],
    
    # Activo Corriente - Bienes de Cambio
    [11401, "Mercaderías", 0, 1],
    [11402, "Mercaderías en Tránsito", 0, 1],
    [11403, "Materias Primas", 0, 1],
    [11404, "Materiales", 0, 1],
    [11405, "Productos en Proceso", 0, 1],
    [11406, "Productos Terminados", 0, 1],
    [11407, "Previsión para Desvalorización", 1, 1],
    
    # Activo Corriente - Inversiones
    [11501, "Plazos Fijos", 0, 1],
    [11502, "Acciones", 0, 1],
    [11503, "Títulos Públicos", 0, 1],
    [11504, "Fondos Comunes de Inversión", 0, 1],
    
    # Activo No Corriente - Bienes de Uso
    [12101, "Terrenos", 0, 1],
    [12102, "Edificios", 0, 1],
    [12103, "Instalaciones", 0, 1],
    [12104, "Maquinarias", 0, 1],
    [12105, "Equipos", 0, 1],
    [12106, "Rodados", 0, 1],
    [12107, "Muebles y Útiles", 0, 1],
    [12108, "Equipos de Computación", 0, 1],
    [12109, "Herramientas", 0, 1],
    
    # Depreciaciones Acumuladas
    [12201, "Depreciación Acum. Edificios", 1, 1],
    [12202, "Depreciación Acum. Instalaciones", 1, 1],
    [12203, "Depreciación Acum. Maquinarias", 1, 1],
    [12204, "Depreciación Acum. Equipos", 1, 1],
    [12205, "Depreciación Acum. Rodados", 1, 1],
    [12206, "Depreciación Acum. Muebles y Útiles", 1, 1],
    [12207, "Depreciación Acum. Equipos de Computación", 1, 1],
    [12208, "Depreciación Acum. Herramientas", 1, 1],
    
    # Activos Intangibles
    [12301, "Marcas", 0, 1],
    [12302, "Patentes", 0, 1],
    [12303, "Licencias", 0, 1],
    [12304, "Software", 0, 1],
    [12305, "Llave de Negocio", 0, 1],
    [12306, "Gastos de Organización", 0, 1],
    [12307, "Gastos de Desarrollo", 0, 1],
    
    # Amortizaciones Acumuladas
    [12401, "Amortización Acum. Marcas", 1, 1],
    [12402, "Amortización Acum. Patentes", 1, 1],
    [12403, "Amortización Acum. Licencias", 1, 1],
    [12404, "Amortización Acum. Software", 1, 1],
    [12405, "Amortización Acum. Llave de Negocio", 1, 1],
    [12406, "Amortización Acum. Gastos de Organización", 1, 1],
    
    # Otras Inversiones
    [12501, "Inversiones en Sociedades Vinculadas", 0, 1],
    [12502, "Inversiones en Otras Sociedades", 0, 1],
    [12503, "Inmuebles para Renta", 0, 1],
    
    # Otros Activos No Corrientes
    [12601, "Depósitos en Garantía", 0, 1],
    [12602, "Créditos a Largo Plazo", 0, 1],
    
    # Pasivo Corriente - Deudas Comerciales
    [21101, "Proveedores", 1, 1],
    [21102, "Documentos a Pagar", 1, 1],
    [21103, "Tarjetas de Crédito a Pagar", 1, 1],
    [21104, "Acreedores Varios", 1, 1],
    
    # Pasivo Corriente - Deudas Fiscales
    [21201, "IVA Débito Fiscal", 1, 1],
    [21202, "IVA a Pagar", 1, 1],
    [21203, "Impuesto a las Ganancias a Pagar", 1, 1],
    [21204, "Ingresos Brutos a Pagar", 1, 1],
    [21205, "Retenciones de IVA a Depositar", 1, 1],
    [21206, "Percepciones de IVA a Depositar", 1, 1],
    [21207, "Otros Impuestos a Pagar", 1, 1],
    
    # Pasivo Corriente - Deudas Sociales
    [21301, "Sueldos a Pagar", 1, 1],
    [21302, "Cargas Sociales a Pagar", 1, 1],
    [21303, "Aportes y Contribuciones a Depositar", 1, 1],
    [21304, "Retenciones al Personal a Depositar", 1, 1],
    [21305, "Provisión SAC", 1, 1],
    [21306, "Provisión Vacaciones", 1, 1],
    
    # Pasivo Corriente - Deudas Financieras
    [21401, "Préstamos Bancarios", 1, 1],
    [21402, "Descubiertos Bancarios", 1, 1],
    [21403, "Tarjetas de Crédito Empresariales", 1, 1],
    [21404, "Intereses a Pagar", 1, 1],
    
    # Pasivo Corriente - Otras Deudas
    [21501, "Anticipos de Clientes", 1, 1],
    [21502, "Dividendos a Pagar", 1, 1],
    [21503, "Honorarios Directorio a Pagar", 1, 1],
    [21504, "Acreedores Varios", 1, 1],
    
    # Pasivo No Corriente
    [22101, "Préstamos Bancarios Largo Plazo", 1, 1],
    [22102, "Obligaciones Negociables", 1, 1],
    [22103, "Documentos a Pagar Largo Plazo", 1, 1],
    
    # Previsiones
    [22201, "Previsión para Juicios", 1, 1],
    [22202, "Previsión para Indemnizaciones", 1, 1],
    [22203, "Previsión para Garantías", 1, 1],
    [22204, "Otras Previsiones", 1, 1],
    
    # Patrimonio Neto - Capital
    [31101, "Capital Suscripto", 1, 1],
    [31102, "Capital Integrado", 1, 1],
    [31103, "Aportes Irrevocables a Cuenta de Futuras Suscripciones", 1, 1],
    
    # Patrimonio Neto - Ajustes
    [31201, "Ajuste por Revalúo Técnico", 1, 1],
    [31202, "Diferencias de Conversión", 1, 1],
    
    # Patrimonio Neto - Reservas
    [31301, "Reserva Legal", 1, 1],
    [31302, "Reserva Estatutaria", 1, 1],
    [31303, "Reserva Facultativa", 1, 1],
    [31304, "Reserva por Revalúo", 1, 1],
    
    # Patrimonio Neto - Resultados
    [31401, "Resultados No Asignados", 1, 1],
    [31402, "Resultados de Ejercicios Anteriores", 1, 1],
    [31501, "Resultado del Ejercicio", 1, 1],
    
    # Ingresos Operativos
    [41101, "Ventas de Mercaderías", 1, 1],
    [41102, "Ventas de Productos Manufacturados", 1, 1],
    [41103, "Servicios Prestados", 1, 1],
    [41104, "Devoluciones de Ventas", 0, 1],
    [41105, "Bonificaciones sobre Ventas", 0, 1],
    [41106, "Descuentos sobre Ventas", 0, 1],
    
    # Otros Ingresos
    [41201, "Intereses Ganados", 1, 1],
    [41202, "Descuentos Obtenidos", 1, 1],
    [41203, "Recupero de Créditos Incobrables", 1, 1],
    [41204, "Alquileres Ganados", 1, 1],
    [41205, "Regalías Ganadas", 1, 1],
    [41206, "Comisiones Ganadas", 1, 1],
    
    # Resultados Financieros y por Tenencia
    [41301, "Diferencias de Cambio Positivas", 1, 1],
    [41302, "Resultado por Exposición a la Inflación (REI) Positivo", 1, 1],
    
    # Ingresos Extraordinarios
    [42101, "Resultado por Venta de Bienes de Uso", 1, 1],
    [42102, "Resultado por Venta de Inversiones", 1, 1],
    [42103, "Recupero de Previsiones", 1, 1],
    [42104, "Ingresos Extraordinarios Varios", 1, 1],
    
    # Costo de Ventas
    [51101, "Costo de Mercaderías Vendidas", 0, 1],
    [51102, "Costo de Productos Manufacturados Vendidos", 0, 1],
    [51103, "Costo de Servicios Prestados", 0, 1],
    
    # Gastos de Comercialización
    [52101, "Sueldos y Jornales Ventas", 0, 1],
    [52102, "Cargas Sociales Ventas", 0, 1],
    [52103, "Comisiones sobre Ventas", 0, 1],
    [52104, "Publicidad y Propaganda", 0, 1],
    [52105, "Fletes y Acarreos", 0, 1],
    [52106, "Gastos de Distribución", 0, 1],
    [52107, "Gastos de Representación", 0, 1],
    
    # Gastos de Administración - Personal
    [53101, "Sueldos y Jornales Administración", 0, 1],
    [53102, "Cargas Sociales Administración", 0, 1],
    [53103, "Indemnizaciones", 0, 1],
    [53104, "Capacitación Personal", 0, 1],
    [53105, "Ropa de Trabajo", 0, 1],
    [53106, "Medicina Laboral", 0, 1],
    
    # Gastos de Administración - Honorarios y Servicios
    [53201, "Honorarios Profesionales", 0, 1],
    [53202, "Honorarios Directorio", 0, 1],
    [53203, "Servicios de Limpieza", 0, 1],
    [53204, "Servicios de Vigilancia", 0, 1],
    [53205, "Servicios de Mantenimiento", 0, 1],
    
    # Gastos de Administración - Servicios Públicos
    [53301, "Energía Eléctrica", 0, 1],
    [53302, "Gas", 0, 1],
    [53303, "Agua", 0, 1],
    [53304, "Teléfono", 0, 1],
    [53305, "Internet", 0, 1],
    [53306, "Servicio de Correo", 0, 1],
    
    # Gastos de Administración - Alquileres
    [53401, "Alquileres de Inmuebles", 0, 1],
    [53402, "Alquileres de Equipos", 0, 1],
    [53403, "Leasing", 0, 1],
    
    # Gastos de Administración - Impuestos
    [53501, "Impuesto Inmobiliario", 0, 1],
    [53502, "Impuesto a los Débitos y Créditos", 0, 1],
    [53503, "Ingresos Brutos", 0, 1],
    [53504, "Tasas Municipales", 0, 1],
    [53505, "Otros Impuestos", 0, 1],
    
    # Gastos de Administración - Seguros
    [53601, "Seguros sobre Bienes de Uso", 0, 1],
    [53602, "Seguros sobre Mercaderías", 0, 1],
    [53603, "Seguros de Responsabilidad Civil", 0, 1],
    [53604, "Seguros de Vida Obligatorio (ART)", 0, 1],
    
    # Gastos de Administración - Depreciaciones y Amortizaciones
    [53701, "Depreciación Bienes de Uso", 0, 1],
    [53702, "Amortización Activos Intangibles", 0, 1],
    
    # Gastos de Administración - Varios
    [53801, "Papelería y Útiles", 0, 1],
    [53802, "Impresos y Formularios", 0, 1],
    [53803, "Artículos de Limpieza", 0, 1],
    [53804, "Gastos de Movilidad", 0, 1],
    [53805, "Gastos de Representación", 0, 1],
    [53806, "Refrigerios y Cafetería", 0, 1],
    [53807, "Suscripciones y Publicaciones", 0, 1],
    
    # Gastos de Administración - Otros
    [53901, "Gastos Bancarios", 0, 1],
    [53902, "Gastos de Cobranza", 0, 1],
    [53903, "Deudores Incobrables", 0, 1],
    [53904, "Donaciones", 0, 1],
    
    # Resultados Financieros y por Tenencia Negativos
    [54101, "Intereses Pagados", 0, 1],
    [54102, "Comisiones Bancarias", 0, 1],
    [54103, "Gastos Bancarios", 0, 1],
    [54104, "Diferencias de Cambio Negativas", 0, 1],
    [54105, "Resultado por Exposición a la Inflación (REI) Negativo", 0, 1],
    [54106, "Descuentos Concedidos", 0, 1],
    
    # Gastos Extraordinarios
    [55101, "Baja de Bienes de Uso", 0, 1],
    [55102, "Pérdidas Extraordinarias", 0, 1],
    [55103, "Siniestros", 0, 1],
    [55104, "Pérdidas por Juicios", 0, 1],
]