import React from "react"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"

function TransaccionCrear({ plan, onCrearTransaccion }) {
  const { theme } = useTheme()
  const { user } = useAuth()
  const hoy = new Date()
  const [fecha, setFecha] = React.useState(
    hoy.toLocaleDateString("en-CA"), // formato YYYY-MM-DD
  )

  const [lines, setLines] = React.useState([
    { code: "", debe: 0, haber: 0 }, // Siempre empezamos con una línea vacía
  ])
  const [leyenda, setLeyenda] = React.useState("")
  const [showAccountMenu, setShowAccountMenu] = React.useState(null) // índice de la línea que está mostrando el menú
  const [showUnbalancedModal, setShowUnbalancedModal] = React.useState(false)
  const [diferencia, setDiferencia] = React.useState(0)

  // Filtrar solo cuentas activas (state === 1)
  const cuentasActivas = React.useMemo(() => {
    return plan.filter(([code, name, nature, state]) => state === 1)
  }, [plan])

  const getNombreCuenta = (codigo) => {
    const cuenta = plan.find(([code]) => code === codigo)
    return cuenta ? cuenta[1] : ""
  }

  const agregarLinea = () => {
    setLines([...lines, { code: "", debe: 0, haber: 0 }])
  }

  const seleccionarCuenta = (index, codigo) => {
    const newLines = [...lines]
    newLines[index].code = codigo
    setLines(newLines)
    setShowAccountMenu(null)
  }

  const actualizarMonto = (index, campo, valor) => {
    const newLines = [...lines]
    const nuevoValor = Number.parseFloat(valor) || 0

    if (campo === "debe") {
      newLines[index].debe = nuevoValor
      if (nuevoValor > 0) {
        newLines[index].haber = 0
      }
    } else {
      newLines[index].haber = nuevoValor
      if (nuevoValor > 0) {
        newLines[index].debe = 0
      }
    }

    setLines(newLines)
  }

  const eliminarLinea = (index) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index))
    }
  }

  const limpiarFormulario = () => {
    setFecha(new Date().toISOString().split("T")[0])
    setLines([{ code: "", debe: 0, haber: 0 }])
    setLeyenda("")
  }

  const crearTransaccion = () => {
    const lineasValidas = lines.filter((line) => line.code && (line.debe > 0 || line.haber > 0))

    if (lineasValidas.length === 0) {
      alert("Error: Debe haber al menos una línea con cuenta y monto")
      return
    }

    const totalDebe = lineasValidas.reduce((sum, line) => sum + line.debe, 0)
    const totalHaber = lineasValidas.reduce((sum, line) => sum + line.haber, 0)

    const diff = Math.abs(totalDebe - totalHaber)
    if (diff > 0.01) {
      setDiferencia(diff)
      setShowUnbalancedModal(true)
      return
    }

    const lineaInvalida = lineasValidas.find((line) => line.debe > 0 && line.haber > 0)
    if (lineaInvalida) {
      alert("Error: Una línea no puede tener valores en Debe y Haber al mismo tiempo")
      return
    }

    guardarTransaccion(lineasValidas)
  }

  const guardarTransaccion = (lineasValidas) => {
    const transaccion = {
      id: Date.now(),
      fecha: fecha,
      lines: lineasValidas.map((line) => [line.code, line.debe, line.haber]),
      leyenda: leyenda,
      autor: user?.name || user?.email,
      estado: 0, // 0 = Para verificar, 1 = Verificada
    }

    if (onCrearTransaccion) {
      const transaccionCreada = onCrearTransaccion(transaccion)
      console.log("Transacción creada:", transaccionCreada)
      alert("Transacción creada exitosamente")
      limpiarFormulario()
      setShowUnbalancedModal(false)
    } else {
      console.warn("No se proporcionó onCrearTransaccion prop")
      alert("Error: No se pudo guardar la transacción")
    }
  }

  const confirmarTransaccionDesbalanceada = () => {
    const lineasValidas = lines.filter((line) => line.code && (line.debe > 0 || line.haber > 0))
    guardarTransaccion(lineasValidas)
  }

  const totalDebe = lines.reduce((sum, line) => sum + line.debe, 0)
  const totalHaber = lines.reduce((sum, line) => sum + line.haber, 0)
  const estaBalanceado = Math.abs(totalDebe - totalHaber) < 0.01

  const linesSorted = [...lines].sort((a, b) => {
    const aEsDebe = a.haber === 0 && a.debe >= 0
    const bEsDebe = b.haber === 0 && b.debe >= 0
    if (aEsDebe && !bEsDebe) return -1
    if (!aEsDebe && bEsDebe) return 1
    return 0
  })

  return (
    <div>
      <h4 style={{ color: theme.textColor, marginBottom: "25px" }}>Crear Nueva Transacción</h4>

      <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px" }}>
        <label style={{ color: theme.textColor, fontWeight: "500", minWidth: "60px" }}>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={{
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || "#ddd"}`,
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: theme.cardShadowIn,
          }}
        />
      </div>

      <div
        style={{
          background: theme.background,
          borderRadius: "12px",
          boxShadow: theme.cardShadowOut,
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 150px 150px 40px",
            gap: "10px",
            marginBottom: "15px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${theme.border || "#ddd"}`,
          }}
        >
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Código</div>
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Nombre</div>
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Debe</div>
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Haber</div>
          <div></div>
        </div>

        {linesSorted.map((line, index) => {
          const originalIndex = lines.findIndex((l) => l === line)
          const nombreCuenta = getNombreCuenta(line.code)
          const esHaber = line.haber > 0 || (line.haber === 0 && line.debe === 0)

          return (
            <div
              key={originalIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 150px 150px 40px",
                gap: "10px",
                marginBottom: "10px",
                alignItems: "center",
                background: theme.background,
                borderRadius: "8px",
                boxShadow: theme.cardShadowIn,
                padding: "12px",
              }}
            >
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowAccountMenu(showAccountMenu === originalIndex ? null : originalIndex)}
                  style={{
                    width: "100%",
                    background: theme.background,
                    color: line.code ? theme.textColor : theme.textColorSecondary,
                    border: `1px solid ${theme.border || "#ddd"}`,
                    borderRadius: "4px",
                    padding: "8px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {line.code || "---"}
                </button>

                {showAccountMenu === originalIndex && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      minWidth: "300px",
                      background: theme.background,
                      borderRadius: "8px",
                      boxShadow: theme.cardShadowOut,
                      zIndex: 1000,
                      maxHeight: "250px",
                      overflowY: "auto",
                      border: `1px solid ${theme.border || "#ddd"}`,
                      marginTop: "5px",
                    }}
                  >
                    {cuentasActivas.map(([codigo, nombre]) => (
                      <div
                        key={codigo}
                        onClick={() => seleccionarCuenta(originalIndex, codigo)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          color: theme.textColor,
                          fontSize: "14px",
                          borderBottom: `1px solid ${theme.border || "#eee"}`,
                        }}
                        onMouseEnter={(e) => (e.target.style.background = theme.hoverBackground || "rgba(0,0,0,0.05)")}
                        onMouseLeave={(e) => (e.target.style.background = "transparent")}
                      >
                        {codigo} - {nombre}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                style={{
                  color: theme.textColor,
                  fontSize: "14px",
                  textAlign: esHaber ? "right" : "left",
                  paddingLeft: esHaber ? "0" : "10px",
                  paddingRight: esHaber ? "10px" : "0",
                }}
              >
                {nombreCuenta}
              </div>

              <input
                type="number"
                value={line.debe || ""}
                onChange={(e) => actualizarMonto(originalIndex, "debe", e.target.value)}
                placeholder="0.00"
                disabled={line.haber > 0}
                style={{
                  background: line.haber > 0 ? theme.background : theme.background,
                  color: theme.textColor,
                  border: `1px solid ${theme.border || "#ddd"}`,
                  borderRadius: "4px",
                  padding: "8px",
                  textAlign: "right",
                  opacity: line.haber > 0 ? 0.5 : 1,
                }}
              />

              <input
                type="number"
                value={line.haber || ""}
                onChange={(e) => actualizarMonto(originalIndex, "haber", e.target.value)}
                placeholder="0.00"
                disabled={line.debe > 0}
                style={{
                  background: line.debe > 0 ? theme.background : theme.background,
                  color: theme.textColor,
                  border: `1px solid ${theme.border || "#ddd"}`,
                  borderRadius: "4px",
                  padding: "8px",
                  textAlign: "right",
                  opacity: line.debe > 0 ? 0.5 : 1,
                }}
              />

              <button
                onClick={() => eliminarLinea(originalIndex)}
                disabled={lines.length === 1}
                style={{
                  background: "transparent",
                  border: "none",
                  color: lines.length === 1 ? "#ccc" : "#dc3545",
                  cursor: lines.length === 1 ? "not-allowed" : "pointer",
                  fontSize: "18px",
                  padding: "0",
                }}
              >
                ×
              </button>
            </div>
          )
        })}

        <button
          onClick={agregarLinea}
          style={{
            width: "100%",
            background: theme.background,
            border: `2px dashed ${theme.border || "#ddd"}`,
            borderRadius: "8px",
            padding: "15px",
            color: theme.textColorSecondary,
            fontSize: "24px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "10px",
          }}
        >
          +
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 150px 150px 40px",
            gap: "10px",
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: `2px solid ${theme.border || "#ddd"}`,
          }}
        >
          <div></div>
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "right" }}>Totales:</div>
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "right", paddingRight: "8px" }}>
            ${totalDebe.toFixed(2)}
          </div>
          <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "right", paddingRight: "8px" }}>
            ${totalHaber.toFixed(2)}
          </div>
          <div></div>
        </div>
      </div>

      {(totalDebe > 0 || totalHaber > 0) && (
        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
            padding: "10px",
            borderRadius: "8px",
            background: estaBalanceado ? "#d4edda" : "#f8d7da",
            color: estaBalanceado ? "#155724" : "#721c24",
          }}
        >
          {estaBalanceado
            ? "✓ Transacción balanceada"
            : `⚠ Diferencia: $${Math.abs(totalDebe - totalHaber).toFixed(2)}`}
        </div>
      )}

      <div style={{ marginBottom: "25px" }}>
        <label style={{ color: theme.textColor, fontWeight: "500", display: "block", marginBottom: "10px" }}>
          Leyenda
        </label>
        <textarea
          value={leyenda}
          onChange={(e) => setLeyenda(e.target.value)}
          placeholder="Escribe aquí..."
          style={{
            width: "100%",
            minHeight: "80px",
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || "#ddd"}`,
            borderRadius: "8px",
            padding: "12px",
            boxShadow: theme.cardShadowIn,
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
        <button
          onClick={limpiarFormulario}
          style={{
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || "#ddd"}`,
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = theme.cardShadowIn)}
          onMouseLeave={(e) => (e.target.style.boxShadow = theme.cardShadowOut)}
        >
          Limpiar
        </button>
        <button
          onClick={crearTransaccion}
          disabled={totalDebe === 0}
          style={{
            background: totalDebe > 0 ? theme.primaryColor : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: totalDebe > 0 ? "pointer" : "not-allowed",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease",
          }}
        >
          Crear
        </button>
      </div>

      {showUnbalancedModal && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9998,
            }}
            onClick={() => setShowUnbalancedModal(false)}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: theme.background,
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              padding: "30px",
              zIndex: 9999,
              minWidth: "400px",
              maxWidth: "500px",
            }}
          >
            <h5 style={{ color: theme.textColor, marginBottom: "20px", fontSize: "20px" }}>
              ⚠️ Transacción Desbalanceada
            </h5>
            <p style={{ color: theme.textColor, marginBottom: "15px", lineHeight: "1.6" }}>
              La transacción tiene una diferencia de <strong>${diferencia.toFixed(2)}</strong> entre el Debe y el Haber.
            </p>
            <p style={{ color: theme.textColorSecondary, marginBottom: "25px", fontSize: "14px" }}>
              Podrás crear la transacción, pero deberás hacer las correcciones necesarias posteriormente.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowUnbalancedModal(false)}
                style={{
                  background: theme.background,
                  color: theme.textColor,
                  border: `2px solid ${theme.border || "#ddd"}`,
                  borderRadius: "8px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  boxShadow: theme.cardShadowOut,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarTransaccionDesbalanceada}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  boxShadow: theme.cardShadowOut,
                }}
              >
                Crear de todas formas
              </button>
            </div>
          </div>
        </>
      )}

      {showAccountMenu !== null && (
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
          onClick={() => setShowAccountMenu(null)}
        />
      )}
    </div>
  )
}

export default TransaccionCrear