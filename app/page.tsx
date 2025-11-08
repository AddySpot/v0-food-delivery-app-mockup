"use client"

import { useState } from "react"
import DemandMap from "@/components/demand-map"
import EarningsLytics from "@/components/earnings-dashboard"
import WorkPlanner from "@/components/work-planner"
import SidebarMenu from "@/components/sidebar-menu"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"map" | "earnings" | "planner">("map")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-[#121212] flex flex-col overflow-hidden">
      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#121212] px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <SidebarMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      <div className="flex-1 overflow-hidden pt-16">
        <div
          className={`h-full transition-opacity duration-300 ease-in-out ${
            activeTab === "map" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <DemandMap />
        </div>
        <div
          className={`h-full transition-opacity duration-300 ease-in-out absolute inset-0 pt-16 ${
            activeTab === "earnings" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <EarningsLytics />
        </div>
        <div
          className={`h-full transition-opacity duration-300 ease-in-out absolute inset-0 pt-16 ${
            activeTab === "planner" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <WorkPlanner />
        </div>
      </div>
    </div>
  )
}
