import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import ChatService from "../../services/ChatService";

function ChatLLM() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState(null);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll automático al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Verificar estado del servicio al montar y cada 10 segundos si está reconstruyendo
  useEffect(() => {
    checkServiceStatus();
    
    const interval = setInterval(() => {
      if (serviceStatus?.is_rebuilding) {
        checkServiceStatus();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [serviceStatus?.is_rebuilding]);

  const checkServiceStatus = async () => {
    const result = await ChatService.getStatus();
    if (result.success) {
      setServiceStatus(result.status);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Generar ID para la petición
    const requestId = `req_${Date.now()}`;
    setCurrentRequestId(requestId);

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Llamar al backend
      const result = await ChatService.query(userMessage.content);

      if (result.success) {
        // Agregar respuesta del asistente
        const assistantMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: result.data.answer,
          timestamp: new Date().toISOString(),
          sources: result.data.sources || [],
          context_used: result.data.context_used,
          response_time: result.data.response_time,
          query_id: result.data.query_id,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Manejar errores
        if (result.unavailable) {
          // Actualizar estado del servicio
          checkServiceStatus();
        }
        
        // Agregar mensaje de error
        const errorMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: result.error || "Lo siento, ocurrió un error al procesar tu pregunta.",
          timestamp: new Date().toISOString(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Error inesperado al comunicarse con el servidor.",
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setCurrentRequestId(null);
    }
  };

  const handleCancelMessage = async () => {
    if (!currentRequestId) return;

    await ChatService.cancelQuery(currentRequestId);
    setIsLoading(false);
    setCurrentRequestId(null);

    // Agregar mensaje de cancelación
    const cancelMessage = {
      id: Date.now(),
      role: "assistant",
      content: "Generación cancelada por el usuario.",
      timestamp: new Date().toISOString(),
      isError: true,
    };
    setMessages((prev) => [...prev, cancelMessage]);
  };

  const handleRebuildIndex = async () => {
    if (!window.confirm(
      "¿Estás seguro de reconstruir el índice?\n\n" +
      "Esto procesará todos los documentos en la carpeta 'data' y creará un nuevo índice de embeddings.\n" +
      "El servicio no estará disponible hasta que finalice (puede tomar varios minutos)."
    )) {
      return;
    }

    const result = await ChatService.rebuildIndex();
    
    if (result.success) {
      alert("✓ Reconstrucción iniciada.\n\nEl servicio estará disponible cuando finalice el proceso.");
      checkServiceStatus();
    } else {
      alert(`✗ Error: ${result.error || "No se pudo iniciar la reconstrucción"}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isServiceAvailable = serviceStatus && serviceStatus.is_available && !serviceStatus.is_rebuilding;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0);
            } 
            40% { 
              transform: scale(1);
            }
          }
          .dot-1 { animation-delay: -0.32s; }
          .dot-2 { animation-delay: -0.16s; }
        `}
      </style>

      {/* Header fijo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexShrink: 0,
        }}
      >
        <h4
          style={{
            color: theme.textColor,
            fontSize: "20px",
            fontWeight: "600",
            margin: 0,
          }}
        >
          Chat - Asistente Contable
        </h4>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Estado del servicio */}
          {serviceStatus && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: theme.textColorMuted,
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isServiceAvailable ? "#4caf50" : "#f44336",
                }}
              />
              <span>
                {serviceStatus.is_rebuilding
                  ? "Reconstruyendo índice..."
                  : serviceStatus.is_available
                  ? `Activo (${serviceStatus.total_vectors} vectores)`
                  : "No disponible"}
              </span>
            </div>
          )}

          {/* Botón de reconstruir (solo para Admin/Profesor) */}
          {user && user.rol === 0 && (
            <button
              onClick={handleRebuildIndex}
              disabled={serviceStatus?.is_rebuilding}
              style={{
                backgroundColor: theme.background,
                color: theme.textColor,
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: serviceStatus?.is_rebuilding ? "not-allowed" : "pointer",
                boxShadow: theme.buttonShadowOut,
                fontSize: "13px",
                fontWeight: "500",
                opacity: serviceStatus?.is_rebuilding ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!serviceStatus?.is_rebuilding) {
                  e.target.style.boxShadow = theme.buttonShadowIn;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = theme.buttonShadowOut;
              }}
            >
              🔄 Reconstruir Índice
            </button>
          )}
        </div>
      </div>

      {/* Banner de servicio no disponible */}
      {!isServiceAvailable && (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          <strong>⚠️ Servicio no disponible</strong>
          <p style={{ margin: "4px 0 0 0" }}>
            {serviceStatus?.is_rebuilding
              ? "El índice se está reconstruyendo. Este proceso puede tomar varios minutos."
              : "El servicio de chat no está disponible en este momento."}
          </p>
        </div>
      )}

      {/* Contenedor del chat */}
      <div
        style={{
          flex: 1,
          backgroundColor: theme.background,
          borderRadius: "16px",
          //boxShadow: theme.cardShadowOut,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Área de mensajes scrolleable */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: theme.textColorMuted,
                padding: "40px 20px",
              }}
            >
              <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                👋 ¡Hola! Soy tu asistente de contabilidad
              </p>
              <p style={{ fontSize: "14px" }}>
                Puedes preguntarme sobre conceptos contables, cuentas, asientos y más.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor: message.isError
                    ? "#ffebee"
                    : message.role === "user"
                    ? theme.primaryColor
                    : theme.hoverBackground,
                  color: message.isError ? "#c62828" : theme.textColor,
                  boxShadow:
                    message.role === "user" ? theme.cardShadowOut : theme.cardShadowIn,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                }}
              >
                <div
                  style={{
                    fontWeight: "500",
                    marginBottom: "4px",
                    fontSize: "12px",
                    opacity: 0.7,
                  }}
                >
                  {message.role === "user" ? "Tú" : "Asistente"} •{" "}
                  {formatTimestamp(message.timestamp)}
                </div>
                <div style={{ whiteSpace: "pre-wrap" }}>{message.content}</div>

                {/* Mostrar fuentes si las hay */}
                {message.sources && message.sources.length > 0 && (
                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: `1px solid ${theme.border || "rgba(0,0,0,0.1)"}`,
                      fontSize: "12px",
                      opacity: 0.8,
                    }}
                  >
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                      Fuentes consultadas:
                    </div>
                    {message.sources.map((source, idx) => (
                      <div key={idx}>
                        • {source.name} (relevancia: {(source.similarity * 100).toFixed(0)}%)
                      </div>
                    ))}
                  </div>
                )}

                {/* Mostrar tiempo de respuesta */}
                {message.response_time && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "11px",
                      opacity: 0.6,
                    }}
                  >
                    Tiempo de respuesta: {message.response_time}s
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Indicador de carga */}
          {isLoading && (
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor: theme.hoverBackground,
                  boxShadow: theme.cardShadowIn,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: "4px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: theme.textColorSecondary,
                      animation: "bounce 1.4s infinite ease-in-out both",
                    }}
                    className="dot-1"
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: theme.textColorSecondary,
                      animation: "bounce 1.4s infinite ease-in-out both",
                    }}
                    className="dot-2"
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: theme.textColorSecondary,
                      animation: "bounce 1.4s infinite ease-in-out both",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input fijo en la parte inferior */}
        <div
          style={{
            backgroundColor: theme.background,
            boxShadow: theme.cardShadowIn,
            borderRadius: "16px",
            padding: "16px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-end",
            }}
          >
            <textarea
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: theme.textColor,
                fontSize: "14px",
                resize: "none",
                minHeight: "24px",
                maxHeight: "120px",
                padding: "8px",
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                !isServiceAvailable
                  ? "Servicio no disponible..."
                  : "Escribe tu pregunta sobre contabilidad..."
              }
              rows={1}
              disabled={isLoading || !isServiceAvailable}
            />

            {/* Botón de cancelar (solo visible cuando está cargando) */}
            {isLoading && (
              <button
                onClick={handleCancelMessage}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  boxShadow: theme.cardShadowOut,
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              >
                ✕ Cancelar
              </button>
            )}

            {/* Botón de enviar */}
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim() || !isServiceAvailable}
              style={{
                backgroundColor: theme.primaryColor,
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor:
                  isLoading || !inputValue.trim() || !isServiceAvailable
                    ? "not-allowed"
                    : "pointer",
                boxShadow: theme.cardShadowOut,
                fontWeight: "500",
                fontSize: "14px",
                opacity:
                  isLoading || !inputValue.trim() || !isServiceAvailable ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && inputValue.trim() && isServiceAvailable) {
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLLM;