import { useTheme } from "../../context/ThemeContext"
import TransaccionesApp from "./TransaccionCard"

function TransaccionRecientes({ transacciones, plan, onEliminar, onActualizarEstado, onEditar }) {
  const { theme } = useTheme()

  // Handler que NO permite cambiar el estado en esta vista
  const handleActualizarEstadoDisabled = (id, estadoActual) => {
    // No hace nada - el estado no debe cambiar desde TransaccionRecientes
    console.log("Cambio de estado deshabilitado en TransaccionRecientes")
  }

  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Transacciones Recientes</h4>
      <TransaccionesApp
        transacciones={transacciones}
        plan={plan}
        onEliminar={onEliminar}
        onActualizarEstado={handleActualizarEstadoDisabled}
        onEditar={onEditar}
      />
    </div>
  )
}

export default TransaccionRecientes

