import { NextResponse } from "next/server";
import { GeminiService } from "@/lib/api/gemini1";
import { validateMedicineName } from "@/lib/api/validators1";
import { getMedicineDetailsPrompt } from "@/lib/api/prompts/medicine-details";
import { handleAPIError } from "@/lib/api/errors1";


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

export async function POST(req: Request) {
  try {


    // Check rate limit
    if (isRateLimited()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    requestLog.push({ timestamp: Date.now() });
    // Validate request body
    const body = await req.json();
    const { medicineName, language, location } = body;

    // Validate medicine name
    validateMedicineName({ medicineName });

    // Initialize Gemini service
    const geminiService = new GeminiService(process.env.GEMINI_API_KEY!);

    // Generate prompt including location
    const prompt = getMedicineDetailsPrompt(medicineName, language, location);
    const medicineData = await geminiService.generateContent(prompt);

    return NextResponse.json(medicineData);
  } catch (error) {
    const { error: responseError, status } = handleAPIError(error);
    return NextResponse.json(responseError, { status });
  }
}
