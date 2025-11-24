"""
Mosaite Project Setup & Environment Manager
Punto de acceso principal para lanzar la TUI.
"""

from tui.app import MosaiteApp
import sys

def run_app():
    """Inicia la aplicación TUI."""
    
    # Bucle para manejar el reinicio de la app (ej. al finalizar el setup)
    while True:
        # Añadimos una comprobación de la versión de Python aquí
        if sys.version_info < (3, 11):
            print("Error: Este script requiere Python 3.10 o superior.", file=sys.stderr)
            sys.exit(1)
            
        app = MosaiteApp()
        exit_result = app.run()
        
        # Si la app sale con "RESTART", el bucle continúa.
        if exit_result != "RESTART":
            break # Salir del bucle y terminar el programa

if __name__ == "__main__":
    run_app()