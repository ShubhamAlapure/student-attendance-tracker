import Link from "next/link"
import Image from "next/image"
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
      <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-white/10 bg-background/40 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
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
        <section className="container mx-auto px-4 py-20 text-center relative lg:py-32 overflow-hidden lg:overflow-visible">
          {/* Floating Image 1 */}
          <div className="absolute -top-10 -left-10 hidden xl:block animate-float w-56 h-64 rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl z-0 rotate-3">
            <Image src="/images/float1.png" alt="Student" fill className="object-cover" />
            <div className="absolute top-4 left-4 bg-blue-500 rounded-lg p-2 shadow-lg">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Floating Image 2 */}
          <div className="absolute top-20 -right-20 hidden xl:block animate-float-delayed w-64 h-72 rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl z-0 -rotate-3">
            <Image src="/images/float2.png" alt="Collaboration" fill className="object-cover" />
            <div className="absolute bottom-6 right-6 bg-emerald-500 rounded-lg p-2 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Floating Image 3 */}
          <div className="absolute -bottom-10 right-1/4 hidden xl:block animate-float-slow w-48 h-56 rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl z-0 rotate-12">
            <Image src="/images/float3.png" alt="Dashboard" fill className="object-cover" />
            <div className="absolute top-1/2 -left-4 bg-pink-500 rounded-full p-3 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
              <Brain className="h-4 w-4" />
              <span>AI-Powered Academic Tracking</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Track Your Academic Journey with{" "}
              <span className="text-primary underline decoration-emerald-500/30 decoration-4 underline-offset-8">Intelligence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
              Manage tasks, track grades, monitor attendance, and get AI-powered predictions
              to improve your academic performance. Built for students who want to excel.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="rounded-full px-8 shadow-lg shadow-primary/20">
                <Link href="/auth/sign-up">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 backdrop-blur-sm">
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
              <Card 
                key={feature.title} 
                className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/20 dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] hover:bg-background/60"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <CardHeader className="relative z-10">
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
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
              <div className="relative p-8 md:p-12 bg-background/20 backdrop-blur-sm border-l border-white/10 flex flex-col justify-center">
                <div className="space-y-4 relative z-10">
                  {[
                    { step: "1", title: "Create your account", desc: "Sign up in seconds", color: "from-blue-500 to-cyan-400" },
                    { step: "2", title: "Add your subjects", desc: "Set up your courses", color: "from-purple-500 to-pink-500" },
                    { step: "3", title: "Track everything", desc: "Tasks, marks, attendance", color: "from-orange-500 to-red-500" },
                    { step: "4", title: "Get AI insights", desc: "Improve with predictions", color: "from-emerald-500 to-teal-400" },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group relative flex items-center gap-5 rounded-2xl border border-border/40 bg-background/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-background/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/20 dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
                    >
                      <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-white font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        {/* Soft glow effect behind the number */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-100`}></div>
                        <span className="relative z-10 text-xl">{item.step}</span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
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
