# HarvestLink API

Backend service for the HarvestLink marketplace prototype.

## Setup

1. Copy `.env.example` to `.env` and configure your database.
2. Create the MySQL database `harvestlink`.
3. Run `npm install`.
4. Start the API with `npm run dev`.

## Notes

- Uses Express + MySQL with JWT in an HttpOnly cookie.
- Frontend runs as a static prototype using localStorage.
- Stage 2 is to replace localStorage auth with this API.
