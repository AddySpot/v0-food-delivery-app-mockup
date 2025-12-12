"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation, MapPin, CloudRain, X, Search, Volume2, Mic, ArrowUp, Zap, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for demand zones
const DEMAND_ZONES = [
  {
    id: 1,
    name: "Mitte / Alexanderplatz",
    demand: "high",
    income: "€€€",
    weather: "rain",
    top: "40%",
    left: "65%",
    restaurants: ["Curry 36", "Monsieur Vuong", "Cocolo Ramen", "Zeit für Brot"],
    distance: "2.5 km",
    eta: "8 min",
  },
  {
    id: 2,
    name: "Kreuzberg / Kottbusser Tor",
    demand: "high",
    income: "€€€",
    weather: "clear",
    top: "70%",
    left: "75%",
    restaurants: ["Burgermeister", "Mustafa's Gemüse Kebap", "Hasir", "Vöner"],
    distance: "3.1 km",
    eta: "12 min",
  },
  {
    id: 3,
    name: "Prenzlauer Berg",
    demand: "medium",
    income: "€€",
    weather: "rain",
    top: "25%",
    left: "70%",
    restaurants: ["Konnopke's Imbiss", "Prater Garten", "Cookies Cream"],
    distance: "4.2 km",
    eta: "15 min",
  },
  {
    id: 4,
    name: "Charlottenburg",
    demand: "low",
    income: "€",
    weather: "clear",
    top: "50%",
    left: "20%",
    restaurants: ["Schwarzes Café", "Paris Bar"],
    distance: "6.5 km",
    eta: "22 min",
  },
  {
    id: 5,
    name: "Moabit",
    demand: "medium",
    income: "€€",
    weather: "rain",
    top: "35%",
    left: "40%",
    restaurants: ["Arminiusmarkthalle", "Probier Mahl"],
    distance: "3.8 km",
    eta: "14 min",
  },
]

