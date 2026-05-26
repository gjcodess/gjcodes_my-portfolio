<div align="center">

<!-- Logo Placeholder -->
<img src="frontend/src/images/my-logo.png" alt="Project Logo" width="300" />

# ✦ CSS Generator & Exporter Tools

**A premium, interactive toolkit for crafting modern CSS effects with real-time previews.** <br>
Built with React, Vite, and Express to deliver fast design iteration, live code output, and one-click export.

[![React](https://img.shields.io/badge/React-19.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=express)](https://expressjs.com/)

<br>

[**View Live Demo**](#) <!-- Replace with actual link -->

<br>
</div>

---

## 📖 About The Project

CSS Generator & Exporter Tools is a sleek, component-driven workspace for building and exporting modern CSS effects. It offers a modular suite of generators (Neumorphism, Glassmorphism, Gradients, Box Shadow, Border Radius, Flexbox, Grid, and more) with a live preview engine, syntax-highlighted output, and instant export workflows to keep designers and developers moving fast.

Powered by **React**, **Vite**, and **Express**, the platform focuses on clarity and speed: tune values visually, see results immediately, and export clean CSS without context switching.

### Key Innovations
- **Multi-Tool Suite:** A unified workspace for multiple CSS generators under one UI.
- **Live Preview Engine:** Real-time updates for every adjustment with instant visual feedback.
- **Export-Ready Output:** One-click copy plus API-driven export for file workflows.
- **Design-First Controls:** Presets and toggles that make complex effects easy to dial in.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🎛 Generators & Controls** | <ul><li>**Neumorphism / Glassmorphism / Gradient / Box Shadow / Border Radius** builders.</li><li>**Flexbox & Grid** layout helpers for rapid UI structure.</li><li>**Animation** generator for quick motion snippets.</li></ul> |
| **🧠 Live Design Workflow** | <ul><li>**Instant Preview:** Visual feedback as sliders and toggles update.</li><li>**Presets:** Jumpstart styles with curated starting points.</li><li>**Syntax Highlighting:** Readable CSS output powered by Prism.js.</li></ul> |
| **📦 Export & Sharing** | <ul><li>**Copy to Clipboard:** One click to grab the CSS.</li><li>**Export API:** Generate CSS files via backend endpoint.</li><li>**Responsive UI:** Works cleanly across desktop, tablet, and mobile.</li></ul> |
| **⚡ Performance & DX** | <ul><li>**Vite-powered builds** for fast dev and production bundling.</li><li>**Component-driven architecture** with reusable UI modules.</li><li>**Custom hooks** for clean, maintainable generator logic.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-111111?style=flat-square&logo=framer&logoColor=white) ![Prism.js](https://img.shields.io/badge/Prism.js-2D2D2D?style=flat-square&logo=prisma&logoColor=white) |
| **Backend API** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **UI & Utils** | ![Lucide](https://img.shields.io/badge/Lucide-111111?style=flat-square&logo=lucide&logoColor=white) ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF4B4B?style=flat-square&logo=react&logoColor=white) |

</div>

---

## 📐 Architecture & Workflow

The repository is structured as a clean, full-stack app with clear separation of concerns:

1. **Frontend (SPA):** React components, CSS Modules, and tool pages power the interactive generators and live preview panels.
2. **Backend (API):** Express provides a small API for exporting CSS and running health checks.
3. **Dev Proxy & Prod Build:** Vite proxies `/api` to the backend in development; Express serves the built frontend in production.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Generator Dashboard | Live Preview & Code |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Generator+Dashboard" alt="Generator Dashboard" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=Live+Preview+%26+Code" alt="Live Preview" /> |

| Presets & Toggles | Export Flow |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/A855F7?text=Presets+%26+Toggles" alt="Presets" /> | <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Export+Flow" alt="Export" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* Node.js (v18.x or higher)
* npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/css-generator-tools.git
cd "CSS Generator & Exporter Tools"
```

### 2. Backend Setup
```bash
cd backend
npm install

# Start the Express API server (uses Nodemon for hot-reloading)
npm run dev
```
*The backend API will run on `http://localhost:4000`.*

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start the Vite development server
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

---

## 🔐 Environment Variables

To customize the backend port, create a `.env` file in `backend/`.

### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server | `4000` |

---

## 📁 Project Structure

```text
📦 css-generator-tools
 ┣ 📂 backend                 # Express API for export + health
 ┃ ┣ 📜 server.js              # Server entry point and API routes
 ┃ ┗ 📜 package.json           # Backend dependencies (express, cors)
 ┣ 📂 frontend                # React + Vite application
 ┃ ┣ 📂 public                # Static assets
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components          # Reusable UI components
 ┃ ┃ ┣ 📂 hooks               # Generator hooks (box-shadow, grid, etc.)
 ┃ ┃ ┣ 📂 pages               # Page-level views
 ┃ ┃ ┣ 📂 styles              # Global styles and CSS Modules
 ┃ ┃ ┣ 📂 tools               # Tool-specific generators
 ┃ ┃ ┣ 📂 utils               # Helper functions
 ┃ ┃ ┣ 📜 App.jsx             # App layout and routing
 ┃ ┃ ┗ 📜 main.jsx            # React root mount
 ┃ ┗ 📜 package.json          # Frontend dependencies
 ┗ 📜 README.md               # Project documentation
```

---

## 🌐 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check for the backend service |
| `POST` | `/api/export` | Export CSS as a JSON payload (`{ css, filename }`) |

---

## 🛡️ Security Features

- **CORS Whitelist:** API requests are restricted to local development origins by default.
- **Input Validation:** Export endpoint rejects empty CSS payloads.
- **Stateless API:** No sessions or stored user data by default.

---

## 📈 Performance & Optimization

- **Client-Side Generation:** CSS is produced instantly on the frontend for immediate feedback.
- **Optimized Bundling:** Vite builds keep bundles lean and fast to load.
- **Modular Design:** Components, hooks, and tools are split for maintainability.

---

## 🗺️ Roadmap

- [x] Core CSS generators and live preview
- [x] Export endpoint with filename support
- [ ] Preset sharing via URL
- [ ] Theme packs and custom palette export
- [ ] Advanced code formatting options

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**Built with 💻 & ☕**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glenn-joshua-corpus-671b5b18a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/imapoopzz)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/corpus.glenn.joshua.7)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/imapoopypie/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/nnelgsuproc)

</div>
