{
  description = "Entorno de desarrollo - Mosaite";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        pythonEnv = pkgs.python312;

        buildDeps = with pkgs; [
          gcc
          cmake
          gnumake
          pkg-config
          stdenv.cc.cc.lib
        ];

        latexEnv = pkgs.texlive.combine {
          inherit (pkgs.texlive)
            scheme-medium
            tcolorbox
            latexmk
            ;
        };

      in {
        devShells.default = pkgs.mkShell {
          name = "fullstack-dev";

          packages = with pkgs; [
            # Python
            pythonEnv
            pythonEnv.pkgs.pip
            pythonEnv.pkgs.virtualenv

            # Node
            nodejs_24
            nodePackages.npm

            # LaTeX
            latexEnv

          ] ++ buildDeps ++ (with pkgs; [
            # Utilidades generales
            git
            curl
            jq
          ]);

          # Variables necesarias para que los compiled wheels encuentren las libs
          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath (with pkgs; [
            stdenv.cc.cc.lib
            zlib
          ]);

          shellHook = ''
            # ── venv ──────────────────────────────────────────────────────────
            VENV_DIR="$PWD/.venv"

            if [ ! -d "$VENV_DIR" ]; then
              echo "[nix] Creando venv en .venv/ ..."
              python -m venv "$VENV_DIR"
              echo "[nix] Instalando dependencias desde requirements.txt ..."
              "$VENV_DIR/bin/pip" install --upgrade pip
              "$VENV_DIR/bin/pip" install -r backend/requirements.txt
            fi

            source "$VENV_DIR/bin/activate"
            echo "[nix] venv activado: $(python --version)"

            # ── npm (frontend) ────────────────────────────────────────────────
            if [ ! -d "$PWD/frontend/front/node_modules" ]; then
              echo "[nix] Instalando dependencias npm en frontend/front/ ..."
              (cd "$PWD/frontend/front" && npm install)
            fi

            if [ ! -d "$PWD/POC/front/node_modules" ]; then
              echo "[nix] Instalando dependencias npm en POC/front/ ..."
              (cd "$PWD/POC/front" && npm install)
            fi

            echo "[nix] Entorno listo."
          '';
        };
      }
    );
}
