"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Calendar,
  BarChart3,
  Brain,
  GraduationCap,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/dashboard/marks", label: "Marks", icon: BookOpen },
  { href: "/dashboard/attendance", label: "Attendance", icon: Calendar },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/predictions", label: "Predictions", icon: Brain },
  { href: "/dashboard/subjects", label: "Subjects", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-white/20 dark:border-white/10 bg-background/40 backdrop-blur-xl lg:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">StudyTracker</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
