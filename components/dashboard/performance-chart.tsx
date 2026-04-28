"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface ChartData {
  subject: string
  percentage: number
  color: string
}

export function PerformanceChart({ userId }: { userId: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: marks } = await supabase
        .from("marks")
        .select(`
          marks_obtained,
          total_marks,
          subjects (name, color)
        `)
        .eq("user_id", userId)

      if (marks && marks.length > 0) {
        // Group by subject and calculate average
        const subjectMap = new Map<string, { total: number; count: number; color: string }>()
        
        marks.forEach((mark) => {
          const subjectData = mark.subjects as { name: string; color: string } | null
          const subjectName = subjectData?.name ?? "Unknown"
          const color = subjectData?.color ?? "#3b82f6"
          const percentage = (Number(mark.marks_obtained) / Number(mark.total_marks)) * 100
          
          if (subjectMap.has(subjectName)) {
            const existing = subjectMap.get(subjectName)!
            existing.total += percentage
            existing.count += 1
          } else {
            subjectMap.set(subjectName, { total: percentage, count: 1, color })
          }
        })

        const chartData = Array.from(subjectMap.entries()).map(([subject, data]) => ({
          subject,
          percentage: Math.round(data.total / data.count),
          color: data.color,
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
        <p className="text-muted-foreground">No marks data yet</p>
        <p className="text-sm text-muted-foreground">Add your first exam result to see your performance</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="subject" 
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis 
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <p className="text-sm font-medium">{payload[0].payload.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    Average: {payload[0].value}%
                  </p>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
