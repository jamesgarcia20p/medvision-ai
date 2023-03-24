# MedVisionAI

MedVisionAI is a production-minded fullstack scaffold for an AI-assisted medical imaging platform. It combines a modern clinical user interface, a FastAPI service layer, PostgreSQL data modeling with Prisma, static demo documentation, Dockerized local infrastructure, and CI/CD workflows.

The project is designed for portfolio demos, architecture discussions, hackathon prototypes, and early product discovery around radiology workflows such as DICOM/NIfTI ingestion, segmentation overlays, 3D reconstruction, annotations, measurements, report summaries, and segmentation-mask export.

<a href="https://jamesgarcia20p.github.io/medvision-ai/">
  <img src="/images/app-image.png" width="100%"/>
</a>

> **Clinical safety notice**
>
> MedVisionAI is for demonstration and engineering reference only. It is not a cleared medical device, does not provide diagnosis, and must not be used for patient care without clinical validation, regulatory review, security hardening, and institution-specific governance.

## What is included

### Frontend

- **Next.js 14 App Router** with TypeScript and server/client component separation.
- **Tailwind CSS** design system with shadcn/ui-style primitives.
- **Clerk-ready auth boundary** via `ClerkProvider` in the root layout.
- **Dark/light mode** support using `next-themes`.
- **Zustand** store for selected study and segmentation-job state.
- **Medical imaging UI hooks** for:
  - Cornerstone.js DICOM viewport initialization.
  - Annotation, measurement, and zoom tool controls.
  - vtk.js 3D reconstruction preview surface.
  - AI report summary and segmentation status panels.
- **Type-safe domain types** for patient studies and segmentation jobs.

### Backend

- **FastAPI** app targeting Python 3.11.
- REST endpoints for health checks, study retrieval, multipart upload, segmentation, report summaries, and mask export metadata.
- WebSocket endpoint for segmentation-progress events.
- Pydantic schemas for study, report, and segmentation-job payloads.
- Service seams for:
  - Local/S3-compatible storage.
  - MONAI/PyTorch segmentation execution.
  - AI-generated report summaries.
- Basic API tests with FastAPI `TestClient`.

### Data and infrastructure

- **PostgreSQL** local service via Docker Compose.
- **Prisma schema** covering users, studies, series, annotations, segmentations, and reports.
- Demo seed script for development records.
- Dockerfiles for frontend and backend containers.
- GitHub Actions CI for frontend and backend validation.
- Static animated showcase in `docs/` ready to be published from the repository docs folder.

## Feature map

| Requirement | Implementation |
| --- | --- |
| User authentication and dashboard | Clerk provider and dashboard route in `frontend/app/dashboard` |
| Upload DICOM, NIfTI, CT/MRI scans | Upload UI plus FastAPI multipart `/uploads` endpoint |
| Interactive DICOM viewer | Cornerstone.js-ready viewer component with tool controls |
| AI tumor segmentation overlay | Segmentation UI state and backend MONAI/PyTorch service seam |
| 3D anatomical reconstruction | vtk.js-ready reconstruction component |
| Annotation and measurement tools | Viewer controls for measure, zoom, and annotation modes |
| Patient study management | Prisma schema, seed data, dashboard table, study detail route |
| AI-generated radiology report summary | FastAPI report endpoint and report summary component |
| Export segmentation masks | `/exports/{study_id}/mask` metadata endpoint |
| Dark/light mode UI | Frontend theme provider and static showcase theme toggle |
| Dockerized setup | Root `docker-compose.yml`, frontend and backend Dockerfiles |
| API documentation | `docs/API.md` plus FastAPI OpenAPI UI at `/docs` |

## Repository structure

