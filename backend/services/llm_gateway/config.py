import os
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "core"

# Ruta al modelo local
LOCAL_MODEL_PATH = MODEL_DIR / "Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf"

# Configuración de modelos por defecto para cada provider
DEFAULT_MODELS = {
    "openai": "gpt-4o-mini",  # Más económico y rápido
    "anthropic": "claude-3-5-haiku-20241022",  # Rápido y económico
    "google": "gemini-1.5-flash",  # Rápido y económico
}

# Variables de entorno para API keys
API_KEY_ENV_VARS = {
    "openai": "OPENAI_API_KEY",
    "anthropic": "ANTHROPIC_API_KEY",
    "google": "GOOGLE_API_KEY",
}

# Configuración del modelo local
LOCAL_MODEL_CONFIG = {
    "n_ctx": 2048,
    "n_threads": 4,
    "n_batch": 512,
    "use_mlock": True,
}

# Crear directorio del modelo si no existe
MODEL_DIR.mkdir(exist_ok=True, parents=True)


def get_configured_providers() -> dict:
    """
    Verifica qué providers están configurados con API keys.
    
    Returns:
        Dict con información de providers configurados
    """
    configured = {}
    
    for provider, env_var in API_KEY_ENV_VARS.items():
        api_key = os.getenv(env_var)
        configured[provider] = {
            "configured": bool(api_key),
            "env_var": env_var,
            "has_key": bool(api_key),
        }
    
    # Verificar modelo local
    configured["local"] = {
        "configured": LOCAL_MODEL_PATH.exists(),
        "path": str(LOCAL_MODEL_PATH),
        "exists": LOCAL_MODEL_PATH.exists(),
    }
    
    return configured


def print_configuration_status():
    """Imprime el estado de configuración de todos los providers"""
    print("\n=== Estado de Configuración ===")
    providers = get_configured_providers()
    
    for provider, info in providers.items():
        status = "✓" if info["configured"] else "✗"
        print(f"{status} {provider.upper()}: ", end="")
        
        if provider == "local":
            if info["exists"]:
                print(f"Modelo encontrado en {info['path']}")
            else:
                print(f"Modelo no encontrado en {info['path']}")
        else:
            if info["has_key"]:
                print(f"{info['env_var']} configurada")
            else:
                print(f"{info['env_var']} no configurada")
    
    print("===============================\n")
