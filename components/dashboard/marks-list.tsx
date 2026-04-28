"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface Mark {
  id: string
  exam_name: string
  marks_obtained: number
  total_marks: number
  exam_date: string
  subject_id: string
  subjects: { name: string; color: string } | null
}

interface Subject {
  id: string
  name: string
  color: string
}

export function MarksList({
  marks: initialMarks,
  subjects,
  userId,
}: {
  marks: Mark[]
  subjects: Subject[]
  userId: string
}) {
  const [marks, setMarks] = useState(initialMarks)
  const router = useRouter()
  const supabase = createClient()

  const deleteMark = async (markId: string) => {
    const { error } = await supabase
      .from("marks")
      .delete()
      .eq("id", markId)
      .eq("user_id", userId)

    if (!error) {
      setMarks(marks.filter((m) => m.id !== markId))
    }
  }

  const getPercentage = (obtained: number, total: number) => {
    return Math.round((obtained / total) * 100)
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600 bg-emerald-100"
    if (percentage >= 75) return "text-blue-600 bg-blue-100"
    if (percentage >= 50) return "text-amber-600 bg-amber-100"
    return "text-red-600 bg-red-100"
  }

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B"
    if (percentage >= 60) return "C"
    if (percentage >= 50) return "D"
    return "F"
  }

  // Calculate stats
  const totalMarks = marks.length
  const averagePercentage = totalMarks > 0
    ? Math.round(marks.reduce((acc, m) => acc + getPercentage(m.marks_obtained, m.total_marks), 0) / totalMarks)
    : 0

  if (marks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No marks recorded yet</p>
          <p className="text-muted-foreground">Add your first exam result to start tracking</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMarks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{averagePercentage}%</span>
              <Badge className={getGradeColor(averagePercentage)}>
                {getGrade(averagePercentage)}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {averagePercentage >= 75 ? (
                <>
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span className="text-lg font-medium text-emerald-600">Excellent</span>
                </>
              ) : averagePercentage >= 50 ? (
                <>
                  <Minus className="h-5 w-5 text-amber-600" />
                  <span className="text-lg font-medium text-amber-600">Average</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  <span className="text-lg font-medium text-red-600">Needs Improvement</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {marks.map((mark) => {
              const percentage = getPercentage(mark.marks_obtained, mark.total_marks)
              return (
                <TableRow key={mark.id}>
                  <TableCell className="font-medium">{mark.exam_name}</TableCell>
                  <TableCell>
                    {mark.subjects && (
                      <Badge
                        variant="outline"
                        style={{ borderColor: mark.subjects.color, color: mark.subjects.color }}
                      >
                        {mark.subjects.name}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {mark.marks_obtained}/{mark.total_marks}
                  </TableCell>
                  <TableCell>{percentage}%</TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(percentage)}>
                      {getGrade(percentage)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(mark.exam_date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteMark(mark.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
