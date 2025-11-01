# tui/screens.py

import subprocess
import os
import urllib.request
from urllib.error import URLError, HTTPError
import socket
from typing import Optional, Dict, List

from textual.app import ComposeResult
from textual.containers import Container, Horizontal, Vertical, VerticalScroll
from textual.widgets import Header, Footer, Button, Static, Input, Label, Select, Log
from textual.binding import Binding
from textual.screen import Screen, ModalScreen
from textual import work

# Importamos desde nuestros módulos
from .constants import (
    PROJECT_ROOT, BACKEND_DIR, FRONTEND_DIR,
    IS_WINDOWS, LLM_DOWNLOAD_URL, LLM_FILE_NAME, 
    LLM_DEST_DIR, LLM_DEST_PATH
)
from .logic import ProjectConfig, DependencyChecker, get_os_name

def get_lan_ip() -> str:
    """
    Intenta encontrar la dirección IP local (LAN) de la máquina.
    Se conecta a un DNS público (no envía datos) para forzar al OS
    a elegir la interfaz de red correcta.
    """
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # Conectar a una IP externa (no tiene que ser alcanzable)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1" # Fallback a localhost si no hay conexión
    finally:
        try:
            s.close()
        except NameError:
            pass # Si la 's' no se creó por un error
    return ip


# --- PANTALLA DE CHEQUEO DE DEPENDENCIAS ---
class DependencyCheckScreen(Screen):
    """
    Pantalla de verificación de dependencias.
    Bloquea si una dependencia falta.
    Advierte si la versión es incorrecta pero permite continuar.
    """
    BINDINGS = [
        Binding("q", "quit", "Quit"),
        Binding("c", "continue_setup", "Continue"),
    ]
    
    def __init__(self):
        """Inicializa la pantalla de chequeo."""
        super().__init__()
        self.checks_done = False
        self.all_found = False # Flag para saber si se encontraron (aunque la versión sea errónea)

    def compose(self) -> ComposeResult:
        """Dibuja la interfaz de la pantalla."""
        yield Header()
        yield Container(
            Static("🔍 Verificando Dependencias del Sistema", classes="title"),
            Static("... chequeando Python ...", id="python-check", classes="check-item"),
            Static("... chequeando NodeJS ...", id="nodejs-check", classes="check-item"),
            Static("... chequeando TeXLive ...", id="texlive-check", classes="check-item"),
            Static("", id="status-msg", classes="status"),
            Horizontal(
                Button("Continuar", variant="primary", id="continue-btn", disabled=True),
                Button("Salir", variant="default", id="quit-btn"),
                classes="button-row"
            ),
            id="dep-container"
        )
        yield Footer()
    
    def on_mount(self):
        """Al montar la pantalla, inicia el chequeo en un worker y pone el título del contenedor."""
        # Se establece el título del borde usando el ID del contenedor
        self.query_one("#dep-container").border_title = "Chequeo de Dependencias"
        self.check_dependencies()
    
    @work(exclusive=True)
    async def check_dependencies(self):
        """
        Ejecuta los chequeos y actualiza la UI.
        Distingue entre 'no encontrado' (error) y 'versión incorrecta' (warning).
        """
        py_ok, py_ver, py_req = DependencyChecker.check_python()
        self.update_check("python-check", "Python", py_ok, py_ver, py_req)
        
        node_ok, node_ver, node_req = DependencyChecker.check_nodejs()
        self.update_check("nodejs-check", "NodeJS", node_ok, node_ver, node_req)
        
        tex_ok, tex_ver, tex_req = DependencyChecker.check_texlive()
        self.update_check("texlive-check", "TeXLive", tex_ok, tex_ver, tex_req)
        
        # Verificar si todas las dependencias están *instaladas*
        deps_status = [
            ("Python", py_ver != "Not found"),
            ("NodeJS", node_ver != "Not found"),
            ("TeXLive", tex_ver != "Not found"),
        ]
        self.all_found = all(found for _, found in deps_status)
        
        # Verificar si todas las versiones son *correctas*
        all_correct_version = py_ok and node_ok and tex_ok
        
        status = self.query_one("#status-msg", Static)
        continue_btn = self.query_one("#continue-btn", Button)
        
        if not self.all_found:
            missing = [name for name, found in deps_status if not found]
            status.update(f"❌ Error: Faltan dependencias: {', '.join(missing)}. \nDebes instalarlas para continuar.")
            continue_btn.disabled = True # Bloquear
        
        elif not all_correct_version:
            status.update("⚠️  Advertencia: Algunas dependencias tienen versiones diferentes. \nPuedes continuar, pero el proyecto podría no funcionar.")
            continue_btn.disabled = False # Permitir
            
        else:
            status.update("✅ Todas las dependencias están correctas.")
            continue_btn.disabled = False # Permitir

        self.checks_done = True
    
    def update_check(self, widget_id: str, name: str, is_ok: bool, current: str, required: str):
        """Actualiza un widget de chequeo con el icono correcto (❌, ⚠️, ✅)."""
        widget = self.query_one(f"#{widget_id}", Static)
        
        if current == "Not found":
            icon = "❌" # Error (Faltante)
            msg = f"{icon} {name}: {current} (requerido: {required})"
        elif is_ok:
            icon = "✅" # Éxito
            msg = f"{icon} {name}: {current}"
        else:
            icon = "⚠️" # Advertencia (Versión incorrecta)
            msg = f"{icon} {name}: {current} (requerido: {required})"
            
        widget.update(msg)
    
    def on_button_pressed(self, event: Button.Pressed):
        """Maneja los clics de los botones."""
        if event.button.id == "continue-btn":
            if self.checks_done and self.all_found:
                self.app.push_screen(SetupScreen())
        elif event.button.id == "quit-btn":
            self.app.exit()
    
    def action_continue_setup(self):
        """Binding 'c' para continuar (si es permitido)."""
        if self.checks_done and self.all_found:
            self.app.push_screen(SetupScreen())
    
    def action_quit(self):
        """Binding 'q' para salir."""
        self.app.exit()


