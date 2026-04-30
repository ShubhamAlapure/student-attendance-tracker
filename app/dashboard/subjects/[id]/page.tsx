import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  ArrowLeft,
  ListTodo,
  Trophy,
  Activity
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function SubjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch subject details
  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", id)
    .single()

  if (!subject) notFound()

  // Fetch attendance, marks, and tasks for this subject
  const [attendanceResult, marksResult, tasksResult] = await Promise.all([
    supabase.from("attendance").select("*").eq("subject_id", id).eq("user_id", user.id).order("date", { ascending: false }),
    supabase.from("marks").select("*").eq("subject_id", id).eq("user_id", user.id).order("exam_date", { ascending: false }),
    supabase.from("tasks").select("*").eq("subject_id", id).eq("user_id", user.id).order("due_date", { ascending: true }),
  ])

  const attendance = attendanceResult.data ?? []
  const marks = marksResult.data ?? []
  const tasks = tasksResult.data ?? []

  // Stats calculation
  const presentCount = attendance.filter(a => a.status === "present").length
  const lateCount = attendance.filter(a => a.status === "late").length
  const absentCount = attendance.filter(a => a.status === "absent").length
  const totalAttendance = attendance.length
  const attendanceRate = totalAttendance > 0 ? Math.round(((presentCount + lateCount) / totalAttendance) * 100) : 0

  const averagePercentage = marks.length > 0
    ? Math.round(marks.reduce((acc, m) => acc + (m.marks_obtained / m.total_marks) * 100, 0) / marks.length)
    : 0

  const completedTasks = tasks.filter(t => t.status === "completed").length
  const totalTasks = tasks.length
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/subjects">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <div 
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: subject.color }}
            >
              {subject.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
          </div>
          <p className="text-muted-foreground">Detailed overview of your progress in this subject</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
            <div className="rounded-lg p-2 bg-emerald-100 dark:bg-emerald-500/10">
              <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {presentCount + lateCount} / {totalAttendance} days tracked
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-500/10">
              <Trophy className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePercentage}%</div>
            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${averagePercentage}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Based on {marks.length} exams
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Task Completion</CardTitle>
            <div className="rounded-lg p-2 bg-violet-100 dark:bg-violet-500/10">
              <ListTodo className="h-4 w-4 text-violet-600 dark:text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskProgress}%</div>
            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-violet-500" 
                style={{ width: `${taskProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {completedTasks} / {totalTasks} tasks finished
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            <div className="rounded-lg p-2 bg-amber-100 dark:bg-amber-500/10">
              <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceRate >= 75 && averagePercentage >= 75 ? "Excellent" : attendanceRate >= 50 ? "Stable" : "At Risk"}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Overall subject performance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-500" />
              Recent Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {attendance.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No records yet</p>
            ) : (
              <div className="space-y-4">
                {attendance.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-medium">{format(new Date(record.date), "MMMM d, yyyy")}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(record.date), "EEEE")}</p>
                    </div>
                    <Badge variant={record.status === "present" ? "default" : record.status === "absent" ? "destructive" : "secondary"}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-blue-500" />
              Exam Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {marks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No exam results yet</p>
            ) : (
              <div className="space-y-4">
                {marks.slice(0, 5).map((mark) => (
                  <div key={mark.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-medium">{mark.exam_name}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(mark.exam_date), "MMM d, yyyy")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{mark.marks_obtained}/{mark.total_marks}</p>
                      <p className="text-xs text-muted-foreground">{Math.round((mark.marks_obtained / mark.total_marks) * 100)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-violet-500" />
              Subject Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No tasks for this subject</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-background/20">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : task.status === "in_progress" ? (
                      <Clock className="h-5 w-5 text-blue-500 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium truncate ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      {task.due_date && (
                        <p className="text-xs text-muted-foreground">Due {format(new Date(task.due_date), "MMM d")}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase">{task.priority}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
