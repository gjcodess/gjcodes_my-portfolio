<div align="center">

<!-- Logo Placeholder -->
<img src="https://via.placeholder.com/150/0F0E1A/00FF99?text=Sort+Viz" alt="Project Logo" width="150" />

# ✦ Sorting Algorithms Visualization

**An interactive, highly engaging visualizer for grasping sorting algorithms.** <br>
Built with React, Vite, and modern web tech to deliver step-by-step animations of classical and advanced sorting logic.

[![React](https://img.shields.io/badge/React-18.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br>

[**View Live Demo**](#) <!-- Replace with actual link -->

<br>
</div>

---

## 📖 About The Project

This project is a dynamic, fully interactive **Sorting Algorithm Visualizer** designed to help developers and students conceptualize sorting mechanisms. Spanning from foundational methods like Bubble Sort to advanced divide-and-conquer strategies like Quick Sort, the visualizer breaks down algorithmic execution into digestible, frame-by-frame animations.

Powered by **React** and **Vite**, the application features a deeply decoupled logic architecture separating the mathematical sorting operations from the DOM rendering. This allows for hyper-responsive standard controls including speed manipulation, pausing, and resuming, delivering an elevated educational experience.

### Key Innovations
- **Step-By-Step Animation:** Precisely timed DOM updates reflecting mathematical array mutations in real-time.
- **Async Control Flow:** Seamless Pause/Resume playback capabilities tied to asynchronous delay managers.
- **Extensive Coverage:** Comprehensive suite encompassing Bubble, Selection, Insertion, Merge, Quick, Random Quick, Counting, and Radix sorts.
- **Custom External Data:** Integration with mock APIs to fetch and render dynamic datasets for unbiased sorting examples.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🎥 Visualizer Core** | <ul><li>**Live Render Engine:** Watch array bars swap, compare, and lock in place sequentially.</li><li>**Playback Operations:** Play, Pause, and Resume controls for deep algorithmic inspection.</li><li>**Speed Manipulation:** Dynamic slider to adjust animation delay (in milliseconds).</li></ul> |
| **🧮 Algorithm Suite** | <ul><li>**Basic Arrays:** Bubble Sort, Selection Sort, Insertion Sort implementations.</li><li>**Divide & Conquer:** Merge Sort, Quick Sort, and Randomized Pivot Quick Sort.</li><li>**Non-Comparison:** Counting Sort and Radix Sort processing.</li></ul> |
| **🧠 Architecture** | <ul><li>**Isolated Logic:** Strict separation of sorting mechanics (`sortingAlgorithms.js`) from the React UI bindings.</li><li>**State Management:** Robust React state handling complex array permutations without tearing.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Frontend Core** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **Styling** | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat-square&logo=postcss&logoColor=white) |
| **Code Quality** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) |

</div>

---

## 📐 Architecture & Workflow

The application utilizes a tailored event-loop integration approach to visualize standard synchronous algorithms asynchronously:

1. **UI Controller (React):** `SortingVisualizer.jsx` serves as the maestro. It maintains the master array state, handles user configurations (speed, array generation), and triggers sorting loops.
2. **Algorithm Engine (JS Generators/Async):** Located in `sortingAlgorithms.js`, each algorithm is adapted to yield or await execution steps. This interrupts the blocking nature of typical `while` or `for` loops, allowing React to trigger a re-render between comparisons.
3. **Presentation Layer:** CSS combined with React refs dynamically colorize and resize visual DOM bars to represent element comparisons, swaps, and sorted confirmations.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Sorting Dashboard | O(N log N) Execution |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Visualizer+Dashboard" alt="General Dashboard" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=Merge+Sort+In+Action" alt="Merge Sort View" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* Node.js (v18.x or higher)
* npm or yarn

### 1. Local Setup
```bash
git clone https://github.com/yourusername/sorting-algo-visualization.git
cd sorting-algo-visualization

# Install dependencies
npm install
```

### 2. Start Development Server
```bash
# Run the Vite Dev Server
npm run dev
```
*The visualizer will run on `http://localhost:5173`.*

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
📦 sorting-algo-visualization
 ┣ 📂 public                # Static raw assets
 ┣ 📂 src                   # Main application code
 ┃ ┣ 📂 components          # UI Component modules
 ┃ ┃ ┗ 📜 SortingVisualizer.jsx # Master Visualizer Interface
 ┃ ┣ 📂 lib                 # Pure business logic
 ┃ ┃ ┗ 📜 sortingAlgorithms.js  # Dedicated algorithmic operations
 ┃ ┣ 📜 App.jsx             # Root React App
 ┃ ┣ 📜 index.css           # Global stylesheets
 ┃ ┗ 📜 main.jsx            # Application mount point
 ┣ 📜 eslint.config.mjs     # Linter rules
 ┣ 📜 package.json          # Vite & React dependencies
 ┗ 📜 vite.config.js        # Vite bundler configuration
```

---

## 🗺️ Roadmap

- [x] Basic Comparison Sorts (Bubble, Selection, Insertion)
- [x] Advanced Sorts (Merge, Quick)
- [x] Pause / Resume playback functionality
- [x] Non-Comparison Sorts (Counting, Radix)
- [ ] Add Heap Sort and Shell Sort
- [ ] Dynamic resizing based on window dimensions
- [ ] Algorithm complexity data table (O-notation) on dashboard

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingOptimization`)
3. Commit your Changes (`git commit -m 'Add some AmazingOptimization'`)
4. Push to the Branch (`git push origin feature/AmazingOptimization`)
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
