
  # Briefly Web Application Design

  This is a code bundle for Briefly Web Application Design. The original project is available at https://www.figma.com/design/PckwtH2vtZQHOQyEhuPHwh/Briefly-Web-Application-Design.

## Local Development (direct)

- Frontend: `cd frontend && npm install && npm run dev`
- Backend: `cd backend && npm install && npm run dev`

## Local Deployment with Docker

1. Ensure Docker Desktop (or Docker Engine) is running.
2. Copy environment variables for the API:  
   `cp backend/.env.example backend/.env` (or manually create the file on Windows).
3. Launch the full stack:
   - Unix/macOS: `./scripts/dev.sh up`
   - Windows PowerShell: `.\scripts\dev.ps1 up`
   - Or run `docker compose up --build` from the repository root.
4. Access the services:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

Stop the stack with `./scripts/dev.sh down` or `.\scripts\dev.ps1 down`.

## Sentiment Analysis

- The backend now exposes `POST /sentiment/analyze` for lightweight tone scoring using the `sentiment` npm package. Send `{ "text": "..." }` and the API responds with the label (`positive`, `neutral`, or `negative`), score, comparative value, and contributing tokens.
- The chatbot UI automatically calls this endpoint for every user and assistant message, surfacing a badge, score, and highlighted keywords so you can gauge the tone of each exchange at a glance.

## Pipelines & Models

Extend `docker-compose.yml` with additional services (scrapers, model servers, etc.). Sample blocks are commented in the file—duplicate and adjust them to point at your pipeline repositories or container images.

## Notes

- Scripts respect the `COMPOSE_BIN` environment variable if you want to use an alternative Docker CLI wrapper.
- The Docker images use production builds: rebuild whenever you change code (`docker compose up --build`).
  
