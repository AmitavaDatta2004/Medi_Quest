export const getMedicationsPrompt = () => `Analyze this medical report image and suggest relevant medications:

1. List both prescription and OTC medications
2. Explain the purpose of each medication
3. Include typical dosage information
4. Note potential side effects and interactions

Format the response as a JSON string with the following structure:
{
  "medications": [{
    "name": "string - Medication name",
    "type": "string - 'prescription' | 'OTC'",
    "purpose": "string - What the medication treats",
    "dosage": "string - Typical dosage information",
    "sideEffects": ["string - Common side effects"],
    "interactions": ["string - Known drug interactions"],
    "warnings": ["string - Important precautions"]
  }]
}`;