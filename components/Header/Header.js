"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Search, Bell, LogOut, Menu, User, CheckCircle2 } from "lucide-react";
import styles from "./Header.module.css";

export default function Header({
  title = "Dashboard",
  onSearch,
  searchValue = "",
  notifications = [],
  setIsMobileOpen
}) {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfileMenu(false);
    if (unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
    setShowNotifications(false);
  };

  const userDisplayName = session?.user?.name || "Guest Admin";
  const userDisplayEmail = session?.user?.email || "johndoe@gmail.com";
  const userImage = session?.user?.image;
  const isGoogleAuth = session?.user?.provider === "google";

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftArea}>
        {setIsMobileOpen && (
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        )}
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>

      <div className={styles.rightArea}>
        {/* Search input with magnifying glass */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            aria-label="Search dashboard"
          />
          <Search className={styles.searchIcon} />
        </div>

        {/* Notifications Icon & Popover */}
        <div className={styles.notificationWrapper} ref={notifRef}>
          <button
            type="button"
            className={styles.bellButton}
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className={styles.badge} />}
          </button>

          {showNotifications && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownTitle}>
                <span>Notifications</span>
                <span style={{ fontSize: "11px", color: "var(--color-link)", cursor: "pointer" }}>
                  Mark all as read
                </span>
              </div>
              <div className={styles.notificationList}>
                {notifications && notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className={styles.notificationItem}>
                      <div className={styles.notifHeader}>
                        <span>{notif.title}</span>
                      </div>
                      <div className={styles.notifTime}>{notif.time}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "8px", color: "var(--color-text-muted)", fontSize: "12px" }}>
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className={styles.profileWrapper} ref={profileRef}>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={handleProfileClick}
            aria-label="User Profile"
          >
            {userImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={userImage}
                alt={userDisplayName}
                className={styles.avatarImage}
              />
            ) : (
              <span className={styles.avatarPlaceholder}>
                {userDisplayName.charAt(0).toUpperCase()}
              </span>
            )}
          </button>

          {showProfileMenu && (
            <div className={`${styles.dropdownMenu} ${styles.profileMenu}`}>
              <div className={styles.profileUserInfo}>
                <div className={styles.userName}>{userDisplayName}</div>
                <div className={styles.userEmail}>{userDisplayEmail}</div>
                <div className={styles.authBadge}>
                  {isGoogleAuth ? "✓ Google Authenticated" : "✓ Active Session"}
                </div>
              </div>

              <button
                type="button"
                className={styles.logoutButton}
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
