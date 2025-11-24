from textual.app import App
from textual.binding import Binding
from textual.widgets import Static

# Importamos desde nuestros módulos
from .constants import CSS_FILE
from .logic import ProjectConfig
from .screens import (
    DependencyCheckScreen,
    SetupScreen,
    EnvironmentConfigScreen,
    DjangoSetupScreen,
    MainMenuScreen,
    SelectEnvironmentScreen,
    RunProjectScreen
    # Los modales no necesitan registrarse aquí
)

class MosaiteApp(App):
    """
    La aplicación TUI principal para gestionar el proyecto Mosaite.
    """
    
    # 1. Definir el archivo CSS usando la ruta absoluta
    CSS_PATH = str(CSS_FILE)
    
    # 2. Registrar todas las pantallas
    SCREENS = {
        "check_deps": DependencyCheckScreen,
        "setup": SetupScreen,
        "config_env": EnvironmentConfigScreen,
        "django_setup": DjangoSetupScreen,
        "main_menu": MainMenuScreen,
        "select_env": SelectEnvironmentScreen,
        "run_project": RunProjectScreen,
    }
    
    # 3. Definir los bindings globales
    BINDINGS = [
        Binding("ctrl+c", "quit", "Quit", priority=True)
    ]
    
    def __init__(self):
        """Inicializa la app y carga la configuración."""
        super().__init__()
        self.config = ProjectConfig()
    
    def on_mount(self) -> None:
        """Decide qué pantalla mostrar al inicio."""
        if self.config.config.get("setup_completed", False):
            env_name = self.config.config.get("current_env")
            if env_name:
                self.config.set_current_env(env_name)
            self.push_screen(MainMenuScreen(self.config))
        else:
            self.push_screen(DependencyCheckScreen())

    def on_screen_resume(self, screen) -> None:
        """Actualiza el label del entorno actual en el menú."""
        if isinstance(screen, MainMenuScreen):
            current_env = self.config.config.get('current_env', 'Ninguno')
            try:
                env_display = screen.query_one("#current-env", Static)
                env_display.update(f"Entorno actual: {current_env}")
            except Exception:
                pass # La pantalla podría no estar completamente montada