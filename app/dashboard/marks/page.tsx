import { createClient } from "@/lib/supabase/server"
import { MarksList } from "@/components/dashboard/marks-list"
import { AddMarkDialog } from "@/components/dashboard/add-mark-dialog"

export default async function MarksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, color")
    .eq("user_id", user.id)
    .order("name")

  const { data: marks } = await supabase
    .from("marks")
    .select(`
      *,
      subjects (name, color)
    `)
    .eq("user_id", user.id)
    .order("exam_date", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marks</h1>
          <p className="text-muted-foreground">Track your exam scores and grades</p>
        </div>
        <AddMarkDialog subjects={subjects ?? []} userId={user.id} />
      </div>

      <MarksList marks={marks ?? []} subjects={subjects ?? []} userId={user.id} />
    </div>
  )
}
