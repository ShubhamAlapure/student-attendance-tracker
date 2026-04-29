"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
const pdf = require("pdf-parse")

const apiKey = process.env.GOOGLE_GEMINI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function generateStudyMaterial(content: string | FormData) {
  if (!genAI) {
    throw new Error("Google Gemini API Key is missing. Please add it to your .env.local file.")
  }

  let textToAnalyze = ""

  if (typeof content === "string") {
    textToAnalyze = content
  } else {
    const file = content.get("file") as File
    if (!file) throw new Error("No file uploaded")
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const data = await pdf(buffer)
    textToAnalyze = data.text
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  })

  const prompt = `
    Analyze the following study material and generate:
    1. A concise, professional summary (around 3-4 paragraphs). Use markdown for bullet points or bold text if necessary.
    2. A list of 5 high-quality flashcards (Question and Answer format) that cover the most important concepts.

    Return the result in this JSON format:
    {
      "summary": "...",
      "flashcards": [
        { "question": "...", "answer": "..." }
      ]
    }

    Study Material:
    ${textToAnalyze}
  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  const jsonResponse = JSON.parse(response.text())
  
  return jsonResponse
}
