"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Circle, CheckCircle2, Clock, Trash2 } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string | null
  due_date: string | null
  priority: "low" | "medium" | "high"
  status: "pending" | "in_progress" | "completed"
  subject_id: string | null
  subjects: { name: string; color: string } | null
}

interface Subject {
  id: string
  name: string
  color: string
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

export function TasksList({
  tasks: initialTasks,
  subjects,
  userId,
}: {
  tasks: Task[]
  subjects: Subject[]
  userId: string
}) {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all")
  const router = useRouter()
  const supabase = createClient()

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter((task) => task.status === filter)

  const updateTaskStatus = async (taskId: string, status: Task["status"]) => {
    const { error } = await supabase
      .from("tasks")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", taskId)
      .eq("user_id", userId)

    if (!error) {
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status } : t)))
    }
  }

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", userId)

    if (!error) {
      setTasks(tasks.filter((t) => t.id !== taskId))
    }
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No tasks yet</p>
          <p className="text-muted-foreground">Create your first task to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const StatusIcon = statusIcons[task.status]
          return (
            <Card key={task.id}>
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        task.status === "completed" ? "pending" : "completed"
                      )
                    }
                    className="mt-0.5"
                  >
                    <StatusIcon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        task.status === "completed"
                          ? "text-emerald-600"
                          : task.status === "in_progress"
                          ? "text-blue-600"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    />
                  </button>
                  <div className="space-y-1">
                    <p
                      className={cn(
                        "font-medium",
                        task.status === "completed" && "line-through text-muted-foreground"
                      )}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {task.subjects && (
                        <Badge
                          variant="outline"
                          style={{ borderColor: task.subjects.color, color: task.subjects.color }}
                        >
                          {task.subjects.name}
                        </Badge>
                      )}
                      <Badge variant="secondary" className={priorityColors[task.priority]}>
                        {task.priority}
                      </Badge>
                      {task.due_date && (
                        <span className="text-xs text-muted-foreground">
                          Due {format(new Date(task.due_date), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={task.status}
                    onValueChange={(v) => updateTaskStatus(task.id, v as Task["status"])}
                  >
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
