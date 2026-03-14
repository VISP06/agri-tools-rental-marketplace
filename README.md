# AgriRent - Farm Equipment Rental Marketplace

> Hackathon 2026 Project

### Team
- **Goutham**
- **Vishruth P**
- **Shubham Sheelvant**
- **Suhas D T**

**Live Demo:** https://agri-tools-rental-marketplace.onrender.com

---

## Problem Statement

Small and medium-scale farmers often cannot afford expensive machinery, while many equipment owners underutilize their assets. This platform enables shared access to tractors, harvesters, irrigation tools, and other farm equipment in local regions.

---

## Features

- Browse and search equipment by name, category, and location
- Location-based proximity sorting using device GPS
- User registration and login
- List your own equipment for rent with images
- Add to cart and book with custom date selection
- Confirm bookings — no payment gateway required
- **My Bookings** — view full rental history in your profile
- **My Listings** — manage equipment you've listed
- Download booking invoice as PDF
- Fully responsive UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JavaScript (ES Modules), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | SQLite via `better-sqlite3` |
| Location | Google Maps Places API, OpenStreetMap Nominatim |
| Deployment | Render.com (single service) |

---

## Project Structure

```
agri-tools-rental-marketplace/
├── index.html                  # Main HTML entry point
├── migrate.js                  # Data migration script (local → Render)
├── frontend/
│   └── src/
│       ├── main.js             # App entry point
│       ├── App.js              # State management, routing, event handling
│       ├── styles.css          # Global styles
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── EquipmentCard.js
│       │   └── CategoryDropdown.js
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── MarketplacePage.js
│       │   ├── EquipmentDetailPage.js
│       │   ├── ListEquipmentPage.js
│       │   ├── CartPage.js
│       │   ├── PaymentPage.js
│       │   ├── BookingConfirmationPage.js
│       │   ├── ProfilePage.js
│       │   ├── LoginPage.js
│       │   ├── RegisterPage.js
│       │   ├── AboutPage.js
│       │   └── ContactPage.js
│       ├── services/
│       │   └── api.js          # All API calls
│       └── utils/
│           ├── locationSearch.js
│           └── smartSearch.js
└── backend/
    ├── server.js               # Express server + static file serving
    ├── db/
    │   └── database.js         # SQLite schema and initialization
    ├── controllers/
    │   ├── equipmentController.js
    │   ├── bookingController.js
    │   └── userController.js
    ├── routes/
    │   ├── equipmentRoutes.js
    │   ├── bookingRoutes.js
    │   ├── userRoutes.js
    │   └── healthRoutes.js
    └── middleware/
        ├── notFound.js
        └── errorHandler.js
```

---

## Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/VISP06/agri-tools-rental-marketplace.git
cd agri-tools-rental-marketplace

# 2. Install backend dependencies
cd backend && npm install

# 3. Start the server
node server.js

# 4. Open in browser
# http://localhost:5000
```

The backend serves the frontend — no separate frontend server needed.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/equipment` | List all equipment (supports search, location, category filters) |
| POST | `/api/equipment` | Add new equipment |
| DELETE | `/api/equipment/:id` | Delete equipment |
| POST | `/api/equipment/:id/rate` | Rate equipment |
| GET | `/api/equipment/reverse-geocode` | Reverse geocode coordinates |
| GET | `/api/equipment/geocode` | Geocode address to coordinates |
| GET | `/api/bookings?renterId=` | Get bookings (filter by user) |
| POST | `/api/bookings` | Create a booking |
| POST | `/api/bookings/batch` | Create multiple bookings |
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |

---

## Deployment (Render.com)

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

> **Note:** Render free tier uses an ephemeral filesystem — the SQLite database resets on restart. Run `node migrate.js` from the project root to restore all data after a restart.
