# 🚌 Hop-On Bus Ticketing Backend

A Node.js and Express.js backend for the Hop-On Bus Ticketing Website.  
It provides REST API endpoints for managing buses, bookings, and routes, enabling the frontend to fetch and manipulate data seamlessly.

## 🚀 Live Demo

(If hosted, you can add your backend URL here, e.g., Render/Heroku endpoint)  
API Base URL: https://your-backend-url.com/api

## 📦 Repository

Backend: https://github.com/nabeel6223/bus-ticketing-backend

## 🛠️ Tech Stack

- Node.js
- Express.js
- REST API Endpoints
- Middleware for API key validation
- JSON files for data storage (mock DB)

## 📁 Project Structure
```bash
bus-ticketing-backend/
├── controllers/ # Request handlers for bookings and buses
│ ├── booking.js
│ └── bus.js
├── middlewares/ # Custom middleware
│ └── check-api-key.js
├── models/ # Data models (if any, currently empty)
├── utils/ # Utility functions and data
│ ├── bookings.json
│ ├── bus-data.js
│ ├── cities-list.js
│ ├── trending-routes.json
│ ├── env.config.js
│ └── index.js
├── route.js # Main API routes
├── package.json
├── package-lock.json
└── node_modules/
```

## ▶️ Running the Backend Locally

```bash
git clone https://github.com/nabeel6223/bus-ticketing-backend
cd bus-ticketing-backend
npm install
npm run dev
```

The backend server will start on http://localhost:5000 (or your configured port in utils/env.config.js).

🔗 API Endpoints

  Buses
  
  GET /api/buses – Fetch all buses
  
  GET /api/buses/:id – Fetch details of a specific bus
  
  Bookings
  
  GET /api/bookings – Fetch all bookings
  
  POST /api/bookings – Create a new booking
  
  (All endpoints are protected by API key middleware check-api-key.js.)
  
  🔧 Middleware
  
  check-api-key.js – Validates API key for secure access

🪄 Notes

  This backend currently uses JSON files as mock data storage (utils/bookings.json, utils/trending-routes.json).
  
  Environment variables (API key, port, etc.) are configured in utils/env.config.js.
  
  Use npm run dev for development (with nodemon) and npm start for production.
