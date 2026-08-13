<div align="center">

# EliteCV Pro

**AI-Powered Professional Resume Builder**

Create stunning, ATS-friendly CVs in minutes with 28 unique templates, multi-language support (EN / FR / AR), and Gemini AI assistance.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Features

- **28 Professional Templates** — Modern, Executive, Creative, Classic, Minimalist, Premium
- **AI Engine (Gemini)** — Parse existing CVs, rewrite summaries, refine bullet points, generate cover letters
- **Multi-language** — Full support for English, French and Arabic (with RTL)
- **Live Preview** — Real-time updates while you edit
- **ATS Optimized** — Dedicated templates (Atlas + others) built for applicant tracking systems
- **Print / PDF Ready** — High-quality export with proper page breaks and color preservation
- **Beautiful UI** — Pro components, animations (Framer Motion), confetti on completion
- **Photo Support** — Optional profile photo on most templates

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 19 + TypeScript + Vite 6      |
| Styling     | Tailwind CSS 4 + custom CSS         |
| Animations  | Framer Motion + canvas-confetti     |
| Backend     | Express 5 (Node.js)                 |
| AI          | Google Gemini 1.5 Flash             |
| Icons       | Lucide React                        |

---

## Quick Start

### Prerequisites

- Node.js 18+
- A Gemini API key (free tier works) → [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone
git clone https://github.com/jemesza1/elite-cv-pro.git
cd elite-cv-pro

# 2. Install dependencies
npm install

# 3. Environment
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 4. Run (frontend + backend)
npm run dev
```

- Frontend → http://localhost:3000  
- Backend API → http://localhost:3001

---

## Environment Variables

Create a `.env.local` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> The app works without the key (demo mode for AI features), but real AI generation requires a valid key.

---

## Project Structure

```
elite-cv-pro/
├── App.tsx                      # Main application logic & routing
├── types.ts                     # TypeScript interfaces & template types
├── index.css                    # Global styles + all template CSS
├── components/
│   ├── LandingPage.tsx
│   ├── SelectionView.tsx
│   ├── ProInput.tsx             # Pro form components
│   ├── ProProgress.tsx          # Step progress indicators
│   ├── ProTemplateGrid.tsx      # Template selection grid
│   ├── CVPreview.tsx            # Original 8–12 templates
│   ├── CVPreview_NEW_TEMPLATES.tsx
│   ├── CVPreview_NEW_PRO_TEMPLATES.tsx
│   ├── CVPreview_MORE_TEMPLATES.tsx
│   └── CVPreview_PREMIUM.tsx    # Elite / Minimal / Silicon Valley / Parisian
├── services/
│   └── geminiService.ts         # Frontend API client for AI features
├── server/
│   └── server.js                # Express backend (parse, optimize, refine, chat, summary)
└── package.json
```

---

## Available Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm run dev`    | Start frontend (Vite) + backend together |
| `npm run build`  | Production build                         |
| `npm run preview`| Preview production build                 |

---

## Template Categories

| Category       | Templates                                      |
|----------------|------------------------------------------------|
| Professional   | Atlas (ATS), Executive, Meridian, Nexus, Harvard, Oxford |
| Modern         | Zurich, Silicon, Prism, Berlin, Stockholm, Cascade, Orbit |
| Creative       | Zenith, Spectrum, Nova, Vogue, Ignite, Vertex, Tokyo |
| Classic        | Quantum, Harvard, Oxford                       |
| Minimalist     | Echo, Zurich, Minimal                          |
| Premium        | Elite (Gold), Parisian, Silicon Valley         |
| Special        | Montreal (Bilingual FR/EN)                     |

---

## AI Features

| Endpoint              | Description                                      |
|-----------------------|--------------------------------------------------|
| `POST /api/parse`     | Upload PDF/image → extract structured CV data    |
| `POST /api/optimize`  | Rewrite whole CV for a specific persona/style    |
| `POST /api/refine`    | Turn raw notes into strong XYZ-formula bullets   |
| `POST /api/summary`   | Generate professional summary from title + skills|
| `POST /api/chat`      | AI cover letter assistant                        |

All AI calls go through the Express backend (API key never exposed to the client).

---

## Production Notes

1. Set a strong `GEMINI_API_KEY` in your hosting environment.
2. The backend must run alongside the frontend (or use a reverse proxy).
3. For static hosting only, you would need to move AI calls to a serverless function.
4. Print/PDF works best in Chromium-based browsers.

---

## License

Proprietary — EliteCV Platform. All template designs are original.

---

**Status:** Production Ready  
**Last major update:** 2026-01-30  
**Templates:** 28  
**Languages:** EN · FR · AR
