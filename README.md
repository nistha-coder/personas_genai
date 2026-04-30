# Persona-Based AI Chatbot

A submission-ready Prompt Engineering assignment project using HTML, CSS, JavaScript, Node.js, and Groq API.

## Personas Included

- Anshuman Singh
- Abhimanyu Saxena
- Kshitij Mishra

## Features

- Persona switcher for all 3 personalities
- Chat reset when persona changes
- Active persona clearly visible in UI
- Suggestion chips (quick-start questions) per persona
- Typing indicator while waiting for API
- Graceful API error handling
- Mobile and desktop responsive UI
- Distinct system prompts with:
  - persona description
  - 3 few-shot examples each
  - chain-of-thought instruction (internal reasoning)
  - output format instruction
  - constraints

## Project Structure

```txt
persona-chatbot/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── personas.js
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── .env.example
├── prompts.md
├── reflection.md
└── README.md
```

## Local Setup

### 1) Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example` and add your key:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
# OPENAI_API_KEY=your_openai_api_key_here
# OPENAI_MODEL=gpt-4o-mini
# GEMINI_API_KEY=your_gemini_api_key_here
# GEMINI_MODEL=gemini-2.0-flash
PORT=5000
FRONTEND_ORIGIN=http://localhost:5500
```

Run backend:

```bash
npm start
```

### 2) Frontend setup

Open `frontend/index.html` using Live Server (recommended on port 5500), or any local static server.

## API

- `GET /health` -> health check
- `POST /chat` -> send chat message

Request body:

```json
{
  "message": "How do I stay consistent?",
  "persona": "kshitij"
}
```

## Deployment

### Frontend
- Deploy `frontend` folder to Netlify or Vercel.

### Backend
- Deploy `backend` to Render/Railway.
- Set environment variables in dashboard:
  - `GROQ_API_KEY`
  - `GROQ_MODEL`
  - (optional) `OPENAI_API_KEY`
  - (optional) `OPENAI_MODEL`
  - (optional) `GEMINI_API_KEY`
  - (optional) `GEMINI_MODEL`
  - `FRONTEND_ORIGIN`

After deployment, update `API_BASE_URL` in `frontend/script.js` with your deployed backend URL.

## Submission Checklist

- [ ] Public GitHub repo
- [ ] Live project URL
- [ ] `prompts.md` with all 3 annotated prompts
- [ ] `reflection.md` (300-500 words)
- [ ] `.env.example` present
- [ ] No real API key in repo
- [ ] Persona switching works and resets chat
- [ ] API errors handled gracefully
- [ ] Mobile responsive UI

## Screenshots

Add screenshots here before final submission:

- Home screen with persona switcher
- Chat with Anshuman
- Chat with Abhimanyu
- Chat with Kshitij
- Mobile view
