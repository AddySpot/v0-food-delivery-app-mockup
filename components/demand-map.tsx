"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, TrendingUp, AlertCircle, RefreshCw, Filter, Users } from "lucide-react"

interface Hotspot {
  id: string
  name: string
  lat: number
  lng: number
  demand: "high" | "medium" | "low"
  weather: "clear" | "rain" | "cloudy"
  restaurants: number
  orderChance: number
  incomeChance: number
  riders: number
  distance: string
  timeUpdated: string
  recentTrend: "up" | "down" | "stable"
}

const generateHotspots = (): Hotspot[] => [
  {
    id: "1",
    name: "Kreuzberg",
    lat: 52.49,
    lng: 13.4,
    demand: Math.random() > 0.3 ? "high" : "medium",
    weather: Math.random() > 0.5 ? "rain" : "cloudy",
    restaurants: 45,
    orderChance: Math.floor(Math.random() * 20) + 85,
    incomeChance: Math.floor(Math.random() * 20) + 85,
    riders: Math.floor(Math.random() * 8) + 8,
    distance: "0.8 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
  },
  {
    id: "2",
    name: "Charlottenburg",
    lat: 52.52,
    lng: 13.29,
    demand: "medium",
    weather: Math.random() > 0.6 ? "rain" : "cloudy",
    restaurants: 28,
    orderChance: Math.floor(Math.random() * 20) + 65,
    incomeChance: Math.floor(Math.random() * 20) + 60,
    riders: Math.floor(Math.random() * 6) + 4,
    distance: "3.2 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
  },
  {
    id: "3",
    name: "Prenzlauer Berg",
    lat: 52.545,
    lng: 13.41,
    demand: "high",
    weather: "clear",
    restaurants: 52,
    orderChance: Math.floor(Math.random() * 15) + 80,
    incomeChance: Math.floor(Math.random() * 15) + 78,
    riders: Math.floor(Math.random() * 10) + 3,
    distance: "2.1 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: "up",
  },
  {
    id: "4",
    name: "Wedding",
    lat: 52.54,
    lng: 13.35,
    demand: "medium",
    weather: "clear",
    restaurants: 22,
    orderChance: Math.floor(Math.random() * 20) + 60,
    incomeChance: Math.floor(Math.random() * 20) + 55,
    riders: Math.floor(Math.random() * 4) + 2,
    distance: "1.5 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: "stable",
  },
  {
    id: "5",
    name: "Friedrichshain",
    lat: 52.515,
    lng: 13.45,
    demand: "high",
    weather: "rain",
    restaurants: 38,
    orderChance: Math.floor(Math.random() * 18) + 82,
    incomeChance: Math.floor(Math.random() * 18) + 80,
    riders: Math.floor(Math.random() * 9) + 5,
    distance: "2.8 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: "up",
  },
  {
    id: "6",
    name: "Neuköln",
    lat: 52.46,
    lng: 13.42,
    demand: "medium",
    weather: "cloudy",
    restaurants: 31,
    orderChance: Math.floor(Math.random() * 18) + 68,
    incomeChance: Math.floor(Math.random() * 18) + 65,
    riders: Math.floor(Math.random() * 5) + 3,
    distance: "3.5 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: "stable",
  },
  {
    id: "7",
    name: "Tempelhof",
    lat: 52.475,
    lng: 13.38,
    demand: "low",
    weather: "clear",
    restaurants: 15,
    orderChance: Math.floor(Math.random() * 25) + 40,
    incomeChance: Math.floor(Math.random() * 25) + 35,
    riders: Math.floor(Math.random() * 3) + 1,
    distance: "4.2 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: "down",
  },
  {
    id: "8",
    name: "Spandau",
    lat: 52.54,
    lng: 13.22,
    demand: "medium",
    weather: "rain",
    restaurants: 19,
    orderChance: Math.floor(Math.random() * 18) + 62,
    incomeChance: Math.floor(Math.random() * 18) + 58,
    riders: Math.floor(Math.random() * 4) + 2,
    distance: "5.1 km",
    timeUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    recentTrend: "up",
  },
]

