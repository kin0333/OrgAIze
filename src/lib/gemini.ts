import OpenAI from "openai"

const apiKey = process.env.OPENROUTER_API_KEY

if (!apiKey) {
  console.warn("OPENROUTER_API_KEY is not set. AI features will not work.")
}

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey || "dummy-key-to-prevent-crash",
})

export const GEMINI_MODEL = "google/gemini-2.0-flash-001"
