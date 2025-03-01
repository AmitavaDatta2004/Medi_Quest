import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 2000; // 1 minute
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

    const {
      symptoms,
      language = "English",
      location,
      healthQuestions,
    } = await request.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Invalid symptoms provided" },
        { status: 400 }
      );
    }

    const prompt = `
    As a medical AI assistant, analyze the given symptoms and provide a comprehensive diagnosis report in strict JSON format.
  
    Symptoms: ${symptoms.join(", ")}
    Location: ${location}
    Health Questions:
    - Chronic Illnesses: ${healthQuestions.chronicIllnesses}
    - Medications and Allergies: ${healthQuestions.medicationsAllergies}
    - Surgeries and Vaccinations: ${healthQuestions.surgeriesVaccinations}
    - Lifestyle: ${healthQuestions.lifestyle}
    - Sleep Pattern: ${healthQuestions.sleepPattern}
  
    Your response should include:
  
    1. **Top 5 possible diseases** ranked by probability, along with:
       - Probability score (between 0 and 1)
       - Detailed description of each disease
       - Causes and contributing factors
       - Associated risk factors
       - Recommended precautions
  
    2. **General health precautions** applicable to the given symptoms.
  
    3. **Medications** categorized into:
       - Over-the-counter (OTC) options
       - Prescription medications
  
    4. **Dietary recommendations**, including:
       - Foods to consume
       - Foods to avoid
  
    5. **Suggested exercises and physical activities** to aid recovery or manage symptoms.
  
    6. **5 Recommended doctors** in the given location, including:
       - Doctor's name
       - Speciality
       - Location
  
    Ensure the response follows this exact JSON structure and is written in ${language}:
  
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
      "workouts": [],
      "doctors": {
      
        [
          "name": "",
          "speciality": "",
          "location": ""
       ]
      }
    }
  `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    // Ensure JSON is properly extracted and parsed
    const cleanedResponse = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

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
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
