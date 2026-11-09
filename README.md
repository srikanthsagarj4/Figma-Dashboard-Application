# Board. — Unique Transparent Glass UI Analytics Dashboard

A futuristic, responsive Dashboard Web Application built with **Next.js 14 (App Router)**, **JavaScript (ES6+)**, **Custom CSS & CSS Modules** featuring a **Transparent Glass UI (Glassmorphic) Design System**, **NextAuth.js** with Google OAuth & Demo authentication, **Recharts**, and **Axios**.

---

## 💎 Transparent Glass UI & Unique Interface Architecture

The application has been transformed into a transparent frosted glass experience:

1. **Atmospheric Aurora Mesh & Background Refraction**:
   - Multi-layer fluid ambient light blobs (`blur(80px)` - `blur(90px)`) floating in indigo, cyan, emerald, and rose that refract dynamically through all translucent glass surfaces.
   - Deep twilight canvas (`#070B14`) creating high specular contrast and visual depth.

2. **Ultra-Refractive Glass Panels**:
   - Frosted crystal glass surfaces (`backdrop-filter: blur(24px) saturate(190%)`).
   - Specular rim highlights with top gradient bounce (`linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)`).
   - Inner bevel reflections (`inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.2)`).

3. **Unique Chromatic Glass Stat Cards**:
   - **Total Revenues**: Emerald neon glass (`rgba(16, 185, 129, 0.18)`) with green ambient glow.
   - **Total Transactions**: Amber neon glass (`rgba(245, 158, 11, 0.18)`) with gold ambient glow.
   - **Total Likes**: Rose neon glass (`rgba(244, 63, 94, 0.18)`) with coral ambient glow.
   - **Total Users**: Electric Indigo neon glass (`rgba(99, 102, 241, 0.18)`) with purple ambient glow.
   - Floating frosted icon capsules with specular glass rims.

4. **Luminous Neon Recharts**:
   - **Activities**: Smoothed spline area curves with translucent illuminated gradient fills (`#34D399` for Users and `#FB7185` for Guests) and glowing active dots.
   - **Top Products**: Glass donut chart with center cutout (`innerRadius={46}`) and illuminated percentage chips.
   - **Glass Tooltips**: Floating frosted glass cards with glowing indicator dots and backdrop blur.

5. **Floating Glass Capsule Navigation**:
   - **Floating Pill Sidebar**: Frosted glass panel with `border: 1px solid rgba(255, 255, 255, 0.22)`, glowing active pill with cyan neon indicator (`box-shadow: 0 0 10px #38BDF8`).
   - **Capsule Search**: Translucent glass search bar that expands with a cyan glow on focus.
   - **Glass Modals**: Frosted backdrop blur with floating glass dialogs for adding schedules and reviewing meetings.

6. **Glass Portal Sign-In Screen**:
   - Translucent split-screen portal with glowing metallic typography.
   - Frosted glass card with glowing input fields and glass-sheen OAuth buttons for Google and Apple.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | JavaScript (ES6+) |
| **Theme / UI** | Custom CSS3 / CSS Modules / Glassmorphism (No frameworks) |
| **Authentication** | NextAuth.js v4 (Google OAuth + Demo Credentials) |
| **Charts** | Recharts v2 (Custom Glowing Gradients) |
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

### 5. Instant Evaluation
- Open `/login`.
- Click **"Sign In"** for immediate 1-click evaluation with the pre-filled demo account (`johndoe@gmail.com`).
- Or click **"Sign in with Google"** for Google OAuth authentication.
