"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Brain,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react"

interface Mark {
  marks_obtained: number
  total_marks: number
  exam_date: string
  subjects: { name: string; color: string } | null
}

interface Attendance {
  status: string
  date: string
  subjects: { name: string } | null
}

interface Task {
  status: string
  priority: string
  due_date: string | null
}

interface PredictionEngineProps {
  marks: Mark[]
  attendance: Attendance[]
  tasks: Task[]
}

export function PredictionEngine({ marks, attendance, tasks }: PredictionEngineProps) {
  const predictions = useMemo(() => {
    // Calculate current performance
    const percentages = marks.map(
      (m) => (Number(m.marks_obtained) / Number(m.total_marks)) * 100
    )
    const currentAverage = percentages.length > 0
      ? percentages.reduce((a, b) => a + b, 0) / percentages.length
      : 0

    // Calculate trend (simple linear regression-like approach)
    let trend: "improving" | "declining" | "stable" = "stable"
    if (percentages.length >= 3) {
      const recentAvg = percentages.slice(-3).reduce((a, b) => a + b, 0) / 3
      const olderAvg = percentages.slice(0, -3).reduce((a, b) => a + b, 0) / Math.max(percentages.length - 3, 1)
      if (recentAvg > olderAvg + 5) trend = "improving"
      else if (recentAvg < olderAvg - 5) trend = "declining"
    }

    // Predict next exam score (weighted moving average)
    const weights = [0.1, 0.2, 0.3, 0.4]
    const recentMarks = percentages.slice(-4)
    let predictedScore = currentAverage
    if (recentMarks.length >= 2) {
      const weightedSum = recentMarks.reduce((sum, score, i) => {
        const weight = weights[i] || 0.25
        return sum + score * weight
      }, 0)
      const totalWeight = recentMarks.reduce((sum, _, i) => sum + (weights[i] || 0.25), 0)
      predictedScore = weightedSum / totalWeight
      
      // Adjust based on trend
      if (trend === "improving") predictedScore += 3
      else if (trend === "declining") predictedScore -= 3
    }
    predictedScore = Math.min(100, Math.max(0, Math.round(predictedScore)))

    // Calculate attendance impact
    const presentCount = attendance.filter((a) => a.status === "present" || a.status === "late").length
    const attendanceRate = attendance.length > 0 ? (presentCount / attendance.length) * 100 : 100
    let attendanceImpact = 0
    if (attendanceRate < 75) attendanceImpact = -5
    else if (attendanceRate >= 90) attendanceImpact = 3

    // Task completion analysis
    const completedTasks = tasks.filter((t) => t.status === "completed").length
    const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0
    const pendingHighPriority = tasks.filter(
      (t) => t.status !== "completed" && t.priority === "high"
    ).length

    // Generate subject-specific predictions
    const subjectPerformance = new Map<string, number[]>()
    marks.forEach((mark) => {
      const subject = mark.subjects?.name ?? "Unknown"
      const percentage = (Number(mark.marks_obtained) / Number(mark.total_marks)) * 100
      if (!subjectPerformance.has(subject)) {
        subjectPerformance.set(subject, [])
      }
      subjectPerformance.get(subject)!.push(percentage)
    })

    const subjectPredictions = Array.from(subjectPerformance.entries()).map(([subject, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      const predicted = Math.min(100, Math.max(0, Math.round(avg + (trend === "improving" ? 2 : trend === "declining" ? -2 : 0))))
      return { subject, current: Math.round(avg), predicted }
    })

    // Generate recommendations
    const recommendations: string[] = []
    if (attendanceRate < 75) {
      recommendations.push("Your attendance is below 75%. Try to attend more classes to improve your performance.")
    }
    if (pendingHighPriority > 0) {
      recommendations.push(`You have ${pendingHighPriority} high-priority task(s) pending. Focus on completing them first.`)
    }
    if (trend === "declining") {
      recommendations.push("Your recent scores show a declining trend. Consider dedicating more study time.")
    }
    if (taskCompletionRate < 50 && tasks.length > 5) {
      recommendations.push("Your task completion rate is low. Break down tasks into smaller, manageable pieces.")
    }
    if (subjectPredictions.some((s) => s.current < 50)) {
      const weakSubjects = subjectPredictions.filter((s) => s.current < 50).map((s) => s.subject)
      recommendations.push(`Focus more on: ${weakSubjects.join(", ")} - these subjects need improvement.`)
    }
    if (recommendations.length === 0) {
      recommendations.push("Great job! Keep up the good work and maintain your current study habits.")
    }

    return {
      currentAverage: Math.round(currentAverage),
      predictedScore,
      trend,
      attendanceRate: Math.round(attendanceRate),
      attendanceImpact,
      taskCompletionRate: Math.round(taskCompletionRate),
      pendingHighPriority,
      subjectPredictions,
      recommendations,
    }
  }, [marks, attendance, tasks])

  const hasEnoughData = marks.length >= 2

  if (!hasEnoughData) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Brain className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium">Not Enough Data</p>
          <p className="text-muted-foreground max-w-md">
            Add at least 2 exam results to enable AI predictions. The more data you provide,
            the more accurate the predictions will be.
          </p>
        </CardContent>
      </Card>
    )
  }

  const TrendIcon = predictions.trend === "improving" 
    ? TrendingUp 
    : predictions.trend === "declining" 
    ? TrendingDown 
    : Minus

  const trendColor = predictions.trend === "improving"
    ? "text-emerald-600"
    : predictions.trend === "declining"
    ? "text-red-600"
    : "text-amber-600"

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance Prediction
            </CardTitle>
            <CardDescription>AI-predicted score for your next exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Average</p>
                <p className="text-3xl font-bold">{predictions.currentAverage}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Predicted Next</p>
                <p className="text-3xl font-bold text-primary">{predictions.predictedScore}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendIcon className={`h-5 w-5 ${trendColor}`} />
              <span className={`font-medium ${trendColor}`}>
                {predictions.trend === "improving" && "Performance Improving"}
                {predictions.trend === "declining" && "Performance Declining"}
                {predictions.trend === "stable" && "Performance Stable"}
              </span>
            </div>
            <Progress value={predictions.predictedScore} className="h-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Contributing Factors
            </CardTitle>
            <CardDescription>Factors affecting your prediction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Attendance Rate</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{predictions.attendanceRate}%</span>
                <Badge 
                  variant="secondary" 
                  className={predictions.attendanceRate >= 75 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
                >
                  {predictions.attendanceImpact > 0 ? `+${predictions.attendanceImpact}` : predictions.attendanceImpact}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Task Completion</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{predictions.taskCompletionRate}%</span>
                {predictions.taskCompletionRate >= 70 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High Priority Pending</span>
              <Badge 
                variant="secondary" 
                className={predictions.pendingHighPriority === 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
              >
                {predictions.pendingHighPriority} tasks
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {predictions.subjectPredictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Predictions</CardTitle>
            <CardDescription>Predicted performance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.subjectPredictions.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        Current: {subject.current}%
                      </span>
                      <span className="text-sm font-medium text-primary">
                        Predicted: {subject.predicted}%
                      </span>
                    </div>
                  </div>
                  <Progress value={subject.predicted} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Personalized suggestions to improve your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {predictions.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-sm">{rec}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