const RESTAURANTS = {
  high: [
    { name: "Curry 36", x: 25, y: 35 },
    { name: "Café Fleury", x: 28, y: 32 },
    { name: "Thai Palace", x: 22, y: 38 },
    { name: "Pizza Napoli", x: 30, y: 35 },
    { name: "Sushi King", x: 25, y: 40 },
    { name: "Kebab House", x: 35, y: 28 },
    { name: "Burger Bar", x: 32, y: 35 },
    { name: "Ramen Ya", x: 27, y: 30 },
  ],
  medium: [
    { name: "Falafel Hub", x: 65, y: 45 },
    { name: "Pasta Place", x: 62, y: 50 },
    { name: "Taco Fiesta", x: 68, y: 48 },
    { name: "Döner King", x: 60, y: 42 },
    { name: "Grill House", x: 70, y: 52 },
  ],
  low: [
    { name: "Diner", x: 75, y: 70 },
    { name: "Pizzeria", x: 80, y: 75 },
    { name: "Café", x: 78, y: 72 },
  ],
}

const WEATHER_OVERLAYS = {
  1: { x: 25, y: 35, size: 20, type: "rain" },
  2: { x: 65, y: 45, size: 18, type: "rain" },
  5: { x: 72, y: 25, size: 22, type: "rain" },
  8: { x: 15, y: 55, size: 20, type: "rain" },
}