# --- PANTALLA DE SETUP (CON DESCARGA LLM) ---
class SetupScreen(Screen):
    """
    Pantalla de instalación inicial (venv, pip, npm, LLM).
    """
    BINDINGS = [Binding("q", "quit", "Quit")]
    
    def compose(self) -> ComposeResult:
        """Añade un widget para el progreso de descarga."""
        yield Header()
        yield Container(
            Static("⚙️  Instalación del Proyecto Mosaite", classes="title"),
            Log(id="setup-log", auto_scroll=True),
            # Widget para la barra de progreso de descarga
            Static("", id="download-progress", classes="progress-bar"), 
            Static("", id="setup-status"),
            Horizontal(
                Button("Iniciar Instalación", variant="primary", id="start-btn"),
                Button("Saltar", variant="default", id="skip-btn"),
                classes="button-row"
            ),
            id="setup-container"
        )
        yield Footer()
    
    def on_button_pressed(self, event: Button.Pressed):
        if event.button.id == "start-btn":
            event.button.disabled = True
            self.query_one("#skip-btn", Button).disabled = True
            self.run_setup()
        elif event.button.id == "skip-btn":
            self.app.push_screen(EnvironmentConfigScreen())

    def on_mount(self):
        """Al montar la pantalla, establece el título del contenedor."""
        self.query_one("#setup-container").border_title = "Instalación"
        # Esto es importante para el fix del progress-bar de la pregunta anterior
        self.query_one("#download-progress").remove_class("-active")
    
    @work(exclusive=True)
    async def run_setup(self):
        """Ejecuta todos los pasos de instalación en orden."""
        log = self.query_one("#setup-log", Log)
        status = self.query_one("#setup-status", Static)
        progress_widget = self.query_one("#download-progress", Static)
        
        python_cmd = "python" if IS_WINDOWS else "python3"
        pip_cmd = str(PROJECT_ROOT / "venv" / ("Scripts" if IS_WINDOWS else "bin") / "pip")
        
        log.write_line(f"🖥️  Sistema operativo detectado: {get_os_name()}")
        log.write_line(f"📁 Directorio del proyecto: {PROJECT_ROOT}")
        
        # --- 1. Crear Venv ---
        log.write_line("\n📦 Creando entorno virtual de Python...")
        result = await self.run_command([python_cmd, "-m", "venv", "venv"])
        if result: log.write_line("✅ Entorno virtual creado")
        else:
            log.write_line("❌ Error creando entorno virtual")
            status.update("❌ Setup fallido")
            return
        
        # --- 2. Instalar Pip ---
        requirements_file = BACKEND_DIR / "requirements.txt"
        if requirements_file.exists():
            log.write_line("\n📥 Instalando dependencias de Python (backend)...")
            result = await self.run_command([pip_cmd, "install", "-r", str(requirements_file)])
            if result: log.write_line("✅ Dependencias de Python instaladas")
            else: log.write_line("⚠️  Advertencia: Error instalando dependencias de Python")
        
        # --- 3. Instalar NPM ---
        if FRONTEND_DIR.exists() and (FRONTEND_DIR / "package.json").exists():
            log.write_line("\n📥 Instalando dependencias de NodeJS (frontend)...")
            result = await self.run_command(["npm", "install"], cwd=str(FRONTEND_DIR))
            if result: log.write_line("✅ Dependencias de NodeJS instaladas")
            else: log.write_line("⚠️  Advertencia: Error instalando dependencias de NodeJS")

        # --- 4. Descargar Modelo LLM ---
        log.write_line(f"\n🧠 Descargando modelo LLM ({LLM_FILE_NAME})...")
        log.write_line("   (Esto puede tardar varios minutos dependiendo de tu conexión)")
        
        try:
            LLM_DEST_DIR.mkdir(parents=True, exist_ok=True)
            log.write_line(f"   Destino: {LLM_DEST_DIR}")
        except Exception as e:
            log.write_line(f"❌ Error creando directorio de destino: {e}")
            status.update("❌ Setup fallido (Error de directorio LLM)")
            return

        download_ok = await self.download_model_with_progress(log, progress_widget)
        
        if download_ok:
            log.write_line(f"✅ Modelo LLM descargado exitosamente.")
            progress_widget.update("✅ Descarga completada")
        else:
            log.write_line(f"⚠️  Advertencia: Error al descargar el modelo LLM. El consultor IA no funcionará.")
            progress_widget.update("❌ Error de descarga")
        
        # --- 5. Finalizar ---
        status.update("✅ Instalación completada")
        log.write_line("\n🎉 ¡Setup completado! Continuando a configuración de entornos...")
        
        self.set_timer(2, lambda: self.app.push_screen(EnvironmentConfigScreen()))
    
    async def run_command(self, cmd: List[str], cwd: Optional[str] = None) -> bool:
        """Helper para ejecutar comandos de shell."""
        try:
            process = await self.run_worker(
                subprocess.run,
                cmd,
                capture_output=True,
                text=True,
                cwd=cwd or str(PROJECT_ROOT)
            )
            return process.returncode == 0
        except Exception as e:
            return False

    @work(thread=True)
    async def download_model_with_progress(self, log: Log, progress_widget: Static) -> bool:
        """
        Descarga el archivo LLM usando urllib y reporta el progreso.
        Se ejecuta en un hilo de worker para no bloquear la UI.
        """
        
        # Función de callback para reportar el progreso
        def reporthook(block_num, block_size, total_size):
            downloaded = block_num * block_size
            if total_size > 0:
                percent = downloaded * 100 / total_size
                # Barra de progreso (50 caracteres de ancho)
                progress_blocks = int(percent / 2) 
                bar = "█" * progress_blocks + " " * (50 - progress_blocks)
                # MB descargados
                downloaded_mb = downloaded / (1024 * 1024)
                total_mb = total_size / (1024 * 1024)
                
                # Actualiza la UI de forma segura desde el hilo
                self.app.call_from_thread(
                    progress_widget.update, 
                    f"[{bar}] {percent:.1f}% ({downloaded_mb:.1f} / {total_mb:.1f} MB)"
                )

        try:
            # Comprobar si el archivo ya existe para saltar la descarga
            if LLM_DEST_PATH.exists():
                self.app.call_from_thread(log.write_line, "   ... el modelo ya existe. Saltando descarga.")
                return True
                
            # Iniciar la descarga
            urllib.request.urlretrieve(
                LLM_DOWNLOAD_URL, 
                LLM_DEST_PATH, 
                reporthook
            )
            return True
        except HTTPError as e:
            self.app.call_from_thread(log.write_line, f"   Error HTTP: {e.code} {e.reason} (URL: {LLM_DOWNLOAD_URL})")
            return False
        except URLError as e:
            self.app.call_from_thread(log.write_line, f"   Error de URL (¿Sin conexión?): {e.reason}")
            return False
        except Exception as e:
            # Captura cualquier otro error (ej. permisos de escritura)
            self.app.call_from_thread(log.write_line, f"   Error inesperado en descarga: {e}")
            return False
    
    def action_quit(self):
        self.app.exit()


