import { createClient } from "@/lib/supabase/server"
import { SubjectsList } from "@/components/dashboard/subjects-list"
import { AddSubjectDialog } from "@/components/dashboard/add-subject-dialog"

export default async function SubjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .eq("user_id", user.id)
    .order("name")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">Manage your subjects and courses</p>
        </div>
        <AddSubjectDialog userId={user.id} />
      </div>

      <SubjectsList subjects={subjects ?? []} userId={user.id} />
    </div>
  )
}
