<div align="center">

<!-- Logo Placeholder -->
<img src="https://via.placeholder.com/150x150/0F0E1A/00FF99?text=ATM+Logo" alt="Project Logo" width="150" />

# ✦ ATM Simulation System

**A console-based ATM simulation applying ADT LIST Operations.** <br>
Built with C++ to simulate real-world ATM banking functionalities including registration, transaction processing, and file-based data persistence.

[![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&labelColor=0F0E1A&logo=c%2B%2B&logoColor=white)](https://isocpp.org/)

<br>
</div>

---

## 📖 About The Project

This project is a console-based ATM Simulation designed to demonstrate the application of Abstract Data Type (ADT) LIST Operations. Tailored as a C++ terminal application, it simulates the core workflows of banking systems, combining continuous data storage with interactive menus. 

Powered entirely by **C++**, the simulation mimics physical ATM interactions—requiring simulated "card insertions" (checking for a mounted drive like E:\), PIN encryption, structured data handling, and comprehensive offline transaction processing for a secure and realistic banking experience.

### Key Innovations
- **File-Based Persistence:** Securely stores account records in `records.txt` and simulates ATM cards by writing to external drives.
- **PIN Encryption/Decryption:** Basic symbol-based encryption mechanism securing PINs within local storage.
- **Dynamic Array Structure (ADT List):** Employs structures (`struct`) and objects to handle up to 50 concurrent accounts in memory during runtime.
- **Custom UI and Keyboard Tracking:** Uses `<windows.h>` and `gotoxy` alongside customized keyboard capturing (`conio.h`) for an interactive console interface.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🔐 Authentication & Security** | <ul><li>**Registration:** Create an account providing personal details, contact number, and initial deposit.</li><li>**PIN Protection:** Requires 5-digit PIN for access, stored in an encrypted format.</li><li>**Simulated ATM Card:** Mandates the detection of an external drive (e.g., E:\\) for user registration and transaction.</li><li>**Change PIN:** Authentic workflow requiring the old PIN before assigning a new one.</li></ul> |
| **💳 Banking Transactions** | <ul><li>**Balance Inquiry:** Instantly check current account balance.</li><li>**Withdraw Cash:** Withdraw funds with real-time balance reduction.</li><li>**Deposit Cash:** Add funds to the account securely.</li><li>**Fund Transfer:** Transfer money to other enrolled accounts tracked in the ADT list.</li></ul> |
| **🧠 Interactive Console UI** | <ul><li>**Visual Keypad:** On-screen visual keyboard mapping physical keystrokes locally.</li><li>**Dynamic Forms:** Screen clearing and cursor positioning (`gotoxy`) for a clean, static-like form interface.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Programming Language** | ![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white) |
| **Standard Libraries** | `<iostream>`, `<iomanip>`, `<fstream>`, `<string>`, `<cctype>` |
| **System Libraries** | `<windows.h>`, `<conio.h>`, `<unistd.h>` |
| **Data Storage** | Local Text Files (`.txt`) for persistent banking records |

</div>

---

## 📐 Architecture & Workflow

The project is structured into two main decoupled modules designed to run consecutively or iteratively in the console:

1. **Registration Module (`Project1-ATM-RegistrationModule.cpp`):** Handles enrollment of a new ATM account. Gathers user data, validates input, establishes the initial deposit, and generates an account number. Saves data to the master `records.txt` file and writes specific validation data (simulated physical card) to a flash drive.
2. **Transaction Module (`Project1-ATM-TransactionModule.cpp`):** The main functional interface acting as a terminal. Prompts for card insertion (reading the flash drive) and PIN authentication against the master record. Handles updates to array indices via sequential searching, mutating balances, and rewriting back to storage.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Registration Screen | Interactive Keypad |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Registration+Form" alt="Registration Screen" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=Simulated+Keypad" alt="Interactive Keypad" /> |

| Account Information | Cash Transaction |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/A855F7?text=Account+Info" alt="Account Information" /> | <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Withdraw/Deposit" alt="Transaction Interface" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* A C++ Compiler (e.g., MinGW, GCC, or MSVC)
* Windows OS (Required due to `<windows.h>` and `<conio.h>`)
* A generic flash drive assigned to letter `E:\` (configurable in source code)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Compilation
Compile the modules using GCC or your preferred standard compiler:
```bash
# Compile Registration Module
g++ Project1-ATM-RegistrationModule.cpp -o Registration.exe

# Compile Transaction Module
g++ Project1-ATM-TransactionModule.cpp -o Transaction.exe
```

### 3. Execution
Ensure your flash drive is inserted, then run:
```bash
./Registration.exe
# Upon successful enrollment, switch to:
./Transaction.exe
```

---

## 📁 Project Structure

```text
📦 ATM-Simulation
 ┣ 📜 Project1-ATM-RegistrationModule.cpp   # Core logic for account creation
 ┣ 📜 Project1-ATM-TransactionModule.cpp    # Core logic for banking transactions
 ┣ 📜 records.txt                           # Generated text file holding account data
 ┗ 📜 README.md                             # Project documentation
```

---

## 👥 Authors

- **Corpus, Glenn Joshua B.**
- **Chua, Vherwin Lee V.**

*Date: October 2, 2023*

---

<div align="center">

**Built with 💻 & ☕**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glenn-joshua-corpus-671b5b18a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/imapoopzz)
</div>