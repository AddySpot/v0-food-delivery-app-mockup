"use client"

import { useState } from "react"
import { Zap, Wind, TrendingUp, Check, Loader2, Clock, Calendar } from "lucide-react"

interface ScheduleDay {
  day: string
  timeSlots: string
  profitChance: number
  weather: string
  recommendation: string
  confidence: number
  reasoning: string
}

interface PlanningMode {
  mode: "input" | "result" | "loading"
  hoursPerWeek: number
  strategy: "maximize" | "weather" | "balanced"
  userLocation?: string
}

const generateAISchedule = (hours: number, strategy: string): ScheduleDay[] => {
  const baseSchedule = {
    maximize: [
      {
        day: "Monday",
        timeSlots: "6-8pm",
        profitChance: 50,
        weather: "Cloudy",
        recommendation: "Not ideal",
        confidence: 85,
        reasoning: "Lower demand",
      },
      {
        day: "Tuesday",
        timeSlots: "12pm-4pm, 6-9pm",
        profitChance: 95,
        weather: "Rainy",
        recommendation: "Perfect!",
        confidence: 98,
        reasoning: "Rainy = more orders. Peak times.",
      },
      {
        day: "Wednesday",
        timeSlots: "5-9pm",
        profitChance: 88,
        weather: "Moderate",
        recommendation: "Good",
        confidence: 92,
        reasoning: "Dinner rush hours",
      },
      {
        day: "Thursday",
        timeSlots: "6-9pm",
        profitChance: 78,
        weather: "Clear",
        recommendation: "Good",
        confidence: 88,
        reasoning: "Evening rush",
      },
      {
        day: "Friday",
        timeSlots: "5-10pm, 11pm-1am",
        profitChance: 92,
        weather: "Busy",
        recommendation: "Excellent",
        confidence: 95,
        reasoning: "Weekend starts. High demand.",
      },
      {
        day: "Saturday",
        timeSlots: "11am-3pm, 6-9pm",
        profitChance: 85,
        weather: "Busy",
        recommendation: "Very good",
        confidence: 90,
        reasoning: "Weekend activity high",
      },
      {
        day: "Sunday",
        timeSlots: "12-4pm",
        profitChance: 60,
        weather: "Moderate",
        recommendation: "Fair",
        confidence: 80,
        reasoning: "Demand drops",
      },
    ],
    weather: [
      {
        day: "Monday",
        timeSlots: "7-10am",
        profitChance: 72,
        weather: "Clear",
        recommendation: "Nice",
        confidence: 88,
        reasoning: "Clear morning",
      },
      {
        day: "Tuesday",
        timeSlots: "9am-12pm",
        profitChance: 68,
        weather: "Warm",
        recommendation: "Great",
        confidence: 85,
        reasoning: "Perfect conditions",
      },
      {
        day: "Wednesday",
        timeSlots: "8-11am",
        profitChance: 65,
        weather: "Cloudy",
        recommendation: "OK",
        confidence: 82,
        reasoning: "No rain",
      },
      {
        day: "Thursday",
        timeSlots: "6-9pm",
        profitChance: 74,
        weather: "Clear",
        recommendation: "Very good",
        confidence: 88,
        reasoning: "Evening clear",
      },
      {
        day: "Friday",
        timeSlots: "10am-1pm",
        profitChance: 70,
        weather: "Clear",
        recommendation: "Good",
        confidence: 84,
        reasoning: "No rain",
      },
      {
        day: "Saturday",
        timeSlots: "9am-12pm, 3-6pm",
        profitChance: 76,
        weather: "Sunny",
        recommendation: "Best",
        confidence: 92,
        reasoning: "Perfect weather all day",
      },
      {
        day: "Sunday",
        timeSlots: "Rest",
        profitChance: 0,
        weather: "-",
        recommendation: "Day off",
        confidence: 100,
        reasoning: "Recovery day",
      },
    ],
    balanced: [
      {
        day: "Monday",
        timeSlots: "6-8pm",
        profitChance: 70,
        weather: "Clear",
        recommendation: "Good",
        confidence: 88,
        reasoning: "Balanced: good pay + comfort",
      },
      {
        day: "Tuesday",
        timeSlots: "12pm-4pm",
        profitChance: 85,
        weather: "Rainy",
        recommendation: "Very good",
        confidence: 90,
        reasoning: "Strong demand",
      },
      {
        day: "Wednesday",
        timeSlots: "5-8pm",
        profitChance: 82,
        weather: "OK",
        recommendation: "Very good",
        confidence: 87,
        reasoning: "Good balance",
      },
      {
        day: "Thursday",
        timeSlots: "6-9pm",
        profitChance: 80,
        weather: "Clear",
        recommendation: "Excellent",
        confidence: 89,
        reasoning: "Peak hours",
      },
      {
        day: "Friday",
        timeSlots: "5-10pm",
        profitChance: 90,
        weather: "Clear",
        recommendation: "Excellent",
        confidence: 94,
        reasoning: "High demand + nice weather",
      },
      {
        day: "Saturday",
        timeSlots: "11am-3pm, 6-9pm",
        profitChance: 82,
        weather: "Sunny",
        recommendation: "Very good",
        confidence: 91,
        reasoning: "Good conditions",
      },
      {
        day: "Sunday",
        timeSlots: "12-3pm",
        profitChance: 68,
        weather: "Clear",
        recommendation: "Good",
        confidence: 85,
        reasoning: "Comfort + income mix",
      },
    ],
  }

  const selectedStrategy =
    strategy === "maximize"
      ? baseSchedule.maximize
      : strategy === "weather"
        ? baseSchedule.weather
        : baseSchedule.balanced

  return selectedStrategy
}

