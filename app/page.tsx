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
  TrendingUp,
  ListTodo,
  ChevronDown,
  LayoutDashboard,
  FileText,
  LineChart,
  Instagram,
  Twitter,
  Github,
  Users,
  Building2,
  Globe,
  ShieldCheck,
  Zap,
  MessageSquare,
  Play,
  PartyPopper,
  X,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">StudyTracker</span>
            </Link>

            <NavigationMenu className="hidden md:flex" viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 transition-colors">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100] bg-popover text-popover-foreground shadow-2xl rounded-xl border">
                    <div className="grid w-[600px] gap-8 p-6 md:w-[700px] lg:w-[850px] grid-cols-3">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Organize</h4>
                        <ul className="grid gap-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/auth/sign-up" className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
                                <ListTodo className="h-5 w-5 text-blue-500 mt-1" />
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">Task Manager</p>
                                  <p className="text-xs text-muted-foreground">Prioritize and track assignments</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/auth/sign-up" className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
                                <Calendar className="h-5 w-5 text-amber-500 mt-1" />
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">Attendance</p>
                                  <p className="text-xs text-muted-foreground">Monitor class consistency</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Learn</h4>
                        <ul className="grid gap-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/auth/sign-up" className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
                                <Brain className="h-5 w-5 text-purple-500 mt-1" />
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">AI Summarizer</p>
                                  <p className="text-xs text-muted-foreground">Instant notes from your PDFs</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/auth/sign-up" className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
                                <Sparkles className="h-5 w-5 text-cyan-500 mt-1" />
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">Study Buddy</p>
                                  <p className="text-xs text-muted-foreground">AI-powered study recommendations</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Track</h4>
                        <ul className="grid gap-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/auth/sign-up" className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
                                <LineChart className="h-5 w-5 text-emerald-500 mt-1" />
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">Grade Analysis</p>
                                  <p className="text-xs text-muted-foreground">Visualize your academic trends</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/auth/sign-up" className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
                                <LayoutDashboard className="h-5 w-5 text-rose-500 mt-1" />
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">Dashboard</p>
                                  <p className="text-xs text-muted-foreground">All your stats in one premium view</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 transition-colors">
                    Educators & Enterprise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100] bg-popover text-popover-foreground shadow-2xl rounded-xl border">
                    <div className="grid w-[600px] gap-8 p-6 md:w-[800px] lg:w-[950px] grid-cols-4">
                      <div className="space-y-4">
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex flex-col gap-2 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <Users className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">For Teachers</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Teach smarter and save time with AI educator tools.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>

                      <div className="space-y-4">
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex flex-col gap-2 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <Building2 className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">For Enterprise</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Institution-wide solutions for schools and universities.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>

                      <div className="space-y-4">
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex flex-col gap-2 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <Globe className="h-5 w-5 text-emerald-500" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">Our Mission</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Read more about our mission in education.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>

                      <div className="space-y-4">
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex flex-col gap-2 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <ShieldCheck className="h-5 w-5 text-purple-500" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">Our Principles</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Learn about our commitment to privacy and ethical AI.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 transition-colors">
                    News
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100] bg-popover text-popover-foreground shadow-2xl rounded-xl border">
                    <div className="grid w-[500px] gap-6 p-6 md:w-[600px] grid-cols-2">
                      <div className="space-y-4">
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <Zap className="h-5 w-5 text-yellow-500 mt-1" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">What's New</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Stay updated with our latest feature releases.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <BookOpen className="h-5 w-5 text-blue-500 mt-1" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">Blog</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Expert study tips and student success stories.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-4">
                        <NavigationMenuLink asChild>
                          <Link href="/auth/sign-up" className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
                            <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
                            <div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">Community</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">Join thousands of students on our Discord.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <p className="text-xs font-bold text-primary uppercase mb-2">Editor's Choice</p>
                          <p className="text-sm font-medium leading-snug">How AI is changing the way we prepare for exams.</p>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <nav className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center relative lg:py-32 overflow-hidden lg:overflow-visible">
          {/* Floating Image 1 - Horizontal Boy */}
          <div className="absolute top-10 -left-10 hidden xl:block animate-float w-48 h-32 rounded-2xl overflow-hidden z-0 shadow-xl">
            <Image src="/images/hero-boy.png" alt="Student learning" fill className="object-cover scale-105" />
            <div className="absolute top-2 left-2 bg-blue-500 rounded-lg p-1.5 shadow-lg">
              <CheckSquare className="h-4 w-4 text-white" />
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

        <section className="container mx-auto px-4 py-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary/[0.03] dark:bg-white/[0.02] border border-white/10 px-8 py-20 md:px-20 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl font-bold tracking-tight md:text-6xl leading-[1.1]">
                    Ready to transform how you <span className="text-primary">study?</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                    Get tips on studying smarter and updates on new AI features to boost your academic performance.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20" asChild>
                    <Link href="/auth/sign-up">
                      Start for Free
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 bg-background/50" asChild>
                    <Link href="/auth/login">
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-50"></div>
                {/* Mockup or decorative element can go here */}
                <div className="relative h-full w-full rounded-3xl border border-white/10 bg-background/40 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                  <Sparkles className="h-24 w-24 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn Faster Section */}
        <section className="container mx-auto px-4 py-24 border-t border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-500 animate-bounce-slow">
                <PartyPopper className="h-4 w-4" />
                <span className="font-semibold tracking-tight">We just hit 2 million users!</span>
                <ArrowRight className="h-4 w-4" />
              </div>

              <div className="space-y-6">
                <h2 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                  Learn Faster... <br />
                  <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Like, a Lot Faster</span>
                </h2>
                <p className="text-2xl text-muted-foreground max-w-lg leading-relaxed">
                  StudyTracker is the #1 AI study tool & note taker — Ace your exams & crush your homework 10x faster.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <Button size="lg" className="rounded-2xl px-10 h-16 text-lg font-bold bg-gradient-to-r from-orange-600 to-red-500 hover:scale-[1.02] transition-transform shadow-2xl shadow-orange-500/20" asChild>
                  <Link href="/auth/sign-up">Start Learning Faster</Link>
                </Button>
                <Button variant="ghost" size="lg" className="rounded-2xl h-16 px-8 text-lg font-semibold gap-3 hover:bg-white/5" asChild>
                  <Link href="#">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                    Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <Image 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                        alt="User" 
                        width={40} 
                        height={40} 
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Loved by <span className="text-foreground font-bold">2,000,000+</span> students
                </p>
              </div>
            </div>

            <div className="relative lg:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent blur-[120px] opacity-50"></div>
              <div className="relative rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10] flex">
                {/* Real Dashboard Sidebar Mockup */}
                <div className="w-[20%] border-r border-white/5 bg-black/40 p-4 space-y-6 hidden md:block">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="h-3 w-20 rounded bg-white/20" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${i === 1 ? 'bg-white/10' : ''}`}>
                        <div className="h-4 w-4 rounded bg-white/10" />
                        <div className="h-2 w-16 rounded bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real Dashboard Content Mockup */}
                <div className="flex-1 p-6 space-y-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <div className="h-5 w-32 rounded bg-white/20" />
                      <div className="h-3 w-48 rounded bg-white/10" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/10" />
                      <div className="h-8 w-8 rounded-full bg-white/20" />
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: CheckSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
                      { icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                      { icon: Calendar, color: "text-amber-500", bg: "bg-amber-500/10" },
                      { icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" }
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="h-2 w-12 rounded bg-white/10" />
                          <item.icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <div className="space-y-1">
                          <div className="h-4 w-8 rounded bg-white/20" />
                          <div className="h-2 w-16 rounded bg-white/5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart and Tasks */}
                  <div className="grid grid-cols-5 gap-4 h-full">
                    <div className="col-span-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4 space-y-4">
                      <div className="h-3 w-24 rounded bg-white/10" />
                      <div className="flex items-end gap-2 h-32 pt-4">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-t-sm" 
                            style={{ 
                              height: `${h}%`, 
                              backgroundColor: i === 0 ? '#f59e0b' : i === 1 ? '#10b981' : i === 2 ? '#6366f1' : i === 3 ? '#3b82f6' : i === 4 ? '#8b5cf6' : '#ec4899' 
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 rounded-2xl bg-white/[0.03] border border-white/5 p-4 space-y-3">
                      <div className="h-3 w-20 rounded bg-white/10 mb-2" />
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full border border-white/20" />
                          <div className="space-y-1 flex-1">
                            <div className="h-2 w-full rounded bg-white/10" />
                            <div className="h-1.5 w-12 rounded bg-white/5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="container mx-auto px-4 py-24 border-t border-white/10">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Why Our AI Study Tool Outperforms Traditional Methods
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the advantages of AI-powered studying compared to conventional methods. Our approach is designed to save you time and boost retention.
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            {/* Background Glow for Highlighted Column */}
            <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-full md:w-1/3 bg-orange-600/5 blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10 items-stretch">
              {/* Labels Column */}
              <div className="hidden md:flex flex-col justify-around py-20 text-lg font-bold text-muted-foreground pr-8">
                <div className="h-40 flex items-center">Evidence-Based Techniques vs. Conventional Learning</div>
                <div className="h-40 flex items-center">Speed and Personalization at Your Fingertips</div>
                <div className="h-40 flex items-center">Cost-Effectiveness and Convenience</div>
              </div>

              {/* StudyTracker AI Column (Highlighted) */}
              <div className="relative rounded-[2rem] border border-orange-500/20 bg-gradient-to-b from-orange-500/[0.08] to-transparent p-8 md:p-12 shadow-2xl">
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-black text-orange-500 uppercase tracking-widest">StudyTracker AI</h3>
                </div>
                
                <div className="space-y-20">
                  <div className="space-y-4">
                    <div className="md:hidden font-bold text-orange-500 mb-2">Evidence-Based Techniques</div>
                    {[
                      "Active recall techniques built-in",
                      "Spaced repetition algorithms",
                      "Real-time feedback and insights"
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckSquare className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-sm font-semibold">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="md:hidden font-bold text-orange-500 mb-2">Speed and Personalization</div>
                    {[
                      "Instant AI-generated study materials",
                      "Personalized learning experience",
                      "Adaptive content based on progress"
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckSquare className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-sm font-semibold">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="md:hidden font-bold text-orange-500 mb-2">Cost-Effectiveness</div>
                    {[
                      "Affordable subscription with all features",
                      "All-in-one study platform",
                      "Available 24/7, study anywhere"
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckSquare className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-sm font-semibold">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Traditional Methods Column */}
              <div className="flex flex-col justify-around py-12 md:py-20 md:pl-12 space-y-20 md:space-y-0">
                <div className="md:hidden text-center mb-4">
                  <h3 className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Traditional Methods</h3>
                </div>
                
                <div className="space-y-4 opacity-40">
                  <div className="md:hidden font-bold mb-2">Conventional Learning</div>
                  {[
                    "Passive reading and highlighting",
                    "Repetitive reviewing without feedback",
                    "Inefficient time allocation"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 opacity-40">
                  <div className="md:hidden font-bold mb-2">Manual Methods</div>
                  {[
                    "Hours spent creating manual study materials",
                    "One-size-fits-all approach",
                    "Limited ability to adapt to your needs"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 opacity-40">
                  <div className="md:hidden font-bold mb-2">Convenience Issues</div>
                  {[
                    "Expensive private tutors ($50-100/hr)",
                    "Multiple tools and subscriptions",
                    "Limited availability and scheduling issues"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-24 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-md">
                Find answers about StudyTracker, how our AI works, and how we support your academic journey.
              </p>
              <Button variant="outline" className="rounded-full px-8" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    Will StudyTracker actually help me do better on my exams?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    Yes. StudyTracker builds a personalized study plan from your materials, breaking them into an ordered sequence of topics so you learn things the right way. Instead of guessing what to review, you get flashcards, quizzes, practice tests, and more built from exactly what you need to know.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    How does StudyTracker know what I need to study?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    Our AI analyzes your uploaded PDFs, notes, and attendance habits to identify knowledge gaps. It then cross-references your curriculum requirements to ensure you're focusing on the highest-impact topics first.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    How do I know if I'm actually learning?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    We provide real-time grade analysis and performance predictions. By visualizing your progress through data, you can see exactly where your understanding is growing and where you might need an extra review session.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-2xl px-6 bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    What if my exam is tomorrow?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    Don't panic. Our AI Summarizer can take hundreds of pages of textbooks and condense them into high-yield revision notes and flashcards in seconds, allowing you to focus on the essentials during your last-minute study push.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-2xl px-6 bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    Who uses StudyTracker?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    StudyTracker is designed for students at all levels—from high schoolers looking to stay organized to PhD candidates managing complex research materials. If you have academic goals, StudyTracker is for you.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex justify-center pt-8 lg:justify-start">
                <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-primary">
                  See more
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary/[0.03] dark:bg-white/[0.02] border-t border-white/10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">Website</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/auth/login" className="hover:text-primary transition-colors">Login</Link></li>
                <li><Link href="/auth/sign-up" className="hover:text-primary transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">Helpful</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Email Support</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Feedback</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">Use Cases</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">For High School</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">For University</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">For Educators</Link></li>
              </ul>
            </div>

            <div className="col-span-2 space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">Our Features</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">Task Manager</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Attendance</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Grade Analysis</Link></li>
                </ul>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">AI Summarizer</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Study Buddy</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Dashboard</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 pt-12 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold tracking-tight">StudyTracker</span>
              </div>
              
              <div className="flex items-center gap-6">
                {[Instagram, Twitter, Github].map((Icon, idx) => (
                  <Link key={idx} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} StudyTracker Inc. All Rights Reserved.</p>
              <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Privacy</Link>
                <Link href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Terms</Link>
                <Link href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
