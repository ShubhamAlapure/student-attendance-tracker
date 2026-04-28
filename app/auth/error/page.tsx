import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Authentication Error</h1>
          <p className="text-muted-foreground">
            Something went wrong during authentication. Please try again.
          </p>
        </div>
        <Button asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  )
}
