"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { format } from "date-fns"

interface ChartData {
  date: string
  percentage: number
}

export function PerformanceLineChart({ userId }: { userId: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: marks } = await supabase
        .from("marks")
        .select("marks_obtained, total_marks, exam_date")
        .eq("user_id", userId)
        .order("exam_date", { ascending: true })

      if (marks && marks.length > 0) {
        const chartData = marks.map((mark) => ({
          date: format(new Date(mark.exam_date), "MMM d"),
          percentage: Math.round((Number(mark.marks_obtained) / Number(mark.total_marks)) * 100),
        }))
        setData(chartData)
      }
      setLoading(false)
    }

    fetchData()
  }, [userId, supabase])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">No performance data yet</p>
        <p className="text-sm text-muted-foreground">Add exam results to see your trend</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground">
                    Score: {payload[0].value}%
                  </p>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="percentage"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
