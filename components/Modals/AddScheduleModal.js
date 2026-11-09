"use client";

import { useState } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

export default function AddScheduleModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("14.00-15.00");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Meeting");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const colors = {
      Meeting: "#34D399",
      Inspection: "#818CF8",
      Finance: "#FBBF24",
      Marketing: "#FB7185"
    };

    onAdd({
      id: "sched-" + Date.now(),
      title,
      time,
      location: location ? `at ${location}` : "Online",
      borderColor: colors[category] || "#34D399",
      category,
      date: "Today"
    });

    setTitle("");
    setLocation("");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Add New Schedule</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Event Title</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Supplier sync with Logistics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Time Slot</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. 15.00-16.30"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Sunset Road, Kuta, Bali"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Meeting">Meeting (Green Accent)</option>
              <option value="Inspection">Inspection (Purple Accent)</option>
              <option value="Finance">Finance (Yellow Accent)</option>
              <option value="Marketing">Marketing (Coral Accent)</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
