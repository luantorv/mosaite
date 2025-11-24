"""
Script principal de consultorIA
Versión modularizada y actualizada para usar llm_gateway
"""

from consultor_service import consultor_service


def main():
    """Función principal de ejemplo"""
    
    # Inicializar servicio
    print("="*60)
    print("CONSULTOR IA - Generador de Consultas SQL")
    print("="*60)
    
    consultor_service.initialize()
    
    # Ejemplos de uso
    preguntas_ejemplo = [
        "¿Cuántos usuarios hay en total?",
        "¿Cuál es el salario promedio de los empleados?",
        "Muestra los 5 productos más vendidos",
    ]
    
    print("\n" + "="*60)
    print("EJEMPLOS DE GENERACIÓN")
    print("="*60)
    
    for pregunta in preguntas_ejemplo:
        print(f"\nPregunta: {pregunta}")
        print("-"*60)
        
        resultado = consultor_service.generar_sql(pregunta)
        
        if resultado['valida']:
            print(f"✓ SQL Generada:\n{resultado['consulta']}")
        else:
            print(f"✗ Error: {resultado['error_usuario']}")
            print(f"   Detalle: {resultado['error_tecnico']}")
    
    # Cerrar servicio
    print("\n" + "="*60)
    consultor_service.shutdown()
    print("Servicio cerrado")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nInterrumpido por el usuario")
    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
