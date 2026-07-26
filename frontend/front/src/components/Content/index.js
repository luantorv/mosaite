import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import DashboardHome from "./DashboardHome"
import TransaccionCrear from "./TransaccionCrear"
import TransaccionEditar from "./TransaccionEditar"
import TransaccionRecientes from "./TransaccionRecientes"
import TransaccionBuscar from "./TransaccionBuscar"
import LibroDiarioCrear from "./LibroDiarioCrear"
import LibroDiarioRecientes from "./LibroDiarioRecientes"
import CuentaCrear from "./CuentaCrear"
import UsuariosLista from "./UsuariosLista"
import Configuracion from "./Configuracion"
import ChatLLM from "./Chat"
import transactionService from "../../services/TransactionService"

function Content({ activePanel, searchQuery, setSearchQuery }) {
  const { theme } = useTheme()
  const { user } = useAuth()

  const [transacciones, setTransacciones] = useState([])
  const [loadingTransactions, setLoadingTransactions] = useState(false)
  const [transaccionEnEdicion, setTransaccionEnEdicion] = useState(null)

  // Cargar todas las transacciones al montar
  useEffect(() => {
    loadAllTransactions()
  }, [])

  const loadAllTransactions = async () => {
    setLoadingTransactions(true)
    console.log("📥 Cargando todas las transacciones...")
    
    const result = await transactionService.getTransactions()
    
    if (result.success) {
      console.log("✅ Transacciones cargadas:", result.transactions.length)
      console.log("📊 Primera transacción (para debug en búsqueda):", result.transactions[0])
      setTransacciones(result.transactions)
    } else {
      console.error("❌ Error al cargar transacciones:", result.error)
    }
    
    setLoadingTransactions(false)
  }

  // Callback cuando se crea una transacción en TransaccionCrear
  const handleTransaccionCreada = (nuevaTransaccion) => {
    console.log("✅ Nueva transacción creada:", nuevaTransaccion)
    // Agregar al inicio de la lista
    setTransacciones([nuevaTransaccion, ...transacciones])
  }

  const eliminarTransaccion = async (transId) => {
    console.log("🗑️ Eliminando transacción:", transId)
    
    const result = await transactionService.deleteTransaction(transId)
    
    if (result.success) {
      console.log("✅ Transacción eliminada")
      setTransacciones(transacciones.filter(t => t.trans_id !== transId))
    } else {
      console.error("❌ Error al eliminar:", result.error)
      alert(`Error al eliminar: ${result.error}`)
    }
  }

  const actualizarEstadoTransaccion = async (transId) => {
    console.log("🔄 Cambiando estado de transacción:", transId)
    
    const result = await transactionService.toggleTransactionStatus(transId)
    
    if (result.success) {
      console.log("✅ Estado actualizado:", result.transaction)
      setTransacciones(transacciones.map(t => 
        t.trans_id === transId ? result.transaction : t
      ))
    } else {
      console.error("❌ Error al actualizar estado:", result.error)
      alert(`Error al actualizar estado: ${result.error}`)
    }
  }

  const editarTransaccion = (transaction) => {
    console.log("✏️ Editar transacción:", transaction)
    setTransaccionEnEdicion(transaction)
  }

  const handleTransaccionActualizada = (transaccionActualizada) => {
    console.log("✅ Transacción actualizada:", transaccionActualizada)
    setTransacciones((prev) =>
      prev.map((t) => (t.trans_id === transaccionActualizada.trans_id ? transaccionActualizada : t))
    )
  }

  const renderContent = () => {
    switch (activePanel) {
      case "Dashboard":
        return <DashboardHome />

      case "Transacciones-Crear":
        return <TransaccionCrear onTransaccionCreada={handleTransaccionCreada} />
        
      case "Transacciones-Recientes":
        return (
          <TransaccionRecientes
            onEliminar={eliminarTransaccion}
            onActualizarEstado={actualizarEstadoTransaccion}
            onEditar={editarTransaccion}
          />
        )
        
      case "Transacciones-Buscar":
        return (
          <TransaccionBuscar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            transacciones={transacciones}
            loadingTransactions={loadingTransactions}
            onEliminar={eliminarTransaccion}
            onActualizarEstado={actualizarEstadoTransaccion}
            onEditar={editarTransaccion}
          />
        )

      case "Libros Diarios-Crear":
        return <LibroDiarioCrear />

      case "Libros Diarios-Recientes":
        return <LibroDiarioRecientes />

      case "Plan de Cuentas":
        return <CuentaCrear />

      case "Usuarios":
        return <UsuariosLista />

      case "Configuración":
        return <Configuracion />

      case "Ayuda":
        return <ChatLLM />

      default:
        return <DashboardHome />
    }
  }

  return (
    <div
      style={{
        background: theme.background,
        padding: "25px",
        height: "100%",
        marginTop: "20px",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "15px",
        boxSizing: "border-box",
      }}
    >
      {renderContent()}

      {transaccionEnEdicion && (
        <TransaccionEditar
          transaction={transaccionEnEdicion}
          onClose={() => setTransaccionEnEdicion(null)}
          onUpdated={handleTransaccionActualizada}
        />
      )}
    </div>
  )
}

export default Content