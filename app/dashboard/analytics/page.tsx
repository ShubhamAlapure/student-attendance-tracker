import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceLineChart } from "@/components/dashboard/performance-line-chart"
import { SubjectPieChart } from "@/components/dashboard/subject-pie-chart"
import { AttendanceBarChart } from "@/components/dashboard/attendance-bar-chart"
import { TasksProgressChart } from "@/components/dashboard/tasks-progress-chart"

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Visualize your academic performance</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your exam scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceLineChart userId={user.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
            <CardDescription>Score distribution by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <SubjectPieChart userId={user.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your attendance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceBarChart userId={user.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Your task progress overview</CardDescription>
          </CardHeader>
          <CardContent>
            <TasksProgressChart userId={user.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
