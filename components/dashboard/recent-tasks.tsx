"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowRight, Circle, CheckCircle2, Clock } from "lucide-react"

interface Task {
  id: string
  title: string
  due_date: string | null
  priority: "low" | "medium" | "high"
  status: "pending" | "in_progress" | "completed"
}

const priorityColors = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
}

const statusIcons = {
  pending: Circle,
  in_progress: Clock,
  completed: CheckCircle2,
}

export function RecentTasks({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await supabase
        .from("tasks")
        .select("id, title, due_date, priority, status")
        .eq("user_id", userId)
        .order("due_date", { ascending: true, nullsFirst: false })
        .limit(5)

      if (data) {
        setTasks(data)
      }
      setLoading(false)
    }

    fetchTasks()
  }, [userId, supabase])

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">No tasks yet</p>
        <Button asChild variant="link" className="mt-2">
          <Link href="/dashboard/tasks">Create your first task</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {tasks.map((task) => {
          const StatusIcon = statusIcons[task.status]
          return (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <StatusIcon
                  className={cn(
                    "h-5 w-5",
                    task.status === "completed"
                      ? "text-emerald-600"
                      : task.status === "in_progress"
                      ? "text-blue-600"
                      : "text-muted-foreground"
                  )}
                />
                <div>
                  <p className={cn(
                    "font-medium",
                    task.status === "completed" && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </p>
                  {task.due_date && (
                    <p className="text-xs text-muted-foreground">
                      Due {format(new Date(task.due_date), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
          )
        })}
      </div>
      <Button asChild variant="outline" className="w-full">
        <Link href="/dashboard/tasks">
          View all tasks
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
