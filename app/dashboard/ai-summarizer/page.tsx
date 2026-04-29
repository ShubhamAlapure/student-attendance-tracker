import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AISummarizerClient } from "@/components/dashboard/ai-summarizer-client"

export default async function AISummarizerPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Study Summarizer</h1>
        <p className="text-muted-foreground">Transform your study materials into concise summaries and flashcards</p>
      </div>

      <AISummarizerClient userId={user.id} />
    </div>
  )
}
