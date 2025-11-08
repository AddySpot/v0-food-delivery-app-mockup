"use client"

import { MapPin, BarChart3, Calendar } from "lucide-react"

interface NavigationProps {
  activeTab: "map" | "earnings" | "planner"
  setActiveTab: (tab: "map" | "earnings" | "planner") => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: "map", icon: MapPin, label: "Map" },
    { id: "earnings", icon: BarChart3, label: "Earnings" },
    { id: "planner", icon: Calendar, label: "Planner" },
  ] as const

  return (
    <nav className="bg-[#1E1E1E] border-t border-[#2A2A2A] px-2 py-3 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 transform ${
              isActive
                ? "text-[#D6FC48] bg-[#6729AB] bg-opacity-20 scale-105"
                : "text-[#8B8B8B] hover:text-[#D6FC48] hover:bg-[#2A2A2A] hover:bg-opacity-50"
            }`}
          >
            <Icon size={24} className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