# --- MODALES DE GESTIÓN DE ENTORNOS ---
class ConfirmDeleteModal(ModalScreen):
    """Modal para confirmar la eliminación de un entorno."""
    
    def __init__(self, name_to_delete: str):
        super().__init__()
        self.name_to_delete = name_to_delete
        self.name = f"Modal para borrar {name_to_delete}"

    def compose(self) -> ComposeResult:
        with Vertical(classes="modal-container"):
            yield Static(f"¿Eliminar el entorno '{self.name_to_delete}'?", classes="title-warning")
            yield Static("Esto no borrará los archivos de la carpeta, solo la configuración del proyecto.")
            yield Horizontal(
                Button("Borrar", variant="error", id="delete-btn"),
                Button("Cancelar", variant="default", id="cancel-btn"),
                classes="button-row"
            )
    
    def on_button_pressed(self, event: Button.Pressed):
        """Devuelve True si se confirma el borrado, False si se cancela."""
        if event.button.id == "delete-btn":
            self.dismiss(True)
        elif event.button.id == "cancel-btn":
            self.dismiss(False)

class RenameEnvironmentModal(ModalScreen):
    """Modal para renombrar un entorno."""
    
    def __init__(self, old_name: str):
        super().__init__()
        self.old_name = old_name
        self.name = f"Modal para renombrar {old_name}"
    
    def compose(self) -> ComposeResult:
        with Vertical(classes="modal-container"):
            yield Static(f"Renombrar entorno: '{self.old_name}'", classes="title")
            yield Label("Nuevo nombre:")
            yield Input(value=self.old_name, id="new-name-input")
            yield Horizontal(
                Button("Renombrar", variant="primary", id="rename-btn"),
                Button("Cancelar", variant="default", id="cancel-btn"),
                classes="button-row"
            )
    
    def on_mount(self):
        """Pone el foco en el Input al abrir."""
        self.query_one(Input).focus()

    def on_button_pressed(self, event: Button.Pressed):
        """Devuelve el nuevo nombre si se confirma, o None si se cancela."""
        if event.button.id == "rename-btn":
            new_name = self.query_one(Input).value.strip()
            if new_name:
                self.dismiss(new_name)
            else:
                self.notify("El nombre no puede estar vacío", severity="error")
        elif event.button.id == "cancel-btn":
            self.dismiss(None)


