"use client";

import { useState } from "react";
import styles from "../Transactions/TransactionsTable.module.css";

const initialUsers = [
  { id: "USR-01", name: "Liam Johnson", email: "liam@example.com", role: "Wholesale Buyer", orders: 24, status: "Active" },
  { id: "USR-02", name: "Emma Watson", email: "emma.w@example.com", role: "Retail Partner", orders: 18, status: "Active" },
  { id: "USR-03", name: "Noah Davis", email: "noah.d@example.com", role: "Distributor", orders: 42, status: "Active" },
  { id: "USR-04", name: "Sophia Miller", email: "sophia@example.com", role: "Supplier Agent", orders: 7, status: "Pending" },
  { id: "USR-05", name: "Lucas Brown", email: "lucas.b@example.com", role: "Logistics Admin", orders: 15, status: "Active" }
];

export default function UsersList({ search = "" }) {
  const filtered = initialUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2 className={styles.title}>System Users & Partners</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>User ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Total Orders</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id} className={styles.tr}>
              <td className={styles.td} style={{ fontWeight: 600 }}>{user.id}</td>
              <td className={styles.td} style={{ fontWeight: 600 }}>{user.name}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.role}</td>
              <td className={styles.td}>{user.orders}</td>
              <td className={styles.td}>
                <span className={user.status === "Active" ? styles.badgeSuccess : styles.badgePending}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
