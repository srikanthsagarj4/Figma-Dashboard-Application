import "@/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Board. | Glassmorphic Dashboard",
  description: "Next-generation transparent glass UI analytics dashboard with Google OAuth, interactive charts, and real-time data.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Ambient Glowing Orbs for Glassmorphism refraction */}
        <div className="ambientBackground" aria-hidden="true">
          <div className="glowOrb1" />
          <div className="glowOrb2" />
          <div className="glowOrb3" />
          <div className="glowOrb4" />
        </div>

        <AuthProvider>
          <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
