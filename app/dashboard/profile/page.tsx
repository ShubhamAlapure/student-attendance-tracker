import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Mail, 
  User, 
  Shield, 
  Activity, 
  TrendingUp,
  Award,
  Clock,
  Briefcase
} from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch profile and all stats in parallel
  const [profileResult, subjectsResult, attendanceResult, marksResult, tasksResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("subjects").select("*", { count: "exact" }).eq("user_id", user.id),
    supabase.from("attendance").select("status").eq("user_id", user.id),
    supabase.from("marks").select("marks_obtained, total_marks").eq("user_id", user.id),
    supabase.from("tasks").select("*", { count: "exact" }).eq("user_id", user.id),
  ])

  const profile = profileResult.data
  const totalSubjects = subjectsResult.count ?? 0
  const totalTasks = tasksResult.count ?? 0
  
  const attendance = attendanceResult.data ?? []
  const presentCount = attendance.filter((a) => a.status === "present" || a.status === "late").length
  const attendancePercentage = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0

  const marks = marksResult.data ?? []
  const averagePercentage = marks.length > 0
    ? Math.round(marks.reduce((acc, m) => acc + (Number(m.marks_obtained) / Number(m.total_marks)) * 100, 0) / marks.length)
    : 0

  const initials = profile?.full_name 
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? "U"

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Avatar className="h-24 w-24 border-4 border-white/10 shadow-xl transition-transform duration-500 group-hover:scale-105">
          <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left space-y-2 z-10">
          <h1 className="text-4xl font-bold tracking-tight">{profile?.full_name ?? "Student"}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 text-muted-foreground bg-white/5 px-3 py-1 rounded-full text-sm">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground bg-white/5 px-3 py-1 rounded-full text-sm">
              <Shield className="h-4 w-4" />
              Student Account
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Academic Stats */}
        <Card className="md:col-span-2 bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10 hover:border-white/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-emerald-500" />
              Academic Performance
            </CardTitle>
            <CardDescription>Aggregate summary of your educational journey</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-3 py-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Average Score</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">{averagePercentage}%</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xs text-muted-foreground">Across {marks.length} exams</p>
            </div>
            <div className="space-y-1 border-x border-white/10 px-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Attendance</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-emerald-500">{attendancePercentage}%</span>
                <Clock className="h-4 w-4 text-emerald-500/50" />
              </div>
              <p className="text-xs text-muted-foreground">Total records: {attendance.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Enrolled</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-blue-500">{totalSubjects}</span>
                <BookOpen className="h-4 w-4 text-blue-500/50" />
              </div>
              <p className="text-xs text-muted-foreground">Active subjects</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card className="bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10 hover:border-white/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="h-5 w-5 text-amber-500" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-muted-foreground uppercase mb-1">Rank</p>
              <p className="text-lg font-bold">Consistent Performer</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-muted-foreground uppercase mb-1">Productivity</p>
              <p className="text-lg font-bold flex items-center gap-2">
                {totalTasks} Active Tasks
                <Briefcase className="h-4 w-4 text-violet-500" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings Placeholder */}
      <Card className="bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
        <CardHeader>
          <CardTitle className="text-xl">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase">Member Since</p>
              <p className="font-medium">{new Date(user.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase">User ID</p>
              <p className="font-mono text-[10px] truncate">{user.id}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase">Account Type</p>
              <Badge variant="secondary" className="mt-1">Standard Student</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
