import { NextResponse } from "next/server";
import { initialStatsData } from "@/data/statsData";
import { activitiesDataByPeriod } from "@/data/chartsData";
import { topProductsDataByPeriod } from "@/data/productsData";
import { initialScheduleData } from "@/data/scheduleData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "May - June 2021";
    const search = (searchParams.get("search") || "").toLowerCase().trim();

    // Select chart data for the requested period
    const activities = activitiesDataByPeriod[period] || activitiesDataByPeriod["May - June 2021"];
    const topProducts = topProductsDataByPeriod[period] || topProductsDataByPeriod["May - June 2021"];

    // Filter schedules if a search term is provided
    let schedules = initialScheduleData;
    if (search) {
      schedules = schedules.filter(
        (s) =>
          s.title.toLowerCase().includes(search) ||
          s.location.toLowerCase().includes(search) ||
          s.category.toLowerCase().includes(search)
      );
    }

    // Dynamic stats with minor adjustment based on period
    const stats = initialStatsData.map((item) => {
      if (period === "July - August 2021") {
        if (item.id === "revenue") return { ...item, value: "$2,481,200", change: "+4.2%" };
        if (item.id === "transactions") return { ...item, value: "1,840", change: "+3.1%" };
        if (item.id === "likes") return { ...item, value: "11,240", change: "+5.6%" };
        if (item.id === "users") return { ...item, value: "1,040", change: "+2.8%" };
      }
      if (period === "September - October 2021") {
        if (item.id === "revenue") return { ...item, value: "$2,790,500", change: "+6.0%" };
        if (item.id === "transactions") return { ...item, value: "2,110", change: "+4.5%" };
        if (item.id === "likes") return { ...item, value: "12,980", change: "+7.3%" };
        if (item.id === "users") return { ...item, value: "1,250", change: "+3.9%" };
      }
      return item;
    });

    const notifications = [
      { id: 1, title: "Monthly Report Ready", time: "10 mins ago", unread: true },
      { id: 2, title: "New supplier agreement uploaded", time: "1 hour ago", unread: true },
      { id: 3, title: "Giga Factory inspection passed", time: "4 hours ago", unread: false }
    ];

    return NextResponse.json({
      success: true,
      period,
      stats,
      activities,
      topProducts,
      schedules,
      notifications,
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0.0"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
