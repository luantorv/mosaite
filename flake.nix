{
  description = "Entorno de desarrollo y App - Mosaite";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    llama-model = {
      url = "https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, llama-model }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # 1. Dependencias de desarrollo
        buildDeps = with pkgs; [ gcc cmake gnumake pkg-config stdenv.cc.cc.lib ];
        
        latexEnv = pkgs.texlive.combine {
          inherit (pkgs.texlive) scheme-medium tcolorbox latexmk;
        };

        pythonEnv = pkgs.python312;

        # 2. Entorno Python para producción/Nix Run
        pythonEnvProd = pkgs.python312.withPackages (ps: with ps; [
          django
          djangorestframework
          django-cors-headers
          djangorestframework-simplejwt
          faiss
          google-ai-generativelanguage
          google-api-core
          google-api-python-client
          google-generativeai
          googleapis-common-protos
          textual
          llama-cpp-python
          sentence-transformers
          numpy
          openai
          anthropic
          pytest
          pytest-cov
          pytest-django
          python-dotenv
          scikit-learn
          torch
        ]);

        # 3. Empaquetando el Frontend
        # buildNpmPackage se encarga de hacer el npm install y npm run build en un entorno aislado
        frontend-build = pkgs.buildNpmPackage {
          pname = "mosaite-frontend";
          version = "0.1.1";
          src = ./frontend/front;
          # Necesitarás calcular este hash la primera vez ejecutando un comando que Nix te sugerirá al fallar
          npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="; 
          # Comando para construir tu app React
          buildPhase = ''npm run build'';
          installPhase = ''
            mkdir -p $out
            cp -r build/* $out/
          '';
        };

        # 4. El paquete final que junta todo
        mosaite-pkg = pkgs.stdenv.mkDerivation {
          pname = "mosaite";
          version = "0.1.1";
          src = ./.; # Copia el repo al Nix Store

          # Variables necesarias para librerías dinámicas
          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [ pkgs.stdenv.cc.cc.lib pkgs.zlib ];

          installPhase = ''
            mkdir -p $out/bin
            mkdir -p $out/share/mosaite
            mkdir -p $out/share/mosaite/backend/services/llm_gateway/core/

            # Copiamos todo el código fuente
            cp -r . $out/share/mosaite/

            # Vínculo al modelo
            ln -s ${llama-model} $out/share/mosaite/backend/services/llm_gateway/core/Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf

            # Hacemos un script ejecutable que lance tu TUI con el Python correcto
            cat <<EOF > $out/bin/mosaite-tui
            #!/usr/bin/env bash
            export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [ pkgs.stdenv.cc.cc.lib pkgs.zlib ]}
            cd $out/share/mosaite
            exec ${pythonEnvProd}/bin/python main.py "\$@"
            EOF

            chmod +x $out/bin/mosaite-tui
          '';
        };

      in {
        # --- ENTORNO DE DESARROLLO ---
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

              # Instalar llama-cpp-python con flags de compilación optimizados
              # antes del resto de requirements.txt para evitar que pip lo sobreescriba
              echo "[nix] Compilando llama-cpp-python con soporte AVX2..."
              CMAKE_ARGS="-DGGML_AVX=on -DGGML_AVX2=on -DGGML_F16C=on -DGGML_FMA=on" \
              "$VENV_DIR/bin/pip" install llama-cpp-python --no-cache-dir --force-reinstall

              echo "[nix] Instalando resto de dependencias..."
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

        # --- PAQUETES INSTALABLES (nix build / nix profile install) ---
        packages = {
          default = mosaite-pkg;
          frontend = frontend-build;
        };

        # --- APLICACIONES EJECUTABLES (nix run) ---
        apps.default = {
          type = "app";
          program = "${mosaite-pkg}/bin/mosaite-tui";
        };
      }
    );
}
