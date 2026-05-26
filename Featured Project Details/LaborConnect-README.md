# LaborConnect — Labor Union Member Portal & Admin System

A full-stack web application for managing labor union membership, services, and administration. LaborConnect provides a member self-service portal, a department ticket-handling portal, and a comprehensive admin dashboard for union operations. Built for Philippine labor unions (LWU — Luzon Workers Union, PPEU — Philippine Professional Employees Union).

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Deployment Architecture](#deployment-architecture)
- [Three-Portal Structure](#three-portal-structure)
- [Authentication System](#authentication-system)
- [Member Portal (User Side)](#member-portal-user-side)
- [Admin Dashboard (Admin Side)](#admin-dashboard-admin-side)
- [Department Portal (Department Side)](#department-portal-department-side)
- [Ticket & Assistance System](#ticket--assistance-system)
- [Venue Booking System](#venue-booking-system)
- [Event System](#event-system)
- [Digital ID & QR Verification System](#digital-id--qr-verification-system)
- [Digital Payment System (Stripe)](#digital-payment-system-stripe)
- [AI Features & Integrations](#ai-features--integrations)
- [n8n Automation Workflows](#n8n-automation-workflows)
- [Roles & Permissions](#roles--permissions)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

---

## System Architecture

LaborConnect follows a split-deployment architecture with four independently deployed services that communicate over HTTPS:

```
┌───────────────────────────────────────────────────────────────────┐
│                         User Browser                              │
└──────────────────────────┬────────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌───────────────────────────────────────────────────────────────────┐
│              Vercel Frontend (laborconnect.app)                      │
│         React 18 SPA — Member, Admin & Department Portals         │
└──────────────────────────┬────────────────────────────────────────┘
                           │ Axios HTTP (REST API)
                           ▼
┌───────────────────────────────────────────────────────────────────┐
│          Railway Backend (api.laborconnect.app)                      │
│               Express.js 5 — REST API Server                      │
│                        Port 5000                                  │
└──────────┬─────────────────────────────────┬──────────────────────┘
           │                                 │
           │ MySQL2 Connection Pool          │ Webhook POST / Callbacks
           ▼                                 ▼
┌─────────────────────┐       ┌──────────────────────────────────────┐
│  Railway MySQL DB   │       │  Railway n8n Automation Engine       │
│  (utf8mb4)          │       │  (n8n-production-93fb.up.railway.app)│
└─────────────────────┘       └────────────────┬─────────────────────┘
                                               │
                                               │ External API calls
                                               ▼
                                  ┌────────────────────────┐
                                  │  Groq AI API (Vision   │
                                  │  & Chat Models)        │
                                  ├────────────────────────┤
                                  │  Gmail (SMTP via n8n)  │
                                  └────────────────────────┘

                              ┌──────────────────────────────┐
                              │  Stripe API (Sandbox)        │
                              │  Checkout Sessions & Webhooks│
                              └──────────────────────────────┘

                              ┌──────────────────────────────┐
                              │  Cloudflare Turnstile        │
                              │  Bot Protection (siteverify) │
                              └──────────────────────────────┘
```

**Communication flow:**

- **Frontend → Backend:** All API calls go to `{API_BASE_URL}/api/*` via Axios. The base URL is configured through environment variables (`VERCELAPP_API_BASE_URL` in production, `http://localhost:5000` in development).
- **Backend → n8n:** Fire-and-forget POST requests to n8n webhook URLs with shared secret authentication (`x-n8n-shared-secret` header) and configurable timeouts via `AbortController`.
- **n8n → Backend (callbacks):** POST requests to backend endpoints under `/api/n8n/*` and `/api/chatbot/n8n/*`, validated by `n8nAuth` middleware using the shared secret header.
- **n8n → External Services:** Groq AI for chat/vision models, Gmail for sending automated emails.
- **Backend → Stripe:** Checkout session creation, webhook signature verification, and refund processing via the Stripe Node.js SDK.
- **Stripe → Backend:** Webhook POST events for payment confirmations, expirations, and refund updates at `/api/webhooks/stripe`.
- **Backend → Cloudflare:** Server-side Turnstile token verification via the `siteverify` endpoint during login and registration.

---

## Tech Stack

| Layer        | Technology                                                                 |
|-------------|---------------------------------------------------------------------------|
| Frontend    | React 18, React Router 6, Axios, Lucide Icons, react-easy-crop, html2canvas, jsPDF, qrcode, jsQR |
| Backend     | Node.js, Express.js 5, MySQL2 (connection pool with transactions)          |
| Database    | MySQL (utf8mb4) on Railway                                                |
| Auth        | bcryptjs, JWT, TOTP (OTPAuth), Google OAuth 2.0, Twilio Verify (SMS OTP)  |
| Security    | Cloudflare Turnstile (bot protection on login and registration)            |
| Payments    | Stripe (Checkout Sessions, webhooks) — Sandbox mode for digital ID and venue booking payments |
| AI          | Groq AI API (vision & chat models) via n8n workflows                      |
| Automation  | n8n workflow engine (webhooks, scheduled triggers, Gmail nodes)            |
| Deployment  | Vercel (frontend), Railway (backend, database, n8n)                       |
| Build Tools | react-app-rewired (CRA), Nixpacks (Railway)                              |

---

## Deployment Architecture

### Production Services

| Component        | Platform       | URL / Host                                                     |
|-----------------|----------------|----------------------------------------------------------------|
| Frontend         | Vercel         | `https://laborconnect.app` / `https://www.laborconnect.app`          |
| Backend API      | Railway        | `https://api.laborconnect.app` (custom domain on Railway)          |
| MySQL Database   | Railway        | Internal Railway MySQL service                                  |
| n8n Automation   | Railway        | `https://n8n-production-93fb.up.railway.app`                    |

### Frontend Deployment (Vercel)

- **Build tool:** react-app-rewired (Create React App based)
- **Build command:** `react-app-rewired build`
- **Output directory:** `build/`
- **SPA routing:** All routes rewrite to `/index.html` via `vercel.json`
- **Security headers:** HSTS, X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy (camera/mic/geolocation disabled)
- **Admin CSP:** Routes under `/admin/*` enforce a strict Content-Security-Policy that only allows API connections to `api.laborconnect.app`, `*.railway.app`, and `laborconnect.app`
- **DNS:** A record pointing to Vercel (`76.76.21.21`), CNAME `www` to `cname.vercel-dns.com`

### Backend Deployment (Railway)

- **Builder:** Nixpacks
- **Build command:** `cd ALU/backend && npm install`
- **Start command:** `cd ALU/backend && node index.js`
- **Port:** 5000 (internal), mapped via Railway
- **Trust proxy:** Enabled for proper IP forwarding
- **Restart policy:** On failure, max 10 retries
- **DNS:** Custom domain `api.laborconnect.app` via CNAME to Railway

### n8n Deployment (Railway)

- **Port:** 5678
- **Protocol:** HTTPS
- **Authentication:** Basic auth enabled
- **Database:** SQLite (internal)
- **Timezone:** Asia/Manila

### How Services Communicate

1. The React frontend makes Axios HTTP requests to the backend REST API at `api.laborconnect.app`.
2. The backend processes requests, queries MySQL, and when needed triggers n8n workflows via webhook POST requests.
3. n8n workflows execute automation logic (AI processing, email sending, SLA checks) and call back to the backend with results.
4. All n8n ↔ backend communication is authenticated via a shared secret header (`x-n8n-shared-secret`).

---

## Three-Portal Structure

LaborConnect is organized into three distinct portals, each with its own authentication, layout, and navigation:

| Portal         | URL Prefix        | Directory                              | Purpose                              |
|---------------|-------------------|----------------------------------------|--------------------------------------|
| Member Portal  | `/`               | `ALU/frontend/User Side/`              | Self-service for union members        |
| Admin Dashboard| `/admin/`         | `ALU/frontend/Admin Side/`             | Administrative management             |
| Department Portal| `/departments/` | `ALU/frontend/Department Side/`        | Department-scoped ticket handling     |

Each portal has its own Axios client, API module, layout component, sidebar navigation, and authentication flow.

---

## Authentication System

LaborConnect implements a multi-layered authentication system with different mechanisms for each portal.

### Member Authentication

Members can log in using **four methods**:

1. **Email + Password + OTP:** Members enter their email and password, then verify identity with a 6-digit OTP sent to their email. OTP is validated via the backend.

2. **Mobile Number + Password + OTP (Twilio):** Members enter a Philippine mobile number (09XXXXXXXXX format) and password, then verify with a 6-digit OTP sent via SMS through the Twilio Verify service.

3. **Google OAuth 2.0:** Members click "Sign in with Google," which opens a popup window. The backend generates a Google OAuth URL, the user authenticates with Google, and the callback provides a session token. New Google users receive a setup token to complete registration.

4. **Trusted Device (Remember Me):** When "Remember Me" is checked, a trusted device JWT (`alu_trusted_device`) is stored in localStorage with a 30-day expiration. On subsequent logins from the same device, OTP verification is skipped.

**Cloudflare Turnstile bot protection** is enforced on the login page and registration page. The frontend renders a Turnstile challenge widget (explicit mode) using a reusable `TurnstileWidget` component. The backend verifies Turnstile tokens server-side by calling the Cloudflare `siteverify` endpoint with action-based validation. Each form step uses a distinct action identifier (`login_start`, `login_phone_otp`, `register_request_code`, `register_create_account`) for granular security tracking. Turnstile enforcement is configurable via the `TURNSTILE_REQUIRED` environment variable.

**Account creation** supports:
- **Email registration:** First name, last name, email, OTP email verification, then password creation.
- **Mobile number registration:** First name, last name, phone number, OTP SMS verification (Twilio), then password creation.
- **Google OAuth signup:** Google authentication provides a setup token; the user then sets a password to complete registration.

**Session management:**
- JWT tokens are stored in `localStorage` (Remember Me) or `sessionStorage` (session-only).
- Cross-tab session synchronization via `storage` events ensures login/logout propagates across browser tabs.

### Admin Authentication

Admin authentication requires **email + password + mandatory TOTP MFA**:

1. Admin enters email and password.
2. First-time login: The system generates a TOTP secret, displays a QR code for an authenticator app (Google Authenticator, Authy, etc.), and provides downloadable backup codes.
3. Subsequent logins: Admin enters a 6-digit TOTP code from their authenticator app, or uses a backup code.

**Host restriction:** The admin portal is only accessible from allowed hostnames (`admin.laborconnect.app`, `www.laborconnect.app`, `laborconnect.app`, `localhost`, `127.0.0.1`), configurable via `REACT_APP_ADMIN_ALLOWED_HOSTS`.

**Sudo mode:** Sensitive operations (account management, security settings) require re-authentication through a sudo mode modal.

### Department Authentication

Department accounts use **email + password + mandatory TOTP MFA**, identical to admin authentication. Each department account is scoped to a specific department (Legal, Medical, Education, Emergency Support) and can only view and manage tickets assigned to that department.

### JWT System

- **User tokens:** Signed with `JWT_SECRET`, contain user ID and role.
- **Admin tokens:** Signed with the same secret, contain admin ID, role, and permissions.
- **Department tokens:** Contain department account ID and department scope.
- **Trusted device tokens:** Signed with `TRUSTED_DEVICE_JWT_SECRET`, used to bypass OTP.
- **TOTP secrets:** Encrypted at rest using `TOTP_ENCRYPTION_KEY` (64-character hex key).

---

## Member Portal (User Side)

The member portal provides self-service features for union members.

### Landing Page (`/`)

Public marketing page showcasing LaborConnect's features. Displays four feature cards: Digital ID Cards, Member Community, Benefits Tracking, and Priority Support. Contains Sign In and Join Now calls to action.

### Dashboard (`/dashboard`)

The main member hub after login. Displays:

- **Welcome banner** with member avatar, full name, union position, and company name.
- **Membership status** with color-coded chips: Verified Member (green), Pending Approval (yellow), Incomplete (yellow), Application Rejected (red).
- **Membership details:** Member ID, union role, email, QR reference.
- **Quick Access grid** with four navigation cards: Digital ID, Venue Bookings, Request & Assistance, Events.
- **Upcoming Events carousel** showing the three nearest events with hero images, category badges, titles, dates, and venues. Paginated with navigation arrows.
- **Rejection handling:** If rejected, displays rejection reason with options to review the application or re-apply.
- **Incomplete profile prompt:** Directs users to complete the verification process.

### Registration & Profile Completion (`/register`, `/complete-profile`, `/membership-form`)

**Quick Registration (`/register`):** Lightweight multi-step registration collecting first name, middle initial, last name, and email or phone number. Includes OTP verification and password creation. Supports Google OAuth signup.

**Full Profile / Membership Form (`/complete-profile`, `/membership-form`):** A 7-step wizard:

1. **Personal Info:** First name, middle initial, last name, date of birth, place of birth.
2. **Address:** Luzon region/province/city/barangay cascading dropdowns, address lines, postal code.
3. **Additional Info:** Gender, religion, marital status, number of children, education level.
4. **Employment:** Company name, position, department, years employed, union affiliation (LWU/PPEU), union position.
5. **Emergency Contact:** Contact name, relationship, phone, full address with cascading dropdowns.
6. **Photo & Signature:** Profile photo upload with crop/zoom (react-easy-crop), signature pad with canvas drawing.
7. **Review & Submit:** Summary of all entered data with ability to navigate back and edit.

The profile photo upload is validated by the AI Image Detector to ensure it contains a real human face. The form supports both initial profile completion and re-application after rejection. Applications in pending status display as read-only.

### Digital ID (`/digital-id`)

Displays a digital membership ID card with front and back views:

- **Front:** Union-branded header (LWU red gradient / PPEU gold gradient), member photo, full name (auto-sizing font), union position, company, membership date, "Active Member" status badge, signature, "Not for Government ID Purposes" disclaimer.
- **Back:** Union-branded header, QR code containing member verification data (type, memberId, fullName, company, union, qrReference), QR reference number, "Scan to verify membership" instruction.
- **3D card flip** animation on click to toggle front/back.
- **Download as PDF** using html2canvas and jsPDF.
- **Copy QR Reference** to clipboard with confirmation feedback.
- **Physical ID Card Request:** Modal to request a physical card with status tracking (Pending → Printing → Ready for Pickup), pickup code display, and cancel capability. Members can pay for physical ID cards via Stripe digital payment (see [Digital Payment System](#digital-payment-system-stripe)).

### QR Scanner (`/scanqr`)

Public page (no authentication required) for verifying member IDs by scanning QR codes. Supports three input modes:

- **Camera scan:** Live video feed with real-time QR detection using jsQR, camera permission handling, and camera switching.
- **Image upload:** Accepts image files and reads QR codes from uploaded photos using Canvas API + jsQR.
- **Manual entry:** Text input for typing QR reference codes or member IDs.

On successful scan, displays a verified member info card with photo, full name, company, union, membership status, and membership date. Logs verification events for attendance tracking.

### Events (`/news`)

Displays events and news in a card-based feed with category filtering:

- **Categories:** Assembly, Training, Outreach, Benefit, Other, Union Update, Events, Learning.
- **Event cards** show hero image, date badge, category badge with color coding, title, description snippet, venue, and seat count (attendees/capacity).
- **Event detail modal** shows full description, schedule (start/end date and time), venue, capacity tracking, and external link.
- **Event registration/RSVP** via a register button that calls the API and confirms attendance.

### Request & Assistance (`/request-assistance`)

Multi-step ticket submission form for members needing help:

1. **Category selection:** Legal Consultation, Medical Assistance, Educational Scholarship, Emergency Support — each with icon, description, and color coding.
2. **Personal info:** Full name, email, phone, membership ID, date of request, urgency level (Normal/High/Critical) — auto-populated from the member profile.
3. **Request details:** Subject line, description textarea, file attachments with drag-and-drop support.
4. **Confirmation and submission** with success modal showing a ticket reference number.

### My Requests (`/my-requests`, `/my-requests/:ticketId`)

**Request list** displays submitted tickets with status badges (Pending, In Progress, Resolved, Rejected, Deleted) and priority indicators (Urgent, High, Medium, Low). Pending requests can be deleted.

**Ticket detail** page shows full ticket metadata, a status step tracker (Open → Ticket Assigned → In Progress → Closed), and a message thread. Users, admins, and department staff communicate through the message thread with role-based avatars and labels.

### Venue Browsing & Booking (`/venues`, `/venues/:venueId`, `/my-venue-bookings`)

**Browse venues (`/venues`):** Card grid displaying venue image, name, type badge, capacity, hourly rate (PHP), and location. Filterable by type (Indoor, Outdoor, Semi-Indoor, Other) and sortable by name, rate, or capacity. Includes the AI Venue Chatbot floating assistant.

**Venue detail (`/venues/:venueId`):** Image carousel, full venue details (amenities, description, location, contacts), and a booking form. Users select a date and start/end time (8AM–10PM in hourly slots). The system checks availability for the selected date, highlights booked slots, and calculates cost (duration × hourly rate). Includes the AI Venue Chatbot.

**My bookings (`/my-venue-bookings`):** Lists booking history with status badges (Pending Approval, Approved, Rejected, Cancelled, Completed). Detail modal shows full booking info. Pending bookings can be cancelled.

### Account Settings (`/account`)

Profile management page with:

- Profile photo display and editing with crop/zoom.
- Personal details, address, employment information, emergency contact display.
- Password change functionality.
- Support/help modal.
- Logout confirmation dialog.

### Notifications (`/notifications`)

Notification center grouped by time (Today, Last 7 Days, Earlier) with:

- Filter tabs: All, Unread.
- Search within notifications.
- Mark individual or all notifications as read.
- Delete individual notifications.
- Category-based display with icons (event, general, benefit, dues, security).
- Relative time formatting and click-through navigation to relevant pages.

---

## Admin Dashboard (Admin Side)

The admin dashboard provides comprehensive management tools for union administrators. Access is restricted by host allowlist and requires TOTP MFA.

### Dashboard (`/admin/dashboard`)

Admin home page with:

- **Dynamic KPI cards** from the API (total members, approved today, pending registrations, alerts, active tickets, etc.) with mapped icons and color-coded badges.
- **Recent activity feed** with five view modes: Small, Medium, Large, List, Details.
- **Auto-refresh** every 5 minutes with countdown timer and manual refresh.
- **Quick navigation** to other admin pages.

### Members Management (`/admin/members`, `/admin/members/:memberId`)

**Members table:** Paginated list (8 per page) with search and advanced filtering by company, union affiliation, gender, city, province, ID card status, member status, age range, and registration date range. Supports CSV export. Context menu per row: View Profile, Manage ID Card, Archive.

**Member profile:** Detailed view showing all personal, address, employment, and emergency contact information. Includes a digital ID card preview with QR code, membership form PDF export, active tickets list, and active venue bookings for the member.

### Registration Review (`/admin/registration-review`)

Queue for reviewing pending membership applications. Each application shows full personal info, employment details, emergency contact, profile photo preview, and signature preview. Admins can approve (with admin actor tracking) or reject (with reason text field). Supports copying member IDs and generating membership form PDFs.

### Proponent Queue (`/admin/proponent-queue`)

Proponent review queue with metrics dashboard (Pending, Approved, In Edit, Rejected, Overdue). Filterable by status, category, and proponent. Uses AI confidence scoring components (ConfidenceBar, AIBadge).

### Final Approval Queue (`/admin/final-approval-queue`)

Final approval stage for proponent-reviewed items. Stats cards (Pending Final, Approved Today, Returned, Rejected). Three actions per item: Approve, Return to Proponent, Reject.

### Ticket Management (`/admin/tickets`, `/admin/ticket-detail`)

**Ticket dashboard (`/admin/tickets`):** Central ticket management with:

- **Status tabs:** Open, Ticket Assigned, In Progress, Closed, Overdue.
- **Overview panel:** Status counts, category breakdown, priority distribution, assignee list.
- **Search and filters** by category, priority, and assignee.
- **Ticket cards** showing subject, category, priority badge, status badge, creation date, assignee, and **AI-generated summary** displayed inline.
- **SLA deadline monitoring** with automatic overdue detection.
- **Department assignment** modal for routing tickets to: Medical, Legal, Education, Emergency Support, Finance.
- **Handler assignment** within departments.

**Ticket detail (`/admin/ticket-detail`):** Full ticket view with:

- Complete metadata (subject, description, status, priority, category, department, handler, dates).
- **AI Summary card** displaying the n8n-generated summary.
- Message thread with role-based formatting (user/admin/department) and different avatars.
- Status change dropdown and department assignment/reassignment controls.
- Send message as admin.

### Event Management (`/admin/event-management`)

Full CRUD for union events with:

- Event table with columns: title, category, date, venue, capacity, status, attendees.
- **Create/edit dialog:** Title, category (General Assembly, Seminar/Training, Health & Wellness, Community Outreach, Other), description, start/end date and time, venue, capacity, thumbnail image upload (max 5MB), external link URL, status (Draft, Published, Archived).
- Attendee tracking (registered, attended, waitlisted).
- Delete event with confirmation.

### Venue Management (`/admin/venue-management`)

Full CRUD for venues with:

- Venue listing with analytics (total venues, active venues, total bookings, active bookings).
- **Create/edit dialog:** Name, type (Indoor/Outdoor/Semi-Indoor/Other), capacity, rate per hour, amenities, description, location, contact email, contact phone, external link, visibility toggle.
- Multi-image upload (max 5MB per image) with individual image deletion.
- Toggle venue visibility (visible/hidden).

### Client Bookings (`/admin/client-bookings`)

Admin management of venue booking requests:

- **Status filter tabs:** All, Pending, Approved, Rejected, Cancelled, Completed.
- Booking cards showing customer details, venue, date/time, duration, calculated cost, and status badges.
- **Approve and reject** actions for pending bookings.
- Booking analytics overview.

### ID Card Management (`/admin/id-card-management`)

Physical ID card request management:

- Request queue with filtering and search.
- **Status workflow:** Pending → Printing → Ready for Pickup → Released.
- **Card preview** rendering with the same digital ID card design as the member-facing page.
- **Print** individual cards (html2canvas to print window).
- **Batch print** capability.
- **Export** card image as PDF.
- Payment status tracking and pickup code management.
- Notification sending to members on status changes.

### Reports & Analytics (`/admin/reports-analytics`)

Comprehensive reporting module with five tab sections:

- **Overview:** KPI cards, membership trends, ticket metrics, time range filtering.
- **Membership:** Company breakdown, demographics, registration trends.
- **Operations:** Ticket performance, resolution rates, SLA compliance metrics.
- **Custom Reports:** Report builder with configurable parameters. Export in PDF, Excel, or CSV formats.
- **Data Lifecycle:** Archive old data, export history management, table-level data archiving.

Supports scheduled report creation, update, and deletion with format normalization.

### Audit Log (`/admin/audit-log`)

System audit trail viewer for all admin, system, and AI actions:

- Paginated log entries with search.
- Filter by actor type: All, Admin, AI, System.
- Role-based visual indicators with distinct icons: Super Administrator, Approver Admin, Booking Admin, Events Admin, ID Card Manager, Tickets Admin.
- Color-coded action tones: login (green), logout (red), creation (green), updates (blue), deletions (red), AI actions (blue), settings (orange).
- Covers all operations: login/logout, registration approval/rejection, event CRUD, venue CRUD, booking approval/rejection, ID card operations, ticket operations, AI auto-assign, AI model calls, settings changes, admin account creation, password changes.

### Admin Settings (`/admin/admin-settings`)

System configuration panel (SUPER_ADMIN only):

- **Admin account management:** Create, update, and suspend admin accounts with role assignment.
- **Department account management:** CRUD for Legal, Medical, Education, Emergency department accounts. MFA reset for department accounts.
- **Password authentication settings** and security controls.
- **Two-factor authentication** settings and session timeout configuration.
- **Login attempt limits** and audit logging toggle.
- **Notification preferences:** Toggle for including AI summaries in notifications.
- **Organization settings:** Custom company and union list management.
- **Sudo mode** for sensitive operations (re-authentication required).

#### Union Management

Located under Admin Settings → Union Management, this feature allows administrators to dynamically manage the system's organizational hierarchy without modifying the database manually. Admins can manage:

- **Union Affiliations:** Top-level union organizations (e.g., LWU — Luzon Workers Union, PPEU — Philippine Professional Employees Union) with acronym, full name, logo upload, and color theme (red, yellow).
- **Companies:** Employer companies organized under union affiliations.
- **Union Names:** Specific union chapters/locals organized under companies, with full names and acronyms.
- **Union Positions:** Position types within unions (e.g., Member, Shop Steward, Secretary, President).

Each entity supports full CRUD operations with active/disabled status toggling. The hierarchical structure (Affiliations → Companies → Union Names) enables the system to scale to multiple unions and organizations. Union affiliations also drive the visual branding of digital ID cards (color themes and logos).

#### Backup Management

Located under Admin Settings → Backup Management, this feature allows administrators to manage system backups and ensure data reliability.

- **Backup configuration:** Admins can configure backup schedule type, interval, preferred scope (full or database-only), and retention policies.
- **Manual backup trigger:** Admins can initiate an on-demand backup directly from the admin panel, which dispatches a GitHub Actions workflow via the GitHub API.
- **Automated scheduled backups:** A GitHub Actions workflow runs every 6 hours, performing full backups at midnight UTC and database-only backups at other intervals.
- **Encrypted backups:** All backups are encrypted using `age` encryption with a public key, ensuring data security at rest.
- **Google Drive upload:** Encrypted backups are uploaded to Google Drive via `rclone` with a three-tier retention policy: daily (14 days), weekly (56 days), and monthly (186 days).
- **Backup history:** Admins can view workflow run history and download the latest backup artifact from the admin panel.
- **Restore capability:** A dedicated restore script supports decryption and selective restoration of database and/or runtime files (uploads directory).

### Admin Notifications (`/admin/notifications`)

Admin notification center grouped by recency (New, Today, Earlier) with search, mark-all-as-read, and unread count badge.

---

## Department Portal (Department Side)

The department portal provides a focused interface for department staff to handle assigned support tickets.

### Department Login (`/departments/login`)

Department authentication with mandatory TOTP MFA. First-time login includes TOTP setup with QR code, secret key, and backup codes. Displays department name after login.

### Department Tickets (`/departments/tickets`)

Department-scoped ticket list showing only tickets assigned to the logged-in department:

- Status tabs: All, Open, Ticket Assigned, In Progress, Closed, Overdue.
- Search bar and pagination (20 per page).
- Priority badges: Urgent (red), High (orange), Medium (yellow), Low (green).
- Click to view ticket detail.

### Department Ticket Detail (`/departments/ticket-detail`)

Ticket detail and conversation view:

- Full ticket info: subject, description, status, priority, category, dates.
- Message thread with role-based formatting (user, admin with role labels, department).
- Send message capability as department user.
- Status update: Open, Ticket Assigned, In Progress, Closed.

---

## Ticket & Assistance System

The ticket system spans all three portals and provides a complete support lifecycle.

### Ticket Lifecycle

1. **Member creates a ticket** via the Request & Assistance page, selecting a category (Legal, Medical, Educational, Emergency), urgency level, and providing a description with optional file attachments.
2. **Email notification** is sent to the member confirming ticket creation and to admins alerting them of the new ticket (via the n8n Ticket Email Notifications workflow).
3. **AI summary is generated** if the ticket description is long enough. The n8n Ticket AI Summary workflow processes the description and posts the summary back to the backend, which stores it in the `ai_summary` column.
4. **Admin reviews the ticket** in the Tickets dashboard where AI summaries appear inline on ticket cards. The admin assigns the ticket to a department (Medical, Legal, Education, Emergency Support, Finance) and optionally to a specific handler.
5. **Department receives the ticket** in the Department Portal and begins working on it.
6. **All three parties communicate** via the message thread — members, admins, and department staff can post messages with role-based identification.
7. **SLA monitoring** runs daily via the n8n SLA Monitoring workflow, which checks for overdue tickets based on priority-based deadlines and sends escalation emails in up to three levels.
8. **Status update emails** are sent at each stage transition via the n8n Ticket Email Notifications workflow.
9. **Ticket is closed** when resolved, triggering a resolution email notification.

### Ticket Status Flow

```
Open → Ticket Assigned → In Progress → Closed
```

An **Overdue** overlay appears when the SLA deadline is breached.

### SLA Deadlines by Priority

| Priority | SLA Deadline |
|----------|-------------|
| Urgent   | 4 hours     |
| High     | 24 hours    |
| Medium   | 48 hours    |
| Low      | 72 hours    |

### Escalation Levels

- **Level 1:** SLA Reminder email
- **Level 2:** Escalation email
- **Level 3:** Overdue Alert email

### Department Routing

Tickets are routed to departments based on category:

| Category               | Department          |
|-----------------------|---------------------|
| Legal Consultation     | Legal Department    |
| Medical Assistance     | Medical Department  |
| Educational Scholarship| Education Department|
| Emergency Support      | Emergency Support   |

---

## Venue Booking System

### Booking Flow

1. **Member browses venues** at `/venues`, filtering by type and sorting by name, rate, or capacity.
2. **Member views venue details** at `/venues/:venueId`, including image carousel, amenities, description, location, and contacts.
3. **Member fills the booking form:** Selects a date and start/end time (8AM–10PM in hourly slots). The system fetches booked slots for the selected date and highlights unavailable times.
4. **Cost is calculated:** (end hour − start hour) × rate per hour, displayed in PHP (Philippine Peso).
5. **Confirmation modal** shows all booking details and calculated cost. Member confirms.
6. **Payment is processed** via Stripe Checkout if digital payment is selected (see [Digital Payment System](#digital-payment-system-stripe)). The system creates a checkout session with a 30-minute expiry and a 5-minute payment window for venue bookings. Expired payments auto-cancel the booking.
7. **Booking is created** with "Pending" status. A booking creation email is sent via the n8n Booking Email Notifications workflow.
7. **Admin reviews** the booking in Client Bookings and approves or rejects it. An approval or rejection email is sent to the member.
8. **Member sees status update** in My Venue Bookings.
9. Members can **cancel pending bookings** before admin review.

### AI Venue Chatbot

A floating AI-powered chatbot assistant appears on venue pages. Members can:

- **Browse available venues** through natural-language conversation.
- **Check venue details and availability** for specific dates and times.
- **Book a venue** directly through the chatbot, which calls backend tool endpoints to check availability and create bookings with overlap detection.

The chatbot is powered by the n8n Venue Booking Chatbot workflow using the Groq AI chat model, with session-based conversation memory and markdown-like message rendering.

---

## Event System

### Event Management (Admin)

Admins create and manage events with:

- **Event details:** Title, description, start/end date and time, venue, capacity.
- **Category:** General Assembly, Seminar/Training, Health & Wellness, Community Outreach, Other.
- **Status:** Draft, Published, Archived.
- **Thumbnail image upload** (max 5MB).
- **External link URL** for event-specific resources.
- **Attendee tracking:** Registered, attended, and waitlisted counts.

### Event Display (Member Portal)

Members see published events at `/news` with category filtering and can view event details in a modal showing full description, schedule, venue, and capacity. Members can register/RSVP for events.

The member dashboard also features an **Upcoming Events carousel** displaying the nearest events.

---

## Digital ID & QR Verification System

### Digital ID Card

Members with verified accounts can view their digital ID at `/digital-id`. The card features:

- **Union-branded design** that dynamically adapts based on union affiliation:
  - **LWU:** Red header gradient (`#d14c17` → `#a70606`), blue footer (`#1e3a8a` → `#1d4ed8`).
  - **PPEU:** Gold header gradient (`#ca8a04` → `#a16207`), blue footer.
- **Front view:** Union logo and name, member photo, full name (auto-sizing font), union position, company, membership date, "Active Member" badge, signature, disclaimer.
- **Back view:** Union header, QR code, QR reference number, "Scan to verify membership" instruction.
- **3D flip animation** on click to toggle between front and back.

### QR Code Payload

The QR code encodes a JSON payload:

```json
{
  "type": "alu_member_id",
  "memberId": "LWU-2024-12345",
  "shortId": "12345",
  "fullName": "JOHN D. SMITH",
  "company": "Sample Corp",
  "union": "LWU",
  "userId": 123,
  "qrReference": "QR-000123"
}
```

### QR Code Verification

The public QR scanner at `/scanqr` (no authentication required) verifies membership by:

1. Reading a QR code via camera, image upload, or manual reference entry.
2. Parsing the QR payload (supports JSON, URL-encoded, and base64-encoded formats, and multiple type identifiers).
3. Looking up the member via the backend API (`GET /api/users/lookup/qr/:reference`).
4. Displaying a verified member info card with photo, name, company, union, membership status, and membership date.
5. Logging the verification event for attendance tracking.

### Physical ID Cards

Members can request a physical ID card from the Digital ID page. Admins manage requests in ID Card Management with a workflow: Pending → Printing → Ready for Pickup → Released. Cards can be previewed, printed individually or in batches, and exported as PDF.

---

## Digital Payment System (Stripe)

LaborConnect integrates Stripe for digital payments using the Stripe Sandbox environment. Payments are processed through Stripe Checkout Sessions with PHP (Philippine Peso) as the currency.

### Payment Purposes

| Purpose | Description |
|---------|-------------|
| **Digital ID Card Request** | Members pay for physical ID card production and optional shipping fees via Stripe when submitting a card request. Pricing is configurable (base fee + optional shipping fee). |
| **Venue Booking** | Members pay for venue reservations based on the hourly rate and booking duration. The cost is calculated as `rate_per_hour × duration_hours` and converted to centavos for Stripe processing. |

### Checkout Flow

1. **Member initiates payment** from the Digital ID page or Venue Booking page.
2. **Backend creates a Stripe Checkout Session** with the calculated amount, payment metadata, and success/cancel redirect URLs.
3. **Member is redirected to Stripe Checkout** to complete payment via card (supports GCash, GrabPay, Maya, Apple Pay, and Google Pay wallets through Stripe).
4. **On success**, the member is redirected to the Payment Success page. The Stripe webhook confirms payment and updates the transaction status.
5. **On cancellation or expiry**, the member is redirected to the Payment Cancel page and the booking or request is cancelled.

### Payment Processing

- **Checkout session expiry:** 30 minutes (`STRIPE_CHECKOUT_EXPIRES_SECONDS`).
- **Venue booking payment window:** 5 minutes (`VENUE_BOOKING_PAYMENT_WINDOW_SECONDS`) — bookings are auto-cancelled if payment is not started within this window.
- **Webhook processing:** The backend listens for Stripe webhook events (`checkout.session.completed`, `checkout.session.expired`, `charge.refund.updated`) at `POST /api/webhooks/stripe`, verified using the `STRIPE_WEBHOOK_SECRET`.
- **Auto-refund:** If a venue booking window expires before payment completes, the system automatically initiates a refund.
- **Transaction tracking:** All payments are recorded in the `payment_transactions` table with status tracking (pending, paid, expired, refunded).

### Admin Payment Management

- Admins can view payment status on ID card requests and venue bookings.
- Refund operations are tracked with admin metadata in payment transactions.
- ID card payments trigger status transitions (e.g., `payment_status` → `paid`, `shipping_status` → `preparing`) and receipt email notifications.

---

## AI Features & Integrations

LaborConnect integrates three AI-powered features, all processed through n8n workflows using the Groq AI API.

### 1. AI Image Detector (Profile Photo Human Validation)

**Purpose:** Ensures uploaded profile photos contain a real human face.

**How it works:**

1. When a member uploads a profile photo (during registration or profile update), the backend sends the image as a base64 data URL to the n8n AI Image Detector webhook.
2. The n8n workflow extracts the image and sends it to the Groq AI vision model for analysis.
3. The AI returns a `humanDetected` boolean result.
4. If no human is detected, the upload is rejected with a validation message asking the member to upload a valid photo with their face visible.
5. Handles edge cases: AI service not configured (503), image too large (400), service unavailable (503), timeout.

**Timeout:** Configurable via `N8N_PROFILE_PHOTO_HUMAN_TIMEOUT_MS` (default 12 seconds).

### 2. AI Ticket Summary Generation

**Purpose:** Automatically generates concise summaries of support ticket descriptions for admins.

**How it works:**

1. When a new support ticket is created with a sufficiently long description, the n8n Ticket Email Notifications workflow checks the description length.
2. If the description qualifies, the workflow triggers the Ticket AI Summary workflow.
3. The AI Summary workflow uses the Groq AI chat model (with memory and tool sub-nodes) to generate a concise summary.
4. The summary is posted back to the backend at `POST /api/n8n/tickets/:ticketId/ai-summary`, authenticated with the shared secret header.
5. The backend stores the summary in the `ai_summary` column of the tickets table.
6. Admins see the AI summary on ticket cards in the Tickets dashboard and in the AI Summary card on the Ticket Detail page.

**Privacy:** Disclosed in the Terms & Conditions (Section 9) and Privacy Policy (Section 5).

### 3. Venue Booking AI Chatbot

**Purpose:** Provides an AI-powered conversational assistant for venue browsing and booking.

**How it works:**

1. The chatbot appears as a floating button (bottom-right corner) on venue pages.
2. Members send natural-language messages or click quick action buttons ("Browse available venues," "Check venue details & availability," "Book a venue for you").
3. The frontend sends messages to `POST /api/chatbot/message` with user context (userId, userName, userEmail, userPhone, sessionId).
4. The backend proxies the request to the n8n Venue Booking Chatbot webhook.
5. The n8n AI Agent workflow (Groq AI chat model with conversation memory) processes the message and can invoke four backend tool endpoints:
   - `get_venues` — Lists available venues.
   - `get_venue_info` — Gets venue details.
   - `check_availability` — Checks time slot availability for a specific date.
   - `create_booking` — Creates a booking with overlap detection.
6. The AI responds with natural-language text, which the frontend renders with markdown-like formatting (bold, bullet lists, numbered lists).
7. If a booking is created, the chatbot signals the parent page to refresh booking data.

**Timeout:** Configurable via `N8N_VENUE_CHATBOT_TIMEOUT_MS` (default 30 seconds).

---

## n8n Automation Workflows

LaborConnect uses six n8n workflows hosted on Railway for automation:

### 1. AI Image Detector

- **Trigger:** Webhook POST from backend when a profile photo is uploaded.
- **Flow:** Webhook → Extract Image → Groq AI Vision API → Normalize Result → Respond to Webhook.
- **Purpose:** Validates that profile photos contain a human face.
- **Services:** Groq AI API.

### 2. Ticket Email Notifications

- **Trigger:** Webhook POST from `ticketNotificationService.js` in the backend.
- **Flow:** Webhook → Route by Type (Switch) → Three branches:
  - **Ticket Created:** Email to user (confirmation) + Email to admin (alert) → Check description length → Trigger AI Summary workflow if needed.
  - **Status Changed:** Email status update → Log notification to backend.
  - **Resolved:** Email resolution notification → Log notification to backend.
- **Notification types:** `ticket_created`, `status_changed`, `ticket_resolved`, `user_reply`.
- **Services:** Gmail, Backend API, Ticket AI Summary workflow.

### 3. Ticket AI Summary

- **Trigger:** Webhook POST from the Ticket Email Notifications workflow.
- **Flow:** Webhook → Groq AI chat model (with memory and tool sub-nodes) → POST summary to backend callback URL.
- **Purpose:** Generates concise AI summaries of ticket descriptions.
- **Callback:** `POST /api/n8n/tickets/:ticketId/ai-summary`.
- **Services:** Groq AI.

### 4. Booking Email Notifications

- **Trigger:** Webhook POST from `bookingEmailNotifier.js` in the backend.
- **Flow:** Webhook → Switch by booking event type → Three branches:
  - **Pending:** Booking created confirmation email.
  - **Approved:** Booking approval email with full details.
  - **Rejected:** Booking rejection email with reason.
- **Notification types:** `booking_created`, `booking_approved`, `booking_rejected`.
- **Services:** Gmail.

### 5. Venue Booking Chatbot

- **Trigger:** Webhook POST from `/api/chatbot/message` backend route.
- **Flow:** Webhook → Groq AI Agent (with conversation memory and tool sub-nodes) → Respond to Webhook.
- **AI Tools available:**
  - `get_venues` — Lists available venues from the backend.
  - `get_venue_info` — Gets venue details from the backend.
  - `check_availability` — Checks time slot availability.
  - `create_booking` — Creates a booking with overlap detection.
- **Purpose:** Powers the conversational AI chatbot for venue browsing and booking.
- **Services:** Groq AI, Backend API (bidirectional communication). Postgres, memory server for storing chat history.

### 6. SLA Monitoring

- **Trigger:** Scheduled — runs every day (cron trigger).
- **Flow:** Schedule → Fetch overdue tickets (`GET /api/n8n/tickets/sla-check`) → Extract Tickets → Escalation Level (Switch) → Three branches:
  - **Level 1:** SLA Reminder email → Update escalation.
  - **Level 2:** Escalation email → Update escalation.
  - **Level 3:** Overdue Alert email → Update escalation.
- **Purpose:** Detects overdue tickets based on SLA deadlines and sends escalation emails.
- **SLA deadlines:** Urgent (4h), High (24h), Medium (48h), Low (72h).
- **Auto department routing:** Legal, Medical, Education, Emergency Support.
- **Services:** Gmail, Backend API.

---

## Roles & Permissions

### Member Statuses

| Status              | Access Level                                        |
|--------------------|-----------------------------------------------------|
| Incomplete          | Dashboard, profile completion form only              |
| Pending Approval    | Dashboard, read-only application view                |
| Rejected            | Dashboard, re-application form                       |
| Verified (Active)   | Full access to all member features                   |

### Admin Roles

| Role              | Access                                                                    |
|-------------------|---------------------------------------------------------------------------|
| SUPER_ADMIN       | Full access to all admin modules including settings, members, reports      |
| APPROVER          | Registration review and approval/rejection                                |
| ID_CARD_MANAGER   | Physical ID card request management                                       |
| TICKETS_ADMIN     | Ticket management, department assignment, handler assignment              |
| EVENT_MANAGER     | Event creation, editing, deletion, attendee management                    |
| BOOKING_ADMIN     | Venue management, client booking approval/rejection                       |

### Department Accounts

Each department account is scoped to one department (Legal, Medical, Education, Emergency Support) and can only view and manage tickets assigned to that department.

---

## Project Structure

```
ThesisProj/
├── ALU/
│   ├── backend/                    # Express.js API server
│   │   ├── index.js                # Entry point (Express 5, port 5000)
│   │   ├── db.js                   # MySQL2 connection pool
│   │   ├── routes/
│   │   │   ├── auth.js             # Authentication (login, register, OTP, Google OAuth)
│   │   │   ├── users.js            # User CRUD, profile photo upload with AI validation
│   │   │   ├── news.js             # News/events API
│   │   │   ├── tickets.js          # Support ticket management
│   │   │   ├── venues.js           # Venue browsing
│   │   │   ├── chatbot.js          # AI chatbot proxy + n8n tool endpoints
│   │   │   ├── payments.js         # Stripe payment checkout session routes
│   │   │   ├── webhooks.js         # Stripe webhook endpoint
│   │   │   ├── n8nRoutes.js        # n8n callback endpoints (AI summary, notification log, SLA)
│   │   │   ├── adminroutes/        # Full admin API (members, tickets, venues, bookings,
│   │   │   │                       #   events, reports, audit, settings, security, ID cards,
│   │   │   │                       #   dashboard, quicksearch, data lifecycle)
│   │   │   ├── departmentroutes/   # Department portal API (auth, tickets)
│   │   │   └── userroutes/         # User-specific routes (venues, bookings)
│   │   ├── services/
│   │   │   ├── bookingEmailNotifier.js     # Booking email via n8n
│   │   │   ├── ticketNotificationService.js # Ticket notifications via n8n
│   │   │   ├── emailTemplates.js            # Email templates
│   │   │   └── idCardEmailNotifier.js       # ID card status notifications
│   │   ├── controllers/
│   │   │   └── paymentController.js         # Stripe checkout, webhook, and refund logic
│   │   ├── middleware/
│   │   │   ├── adminAuth.js        # Admin JWT authentication
│   │   │   ├── adminOriginGuard.js # Admin origin restriction
│   │   │   ├── deptAuth.js         # Department JWT authentication
│   │   │   └── n8nAuth.js          # n8n shared secret validation
│   │   └── uploads/                # File upload directory
│   │   ├── scripts/
│   │   │   └── backup/             # Backup scripts (create, restore, upload to Google Drive)
│   │
│   └── frontend/                   # React SPA (CRA + react-app-rewired)
│       ├── src/
│       │   ├── App.js              # Main routing (all three portals)
│       │   ├── config.js           # API URL configuration
│       │   ├── api/                # Shared Axios clients and API modules
│       │   ├── components/         # Shared components (AppLayout, Footer, VenueChatbot, TurnstileWidget)
│       │   ├── hooks/              # Custom React hooks (usePageTitle)
│       │   ├── utils/              # Utilities (qr, unionBranding, assetUrl, imageCrop)
│       │   └── data/               # Static data (luzonAddressData, employmentOptions)
│       ├── User Side/
│       │   ├── pages/              # ~26 member-facing page components
│       │   └── styles/             # User portal CSS
│       ├── Admin Side/
│       │   ├── pages/              # ~24 admin page components
│       │   ├── components/         # Admin layout, sidebar, topbar, modals
│       │   │   └── ai/             # AI UI components (AIBadge, ConfidenceBar, ProponentCard)
│       │   └── api/                # Admin Axios client and API module
│       └── Department Side/
│           ├── pages/              # 3 department page components
│           ├── components/         # Department layout, sidebar, topbar
│           └── api/                # Department Axios client and API module
│
├── n8n Workflows/                  # Workflow documentation (PNG screenshots)
│   ├── AI Image Detector.png
│   ├── Ticket AI Summary.png
│   ├── Ticket Email Notifications.png
│   ├── Booking Email Notifications.png
│   ├── Venue Booking Chatbot.png
│   └── SLA Monitoring.png
│
├── .github/workflows/              # GitHub Actions CI/CD and automation
│   ├── backup-to-gdrive.yml       # Scheduled encrypted backup to Google Drive
│   └── backup-from-dev-scheduler.yml # Dev branch backup scheduler
│
├── MySQL Tables.txt                # Database schema reference
├── railway.toml                    # Railway deployment config
├── package.json                    # Root package config
└── vercel.json (in ALU/frontend/)  # Vercel deployment config
```

---

## Environment Variables

### Backend (`ALU/backend/.env`)

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port (default: 5000) |
| `CLIENT_URL` | Primary frontend URL for CORS |
| `CLIENT_URLS` | Comma-separated allowed frontend origins |
| `ADMIN_ALLOWED_ORIGINS` | Origins allowed to access `/api/admin/*` |
| `MYSQL_HOST` | MySQL host |
| `MYSQL_PORT` | MySQL port |
| `MYSQL_USER` | MySQL user |
| `MYSQL_PASSWORD` | MySQL password |
| `MYSQL_DATABASE` | MySQL database name |
| `MYSQL_POOL_LIMIT` | Connection pool limit |
| `JWT_SECRET` | JWT signing secret |
| `TRUSTED_DEVICE_JWT_SECRET` | JWT secret for remembered devices |
| `UPLOAD_DIR` | File upload directory (default: `uploads`) |
| `OTP_HASH_SECRET` | OTP hashing secret |
| `OTP_RESEND_COOLDOWN_MS` | OTP resend cooldown (default: 60000ms) |
| `OTP_MAX_ATTEMPTS` | Max OTP verification attempts (default: 5) |
| `TOTP_ENCRYPTION_KEY` | 64-char hex key for TOTP secret encryption |
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_VERIFY_SERVICE_SID` | Twilio Verify service SID |
| `TWILIO_PHONE_NUMBER` | Twilio phone number |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | Google OAuth redirect URI |
| `GOOGLE_OAUTH_STATE_SECRET` | Google OAuth state secret |
| `GMAIL_USER` | Gmail SMTP user |
| `GMAIL_APP_PASSWORD` | Gmail app password |
| `SMTP_FROM` | SMTP sender address |
| `N8N_SHARED_SECRET` | Shared secret for n8n webhook authentication |
| `N8N_TICKET_CALLBACK_URL` | Backend URL that n8n calls back to |
| `N8N_TICKET_NOTIFICATION_WEBHOOK_URL` | n8n ticket notification webhook |
| `N8N_TICKET_AI_SUMMARY_WEBHOOK_URL` | n8n AI summary webhook |
| `N8N_BOOKING_EMAIL_WEBHOOK_URL` | n8n booking email webhook |
| `N8N_VENUE_CHATBOT_WEBHOOK_URL` | n8n venue chatbot webhook |
| `N8N_VENUE_CHATBOT_TIMEOUT_MS` | Chatbot timeout (default: 30000ms) |
| `N8N_PROFILE_PHOTO_HUMAN_WEBHOOK_URL` | n8n human detection webhook |
| `N8N_PROFILE_PHOTO_HUMAN_TIMEOUT_MS` | Human detection timeout (default: 12000ms) |
| `STRIPE_SECRET_KEY` | Stripe API secret key (Sandbox) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_CHECKOUT_EXPIRES_SECONDS` | Stripe Checkout session expiry (default: 1800) |
| `VENUE_BOOKING_PAYMENT_WINDOW_SECONDS` | Venue booking payment window (default: 300) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server-side secret key |
| `TURNSTILE_REQUIRED` | Enable/disable Turnstile enforcement (default: true) |
| `GITHUB_BACKUP_TOKEN` | GitHub personal access token for backup workflow dispatch |
| `GITHUB_BACKUP_REPO` | GitHub repository for backup workflow (owner/repo format) |
| `BACKUP_AGE_PUBLIC_KEY` | Age encryption public key for backup files |

### Frontend (`ALU/frontend/.env`)

| Variable | Purpose |
|----------|---------|
| `VERCELAPP_API_BASE_URL` | Production API URL (e.g., `https://api.laborconnect.app`) |
| `REACT_APP_ADMIN_ALLOWED_HOSTS` | Allowed hostnames for admin UI access |
| `REACT_APP_LOCAL_API_BASE_URL` | Override local dev API URL (default: `http://localhost:5000`) |
| `REACT_APP_DEFAULT_ADMIN_ID` | Default admin ID for audit log fallback |
| `REACT_APP_DEFAULT_ADMIN_NAME` | Default admin name |
| `REACT_APP_OTP_RESEND_COOLDOWN_MS` | OTP resend cooldown in frontend |
| `REACT_APP_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key for bot protection widget |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL 8.0+
- npm

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/imapoopzz/ThesisProj.git
   cd ThesisProj
   ```

2. **Set up the backend:**
   ```bash
   cd ALU/backend
   npm install
   cp .env.example .env
   # Configure all environment variables in .env
   ```

3. **Set up the database:**
   - Create a MySQL database with `utf8mb4` charset.
   - Run the migration scripts (located in `ALU/backend/`) to create tables.
   - Reference `MySQL Tables.txt` for the complete schema.

4. **Start the backend:**
   ```bash
   cd ALU/backend
   npm run dev    # Uses nodemon for hot reload
   ```

5. **Set up the frontend:**
   ```bash
   cd ALU/frontend
   npm install
   cp .env.example .env
   # Configure environment variables
   ```

6. **Start the frontend:**
   ```bash
   cd ALU/frontend
   npm start      # Starts on port 3000
   ```

7. **n8n (optional for local development):**
   - Install n8n locally or use the Railway-hosted instance.
   - Import or recreate workflows matching the PNG documentation in `n8n Workflows/`.
   - Configure webhook URLs in the backend `.env` to point to your n8n instance.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/login-start` | Initiate login (email/phone + password) |
| POST   | `/api/auth/login-verify` | Verify OTP and complete login |
| POST   | `/api/auth/send-otp` | Send OTP to email or phone |
| POST   | `/api/auth/verify-otp` | Verify OTP code |
| POST   | `/api/auth/register` | Register new account |
| POST   | `/api/auth/reapply` | Re-apply after rejection |
| POST   | `/api/auth/forgot-password` | Request password reset |
| POST   | `/api/auth/reset-password` | Reset password with token |
| GET    | `/api/auth/google/url` | Get Google OAuth URL |
| GET    | `/api/auth/google/callback` | Google OAuth callback |
| POST   | `/api/auth/google/session` | Exchange Google token for session |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/users/:id` | Get user profile |
| PUT    | `/api/users/:id` | Update user profile |
| POST   | `/api/users/:id/profile-photo` | Upload profile photo (AI validated) |
| GET    | `/api/users/:id/dues` | Get user dues records |
| GET    | `/api/users/:id/notifications` | Get user notifications |
| PUT    | `/api/users/:id/notifications/read-all` | Mark all notifications read |
| GET    | `/api/users/lookup/qr/:reference` | Lookup member by QR reference |

### Tickets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/tickets` | Create a new ticket |
| GET    | `/api/tickets` | List tickets (filterable) |
| GET    | `/api/tickets/:id` | Get ticket detail |
| POST   | `/api/tickets/:id/messages` | Post a message to ticket thread |

### Venues & Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/venues` | List venues |
| GET    | `/api/venues/:id` | Get venue detail |
| GET    | `/api/venues/:id/availability` | Check venue availability for a date |
| POST   | `/api/venues/:id/book` | Create a booking |
| GET    | `/api/my-bookings` | List user's bookings |
| PATCH  | `/api/my-bookings/:id/cancel` | Cancel a pending booking |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/news` | List events |
| GET    | `/api/events/:id` | Get event detail |
| POST   | `/api/events/:eventId/register` | Register for an event |

### AI Chatbot

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/chatbot/message` | Send message to AI venue chatbot |
| POST   | `/api/chatbot/n8n/get-venues` | n8n tool: list venues |
| POST   | `/api/chatbot/n8n/get-venue-info` | n8n tool: get venue info |
| POST   | `/api/chatbot/n8n/check-availability` | n8n tool: check availability |
| POST   | `/api/chatbot/n8n/create-booking` | n8n tool: create booking |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/payments/checkout-session` | Create Stripe Checkout session for ID card or venue booking payment |
| POST   | `/api/payments/cancel-session` | Cancel an active Stripe Checkout session |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/webhooks/stripe` | Stripe webhook endpoint for payment event processing |

### n8n Callbacks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/n8n/tickets/:ticketId/ai-summary` | Store AI-generated ticket summary |
| POST   | `/api/n8n/tickets/:ticketId/notification-log` | Log email notification |
| GET    | `/api/n8n/tickets/sla-check` | Get overdue tickets for SLA monitoring |
| POST   | `/api/n8n/tickets/:ticketId/escalate` | Update ticket escalation level |

### ID Cards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/id-card-request/status` | Get user's ID card request status |
| POST   | `/api/id-card-request` | Submit physical ID card request |
| PATCH  | `/api/id-card-request/:id/cancel` | Cancel ID card request |

### Admin API (`/api/admin/*`)

The admin API includes endpoints for: dashboard statistics, member management, registration approvals, ticket management, event CRUD, venue CRUD, venue booking management, ID card request management, reports and analytics, audit logs, admin settings (including union management and backup management), department account management, security settings, organization settings, AI policy management, data lifecycle management, and quick search.

### Department API (`/api/department/*`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/department/auth/login` | Department login |
| POST   | `/api/department/auth/totp-setup` | Setup TOTP for department |
| POST   | `/api/department/auth/totp-verify` | Verify department TOTP |
| GET    | `/api/department/tickets` | List department-scoped tickets |
| GET    | `/api/department/tickets/:id` | Get ticket detail |
| POST   | `/api/department/tickets/:id/messages` | Post department message |
| PATCH  | `/api/department/tickets/:id` | Update ticket status |

