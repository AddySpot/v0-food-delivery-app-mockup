"use client"
import { Menu, X, MapPin, BarChart3, Calendar } from "lucide-react"

interface SidebarMenuProps {
  activeTab: "map" | "earnings" | "planner"
  setActiveTab: (tab: "map" | "earnings" | "planner") => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function SidebarMenu({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarMenuProps) {
  const menuItems = [
    { id: "map", icon: MapPin, label: "Map" },
    { id: "earnings", icon: BarChart3, label: "Earnings" },
    { id: "planner", icon: Calendar, label: "Planner" },
  ] as const

  const handleMenuClick = (tab: "map" | "earnings" | "planner") => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="bg-[#6729AB] text-[#D6FC48] p-3 rounded-lg hover:bg-[#7d3fc1] transition-colors"
      >
        {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`fixed left-0 top-14 bottom-0 z-40 bg-[#1E1E1E] border-r border-[#2A2A2A] w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pb-6 px-4 space-y-2 pt-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg font-bold text-lg transition-all ${
                  isActive ? "bg-[#6729AB] text-[#D6FC48]" : "text-[#8B8B8B] hover:bg-[#2A2A2A] hover:text-[#D6FC48]"
                }`}
              >
                <Icon size={32} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 top-14" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
