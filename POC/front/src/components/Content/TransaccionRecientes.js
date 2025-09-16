import { useTheme } from "../../context/ThemeContext";
import TransaccionesApp from "./TransaccionCard";

function TransaccionRecientes({ transacciones, plan, onEliminar, onActualizarEstado, onEditar }) {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Transacciones Recientes</h4>
      <TransaccionesApp 
        transacciones={transacciones}
        plan={plan}
        onEliminar={onEliminar}
        onActualizarEstado={onActualizarEstado}
        onEditar={onEditar}
      />
    </div>
  );
}

export default TransaccionRecientes;