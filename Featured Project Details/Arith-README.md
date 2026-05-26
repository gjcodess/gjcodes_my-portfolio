<div align="center">

<!-- Logo Placeholder -->
<img src="https://via.placeholder.com/300x150/0F0E1A/00FF99?text=Arithmetic+Game" alt="Project Logo" width="300" />

# ✦ Arithmetic Practice Game & Leaderboard

**A comprehensive, interactive console-based game built with C++ Object-Oriented Programming.** <br>
Developed using custom Linked Lists to deliver seamless gameplay, secure authentication, dynamic leaderboard sorting, and persistent data storage.

[![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)](https://cplusplus.com/)
[![CLI Algorithm](https://img.shields.io/badge/CLI-Console-4CAF50?style=for-the-badge)](https://en.wikipedia.org/wiki/Command-line_interface)

<br>
</div>

---

## 📖 About The Project

This project is a sophisticated console-based Arithmetic Practice Game developed as Project #2 for Computer Programming 2. It transitions previous procedural logic into a robust **Object-Oriented Programming (OOP)** architecture, utilizing **Dynamic Linked Lists** instead of static arrays for data management.

Powered by standard **C++** libraries, the application delivers a highly responsive user experience through the command-line interface. It features dynamic mathematical problem generation, secure player login sessions with masked passwords, and an intricate leaderboard system capable of ranking players across different operation categories or their overall average score. Data persistence is reliably maintained through integrated file I/O operations (`player.txt`).

### Key Innovations
- **OOP & Linked Lists:** Completely handles player creation, iteration, and memory management dynamically using structured nodes.
- **Secure Authentication:** Built-in login/registration UI that masks user passwords with asterisks and limits username length to prevent overflow.
- **Dynamic Sorting Algorithms:** Automatically sorts linked list nodes to display the Top 10 users for Addition, Subtraction, Multiplication, Division, or Overall Average.
- **Data Persistence:** Frictionless file handling (`fstream`) to download and upload player profiles to `player.txt` seamlessly without data loss.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🔐 Authentication** | <ul><li>**User Registration & Login:** Direct console onboarding workflow to identify returning users.</li><li>**Password Masking:** Live input masking replacing characters with asterisks for secure entries.</li><li>**Character Limitations:** Validates and restricts usernames strictly to maximum lengths (15 chars).</li></ul> |
| **🎮 Gameplay & Practice** | <ul><li>**Operation Modes:** Dedicated practice for Addition, Subtraction, Multiplication, and Division.</li><li>**Dynamic Generation:** Randomly generates valid mathematical expressions on every run (seeds via `time(NULL)`).</li><li>**Real-Time Scoring:** Instantly calculates correctness out of maximum items (`MAX_ITEMS`) per operation.</li><li>**Retry Mechanism:** Play again under the same account to overwrite and improve previous top scores.</li></ul> |
| **🏆 Leaderboard System** | <ul><li>**Category Sorting:** View Top 10 leaderboards for each specific math operation.</li><li>**Average Calculation:** Formulates an overall percentage based on performance across all 4 modes.</li><li>**Tabular Display:** Formats data cleanly into ASCII borders for quick readability and aesthetics.</li></ul> |
| **💾 Memory & File I/O** | <ul><li>**Dynamic Insertion:** Adds new players as nodes directly into an organized Linked List.</li><li>**State Preservation:** Automatically reads existing `player.txt` files on startup and overwrites on program exit or state update.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies / Concepts |
| :--- | :--- |
| **Language** | ![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white) |
| **Paradigms** | Object-Oriented Programming (Classes, Methods, Encapsulation) |
| **Data Structures** | Custom Singly Linked List (`struct node`) |
| **Standard Libraries** | `<iostream>`, `<iomanip>`, `<fstream>`, `<cstring>`, `<conio.h>` |

</div>

---

## 📐 Architecture & Workflow

The game is structured effectively around the `playerList` class containing the necessary attributes and definitions.

1. **Data Structure (Node):** A `typedef struct node` named `LIST`. It holds the `name`, `password`, `score[4]` array, and a `*next` pointer payload.
2. **Main Interface (`main`):** Instantiates the class object, loads file data via `download()`, and controls the core `startingInterfaceMenu` state machine using looping and switch cases.
3. **Session Management:** The `logIn()` method performs lookup checks on the Linked List. If the user doesn't exist, it registers them. If they exist, it forces a password challenge. 
4. **Gameplay Pipeline:** The `newGame()` or `playAgain()` functions sequence the user through custom `addition()`, `subtraction()`, `multiplication()`, and `division()` methods. Score returns are aggregated back to the active user node.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Main Menu | Secure Authentication |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Main+Menu+CLI" alt="Main Interface" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=Login+and+Registration" alt="Login View" /> |

| Gameplay Operation | Sorted Leaderboard |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/A855F7?text=Math+Practice+Game" alt="Gameplay" /> | <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=ASCII+Table+Leaderboards" alt="Leaderboard UI" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* C++ Compiler (GCC, MinGW, Clang, or MSVC)
* Windows OS (Highly recommended due to `<conio.h>` usage) or a compatible emulated terminal.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/arithmetic-practice-game.git
cd arithmetic-practice-game
```

### 2. Compile the Code
Using GCC/MinGW:
```bash
g++ Project2-CPP-OOP-Corpus.cpp -o ArithmeticGame.exe
```

### 3. Run the Game
```bash
./ArithmeticGame.exe
```

---

## 🎮 Game Controls

| Key | Action |
| :--- | :--- |
| `[ENTER]` | Confirm selections / Log into the game |
| `[ESC]` | Exit the game completely / Go Back a menu |
| `[SPACE]` | Proceed / Alternate accept input |
| `[Arrow Keys]` | Sometimes used for navigation prompts in extended modes |

---

## 🗃️ File Storage Layout

The application saves user data into a flat-file database using standard text structure:

```text
player.txt
```
**File syntax logic:** `<username> <password> <score_add> <score_sub> <score_mul> <score_div>`

Example:
```text
PlayerOne securePass123 5 5 4 5
PlayerTwo myPassword    4 3 5 2
```

---

## 🗺️ Roadmap

- [x] Integrate basic procedural math algorithms
- [x] Adopt Object-Oriented Programming (Classes & Methods)
- [x] Overhaul Array memory allocation into Singly Linked Lists
- [x] Provide Local File persistence via text files
- [x] Expand leaderboard with modular sorting methods per category
- [ ] Add encryption for stored passwords in the text file
- [ ] Cross-platform compatibility (Remove `<conio.h>` dependencies for Linux/macOS)

---

<div align="center">

**Built with 💻 & ☕**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glenn-joshua-corpus-671b5b18a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/imapoopzz)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/corpus.glenn.joshua.7)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/imapoopypie/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/nnelgsuproc)

</div>
