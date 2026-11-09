# Board. — Professional Light Pastel Analytics Dashboard

A modern, executive Dashboard Web Application built with **Next.js 14 (App Router)**, **JavaScript (ES6+)**, **Custom CSS & CSS Modules** with a **Professional Light Pastel UI**, **NextAuth.js** with Google OAuth & Demo authentication, **Recharts**, and **Axios**.

Based directly on the Figma design specifications: [Figma Design Reference](https://www.figma.com/file/gKLhBDaTmdNDzHjsvqFMmC/Front-EndDeveloper-Task?node-id=0-1&t=rJ4A60cFvrDoc5TE-0).

---

## 🎨 Professional Light Pastel Design System

The application features an executive, high-contrast, clean light pastel aesthetic:

1. **Light Pastel Stat Cards**:
   - **Total Revenues**: `$2,129,430` — Pastel Mint Green (`#DDEFE0`) with dark forest green value accent (`#166534`).
   - **Total Transactions**: `1,520` — Pastel Warm Cream (`#F4ECDD`) with deep amber value accent (`#9A3412`).
   - **Total Likes**: `9,721` — Pastel Rose/Pink (`#EFDADA`) with rich berry value accent (`#9F1239`).
   - **Total Users**: `892` — Pastel Lavender/Periwinkle (`#DEE0EF`) with deep indigo value accent (`#3730A3`).
   - Clean icons, subtle borders, soft shadows (`0 4px 20px rgba(0, 0, 0, 0.04)`), and hover elevation.

2. **Executive Contrast & Typography**:
   - Deep solid black floating pill sidebar (`#000000`) with generous `border-radius: 30px`, crisp white navigation items, and active indicator.
   - Serene off-white / porcelain canvas (`#F8FAFC`) with subtle ambient pastel gradient glows.
   - Ultra-crisp typography using **Montserrat** for headings and **Plus Jakarta Sans / Lato** for body.

3. **Pastel Charts (Recharts)**:
   - **Activities Overview**: Smooth spline curves for **Guest** (Pastel Coral/Rose `#E9A0A0`) and **User** (Pastel Mint Green `#9BDD7C`) with delicate translucent area fills and clean horizontal grid lines.
   - **Top Products Donut**: High-clarity donut chart with Figma percentages:
     - Basic Tees: `55%` (`#98D89E`)
     - Custom Short Pants: `31%` (`#F6DC7D`)
     - Super Hoodies: `14%` (`#EE8484`)
   - Interactive date filter dropdowns that dynamically update both charts.

4. **Today's Schedule**:
   - Clean white cards with thick pastel vertical border accents:
     - Meeting with suppliers: Pastel Green (`#9BDD7C`)
     - Giga Factory inspection: Pastel Indigo (`#6972C3`)
   - Interactive `+ Add Event` modal and `See All` viewer.

5. **Split-Screen Sign In**:
   - Left hero brand column in solid black (`#000000`) with bold white `"Board."`.
   - Right section on clean serene pastel canvas (`#F8FAFC`) with white card, Google OAuth button, and credentials form.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | JavaScript (ES6+) |
| **Theme / UI** | Custom CSS3 / CSS Modules (Strictly no CSS frameworks) |
| **Authentication** | NextAuth.js v4 (Google OAuth + Demo Credentials) |
| **Charts** | Recharts v2 |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |

---

## ⚙️ Installation & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Provided in `.env.example` and `.env.local`:
```env
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=board_secret_development_token_394827591823759
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
npm run build
npm start
```

### 5. Evaluation & Testing
- Open `/login`.
- Click **"Sign In"** for immediate 1-click evaluation with the pre-filled demo account (`johndoe@gmail.com`).
- Or click **"Sign in with Google"** for Google OAuth authentication.
- Test date range filters, keyword search, sidebar tab navigation, schedule creation, and logout.
