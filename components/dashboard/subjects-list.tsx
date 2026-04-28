"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

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
        <Card key={subject.id} className="overflow-hidden">
          <div className="h-2" style={{ backgroundColor: subject.color }} />
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-lg"
                style={{ backgroundColor: subject.color + "20" }}
              >
                <div
                  className="flex h-full items-center justify-center text-lg font-bold"
                  style={{ color: subject.color }}
                >
                  {subject.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <p className="font-medium">{subject.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteSubject(subject.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
