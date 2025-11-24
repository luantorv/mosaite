#!/usr/bin/env python3
"""
Script único de prueba del LLM Gateway.
Ejecutar desde services/llm_gateway/ o desde cualquier ubicación.
"""

import sys
import os
from pathlib import Path

# ============================================
# CONFIGURACIÓN AUTOMÁTICA DE PATHS Y ENV
# ============================================

def setup_environment():
    """Configura automáticamente paths y carga variables de entorno"""
    
    # 1. Configurar PYTHONPATH
    script_dir = Path(__file__).resolve().parent
    services_dir = script_dir.parent
    
    if script_dir.name == 'llm_gateway' and services_dir.name == 'services':
        if str(services_dir) not in sys.path:
            sys.path.insert(0, str(services_dir))
            print(f"[Setup] ✓ PYTHONPATH configurado: {services_dir}")
    
    # 2. Buscar y cargar archivo .env
    backend_dir = services_dir.parent if services_dir.name == 'services' else script_dir.parent
    
    possible_env_files = [
        backend_dir / '.env',                    # backend/.env
        script_dir / '.env',                     # llm_gateway/.env
        services_dir / 'llm_gateway' / '.env',   # services/llm_gateway/.env
    ]
    
    # Intentar cargar python-dotenv
    try:
        from dotenv import load_dotenv
        
        for env_path in possible_env_files:
            if env_path.exists():
                load_dotenv(env_path, override=True)
                print(f"[Setup] ✓ Variables cargadas desde: {env_path}")
                
                # Verificar que se cargaron
                api_keys = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'GOOGLE_API_KEY']
                loaded = [key for key in api_keys if os.getenv(key)]
                if loaded:
                    print(f"[Setup] ✓ {len(loaded)} API key(s) detectada(s)")
                
                return True
        
        print("[Setup] ⚠ No se encontró archivo .env")
        return False
        
    except ImportError:
        print("[Setup] ⚠ python-dotenv no instalado")
        print("[Setup]   pip install python-dotenv")
        return False

# Ejecutar configuración
setup_environment()

# ============================================
# IMPORTS DEL GATEWAY
# ============================================

try:
    from llm_gateway import get_gateway, print_configuration_status
    print("[Setup] ✓ Imports del gateway exitosos\n")
except ImportError as e:
    print(f"\n[Error] No se pudo importar llm_gateway: {e}")
    print(f"[Info] Verifica que estás en el directorio correcto")
    sys.exit(1)

# ============================================
# FUNCIONES DE PRUEBA
# ============================================

def test_configuration():
    """Muestra la configuración actual"""
    print("="*60)
    print("CONFIGURACIÓN")
    print("="*60)
    print_configuration_status()

def test_initialization():
    """Prueba la inicialización del gateway"""
    print("\n" + "="*60)
    print("INICIALIZACIÓN DEL GATEWAY")
    print("="*60)
    
    gateway = get_gateway()
    status = gateway.get_status()
    
    print(f"\n✓ Gateway inicializado")
    print(f"Providers disponibles: {status['available_providers']}/{status['total_providers']}")
    
    if status['available_providers'] == 0:
        print("\n⚠ ADVERTENCIA: No hay providers disponibles")
        print("   - Configura al menos una API key en el archivo .env")
        print("   - O asegúrate que el modelo local esté en la ubicación correcta")
        return False, None
    
    print("\nEstado de providers:")
    for provider in status['providers']:
        symbol = "✓" if provider['status'] == 'available' else "✗"
        status_text = provider['status']
        print(f"  {symbol} {provider['provider']:12} : {status_text}")
        if provider['error_message']:
            print(f"      └─ {provider['error_message']}")
    
    return True, gateway

def test_generation(gateway):
    """Prueba la generación de texto"""
    print("\n" + "="*60)
    print("PRUEBA DE GENERACIÓN")
    print("="*60)
    
    prompt = "Di 'Hola' en una sola palabra"
    print(f"\nPrompt: {prompt}")
    print("Generando...\n")
    
    try:
        response = gateway.generate_simple(prompt, max_tokens=10)
        print(f"✓ Respuesta: {response}")
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def interactive_mode(gateway):
    """Modo interactivo para probar el gateway"""
    print("\n" + "="*60)
    print("MODO INTERACTIVO")
    print("="*60)
    print("\nEscribe tus prompts (o 'salir' para terminar)")
    print("Ejemplos:")
    print("  - ¿Qué es Python?")
    print("  - Explica qué es un API")
    print("  - Dame un ejemplo de lista en Python")
    print("-"*60)
    
    while True:
        try:
            user_input = input("\n> ").strip()
            
            if user_input.lower() in ['salir', 'exit', 'quit', 'q']:
                break
            
            if not user_input:
                continue
            
            print("\nGenerando...")
            response = gateway.generate_simple(user_input, max_tokens=200)
            print(f"\n{response}")
            print("-"*60)
            
        except KeyboardInterrupt:
            print("\n\nInterrumpido")
            break
        except Exception as e:
            print(f"\nError: {e}")

# ============================================
# MAIN
# ============================================

def main():
    """Función principal"""
    print("\n" + "="*60)
    print("LLM GATEWAY - TEST COMPLETO")
    print("="*60 + "\n")
    
    # 1. Mostrar configuración
    test_configuration()
    
    # 2. Inicializar gateway
    success, gateway = test_initialization()
    
    if not success:
        print("\n✗ No se pudo inicializar el gateway")
        return 1
    
    # 3. Probar generación
    if test_generation(gateway):
        print("\n✓ Gateway funcionando correctamente")
    else:
        print("\n✗ Error en la generación")
        return 1
    
    # 4. Preguntar si quiere modo interactivo
    print("\n" + "="*60)
    try:
        choice = input("\n¿Entrar al modo interactivo? (s/n): ").strip().lower()
        if choice in ['s', 'si', 'yes', 'y']:
            interactive_mode(gateway)
    except KeyboardInterrupt:
        print()
    
    # 5. Cerrar gateway
    print("\n[Shutdown] Cerrando gateway...")
    gateway.shutdown()
    
    print("\n✓ Test completado exitosamente\n")
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n✗ Interrumpido por el usuario\n")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ Error inesperado: {e}\n")
        import traceback
        traceback.print_exc()
        sys.exit(1)