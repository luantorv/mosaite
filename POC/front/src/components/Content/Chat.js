import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"

function ChatLLM() {
  const { theme } = useTheme()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simular llamada al backend (vacía por ahora)
    try {
      // Aquí iría la llamada al backend
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simula espera

      // Por ahora no hay respuesta real, solo dejamos el loading
      // En el futuro aquí se agregaría la respuesta del LLM
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
    } finally {
      // Comentar esta línea para que quede cargando indefinidamente
      // setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const chatContainerStyle = {
    backgroundColor: theme.background,
    color: theme.textColor,
    padding: "20px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
  }

  const messageStyle = (role) => ({
    backgroundColor: role === "user" ? theme.primaryColor : theme.hoverBackground,
    color: theme.textColor,
    boxShadow: role === "user" ? theme.cardShadowOut : theme.cardShadowIn,
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "12px",
    maxWidth: "70%",
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    wordWrap: "break-word",
  })

  const inputContainerStyle = {
    backgroundColor: theme.background,
    boxShadow: theme.cardShadowIn,
    borderRadius: "12px",
    padding: "12px",
    display: "flex",
    gap: "10px",
    marginTop: "auto",
  }

  const inputStyle = {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: theme.textColor,
    fontSize: "14px",
    resize: "none",
  }

  const buttonStyle = {
    backgroundColor: theme.primaryColor,
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    cursor: "pointer",
    boxShadow: theme.cardShadowOut,
    fontWeight: "500",
  }

  const loadingDotsStyle = {
    display: "flex",
    gap: "4px",
    padding: "12px 16px",
  }

  const dotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: theme.textColorSecondary,
    animation: "bounce 1.4s infinite ease-in-out both",
  }

  return (
    <div className="container mt-4">
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

      <div style={chatContainerStyle}>
        {/* Área de mensajes */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            marginBottom: "16px",
          }}
        >
          {messages.map((message) => (
            <div key={message.id} style={messageStyle(message.role)}>
              <div
                style={{
                  fontWeight: "500",
                  marginBottom: "4px",
                  fontSize: "12px",
                  opacity: 0.7,
                  color: theme.textColor,
                }}
              >
                {message.role === "user" ? "Tú" : "Asistente"}
              </div>
              <div>{message.content}</div>
            </div>
          ))}

          {/* Indicador de carga */}
          {isLoading && (
            <div style={{ ...messageStyle("assistant"), display: "flex", alignItems: "center" }}>
              <div style={loadingDotsStyle}>
                <div style={{ ...dotStyle }} className="dot-1"></div>
                <div style={{ ...dotStyle }} className="dot-2"></div>
                <div style={{ ...dotStyle }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input de mensaje */}
        <div style={inputContainerStyle}>
          <textarea
            style={inputStyle}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            rows={1}
            disabled={isLoading}
          />
          <button style={buttonStyle} onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatLLM
