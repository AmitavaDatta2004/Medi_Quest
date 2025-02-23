import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeminiError } from './errors1';
import { MedicineData } from '@/types/medicine';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async generateContent(prompt: string): Promise<MedicineData> {
    try {
      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1, // Lower temperature for more consistent outputs
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      });

      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new GeminiError('Failed to parse medicine information - Invalid response format');
        }
        
        const parsedData = JSON.parse(jsonMatch[0]);
        
        // Deep validation and sanitization of the response
        const validateArray = (arr: any[] | undefined, defaultValue: string[]): string[] => {
          return Array.isArray(arr) ? arr.map(item => String(item || '')).filter(Boolean) : defaultValue;
        };

        const validateString = (str: any, defaultValue: string): string => {
          return typeof str === 'string' ? str : defaultValue;
        };

        const validateNumber = (num: any, defaultValue: number): number => {
          const parsed = Number(num);
          return !isNaN(parsed) ? parsed : defaultValue;
        };

        // Validate and sanitize the entire response structure
        const validatedData: MedicineData = {
          name: validateString(parsedData.name, ''),
          genericName: validateString(parsedData.genericName, ''),
          composition: {
            activeIngredients: validateArray(parsedData.composition?.activeIngredients, []),
            inactiveIngredients: validateArray(parsedData.composition?.inactiveIngredients, []),
            formulationType: validateString(parsedData.composition?.formulationType, ''),
          },
          function: {
            primaryAction: validateString(parsedData.function?.primaryAction, ''),
            mechanismOfAction: validateString(parsedData.function?.mechanismOfAction, ''),
            therapeuticClass: validateString(parsedData.function?.therapeuticClass, ''),
          },
          diseases: validateArray(parsedData.diseases, []),
          sideEffects: {
            common: validateArray(parsedData.sideEffects?.common, []),
            uncommon: validateArray(parsedData.sideEffects?.uncommon, []),
            serious: validateArray(parsedData.sideEffects?.serious, []),
          },
          instructions: {
            generalGuidelines: validateString(parsedData.instructions?.generalGuidelines, ''),
            specialPrecautions: validateString(parsedData.instructions?.specialPrecautions, ''),
            contraindicationGroups: validateArray(parsedData.instructions?.contraindicationGroups, []),
          },
          dosage: {
            standardDose: {
              adult: validateString(parsedData.dosage?.standardDose?.adult, ''),
              pediatric: validateString(parsedData.dosage?.standardDose?.pediatric, ''),
              elderly: validateString(parsedData.dosage?.standardDose?.elderly, ''),
            },
            maximumDailyDose: validateString(parsedData.dosage?.maximumDailyDose, ''),
            durationOfTreatment: validateString(parsedData.dosage?.durationOfTreatment, ''),
            timingConsiderations: validateString(parsedData.dosage?.timingConsiderations, ''),
            missedDose: validateString(parsedData.dosage?.missedDose, ''),
          },
          interactions: {
            drugInteractions: validateArray(parsedData.interactions?.drugInteractions, []),
            foodInteractions: validateArray(parsedData.interactions?.foodInteractions, []),
            conditions: validateArray(parsedData.interactions?.conditions, []),
          },
          storage: {
            temperature: validateString(parsedData.storage?.temperature, ''),
            specialConditions: validateString(parsedData.storage?.specialConditions, ''),
            expiryGuidelines: validateString(parsedData.storage?.expiryGuidelines, ''),
          },
          price: {
            averageRetailPrice: validateString(parsedData.price?.averageRetailPrice, ''),
            unitPrice: validateString(parsedData.price?.unitPrice, ''),
          },
          substitutes: Array.isArray(parsedData.substitutes) 
            ? parsedData.substitutes.map((sub: { 
                name?: string; 
                genericName?: string; 
                price?: string; 
                comparisonNotes?: string; 
              }) => ({
                name: validateString(sub?.name, ''),
                genericName: validateString(sub?.genericName, ''),
                price: validateString(sub?.price, ''),
                comparisonNotes: validateString(sub?.comparisonNotes, ''),
              }))
            : [],
          rating: validateNumber(parsedData.rating, 0),
          reviewCount: validateNumber(parsedData.reviewCount, 0),
          manufacturer: {
            name: validateString(parsedData.manufacturer?.name, ''),
            country: validateString(parsedData.manufacturer?.country, ''),
          },
        };

        return validatedData;
      } catch (parseError) {
        throw new GeminiError('Failed to parse medicine information', { 
          originalError: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
          response: text
        });
      }
    } catch (error) {
      if (error instanceof GeminiError) {
        throw error;
      }
      throw new GeminiError(
        'Failed to generate medicine information',
        { originalError: error instanceof Error ? error.message : 'Unknown error' }
      );
    }
  }
}
