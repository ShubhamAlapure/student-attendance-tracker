"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ChartData {
  name: string
  value: number
  color: string
}

const statusConfig = {
  completed: { name: "Completed", color: "#10b981" },
  in_progress: { name: "In Progress", color: "#3b82f6" },
  pending: { name: "Pending", color: "#94a3b8" },
}

export function TasksProgressChart({ userId }: { userId: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("status")
        .eq("user_id", userId)

      if (tasks && tasks.length > 0) {
        const statusCounts = {
          completed: 0,
          in_progress: 0,
          pending: 0,
        }

        tasks.forEach((task) => {
          if (task.status in statusCounts) {
            statusCounts[task.status as keyof typeof statusCounts] += 1
          }
        })

        const chartData = Object.entries(statusCounts)
          .filter(([, count]) => count > 0)
          .map(([status, count]) => ({
            name: statusConfig[status as keyof typeof statusConfig].name,
            value: count,
            color: statusConfig[status as keyof typeof statusConfig].color,
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
        <p className="text-muted-foreground">No tasks yet</p>
        <p className="text-sm text-muted-foreground">Create tasks to see progress</p>
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
                    Count: {payload[0].value}
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
