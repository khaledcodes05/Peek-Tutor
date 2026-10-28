# 🎓 Peek Tutor — Peer Mentorship Platform

A modern, responsive peer mentorship platform where college students can discover verified peer tutors, compare tutors side by side, find real-time available time slots, book 1-on-1 study sessions, and manage reservations.

Built for **academic and college project demonstrations**, featuring realistic collegiate profiles, collision-free slot reservations, dynamic pricing calculations, calendar exports (`.ics`), and persistent client-side storage (`localStorage`).

---

## 🌟 Key Features

### 1. 🏠 Home Page (`/`)
- **Hero Showcase**: Brand tagline *"Learn Together. Grow Together."* with call-to-actions and interactive search bar.
- **Curriculum Highlights**: Quick subject filters for 8 core college subjects (Java, Python, DSA, DBMS, AI/ML, Math, Web Dev, Networks).
- **Featured Tutors**: Instant booking access to top-rated mentors.
- **3-Step "How It Works"**: Educational breakdown of searching, slot selection, and meeting.
- **Live Platform Stats**: Mentors count, average rating (4.92★), and subject coverage.

### 2. 🔍 Find Tutors Page (`/tutors`)
- **12 Realistic Tutor Profiles**: Detailed backgrounds, course expertise, GPA, languages, session format (Online, In-Person, Hybrid), and hourly rates (including free volunteer mentors).
- **Multi-Filter Engine**:
  - Live search across tutor names, course subjects, and specialized topics.
  - Filter by Subject (8 disciplines).
  - Filter by Session Format (Online, In-Person, Hybrid).
  - Filter by Spoken Languages (English, Spanish, Hindi, Mandarin, etc.).
  - Filter by Pricing Tier (All rates, Free Peer Volunteers only, Under $16/hr, Under $21/hr).
  - Sort by Highest Rated, Price: Low to High, Price: High to Low, Name (A-Z), and Available Slots.
- **Real-Time Matching Counter & Empty State**: Clear feedback with one-click "Reset All Filters".

### 3. 👤 Tutor Details & Slot Picker (`/tutors/:id`)
- **Comprehensive Profile**: Academic major, year, GPA, verified badges, detailed biography, and frequently covered coursework topics.
- **Interactive Calendar & Slot Picker**:
  - Future dates grouped into clean day tabs (Tomorrow, +2 Days, +3 Days).
  - Time slots with format indicators (Online Zoom vs In-Person Library).
  - **Conflict Lock**: Booked or expired slots are visually disabled and clearly marked *"Already Booked"*.
- **Live Price Calculator**: Adjust session duration (30 min, 45 min, 60 min, 90 min) with instant price recalculation.
- **Compare Toggle**: Add the tutor directly to the side-by-side comparison board.

### 4. 📝 Booking Review & Validation (`/book/review`)
- **Summary Breakdown**: Selected tutor, subject, date, time, duration, meeting format, and total calculated price.
- **Student Details Form**: Validates Full Name, College Email, and optional Learning Goals/Homework notes.
- **Double-Confirmation Modal**: Explicit confirmation prompt preventing accidental reservations.

### 5. 🎉 Booking Confirmation (`/book/confirmation/:referenceId`)
- **Celebration Animation**: Interactive confetti burst upon confirmation.
- **Unique Booking Reference**: e.g., `PTB-83921` with a one-click copy button.
- **Calendar Invite Export**: Generate and download standard `.ics` calendar files compatible with Google Calendar, Apple Calendar, and Outlook.
- Direct links to **"Manage My Bookings"** or **"Book Another Tutor"**.

### 6. 📅 My Bookings (`/bookings`)
- **Categorized Tabs**: Upcoming Sessions, Past Sessions, and All Sessions.
- **Booking Management**: View session date, time, format, tutor details, and notes.
- **Cancellation & Slot Release**: Students can cancel with an explicit modal confirmation. Cancelling **immediately frees the time slot back up** in the catalog for other students!

### 7. ⚖️ Compare Tutors Feature (`/compare`)
- **Side-by-Side Analysis**: Compare up to 2 tutors across hourly rate, student rating, session format, spoken languages, next available slot, and course subjects.
- **Difference Highlights**: Visual badges call out lower rates, higher ratings, and more open slots.
- **Floating Comparison Drawer**: Accessible from any page with quick thumbnails and a direct comparison shortcut.

### 8. ⚙️ Student Profile & Demo Preferences (`/profile`)
- Customize student display name, college email, student ID, major, academic year, and preferred language/format.
- Auto-fills future booking review forms.
- **Reset Demo Data Button**: Easily wipe changes and restore default sample tutors and demo bookings.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 (with Vite) | Fast compilation and component architecture |
| **Styling** | Tailwind CSS 3 | Clean white, soft lavender (`#faf7ff`), and deep purple accents |
| **Icons** | Lucide React | Consistent UI icons |
| **Animations** | Framer Motion | Smooth transitions, drawers, and modal interactions |
| **Routing** | React Router v6 | Seamless multi-page navigation |
| **Celebrations** | canvas-confetti | Booking confirmation visual delight |
| **State & Persistence** | React Context + `localStorage` | Centralized booking engine with persistence |