# --- PANTALLA DE GESTIÓN DE ENTORNOS ---
class EnvironmentConfigScreen(Screen):
    """
    Pantalla de configuración de entornos (Crear, Renombrar, Borrar).
    """
    BINDINGS = [Binding("escape", "back", "Volver al Menú")]
    
    def __init__(self):
        super().__init__()
        self.config = ProjectConfig()
    
    def compose(self) -> ComposeResult:
        """Dibuja la pantalla con secciones separadas para Crear y Gestionar."""
        yield Header()
        yield VerticalScroll(
            Static("🗂️  Gestión de Entornos de Datos", classes="title"),
            
            # --- Sección de Creación ---
            Static("Crear Nuevo Entorno", classes="subtitle"),
            Label("Nombre del entorno:"),
            Input(placeholder="produccion, desarrollo, testing...", id="env-name"),
            Label("Ruta de datos:"),
            Input(placeholder="/ruta/absoluta/a/carpeta/datos", id="data-path"),
            Horizontal(
                Button("Crear Entorno", variant="primary", id="create-env-btn"),
                classes="button-row"
            ),

            # --- Sección de Gestión ---
            Static("\n📋 Gestionar Entornos Existentes:", classes="subtitle"),
            Select(
                options=[("", "")], # Se llenará en on_mount
                id="env-select-list", 
                allow_blank=True, 
                prompt="Selecciona un entorno para gestionar..."
            ),
            Horizontal(
                Button("Renombrar Seleccionado", variant="warning", id="rename-env-btn"),
                Button("Borrar Seleccionado", variant="error", id="delete-env-btn"),
                classes="button-row-spaced"
            ),

            # --- Botón de Continuar (ahora es "Volver") ---
            Horizontal(
                Button("Volver al Menú", variant="success", id="continue-btn"),
                classes="button-row"
            ),
            id="env-container"
        )
        yield Footer()
    
    def on_mount(self):
        """Al montar, actualiza la lista del Select y establece el título."""
        self.query_one("#env-container").border_title = "Gestión de Entornos"
        self.refresh_env_list()
    
    def refresh_env_list(self):
        """Actualiza el widget Select con la lista de entornos."""
        env_select = self.query_one("#env-select-list", Select)
        current_value = env_select.value
        env_options = []
        
        if not self.config.config["environments"]:
            env_options.append(("No hay entornos configurados", None))
            env_select.disabled = True
            self.query_one("#rename-env-btn").disabled = True
            self.query_one("#delete-env-btn").disabled = True
        else:
            env_options = [(name, name) for name in self.config.config["environments"].keys()]
            env_select.disabled = False
            self.query_one("#rename-env-btn").disabled = False
            self.query_one("#delete-env-btn").disabled = False
        
        env_select.set_options(env_options)
        
        if current_value in self.config.config["environments"]:
            env_select.value = current_value
        else:
            env_select.value = None

    def on_button_pressed(self, event: Button.Pressed):
        """Maneja los nuevos botones de Crear, Renombrar, Borrar y Volver."""
        if event.button.id == "create-env-btn":
            self.create_environment()
        elif event.button.id == "continue-btn":
            self.app.pop_screen()
        elif event.button.id == "rename-env-btn":
            self.on_rename_pressed()
        elif event.button.id == "delete-env-btn":
            self.on_delete_pressed()
    
    def create_environment(self):
        """
        (MODIFICADO)
        Crea un nuevo entorno, lo establece como activo y 
        empuja al usuario a la pantalla de setup de Django.
        """
        name_input = self.query_one("#env-name", Input)
        path_input = self.query_one("#data-path", Input)
        
        name = name_input.value.strip()
        base_data_path = path_input.value.strip()
        
        if not name or not base_data_path:
            self.notify("Completa todos los campos", severity="error")
            return
            
        if name in self.config.config["environments"]:
            self.notify(f"Error: El entorno '{name}' ya existe", severity="error")
            return
        
        try:
            # 1. Crear las carpetas
            data_dir = os.path.expanduser(base_data_path)
            full_data_path = os.path.join(data_dir, "MosaiteData")
            pdf_dir = os.path.join(full_data_path, "pdfs")

            os.makedirs(full_data_path, exist_ok=True)
            os.makedirs(pdf_dir, exist_ok=True)
            
            # 2. Guardar la configuración
            self.config.add_environment(name, full_data_path)
            
            # 3. Establecer el entorno recién creado como activo
            self.config.set_current_env(name) 
            
            # 4. Notificar y empujar a la pantalla de inicialización
            self.notify(f"✅ Entorno '{name}' creado. Ahora debes inicializarlo.", severity="information")
            
            # Limpiar los inputs para cuando volvamos
            name_input.value = ""
            path_input.value = ""
            
            # (El refresh_env_list() se ejecutará cuando el usuario vuelva a esta pantalla)
            
            # 5. Ir a la pantalla de Setup de Django
            # Pasamos la config para asegurar que la pantalla usa la instancia correcta
            self.app.push_screen(DjangoSetupScreen(self.config)) 
            
            # --------------------------
            
        except Exception as e:
            self.notify(f"Error al crear directorios: {str(e)}", severity="error")
            
    def on_rename_pressed(self):
        """Llama al modal de renombrar para el entorno seleccionado."""
        selected_env = self.query_one("#env-select-list", Select).value
        if not selected_env:
            self.notify("Selecciona un entorno para renombrar", severity="warning")
            return
        
        def handle_rename(new_name: Optional[str]):
            if new_name:
                if self.config.rename_environment(str(selected_env), new_name):
                    self.notify(f"✅ Entorno renombrado a '{new_name}'")
                    self.refresh_env_list()
                    self.query_one("#env-select-list", Select).value = new_name
                else:
                    self.notify(f"❌ Error: El nombre '{new_name}' ya existe o hubo un error", severity="error")
        
        self.app.push_screen(RenameEnvironmentModal(str(selected_env)), handle_rename)

    def on_delete_pressed(self):
        """Llama al modal de confirmación de borrado."""
        selected_env = self.query_one("#env-select-list", Select).value
        if not selected_env:
            self.notify("Selecciona un entorno para borrar", severity="warning")
            return
            
        def handle_delete(confirmed: bool):
            if confirmed:
                if self.config.delete_environment(str(selected_env)):
                    self.notify(f"✅ Entorno '{selected_env}' eliminado")
                    self.refresh_env_list()
                else:
                    self.notify(f"❌ Error al eliminar el entorno", severity="error")
        
        self.app.push_screen(ConfirmDeleteModal(str(selected_env)), handle_delete)

    def action_back(self):
        """Binding 'escape' para volver al menú."""
        self.app.pop_screen()


