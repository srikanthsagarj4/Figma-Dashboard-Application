"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { StatCardsGrid } from "@/components/DashboardCard/StatCard";
import ActivitiesChart from "@/components/Charts/ActivitiesChart";
import TopProductsChart from "@/components/Charts/TopProductsChart";
import TodaySchedule from "@/components/Schedule/TodaySchedule";
import AddScheduleModal from "@/components/Modals/AddScheduleModal";
import ScheduleListModal from "@/components/Modals/ScheduleListModal";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import UsersList from "@/components/Users/UsersList";
import SettingsView from "@/components/Settings/SettingsView";
import { fetchDashboardData } from "@/services/apiService";
import { initialStatsData } from "@/data/statsData";
import { defaultActivitiesData } from "@/data/chartsData";
import { defaultProductsData } from "@/data/productsData";
import { initialScheduleData } from "@/data/scheduleData";
import styles from "@/styles/dashboard.module.css";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Search & Period Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [period, setPeriod] = useState("May - June 2021");

  // Dashboard Data State
  const [stats, setStats] = useState(initialStatsData);
  const [activities, setActivities] = useState(defaultActivitiesData);
  const [topProducts, setTopProducts] = useState(defaultProductsData);
  const [schedules, setSchedules] = useState(initialScheduleData);
  const [notifications, setNotifications] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSeeAllModalOpen, setIsSeeAllModalOpen] = useState(false);

  // Protected Route Check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Load Dashboard Data from API service
  const loadData = useCallback(async (currentPeriod, currentSearch) => {
    setDataLoading(true);
    try {
      const result = await fetchDashboardData(currentPeriod, currentSearch);
      if (result) {
        if (result.stats) setStats(result.stats);
        if (result.activities) setActivities(result.activities);
        if (result.topProducts) setTopProducts(result.topProducts);
        if (result.schedules) setSchedules(result.schedules);
        if (result.notifications) setNotifications(result.notifications);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      loadData(period, searchQuery);
    }
  }, [status, period, searchQuery, loadData]);

  // Schedule management handlers
  const handleAddSchedule = (newItem) => {
    setSchedules((prev) => [newItem, ...prev]);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  // If session is still verifying, show clean loader
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <div className={styles.loadingText}>Loading Board Dashboard...</div>
      </div>
    );
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard";
      case "transactions":
        return "Transactions";
      case "schedules":
        return "Schedules & Planning";
      case "users":
        return "User Management";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* Floating Responsive Black Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Header with Search, Notifications & Profile */}
        <Header
          title={getPageTitle()}
          searchValue={searchQuery}
          onSearch={setSearchQuery}
          notifications={notifications}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Tab 1: Dashboard View */}
        {activeTab === "dashboard" && (
          <>
            {/* Top Stat Cards Grid (Revenues, Transactions, Likes, Users) */}
            <StatCardsGrid stats={stats} />

            {/* Activities Line/Spline Chart with Period Selector */}
            <ActivitiesChart
              data={activities}
              period={period}
              onPeriodChange={setPeriod}
            />

            {/* Bottom Row: Top Products Pie Chart & Today's Schedule */}
            <div className={styles.bottomSectionGrid}>
              <TopProductsChart
                data={topProducts}
                period={period}
                onPeriodChange={setPeriod}
              />

              <TodaySchedule
                schedules={schedules}
                onOpenSeeAll={() => setIsSeeAllModalOpen(true)}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            </div>
          </>
        )}

        {/* Tab 2: Transactions View */}
        {activeTab === "transactions" && (
          <TransactionsTable search={searchQuery} />
        )}

        {/* Tab 3: Schedules View */}
        {activeTab === "schedules" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                  padding: "11px 22px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.35)",
                  cursor: "pointer"
                }}
              >
                + Add New Event
              </button>
            </div>
            <TodaySchedule
              schedules={schedules}
              onOpenSeeAll={() => setIsSeeAllModalOpen(true)}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 4: Users View */}
        {activeTab === "users" && (
          <UsersList search={searchQuery} />
        )}

        {/* Tab 5: Settings View */}
        {activeTab === "settings" && (
          <SettingsView />
        )}
      </main>

      {/* Modals */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSchedule}
      />

      <ScheduleListModal
        isOpen={isSeeAllModalOpen}
        onClose={() => setIsSeeAllModalOpen(false)}
        schedules={schedules}
        onDelete={handleDeleteSchedule}
        onOpenAdd={() => setIsAddModalOpen(true)}
      />
    </div>
  );
}
