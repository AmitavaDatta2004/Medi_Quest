export const getHealthIssuesPrompt = () => `Analyze this medical report image and identify potential health issues:

1. Detect any medical conditions indicated by the results
2. List associated symptoms and warning signs
3. Outline potential risks and complications
4. Suggest preventive measures

Format the response as a JSON string with the following structure:
{
  "healthIssues": [{
    "condition": "string - Name of the health issue",
    "severity": "string - 'mild' | 'moderate' | 'severe'",
    "symptoms": ["string - List of common symptoms"],
    "risks": ["string - Potential health risks"],
    "complications": ["string - Possible complications"],
    "preventiveMeasures": ["string - Recommended preventive actions"]
  }]
}`;