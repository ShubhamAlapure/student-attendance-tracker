import { createClient } from "@/lib/supabase/server"
import { AttendanceTracker } from "@/components/dashboard/attendance-tracker"

export default async function AttendancePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, color")
    .eq("user_id", user.id)
    .order("name")

  const { data: attendance } = await supabase
    .from("attendance")
    .select(`
      *,
      subjects (name, color)
    `)
    .eq("user_id", user.id)
    .order("date", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">Track your class attendance</p>
      </div>

      <AttendanceTracker 
        attendance={attendance ?? []} 
        subjects={subjects ?? []} 
        userId={user.id} 
      />
    </div>
  )
}
