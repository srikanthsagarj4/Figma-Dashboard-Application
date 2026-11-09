"use client";

import { ChevronRight, Plus } from "lucide-react";
import styles from "./Schedule.module.css";

export default function TodaySchedule({
  schedules = [],
  onOpenSeeAll,
  onOpenAddModal
}) {
  // Show first 2 items matching Figma's exact 2-item height
  const displayItems = schedules.slice(0, 2);

  return (
    <section className={styles.scheduleCard} aria-label="Today's Schedule">
      <div>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Today&apos;s schedule</h2>
          <button
            type="button"
            className={styles.seeAllLink}
            onClick={onOpenSeeAll}
            aria-label="See all scheduled events"
          >
            <span>See All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className={styles.itemsList}>
          {displayItems.length > 0 ? (
            displayItems.map((item) => (
              <div
                key={item.id}
                className={styles.scheduleItem}
                style={{ borderLeftColor: item.borderColor }}
              >
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemTime}>{item.time}</div>
                <div className={styles.itemLocation}>{item.location}</div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>No scheduled events matching search</div>
          )}
        </div>
      </div>

      <button
        type="button"
        className={styles.addScheduleBtn}
        onClick={onOpenAddModal}
      >
        <Plus size={14} />
        <span>Add Event</span>
      </button>
    </section>
  );
}
