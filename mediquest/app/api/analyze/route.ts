import { NextResponse } from "next/server";
import { validateFile } from "@/lib/api/validators2";
import { handleError } from "@/lib/api/errors2";
import { analyzeImage } from "@/lib/api/gemini2";
import { getUnifiedPrompt } from "../prompts/unified";

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const language = formData.get("language") as string || "english";
    const location = formData.get("location") as string;

    // Validate the uploaded file
    validateFile(file);

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    try {
      // Single API call with unified prompt
      const analysis = await analyzeImage(base64, file.type, getUnifiedPrompt(language, location));

      // Add metadata
      analysis.metadata = {
        analyzedAt: new Date().toISOString(),
        fileType: file.type,
        fileName: file.name
      };

      return NextResponse.json(analysis, { headers });
    } catch (error) {
      console.error('Error during analysis:', error);
      throw error;
    }
  } catch (error) {
    console.error('Request error:', error);
    const { error: errorMessage, code, statusCode } = handleError(error);
    return NextResponse.json(
      { error: errorMessage, code },
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
}