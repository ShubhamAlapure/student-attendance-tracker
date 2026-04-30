"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"

interface Subject {
  id: string
  name: string
  color: string
  created_at: string
}

export function SubjectsList({
  subjects: initialSubjects,
  userId,
}: {
  subjects: Subject[]
  userId: string
}) {
  const [subjects, setSubjects] = useState(initialSubjects)
  const supabase = createClient()

  const deleteSubject = async (subjectId: string) => {
    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", subjectId)
      .eq("user_id", userId)

    if (!error) {
      setSubjects(subjects.filter((s) => s.id !== subjectId))
    }
  }

  if (subjects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No subjects yet</p>
          <p className="text-muted-foreground">Add your first subject to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => (
        <Card key={subject.id} className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl cursor-pointer">
          <Link href={`/dashboard/subjects/${subject.id}`}>
            <div className="h-2 transition-all duration-300 group-hover:h-3" style={{ backgroundColor: subject.color }} />
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: subject.color + "20" }}
                >
                  <div
                    className="flex h-full items-center justify-center text-lg font-bold"
                    style={{ color: subject.color }}
                  >
                    {subject.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <p className="font-medium transition-colors group-hover:text-foreground">{subject.name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground transition-all duration-300 hover:text-destructive group-hover:opacity-100 sm:opacity-0 relative z-10"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  deleteSubject(subject.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
