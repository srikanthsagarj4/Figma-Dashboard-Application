"use client";

import { useState } from "react";
import styles from "./TransactionsTable.module.css";

const initialTransactions = [
  { id: "TXN-9021", description: "Basic Tees Bulk Order #892", customer: "Liam Johnson", date: "May 24, 2021", amount: "$3,420.00", status: "Completed" },
  { id: "TXN-9022", description: "Custom Short Pants Wholesale", customer: "Emma Watson", date: "May 23, 2021", amount: "$1,850.00", status: "Completed" },
  { id: "TXN-9023", description: "Super Hoodies Winter Collection", customer: "Noah Davis", date: "May 22, 2021", amount: "$890.00", status: "Pending" },
  { id: "TXN-9024", description: "Raw Cotton Shipment (Bali)", customer: "PT Textiles Indo", date: "May 20, 2021", amount: "$12,400.00", status: "Completed" },
  { id: "TXN-9025", description: "Factory Equipment Maintenance", customer: "Giga Maintenance Corp", date: "May 18, 2021", amount: "$4,250.00", status: "Completed" },
  { id: "TXN-9026", description: "Logistics Freight Expedite", customer: "Global Cargo Ltd", date: "May 15, 2021", amount: "$640.00", status: "Failed" }
];

export default function TransactionsTable({ search = "" }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = initialTransactions.filter((txn) => {
    const matchesSearch =
      txn.description.toLowerCase().includes(search.toLowerCase()) ||
      txn.customer.toLowerCase().includes(search.toLowerCase()) ||
      txn.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2 className={styles.title}>All Transactions</h2>
        <div className={styles.filterControls}>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Customer / Entity</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Amount</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((txn) => (
              <tr key={txn.id} className={styles.tr}>
                <td className={styles.td} style={{ fontWeight: 600 }}>{txn.id}</td>
                <td className={styles.td}>{txn.description}</td>
                <td className={styles.td}>{txn.customer}</td>
                <td className={styles.td}>{txn.date}</td>
                <td className={styles.td} style={{ fontWeight: 700 }}>{txn.amount}</td>
                <td className={styles.td}>
                  <span
                    className={
                      txn.status === "Completed"
                        ? styles.badgeSuccess
                        : txn.status === "Pending"
                        ? styles.badgePending
                        : styles.badgeFailed
                    }
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "var(--color-text-muted)" }}>
                No transactions match the selected criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
