import "bootstrap/dist/css/bootstrap.min.css"
import { useTheme } from "../context/ThemeContext"

function SearchBar({ value = "", onChange, onSearch, placeholder = "Buscar...", disabled = false }) {
  const { theme } = useTheme()

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch()
    }
  }

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: "" } })
    }
  }

  return (
    <div
      style={{
        background: theme.background,
        borderRadius: "25px",
        boxShadow: theme.buttonShadowOut,
        padding: "10px 20px",
        width: "100%",
        maxWidth: "500px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Ícono de búsqueda */}
      <div
        style={{
          background: theme.background,
          borderRadius: "50%",
          boxShadow: theme.buttonShadowOut,
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 50 50">
          <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
        </svg>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: theme.textColor,
          fontSize: "15px",
          width: "100%",
          fontWeight: "400",
        }}
        onFocus={(e) => {
          e.target.parentElement.style.boxShadow = theme.cardShadowIn
        }}
        onBlur={(e) => {
          e.target.parentElement.style.boxShadow = theme.cardShadowOut
        }}
      />

      {/* Botón de limpiar */}
      <button
        onClick={handleClear}
        disabled={disabled || !value}
        style={{
          background: theme.background,
          borderRadius: "50%",
          boxShadow: theme.buttonShadowOut,
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          fontSize: "14px",
          color: theme.textColor,
          cursor: disabled || !value ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          flexShrink: 0,
          opacity: disabled || !value ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!disabled && value) {
            e.target.style.boxShadow = theme.cardShadowIn
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = theme.cardShadowOut
        }}
      >
        ×
      </button>
    </div>
  )
}

export default SearchBar
