"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"

interface Subject {
  id: string
  name: string
  color: string
}

export function AddMarkDialog({
  subjects,
  userId,
}: {
  subjects: Subject[]
  userId: string
}) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [examName, setExamName] = useState("")
  const [marksObtained, setMarksObtained] = useState("")
  const [totalMarks, setTotalMarks] = useState("")
  const [examDate, setExamDate] = useState("")
  const [subjectId, setSubjectId] = useState<string>("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subjectId) return
    setIsLoading(true)

    const { error } = await supabase.from("marks").insert({
      user_id: userId,
      subject_id: subjectId,
      exam_name: examName,
      marks_obtained: parseFloat(marksObtained),
      total_marks: parseFloat(totalMarks),
      exam_date: examDate || new Date().toISOString().split("T")[0],
    })

    setIsLoading(false)

    if (!error) {
      setOpen(false)
      setExamName("")
      setMarksObtained("")
      setTotalMarks("")
      setExamDate("")
      setSubjectId("")
      router.refresh()
    }
  }

  if (subjects.length === 0) {
    return (
      <Button disabled>
        <Plus className="mr-2 h-4 w-4" />
        Add Mark (Add subjects first)
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Mark
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Exam Result</DialogTitle>
            <DialogDescription>
              Record a new exam or test score
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subjectId} onValueChange={setSubjectId} required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        />
                        {subject.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="examName">Exam Name</Label>
              <Input
                id="examName"
                placeholder="Midterm Exam"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marksObtained">Marks Obtained</Label>
                <Input
                  id="marksObtained"
                  type="number"
                  placeholder="85"
                  value={marksObtained}
                  onChange={(e) => setMarksObtained(e.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  placeholder="100"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  required
                  min="1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date</Label>
              <Input
                id="examDate"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !subjectId}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Result"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
