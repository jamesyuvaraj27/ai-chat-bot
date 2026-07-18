# AI Echo Bot

A modern, production-ready chat application with a **pluggable AI provider architecture**. Send messages and receive responses — currently echoes back your input, but designed so any AI provider (Gemini, Claude, OpenAI, Ollama, DeepSeek) can be integrated by editing a single file.

---

## ✨ Features

- **Beautiful Dark-Mode UI** — Glassmorphism, gradient accents, micro-animations
- **Real-time Chat** — Typing indicator, auto-scroll, message timestamps
- **Pluggable AI Backend** — Strategy/Provider pattern for zero-friction AI integration
- **Input Validation** — Trims whitespace, rejects empty / oversized messages
- **Security** — Helmet, CORS, rate limiting out of the box
- **Error Handling** — Global error handler, 404 catch-all, structured JSON responses
- **Responsive** — Works beautifully on desktop and mobile

---

## 📁 Project Structure

```
ai-echo-bot/
├── backend/
│   ├── src/
│   │   ├── config/          # Centralised environment config
│   │   ├── constants/       # App-wide constants
│   │   ├── controllers/     # Route handlers (thin layer)
│   │   ├── middlewares/     # Error handler, 404, rate limiter
│   │   ├── models/          # Data models (placeholder for DB)
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # Business logic
│   │   │   └── providers/   # AI provider implementations
│   │   │       ├── baseProvider.js
│   │   │       └── mockProvider.js
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Request validation
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── WelcomeScreen.jsx
│   │   │   ├── TypingIndicator.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useChat.js
│   │   ├── services/        # API client
│   │   │   └── api.js
│   │   ├── utils/           # Helpers
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # Design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the repository

```bash
git clone <repo-url>
cd ai-echo-bot
```

### 2. Install backend dependencies

```bash
cd backend
cp .env.example .env
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### Start the backend (port 5000)

```bash
cd backend
npm run dev
```

### Start the frontend (port 5173)

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Design

### `POST /api/chat`

Send a message and receive an AI response.

**Request:**
```json
{
  "message": "Hello"
}
```

**Response:**
```json
{
  "success": true,
  "response": "You said: Hello"
}
```

### `GET /api/health`

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Error Responses

```json
{
  "success": false,
  "error": "Message cannot be empty."
}
```

---

## ⚙️ Environment Variables

| Variable        | Description                          | Default                   |
| --------------- | ------------------------------------ | ------------------------- |
| `PORT`          | Server port                          | `5000`                    |
| `NODE_ENV`      | Environment                          | `development`             |
| `CLIENT_URL`    | Frontend origin for CORS             | `http://localhost:5173`   |
| `LLM_PROVIDER`  | Active AI provider                   | `mock`                    |
| `LLM_API_KEY`   | API key for the chosen provider      | (empty)                   |
| `LLM_BASE_URL`  | Custom base URL (e.g. Ollama)        | (empty)                   |

---

## 🔮 Future AI Integration Guide

The backend uses a **Strategy/Provider pattern** that makes switching AI providers a one-step process:

### Step 1: Create a new provider

```javascript
// backend/src/services/providers/geminiProvider.js
import BaseProvider from './baseProvider.js';

export class GeminiProvider extends BaseProvider {
  constructor(apiKey) {
    super('gemini');
    this.apiKey = apiKey;
    // Initialise Gemini SDK here
  }

  async generateResponse(message) {
    // Call Gemini API and return the response text
    const result = await geminiModel.generateContent(message);
    return result.response.text();
  }
}

export default GeminiProvider;
```

### Step 2: Register it in `chatService.js`

```javascript
case LLM_PROVIDERS.GEMINI:
  return new GeminiProvider(config.llm.apiKey);
```

### Step 3: Update `.env`

```
LLM_PROVIDER=gemini
LLM_API_KEY=your-api-key-here
```

**That's it.** No changes to controllers, routes, middleware, or the frontend.

### Supported provider slots

| Provider   | Status     | Env Value   |
| ---------- | ---------- | ----------- |
| Mock       | ✅ Active   | `mock`      |
| Gemini     | 🔮 Ready   | `gemini`    |
| Claude     | 🔮 Ready   | `claude`    |
| OpenAI     | 🔮 Ready   | `openai`    |
| Ollama     | 🔮 Ready   | `ollama`    |
| DeepSeek   | 🔮 Ready   | `deepseek`  |

---

## 📜 Scripts

### Backend

| Script          | Command             | Description                |
| --------------- | ------------------- | -------------------------- |
| `npm start`     | `node src/server.js` | Production start           |
| `npm run dev`   | `nodemon src/server.js` | Development with hot reload |

### Frontend

| Script          | Command             | Description                |
| --------------- | ------------------- | -------------------------- |
| `npm run dev`   | `vite`              | Development server         |
| `npm run build` | `vite build`        | Production build           |
| `npm run preview` | `vite preview`    | Preview production build   |

---

## 🏗️ Architecture

```
┌─────────────────────────────┐
│       Frontend (React)       │
│  Components → Hook → Axios  │
└──────────┬──────────────────┘
           │ POST /api/chat
┌──────────▼──────────────────┐
│       Backend (Express)      │
│  Route → Validator →         │
│  Controller → Service        │
└──────────┬──────────────────┘
           │
┌──────────▼──────────────────┐
│     Provider Layer           │
│  BaseProvider (abstract)     │
│  ├── MockProvider ✅         │
│  ├── GeminiProvider 🔮       │
│  ├── ClaudeProvider 🔮       │
│  ├── OpenAIProvider 🔮       │
│  ├── OllamaProvider 🔮       │
│  └── DeepSeekProvider 🔮     │
└─────────────────────────────┘
```

---

## 📝 Next Steps

1. **Integrate an AI provider** — Follow the guide above
2. **Add a database** — Use the `models/` directory with MongoDB/PostgreSQL
3. **Add authentication** — JWT or session-based auth
4. **Add conversation history** — Store and retrieve past sessions
5. **Add streaming responses** — SSE or WebSocket for real-time AI output
6. **Deploy** — Docker, Vercel (frontend), Railway/Render (backend)

---

## License

MIT
