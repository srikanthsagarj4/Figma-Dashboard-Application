"use client";

import { X, Trash2, Plus } from "lucide-react";
import styles from "./Modal.module.css";

export default function ScheduleListModal({
  isOpen,
  onClose,
  schedules = [],
  onDelete,
  onOpenAdd
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>All Schedules & Meetings</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className={styles.scheduleListModal}>
          {schedules.map((item) => (
            <div
              key={item.id}
              className={styles.scheduleModalItem}
              style={{ borderLeftColor: item.borderColor }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-text-main)" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  {item.time} • {item.location}
                </div>
                <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                  Tag: <span style={{ fontWeight: 600 }}>{item.category || "General"}</span>
                </div>
              </div>

              {onDelete && (
                <button
                  type="button"
                  className={styles.deleteItemBtn}
                  onClick={() => onDelete(item.id)}
                  title="Remove schedule"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => {
              onClose();
              onOpenAdd();
            }}
          >
            + Add New Event
          </button>
        </div>
      </div>
    </div>
  );
}
