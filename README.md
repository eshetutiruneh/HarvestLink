# HarvestLink project

HarvestLink is a frontend marketplace prototype with a Node.js/Express/MySQL authentication API.

## Project layout

- `frontend/` — static HTML pages, styles, and browser JavaScript
- `backend/` — Express API, MySQL configuration, authentication middleware and routes
- `backend/database/schema.sql` — initial users table schema

## Run the API

Requirements: Node.js 20+ and MySQL 8+.

1. Create the database by running `backend/database/schema.sql` with MySQL.
2. Copy `backend/.env.example` to `backend/.env` and set your local database credentials and a newly generated JWT secret.
3. Run `npm install` and `npm run dev` from `backend/`.
4. Serve the frontend directory using a local web server (for example VS Code Live Server) and set `CLIENT_ORIGIN` to that exact origin.

The API currently provides registration, login, logout, current-user lookup, and a health endpoint. Other marketplace data remains prototype/local until migrated to API routes.

Never commit `.env` files or use real payment or banking credentials in this prototype. If a secret was previously committed, rotate it; deleting it in a later commit does not remove it from Git history.
