"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { CheckCircle2, XCircle, Clock, Plus, Loader2 } from "lucide-react"

interface Attendance {
  id: string
  date: string
  status: "present" | "absent" | "late"
  subject_id: string | null
  subjects: { name: string; color: string } | null
}

interface Subject {
  id: string
  name: string
  color: string
}

const statusConfig = {
  present: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100", label: "Present" },
  absent: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "Absent" },
  late: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", label: "Late" },
}

export function AttendanceTracker({
  attendance: initialAttendance,
  subjects,
  userId,
}: {
  attendance: Attendance[]
  subjects: Subject[]
  userId: string
}) {
  const [attendance, setAttendance] = useState(initialAttendance)
  const [isAdding, setIsAdding] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [status, setStatus] = useState<"present" | "absent" | "late">("present")
  const [subjectId, setSubjectId] = useState<string>("")
  const router = useRouter()
  const supabase = createClient()

  const handleAdd = async () => {
    if (!subjectId) return
    setIsAdding(true)

    const { data, error } = await supabase
      .from("attendance")
      .insert({
        user_id: userId,
        subject_id: subjectId,
        date,
        status,
      })
      .select(`*, subjects (name, color)`)
      .single()

    setIsAdding(false)

    if (!error && data) {
      setAttendance([data, ...attendance])
      setSubjectId("")
    }
  }

  // Calculate stats
  const presentCount = attendance.filter((a) => a.status === "present").length
  const lateCount = attendance.filter((a) => a.status === "late").length
  const absentCount = attendance.filter((a) => a.status === "absent").length
  const totalCount = attendance.length
  const attendanceRate = totalCount > 0 
    ? Math.round(((presentCount + lateCount) / totalCount) * 100) 
    : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-2xl font-bold">{presentCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Late
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-2xl font-bold">{lateCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold">{absentCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <p className="text-muted-foreground">Add subjects first to track attendance</p>
          ) : (
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-[160px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select subject" />
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
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd} disabled={isAdding || !subjectId}>
                {isAdding ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Add
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          {attendance.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No attendance records yet</p>
          ) : (
            <div className="space-y-2">
              {attendance.map((record) => {
                const config = statusConfig[record.status]
                const StatusIcon = config.icon
                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      <div>
                        <p className="font-medium">
                          {record.subjects?.name ?? "Unknown Subject"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(record.date), "EEEE, MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${config.bg} ${config.color}`}>
                      {config.label}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