# --- MODALES DE DJANGO ---
class CreateSuperUserModal(ModalScreen):
    """
    Modal para crear un superusuario de Django de forma no interactiva.
    """
    def __init__(self, config: ProjectConfig):
        super().__init__()
        self.config = config

    def compose(self) -> ComposeResult:
        with Vertical(classes="modal-container"):
            yield Static("👤 Crear Superusuario", classes="title")
            yield Label("Nombre de usuario:")
            yield Input(id="username")
            yield Label("Email (opcional):")
            yield Input(id="email")
            yield Label("Contraseña:")
            yield Input(password=True, id="password")
            yield Horizontal(
                Button("Crear", variant="primary", id="create-btn"),
                Button("Cancelar", variant="default", id="cancel-btn"),
                classes="button-row"
            )

    def on_button_pressed(self, event: Button.Pressed):
        if event.button.id == "create-btn":
            self.run_create_superuser()
        elif event.button.id == "cancel-btn":
            self.app.pop_screen()

    @work(exclusive=True)
    async def run_create_superuser(self):
        """Ejecuta 'createsuperuser' en un worker."""
        username = self.query_one("#username", Input).value
        email = self.query_one("#email", Input).value
        password = self.query_one("#password", Input).value
        
        if not username or not password:
            self.notify("Usuario y contraseña son requeridos", severity="error")
            return

        python_path = str(PROJECT_ROOT / "venv" / ("Scripts" if IS_WINDOWS else "bin") / "python")
        manage_py = str(BACKEND_DIR / "manage.py")
        
        cmd_env = os.environ.copy()
        cmd_env["DJANGO_SUPERUSER_PASSWORD"] = password
        
        current_env = self.config.get_current_env()
        if current_env:
            cmd_env["DATABASE_PATH"] = current_env["db_path"]
        
        cmd = [python_path, manage_py, "createsuperuser", "--noinput", "--username", username]
        if email:
            cmd.extend(["--email", email])

        try:
            process = await self.run_worker(
                subprocess.run,
                cmd,
                env=cmd_env,
                capture_output=True,
                text=True,
                cwd=str(BACKEND_DIR)
            )
            
            if process.returncode == 0:
                self.notify("✅ Superusuario creado exitosamente", severity="information")
                self.app.pop_screen()
            else:
                if "Error: That username is already taken" in process.stdout:
                    self.notify("❌ Error: Ese nombre de usuario ya existe", severity="error")
                else:
                    self.notify(f"❌ Error creando superusuario", severity="error")
                    
        except Exception as e:
            self.notify(f"❌ Error inesperado: {str(e)}", severity="error")


class ConfigEnvironmentModal(ModalScreen):
    """
    Modal para pedir los datos de la tabla 'config' (compañía, moneda, etc.)
    """
    def __init__(self, config: ProjectConfig):
        super().__init__()
        self.config = config

    def compose(self) -> ComposeResult:
        """Dibuja el formulario modal."""
        with Vertical(classes="modal-container-large"): # Usa CSS para un modal más grande
            yield Static("⚙️ Configuración Inicial del Entorno", classes="title")
            yield Static("Estos datos se guardarán en la nueva base de datos.")
            
            yield Label("\nNombre de la Compañía/Organización:")
            yield Input(placeholder="Mi Empresa S.A.", id="company_name")
            
            yield Label("Moneda (símbolo):")
            yield Input(placeholder="$", id="currency", value="$")
            
            yield Label("Formato de Fecha:")
            yield Select(
                options=[("DD/MM/AAAA", "DD/MM/AAAA"), ("MM/DD/AAAA", "MM/DD/AAAA"), ("AAAA-MM-DD", "AAAA-MM-DD")],
                value="DD/MM/AAAA",
                id="date_format",
                allow_blank=False
            )
            
            yield Label("Modo del Sistema:")
            yield Select(
                options=[("Online (Recomendado)", "online"), ("Offline", "offline")],
                value="online",
                id="system_mode",
                allow_blank=False
            )
            
            yield Horizontal(
                Button("Guardar Configuración", variant="primary", id="save-btn"),
                Button("Cancelar", variant="default", id="cancel-btn"),
                classes="button-row"
            )

    def on_mount(self):
        """Pone el foco en el primer input."""
        self.query_one("#company_name", Input).focus()

    def on_button_pressed(self, event: Button.Pressed):
        """Maneja los botones del modal."""
        if event.button.id == "save-btn":
            data = {
                "company": self.query_one("#company_name", Input).value,
                "currency": self.query_one("#currency", Input).value,
                "date_format": str(self.query_one("#date_format", Select).value),
                "system_mode": str(self.query_one("#system_mode", Select).value),
            }
            
            if not data["company"] or not data["currency"]:
                self.notify("Compañía y Moneda son requeridos", severity="error")
                return

            self.dismiss(data) # Devuelve los datos al cerrarse
            
        elif event.button.id == "cancel-btn":
            self.dismiss(None)


