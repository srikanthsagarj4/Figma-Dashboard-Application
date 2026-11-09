"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../Transactions/TransactionsTable.module.css";

export default function SettingsView() {
  const { data: session } = useSession();
  const [currency, setCurrency] = useState("USD ($)");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className={styles.tableContainer} style={{ maxWidth: "720px" }}>
      <div className={styles.tableHeader}>
        <h2 className={styles.title}>Account & Application Settings</h2>
      </div>

      {savedMessage && (
        <div style={{
          backgroundColor: "rgba(52, 211, 153, 0.15)",
          border: "1px solid rgba(52, 211, 153, 0.35)",
          color: "var(--chart-user-green)",
          padding: "10px 16px",
          borderRadius: "10px",
          marginBottom: "18px",
          fontSize: "14px",
          boxShadow: "0 0 15px rgba(52, 211, 153, 0.2)"
        }}>
          Preferences updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "var(--color-text-secondary)" }}>
            Account Name
          </label>
          <input
            type="text"
            readOnly
            value={session?.user?.name || "Demo User"}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              color: "#FFFFFF",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "var(--color-text-secondary)" }}>
            Email Address
          </label>
          <input
            type="email"
            readOnly
            value={session?.user?.email || "johndoe@gmail.com"}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              color: "#FFFFFF",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "var(--color-text-secondary)" }}>
            Base Currency Display
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              fontSize: "14px",
              outline: "none"
            }}
          >
            <option value="USD ($)">USD - US Dollar ($)</option>
            <option value="EUR (€)">EUR - Euro (€)</option>
            <option value="GBP (£)">GBP - British Pound (£)</option>
            <option value="INR (₹)">INR - Indian Rupee (₹)</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="checkbox"
            id="alerts"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            style={{ width: "18px", height: "18px", accentColor: "var(--color-neon-cyan)", cursor: "pointer" }}
          />
          <label htmlFor="alerts" style={{ fontSize: "14px", color: "var(--color-text-secondary)", cursor: "pointer" }}>
            Enable weekly email summary & glass alerts
          </label>
        </div>

        <div>
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              padding: "12px 26px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.35)",
              cursor: "pointer"
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
