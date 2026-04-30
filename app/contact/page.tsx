"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Mail, 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  Twitter, 
  Instagram, 
  Github,
  CheckCircle2
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success("Message sent successfully!")
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-white/10 bg-background/40 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          
          {/* Left Side: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                Get in <br />
                <span className="text-primary">Touch.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                Have a question about StudyTracker? We're here to help you excel in your academic journey.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email us at</p>
                  <p className="text-lg font-semibold">support@studytracker.com</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community</p>
                  <p className="text-lg font-semibold">Join our Discord</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, idx) => (
                <Button key={idx} variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-primary hover:text-primary-foreground border-white/10 bg-white/5">
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative">
            {isSubmitted ? (
              <CardContent className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="h-10 w-10 animate-in zoom-in duration-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-[280px]">
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
                  Send another message
                </Button>
              </CardContent>
            ) : (
              <>
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll be in touch soon.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          required 
                          className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          required 
                          className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <select 
                        id="subject"
                        className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help?</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about what you need..." 
                        required 
                        className="bg-white/5 border-white/10 min-h-[150px] rounded-xl focus:ring-primary/50 resize-none p-4" 
                      />
                    </div>
                    <Button 
                      disabled={isSubmitting} 
                      className="w-full h-12 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
