# My Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Showcase your work, skills, and connect with potential clients or employers.

# 📋 Project Info

Repository: Portfolio

Type: Personal Portfolio Website
Live Preview: (Add your live project link here, e.g., Lovable or Netlify/Vercel)

# ✨ Features

Responsive Design: Works seamlessly on desktop, tablet, and mobile devices

Modern UI Components: Built with shadcn/ui and Radix UI for a polished interface

Smooth Animations: Powered by Framer Motion for engaging interactions

Hero Section: Eye-catching landing section to introduce yourself

About Section: Tell your story and background

Skills Showcase: Display your technical skills and expertise

Projects Portfolio: Showcase your best work with project details

Contact Section: Easy way for visitors to get in touch

Navigation: Smooth scrolling navbar for easy navigation

# 🛠️ Tech Stack

Frontend: React 18+

Language: TypeScript

Styling: Tailwind CSS

Build Tool: Vite

Component Library: shadcn/ui & Radix UI

Animations: Framer Motion

Routing: React Router

State Management: TanStack React Query

Form Handling: React Hook Form

Testing: Vitest

Linting: ESLint

# 📁 Project Structure
src/
├── components/          # React components
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── NavLink.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
🚀 Getting Started
Prerequisites

# Node.js 16+ and npm or bun installed

# Git for cloning the repository

Local Development
# Option 1: Using npm
# Clone the repository
git clone https://github.com/ranaferoz792-op/Portfolio.git

# Navigate to the project directory
cd Portfolio-Main

# Install dependencies
npm install

# Start the development server
npm run dev

# The application will be available at http://localhost:5173

# Option 2: Using bun

# Clone the repository
git clone https://github.com/ranaferoz792-op/Portfolio.git

# Navigate to the project directory
cd Portfolio-Main

# Install dependencies
bun install

# Start the development server
bun run dev
📝 Available Scripts
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
🖊️ Editing Options
Option 1: Use Your Preferred IDE

Work locally with your favorite code editor (VS Code, WebStorm, etc.) and push changes to GitHub.

Option 2: Edit Files Directly on GitHub

Navigate to the desired file on GitHub

Click the "Edit" button (pencil icon)

Make your changes and commit

Option 3: GitHub Codespaces

Go to your repository

Click the "Code" button (green button)

Select the "Codespaces" tab

Click "New codespace" to launch a cloud-based IDE

📦 Dependencies

Major dependencies include:

React & React Router: UI framework and navigation

Tailwind CSS: Utility-first CSS framework

shadcn/ui & Radix UI: High-quality component library

Framer Motion: Animation library

TanStack Query: Data fetching and state management

React Hook Form: Forms with better performance

Zod: TypeScript-first schema validation

Sonner: Toast notifications

🧪 Testing

This project uses Vitest for unit testing. Run tests with:

npm run test        # Run once
npm run test:watch  # Watch mode
📄 License

This project is open source and available under the MIT License.