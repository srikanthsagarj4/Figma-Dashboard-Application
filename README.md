 Project Overview 

Board. is a modern, responsive web application engineered to transform the classic Figma Front-End Developer assessment into an executive-grade analytics platform. Built strictly with Next.js 14 (App Router), JavaScript (ES6+), and Pure Custom CSS Modules (with zero external CSS frameworks like Bootstrap, Tailwind, or Material UI), the application pairs pixel-level design precision with a bespoke Transparent Glass (Glassmorphism) design system. Featuring real Google OAuth 2.0 authentication via NextAuth.js, dynamic data fetching via Axios and Next.js API route handlers, interactive Recharts visualizations, and full cross-device responsiveness, this project bridges high-fidelity UI/UX design with production-ready software engineering.

 Brief Project Explanation & Highlights 
1. 🎯 Origin & Design Execution
Figma Reference: Faithfully replicates the layout, spacing, typography, colors, and components from the official Figma dashboard and sign-in frames.
Pure Custom CSS/SCSS: Styled entirely from scratch using CSS3 custom properties, CSS Grid, and Flexbox without depending on third-party component libraries.
Visual Elevation: Upgraded with a refractive Transparent Glass UI, featuring floating specular pill navigation, ambient fluid mesh lighting, and illuminated neon accent tokens.
2. 🔐 Authentication & Session Security
Google OAuth 2.0 Integration: Authenticates users using NextAuth.js (Auth.js) and displays real Google profile names and avatars.
1-Click Demo Evaluation: Includes a pre-configured credentials provider so recruiters and evaluators can test the entire dashboard without needing manual GCP cloud keys.
Route Guards: Protected via Next.js Edge Middleware (middleware.js), preventing unauthorized access to the dashboard.
3. 📊 Interactive Visualizations & Live Filtering
Activities Spline Chart: Dual-series area chart comparing Guest and User metrics with smooth curves, illuminated SVG gradient fills, and custom tooltips.
Top Products Donut Chart: High-contrast distribution chart reflecting sales percentages (Basic Tees 55%, Custom Short Pants 31%, Super Hoodies 14%).
Dynamic Period Filters: Interactive period selector dropdowns (May - June 2021, July - August 2021, September - October 2021) that update charts and statistics in real time.
4. 🌐 API Service Architecture & Interactivity
Next.js API Handler (/api/dashboard): REST endpoint serving key performance statistics, activities datasets, top products, and scheduled events.
Axios Service Layer: Modular API service with timeout protection, loading spinners, and automatic fallbacks.
Working Elements: Real-time keyword search filter, notification dropdown, interactive schedule creator modal, and responsive mobile drawer menu.
