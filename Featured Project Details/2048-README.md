<div align="center">

<!-- Logo Placeholder -->
<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/2048_logo.svg" alt="2048 Logo" width="150" />

# ✦ 2048 Console Puzzle Game in C

**A classic, interactive two-dimensional sliding block puzzle game.** <br>
Built entirely in C, featuring dynamic console UI, score tracking, and persistent game history.

[![C Language](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)](https://en.wikipedia.org/wiki/C_(programming_language))
[![Windows OS](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)](#)

<br>
</div>

---

## 📖 About The Project

This project is a console-based adaptation of the popular **2048** puzzle game, developed entirely in the C programming language. It is designed to provide a highly engaging and fully-featured single-player experience directly within the Windows command prompt or terminal.

Powered by standard C libraries alongside Windows-specific headers (`<windows.h>`, `<conio.h>`), the application delivers a responsive user interface with colored outputs, real-time keyboard event handling, matrix manipulation algorithms, and a persistent gameplay history tracker. 

### Key Innovations
- **Dynamic Colored UI:** Console text manipulation using ANSI escape codes and Windows API for an engaging visual experience.
- **Matrix Manipulation:** Efficient 2D array traversal algorithms handling up, down, left, and right sliding movements.
- **State Management:** Real-time checking of win (reaching 2048) and lose (no zero spaces and no adjacent merges) states.
- **Persistent Records:** Integrated file handling to save and view past game histories, including scores and remaining moves.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🎮 Core Gameplay** | <ul><li>**4x4 Grid:** Classic matrix structure for sliding numbered tiles.</li><li>**Number Merging:** Connect identical tiles (e.g., 2+2, 4+4) to form higher numbers and earn score points.</li><li>**Win/Loss Detection:** Reaching a 2048 tile wins the game. You lose if the grid is full and no valid moves remain.</li></ul> |
| **🕹️ Controls & Navigation** | <ul><li>**Arrow Key Movement:** Seamless sliding handling via Up, Down, Left, and Right keyboard inputs.</li><li>**Interactive Menus:** Integrated Main Menu and Pause/Game Menu for starting, restarting, or exiting.</li></ul> |
| **📊 Progression Tracking** | <ul><li>**Move Counter:** Players start with a maximum of 3000 moves, reducing by 1 with each action.</li><li>**Live Scoring:** Total points calculate dynamically in real-time as matching tiles connect.</li></ul> |
| **💾 Analytics & History** | <ul><li>**Game Logging:** Automatically saves the outcome of the match, date, time played, score, and moves remaining to a local record.</li><li>**View History:** In-game dashboard to review all historically recorded sessions.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Programming Language** | ![C](https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white) |
| **Compiler Support** | ![GCC](https://img.shields.io/badge/GCC-FFA300?style=flat-square&logo=gnu&logoColor=white) ![MinGW](https://img.shields.io/badge/MinGW-241C15?style=flat-square) |
| **OS specific APIs** | `<windows.h>` (for colored output formatting) <br> `<conio.h>` (for real-time keypress `getch()`) |

</div>

---

## 📐 Architecture & Workflow

The game operates seamlessly via a meticulously structured flow:

1. **Initialization:** The game boots via `introduction()`, showcasing custom console visuals (`visuals()`), descriptions, and instructions.
2. **Game Loop:** A continuous `while(1)` loop handles the primary logic inside `action()`. 
3. **Event Listener:** `movement(int arrowKey)` intercepts `getch()` strokes. Functions like `upMovement()`, `downMovement()`, `leftMovement()`, and `rightMovement()` execute matrix transformations.
4. **Validation Pipeline:** Post-movement, `randomCreater()` spawns a new 2 or 4 block on an empty slot, and `valueChecker()` checks if the player hit `2048` or if valid moves exist.
5. **Memory & I/O:** Upon game conclusion, `record(int status)` is triggered to append game metrics via standard C file I/O capabilities.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Main Menu | Gameplay Grid |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Main+Menu+Interface" alt="Main Menu UI" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=4x4+2048+Grid" alt="Gameplay UI" /> |

| Game Menu & Paused | History & Records |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/A855F7?text=Game+Menu" alt="Game Menu" /> | <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Record+History" alt="Records UI" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* Code Editor / IDE (Visual Studio Code, Dev-C++)
* C Compiler (GCC / MinGW)
* Windows Operating System (required for `<windows.h>` and `<conio.h>` support)

### 1. Compile the Game
Navigate to the project directory and compile `GameProject-Group7-BSIT-1AB.c` utilizing GCC.
```bash
gcc GameProject-Group7-BSIT-1AB.c -o 2048Game
```

### 2. Execution
Run the compiled executable application in your terminal or command prompt.
```bash
./2048Game.exe
```

---

## 📁 Source Code Structure

The source code organizes specific mechanics into segmented functions (all contained in `GameProject-Group7-BSIT-1AB.c`):
- `main()` & `starting()`: Entry point and landing.
- `introduction()` & `visuals()` & `colors()`: Welcome text and console beautification.
- `initial()` & `displayOutput()`: Resetting variables, score tracking, and grid printing algorithms.
- `action()` & `movement()`: User-input handling loops for matrix transformations.
- `randomCreater()` & `valueChecker()`: Number spawns, win/loss verification logic.
- `record()` & `viewHistory()`: File writing/reading loops for logging tracking.

---

## 👨‍💻 Team
* **Leader:** Corpus, Glenn Joshua B.
* **Members:** Maca, Mary Grace R., Montalban, Don Marco G., Reyes, Eliza Jane C.

---

<div align="center">

**Built with 💻 by Group 7 (BSIT-1AB)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glenn-joshua-corpus-671b5b18a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/imapoopzz)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/corpus.glenn.joshua.7)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/imapoopypie/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/nnelgsuproc)

</div>