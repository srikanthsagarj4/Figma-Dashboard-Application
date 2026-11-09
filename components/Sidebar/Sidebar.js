"use client";

import {
  PieChart,
  Tag,
  Calendar,
  UserCircle2,
  Settings,
  X
} from "lucide-react";
import styles from "./Sidebar.module.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: PieChart },
  { id: "transactions", label: "Transactions", icon: Tag },
  { id: "schedules", label: "Schedules", icon: Calendar },
  { id: "users", label: "Users", icon: UserCircle2 },
  { id: "settings", label: "Settings", icon: Settings }
];

export default function Sidebar({
  activeTab = "dashboard",
  setActiveTab,
  isMobileOpen = false,
  setIsMobileOpen
}) {
  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`${styles.backdrop} ${isMobileOpen ? styles.open : ""}`}
        onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
        aria-hidden="true"
      />

      <aside className={`${styles.sidebarWrapper} ${isMobileOpen ? styles.open : ""}`}>
        <div className={styles.topSection}>
          <div className={styles.brandHeader}>
            <div className={styles.brandLogo}>Board.</div>
            {setIsMobileOpen && (
              <button
                className={styles.closeMobileBtn}
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            )}
          </div>

          <nav aria-label="Main Navigation">
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <IconComponent className={styles.navIcon} />
                      <span>{item.label}</span>
                      {isActive && <span className={styles.activeGlowDot} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className={styles.bottomSection}>
          <button
            type="button"
            className={styles.footerLink}
            onClick={() => alert("Board Support: Need assistance? Reach out to support@board.internal or check documentation.")}
          >
            Help
          </button>
          <button
            type="button"
            className={styles.footerLink}
            onClick={() => alert("Contact Us: Reach out to muskaan@listed.fans or call +1 (800) 555-0199")}
          >
            Contact Us
          </button>
        </div>
      </aside>
    </>
  );
}
