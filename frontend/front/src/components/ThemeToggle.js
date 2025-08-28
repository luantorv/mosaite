import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    /*<div
      style={{
        background: "#e0e5ec",
        borderRadius: "20px",
        boxShadow: "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff",
        padding: "10px",
        display: "inline-block",
      }}
    >*/
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "60px",
          height: "34px",
        }}
      >
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDarkMode ? "black" : "#2196f3",
            transition: "0.4s",
            zIndex: 0,
            overflow: "hidden",
            borderRadius: "34px",
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "26px",
              width: "26px",
              left: "4px",
              bottom: "4px",
              backgroundColor: isDarkMode ? "white" : "yellow",
              transition: "0.4s",
              borderRadius: "50%",
              transform: isDarkMode ? "translateX(26px)" : "translateX(0)",
              animation: isDarkMode ? "rotate-center 0.6s ease-in-out both" : "none",
            }}
          >
            {/* Moon dots */}
            <svg
              viewBox="0 0 100 100"
              style={{
                left: "10px",
                top: "3px",
                position: "absolute",
                width: "6px",
                height: "6px",
                zIndex: 4,
                opacity: isDarkMode ? 1 : 0,
                transition: "0.4s",
                fill: "gray",
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
            <svg
              viewBox="0 0 100 100"
              style={{
                left: "2px",
                top: "10px",
                position: "absolute",
                width: "10px",
                height: "10px",
                zIndex: 4,
                opacity: isDarkMode ? 1 : 0,
                transition: "0.4s",
                fill: "gray",
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
            <svg
              viewBox="0 0 100 100"
              style={{
                left: "16px",
                top: "18px",
                position: "absolute",
                width: "3px",
                height: "3px",
                zIndex: 4,
                opacity: isDarkMode ? 1 : 0,
                transition: "0.4s",
                fill: "gray",
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>

            {/* Light rays */}
            <svg
              viewBox="0 0 100 100"
              style={{
                left: "-8px",
                top: "-8px",
                position: "absolute",
                width: "43px",
                height: "43px",
                zIndex: -1,
                fill: "white",
                opacity: isDarkMode ? 0 : "10%",
                transition: "0.4s",
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
            <svg
              viewBox="0 0 100 100"
              style={{
                left: "-50%",
                top: "-50%",
                position: "absolute",
                width: "55px",
                height: "55px",
                zIndex: -1,
                fill: "white",
                opacity: isDarkMode ? 0 : "10%",
                transition: "0.4s",
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
            <svg
              viewBox="0 0 100 100"
              style={{
                left: "-18px",
                top: "-18px",
                position: "absolute",
                width: "60px",
                height: "60px",
                zIndex: -1,
                fill: "white",
                opacity: isDarkMode ? 0 : "10%",
                transition: "0.4s",
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>

          {/* Stars */}
          <div
            style={{
              transform: isDarkMode ? "translateY(0)" : "translateY(-32px)",
              opacity: isDarkMode ? 1 : 0,
              transition: "0.4s",
            }}
          >
            <svg
              viewBox="0 0 20 20"
              style={{
                fill: "white",
                position: "absolute",
                transition: "0.4s",
                width: "20px",
                top: "2px",
                left: "3px",
                animation: "star-twinkle 2s infinite",
                animationDelay: "0.3s",
              }}
            >
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg
              viewBox="0 0 20 20"
              style={{
                fill: "white",
                position: "absolute",
                transition: "0.4s",
                width: "6px",
                top: "16px",
                left: "3px",
                animation: "star-twinkle 2s infinite",
              }}
            >
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg
              viewBox="0 0 20 20"
              style={{
                fill: "white",
                position: "absolute",
                transition: "0.4s",
                width: "12px",
                top: "20px",
                left: "10px",
                animation: "star-twinkle 2s infinite",
                animationDelay: "0.6s",
              }}
            >
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg
              viewBox="0 0 20 20"
              style={{
                fill: "white",
                position: "absolute",
                transition: "0.4s",
                width: "18px",
                top: "0px",
                left: "18px",
                animation: "star-twinkle 2s infinite",
                animationDelay: "1.3s",
              }}
            >
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          </div>
        </div>
      </label>

      //{/* CSS animations as style tag */}
      /*<style jsx>{`
        @keyframes rotate-center {
          0% { transform: translateX(26px) rotate(0deg); }
          100% { transform: translateX(26px) rotate(360deg); }
        }
        
        @keyframes star-twinkle {
          0% { transform: scale(1); }
          40% { transform: scale(1.2); }
          80% { transform: scale(0.8); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>*/
  );
}

export default ThemeToggle