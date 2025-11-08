"use client"

import { useState } from "react"
import { TrendingUp, Clock, Award } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface EarningsData {
  period: "today" | "week" | "month"
  totalEarnings: number
  bonusEarnings: number
  baseEarnings: number
  ordersCompleted: number
  activeHours: number
  increasePercentage: number
  averagePerHour: number
  chartData: { day: string; earnings: number; orders: number }[]
  comparison: {
    previousValue: number
    change: number
  }
  breakdown: {
    label: string
    value: number
    percentage: number
  }[]
  insights: string[]
}

const earningsData: Record<string, EarningsData> = {
  today: {
    period: "today",
    totalEarnings: 84,
    bonusEarnings: 15,
    baseEarnings: 69,
    ordersCompleted: 28,
    activeHours: 6,
    increasePercentage: 12,
    averagePerHour: 14,
    chartData: [
      { day: "6am", earnings: 0, orders: 0 },
      { day: "9am", earnings: 15, orders: 5 },
      { day: "12pm", earnings: 28, orders: 9 },
      { day: "3pm", earnings: 45, orders: 14 },
      { day: "6pm", earnings: 68, orders: 22 },
      { day: "9pm", earnings: 84, orders: 28 },
    ],
    comparison: {
      previousValue: 75,
      change: 9,
    },
    breakdown: [
      { label: "Morning (6am-12pm)", value: 28, percentage: 33 },
      { label: "Afternoon (12pm-6pm)", value: 40, percentage: 48 },
      { label: "Evening (6pm+)", value: 16, percentage: 19 },
    ],
    insights: [
      "Peak earnings during dinner rush (5-9pm)",
      "Morning shift underperforming - consider exploring other areas",
      "28% more orders completed vs yesterday",
      "Bonus incentives contributed 40% of total earnings",
    ],
  },
  week: {
    period: "week",
    totalEarnings: 542,
    bonusEarnings: 50,
    baseEarnings: 492,
    ordersCompleted: 182,
    activeHours: 42,
    increasePercentage: 14,
    averagePerHour: 12.9,
    chartData: [
      { day: "Mon", earnings: 65, orders: 22 },
      { day: "Tue", earnings: 78, orders: 26 },
      { day: "Wed", earnings: 92, orders: 30 },
      { day: "Thu", earnings: 88, orders: 29 },
      { day: "Fri", earnings: 105, orders: 35 },
      { day: "Sat", earnings: 72, orders: 24 },
      { day: "Sun", earnings: 42, orders: 16 },
    ],
    comparison: {
      previousValue: 475,
      change: 67,
    },
    breakdown: [
      { label: "Weekday (Mon-Fri)", value: 428, percentage: 79 },
      { label: "Weekend (Sat-Sun)", value: 114, percentage: 21 },
    ],
    insights: [
      "Friday is your highest-earning day (€105)",
      "Weekdays are 3.75x more profitable than weekends",
      "Best performance during lunch (12-2pm) and dinner (6-9pm)",
      "Consider prioritizing high-demand weekday slots",
    ],
  },
  month: {
    period: "month",
    totalEarnings: 2240,
    bonusEarnings: 200,
    baseEarnings: 2040,
    ordersCompleted: 748,
    activeHours: 180,
    increasePercentage: 15,
    averagePerHour: 12.4,
    chartData: [
      { day: "Week 1", earnings: 512, orders: 168 },
      { day: "Week 2", earnings: 578, orders: 192 },
      { day: "Week 3", earnings: 612, orders: 204 },
      { day: "Week 4", earnings: 538, orders: 184 },
    ],
    comparison: {
      previousValue: 1950,
      change: 290,
    },
    breakdown: [
      { label: "Week 1", value: 512, percentage: 23 },
      { label: "Week 2", value: 578, percentage: 26 },
      { label: "Week 3", value: 612, percentage: 27 },
      { label: "Week 4", value: 538, percentage: 24 },
    ],
    insights: [
      "Consistent growth week-over-week until week 4",
      "Average earnings per hour: €12.40 (stable)",
      "748 orders this month - highest in 6 months",
      "Earnings trend: +15% compared to last month",
    ],
  },
}

