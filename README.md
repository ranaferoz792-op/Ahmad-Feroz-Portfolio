# Ahmad Feroz | Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing my work, skills, and a way for clients or employers to get in touch — now with an AI-powered chat widget that answers questions about my background in real time.

## 📋 Project Info

- **Repository:** Portfolio
- **Type:** Personal Portfolio Website
- **Live Preview:** _(add your live link here, e.g. Vercel/Netlify URL)_

## ✨ Features

- **Responsive Design** — works seamlessly on desktop, tablet, and mobile
- **Modern UI Components** — built with shadcn/ui and Radix UI
- **Smooth Animations** — powered by Framer Motion (parallax orbs, scroll reveals, hover spotlights)
- **Hero Section** — animated typewriter intro cycling through roles
- **About Section** — quick stats and personal intro
- **Skills Showcase** — categorized into Frontend, Backend, Database, and Tools
- **Projects Portfolio** — live links, GitHub links, and tech stack tags per project
- **Contact Section** — one-click Gmail compose + social links
- **WhatsApp Floating Button** — instant chat for inquiries
- **AI Chat Widget** — floating "Ask Me" button that opens a chat panel where visitors can ask about my skills, projects, and experience; protected by Cloudflare Turnstile and powered by Groq, with automatic English / Roman Urdu language matching
- **Smooth Scroll Navbar** — glassmorphic floating nav with mobile menu

## 🛠️ Tech Stack

| Category | Tech |
|---|---|
| Frontend | React 18+ |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Components | shadcn/ui & Radix UI |
| Animations | Framer Motion |
| Routing | React Router |
| State/Data | TanStack React Query |
| Forms | React Hook Form |
| Testing | Vitest |
| Linting | ESLint |
| AI Chat Backend | Vercel Serverless Functions, Groq API |
| Bot Protection | Cloudflare Turnstile |

## 📁 Project Structure

```
api/                          # Vercel serverless functions (AI chat backend)
├── _session.mjs              # Signed session-token helper (stateless auth)
├── _detectLanguage.mjs       # English / Roman Urdu detection for replies
├── verify.mjs                # POST /api/verify — Cloudflare Turnstile check
└── chat.mjs                  # POST /api/chat — Groq chat completion

src/
├── components/
│   ├── AboutSection.tsx
│   ├── ChatWidget.tsx         # Floating AI chat widget (Turnstile-gated)
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── NavLink.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── WhatsAppButton.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── resumeContext.ts      # AI persona/system prompt + starter questions
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm or bun
- Git
- Vercel CLI (`npm install -g vercel`) — required to run the `/api` chat backend locally

### Environment Variables

Create a `.env` file in the project root (never commit this file):

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile

TURNSTILE_SECRET_KEY=your_turnstile_secret_key
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key

SESSION_SECRET=a_long_random_string
```

Generate `SESSION_SECRET` with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The same variables must also be added in **Vercel Dashboard → Project Settings → Environment Variables** for the live deployment.

### Local Development

```bash
# Clone the repository
git clone https://github.com/ranaferoz792-op/Portfolio.git

# Navigate to the project directory
cd Portfolio

# Install dependencies
npm install
# or
bun install

# Link to your Vercel project (one-time)
vercel link

# Start the dev server WITH the /api chat backend
vercel dev
```

> Plain `npm run dev` only runs the Vite frontend — the `/api/chat` and `/api/verify` routes won't work without `vercel dev`.

App runs at **http://localhost:3000** (via `vercel dev`) or **http://localhost:5173** (plain Vite, frontend-only).

## 📝 Available Scripts

```bash
npm run dev          # Frontend-only dev server (no /api routes)
vercel dev           # Full dev server including /api chat backend
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run linter
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## 🖊️ Editing Options

1. **Local IDE** — clone, edit in VS Code/WebStorm, push to GitHub
2. **Edit on GitHub** — use the pencil icon on any file
3. **GitHub Codespaces** — spin up a cloud IDE via the "Code" button

## 📦 Key Dependencies

- React & React Router — UI framework and navigation
- Tailwind CSS — utility-first styling
- shadcn/ui & Radix UI — accessible component primitives
- Framer Motion — animation library
- TanStack Query — data fetching/state management
- React Hook Form + Zod — forms and validation
- Sonner — toast notifications
- react-icons — Gmail/WhatsApp/social icons
- @marsidev/react-turnstile — Cloudflare Turnstile bot verification widget

## 🤖 AI Chat Widget

A floating chat button lets visitors ask about my skills, projects, education, and experience. It:

- Verifies the visitor is human via an invisible **Cloudflare Turnstile** check before unlocking chat
- Replies in **first person as me**, strictly scoped to my professional background (off-topic questions get politely redirected)
- Automatically replies in **English or Roman Urdu** depending on how the visitor writes
- Is powered by **Groq** (`llama-3.3-70b-versatile` by default) via a Vercel serverless function — no API key is ever exposed to the browser

To edit what the bot knows or how it behaves, update `src/lib/resumeContext.ts`.

## 🧪 Testing

This project uses **Vitest**.

```bash
npm run test        # Run once
npm run test:watch  # Watch mode
```

## 📄 License

Open source, available under the MIT License.

---

**Connect with me:**
- GitHub: [ranaferoz792-op](https://github.com/ranaferoz792-op)
- LinkedIn: [Ahmad Feroz Arshad](https://www.linkedin.com/in/ahmad-feroz-arshad-158303213/)