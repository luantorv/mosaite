import React from "react";
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

function TransaccionCrear() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const hoy = new Date();
  const [fecha, setFecha] = React.useState(
    hoy.toLocaleDateString('en-CA') // formato YYYY-MM-DD
  );

  // const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [entradas, setEntradas] = React.useState([]);
  const [salidas, setSalidas] = React.useState([]);
  const [descripcion, setDescripcion] = React.useState('');
  const [showAccountMenuEntradas, setShowAccountMenuEntradas] = React.useState(false);
  const [showAccountMenuSalidas, setShowAccountMenuSalidas] = React.useState(false);

  // Plan de cuentas simulado
  const plan = [
    [11101, "Caja"],
    [11102, "Banco XX Cuenta Corriente"],
    [11103, "Banco XX Caja de Ahorro"],
    [11104, "Valores a depositar"],
    [11105, "Fondo Fijo"],
    [11201, "Moneda extranjera"],
    [11301, "Documentos a cobrar"],
    [11302, "Deudores por ventas"],
    [11303, "Deudores morosos"],
    [11304, "Deudores en gestión judicial"],
    [11401, "Alquileres pagados por adelantado"],
    [11402, "Gastos pagados por adelantado"],
    [11403, "IVA Crédito Fiscal"],
    [11404, "IVA Saldo a favor"],
    [11501, "Mercaderías"],
    [11502, "Anticipo a proveedores"],

    [12101, "Inmuebles"],
    [12102, "Mauinarias y equipos"],
    [12103, "Rodados"],
    [12104, "Muebles y útiles"],
    [12105, "Instalaciones"],
    [12201, "Patentes"],
    [12202, "Marcas"],
    [12203, "Software"],
    [12204, "Costo de organización"],
    [21101, "Proveedores"],
    [21102, "Documentos a pagar"],
    [21201, "Deudas bancarias a pagar"],
    [21202, "Tarjeta de Crédito XX a pagar"],
    [21301, "Sueldos a pagar"],
    [21302, "Contribuciones sociales a pagar"],
    [21303, "S.A.C. a pagar"],
    [21401, "IVA Débito Fiscal"],
    [21402, "IVA Saldo a pagar"],
    [21403, "Impuestos a pagar"],
    [21404, "Retenciones a pagar"],
    [21501, "Anticipo a clientes"],
    [21601, "Alquileres a pagar"],
    [21602, "Seguros a pagar"],
    [21603, "Comisiones a pagar"],
    [22101, "Deudas comerciales"],
    [22102, "Préstamos"],
    [22103, "Otros pasivos"],
    [31101, "Capital Social"],
    [31102, "Aportes por capitalizar"],
    [31201, "Reserva Legal"],
    [31202, "Reserva Estatutaria"],
    [31203, "Otras reservas"],
    [31301, "Resultados del ejercicio"],
    [31302, "Resultados No Asignados"]
];

  // Función para agregar cuenta a entradas
  const agregarEntrada = (codigo, nombre) => {
    if (!entradas.find(e => e.codigo === codigo)) {
      setEntradas([...entradas, { codigo, nombre, monto: 0 }]);
    }
    setShowAccountMenuEntradas(false);
  };

  // Función para agregar cuenta a salidas
  const agregarSalida = (codigo, nombre) => {
    if (!salidas.find(s => s.codigo === codigo)) {
      setSalidas([...salidas, { codigo, nombre, monto: 0 }]);
    }
    setShowAccountMenuSalidas(false);
  };

  // Función para actualizar monto
  const actualizarMonto = (tipo, codigo, nuevoMonto) => {
    if (tipo === 'entrada') {
      setEntradas(entradas.map(e => 
        e.codigo === codigo 
          ? { ...e, monto: parseFloat(nuevoMonto) || 0 }
          : e
      ).filter(e => e.monto > 0));
    } else {
      setSalidas(salidas.map(s => 
        s.codigo === codigo 
          ? { ...s, monto: parseFloat(nuevoMonto) || 0 }
          : s
      ).filter(s => s.monto > 0));
    }
  };

  // Función para limpiar formulario
  const limpiarFormulario = () => {
    setFecha(new Date().toISOString().split('T')[0]);
    setEntradas([]);
    setSalidas([]);
    setDescripcion('');
  };

  // Función para crear transacción
  const crearTransaccion = () => {
    const totalEntradas = entradas.reduce((sum, e) => sum + e.monto, 0);
    const totalSalidas = salidas.reduce((sum, s) => sum + s.monto, 0);

    if (totalEntradas !== totalSalidas) {
      alert('Error: Las entradas deben ser iguales a las salidas');
      return;
    }

    if (entradas.length === 0 || salidas.length === 0) {
      alert('Error: Debe haber al menos una entrada y una salida');
      return;
    }

    const transaccion = {
      id: Date.now(),
      fecha: fecha,
      Entradas: entradas.map(e => [e.codigo, e.monto]),
      Salidas: salidas.map(s => [s.codigo, s.monto]),
      descripcion: descripcion,
      autor: user?.id || user?.email
    };

    // Guardar en lista de transacciones (simulado)
    console.log('Transacción creada:', transaccion);
    alert('Transacción creada exitosamente');
    limpiarFormulario();
  };

  const totalEntradas = entradas.reduce((sum, e) => sum + e.monto, 0);
  const totalSalidas = salidas.reduce((sum, s) => sum + s.monto, 0);

  return (
    <div>
      <h3 style={{ color: theme.textColor, marginBottom: "25px" }}>Crear Nueva Transacción</h3>
      
      {/* Fecha */}
      <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px" }}>
        <label style={{ color: theme.textColor, fontWeight: "500", minWidth: "60px" }}>
          Fecha:
        </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={{
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || '#ddd'}`,
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: theme.cardShadowIn,
          }}
        />
      </div>

      {/* Columnas Entradas y Salidas */}
      <div className="row">
        {/* Columna Entradas */}
        <div className="col-md-6">
          <div style={{
            background: theme.background,
            borderRadius: "12px",
            boxShadow: theme.cardShadowOut,
            padding: "20px",
            marginRight: "10px"
          }}>
            <h5 style={{ color: theme.textColor, textAlign: "center", marginBottom: "20px" }}>
              Entradas
            </h5>
            
            {/* Lista de entradas */}
            {entradas.map((entrada) => (
              <div key={entrada.codigo} style={{
                background: theme.background,
                borderRadius: "8px",
                boxShadow: theme.cardShadowIn,
                padding: "12px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ color: theme.textColor, fontSize: "14px" }}>
                  {entrada.nombre}
                </span>
                <input
                  type="number"
                  value={entrada.monto}
                  onChange={(e) => actualizarMonto('entrada', entrada.codigo, e.target.value)}
                  placeholder="$0"
                  style={{
                    width: "100px",
                    background: theme.background,
                    color: theme.textColor,
                    border: `1px solid ${theme.border || '#ddd'}`,
                    borderRadius: "4px",
                    padding: "4px 8px",
                    textAlign: "right"
                  }}
                />
              </div>
            ))}

            {/* Botón agregar entrada */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowAccountMenuEntradas(!showAccountMenuEntradas)}
                style={{
                  width: "100%",
                  background: theme.background,
                  border: `2px dashed ${theme.border || '#ddd'}`,
                  borderRadius: "8px",
                  padding: "15px",
                  color: theme.textColorSecondary,
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                +
              </button>

              {/* Menú de cuentas para entradas */}
              {showAccountMenuEntradas && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  right: "0",
                  background: theme.background,
                  borderRadius: "8px",
                  boxShadow: theme.cardShadowOut,
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: `1px solid ${theme.border || '#ddd'}`
                }}>
                  {plan.filter(([codigo]) => !entradas.find(e => e.codigo === codigo)).map(([codigo, nombre]) => (
                    <div
                      key={codigo}
                      onClick={() => agregarEntrada(codigo, nombre)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        color: theme.textColor,
                        fontSize: "14px",
                        borderBottom: `1px solid ${theme.border || '#eee'}`
                      }}
                      onMouseEnter={(e) => e.target.style.background = theme.hoverBackground || 'rgba(0,0,0,0.05)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      {codigo} - {nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: "15px", textAlign: "center", color: theme.textColor, fontWeight: "600" }}>
              Total: ${totalEntradas.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Columna Salidas */}
        <div className="col-md-6">
          <div style={{
            background: theme.background,
            borderRadius: "12px",
            boxShadow: theme.cardShadowOut,
            padding: "20px",
            marginLeft: "10px"
          }}>
            <h5 style={{ color: theme.textColor, textAlign: "center", marginBottom: "20px" }}>
              Salidas
            </h5>
            
            {/* Lista de salidas */}
            {salidas.map((salida) => (
              <div key={salida.codigo} style={{
                background: theme.background,
                borderRadius: "8px",
                boxShadow: theme.cardShadowIn,
                padding: "12px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ color: theme.textColor, fontSize: "14px" }}>
                  {salida.nombre}
                </span>
                <input
                  type="number"
                  value={salida.monto}
                  onChange={(e) => actualizarMonto('salida', salida.codigo, e.target.value)}
                  placeholder="$0"
                  style={{
                    width: "100px",
                    background: theme.background,
                    color: theme.textColor,
                    border: `1px solid ${theme.border || '#ddd'}`,
                    borderRadius: "4px",
                    padding: "4px 8px",
                    textAlign: "right"
                  }}
                />
              </div>
            ))}

            {/* Botón agregar salida */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowAccountMenuSalidas(!showAccountMenuSalidas)}
                style={{
                  width: "100%",
                  background: theme.background,
                  border: `2px dashed ${theme.border || '#ddd'}`,
                  borderRadius: "8px",
                  padding: "15px",
                  color: theme.textColorSecondary,
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                +
              </button>

              {/* Menú de cuentas para salidas */}
              {showAccountMenuSalidas && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  right: "0",
                  background: theme.background,
                  borderRadius: "8px",
                  boxShadow: theme.cardShadowOut,
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: `1px solid ${theme.border || '#ddd'}`
                }}>
                  {plan.filter(([codigo]) => !salidas.find(s => s.codigo === codigo)).map(([codigo, nombre]) => (
                    <div
                      key={codigo}
                      onClick={() => agregarSalida(codigo, nombre)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        color: theme.textColor,
                        fontSize: "14px",
                        borderBottom: `1px solid ${theme.border || '#eee'}`
                      }}
                      onMouseEnter={(e) => e.target.style.background = theme.hoverBackground || 'rgba(0,0,0,0.05)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      {codigo} - {nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: "15px", textAlign: "center", color: theme.textColor, fontWeight: "600" }}>
              Total: ${totalSalidas.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de balance */}
      {(totalEntradas > 0 || totalSalidas > 0) && (
        <div style={{
          marginTop: "20px",
          textAlign: "center",
          padding: "10px",
          borderRadius: "8px",
          background: totalEntradas === totalSalidas ? '#d4edda' : '#f8d7da',
          color: totalEntradas === totalSalidas ? '#155724' : '#721c24'
        }}>
          {totalEntradas === totalSalidas 
            ? '✓ Transacción balanceada' 
            : `⚠ Diferencia: ${Math.abs(totalEntradas - totalSalidas).toFixed(2)}`}
        </div>
      )}

      {/* Descripción */}
      <div style={{ marginTop: "25px" }}>
        <label style={{ color: theme.textColor, fontWeight: "500", display: "block", marginBottom: "10px" }}>
          Descripción
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe aquí..."
          style={{
            width: "100%",
            minHeight: "80px",
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || '#ddd'}`,
            borderRadius: "8px",
            padding: "12px",
            boxShadow: theme.cardShadowIn,
            resize: "vertical",
            fontFamily: "inherit"
          }}
        />
      </div>

      {/* Botones */}
      <div style={{ marginTop: "25px", display: "flex", gap: "15px", justifyContent: "flex-end" }}>
        <button
          onClick={limpiarFormulario}
          style={{
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || '#ddd'}`,
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.boxShadow = theme.cardShadowIn}
          onMouseLeave={(e) => e.target.style.boxShadow = theme.cardShadowOut}
        >
          Limpiar
        </button>
        <button
          onClick={crearTransaccion}
          disabled={totalEntradas !== totalSalidas || entradas.length === 0 || salidas.length === 0}
          style={{
            background: (totalEntradas === totalSalidas && entradas.length > 0 && salidas.length > 0) 
              ? theme.primaryColor 
              : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: (totalEntradas === totalSalidas && entradas.length > 0 && salidas.length > 0) 
              ? "pointer" 
              : "not-allowed",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease"
          }}
        >
          Crear
        </button>
      </div>

      {/* Click outside para cerrar menús */}
      {(showAccountMenuEntradas || showAccountMenuSalidas) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 999,
            background: "transparent",
          }}
          onClick={() => {
            setShowAccountMenuEntradas(false);
            setShowAccountMenuSalidas(false);
          }}
        />
      )}
    </div>
  );
}

export default TransaccionCrear;