# --- PANTALLA DE SETUP DE DJANGO ---
class DjangoSetupScreen(Screen):
    """
    Pantalla de configuración de Django (Migrate, Init, Superuser).
    """
    BINDINGS = [Binding("q", "quit", "Quit")]
    
    def __init__(self, config: ProjectConfig):
        super().__init__()
        self.config = config
    
    def compose(self) -> ComposeResult:
        """Dibuja la pantalla de setup de Django."""
        yield Header()
        yield Container(
            Static("🐍 Configuración de Django", classes="title"),
            Static("Sigue los pasos en orden para inicializar el entorno."),
            Log(id="django-log", auto_scroll=True),
            Static("", id="django-status"),
            Horizontal(
                Button("1. Ejecutar Migraciones", variant="primary", id="migrate-btn"),
                Button("2. Inicializar Configuración", variant="primary", id="init-config-btn"),
                Button("3. Crear Superusuario", variant="warning", id="superuser-btn"),
                Button("Finalizar Setup", variant="success", id="finish-btn"),
                classes="button-row-spaced"
            ),
            id="django-container"
        )
        yield Footer()

    def on_mount(self):
        """Al montar, establece el título del contenedor."""
        self.query_one("#django-container").border_title = "Configuración Django"
    
    def on_button_pressed(self, event: Button.Pressed):
        """Maneja los botones (migrar, init, superusuario, finalizar)."""
        if event.button.id == "migrate-btn":
            self.run_migrations()
        
        elif event.button.id == "init-config-btn":
            # Abre el modal, y le pasa un 'callback' (la función run_init_config)
            self.app.push_screen(
                ConfigEnvironmentModal(self.config), 
                self.run_init_config # Esto se ejecutará si el modal devuelve datos
            )
            
        elif event.button.id == "superuser-btn":
            self.app.push_screen(CreateSuperUserModal(self.config))
            
        elif event.button.id == "finish-btn":
            self.config.mark_setup_completed()
            self.notify("✅ Setup completado correctamente", severity="information")
            self.app.exit(result="RESTART") # Reinicia la app al menú
    
    @work(exclusive=True)
    async def run_migrations(self):
        """Ejecuta el comando 'migrate' de Django."""
        log = self.query_one("#django-log", Log)
        log.write_line("\n🔄 [Paso 1] Ejecutando migraciones de Django...")
        
        env = self.config.get_current_env()
        if env: os.environ["DATABASE_PATH"] = env["db_path"]
        else:
            log.write_line("❌ Error: No hay entorno activo seleccionado.")
            return

        python_path = str(PROJECT_ROOT / "venv" / ("Scripts" if IS_WINDOWS else "bin") / "python")
        manage_py = str(BACKEND_DIR / "manage.py")
        
        try:
            result = await self.run_worker(
                subprocess.run,
                [python_path, manage_py, "migrate"],
                capture_output=True, text=True, cwd=str(BACKEND_DIR)
            )
            if result.returncode == 0:
                log.write_line("✅ Migraciones completadas exitosamente.")
                log.write_line(result.stdout)
            else:
                log.write_line("❌ Error en migraciones:")
                log.write_line(result.stderr or result.stdout)
        except Exception as e:
            log.write_line(f"❌ Error crítico ejecutando migraciones: {str(e)}")

    @work(exclusive=True)
    async def run_init_config(self, data: Optional[Dict]):
        """
        Ejecuta el comando 'init_config' con los datos del modal.
        """
        if data is None:
            self.notify("Configuración cancelada", severity="warning")
            return
            
        log = self.query_one("#django-log", Log)
        log.write_line("\n🔄 [Paso 2] Ejecutando inicialización de configuración...")

        env = self.config.get_current_env()
        if env: os.environ["DATABASE_PATH"] = env["db_path"]
        else:
            log.write_line("❌ Error: No hay entorno activo seleccionado.")
            return

        python_path = str(PROJECT_ROOT / "venv" / ("Scripts" if IS_WINDOWS else "bin") / "python")
        manage_py = str(BACKEND_DIR / "manage.py")
        
        cmd = [
            python_path, manage_py, "init_config",
            "--company", data["company"],
            "--currency", data["currency"],
            "--date-format", data["date_format"],
            "--system-mode", data["system_mode"],
        ]

        try:
            result = await self.run_worker(
                subprocess.run,
                cmd,
                capture_output=True, text=True, cwd=str(BACKEND_DIR)
            )
            
            log.write_line(result.stdout)
            if result.returncode == 0:
                log.write_line("✅ Configuración inicial guardada.")
                self.notify("✅ Configuración guardada", severity="information")
            else:
                log.write_line("❌ Error guardando la configuración:")
                log.write_line(result.stderr or result.stdout)
        except Exception as e:
            log.write_line(f"❌ Error crítico ejecutando init_config: {str(e)}")
    
    def action_quit(self):
        self.app.exit()


