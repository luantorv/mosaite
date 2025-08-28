import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar() {
  return (
    <div
      style={{
        background: "#e0e5ec",
        borderRadius: "25px",
        boxShadow: "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff",
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
          background: "#e0e5ec",
          borderRadius: "50%",
          boxShadow: "3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff",
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
        placeholder="Buscar..."
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#555",
          fontSize: "15px",
          width: "100%",
          fontWeight: "400",
        }}
        onFocus={(e) => {
          e.target.parentElement.style.boxShadow = "inset 12px 12px 20px #a3b1c6, inset -12px -12px 20px #ffffff";
        }}
        onBlur={(e) => {
          e.target.parentElement.style.boxShadow = "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff";
        }}
      />
      
      {/* Botón de limpiar */}
      <button
        style={{
          background: "#e0e5ec",
          borderRadius: "50%",
          boxShadow: "3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          fontSize: "14px",
          color: "#666",
          cursor: "pointer",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = "inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff";
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = "3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff";
        }}
        onClick={() => {
          const input = document.querySelector('input[type="text"]');
          if (input) input.value = '';
        }}
      >
        ×
      </button>
    </div>
  );
}

export default SearchBar