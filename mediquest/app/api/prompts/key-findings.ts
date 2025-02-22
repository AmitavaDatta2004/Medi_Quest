export const getKeyFindingsPrompt = () => `Analyze this medical report image and extract key findings:

1. Identify all test results and measurements
2. Compare values against normal ranges
3. Flag any abnormal results
4. Explain the significance of each finding

Format the response as a JSON string with the following structure:
{
  "findings": [{
    "parameter": "string - Name of the test or measurement",
    "value": "string - Measured value",
    "normalRange": "string - Expected normal range",
    "status": "string - 'normal' | 'abnormal' | 'critical'",
    "explanation": "string - Simple explanation of what this means"
  }]
}`;