```text
medvision-ai
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── pages.yml
├── .gitignore
├── LICENSE
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── main.py
│   │   ├── schemas/
│   │   │   └── studies.py
│   │   └── services/
│   │       ├── demo_data.py
│   │       ├── reports.py
│   │       ├── segmentation.py
│   │       └── storage.py
│   ├── pyproject.toml
│   └── tests/
│       └── test_api.py
├── docker-compose.yml
├── docs/
│   ├── .nojekyll
│   ├── API.md
│   ├── demo.css
│   ├── demo.js
│   └── index.html
├── images/
│   └── app-image.png
└── frontend/
    ├── .eslintrc.json
    ├── Dockerfile
    ├── app/
    │   ├── api/
    │   │   └── health/
    │   │       └── route.ts
    │   ├── dashboard/
    │   │   └── page.tsx
    │   ├── error.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── page.tsx
    │   ├── studies/
    │   │   └── [id]/
    │   │       └── page.tsx
    │   └── upload/
    │       └── page.tsx
    ├── components/
    │   ├── dashboard/
    │   │   ├── stats.tsx
    │   │   └── study-table.tsx
    │   ├── layout/
    │   │   └── nav.tsx
    │   ├── medical/
    │   │   ├── dicom-viewer.tsx
    │   │   ├── reconstruction-viewer.tsx
    │   │   └── report-summary.tsx
    │   ├── providers/
    │   │   └── theme-provider.tsx
    │   └── ui/
    │       ├── button.tsx
    │       ├── card.tsx
    │       └── progress.tsx
    ├── lib/
    │   ├── api.ts
    │   ├── types.ts
    │   └── utils.ts
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── public/
    │   └── .gitkeep
    ├── store/
    │   └── study-store.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── types.d.ts
```

## Prerequisites

Install the following before running the full stack locally:

- Node.js 22+
- npm 11+
- Python 3.11+
- Docker Desktop or Docker Engine
- PostgreSQL 16 if running without Docker

## Quick start with Docker

From the repository root:

```bash
docker compose up --build
```

Services started by Compose:

| Service | URL / Port | Notes |
| --- | --- | --- |
| Frontend | <http://localhost:3000> | Next.js web app |
| Backend | <http://localhost:8000> | FastAPI service |
| API docs | <http://localhost:8000/docs> | OpenAPI UI |
| PostgreSQL | `localhost:5432` | `medvision_ai` database |

Default database connection used by Compose:

```text
postgresql://medvision:medvision@localhost:5432/medvision_ai
```

## Local development without Docker

### 1. Start PostgreSQL

Use Docker for only the database if desired:

```bash
docker compose up postgres
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
python -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
uvicorn app.main:app --reload
```

Backend environment variables:

```env
DATABASE_URL=postgresql://medvision:medvision@localhost:5432/medvision_ai
CORS_ORIGINS=http://localhost:3000
STORAGE_PROVIDER=local
LOCAL_STORAGE_PATH=uploads
```

