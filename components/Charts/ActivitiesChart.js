"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { ChevronDown } from "lucide-react";
import styles from "./Charts.module.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <div className={styles.tooltipLabel}>{label}</div>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className={styles.tooltipRow}>
            <span
              className={styles.legendDot}
              style={{
                backgroundColor: entry.color,
                boxShadow: `0 0 8px ${entry.color}`
              }}
            />
            <span>
              <strong>{entry.name}:</strong> {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivitiesChart({
  data = [],
  period = "May - June 2021",
  onPeriodChange
}) {
  return (
    <section className={styles.chartCard} aria-label="Activities Overview Chart">
      <div className={styles.chartHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.chartTitle}>Activities</h2>
          <div className={styles.periodDropdown}>
            <select
              className={styles.periodSelect}
              value={period}
              onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
              aria-label="Filter Activities by Period"
            >
              <option value="May - June 2021">May - June 2021</option>
              <option value="July - August 2021">July - August 2021</option>
              <option value="September - October 2021">September - October 2021</option>
            </select>
            <ChevronDown size={14} color="#94A3B8" />
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{
                backgroundColor: "#FB7185",
                boxShadow: "0 0 8px rgba(251, 113, 133, 0.7)"
              }}
            />
            <span>Guest</span>
          </div>
          <div className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{
                backgroundColor: "#34D399",
                boxShadow: "0 0 8px rgba(52, 211, 153, 0.7)"
              }}
            />
            <span>User</span>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#34D399" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="guestGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7185" stopOpacity={0.32} />
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255, 255, 255, 0.06)"
            />
            <XAxis
              dataKey="week"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              ticks={[0, 100, 200, 300, 400, 500]}
              domain={[0, 500]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="guest"
              name="Guest"
              stroke="#FB7185"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#guestGradient)"
              activeDot={{ r: 6, fill: "#FB7185", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="user"
              name="User"
              stroke="#34D399"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#userGradient)"
              activeDot={{ r: 6, fill: "#34D399", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