export default function EarningsLytics() {
  const [selected, setSelected] = useState<"today" | "week" | "month">("week")
  const data = earningsData[selected]

  return (
    <div className="h-full flex flex-col bg-[#121212] text-white overflow-hidden">
      {/* Time period selector */}
      <div className="flex gap-2 px-6 py-4 border-b border-[#2A2A2A]">
        {(["today", "week", "month"] as const).map((period) => (
          <button
            key={period}
            onClick={() => setSelected(period)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selected === period ? "bg-[#6729AB] text-[#D6FC48]" : "bg-[#1E1E1E] text-[#8B8B8B] hover:bg-[#2A2A2A]"
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Earnings overview */}
      <div className="flex-1 overflow-y-auto space-y-4 px-6 py-4">
        {/* Main earnings display with comparison */}
        <div className="bg-gradient-to-br from-[#6729AB] to-[#4A1D7F] rounded-lg p-6 border border-[#8B4DBF] space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#D6FC48] text-sm font-semibold">Bonuses with Addy Spot</p>
              <h2 className="text-5xl font-bold text-[#D6FC48] mt-2">€{data.bonusEarnings}</h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-[#D6FC48] text-[#6729AB] rounded-full px-3 py-1 font-bold text-sm flex items-center gap-1">
                <TrendingUp size={16} />+{data.increasePercentage}%
              </div>
              <div className="text-xs text-[#D6FC48] opacity-70">+€{data.comparison.change} vs previous</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#8B4DBF]">
            <div>
              <p className="text-[#D6FC48] text-xs opacity-70">Bonus</p>
              <p className="text-lg font-bold text-white">€{data.bonusEarnings}</p>
            </div>
            <div>
              <p className="text-[#D6FC48] text-xs opacity-70">Base</p>
              <p className="text-lg font-bold text-white">€{data.baseEarnings}</p>
            </div>
            <div>
              <p className="text-[#D6FC48] text-xs opacity-70">Per Hour</p>
              <p className="text-lg font-bold text-white">€{data.averagePerHour}</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#2A2A2A] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6729AB] flex items-center justify-center">
                <TrendingUp size={16} className="text-[#D6FC48]" />
              </div>
              <span className="text-[#8B8B8B] text-xs">Orders</span>
            </div>
            <p className="text-2xl font-bold">{data.ordersCompleted}</p>
          </div>

          <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#2A2A2A] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6729AB] flex items-center justify-center">
                <Clock size={16} className="text-[#D6FC48]" />
              </div>
              <span className="text-[#8B8B8B] text-xs">Hours</span>
            </div>
            <p className="text-2xl font-bold">{data.activeHours}h</p>
          </div>
        </div>

        {/* Chart with improved visualization */}
        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#2A2A2A] space-y-3">
          <p className="text-sm font-semibold">Earnings Trend</p>

          <div style={{ width: "100%", height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="day" stroke="#8B8B8B" style={{ fontSize: "12px" }} />
                <YAxis stroke="#8B8B8B" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2A2A2A",
                    border: "1px solid #6729AB",
                    borderRadius: "8px",
                    color: "#D6FC48",
                  }}
                  formatter={(value: number) => `€${value}`}
                  labelStyle={{ color: "#D6FC48" }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#D6FC48"
                  strokeWidth={3}
                  dot={{ fill: "#6729AB", r: 5, strokeWidth: 2, stroke: "#D6FC48" }}
                  activeDot={{ r: 7 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#2A2A2A] space-y-3">
          <p className="text-sm font-semibold">Earnings Breakdown</p>
          <div className="space-y-3">
            {data.breakdown.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#8B8B8B]">{item.label}</span>
                  <span className="font-bold text-[#D6FC48]">€{item.value}</span>
                </div>
                <div className="w-full bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#6729AB] to-[#D6FC48] h-full rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-[#8B8B8B] opacity-70">{item.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-[#D6FC48]" />
            <p className="text-sm font-semibold text-[#D6FC48]">AI Insights</p>
          </div>
          <div className="space-y-2">
            {data.insights.map((insight, i) => (
              <div key={i} className="bg-[#2A2A2A] border-l-4 border-[#D6FC48] rounded p-3">
                <p className="text-sm text-[#8B8B8B]">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