### 3. Configure the frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run prisma:generate
npm run seed
npm run dev
```

Frontend environment variables:

```env
DATABASE_URL=postgresql://medvision:medvision@localhost:5432/medvision_ai
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_replace_me
CLERK_SECRET_KEY=sk_test_replace_me
```

## Demo data

The Prisma seed script creates:

- A demo radiologist user.
- Three patient studies.
- Imaging series metadata.
- AI-generated report summaries.

Run it with:

```bash
cd frontend
npm run seed
```

The backend also exposes in-memory demo study records so the frontend can render useful data during API-first development.

## Static showcase

The static product showcase lives in `docs/index.html` and can be opened directly in a browser or served locally:

```bash
python -m http.server 8765 --directory docs
```

Then visit <http://localhost:8765>.

The showcase includes:

- Animated clinical command-center interface.
- Dark/light mode toggle with readable contrast in both modes.
- Holographic anatomy and segmentation visualization.
- Workflow cards for upload, segmentation, review, and reconstruction.
- Centered footer with source-code link.

The `Deploy GitHub Pages Demo` workflow publishes the `docs/` directory when `main` is updated.

## API overview

Base URL for local development:

```text
http://localhost:8000/api/v1
```

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Backend health check |
| `GET` | `/studies` | List patient imaging studies |
| `GET` | `/studies/{study_id}` | Retrieve a single study |
| `POST` | `/uploads` | Upload DICOM/NIfTI imaging files |
| `POST` | `/ai/segment/{study_id}` | Start segmentation workflow |
| `GET` | `/reports/{study_id}` | Fetch AI report summary |
| `GET` | `/exports/{study_id}/mask` | Fetch mask export metadata |
| `WS` | `/ws/segmentations/{job_id}` | Stream segmentation progress |

See [`docs/API.md`](docs/API.md) for examples and the FastAPI `/docs` route for generated OpenAPI documentation.

## Common commands

### Frontend

```bash
cd frontend
npm run dev
npm run typecheck
npm run build
npm run lint
npm run prisma:generate
npm run seed
```

### Backend

```bash
cd backend
pip install -e '.[dev]'
ruff check app tests
pytest
uvicorn app.main:app --reload
```

### Static showcase

```bash
python -m http.server 8765 --directory docs
```

## Testing and CI

The CI workflow runs:

- `npm install`
- `npm run typecheck`
- `npm run build`
- `pip install -e '.[dev]'`
- `ruff check app tests`
- `pytest`

The backend test suite currently validates the health endpoint and study listing endpoint. Add more tests as endpoints are connected to persistent storage, authentication, and inference workers.

## Architecture notes

### Frontend data flow

1. Next.js pages call the typed API client in `frontend/lib/api.ts`.
2. Shared study and segmentation types live in `frontend/lib/types.ts`.
3. Client-side selected study and segmentation progress are represented in `frontend/store/study-store.ts`.
4. Medical visualization components are isolated in `frontend/components/medical` so DICOM and 3D rendering logic can evolve independently.

### Backend flow

1. FastAPI mounts all versioned routes under `/api/v1`.
2. API routes return typed Pydantic responses from `backend/app/schemas`.
3. Service classes isolate storage, segmentation, and reporting concerns.
4. The MONAI/PyTorch service currently exposes a production seam where volume loading, transforms, inference, post-processing, and mask persistence should be implemented.

### Database model

The Prisma schema includes:

- `User` for Clerk-associated users.
- `Study` for patient-level imaging studies.
- `Series` for DICOM/NIfTI series metadata.
- `Annotation` for measurement and annotation geometry.
- `Segmentation` for AI mask metadata and metrics.
- `Report` for generated summaries and impressions.

## Production hardening checklist

Before any real clinical or enterprise deployment, add or complete:

- Route-level authentication and authorization enforcement.
- Audit logs for study access, exports, and report generation.
- PHI-safe logging and error handling.
- DICOM de-identification pipeline for demo or research data.
- Encryption at rest and in transit for uploaded studies and masks.
- Malware scanning and file-type validation for uploads.
- Background worker queue for segmentation jobs.
- Persistent segmentation job tracking in PostgreSQL.
- Object storage implementation for Supabase Storage or AWS S3.
- Model registry, versioning, evaluation reports, and rollback strategy.
- Regulatory, privacy, and clinical validation processes.

## Troubleshooting

### Prisma engine download issues

Some restricted environments block Prisma engine downloads. If `npm run prisma:generate` fails because an engine checksum or binary cannot be fetched, retry in a network environment that can access Prisma's binary host. For local experimentation in constrained environments, Prisma also documents checksum-ignore flags, but production and CI should use deterministic dependency access.

### Frontend cannot reach backend

Confirm `NEXT_PUBLIC_API_URL` points to the running FastAPI service and that `CORS_ORIGINS` includes the frontend origin.

### Uploads do not appear in cloud storage

The current storage service defaults to local disk. Configure and implement the Supabase Storage or AWS S3 branch in `StorageService` before expecting cloud persistence.

## License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.