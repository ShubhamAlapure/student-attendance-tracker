import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  GraduationCap,
  CheckSquare,
  BookOpen,
  Calendar,
  BarChart3,
  Brain,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Organize assignments with priorities, due dates, and progress tracking",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: BookOpen,
    title: "Grade Tracking",
    description: "Record and analyze your exam scores across all subjects",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: Calendar,
    title: "Attendance Monitoring",
    description: "Track your class attendance and maintain consistency",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful charts showing your performance trends over time",
    color: "text-violet-600",
    bgColor: "bg-violet-100",
  },
  {
    icon: Brain,
    title: "AI Predictions",
    description: "ML-powered insights predicting your future performance",
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Personalized suggestions to improve your academic results",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">StudyTracker</span>
          </Link>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
              <Brain className="h-4 w-4" />
              <span>AI-Powered Academic Tracking</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Track Your Academic Journey with{" "}
              <span className="text-primary">Intelligence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
              Manage tasks, track grades, monitor attendance, and get AI-powered predictions
              to improve your academic performance. Built for students who want to excel.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Powerful features designed to help you stay on top of your academics
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to Boost Your Academic Performance?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Join thousands of students who are already using StudyTracker to
                  organize their studies and achieve better results.
                </p>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/auth/sign-up">
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-8 md:p-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Create your account</p>
                      <p className="text-sm text-muted-foreground">Sign up in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Add your subjects</p>
                      <p className="text-sm text-muted-foreground">Set up your courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Track everything</p>
                      <p className="text-sm text-muted-foreground">Tasks, marks, attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Get AI insights</p>
                      <p className="text-sm text-muted-foreground">Improve with predictions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <span className="font-semibold">StudyTracker</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for students, by students. Track smarter, not harder.
          </p>
        </div>
      </footer>
    </div>
  )
}
