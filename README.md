# 🌟 FlashBack

> _A sleek, user-friendly flashcard web app built with **Next.js** and **TypeScript**, designed as a personal journey to master modern full-stack development._

FlashBack started as a school project made with **React + Express**.
Now it’s being **rebuilt from scratch** using a modern stack—focusing on cleaner architecture, DX, and scalability.

---

## ✨ What’s New in the Rebuild?

- ⚡ **Next.js 15 (App Router + Turbopack)**
- 🧠 **Full TypeScript support**
- 🔐 **Supabase Auth + SSR session handling**
- ✅ **Zod for validation**
- 🧰 **Zustand for state management**
- 🎭 **Animations with Framer Motion**
- 🌗 **Dark mode via next-themes**
- 🎬 **Lottie animations for UI delight**

---

## 🚀 Core Features

- 📝 Create & manage flashcards, decks, and tags
- 🔎 Smart filtering & search
- 🔁 Review mode with dynamic scheduling (Again / Hard / Easy)
- 🌗 Dark mode toggle
- 📊 User progress tracking _(coming soon)_
- 🧠 Spaced repetition engine _(coming soon)_

---

## 🧰 Tech Stack

### **Frontend Core**

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

### **Backend / Auth**

- Supabase (DB + Auth + SSR session)

### **State & Validation**

- Zustand
- Zod

### **UI / Animation**

- Framer Motion
- @lottiefiles/dotlottie-react
- react-icons
- next-themes

---

## ✅ Actual Key Dependencies (after cleanup)

```json
"dependencies": {
  "next": "15.x",
  "react": "19.x",
  "react-dom": "19.x",
  "@supabase/supabase-js": "latest",
  "@supabase/ssr": "latest",
  "zustand": "latest",
  "zod": "latest",
  "framer-motion": "latest",
  "@lottiefiles/dotlottie-react": "latest",
  "@dotlottie/player-component": "latest",
  "react-icons": "latest",
  "next-themes": "latest"
},
"devDependencies": {
  "typescript": "latest",
  "tailwindcss": "latest",
  "eslint": "latest",
  "eslint-config-next": "latest"
}
```

✅ No more bcrypt / jsonwebtoken / jose
✅ No more react-hook-form / dnd-kit
✅ No more drizzle-kit
✅ No more lottie-react (only dotlottie)

---

## 🛠 Getting Started

```bash
git clone https://github.com/your-username/flashback.git
cd flashback
npm install
npm run dev
```

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # if running server actions
```

> ✅ Supabase handles JWT & password hashing internally—no custom JWT code needed.

---

## 🎯 Learning Goals

This project is my way to master:

- TypeScript in real-world apps
- Next.js App Router + SSR + Middleware
- Clean, scalable architecture
- Supabase as a backend service
- UI/UX polish with motion & themes

---

## 🙌 Contributions

This is an active learning playground.
Suggestions, PRs, and feedback are always welcome! 🚀

---

## 📜 License

Originally an academic project, now open source for educational use.
_Not intended for commercial distribution._

---

Want me to add **screenshots / tech architecture diagram / roadmap section** next?
That would make this README look **super professional**.
