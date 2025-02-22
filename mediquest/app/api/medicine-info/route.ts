import { NextResponse } from "next/server";
import { GeminiService } from "@/lib/api/gemini1";
import { validateMedicineName } from "@/lib/api/validators1";
import { getMedicineDetailsPrompt } from "@/lib/api/prompts/medicine-details";
import { handleAPIError } from "@/lib/api/errors1";

export async function POST(req: Request) {
  try {
    // Validate request body
    const body = await req.json();
    const { medicineName, language } = body;

    // Validate medicine name
    validateMedicineName({ medicineName });

    // Initialize Gemini service
    const geminiService = new GeminiService(process.env.GEMINI_API_KEY!);

    // Generate prompt with language selection
    const prompt = getMedicineDetailsPrompt(medicineName, language);
    const medicineData = await geminiService.generateContent(prompt);

    return NextResponse.json(medicineData);
  } catch (error) {
    const { error: responseError, status } = handleAPIError(error);
    return NextResponse.json(responseError, { status });
  }
}