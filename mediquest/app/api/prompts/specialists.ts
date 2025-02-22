export const getSpecialistsPrompt = () => `Based on this medical report image, recommend appropriate medical specialists:

1. Identify required medical specialties
2. Explain why each specialist is needed
3. Suggest the urgency of consultation
4. Include relevant subspecialties if applicable

Format the response as a JSON string with the following structure:
{
  "specialists": [{
    "type": "string - Medical specialty",
    "subspecialty": "string - Specific focus area if applicable",
    "reason": "string - Why this specialist is needed",
    "urgency": "string - 'routine' | 'soon' | 'urgent'",
    "description": "string - Brief explanation of the specialist's role"
  }]
}`;