---

## 📁 Code Structure

```text
Peer Tutor/
├── public/                     # Static assets
├── scripts/
│   └── test-booking-logic.js   # Automated integration tests for booking rules
├── src/
│   ├── components/
│   │   ├── booking/
│   │   │   └── SlotPicker.jsx          # Interactive date tabs & slot selector
│   │   ├── common/
│   │   │   ├── EmptyState.jsx          # Reusable zero-result illustrations
│   │   │   ├── Modal.jsx               # Accessible confirmation dialogs
│   │   │   ├── RatingStars.jsx         # Star rating renderer
│   │   │   └── ToastContainer.jsx      # Animated toast notifications
│   │   ├── layout/
│   │   │   ├── Footer.jsx              # Project footer & disclaimer
│   │   │   └── Navbar.jsx              # Top header with dynamic badge counters
│   │   └── tutors/
│   │       ├── TutorCard.jsx           # Individual tutor catalog card
│   │       ├── TutorCompareDrawer.jsx  # Floating compare drawer (max 2)
│   │       └── TutorFilters.jsx        # Search, filters, and sort controls
│   ├── context/
│   │   └── BookingContext.jsx          # Centralized booking, compare & profile state
│   ├── data/
│   │   └── tutorsData.js               # 12 fictional tutor profiles & 8 subjects
│   ├── pages/
│   │   ├── BookingConfirmationPage.jsx # Success screen, reference code, .ics export
│   │   ├── BookingReviewPage.jsx       # Pre-booking verification & input validation
│   │   ├── CompareTutorsPage.jsx       # Side-by-side comparison matrix
│   │   ├── FindTutorsPage.jsx          # Searchable, filterable mentor directory
│   │   ├── HomePage.jsx                # Landing page with hero & popular subjects
│   │   ├── MyBookingsPage.jsx          # Upcoming/past session manager & cancel flow
│   │   ├── ProfilePage.jsx             # Demo student settings & data reset
│   │   └── TutorDetailPage.jsx         # Full tutor bio, reviews, and booking widget
│   ├── utils/
│   │   ├── dateUtils.js                # Dynamic future dates, .ics generator, time logic
│   │   └── storage.js                  # LocalStorage synchronization helpers
│   ├── App.jsx                         # Main route configuration
│   ├── index.css                       # Tailwind layers & typography styling
│   └── main.jsx                        # React root entry point
├── index.html                          # HTML shell with Google Fonts
├── package.json                        # Dependencies and npm scripts
├── tailwind.config.js                  # Custom lavender & deep purple brand palette
└── vite.config.js                      # Vite development & build setup
```

---

## 🚀 Beginner-Friendly Setup & Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or newer recommended).

### Step 1: Open Terminal in Project Folder
```bash
cd "c:\Users\Mohd Khaled Masood\Documents\Peek Tutor"
```

### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```
*(On Windows PowerShell, use `npm.cmd install` if script execution policies apply).*

### Step 3: Run the Development Server
```bash
npm run dev
```

The application will start immediately at:
👉 **`http://localhost:3000`**

Open that URL in Google Chrome, Microsoft Edge, or Firefox.

### Step 4: Run Automated Tests
To run the automated validation test suite:
```bash
node scripts/test-booking-logic.js
```
*(Runs 31 automated tests verifying subject coverage, slot collision checks, slot release on cancellation, and price calculations).*

### Step 5: Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 🧪 Tested Workflows & Verification

All of the following flows have been tested:
1. **Catalog Search & Filtering**: Tested searching by topic (e.g. *"Trees"*), filtering by subject (e.g. *"Java"*), and filtering by Free Volunteer tutors.
2. **Double-Booking Prevention**: Attempting to book a slot that is already reserved throws an immediate error and disables the slot.
3. **Session Cancellation & Slot Release**: Canceling a booking from **My Bookings** updates its status to `CANCELLED` and **immediately restores the tutor's time slot** so other students can reserve it.
4. **Side-by-Side Comparison**: Enforces a strict 2-tutor limit with clear difference callouts (lower price, higher rating, slot availability).
5. **Data Persistence**: Refreshing the browser preserves active bookings, profile edits, and slot availability via `localStorage`.

---

## 📌 Architecture Notes & Demonstration Limitations

This project is intentionally designed for a **college academic demonstration** using modern frontend patterns:
- **Client-Side Storage**: Data is persisted in `localStorage`. Opening the site in Incognito mode or a different browser will show a fresh initial demo dataset.
- **Production Roadmap**:
  - To turn this into a multi-user campus-wide production system, you would attach a backend (e.g. Node.js/Express, Python/FastAPI, or Supabase/PostgreSQL) with transactional database locking (e.g. `SELECT ... FOR UPDATE`) to prevent race conditions when two users click book at the exact same millisecond.
  - User authentication via University Single Sign-On (SSO / OAuth2 / SAML) to verify student email domains (`@campus.edu`).
  - Webhook integration with Zoom or Google Meet API to automatically generate dynamic meeting rooms upon confirmation.

