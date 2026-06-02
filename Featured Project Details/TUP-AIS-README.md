<div align="center">

<!-- Logo Placeholder -->
<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" alt="Project Logo" width="150" />

# ✦ TUP - Academic Information System (AIS)

**A comprehensive, interactive console-based grading and academic management system.** <br>
Built with C utilizing File I/O and custom ASCII interfaces to deliver seamless record management, secure portals for students and teachers, and robust grade calculations.

[![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&labelColor=0F0E1A&logo=c&logoColor=white)](https://en.wikipedia.org/wiki/C_(programming_language))
[![GCC](https://img.shields.io/badge/GCC-Compiler-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=gnu)](https://gcc.gnu.org/)

<br>
</div>

---

## 📖 About The Project

This project is a sophisticated console-based File Management System tailored for grading and academic information. Designed as part of the **Computer Programming 1** course, it features a dual-portal architecture: a **Teachers Access Module** for administrative grading operations, and a **Student Access Module** for viewing schedules, enrollments, and academic performance.

Powered by standard **C Language** capabilities (`stdio.h`, `stdlib.h`, `conio.h`, `windows.h`), the application delivers a highly responsive and deeply interactive terminal experience. It heavily features dynamic grade computation, file-based data persistence, and an intricate terminal GUI constructed through ASCII characters and exact cursor manipulation (`gotoxy`).

### Key Innovations
- **Terminal User Interface:** Complete stylized UI using extended ASCII graphics, custom headers, and multi-tab layouts natively in the terminal.
- **Dual-Portal Workflow:** Distinct authentication screens routing to specialized capabilities for either faculty or students.
- **Automated Academic Processing:** Dynamic calculation of components (Quizzes, Seatworks, Exams) into computed GWA (General Weighted Average) and distinct passing/failing remarks.
- **Persistent Data Structures:** Integration of robust File I/O (handling `record.txt`) with custom nested structures for reading, appending, updating, and deleting student entities.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🔐 Authentication & Access** | <ul><li>**Portal Selection:** Choose between Teacher or Student module on boot.</li><li>**Authentication System:** Login security with hidden password masking (`*` replaces typed keys).</li></ul> |
| **📝 Teacher Module (Admin)** | <ul><li>**CRUD Capabilities:** Full capability to Add [A], Edit [E], and Delete [D] student grade records.</li><li>**Categorized Grade Sheets:** Separated views for Quizzes/Activities, Seatworks/Assignments/Projects, and Major Exams (Prelims/Midterms/Finals).</li><li>**Student Query:** Advanced `Search Student [S]` function via Student ID.</li></ul> |
| **🎓 Student Module** | <ul><li>**Enrollment & Schedule Tabs:** Access subject registry and accurate class timetables.</li><li>**Scores Evaluation Tab:** Fetch detailed grade report from the central record database using ID verification.</li><li>**Faculty Evaluation Tab:** Built-in portal for submitting feedback regarding teaching faculty.</li></ul> |
| **🎨 UI / UX & Performance** | <ul><li>**Custom Window Handling:** `windows.h` coordinates, `gotoxy` mapping, and customized text coloring/styling.</li><li>**Memory Management:** Dynamic character buffering and persistent file storage.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Language Framework** | ![C](https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white) |
| **Core Libraries** | `<stdio.h>` `<stdlib.h>` `<conio.h>` `<string.h>` `<ctype.h>` `<windows.h>` |
| **Implementation** | Structs, Pointers, File I/O (`FILE *`), Custom GUI Algorithms |

</div>

---

## 📐 Architecture & Workflow

The repository is structured as a self-contained monolithic C application relying on memory-mapped structs and physical flat files:

1. **User Interface Layer:** Modularized functions (`header()`, `visual()`, `footer()`, `gotoxy()`) render specialized borders. Dedicated portal menus dictate the user journey.
2. **Business Logic Layer:** Processes mathematical derivations for grades (averages, percentage tracking based on component weight). Handles search indexing for rapid retrieval.
3. **Data Access Layer:** Uses standard C File streams (`fopen`, `fprintf`, `fread`, `fclose`) reading from and writing to local `.txt` indices for persistent record keeping. Uses intermediate temporary files for Update and Delete functions.

---

## 🚀 Installation & Local Setup

### Prerequisites
* Windows OS (Required for `<windows.h>` and `<conio.h>` compatibility)
* C Compiler (GCC / MinGW)
* Visual Studio Code (or preferred IDE)

### 1. Clone or Open Workspace
Ensure you have the source file `Group1-Project2-GradingSystem-BSIT-1AB.c` accessible locally.

### 2. Compilation
Compile the application using GCC in your terminal.
```bash
gcc Group1-Project2-GradingSystem-BSIT-1AB.c -o AIS.exe
```

### 3. Execution
Run the compiled executable to launch the system.
```bash
./AIS.exe
```
*Note: A `record.txt` file will automatically be generated in the root directory upon adding your first student record.*

---

## 📁 Project Structure

```text
📦 Project 2
 ┣ 📜 Group1-Project2-GradingSystem-BSIT-1AB.c # Main Application Source
 ┣ 📜 record.txt                               # Persistent Database (Auto-generated at runtime)
 ┗ 📜 README.md                                # Project documentation
```

---

## 👨‍💻 Project Team / Authors

**TUP - BSIT-1AB (Group 1)**
* **Leader:** Abas, Jhondel Mico
* **Members:** 
  * _All Group 1 participating students_
  * Montalban, Don Marco

---

<div align="center">

**Built with 💻 & ☕**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/imapoopzz)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/corpus.glenn.joshua.7)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](#)

</div>