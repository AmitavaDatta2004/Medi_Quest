"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the AnalysisResult interface to match the expected structure
interface Disease {
  name: string;
  probability: number;
  description: string;
  causes?: string[];
  precautions?: string[];
}

interface Medications {
  otc: string[];
  prescribed: string[];
}

interface DietPlan {
  recommended: string[];
  avoid: string[];
}

interface NearbyDoctors {
  name: string[];
  phone: string[];
  location: string[];
  specialties: string[];
}

interface AnalysisResult {
  diseases: Disease[];
  medications: Medications;
  dietPlan: DietPlan;
  workouts: string[]
  doctors: NearbyDoctors[];
}



class RateLimitedGeminiAPI {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Warning: NEXT_PUBLIC_GEMINI_API_KEY is not set");
      // Use a default error message instead of throwing
      this.genAI = new GoogleGenerativeAI("dummy-key");
      return;
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async analyzeSymptomsAndGetDiseases(
    symptoms: string[],
    retries = 3,
    selectedLanguage: string,
    location: string
  ): Promise<AnalysisResult> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error(
        "Please set your NEXT_PUBLIC_GEMINI_API_KEY in the environment variables"
      );
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Sending symptoms to API:`, symptoms);

        const response = await fetch("/api/disease", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms, language: selectedLanguage, location }),
        });

        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `API request failed with status ${response.status}: ${errorText}`
          );
        }

        const data: AnalysisResult = await response.json();
        console.log("Gemini API Response:", data);

        if (!data) {
          throw new Error("Invalid API response format");
        }

        // Ensure the response matches the AnalysisResult structure
        if (
          !data.diseases ||
          !data.medications ||
          !data.dietPlan ||
          !data.workouts ||
          !data.doctors
        ) {
          throw new Error("API response is missing required fields");
        }

        return data;
      } catch (error) {
        console.error(`Error analyzing symptoms (attempt ${attempt}):`, error);

        if (attempt < retries) {
          console.warn(`Retrying in 2 seconds...`);
          await this.wait(2000);
        } else {
          throw error;
        }
      }
    }

    // This line is required to satisfy TypeScript's return type
    throw new Error("All retry attempts failed");
  }
}

export const geminiAPI = new RateLimitedGeminiAPI();