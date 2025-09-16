import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const TransactionCard = ({ 
  transaction,
  plan = [],
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const { theme } = useTheme();

  // Función para obtener el nombre de la cuenta por código
  const getCuentaNombre = (codigo) => {
    const cuenta = plan.find(([cod, nombre]) => cod === codigo);
    return cuenta ? cuenta[1] : codigo; // Si no encuentra el código, devuelve el código original
  };
  
  // Función para obtener la entrada/salida con mayor monto
  const getMaxAmount = (items) => {
    if (!items || items.length === 0) return ["N/A", 0];
    return items.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
  };
  
  // Función para calcular el total
  const getTotalAmount = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + item[1], 0);
  };
  
  // Función para formatear números
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };
  
  // Compatibilidad con diferentes formatos de datos
  const entradas = transaction.entradas || transaction.Entradas || [];
  const salidas = transaction.salidas || transaction.Salidas || [];
  const autor = transaction.author || transaction.autor || transaction.createdBy || 'N/A';
  

  // Obtener datos para el estado colapsado
  const maxEntrada = getMaxAmount(entradas);
  const maxSalida = getMaxAmount(salidas);
  const totalAmount = getTotalAmount(entradas);

  // Convertir códigos a nombres para mostrar
  const maxEntradaNombre = getCuentaNombre(maxEntrada[0]);
  const maxSalidaNombre = getCuentaNombre(maxSalida[0]);
  
  // Configuración de estados
  const estadoConfig = {
    0: { icon: '🔍', color: '#ffc107', bg: '#fff3cd', label: 'to check' },
    1: { icon: '✓', color: '#17a2b8', bg: '#d1ecf1', label: 'checked' },
    2: { icon: '🔒', color: '#28a745', bg: '#d4edda', label: 'closed' }
  };
  
  const currentEstado = estadoConfig[transaction.estado] || estadoConfig[0];
  const isLocked = transaction.estado === 2;
  
  return (
    <div style={{
      width: '95%',
      margin: '0 auto 16px auto',
      padding: '24px',
      background: theme.background,
      borderRadius: '12px',
      boxShadow: theme.cardShadowOut
    }}>
      {/* Header del componente */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        {/* Parte izquierda - Contenido principal */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flex: 1,
            marginRight: '16px'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span style={{
            marginRight: '8px',
            color: theme.textColorSecondary,
            fontSize: '20px',
            padding: '10px'
          }}>
            {isExpanded ? '▲' : '▼'}
          </span>
          
          {!isExpanded ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <span style={{
                fontSize: '25px',
                fontWeight: '500',
                color: theme.textColor
              }}>
                {maxEntradaNombre}/{maxSalidaNombre} || Monto: {formatCurrency(totalAmount)}
              </span>
              {transaction.descripcion && (
                <span style={{
                  fontSize: '14px',
                  color: theme.textColorSecondary,
                  fontStyle: 'italic'
                }}>
                  {transaction.descripcion}
                </span>
              )}
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              {/* Descripción cuando está expandido */}
              {transaction.descripcion && (
                <div style={{
                  marginBottom: '20px',
                  padding: '12px',
                  background: theme.background || '#f8f9fa',
                  borderRadius: '8px',
                  boxShadow: theme.cardShadowIn
                  //borderLeft: `4px solid ${theme.primary || '#007bff'}`
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: theme.textColor,
                    marginBottom: '4px'
                  }}>
                    Descripción:
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: theme.textColorSecondary,
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {transaction.descripcion}
                  </p>
                </div>
              )}
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px'
              }}>
                {/* Columna de Entradas */}
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: theme.textColor,
                    marginBottom: '12px'
                  }}>
                    Entradas:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {entradas.map(([code, amount], index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ color: theme.textColorSecondary }}>{getCuentaNombre(code)}</span>
                        <span style={{
                          fontWeight: '500',
                          color: '#28a745'
                        }}>
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Columna de Salidas */}
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: theme.textColor,
                    marginBottom: '12px'
                  }}>
                    Salidas:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {salidas.map(([code, amount], index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ color: theme.textColorSecondary }}>{getCuentaNombre(code)}</span>
                        <span style={{
                          fontWeight: '500',
                          color: '#dc3545'
                        }}>
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Parte derecha - Botones e información */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          {/* Botones */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            {/* Botón de estado */}
            <button
              onClick={() => onStatusChange && onStatusChange(transaction)}
              onMouseEnter={() => setHoveredButton('status')}
              onMouseLeave={() => setHoveredButton(null)}
              title={`Estado: ${currentEstado.label}`}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: currentEstado.bg,
                boxShadow: hoveredButton === 'status' ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '20px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {currentEstado.icon}
            </button>
            
            {/* Botón de editar */}
            <button
              onClick={() => onEdit && onEdit(transaction)}
              onMouseEnter={() => setHoveredButton('edit')}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={isLocked}
              title={isLocked ? "No se puede editar (cerrado)" : "Editar transacción"}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: isLocked ? '#f8f9fa' : '#e3f2fd',
                boxShadow: hoveredButton === 'edit' && !isLocked ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '20px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isLocked ? '#adb5bd' : '#007bff'
              }}
            >
              ✏️
            </button>
            
            {/* Botón de borrar */}
            <button
              onClick={() => onDelete && onDelete(transaction)}
              onMouseEnter={() => setHoveredButton('delete')}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={isLocked}
              title={isLocked ? "No se puede eliminar (cerrado)" : "Eliminar transacción"}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: isLocked ? '#f8f9fa' : '#f8d7da',
                boxShadow: hoveredButton === 'delete' && !isLocked ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '20px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isLocked ? '#adb5bd' : '#dc3545'
              }}
            >
              🗑️
            </button>
          </div>
          
          {/* Información adicional cuando está expandido */}
          {isExpanded && (
            <div style={{
              fontSize: '20px',
              color: theme.textColorSecondary,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div>Creado por: {autor}</div>
              <div>Fecha: {transaction.fecha || 'N/A'}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal que maneja la lista de transacciones
const TransaccionesApp = ({ 
  transacciones = [],
  plan =[], 
  onEliminar,
  onActualizarEstado,
  onEditar 
}) => {
  const { theme } = useTheme();
  
  const handleStatusChange = (transaction) => {
    if (onActualizarEstado) {
      // Ciclar entre estados: 0 -> 1 -> 2 -> 0
      const nuevoEstado = (transaction.estado + 1) % 3;
      onActualizarEstado(transaction.id, nuevoEstado);
    }
  };
  
  const handleEdit = (transaction) => {
    if (onEditar) {
      onEditar(transaction);
    } else {
      console.log('Editar transacción:', transaction);
      // Aquí puedes abrir un modal o navegar a la página de edición
    }
  };
  
  const handleDelete = (transaction) => {
    if (onEliminar && window.confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
      onEliminar(transaction.id);
    }
  };
  
  if (!transacciones || transacciones.length === 0) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: theme.textColorSecondary
      }}>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          No hay transacciones para mostrar
        </p>
        <p style={{ fontSize: '14px' }}>
          Las transacciones creadas aparecerán aquí
        </p>
      </div>
    );
  }

  // Ordenar transacciones por fecha de creación (más reciente primero)
  const transaccionesOrdenadas = [...transacciones].sort((a, b) => {
    // Priorizar fechaCreacion, luego fecha, luego por ID (timestamp)
    const fechaA = a.fechaCreacion || a.fecha || a.id || 0;
    const fechaB = b.fechaCreacion || b.fecha || b.id || 0;
    
    // Convertir a timestamp si es string de fecha
    const timestampA = typeof fechaA === 'string' ? new Date(fechaA).getTime() : fechaA;
    const timestampB = typeof fechaB === 'string' ? new Date(fechaB).getTime() : fechaB;
    
    return timestampB - timestampA; // Orden descendente (más reciente primero)
  });
  
  return (
    <div style={{
      background: theme.background,
      minHeight: '200px'
    }}>
      <div style={{
        margin: '0 auto',
        padding: '16px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {transaccionesOrdenadas.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={{
                ...transaction,
                descripcion: transaction.descripcion || transaction.description || ""
              }}
              plan={plan}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransaccionesApp;