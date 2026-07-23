# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Mosaite

Accounting education platform for practicing double-entry bookkeeping. Supports multi-user environments (teachers + students sharing one instance). Core features: chart of accounts, journal entries (transacciones), daily ledger PDFs, dashboard analytics, and an AI chat assistant (RAG) that answers accounting questions. A natural-language-to-SQL module (ConsultorIA) is built but not yet wired into the frontend.

## Running the project

### Backend (Django)
```bash
cd backend
source ../.venv/bin/activate   # or your local venv
python manage.py runserver 0.0.0.0:8000
```

### Frontend (React)
```bash
cd frontend/front
npm start          # dev server at http://localhost:3000
npm run build      # production build
```

### TUI project manager
```bash
python3 main.py    # Textual-based launcher (incomplete)
```

### First-time setup after cloning
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py init_plan_cuentas   # seed chart of accounts
python manage.py init_chat           # build FAISS vector index for RAG
python manage.py init_dashboard_data # seed dashboard demo data
```

## Testing (backend only)
```bash
cd backend

pytest                                    # all tests
pytest apps/accounts/tests/               # single app
pytest apps/accounts/tests/test_accounts_models.py  # single file
pytest -x                                 # stop on first failure
pytest --cov                              # with coverage report
```

`pytest.ini` points to `config.settings`; tests run from the `backend/` directory. Global fixtures (`api_client`, `user_data`, `user`) live in `backend/conftest.py`.

## Architecture

### Directory layout
```
backend/
  apps/           # Django applications
  config/         # Django project settings + root urls.py
  services/       # AI/utility services (added to sys.path by settings.py)
frontend/front/   # React application
tui/              # Textual TUI (incomplete)
main.py           # TUI entry point
POC/front/        # Demo frontend with mocked data — not connected to API
```

### Django apps (`backend/apps/`)

| App | Purpose |
|-----|---------|
| `users` | Custom `User` model (email-based auth, `rol` int, `group` tenant field, `status` 0=active/1=inactive) |
| `config` | System-wide settings model + `SystemModeMiddleware` that injects config into every request |
| `accounts` | Chart of accounts (`plan de cuentas`); seeded via `init_plan_cuentas` management command |
| `trans` | Journal entries (transactions); has custom permission classes |
| `chat` | RAG-powered accounting Q&A assistant; has custom permission classes |
| `dash` | Dashboard statistics/aggregations |

Auth is JWT via `djangorestframework-simplejwt`. All token endpoints are under `api/auth/`. The custom `User` model uses `email` as `USERNAME_FIELD`.

### AI services (`backend/services/`)

`settings.py` inserts `backend/services/` into `sys.path`, so these import as top-level packages.

**`llm_gateway/`** — Centralised LLM gateway (singleton, lazy-loaded).
- Providers in priority order: configured API keys first (OpenAI → Anthropic → Google), then local Llama 3.1 8B GGUF as automatic fallback.
- API keys go in `services/llm_gateway/.env` (see `.env.example`).
- Without any API key the local model (`services/llm_gateway/core/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf`) is used — requires ~8 GB RAM.
- Configure default models in `services/llm_gateway/config.py` → `DEFAULT_MODELS`.

```python
from llm_gateway import get_gateway
gateway = get_gateway()
response = gateway.generate(user_prompt="...", system_prompt="...", max_tokens=512)
```

**`chat/`** — RAG service (accounting Q&A).
- Embeddings: `sentence-transformers/all-MiniLM-L6-v2` (384-dim, FAISS index).
- Documents live in `services/chat/data/` (`.md` / `.txt`). Rebuild index with `python manage.py rebuild_chat_index`.
- Delegates generation to `llm_gateway`.

**`consultorIA/`** — Natural-language → SQL.
- Finds a similar example from `examples.json` via embedding similarity, then asks the LLM to adapt it to `schema.txt`.
- Validates output (SELECT only, no destructive statements).
- Not yet connected to any frontend route — ready for integration.

**`daily/`** — PDF journal ledger generation (stub; ready for implementation).

### React frontend (`frontend/front/src/`)

- `services/api.js` — Axios instance; all service modules import from here.
- `context/AuthContext.js` — JWT tokens + current user state (global).
- `context/ThemeContext.js` — Light/dark theme (global).
- `components/Content/` — One component per view (Dashboard, Transacciones, Chat, Configuración, etc.).
- Route protection via `components/ProtectedRoute.js`.

### API base URLs
- Backend: `http://localhost:8000/api/`
- Auth: `POST /api/auth/login/`, `POST /api/auth/refresh/`, `POST /api/auth/logout/`

## Key conventions

- The `group` field on `User` acts as a tenant identifier — users in the same group share data.
- `rol` is an integer: 0 = admin/superuser role within the app (not Django's `is_superuser`).
- Database is SQLite (`backend/db.sqlite3`); no migration needed for schema inspection.
- `PYTHONPATH` for services is set in `backend/config/settings.py` — no shell export needed when running via `manage.py`.
- The `POC/front/` directory is a standalone demo with no API calls — do not modify it expecting backend changes to reflect there.
