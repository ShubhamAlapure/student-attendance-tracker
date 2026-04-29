"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GOOGLE_GEMINI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function generateStudyMaterial(content: string | FormData) {
  try {
    if (!genAI) {
      throw new Error("Google Gemini API Key is missing. Please add it to your environment variables and redeploy.")
    }

    let textToAnalyze = ""

    if (typeof content === "string") {
      textToAnalyze = content
    } else {
      const file = content.get("file") as File
      if (!file) throw new Error("No file uploaded")
      
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Dynamically require pdf-parse so it doesn't break standard text requests
      const pdf = require("pdf-parse")
      const data = await pdf(buffer)
      textToAnalyze = data.text
    }

    if (!textToAnalyze || textToAnalyze.trim() === "") {
      throw new Error("No text could be extracted from the input.")
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

      Return the result strictly as a raw JSON object in this format (no markdown code blocks):
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
    const responseText = result.response.text()
    
    // Safely strip markdown code blocks if the model ignored our instructions
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim()
    
    const jsonResponse = JSON.parse(cleanedText)
    
    return { success: true, data: jsonResponse }
  } catch (error: any) {
    console.error("AI Generation Error:", error)
    return { success: false, error: error.message || "An unexpected error occurred during generation." }
  }
}
