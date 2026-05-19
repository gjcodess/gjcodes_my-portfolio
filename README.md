# Glenn | Portfolio Website

A premium, cinematic, dark futuristic developer portfolio built with React + Vite (frontend) and Node.js + Express (backend). Inspired by the design aesthetic of radnaabazar.com.

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Styling | CSS Modules |
| Animations | GSAP + ScrollTrigger |
| Icons | Lucide React |
| Font | JetBrains Mono |
| Backend | Node.js, Express |

## ✦ Quick Start

### Prerequisites
- Node.js 18+
- npm

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Opens at **http://localhost:5173**

### Backend
```bash
cd backend
npm install
npm start
```
Runs at **http://localhost:5000**

## ✦ Project Structure

```
PORTFOLIO/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── sections/       # Page sections (Hero, About, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── data/           # Placeholder content (edit here!)
│   │   ├── styles/         # Design system & globals
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app assembly
│   │   └── main.jsx        # Entry point
│   └── public/
├── backend/
│   ├── server.js           # Express server
│   ├── routes/             # API routes
│   ├── controllers/        # Route handlers
│   └── middleware/          # Validation
└── README.md
```

## ✦ Customization

### Replace Content
Edit **`frontend/src/data/content.js`** to update:
- Personal info (name, bio, email, etc.)
- Social links
- Skills & technologies
- Projects
- Work experience
- Education
- Services

### Replace Profile Image
Set `personalInfo.avatar` in `content.js` to your image path, or place an image in `public/` and reference it.

### Change Accent Color
Edit `--color-neon-mint` in `frontend/src/styles/variables.css`.

## ✦ Design System

- **Font**: JetBrains Mono (monospace)
- **Primary Background**: `#0F0E1A`
- **Accent Color**: `#00FF99` (neon mint)
- **Spacing**: 8px base unit
- **Border Radius**: 8px (cards), 9999px (buttons/badges)

## ✦ Features

- ✅ Cinematic dark futuristic aesthetic
- ✅ GSAP scroll-triggered animations
- ✅ Mouse parallax on hero section
- ✅ Responsive (desktop, tablet, mobile)
- ✅ Mobile hamburger menu
- ✅ Active section nav tracking
- ✅ Contact form with backend API
- ✅ Bento grid about section
- ✅ Code snippet display card
- ✅ Timeline component
- ✅ Page loading animation
- ✅ SEO-friendly structure

## ✦ License

MIT
