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
  Legend,
} from "recharts"

interface ChartData {
  subject: string
  present: number
  late: number
  absent: number
}

export function AttendanceBarChart({ userId }: { userId: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: attendance } = await supabase
        .from("attendance")
        .select(`
          status,
          subjects (name)
        `)
        .eq("user_id", userId)

      if (attendance && attendance.length > 0) {
        const subjectMap = new Map<string, { present: number; late: number; absent: number }>()

        attendance.forEach((record) => {
          const subjectData = record.subjects as { name: string } | null
          const subjectName = subjectData?.name ?? "Unknown"

          if (!subjectMap.has(subjectName)) {
            subjectMap.set(subjectName, { present: 0, late: 0, absent: 0 })
          }

          const existing = subjectMap.get(subjectName)!
          if (record.status === "present") existing.present += 1
          else if (record.status === "late") existing.late += 1
          else if (record.status === "absent") existing.absent += 1
        })

        const chartData = Array.from(subjectMap.entries()).map(([subject, counts]) => ({
          subject,
          ...counts,
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
        <p className="text-muted-foreground">No attendance data yet</p>
        <p className="text-sm text-muted-foreground">Mark attendance to see the chart</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="subject" tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <p className="text-sm font-medium">{label}</p>
                  {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                      {entry.name}: {entry.value}
                    </p>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="late" name="Late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
