"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, FileText, Upload, Loader2, BookOpen, Brain, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import { generateStudyMaterial } from "@/app/actions/ai-summarizer"

interface AISummarizerClientProps {
  userId: string
}

interface AIResult {
  summary: string
  flashcards: { question: string; answer: string }[]
}

export function AISummarizerClient({ userId }: AISummarizerClientProps) {
  const [inputText, setInputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<AIResult | null>(null)
  const [activeTab, setActiveTab] = useState("input")

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast.error("Please paste some notes or upload a file first")
      return
    }

    setIsGenerating(true)
    try {
      const response = await generateStudyMaterial(inputText)
      if (!response.success) {
        throw new Error(response.error)
      }
      setResult(response.data)
      setActiveTab("result")
      toast.success("AI Summary & Flashcards generated!")
    } catch (error: any) {
      toast.error(error.message || "Failed to generate material")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file")
      return
    }

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      
      const response = await generateStudyMaterial(formData)
      if (!response.success) {
        throw new Error(response.error)
      }
      setResult(response.data)
      setActiveTab("result")
      toast.success("PDF analyzed and summarized!")
    } catch (error: any) {
      toast.error(error.message || "Failed to analyze PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
        <TabsTrigger value="input">Input Material</TabsTrigger>
        <TabsTrigger value="result" disabled={!result}>View Results</TabsTrigger>
      </TabsList>

      <TabsContent value="input" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                <CardTitle>Paste Notes</CardTitle>
              </div>
              <CardDescription>Paste your lecture notes or textbook snippets here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type or paste your notes here..."
                className="min-h-[300px] bg-background/50 border-white/10"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button 
                onClick={handleGenerate} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                disabled={isGenerating || !inputText.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10 border-dashed">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle>Upload PDF</CardTitle>
              </div>
              <CardDescription>Drag and drop your study PDFs here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-white/10 rounded-xl bg-background/20 hover:bg-background/30 transition-colors cursor-pointer group">
                <input
                  type="file"
                  id="pdf-upload"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileUpload}
                />
                <label 
                  htmlFor="pdf-upload" 
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <div className="rounded-full bg-emerald-500/10 p-4 group-hover:scale-110 transition-transform">
                    <Upload className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="mt-4 text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="mt-1 text-xs text-muted-foreground text-center px-4">
                    PDF files only (Max 10MB). Text will be extracted automatically.
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="result" className="mt-6">
        {result && (
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="group lg:col-span-2 transition-all duration-300 hover:scale-[1.01] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500 transition-transform duration-300 group-hover:scale-110" />
                    <CardTitle>AI Summary</CardTitle>
                  </div>
                  <CardDescription>Generated based on your provided material</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("input")}>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Start Over
                </Button>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="rounded-xl bg-background/30 p-6 border border-white/5 leading-relaxed">
                    {result.summary}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-white/30 dark:hover:border-white/20 hover:shadow-2xl bg-background/40 backdrop-blur-xl border-white/20 dark:border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle>Quick Flashcards</CardTitle>
                </div>
                <CardDescription>Key concepts to remember</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.flashcards.map((card, idx) => (
                  <div key={idx} className="group p-4 rounded-xl border border-white/10 bg-background/20 hover:bg-background/30 transition-all cursor-help">
                    <p className="text-sm font-semibold text-primary mb-2">Q: {card.question}</p>
                    <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      A: {card.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