export default function DemandMap() {
  const [selectedZone, setSelectedZone] = useState<(typeof DEMAND_ZONES)[0] | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showRain, setShowRain] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1) // Added zoom state
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true) // Added state to track if header is expanded or collapsed

  const projectedRevenue = DEMAND_ZONES.reduce((total, zone) => {
    if (zone.demand === "high") return total + 85
    if (zone.demand === "medium") return total + 45
    return total + 15
  }, 0)

  // Toggle rain effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowRain((prev) => !prev)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleZoneClick = (zone: (typeof DEMAND_ZONES)[0]) => {
    setSelectedZone(zone)
  }

  const startNavigation = () => {
    setIsNavigating(true)
  }

  const exitNavigation = () => {
    setIsNavigating(false)
    setSelectedZone(null)
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1))

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-[#121212] overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#1a1a1a] to-[#1a1a1a]/80 px-5 border-b border-[#D6FC48]/20 cursor-pointer"
        animate={{ paddingTop: isHeaderExpanded ? 16 : 0, paddingBottom: isHeaderExpanded ? 16 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
      >
        <AnimatePresence mode="wait">
          {isHeaderExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-3 py-2"
            >
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Projected Revenue</div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-[#D6FC48]">€25</span>
                <span className="text-sm text-gray-400">in bonuses</span>
              </div>
              <div className="flex items-center gap-2 bg-[#D6FC48]/10 px-3 py-2 rounded-lg border border-[#D6FC48]/30">
                <Zap className="h-5 w-5 text-[#D6FC48]" />
                <span className="text-sm font-semibold text-[#D6FC48]">
                  {DEMAND_ZONES.filter((z) => z.demand === "high").length} Hot Zones
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-3 py-1"
            >
              <span className="text-sm font-bold text-[#D6FC48]">€25</span>
              <Zap className="h-4 w-4 text-[#D6FC48]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        className="w-full h-full transition-transform duration-300 ease-in-out origin-center"
        style={{ transform: `scale(${zoomLevel})`, marginTop: isHeaderExpanded ? "120px" : "40px" }}
      >
        {/* Google Maps Embed Background */}
        <div className="absolute inset-0 w-full h-full opacity-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77686.01103335116!2d13.354491450000001!3d52.52000749999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e373f035901%3A0x42120465b5e3b70!2sBerlin!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde&zoom=12"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(1) hue-rotate(180deg) contrast(1.2) saturate(0.8)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full scale-[1.2] origin-center pointer-events-none"
          />
        </div>

        {/* Rain Overlay (Global) */}
        {showRain && !isNavigating && (
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230000ff' fillOpacity='0.4' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          />
        )}

        {/* OVERVIEW MODE UI */}
        {!isNavigating && (
          <>
            {/* Demand Zones */}
            <div className="absolute inset-0 z-0">
              {DEMAND_ZONES.map((zone) => (
                <motion.button
                  key={zone.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ top: zone.top, left: zone.left }}
                  onClick={() => handleZoneClick(zone)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Pulse Effect */}
                  <div
                    className={`absolute inset-0 rounded-full animate-ping opacity-10 ${
                      zone.demand === "high"
                        ? "bg-red-500"
                        : zone.demand === "medium"
                          ? "bg-orange-500"
                          : "bg-yellow-400"
                    }`}
                  />

                  {/* Zone Circle */}
                  <div
                    className={`relative w-48 h-48 rounded-full border-2 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 backdrop-blur-sm ${
                      zone.demand === "high"
                        ? "bg-red-500/20 border-red-400/30"
                        : zone.demand === "medium"
                          ? "bg-orange-500/20 border-orange-400/30"
                          : "bg-yellow-400/20 border-yellow-400/30"
                    }`}
                  >
                    <span className="text-white font-bold text-3xl drop-shadow-md">{zone.income}</span>

                    {/* Weather Icon Badge */}
                    {zone.weather === "rain" && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-sm border border-white/20">
                        <CloudRain className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap backdrop-blur-sm">
                    {zone.demand === "high" ? "High Demand" : zone.demand === "medium" ? "Medium" : "Low"}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* User Location */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-0">
              <div className="relative">
                <div className="h-16 w-16 bg-blue-500/20 rounded-full animate-pulse absolute -top-4 -left-4"></div>
                <div className="h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-500 z-10 relative">
                  <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NAVIGATION MODE UI */}
        {isNavigating && selectedZone && (
          <div className="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none">
            {/* Top Navigation Bar */}
            <div className="bg-[#0F9D58] p-4 pt-12 pb-6 rounded-b-3xl shadow-lg pointer-events-auto">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl text-white">
                  <ArrowUp className="h-8 w-8" />
                </div>
                <div className="flex-1 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-2xl">{selectedZone.distance}</span>
                    <span className="opacity-80">to {selectedZone.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium bg-black/10 w-fit px-3 py-1 rounded-full">
                    <span>{selectedZone.income} Potential</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {selectedZone.weather === "rain" ? (
                        <CloudRain className="h-3 w-3" />
                      ) : (
                        <Zap className="h-3 w-3" />
                      )}
                      {selectedZone.weather === "rain" ? "Rainy" : "Clear"}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-full p-2 shadow-sm">
                  <Mic className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Route Visualization (SVG Overlay) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="100%" stopColor="#4285F4" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* White border path for better visibility */}
              <motion.path
                d={`M ${window.innerWidth / 2} ${window.innerHeight - 150} Q ${window.innerWidth / 2} ${window.innerHeight / 2} ${(Number.parseInt(selectedZone.left) / 100) * window.innerWidth} ${(Number.parseInt(selectedZone.top) / 100) * window.innerHeight}`}
                fill="none"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Main Route Path */}
              <motion.path
                d={`M ${window.innerWidth / 2} ${window.innerHeight - 150} Q ${window.innerWidth / 2} ${window.innerHeight / 2} ${(Number.parseInt(selectedZone.left) / 100) * window.innerWidth} ${(Number.parseInt(selectedZone.top) / 100) * window.innerHeight}`}
                fill="none"
                stroke="#4285F4"
                strokeWidth="10"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Destination Marker */}
              <circle
                cx={(Number.parseInt(selectedZone.left) / 100) * window.innerWidth}
                cy={(Number.parseInt(selectedZone.top) / 100) * window.innerHeight}
                r="8"
                fill="#EA4335"
                stroke="white"
                strokeWidth="3"
              />
            </svg>

            {/* User Navigation Arrow */}
            <motion.div
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ y: 0 }}
              animate={{ y: -50 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="relative">
                {/* View Cone */}
                <div className="absolute -top-24 -left-12 w-32 h-32 bg-gradient-to-t from-blue-500/30 to-transparent transform -rotate-45 rounded-full blur-xl"></div>
                {/* Arrow */}
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-blue-500 filter drop-shadow-lg"></div>
              </div>
            </motion.div>

            {/* Bottom Navigation Bar */}
            <div className="bg-white p-4 pb-8 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-3xl font-bold text-[#0F9D58]">{selectedZone.eta}</div>
                  <div className="text-gray-500 font-medium">Fastest route • Light traffic</div>
                </div>
                <Button variant="destructive" className="rounded-full px-6 font-bold" onClick={exitNavigation}>
                  Exit
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 rounded-full border-gray-300 bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Search along route
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-300 bg-transparent">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isNavigating && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomIn}
            className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomOut}
            className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
          >
            <Minus className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Bottom Sheet Details */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-20 p-5 pb-8"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedZone.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`font-bold ${
                      selectedZone.demand === "high"
                        ? "text-red-600"
                        : selectedZone.demand === "medium"
                          ? "text-orange-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {selectedZone.income} Income Potential
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{selectedZone.distance} away</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedZone(null)}
                className="rounded-full bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex gap-3 mb-6">
              <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Weather</div>
                <div className="flex items-center gap-2">
                  {selectedZone.weather === "rain" ? (
                    <>
                      <CloudRain className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Rainy</span>
                    </>
                  ) : (
                    <>
                      <div className="h-5 w-5 rounded-full bg-yellow-400" />
                      <span className="font-medium">Clear</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Restaurants</div>
                <div className="font-medium">{selectedZone.restaurants.length} Hotspots</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Top Restaurants</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {selectedZone.restaurants.map((rest, i) => (
                  <div key={i} className="flex-shrink-0 bg-white border border-gray-200 rounded-lg p-3 w-32 shadow-sm">
                    <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mb-2 text-orange-600">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-bold truncate">{rest}</div>
                    <div className="text-xs text-gray-500">High Orders</div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-[#6729AB] hover:bg-[#56228f] text-white text-lg font-bold py-6 rounded-xl shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
              onClick={startNavigation}
            >
              <Navigation className="h-6 w-6" />
              Go Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