export default function WorkPlanner() {
  const [state, setState] = useState<PlanningMode>({
    mode: "input",
    hoursPerWeek: 20,
    strategy: "balanced",
  })
  const [projectedIncome, setProjectedIncome] = useState(0)
  const [schedule, setSchedule] = useState<ScheduleDay[]>([])

  const generateScheduleWithAI = async () => {
    setState((prev) => ({ ...prev, mode: "loading" }))
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newSchedule = generateAISchedule(state.hoursPerWeek, state.strategy)
    setSchedule(newSchedule)

    const baseIncome = state.strategy === "maximize" ? 45 : state.strategy === "weather" ? 38 : 42
    const incomeMultiplier = state.hoursPerWeek / 20
    setProjectedIncome(Math.round(baseIncome * incomeMultiplier * 10) / 10)

    setState((prev) => ({ ...prev, mode: "result" }))
  }

  return (
    <div className="h-full flex flex-col bg-[#121212] text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#121212] px-6 py-4 border-b border-[#2A2A2A]">
        <h1 className="text-4xl font-bold">Work Planner</h1>
        <p className="text-[#D6FC48] text-lg mt-1">AI Weekly Plan</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-4 px-6 py-4">
        {state.mode === "input" ? (
          <>
            <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[#2A2A2A] space-y-4">
              <div className="space-y-3">
                <label className="text-2xl font-bold text-[#D6FC48]">How many hours?</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={state.hoursPerWeek}
                    onChange={(e) => setState({ ...state, hoursPerWeek: Number.parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-[#2A2A2A] rounded appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #6729AB 0%, #6729AB ${(state.hoursPerWeek / 40) * 100}%, #2A2A2A ${(state.hoursPerWeek / 40) * 100}%, #2A2A2A 100%)`,
                    }}
                  />
                  <span className="text-3xl font-bold text-[#D6FC48] w-20 text-right">{state.hoursPerWeek}h</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[5, 20, 40].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setState({ ...state, hoursPerWeek: hours })}
                    className={`py-3 rounded font-bold text-lg transition-colors ${
                      state.hoursPerWeek === hours
                        ? "bg-[#6729AB] text-[#D6FC48]"
                        : "bg-[#2A2A2A] text-[#8B8B8B] hover:bg-[#333333]"
                    }`}
                  >
                    {hours}h
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-2xl font-bold text-[#D6FC48]">Pick your goal</label>

              {[
                {
                  id: "maximize",
                  icon: <Zap className="text-[#D6FC48]" size={24} />,
                  title: "Make More Money",
                  description: "Work at best times",
                },
                {
                  id: "weather",
                  icon: <Wind className="text-[#D6FC48]" size={24} />,
                  title: "Good Weather",
                  description: "Stay comfortable",
                },
                {
                  id: "balanced",
                  icon: <TrendingUp className="text-[#D6FC48]" size={24} />,
                  title: "Mix Both",
                  description: "Money + comfort",
                },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setState({ ...state, strategy: option.id as "maximize" | "weather" | "balanced" })}
                  className={`w-full p-5 rounded-lg border-2 transition-all text-left ${
                    state.strategy === option.id
                      ? "border-[#D6FC48] bg-[#6729AB] bg-opacity-30"
                      : "border-[#2A2A2A] bg-[#1E1E1E] hover:border-[#3A3A3A]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{option.icon}</div>
                    <div className="flex-1">
                      <p className="font-bold text-xl">{option.title}</p>
                      <p className="text-lg text-[#8B8B8B]">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Generate button */}
            <button
              onClick={generateScheduleWithAI}
              className="w-full bg-[#D6FC48] text-black font-bold py-5 rounded-lg hover:bg-[#C5EB37] transition-colors flex items-center justify-center gap-2 text-xl"
            >
              <Zap size={24} />
              Create Plan
            </button>
          </>
        ) : state.mode === "loading" ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-16 h-16 text-[#D6FC48] animate-spin" />
            <p className="text-2xl font-bold text-[#D6FC48]">Planning Your Week...</p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-[#6729AB] to-[#4A1D7F] rounded-lg p-6 border border-[#8B4DBF] space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[#D6FC48] font-bold text-lg">Extra Money This Week</p>
                <Check className="text-[#D6FC48]" size={28} />
              </div>
              <p className="text-5xl font-bold text-[#D6FC48]">€{projectedIncome}</p>
            </div>

            <div className="space-y-3">
              <p className="text-2xl font-bold text-[#D6FC48]">Your Schedule</p>
              <div className="space-y-3">
                {schedule.map((day, i) => (
                  <div
                    key={i}
                    className="bg-[#1E1E1E] rounded-lg p-5 border border-[#2A2A2A] space-y-3 hover:border-[#6729AB] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-xl flex items-center gap-2">
                          <Calendar size={20} className="text-[#D6FC48]" />
                          {day.day}
                        </p>
                        <p className="text-lg text-[#D6FC48] font-bold mt-2 flex items-center gap-2">
                          <Clock size={18} />
                          {day.timeSlots}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#D6FC48]">{day.profitChance}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-[#2A2A2A]">
                      <Wind size={18} className="text-[#D6FC48]" />
                      <span className="text-lg font-semibold">{day.weather}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setState({ ...state, mode: "input" })}
                className="flex-1 bg-[#1E1E1E] text-white font-bold py-4 rounded-lg hover:bg-[#2A2A2A] transition-colors border border-[#2A2A2A] text-lg"
              >
                Change Plan
              </button>
              <button className="flex-1 bg-[#D6FC48] text-black font-bold py-4 rounded-lg hover:bg-[#C5EB37] transition-colors text-lg">
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
