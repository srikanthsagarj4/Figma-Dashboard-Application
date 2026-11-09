"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";
import styles from "./Charts.module.css";

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className={styles.customTooltip}>
        <div style={{ fontWeight: 700, color: item.payload.color }}>
          {item.name}
        </div>
        <div style={{ marginTop: 2, color: "var(--color-text-secondary)" }}>
          {item.value}% of total distribution
        </div>
      </div>
    );
  }
  return null;
};

export default function TopProductsChart({
  data = [],
  period = "May - June 2021",
  onPeriodChange
}) {
  return (
    <section className={styles.productsCard} aria-label="Top Products Distribution">
      <div className={styles.chartHeader} style={{ marginBottom: 10 }}>
        <div className={styles.headerLeft}>
          <h2 className={styles.chartTitle}>Top products</h2>
        </div>

        <div className={styles.periodDropdown}>
          <select
            className={styles.periodSelect}
            value={period}
            onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
            aria-label="Filter Top Products by Period"
          >
            <option value="May - June 2021">May - June 2021</option>
            <option value="July - August 2021">July - August 2021</option>
            <option value="September - October 2021">September - October 2021</option>
          </select>
          <ChevronDown size={14} color="#94A3B8" />
        </div>
      </div>

      <div className={styles.productsBody}>
        <div className={styles.pieWrapper}>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={4}
                stroke="rgba(15, 23, 42, 0.8)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.productsLegendList}>
          {data.map((product) => (
            <div key={product.name} className={styles.productLegendItem}>
              <span
                className={styles.productDot}
                style={{
                  backgroundColor: product.color,
                  boxShadow: `0 0 8px ${product.color}`
                }}
              />
              <div className={styles.productInfo}>
                <span className={styles.productName}>{product.name}</span>
                <span className={styles.productPercent}>{product.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