# --- PANTALLA DE MENÚ PRINCIPAL ---
class MainMenuScreen(Screen):
    """
    Menú principal de la aplicación.
    """
    BINDINGS = [Binding("q", "quit", "Quit")]
    
    def __init__(self, config: ProjectConfig):
        super().__init__()
        self.config = config
    
    def compose(self) -> ComposeResult:
        current_env = self.config.config.get('current_env', 'Ninguno')
        yield Header()
        yield Container(
            Static("🚀 Mosaite Project Manager", classes="title"),
            Static(f"Entorno actual: {current_env}", id="current-env", classes="env-display"),
            Vertical(
                Button("▶️  Iniciar Proyecto", variant="primary", id="start-project-btn"),
                Button("🔄 Cambiar Entorno", variant="default", id="change-env-btn"),
                Button("🗂️  Gestionar Entornos", variant="default", id="manage-env-btn"),
                Button("🐍 Configuración Django", variant="default", id="django-config-btn"),
                Button("❌ Salir", variant="error", id="quit-btn"),
                classes="menu-buttons"
            ),
            id="main-menu-container"
        )
        yield Footer()

    def on_mount(self):
        """Al montar, establece el título del contenedor."""
        self.query_one("#main-menu-container").border_title = "Menú Principal"
    
    def on_button_pressed(self, event: Button.Pressed):
        if event.button.id == "start-project-btn":
            if not self.config.get_current_env():
                self.notify("Debes configurar un entorno primero", severity="warning")
                return
            self.app.push_screen(RunProjectScreen(self.config))
        elif event.button.id == "change-env-btn":
            self.app.push_screen(SelectEnvironmentScreen(self.config))
        elif event.button.id == "manage-env-btn":
            self.app.push_screen(EnvironmentConfigScreen())
        elif event.button.id == "django-config-btn":
            self.app.push_screen(DjangoSetupScreen(self.config))
        elif event.button.id == "quit-btn":
            self.app.exit()
    
    def action_quit(self):
        self.app.exit()


# --- PANTALLA DE SELECCIÓN DE ENTORNO ---
class SelectEnvironmentScreen(Screen):
    """Pantalla para seleccionar el entorno activo"""
    
    BINDINGS = [Binding("escape", "back", "Back")]
    
    def __init__(self, config: ProjectConfig):
        super().__init__()
        self.config = config
    
    def compose(self) -> ComposeResult:
        yield Header()
        env_options = [(name, name) for name in self.config.config["environments"].keys()]
        current = self.config.config.get("current_env")
        yield Container(
            Static("🔄 Seleccionar Entorno Activo", classes="title"),
            Select(
                options=env_options,
                value=current,
                id="env-select",
                allow_blank=False
            ),
            Horizontal(
                Button("Cambiar", variant="primary", id="change-btn"),
                Button("Cancelar", variant="default", id="cancel-btn"),
                classes="button-row"
            ),
            id="select-env-container"
        )
        yield Footer()

    def on_mount(self):
        """Al montar, establece el título del contenedor."""
        self.query_one("#select-env-container").border_title = "Cambiar Entorno"
    
    def on_button_pressed(self, event: Button.Pressed):
        if event.button.id == "change-btn":
            select = self.query_one("#env-select", Select)
            if select.value:
                self.config.set_current_env(str(select.value))
                self.notify(f"✅ Entorno cambiado a: {select.value}", severity="information")
                self.app.pop_screen()
        elif event.button.id == "cancel-btn":
            self.app.pop_screen()
    
    def action_back(self):
        self.app.pop_screen()


