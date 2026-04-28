import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PredictionEngine } from "@/components/dashboard/prediction-engine"
import { Brain, TrendingUp, Target, AlertTriangle } from "lucide-react"

export default async function PredictionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch all data for predictions
  const [marksResult, attendanceResult, tasksResult] = await Promise.all([
    supabase
      .from("marks")
      .select(`
        marks_obtained,
        total_marks,
        exam_date,
        subjects (name, color)
      `)
      .eq("user_id", user.id)
      .order("exam_date", { ascending: true }),
    supabase
      .from("attendance")
      .select("status, date, subjects (name)")
      .eq("user_id", user.id),
    supabase
      .from("tasks")
      .select("status, priority, due_date")
      .eq("user_id", user.id),
  ])

  const marks = marksResult.data ?? []
  const attendance = attendanceResult.data ?? []
  const tasks = tasksResult.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Predictions</h1>
        <p className="text-muted-foreground">
          ML-powered insights based on your academic data
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Points
            </CardTitle>
            <Brain className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marks.length + attendance.length + tasks.length}</div>
            <p className="text-xs text-muted-foreground">Records analyzed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Exams Analyzed
            </CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marks.length}</div>
            <p className="text-xs text-muted-foreground">For grade prediction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attendance Records
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendance.length}</div>
            <p className="text-xs text-muted-foreground">For pattern analysis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasks Tracked
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">For workload prediction</p>
          </CardContent>
        </Card>
      </div>

      <PredictionEngine marks={marks} attendance={attendance} tasks={tasks} />
    </div>
  )
}
