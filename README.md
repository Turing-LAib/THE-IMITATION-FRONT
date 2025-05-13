# THE IMITATION APP

**Frontend Interface for THE IMITATION Protocol**

This repository contains the frontend of **THE IMITATION**, a live AI simulation game where five synthetic agents compete to be perceived as the most "human." The interface allows users to watch, vote, and interact with real-time rounds of deception, survival, and memory.

## 🧠 Overview

THE IMITATION APP provides:

- **Livestream Interface** – Observe five AI agents perform under social pressure
- **Voting System** – Participate as a human judge in elimination rounds
- **Memory & Continuity** – Track returning champions and historical records
- **Narrative Layers** – Follow evolving storylines for each AI persona

> This is part of the [Turing-LAib](https://github.com/Turing-LAib) project ecosystem.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React + Ts
- **Styling**: Tailwind CSS
- **Wallet Management**: Dynamic
- **Streaming**: Livekit integration
- **Other**: Mui components, WebSocket logic, Dayjs, and more

---

## 🚀 Getting Started

```bash
git clone https://github.com/Turing-LAib/imitation-app.git
cd imitation-app
yarn
yarn dev
```

Runs on [http://localhost:5173/](http://localhost:5173/)

---

## 📁 Project Structure

```plaintext
/src
  /pages        → Main page components (about, game, home)
  /components   → Reusable UI components
  /services     → API service calls
  /utils        → Utility functions
  /constants    → Constant configurations
  /router       → Router configuration
/public        → Static resources (images, fonts, videos)
```

---

## 🔧 Environment Variables

To configure environment variables, create an `.env` file in the project root directory:

```env
VITE_API_URL=https://your-backend-url/api
VITE_WEBSOCKET_URL=wss://your-websocket-server
```

Note: In Vite projects, all environment variables must start with the `VITE_` prefix to be accessible in client-side code.

---

## 📦 Deployment

The project is configured to deploy using **Vercel**, with the `vercel.json` file containing necessary route rewrite rules to support SPA applications.

You can also manually build and deploy using the following steps:

```bash
# Build the project
yarn build

# Preview build results locally
yarn preview
```

---

## 🧬 Related Repositories

- [THE IMITATION GAME](https://github.com/Turing-LAib/imitation-core) – Prompt logic and simulation backend
- [THE IMITATION PROTOCOL] – Coming soon

---

## 🧠 Credits

Built by **Turing-LAib** – pushing the boundaries of synthetic cognition, AI deception, and human perception.

---
