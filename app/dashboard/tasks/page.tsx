import { createClient } from "@/lib/supabase/server"
import { TasksList } from "@/components/dashboard/tasks-list"
import { AddTaskDialog } from "@/components/dashboard/add-task-dialog"

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, color")
    .eq("user_id", user.id)
    .order("name")

  const { data: tasks } = await supabase
    .from("tasks")
    .select(`
      *,
      subjects (name, color)
    `)
    .eq("user_id", user.id)
    .order("due_date", { ascending: true, nullsFirst: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your assignments and to-dos</p>
        </div>
        <AddTaskDialog subjects={subjects ?? []} userId={user.id} />
      </div>

      <TasksList tasks={tasks ?? []} subjects={subjects ?? []} userId={user.id} />
    </div>
  )
}
