<div align="center">

<!-- Logo Placeholder -->
<img src="https://via.placeholder.com/150x150/0F0E1A/00FF99?text=Logo" alt="Project Logo" width="120" height="120" />

# ✦ Interactive Developer Portfolio

**A dual-sided, motion-rich personal and professional portfolio experience.** <br>
Built with React, GSAP, Vite, and Express to showcase technical capability and personal narrative.

[![GitHub stars](https://img.shields.io/github/stars/yourusername/portfolio?style=for-the-badge&color=00FF99&labelColor=0F0E1A)](https://github.com/yourusername/portfolio/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/portfolio?style=for-the-badge&color=00FF99&labelColor=0F0E1A)](https://github.com/yourusername/portfolio/network)
[![License: MIT](https://img.shields.io/badge/License-MIT-00FF99.svg?style=for-the-badge&labelColor=0F0E1A)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=react)](https://react.dev/)

<br>

[**View Live Demo**](#) • [**Read Documentation**](#installation) • [**Report Bug**](#) • [**Request Feature**](#)

<br>
</div>

---

## 📖 About The Project

This project is a sophisticated, minimalist web portfolio designed to bridge the gap between a professional resume and personal storytelling. Inspired by high-end dark-mode aesthetics, it features a unique **dual-sided architecture**: a "Portfolio" view for professional accomplishments (skills, projects, experience), and a "Personal" view for hobbies, favorites, and photography.

Powered by **React**, **Vite**, and **GSAP**, the application delivers buttery-smooth scroll animations, dynamic page transitions, and an immersive user experience, all while maintaining strict adherence to high-contrast accessibility and technical excellence.

### Key Innovations
- **Dual-Perspective Routing**: Seamlessly toggle between professional and personal modes.
- **Cinematic Animations**: Advanced `ScrollTrigger` animations integrated directly into the React lifecycle.
- **Adaptive Design System**: A bespoke dark-first theme utilizing JetBrains Mono and vibrant cyan-green (`#00FF99`) accents.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🎨 UI / UX** | <ul><li>**Dark/Light Mode:** Dynamic mode switcher with localized context caching.</li><li>**Grid Background:** Custom animated geometric grid backgrounds.</li><li>**Typography:** Monospace-driven aesthetic for a "developer-first" feel.</li></ul> |
| **⚡ Performance** | <ul><li>**Vite Optimized:** Instant HMR and hyper-fast build times.</li><li>**Image Optimization:** Built-in Sharp scripts for Gallery and Project assets.</li><li>**Asset Lazy Loading:** Route-level component lazy loading.</li></ul> |
| **🧠 Interactive** | <ul><li>**GSAP ScrollTrigger:** Elements reveal intelligently based on viewport position.</li><li>**Custom Cursor/Loader:** Bespoke loading states and transitions.</li></ul> |
| **⚙️ Backend & APIs**| <ul><li>**Contact Form API:** Secure Express backend for handling inquiries.</li><li>**Vercel Serverless:** Support for Resend email API integration.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) |
| **Animation & UI** | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white) ![Lucide](https://img.shields.io/badge/Lucide_Icons-FF6C37?style=flat-square&logo=lucide&logoColor=white) |
| **Backend API** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **Infrastructure** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) ![Vercel Analytics](https://img.shields.io/badge/Analytics-000000?style=flat-square&logo=vercel&logoColor=white) |

</div>

---

## 📐 Architecture & Workflow

The repository is structured as a decoupled full-stack application:

1. **Frontend (SPA):** A React application scaffolded with Vite. It handles complex routing between the `/portfolio` and `/personal` spaces, manages global state via `ModeContext`, and orchestrates GSAP animations.
2. **Backend (API):** An Express.js server providing RESTful endpoints (`/api/contact`). It utilizes CORS validation to ensure requests only originate from authorized frontend origins.
3. **Serverless Edge:** The frontend incorporates `api/contact.js` tailored for Vercel Serverless Functions, allowing zero-config deployment with integrated Resend email services.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Portfolio View (Dark Mode) | Personal View (Light Mode) |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Portfolio+Dashboard" alt="Portfolio Dashboard" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=Personal+Gallery" alt="Personal View" /> |

| Contact Section | Mobile Responsive Layout |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/A855F7?text=Contact+Form" alt="Contact Form" /> | <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Mobile+View" alt="Mobile UI" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* Node.js (v18.x or higher)
* npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Run image optimization scripts (optional)
npm run optimize:gallery
npm run optimize:projects

# Start the Vite development server
npm run dev
```

### 3. Backend Setup (Optional for local API testing)
```bash
cd ../backend
npm install

# Start the Express server
npm run dev
```
*The frontend will run on `http://localhost:5173` and the backend will run on `http://localhost:5000`.*

---

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

### Frontend (`frontend/.env.local`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | The URL of your backend API | `http://localhost:5000/api` |
| `RESEND_API_KEY` | API Key for transactional emails | `re_123456789...` |

### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server | `5000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

---

## 📁 Project Structure

```text
📦 portfolio
 ┣ 📂 backend                 # Express REST API
 ┃ ┣ 📂 controllers           # Request handlers (contactController.js)
 ┃ ┣ 📂 middleware            # Validation and CORS
 ┃ ┣ 📂 routes                # Express router definitions
 ┃ ┗ 📜 server.js             # Server entry point
 ┣ 📂 frontend                # Vite + React Application
 ┃ ┣ 📂 api                   # Vercel serverless functions (contact.js)
 ┃ ┣ 📂 scripts               # Image optimization tools (Sharp.js)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components          # Reusable UI (Navbar, Loader, GridBackground)
 ┃ ┃ ┣ 📂 context             # React Context (ModeContext.js)
 ┃ ┃ ┣ 📂 sections            # Page blocks (Hero, About, Gallery, etc.)
 ┃ ┃ ┣ 📂 styles              # Global CSS and tokens
 ┃ ┃ ┣ 📜 App.jsx             # Main Router & GSAP orchestrator
 ┃ ┃ ┗ 📜 main.jsx            # React root mount
 ┃ ┣ 📜 vercel.json           # Vercel deployment config
 ┃ ┗ 📜 package.json          # Frontend dependencies
 ┗ 📜 README.md               # Project documentation
```

---

## 🌐 API Documentation

### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-26T00:00:00.000Z"
}
```

### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json
```
**Payload:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I'd like to work together!"
}
```

---

## 🛡️ Security Features

- **CORS Protection:** Backend enforces strict origin validation preventing cross-origin exploitation.
- **Payload Limiting:** Express JSON middleware restricts body sizes (`limit: '1mb'`) to prevent DDoS via massive payloads.
- **Input Validation:** Custom middleware sanitizes and validates contact form submissions before processing.

---

## 📈 Performance & Optimization

- **Pre-computed Assets:** Custom Node.js scripts utilize `sharp` to convert and optimize heavy imagery into WebP format before build time.
- **ScrollTrigger Garbage Collection:** `App.jsx` handles strict lifecycle cleanup of GSAP instances to prevent memory leaks during SPA route changes.
- **Edge Delivery:** Configured for Vercel edge deployment, utilizing caching and localized serverless execution for minimal TTFB.

---

## 🗺️ Roadmap

- [x] Establish dual-sided routing (Portfolio / Personal)
- [x] Integrate GSAP ScrollTrigger animations
- [x] Implement Dark/Light mode context
- [ ] Connect PostgreSQL database for dynamic project fetching
- [ ] Add CMS integration (Sanity/Strapi) for blog posts
- [ ] Implement WebGL / Three.js hero interactive background

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with 💻 & ☕ by [Glenn](#)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](#)

</div>
