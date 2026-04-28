"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ChartData {
  name: string
  value: number
  color: string
}

export function SubjectPieChart({ userId }: { userId: string }) {
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

        const chartData = Array.from(subjectMap.entries()).map(([name, data]) => ({
          name,
          value: Math.round(data.total / data.count),
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
        <p className="text-muted-foreground">No subject data yet</p>
        <p className="text-sm text-muted-foreground">Add marks to see distribution</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <p className="text-sm font-medium">{payload[0].name}</p>
                  <p className="text-sm text-muted-foreground">
                    Average: {payload[0].value}%
                  </p>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
