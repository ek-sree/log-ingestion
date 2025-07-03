# 🧠 Log Ingestion and Querying System

A full-stack developer tool to ingest, search, and filter logs in real time — built with React, Node.js, TypeScript, Socket.IO, and Docker.

This project simulates a real-world logging system used by developers for debugging and monitoring. It includes:

- A backend API that stores logs in a JSON file using Node's fs/promises module and supports complex filtering logic.
- A frontend UI built in React (with Vite, Tailwind, TypeScript) that displays and filters logs in real time using Socket.IO.

====================================
🚀 How to Run the Project
====================================

1. Clone the Repository
git clone https://github.com/your-username/log-system.git
cd log-system

2. Set up Environment Variables

Create the following `.env` files:

client/.env
VITE_API_URL=http://localhost:3000/api

server/.env
PORT=3000
CORS_KEY=http://localhost:5173

3. Start the Backend
cd server
npm install
npm run dev

4. Start the Frontend
cd client
npm install
npm run dev

====================================
📁 Folder Structure
====================================

Backend - server/
server/
├── src/
│   ├── server.ts               → Entry point
│   └── app/
│       ├── router/             → API routes
│       ├── controller/         → Handles HTTP requests
│       └── useCase/            → Business logic, file operations with fs/promises
├── logs/
│   └── log.json                → JSON-based storage for logs

Frontend - client/
client/
├── src/
│   ├── components/             → UI components (FilterBar, LogItem, etc.)
│   ├── service/                → Custom hooks (useFetchLogs, useDebounce)
│   └── api/
│       ├── axios/              → Axios instance
│       └── endpoints/          → API endpoint paths

====================================
🧠 Features Implemented
====================================

- Logs are stored in JSON file using fs/promises
- Fully functional filtering by level, message, resourceId, date range, etc.
- Real-time log updates using Socket.IO
- Debounced search input for optimized API calls
- Fully Dockerized setup for one-command startup

====================================
🌐 API Endpoints
====================================

POST /api/logs
→ Accepts a log object matching the defined schema and stores it in log.json

GET /api/logs
→ Supports filtering by:
   - level (error, warn, info, debug)
   - message (full-text search)
   - resourceId
   - timestamp_start and timestamp_end
   - traceId, spanId, commit

Returns logs sorted in reverse chronological order.

====================================
📦 Tech Stack
====================================

Frontend:
- React + TypeScript
- Vite
- TailwindCSS
- Axios
- Socket.IO client

Backend:
- Node.js + Express
- TypeScript
- fs/promises (for JSON file DB)
- Socket.IO

====================================
📄 Sample Log Schema
====================================

{
  "level": "error",
  "message": "Failed to connect to DB",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}

====================================
📌 Notes & Design Decisions
====================================

- Used Node’s fs/promises module instead of any database, as required
- All filtering is done manually using JavaScript array methods
- Real-time Socket.IO updates improve UX
- Used debounce on frontend text input to avoid excessive API hits
- Folder structure follows clean architecture separation (router, controller, useCase)
- Frontend uses modular design: services, API, and components are clearly separated

====================================
🐳 Docker Support
====================================

To run everything with Docker:
docker-compose up --build
