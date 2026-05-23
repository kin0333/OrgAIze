import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features will not work.")
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export const getVisionModel = () => {
  if (!genAI) {
    throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in .env.local")
  }
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
}

export const getTextModel = () => {
  if (!genAI) {
    throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in .env.local")
  }
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
}