const Building = ({
  x,
  y,
  width,
  height,
  opacity,
}: { x: number; y: number; width: number; height: number; opacity: number }) => (
  <div
    className="absolute bg-[#2A2A2A] border border-[#3A3A3A]"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${width}%`,
      height: `${height}%`,
      opacity: opacity,
    }}
  />
)

export default function DemandMap() {
  const [hotspots, setHotspots] = useState<Hotspot[]>(generateHotspots())
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [demandFilter, setDemandFilter] = useState<"all" | "high" | "medium" | "low">("high")
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      const updated = generateHotspots()
      setHotspots(updated)
      if (selectedHotspot) {
        const updatedSelected = updated.find((h) => h.id === selectedHotspot.id)
        if (updatedSelected) setSelectedHotspot(updatedSelected)
      }
    }, 15000) // Refresh every 15 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, selectedHotspot])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))
    const updated = generateHotspots()
    setHotspots(updated)
    if (selectedHotspot) {
      const updatedSelected = updated.find((h) => h.id === selectedHotspot.id)
      if (updatedSelected) setSelectedHotspot(updatedSelected)
    }
    setIsRefreshing(false)
  }

  const filteredHotspots = demandFilter === "all" ? hotspots : hotspots.filter((h) => h.demand === demandFilter)

  const bestOpportunity = filteredHotspots.reduce((best, current) => {
    const currentScore = current.orderChance - current.riders * 5
    const bestScore = best.orderChance - best.riders * 5
    return currentScore > bestScore ? current : best
  })

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high":
        return "bg-[#FF6B6B]"
      case "medium":
        return "bg-[#FFD700]"
      case "low":
        return "bg-[#8B8B8B]"
      default:
        return "bg-gray-500"
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↑"
    if (trend === "down") return "↓"
    return "→"
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "rain":
        return <CloudRain size={16} className="text-blue-400" />
      case "cloudy":
        return <Cloud size={16} className="text-gray-400" />
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#121212] text-white overflow-hidden">
      {/* Header with controls */}
      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#121212] px-6 py-4 border-b border-[#2A2A2A] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Demand Map</h1>
            <p className="text-[#8B8B8B] text-sm mt-1">Real-time opportunities in Berlin</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-lg transition-all ${
              isRefreshing ? "bg-[#2A2A2A] opacity-50" : "bg-[#6729AB] hover:bg-[#7D3FC1]"
            }`}
          >
            <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-sm"
          >
            <Filter size={16} />
            Filter
          </button>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              autoRefresh ? "bg-[#6729AB] text-[#D6FC48]" : "bg-[#1E1E1E] text-[#8B8B8B] border border-[#2A2A2A]"
            }`}
          >
            {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
          </button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="flex gap-2 pt-2">
            {(["all", "high", "medium", "low"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setDemandFilter(filter)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  demandFilter === filter ? "bg-[#D6FC48] text-black" : "bg-[#1E1E1E] text-[#8B8B8B] hover:bg-[#2A2A2A]"
                }`}
              >
                {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map visualization */}
      <div className="flex-1 relative overflow-hidden bg-[#1A1A1A] border-b border-[#2A2A2A]">
        {/* Streets */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#4A4A4A" strokeWidth="2" />
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#4A4A4A" strokeWidth="2" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#4A4A4A" strokeWidth="2" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#4A4A4A" strokeWidth="1.5" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#4A4A4A" strokeWidth="2" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#4A4A4A" strokeWidth="2" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#4A4A4A" strokeWidth="2" />
        </svg>

        <div className="absolute inset-0">
          <Building x={5} y={10} width={12} height={15} opacity={0.6} />
          <Building x={20} y={8} width={15} height={18} opacity={0.7} />
          <Building x={38} y={12} width={10} height={14} opacity={0.5} />
          <Building x={52} y={10} width={14} height={16} opacity={0.6} />
          <Building x={68} y={15} width={12} height={13} opacity={0.5} />
          <Building x={83} y={12} width={13} height={17} opacity={0.6} />
          <Building x={8} y={28} width={11} height={12} opacity={0.5} />
          <Building x={25} y={30} width={13} height={14} opacity={0.7} />
          <Building x={45} y={28} width={15} height={15} opacity={0.6} />
          <Building x={65} y={32} width={10} height={12} opacity={0.5} />
          <Building x={78} y={30} width={14} height={13} opacity={0.6} />
          <Building x={10} y={50} width={12} height={13} opacity={0.5} />
          <Building x={30} y={48} width={14} height={16} opacity={0.6} />
          <Building x={55} y={52} width={11} height={12} opacity={0.5} />
          <Building x={72} y={50} width={13} height={14} opacity={0.6} />
        </div>

        {hotspots.some((h) => h.weather === "rain") && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" style={{ opacity: 0.15 }}>
              <defs>
                <pattern id="rainPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="20" y2="20" stroke="#4DA6FF" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#rainPattern)" />
            </svg>
          </div>
        )}

        {/* Hotspot indicators with demand areas */}
        <div className="absolute inset-0">
          {filteredHotspots.map((hotspot) => {
            const positions: { [key: string]: { x: number; y: number } } = {
              "1": { x: 25, y: 35 },
              "2": { x: 65, y: 45 },
              "3": { x: 72, y: 25 },
              "4": { x: 42, y: 50 },
              "5": { x: 78, y: 32 },
              "6": { x: 32, y: 58 },
              "7": { x: 48, y: 62 },
              "8": { x: 15, y: 55 },
            }

            const pos = positions[hotspot.id] || { x: 50, y: 50 }

            return (
              <div key={hotspot.id}>
                <div
                  className="absolute cursor-pointer transition-all transform hover:scale-110"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <div
                    className={`absolute w-48 h-48 rounded-full ${getDemandColor(hotspot.demand)} opacity-20 animate-pulse`}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-[#D6FC48] cursor-pointer">
                    <span className="text-lg font-bold text-black">{hotspot.orderChance}%</span>
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-base font-bold text-[#D6FC48] whitespace-nowrap">
                    {hotspot.name}
                  </div>
                </div>

                {hotspot.weather === "rain" && WEATHER_OVERLAYS[hotspot.id] && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="absolute w-56 h-56 rounded-full border-2 border-blue-400 opacity-40 animate-pulse" />
                    <div
                      className="absolute w-40 h-40 rounded-full border border-blue-500 opacity-30 animate-pulse animation-delay-100"
                      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                )}

                {[...Array(Math.min(hotspot.riders, 3))].map((_, idx) => (
                  <div
                    key={`rider-${hotspot.id}-${idx}`}
                    className="absolute"
                    style={{
                      left: `${pos.x + idx * 2}%`,
                      top: `${pos.y + idx * 2}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-5 h-5 bg-[#FF8C42] rounded-full flex items-center justify-center text-xs text-white opacity-60">
                      <Users size={12} />
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-3 space-y-2">
          <div className="text-xs font-semibold text-[#D6FC48]">Legend</div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
            <span>High demand</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
            <span>Medium demand</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span>Rain area</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#FF8C42]" />
            <span>Riders active</span>
          </div>
        </div>
      </div>

      {/* Best opportunity recommendation banner */}
      {bestOpportunity && (
        <div className="bg-gradient-to-r from-[#6729AB] to-[#8B4DBF] px-6 py-3 border-b border-[#D6FC48] flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-[#D6FC48] font-semibold">BEST OPPORTUNITY</div>
            <div className="text-lg font-bold text-[#D6FC48] mt-1">
              {bestOpportunity.name} - {bestOpportunity.orderChance}% orders, {bestOpportunity.riders} riders
            </div>
          </div>
          <button
            onClick={() => setSelectedHotspot(bestOpportunity)}
            className="ml-4 bg-[#D6FC48] text-black px-4 py-2 rounded-lg font-bold whitespace-nowrap hover:bg-[#C5EB37] transition-colors"
          >
            Go Now
          </button>
        </div>
      )}

      {/* Selected hotspot details */}
      {selectedHotspot && (
        <div className="bg-[#1E1E1E] border-t border-[#2A2A2A] px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold">{selectedHotspot.name}</h3>
              <p className="text-[#8B8B8B] text-sm">
                {selectedHotspot.distance} away • {selectedHotspot.restaurants} restaurants
              </p>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-[#8B8B8B] hover:text-[#D6FC48] transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          {/* Opportunity cards with live data */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#6729AB] rounded-lg p-3 border border-[#8B4DBF]">
              <div className="text-xs text-[#D6FC48] font-semibold mb-1">Order Chance</div>
              <div className="text-2xl font-bold text-[#D6FC48]">{selectedHotspot.orderChance}%</div>
              <div className="text-xs text-[#D6FC48] opacity-70 mt-1">{selectedHotspot.riders} riders active</div>
            </div>
            <div className="bg-[#6729AB] rounded-lg p-3 border border-[#8B4DBF]">
              <div className="text-xs text-[#D6FC48] font-semibold mb-1">Income Potential</div>
              <div className="text-2xl font-bold text-[#D6FC48]">{selectedHotspot.incomeChance}%</div>
              <div className="text-xs text-[#D6FC48] opacity-70 mt-1">Demand {selectedHotspot.demand}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-[#D6FC48]">Restaurants in area:</div>
            <div className="grid grid-cols-2 gap-2">
              {RESTAURANTS[
                selectedHotspot.demand === "high" ? "high" : selectedHotspot.demand === "medium" ? "medium" : "low"
              ].map((restaurant, idx) => (
                <div key={idx} className="bg-[#2A2A2A] rounded p-2 border border-[#3A3A3A]">
                  <div className="text-sm font-semibold text-white">{restaurant.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          {selectedHotspot.orderChance > 80 ? (
            <button className="w-full bg-[#D6FC48] text-black font-bold py-3 rounded-lg hover:bg-[#C5EB37] transition-colors flex items-center justify-center gap-2">
              <TrendingUp size={18} />
              Go There Now
            </button>
          ) : (
            <button className="w-full bg-[#2A2A2A] text-[#D6FC48] font-bold py-3 rounded-lg hover:bg-[#333333] transition-colors flex items-center justify-center gap-2">
              <AlertCircle size={18} />
              Explore Other Areas
            </button>
          )}
        </div>
      )}
    </div>
  )
}
