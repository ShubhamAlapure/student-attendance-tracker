import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, BookOpen, Calendar, TrendingUp } from "lucide-react"
import { RecentTasks } from "@/components/dashboard/recent-tasks"
import { PerformanceChart } from "@/components/dashboard/performance-chart"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch stats
  const [tasksResult, marksResult, attendanceResult] = await Promise.all([
    supabase
      .from("tasks")
      .select("*", { count: "exact" })
      .eq("user_id", user.id),
    supabase
      .from("marks")
      .select("marks_obtained, total_marks")
      .eq("user_id", user.id),
    supabase
      .from("attendance")
      .select("status")
      .eq("user_id", user.id),
  ])

  const totalTasks = tasksResult.count ?? 0
  const completedTasks = tasksResult.data?.filter((t) => t.status === "completed").length ?? 0
  
  const marks = marksResult.data ?? []
  const averagePercentage = marks.length > 0
    ? Math.round(
        marks.reduce((acc, m) => acc + (Number(m.marks_obtained) / Number(m.total_marks)) * 100, 0) / marks.length
      )
    : 0

  const attendance = attendanceResult.data ?? []
  const presentCount = attendance.filter((a) => a.status === "present" || a.status === "late").length
  const attendancePercentage = attendance.length > 0
    ? Math.round((presentCount / attendance.length) * 100)
    : 0

  const stats = [
    {
      title: "Tasks Completed",
      value: `${completedTasks}/${totalTasks}`,
      description: totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}% completion rate` : "No tasks yet",
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Average Score",
      value: `${averagePercentage}%`,
      description: marks.length > 0 ? `Across ${marks.length} exams` : "No marks recorded",
      icon: BookOpen,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Attendance Rate",
      value: `${attendancePercentage}%`,
      description: attendance.length > 0 ? `${presentCount}/${attendance.length} days present` : "No attendance recorded",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Performance Trend",
      value: averagePercentage >= 75 ? "Excellent" : averagePercentage >= 50 ? "Good" : "Needs Improvement",
      description: "Based on recent scores",
      icon: TrendingUp,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your academic progress and productivity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your marks across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart userId={user.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your upcoming and recent tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTasks userId={user.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
