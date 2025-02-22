export const getSummaryPrompt = () => `Analyze this medical report image and provide a clear, concise summary that includes:

1. Overall assessment of the patient's health status
2. Main findings and their significance
3. Any critical values or abnormal results
4. Recommendations for follow-up

Format the response in simple, patient-friendly language that avoids medical jargon where possible.

Return the response as a JSON string with the following structure:
{
  "summary": "string - A comprehensive overview of the report",
  "criticalFindings": ["string - List of any results requiring immediate attention"],
  "normalFindings": ["string - List of results within normal ranges"],
  "followUpRecommendations": ["string - List of recommended next steps"]
}`;