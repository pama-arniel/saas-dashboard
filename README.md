# SaaS Dashboard (React)

A simple dashboard application demonstrating real-world frontend features including API integration, data handling, and UI interactions.

## Features

- Fetch and display data from external API
- Search functionality
- Pagination
- Sorting
- Responsive layout structure

## Tech Stack

- React (Vite)
- React Query (data fetching & caching)
- Axios
- Basic CSS

## Demo

https://saas-dashboard-ecru.vercel.app/

## What I Learned

- Handling asynchronous data in React
- Building reusable UI structures
- Implementing client-side filtering, sorting, and pagination
- Managing state effectively in a dashboard setting

## Environment & Deployment

This project reads API base URLs from Vite environment variables. Define them locally or in your Vercel project settings.

- `VITE_API_URL` — backend API base URL (example: `http://localhost:5000` for local dev or `https://api.example.com` for deployed backend)
- `VITE_DATA_API_URL` — optional external data API (defaults to `https://dummyjson.com`)

Local development:

1. Copy `.env.example` to `.env.local` and adjust values:

```bash
cp .env.example .env.local
# then edit .env.local if needed
```

2. Install dependencies and start both servers:

```bash
npm install
npm run server
npm run dev
```

3. Open the frontend at the Vite URL (usually `http://localhost:5173`) and use the login/register pages.

4. If you use MongoDB Atlas locally, set `MONGO_URI` and `JWT_SECRET` in `.env.local`.

Vercel (production):

1. In your Vercel project dashboard go to **Settings → Environment Variables**.
2. Add `VITE_API_URL` with the URL of your deployed backend (for example `https://saas-dashboard-8q63.onrender.com`).
3. Add `VITE_DATA_API_URL` if you want to override the demo data endpoint.
4. Redeploy the Vercel project so the new variables take effect.

Render backend deployment:

1. Create a Render Web Service connected to this repository.
2. Use `npm install` as the build command and `npm start` as the start command.
3. Add these environment variables in Render:
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — a secure random secret
   - `NODE_ENV` — `production`
4. Make sure your Atlas cluster allows Render outbound IPs, or temporarily allow `0.0.0.0/0` while testing.
5. Deploy the Render service and use its URL for `VITE_API_URL` in Vercel.

Backend CORS

If your backend is served from a different origin than the frontend, ensure CORS is configured to allow requests from your Vercel app domain (for example `https://saas-dashboard-ecru.vercel.app`). For an Express backend, a minimal example:

```js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'https://saas-dashboard-ecru.vercel.app' }));

// or allow multiple origins or use a dynamic origin check in production
```

If you cannot deploy the backend yet, avoid calling `http://localhost:5000` from the deployed frontend — it will fail with network/CORS errors. Instead deploy the backend (Heroku, Vercel, Render, etc.) or create a publicly accessible proxy.

