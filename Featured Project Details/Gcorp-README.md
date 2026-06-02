<div align="center">

<!-- Logo Placeholder -->
<img src="frontend/src/images/my-logo.png" alt="Project Logo" width="300" />

# ✦ Full-Stack E-Commerce Marketplace

**A comprehensive, interactive full-stack e-commerce experience for modern retail.** <br>
Built with React, Node.js, Express, and MySQL to deliver seamless shopping, secure authentication, and robust order management.

[![React](https://img.shields.io/badge/React-18.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-00FF99?style=for-the-badge&labelColor=0F0E1A&logo=mysql)](https://www.mysql.com/)

<br>

[**View Live Demo**](#) <!-- Replace with actual link -->

<br>
</div>

---

## 📖 About The Project

This project is a sophisticated full-stack e-commerce web application designed to provide a frictionless online shopping experience. Tailored for modern retail (with a focus on footwear and apparel), it features a highly scalable **client-server architecture**: a dynamic frontend for customer interaction (browsing, cart management, checkout) and a robust backend for secure data processing, authentication, and inventory management.

Powered by **React**, **Express.js**, and **MySQL**, the application delivers a highly responsive user experience, featuring dynamic product filtering, real-time cart calculations, JWT-secured user sessions, and comprehensive administrative order tracking, all while maintaining strict adherence to performance and security standards.

### Key Innovations
- **Advanced Security & 2FA:** JWT-based authentication integrated with custom multi-factor mobile verification workflows and secure password recovery.
- **Dynamic Order Workflow:** Seamless cart-to-checkout pipeline with integrated voucher support and automated stock depletion upon shipping.
- **Integrated Media Pipeline:** Custom Multer configurations for frictionless product imagery and user profile picture uploads.
- **Interactive Social Commerce:** Built-in review, rating, wishlist, and product "like" systems directly tied to the user profile.

---

## ✨ Features

| Category | Features |
| :--- | :--- |
| **🔐 Authentication & Security** | <ul><li>**User Registration & Login:** Secure onboarding with JWT-based session management.</li><li>**Two-Factor Authentication (2FA):** Automatic mobile-verification trigger after 30 minutes of inactivity.</li><li>**Password Recovery:** Secure "Forgot Password" workflow using mobile verification.</li><li>**Profile Security:** Change passwords and update personal information securely.</li></ul> |
| **🛍️ Shopping & Cart** | <ul><li>**Dynamic Cart System:** Add, remove, and update item quantities in real-time.</li><li>**Checkout Pipeline:** Streamlined order placement calculating totals dynamically.</li><li>**Voucher Integration:** Claim and apply promotional vouchers to reduce order totals.</li><li>**Order Tracking:** Users can view their past and active orders with full details.</li></ul> |
| **📦 Product Management (Admin)** | <ul><li>**CRUD Capabilities:** Full control to add, update, and delete products (shoes).</li><li>**Media Uploads:** Integrated `multer` support for direct image uploads for new inventory.</li><li>**Order Fulfillment:** Admins can view all global transactions and update status to 'Shipped'.</li><li>**Automated Inventory:** Stock depletion is automatically handled when an order ships.</li></ul> |
| **🧠 Interactive Discovery** | <ul><li>**Live Search & Filtering:** Instantly search by keyword, or filter by category and sub-category.</li><li>**User Reviews & Ratings:** Purchasers can leave, update, and delete product reviews.</li><li>**Wishlists & Likes:** Save favorite items to a personalized wishlist or "like" them for later.</li></ul> |
| **🎨 UI / UX & Performance** | <ul><li>**Admin / Customer Modes:** Dedicated interfaces for shopper engagement and admin oversight.</li><li>**Responsive Design:** Fluid layouts ensuring parity across mobile and desktop devices.</li><li>**Optimized Relational Queries:** Efficient MySQL queries for rapid data retrieval.</li><li>**Static Asset Delivery:** Streamlined Express static serving for lightning-fast image rendering.</li></ul> |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) |
| **Backend API** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) |
| **Security & Utils** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-FF4B4B?style=flat-square&logo=springsecurity&logoColor=white) ![Multer](https://img.shields.io/badge/Multer-F37626?style=flat-square&logo=npm&logoColor=white) |

</div>

---

## 📐 Architecture & Workflow

The repository is structured as a decoupled full-stack application, ensuring separation of concerns:

1. **Frontend (SPA):** A React application that handles complex state management and client-side routing. It communicates securely with the backend via `axios` interceptors passing JWT tokens. Key modules include Authentication (`Login`, `Signup`), E-Commerce flows (`Products`, `Cart`, `CheckOut`), and User Dashboards (`OrderTransactions`).
2. **Backend (API):** An Express.js server providing a robust RESTful API. It orchestrates business logic including user registration, session management with 2FA, inventory CRUD operations, and order lifecycle management.
3. **Database Layer:** A relational MySQL database (`marketplace`) utilizing normalized tables to maintain data integrity across `users`, `shoes`, `cart`, `orders`, `order_items`, `reviews`, `wishlists`, and `likes`.

---

## 📸 Screenshots & UI Showcase

<details open>
<summary><b>Click to expand UI Showcase</b></summary>
<br>

| Product Marketplace | Shopping Cart & Checkout |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Product+Marketplace" alt="Product Marketplace" /> | <img src="https://via.placeholder.com/600x400/FFFFFF/3B82F6?text=Cart+and+Checkout" alt="Cart View" /> |

| User Dashboard & Orders | Admin Management |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0F0E1A/A855F7?text=User+Orders" alt="User Orders" /> | <img src="https://via.placeholder.com/600x400/0F0E1A/00FF99?text=Admin+Transactions" alt="Admin UI" /> |

</details>

---

## 🚀 Installation & Local Setup

### Prerequisites
* Node.js (v18.x or higher)
* MySQL Server (Running locally or hosted)
* npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/marketplace-project.git
cd marketplace-project
```

### 2. Database Setup
1. Create a MySQL database named `marketplace`.
2. Execute the necessary SQL scripts to create tables (`users`, `shoes`, `cart`, `orders`, etc.).
3. Update the database connection credentials in `backend/index.js` (or via `.env`).

### 3. Backend Setup
```bash
cd backend
npm install

# Start the Express API server (uses Nodemon for hot-reloading)
npm start
```
*The backend API will run on `http://localhost:8800`.*

### 4. Frontend Setup
```bash
cd ../frontend
npm install

# Start the React development server
npm start
```
*The frontend will run on `http://localhost:3000`.*

---

## 🔐 Environment Variables

To securely run this project, configure the following environment variables.

### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `DB_HOST` | MySQL database host | `localhost` |
| `DB_USER` | MySQL database user | `root` |
| `DB_PASS` | MySQL database password | `password123` |
| `DB_NAME` | MySQL database name | `marketplace` |
| `JWT_SECRET` | Secret key for signing tokens | `your_jwt_secret` |
| `PORT` | Port for the Express server | `8800` |

### Frontend (`frontend/.env.local`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `REACT_APP_API_URL` | The URL of your backend API | `http://localhost:8800` |

---

## 📁 Project Structure

```text
📦 marketplace-project
 ┣ 📂 backend                 # Express REST API & Database Logic
 ┃ ┣ 📂 uploads               # Static directory for product & user images
 ┃ ┣ 📜 index.js              # Server entry point, API routes, and DB config
 ┃ ┗ 📜 package.json          # Backend dependencies (express, mysql, multer)
 ┣ 📂 frontend                # React Application
 ┃ ┣ 📂 public                # Static assets (index.html, logos)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components          # Reusable UI elements
 ┃ ┃ ┣ 📂 context             # Global React Context providers
 ┃ ┃ ┣ 📂 pages               # Route views (Cart, Checkout, Products, Auth)
 ┃ ┃ ┣ 📂 styles              # CSS Modules and global stylesheets
 ┃ ┃ ┣ 📜 App.js              # Main Router definitions
 ┃ ┃ ┗ 📜 index.js            # React root mount
 ┃ ┗ 📜 package.json          # Frontend dependencies (react-router, axios)
 ┗ 📜 README.md               # Project documentation
```

---

## 🌐 API Documentation

### Authentication & Users
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/signup` | Register a new user | ❌ |
| `POST` | `/login` | Authenticate user & return JWT (includes 2FA check) | ❌ |
| `GET`  | `/user` | Fetch authenticated user profile data | ✅ |
| `PUT`  | `/user` | Update user profile & avatar (`multipart/form-data`) | ✅ |

### Products (Shoes)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET`  | `/shoes` | Fetch all products (supports query filtering) | ❌ |
| `POST` | `/shoes` | Add a new product with image upload | ✅ (Admin) |
| `GET`  | `/search`| Search products by keyword | ❌ |

### Cart & Orders
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET`  | `/cart` | Fetch user's cart items | ✅ |
| `POST` | `/orders`| Process checkout and create new order | ✅ |
| `PUT`  | `/orders/:id`| Update order status (e.g., Shipped depletes stock)| ✅ (Admin) |

---

## 🛡️ Security Features

- **Stateless Authentication:** Secure JWT implementation passed via Authorization headers, eliminating session hijacking risks.
- **Password Cryptography:** All passwords are salted and hashed using `bcrypt` before database insertion.
- **Route Protection:** Express middleware actively verifies JWT signatures before granting access to sensitive routes (`/cart`, `/orders`, `/user`).
- **File Upload Sanitization:** `multer` restricts and handles file uploads securely, ensuring unique file naming to prevent overwrites and directory traversal.
- **Two-Factor Flow:** Intelligent login system that flags and requires mobile 2FA verification if a session is initiated after a 30-minute idle period.

---

## 📈 Performance & Optimization

- **Database Normalization:** Highly normalized MySQL schema prevents data redundancy and ensures rapid `JOIN` query execution for complex data like user orders.
- **Stock Automation:** Backend automatically synchronizes inventory; when an order status changes to 'Shipped', stock counts and 'sold' metrics are precisely updated.
- **Media Optimization:** Static files are served directly from the backend edge (`/uploads`), reducing overhead and ensuring rapid product imagery loading on the frontend.

---

## 🗺️ Roadmap

- [x] Establish secure JWT authentication & custom 2FA
- [x] Implement complete E-commerce flow (Products -> Cart -> Checkout)
- [x] Integrate robust relational database for Order & Inventory management
- [x] Develop interactive review, rating, and wishlist systems
- [ ] Connect third-party payment gateways (Stripe / PayPal API)
- [ ] Implement Redis caching for high-traffic product endpoints
- [ ] Add real-time WebSocket notifications for order status updates

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