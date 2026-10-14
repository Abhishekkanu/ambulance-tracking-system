# Ambulance Tracker - Starter (MERN)

This starter project contains a minimal **backend** (Node/Express/MongoDB/Socket.IO)
and a **frontend** (React + Leaflet + socket.io-client) to jumpstart your Ambulance Tracker app.

## Structure
- backend/  -> Express server, Mongoose models, Socket.IO
- frontend/ -> React app (no build artifacts)

## Quick local setup (Windows / macOS / Linux)
1. Install Node.js (v16+). Install MongoDB locally or use MongoDB Atlas.
2. Open two terminals in VS Code.

### Backend
cd backend
cp .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET
npm install
npm run dev

### Frontend
cd frontend
npm install
npm start

Frontend runs on http://localhost:3000 and backend on http://localhost:5000 by default.

## Notes
- This is a starter scaffold. You should secure endpoints, add validation, proper auth flows, and production configs.
- Driver location updates are emitted via Socket.IO event `driverLocationUpdate` with payload: { driverId, lat, lng }
- Emergency request endpoint: POST /api/emergency/request body: { userId, lng, lat }

Enjoy building — ask me to generate more features (auth UI, driver simulator, db seed scripts, Dockerfile, deployment steps).
