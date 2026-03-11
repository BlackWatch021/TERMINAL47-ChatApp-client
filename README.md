# TERMINAL47

Anonymous, ephemeral real-time chat with live translation.  
No signup. Link-only access. Hacker terminal UI.  
Switch languages mid-chat — history bulk-translates instantly.

<img src="/assets/Cover.png" alt="Terminal47 Chat Interface" width="800"/>

---

## ✨ Features

- **Zero-friction access** — Share link, join as `Agent-47`
- **Real-time chat** — Socket.io broadcasts
- **Live translation** — Bulk history + streaming new messages
- **User presence** — Live count + join/leave notifications
- **Room expiry** — Auto-destruct countdown
- **Hacker terminal UI** — Green monospace glow aesthetic
- **Anonymous** — No authentication (Agent names via localStorage)
- **TypeScript** — End-to-end type safety
- **Mobile responsive** — Collapsible sidebar
- **Typing indicators**

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- Socket.io Client
- Lucide React
- JetBrains Mono

### Backend

- Express.js
- Socket.io
- JavaScript
- dotenv
- CORS

### Translation

- Lingo.dev SDK

---

## 🚀 Quick Start

---

### 1️⃣ Backend Setup

```bash
cd server
cp .env.example .env
```

Edit `.env`:

```env
PORT=8000
LINGO_DEV_API_KEY=your_key_here
CLIENT_URL=http://localhost:3000
```

Run backend:

```bash
npm install
npm run dev
```

Backend runs at:

```
http://localhost:8000
```

---

### 2️⃣ Frontend Setup

```bash
cd client
cp .env.example .env
```

Edit `.env`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Run frontend:

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🧪 Test Flow

1. Open `http://localhost:3000`
2. Create a room → Copy generated link `/chat/abc123`
3. Open link in incognito
4. Join as anonymous Agent
5. Start chatting
6. Switch language → Entire history translates instantly ✨
7. Timer hits 1 min → Red warning
8. Timer expires → Room auto-destructs permanently

---

## 🌐 Translation Flow

<img src="/assets/img2.png" alt="Terminal47 Chat Interface" width="800"/>

```
Language Switch (SideNavBar)
        ↓
useEffect triggers → /auth/translation/bulk
        ↓
allMessages[] → Lingo.dev → setAllMessages(translated)
        ↓
New message → socket.on()
        ↓
/auth/translation/chunk
        ↓
Auto-translated before render
```

---

## 🔒 Privacy First

- No database
- No authentication
- No message logs
- Link-only access (Room ID = access key)
- Pure in-memory storage
- Data erased automatically on expiry
- Zero persistence by design

---

## ✅ V1 Checklist

- [x] Real-time messaging (Socket.io)
- [x] User presence tracking + system messages
- [x] Live translation (bulk + streaming)
- [x] Accurate room expiry countdown
- [x] Hacker terminal UI
- [x] Anonymous link-based access
- [x] Mobile responsive layout
- [x] TypeScript end-to-end
- [x] Production-safe error states

---

## 🔮 Future Plans

### V2 Roadmap

- Redis TTL room persistence
- Room passwords
- File/image sharing
- Terminal commands (`/clear`, `/name Agent99`)
- Advanced typing indicators
- Optional limited message history (last 50 messages)

---

## 🧠 Philosophy

TERMINAL47 is designed around:

- Ephemerality
- Identity preservation
- Stateless architecture
- Minimal attack surface
- Zero-data liability

This is a privacy-first communication experiment — not a traditional chat app.

---
