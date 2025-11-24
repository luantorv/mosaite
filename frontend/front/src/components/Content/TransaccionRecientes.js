import React, { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import TransaccionesApp from "./TransaccionCard"
import transactionService from "../../services/TransactionService"

function TransaccionRecientes() {
  const { theme } = useTheme()
  const [transacciones, setTransacciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Cargar transacciones al montar el componente
  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    setLoading(true)
    setError("")
    
    console.log("📥 Cargando transacciones recientes...")
    const result = await transactionService.getRecentTransactions(10)
    
    if (result.success) {
      console.log("✅ Transacciones cargadas:", result.transactions)
      console.log("📊 Primera transacción (para debug):", result.transactions[0])
      setTransacciones(result.transactions)
    } else {
      console.error("❌ Error al cargar transacciones:", result.error)
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleEliminar = async (transId) => {
    console.log("🗑️ Eliminando transacción:", transId)
    
    const result = await transactionService.deleteTransaction(transId)
    
    if (result.success) {
      console.log("✅ Transacción eliminada exitosamente")
      // Actualizar la lista eliminando la transacción
      setTransacciones(transacciones.filter(t => t.trans_id !== transId))
    } else {
      console.error("❌ Error al eliminar:", result.error)
      alert(`Error al eliminar: ${result.error}`)
    }
  }

  const handleActualizarEstado = async (transId) => {
    console.log("🔄 Cambiando estado de transacción:", transId)
    
    const result = await transactionService.toggleTransactionStatus(transId)
    
    if (result.success) {
      console.log("✅ Estado actualizado:", result.transaction)
      // Recargar todas las transacciones para asegurar datos completos
      await loadTransactions()
    } else {
      console.error("❌ Error al actualizar estado:", result.error)
      alert(`Error al actualizar estado: ${result.error}`)
    }
  }

  const handleEditar = (transaction) => {
    console.log("✏️ Editar transacción:", transaction)
    // TODO: Implementar modal de edición o navegar a página de edición
    alert("Funcionalidad de edición en desarrollo")
  }

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        color: theme.textColor,
      }}>
        <div className="text-center">
          <div className="spinner-border mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando transacciones...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h4 style={{ color: theme.textColor, marginBottom: "20px" }}>
          Transacciones Recientes
        </h4>
        <div
          style={{
            padding: "20px",
            background: "#ff4d4f20",
            border: "1px solid #ff4d4f",
            borderRadius: "8px",
            color: "#ff4d4f",
          }}
        >
          Error al cargar transacciones: {error}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h4 style={{ color: theme.textColor, margin: 0 }}>
          Transacciones Recientes
        </h4>
        <button
          onClick={loadTransactions}
          style={{
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || "#ddd"}`,
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = theme.cardShadowIn)}
          onMouseLeave={(e) => (e.target.style.boxShadow = theme.cardShadowOut)}
        >
          🔄 Actualizar
        </button>
      </div>
      
      <TransaccionesApp
        transacciones={transacciones}
        onEliminar={handleEliminar}
        onActualizarEstado={handleActualizarEstado}
        onEditar={handleEditar}
      />
    </div>
  )
}

export default TransaccionRecientes