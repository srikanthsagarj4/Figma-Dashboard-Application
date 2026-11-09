"use client";

import { Tag, ThumbsUp, Users } from "lucide-react";
import styles from "./StatCard.module.css";

// Revenue Icon matching Figma's cash/tag shape
function RevenueIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

export default function StatCard({ item }) {
  const getIcon = () => {
    switch (item.icon) {
      case "revenue":
        return <RevenueIcon color={item.accentColor} />;
      case "transactions":
        return <Tag size={19} color={item.accentColor} />;
      case "likes":
        return <ThumbsUp size={19} color={item.accentColor} />;
      case "users":
        return <Users size={19} color={item.accentColor} />;
      default:
        return <Tag size={19} color={item.accentColor} />;
    }
  };

  const getVariantClass = () => {
    switch (item.glassType || item.id) {
      case "revenue":
        return styles.cardRevenue;
      case "transactions":
        return styles.cardTransactions;
      case "likes":
        return styles.cardLikes;
      case "users":
        return styles.cardUsers;
      default:
        return styles.cardRevenue;
    }
  };

  return (
    <div className={`${styles.card} ${getVariantClass()}`}>
      <div className={styles.topRow}>
        <span className={styles.cardLabel}>{item.title}</span>
        <div className={styles.iconContainer}>{getIcon()}</div>
      </div>

      <div className={styles.bottomRow}>
        <span className={styles.cardValue}>{item.value}</span>
        {item.change && (
          <span className={styles.badge} title="Growth compared to last cycle">
            {item.change}
          </span>
        )}
      </div>
    </div>
  );
}

export function StatCardsGrid({ stats = [] }) {
  return (
    <section className={styles.cardsGrid} aria-label="Key Performance Statistics">
      {stats.map((stat) => (
        <StatCard key={stat.id} item={stat} />
      ))}
    </section>
  );
}
