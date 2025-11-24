import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme, isLight, isDark } = useTheme();

  return (
    <div
      style={{
        background: theme.background,
        borderRadius: "20px",
        boxShadow: theme.buttonShadowOut,
        padding: "4px",
        transition: "all 0.3s ease",
      }}
    >
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "60px",
          height: "34px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        
        {/* Background del switch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDark ? "#1a252f" : "#87CEEB",
            transition: "0.4s",
            borderRadius: "34px",
            overflow: "hidden",
            boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {/* Slider (Sol/Luna) */}
          <div
            style={{
              position: "absolute",
              height: "26px",
              width: "26px",
              left: "4px",
              bottom: "4px",
              backgroundColor: isDark ? "#f0f0f0" : "#FFD700",
              transition: "0.4s",
              borderRadius: "50%",
              transform: isDark ? "translateX(26px)" : "translateX(0)",
              boxShadow: isDark 
                ? "0 2px 6px rgba(0,0,0,0.3)" 
                : "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
          >
            {/* Cráteres de la luna */}
            {isDark && (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "3px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    transition: "0.4s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "2px",
                    top: "10px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    transition: "0.4s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "18px",
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    transition: "0.4s",
                  }}
                />
              </>
            )}

            {/* Rayos de sol */}
            {isLight && (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: "-8px",
                    top: "-8px",
                    width: "43px",
                    height: "43px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    transition: "0.4s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "-13px",
                    top: "-13px",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 215, 0, 0.05)",
                    transition: "0.4s",
                  }}
                />
              </>
            )}
          </div>

          {/* Estrellas para el modo oscuro */}
          <div
            style={{
              transform: isDark ? "translateY(0)" : "translateY(-32px)",
              opacity: isDark ? 1 : 0,
              transition: "0.4s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                width: "4px",
                height: "4px",
                backgroundColor: "white",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                animation: "star-twinkle 2s infinite",
                animationDelay: "0.3s",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "6px",
                width: "3px",
                height: "3px",
                backgroundColor: "white",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                animation: "star-twinkle 2s infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "22px",
                left: "18px",
                width: "3px",
                height: "3px",
                backgroundColor: "white",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                animation: "star-twinkle 2s infinite",
                animationDelay: "0.6s",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "4px",
                left: "22px",
                width: "4px",
                height: "4px",
                backgroundColor: "white",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                animation: "star-twinkle 2s infinite",
                animationDelay: "1.3s",
              }}
            />
          </div>

          {/* Nubes para el modo claro */}
          <div
            style={{
              transform: isLight ? "translateY(0)" : "translateY(32px)",
              opacity: isLight ? 0.6 : 0,
              transition: "0.4s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "8px",
                width: "12px",
                height: "6px",
                backgroundColor: "white",
                borderRadius: "10px",
                animation: "cloud-float 3s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "18px",
                right: "12px",
                width: "8px",
                height: "4px",
                backgroundColor: "white",
                borderRadius: "10px",
                animation: "cloud-float 3s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />
          </div>
        </div>
      </label>

      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes cloud-float {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}

export default ThemeToggle;