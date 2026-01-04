# TickerTrendsDemoProject

It scrapes keyword timeseries data from **MuckRack**.

It stores the data in **PostgreSQL**.

It visualizes trends and growth using **Next.js**.

---

## Tech Stack

### Backend
Node.js/Express/TypeScript/PostgreSQL/TypeORM
### Frontend
Next.js/React/TypeScript/Recharts

---

## Project Structure
<img width="1214" height="574" alt="image" src="https://github.com/user-attachments/assets/c63bc369-215c-4e35-97b5-f2b474dcd568" />

---

## Requirements

Make sure these are installed:

- Node.js (v18 or newer)
- npm
- Postgres.app (running on port 5432): https://postgresapp.com/downloads.html

---

## Database Setup

1. Start PostgreSQL
2. Create database:
CREATE DATABASE tickertrends;
3. Configure database connection in backend
(`data-source.ts` or `.env`)

---

## Backend Setup
Go to backend directory:
```
cd backend
```

Install dependencies:
```
npm init -y  
npm install express axios cors node-cron
npm install typeorm reflect-metadata pg 
npm install -D \
  @types/cors \
  @types/express \
  @types/node \
  @types/node-cron \
  @types/pg
npx tsc –init 
```

Start backend server:
```
cd backend
npx ts-node-dev src/index.ts
```

Backend runs on:
```
http://localhost:3001
```

---

## Frontend Setup
Go to frontend directory:
```
cd frontend
```

Install dependencies:
```
npx create-next-app@latest frontend –typescript
```

Start frontend server:
```
cd frontend
npm run dev
```

Frontend runs on:
```
http://localhost:3000
```

---

## How to Use

1. Open browser at http://localhost:3000
2. Enter a keyword (example: crocs)
3. Click Load
4. Timeseries data appears
5. Growth table shows all stored terms
6. Growth table is sorted by highest growth

Data appears only after user input.

---

## Growth Logic

Growth is calculated as:

(last_value - first_value) / first_value

---

## Notes on Cron Job (Auto Update)
A cron job is included to refresh stored keywords.
It runs on a schedule
It re-fetches data for existing terms
Errors (403 / rate limits) are handled safely

## Notes on MuckRack Data
MuckRack does not provide an official public API
The endpoint may return 403
This project handles failures gracefully
Stored data remains usable even if refresh fails

Thanks
