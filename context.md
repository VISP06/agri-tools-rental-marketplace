# Agri Tools Rental Marketplace - Project Context

This document is a complete handoff context for another AI agent or developer to continue work without losing direction.

## 1) Project Goal

Build a digital marketplace where:

- Equipment owners list farm machinery (tractors, harvesters, irrigation systems, etc.)
- Farmers discover equipment in their region
- Renters create bookings for selected dates
- Owners/renters manage booking lifecycle and payments

Core hackathon value: improve machinery utilization and reduce farmer operating cost through shared access.

## 2) Current Stack (Locked)

- Frontend: HTML, JavaScript (vanilla modules), Tailwind CSS, CSS
- Backend: Node.js + Express (REST API)
- Database: MongoDB via Mongoose
- AI layer: Python scripts in `ai/`

The stack is intentionally constrained for hackathon speed and team parallelization.

## 3) Non-Negotiable Rules

From `rule.md`:

- Do not introduce React/Next/Vue/Angular/Svelte
- Do not migrate to TypeScript
- Do not switch backend framework (Flask/FastAPI/Django/etc.)
- Do not switch DB to SQL for core storage
- Keep folder-language boundaries:
  - `frontend/` -> HTML/CSS/JS only
  - `backend/` -> JS only
  - `ai/` -> Python only

If a change conflicts with these, require explicit maintainer approval first.

## 4) Repository Structure

```text
agri-tools-rental-marketplace/
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── EquipmentCard.js
│   │   │   ├── Footer.js
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── AboutPage.js
│   │   │   ├── ContactPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── ListEquipmentPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── MarketplacePage.js
│   │   │   └── RegisterPage.js
│   │   ├── services/api.js
│   │   ├── App.js
│   │   ├── main.js
│   │   └── styles.css
│   └── package.json
├── backend/
│   ├── controllers/
│   │   ├── bookingController.js
│   │   └── equipmentController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── models/
│   │   ├── Booking.js
│   │   └── Equipment.js
│   ├── routes/
│   │   ├── bookingRoutes.js
│   │   ├── equipmentRoutes.js
│   │   └── healthRoutes.js
│   ├── server.js
│   └── package.json
├── ai/
│   ├── model.py
│   ├── inference.py
│   └── dataset/
├── docs/
├── .gitignore
├── README.md
├── rule.md
└── context.md
```

## 5) Team Split Recommendation

- Frontend engineer A: `frontend/src/pages` flows and UX
- Frontend engineer B: `frontend/src/components` and styling polish
- Backend engineer A: `backend/controllers`, `backend/routes`
- Backend engineer B: `backend/models`, Mongo integration
- AI engineer: `ai/` demand/pricing enhancements
- Docs/pitch owner: `docs/` architecture + presentation

## 6) Backend Architecture

### 6.1 Entry Point

- `backend/server.js`
  - Loads env with `dotenv`
  - Connects MongoDB (`MONGODB_URI`, default local URI)
  - Registers middleware: `cors`, `express.json`, `morgan`
  - Mounts routes:
    - `/api/health`
    - `/api/equipment`
    - `/api/bookings`
  - Handles 404 via `notFound`
  - Handles errors via `errorHandler`

### 6.2 Data Models

- `Equipment` (`backend/models/Equipment.js`)
  - ownerName, name, category, description, location
  - hourlyRate, dailyRate
  - availability[] (`date`, `isAvailable`)
  - images[]
  - isActive
  - timestamps

- `Booking` (`backend/models/Booking.js`)
  - equipment (ref: Equipment)
  - renterName, renterPhone
  - startDate, endDate
  - totalPrice
  - status: `requested|confirmed|completed|cancelled`
  - paymentStatus: `pending|paid|failed`
  - timestamps

### 6.3 Controllers

- Equipment controller
  - list with optional filters (`search`, `location`, `category`)
  - get by id
  - create equipment
  - update equipment

- Booking controller
  - list with optional filters (`equipmentId`, `renterPhone`)
  - create booking with validation:
    - required fields check
    - equipment existence
    - date validity + range validation
    - overlap conflict check with active bookings
    - auto-compute `totalPrice` from day count * equipment daily rate
  - update booking/payment status

### 6.4 API Endpoints

- `GET /api/health`
- `GET /api/equipment`
- `GET /api/equipment/:id`
- `POST /api/equipment`
- `PATCH /api/equipment/:id`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`

## 7) Frontend Architecture

### 7.1 Boot Flow

- `frontend/public/index.html` loads `../src/main.js`
- `main.js` calls `initApp()` from `App.js`

### 7.2 State + Navigation

- `App.js` manages SPA-like state:
  - `activePage`
  - `history` (manual back stack)
  - `equipment`
  - `loading`, `error`
- `navigateTo(page, options)` supports history control
- `goBack()` returns to prior page, falls back to home when stack empty
- Recent fix included:
  - stable back from login/register
  - auth page switch links not polluting history

### 7.3 Frontend API Service

- `frontend/src/services/api.js`
  - Base URL: `http://localhost:5000/api`
  - Methods:
    - `getEquipmentList(query)`
    - `createEquipment(payload)`
    - `createBooking(payload)`

### 7.4 Current UX Status

- Marketplace browsing works with filtering
- Listing equipment form works
- Booking request flow works (prompt-based input)
- Login/register UI exists but auth is placeholder (alert-based, no token/session yet)

## 8) AI Module Status

- `ai/model.py`
  - simple heuristic demand score function
- `ai/inference.py`
  - simple price suggestion based on demand score

This is scaffold code and can be replaced with real model logic later.

## 9) Setup & Run

## 9.1 Backend

```bash
cd backend
npm install
npm run dev
```

Backend defaults:

- Port: `5000`
- Mongo URI fallback: `mongodb://127.0.0.1:27017/agri_tools_marketplace`

Optional env:

- `PORT`
- `MONGODB_URI`
- `NODE_ENV`

## 9.2 Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

- `http://localhost:5173/public/index.html`

## 9.3 Quick Checks

```bash
cd backend && npm run check
cd frontend && npm run check
```t

## 10) Known Gaps / Next Priorities

- Real authentication API + frontend integration
- Persist logged-in user state
- Replace prompt-based booking input with proper booking modal/form
- Add availability calendar UI and editing
- Integrate payments (even mock gateway for demo)
- Add booking dashboard for owners/renters
- Add seed data script for faster demo setup
- Improve responsive behavior and accessibility checks

## 11) Suggested Immediate Implementation Order

1. Add backend auth routes/controllers (`login`, `register`)
2. Add user model and password hashing
3. Connect login/register forms to backend API
4. Store auth token and protect owner actions
5. Add booking management page (status updates)
6. Add demo seed script + sample records

## 12) Handoff Notes for Next AI Agent

When continuing this project:

- Read `rule.md` first and obey stack constraints
- Keep edits minimal and within current architecture
- Prefer extending existing files/modules before adding new patterns
- Do not introduce new frameworks
- Keep frontend as vanilla JS module SPA style
- Keep backend REST + Mongoose style consistent

End goal for MVP demo:

- Farmer can browse, search, and book equipment
- Owner can list equipment and see booking requests
- Basic auth and booking lifecycle shown end-to-end

