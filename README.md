# 🚀 Hackathon 2026

### 👥 The Dream Team
* **Goutham** 
* **Vishruth P** 
* **Shubham Sheelvant** 
* **Suhas D T** 
## Agri Tools Rental Marketplace

Digital marketplace prototype for listing, discovering, and renting agricultural machinery in local regions.

### Problem Statement
Small and medium-scale farmers often cannot afford expensive machinery, while many equipment owners underutilize their assets.  
This platform enables shared access to tractors, harvesters, irrigation tools, and other farm equipment.

### Tech Stack
- Frontend: HTML, JavaScript, Tailwind CSS, custom CSS
- Backend: Node.js, Express, REST API
- Database: MongoDB
- AI/ML: Python starter scripts for demand/pricing experimentation

### Project Structure (Hackathon Team Friendly)
```text
hackathon-project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── ai/
│   ├── model.py
│   ├── dataset/
│   └── inference.py
│
├── docs/
│   ├── architecture.png
│   └── presentation.pptx
│
├── .gitignore
├── README.md
└── LICENSE
```

### Suggested Team Split
- Member 1: `frontend/src/pages` and UX flows
- Member 2: `frontend/src/components` and styling
- Member 3: `backend/controllers` and `backend/routes`
- Member 4: `backend/models`, database integration, and `ai/`

### Quick Start
1. Start backend:
   - `cd backend`
   - `npm install`
   - Ensure MongoDB is running locally or set `MONGODB_URI` in environment
   - `npm run dev`

2. Start frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
   - Open `http://localhost:5173/public/index.html`

### Starter API Endpoints
- `GET /api/health`
- `GET /api/equipment`
- `GET /api/equipment/:id`
- `POST /api/equipment`
- `PATCH /api/equipment/:id`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`

### Next Build Steps
- User authentication (owners/renters)
- Availability calendar and conflict prevention UI
- Online payments
- Ratings and trust score
- Regional language support