# --- PANTALLA DE EJECUCIÓN DEL PROYECTO ---
class RunProjectScreen(Screen):
    """Pantalla para ejecutar los servidores de Backend y Frontend"""
    
    BINDINGS = [
        Binding("escape", "back", "Back"),
        Binding("s", "stop_servers", "Stop Servers"),
        Binding("ctrl+c", "stop_servers", "Stop Servers", show=False)
    ]
    
    def __init__(self, config: ProjectConfig):
        super().__init__()
        self.config = config
        self.backend_process = None
        self.frontend_process = None
        self.is_running = False
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield VerticalScroll(
            Static("▶️  Ejecutando Proyecto Mosaite", classes="title"),
            Static(f"Entorno: {self.config.config.get('current_env')}", id="run-env", classes="env-display"),
            Static("\n📘 Backend (Django):", classes="log-label"),
            Log(id="backend-log", auto_scroll=True),
            Static("\n📗 Frontend (React):", classes="log-label"),
            Log(id="frontend-log", auto_scroll=True),
            Static("", id="run-status"),
            Horizontal(
                Button("Detener Servidores", variant="error", id="stop-btn"),
                Button("Volver al Menú", variant="default", id="back-btn"),
                classes="button-row"
            ),
            id="run-container"
        )
        yield Footer()
    
    def on_mount(self):
        """Al montar la pantalla, inicia los servidores y establece el título."""
        self.query_one("#run-container").border_title = "Ejecución del Proyecto"
        self.start_servers()
    
    @work(exclusive=True)
    async def start_servers(self):
        """Inicia los servidores en 0.0.0.0 y muestra la IP de LAN."""
        backend_log = self.query_one("#backend-log", Log)
        frontend_log = self.query_one("#frontend-log", Log)
        status = self.query_one("#run-status", Static)
        
        env = self.config.get_current_env()
        if env:
            os.environ["DATABASE_PATH"] = env["db_path"]
            os.environ["PDF_PATH"] = env["pdf_path"]
            backend_log.write_line(f"📁 Base de datos: {env['db_path']}")
            backend_log.write_line(f"📁 PDFs: {env['pdf_path']}")
        
        python_path = str(PROJECT_ROOT / "venv" / ("Scripts" if IS_WINDOWS else "bin") / "python")
        manage_py = str(BACKEND_DIR / "manage.py")
        
        # --- Obtener IP y construir URLs ---
        lan_ip = get_lan_ip()
        backend_url = f"http://{lan_ip}:8000"
        frontend_url = f"http://{lan_ip}:3000"

        # Iniciar backend
        backend_log.write_line("\n🔵 Iniciando servidor Django...")
        try:
            self.backend_process = subprocess.Popen(
                # --- Escuchar en 0.0.0.0 ---
                [python_path, manage_py, "runserver", "0.0.0.0:8000"],
                cwd=str(BACKEND_DIR),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            # --- Mostrar URL de LAN ---
            backend_log.write_line(f"✅ Backend iniciado en: {backend_url}")
            if lan_ip == "127.0.0.1":
                backend_log.write_line("   (No se pudo detectar IP de LAN, verifica tu conexión de red)")
            
            self.is_running = True
        except Exception as e:
            backend_log.write_line(f"❌ Error iniciando backend: {str(e)}")
            status.update("❌ Error al iniciar servidores")
            return
        
        # Iniciar frontend
        frontend_log.write_line("\n🟢 Iniciando servidor React...")
        try:
            npm_cmd = "npm.cmd" if IS_WINDOWS else "npm"
            # (Nota: 'npm start' de React usualmente ya escucha en 0.0.0.0 por defecto)
            self.frontend_process = subprocess.Popen(
                [npm_cmd, "start"],
                cwd=str(FRONTEND_DIR),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            # --- CAMBIO 4: Mostrar URL de LAN para Frontend ---
            frontend_log.write_line(f"✅ Frontend iniciado. Accede desde:")
            frontend_log.write_line(f"   - Esta máquina: http://localhost:3000")
            frontend_log.write_line(f"   - Otros dispositivos: {frontend_url}")

        except Exception as e:
            frontend_log.write_line(f"❌ Error iniciando frontend: {str(e)}")
        
        status.update("✅ Servidores en ejecución | Presiona 'S' o Ctrl+C para detener")
        
        # Iniciar monitoreo de logs
        self
    
    @work(exclusive=True, thread=True)
    def monitor_logs(self, backend_log, frontend_log):
        """Monitorea los logs de ambos procesos en un hilo separado."""
        while self.is_running:
            try:
                if self.backend_process and self.backend_process.poll() is None:
                    if self.backend_process.stdout:
                        line = self.backend_process.stdout.readline()
                        if line:
                            self.app.call_from_thread(backend_log.write_line, line.strip())
                
                if self.frontend_process and self.frontend_process.poll() is None:
                    if self.frontend_process.stdout:
                        line = self.frontend_process.stdout.readline()
                        if line:
                            self.app.call_from_thread(frontend_log.write_line, line.strip())
            except Exception:
                break # Salir del bucle si hay un error (ej. al cerrar)
    
    def stop_servers(self):
        """Detiene los servidores de forma segura."""
        if not self.is_running:
            return
            
        backend_log = self.query_one("#backend-log", Log)
        frontend_log = self.query_one("#frontend-log", Log)
        status = self.query_one("#run-status", Static)
        
        self.is_running = False
        status.update("⏸️  Deteniendo servidores...")
        
        if self.backend_process:
            backend_log.write_line("\n🛑 Deteniendo servidor Django...")
            try:
                self.backend_process.terminate()
                self.backend_process.wait(timeout=5)
                backend_log.write_line("✅ Backend detenido")
            except Exception:
                self.backend_process.kill()
        
        if self.frontend_process:
            frontend_log.write_line("\n🛑 Deteniendo servidor React...")
            try:
                self.frontend_process.terminate()
                self.frontend_process.wait(timeout=5)
                frontend_log.write_line("✅ Frontend detenido")
            except Exception:
                self.frontend_process.kill()
        
        status.update("✅ Servidores detenidos correctamente")
        self.notify("Servidores detenidos", severity="information")
    
    def on_button_pressed(self, event: Button.Pressed):
        if event.button.id == "stop-btn":
            self.action_stop_servers()
        elif event.button.id == "back-btn":
            self.action_back()
    
    def action_stop_servers(self):
        """Binding 's' para detener servidores."""
        self.stop_servers()
    
    def action_back(self):
        """Binding 'escape' para volver (solo si los servidores están parados)."""
        if not self.is_running:
            self.app.pop_screen()
        else:
            self.notify("Detén los servidores primero (presiona 'S')", severity="warning")
    
    def on_unmount(self):
        """Asegurarse de detener servidores al salir de la pantalla."""
        self.stop_servers()