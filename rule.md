# AI Agent Rules for This Project

This file defines **non-negotiable constraints** for any AI agent working in this repository.

If a request conflicts with these rules, the agent must **not** proceed silently and should ask for explicit maintainer approval.

## 1) Locked Tech Stack (Do Not Change)

Use only the stack below unless maintainers explicitly approve a change.

- Frontend: **HTML + JavaScript + Tailwind CSS + CSS**
- Backend: **Node.js + Express + REST API**
- Database: **MongoDB** (with Mongoose in backend code)
- AI/ML: **Python scripts inside `ai/`**

## 2) Languages Allowed by Folder

- `frontend/` -> HTML, CSS, JavaScript only
- `backend/` -> JavaScript (Node.js/Express) only
- `ai/` -> Python only
- `docs/` -> documentation assets only

Do not introduce different programming languages in these folders.

## 3) Strictly Prohibited Without Approval

- No React, Next.js, Vue, Angular, Svelte
- No TypeScript migration
- No Django, Flask, FastAPI, Spring Boot, Laravel, Ruby on Rails
- No SQL database replacement (PostgreSQL/MySQL/SQLite) for core backend storage
- No folder renaming that breaks the agreed hackathon structure

## 4) Project Structure Must Stay Team-Friendly

Keep this structure intact so members can work in parallel:

```text
frontend/
  public/
  src/
    components/
    pages/
    services/
    App.js
backend/
  controllers/
  routes/
  models/
  middleware/
  server.js
ai/
  model.py
  dataset/
  inference.py
docs/
```

## 5) Coding Boundaries

- Frontend logic stays in `frontend/src/`
- API/business logic stays in `backend/`
- Data models stay in `backend/models/`
- Experimental intelligence logic stays in `ai/`
- Documentation and presentation material stay in `docs/`

## 6) Dependency Rules

- Add only dependencies that support the locked stack
- Do not add libraries that imply a framework switch
- Keep dependencies minimal and hackathon-friendly

## 7) API and Data Rules

- Keep backend as REST endpoints
- Use JSON request/response patterns
- Use MongoDB-compatible model design
- Do not introduce incompatible API paradigms unless approved

## 8) Agent Behavior Rules

- Make focused, minimal changes related to the request
- Do not refactor into another architecture by default
- Do not create files in random locations
- Respect existing naming and folder conventions
- If uncertain, stop and ask for clarification

## 9) Final Check Before Completing Any Task

- Did I stay within the approved stack?
- Did I keep code inside the correct folder?
- Did I avoid introducing a new framework/language?
- Did I preserve project structure for team parallel work?

If any answer is "No", revise before finishing.

