import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;
const requestLog: { timestamp: number }[] = [];

function isRateLimited() {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  while (requestLog.length > 0 && requestLog[0].timestamp < windowStart) {
    requestLog.shift();
  }
  
  return requestLog.length >= MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    // Check rate limit
    if (isRateLimited()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    requestLog.push({ timestamp: Date.now() });

    const { symptoms } = await request.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Invalid symptoms provided" },
        { status: 400 }
      );
    }

    const prompt = `
      As a medical AI assistant, analyze these symptoms and provide detailed information in JSON format:
      Symptoms: ${symptoms.join(", ")}
      
      Please provide:
      - Top 3 possible diseases with probability scores
      - Description, causes, risk factors, and precautions for each disease
      - Recommended medications (OTC & prescribed)
      - Suggested diet plan and exercises
      - General preventive measures

      Format the response strictly as valid JSON:
      {
        "diseases": [
          {
            "name": "",
            "probability": 0,
            "description": "",
            "causes": [],
            "riskFactors": [],
            "precautions": []
          }
        ],
        "generalPrecautions": [],
        "medications": {
          "otc": [],
          "prescribed": []
        },
        "dietPlan": {
          "recommended": [],
          "avoid": []
        },
        "workouts": []
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    
    // Ensure JSON is properly extracted and parsed
    const cleanedResponse = result.response.text().replace(/```json|```/g, '').trim();
    
    try {
      const data = JSON.parse(cleanedResponse);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Failed to parse Gemini API response:", parseError);
      return NextResponse.json(
        { error: "Invalid AI response. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}