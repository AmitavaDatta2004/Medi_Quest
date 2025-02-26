export const getUnifiedPrompt = (language: string, location: string) => `Carefully analyze this medical report image and provide a detailed yet simple explanation of the findings. Your goal is to make the analysis easy to understand for someone without a medical background. 

🔹 **IMPORTANT:** The entire response must be generated in **${language}**. Use proper grammar and medical terminology, but ensure the explanation remains easy to understand.

Structure your response in JSON format with the following sections, ensuring the information is clear, actionable, and helpful:

1. **Overall Assessment**:
   - Start with a brief, easy-to-understand summary of the report's main findings.
   - Highlight any critical findings that need immediate attention, explaining why they are important in simple terms.
   - Mention any normal findings to reassure the user about aspects of their health that are fine.
   - Provide clear follow-up recommendations, explaining what the user should do next and why.

2. **Key Test Results**:
   - List all test results in a simple, organized way.
   - Compare each result to normal ranges, and explain what it means if a result is too high, too low, or normal.
   - Clearly flag any abnormal results and explain their significance in plain language (e.g., "This result is high, which could mean X, and you should do Y").
   - Avoid medical jargon and focus on helping the user understand what each result means for their health.

3. **Health Issues**:
   - Identify any health problems found in the report, categorizing them as common or serious.
   - Rate the severity of each issue (e.g., mild, moderate, severe) and explain what this means for the user.
   - List any symptoms or warning signs the user should watch out for.
   - Explain the risks or complications of each issue in simple terms.
   - Suggest practical steps the user can take to manage or improve their condition, such as lifestyle changes or treatments.

4. **Specialist Recommendations**:
   - List any specialists the user should see, such as a cardiologist or endocrinologist.
   - For each specialist, provide a list of 5 doctors in ${location} that the user can consult.
   - Explain why each specialist is needed and how they can help with the user's specific health issues.
   - Indicate how soon the user should see each specialist (e.g., immediately, within a few weeks, or during a routine check-up).
   - If relevant, mention any subspecialties that might be needed for more focused care.

5. **Medication Information**:
   - List any medications that are recommended or prescribed, separating them into prescription and over-the-counter (OTC) categories.
   - Explain the purpose of each medication in simple terms (e.g., "This medication helps lower your blood pressure").
   - Provide clear dosage instructions and any important tips (e.g., "Take with food to avoid stomach upset").
   - Mention any possible side effects or interactions with other medications, and what the user should do if they experience them.

**🛑 The entire response must be in ${language}. Do not use English.** If necessary, translate all medical terms into ${language} while keeping their meaning accurate.

Format the response as a JSON string with the following structure:
{
  "summary": "string - A simple, clear overview of the report's main findings and what they mean for the user in detail. Include the key points of the report.",
  "criticalFindings": ["string - List of results or conditions that need immediate attention, explained in ${language}."],
  "keyFindingsSummary": "string - A brief summary of the most important test results, focusing on what the user needs to know.",
  "abnormalFindings": ["string - List of abnormal results, with simple explanations of what they mean and what to do."],
  "normalFindings": ["string - List of normal results, reassuring the user about aspects of their health that are fine."],
  "healthIssuesSummary": "string - A simple summary of any health problems found, categorized by severity.",
  "commonHealthIssues": ["string - List of common health issues, with easy-to-understand explanations and tips for management."],
  "severeHealthIssues": ["string - List of serious health issues, including symptoms, risks, and what the user should do next."],
  "specialistsSummary": "string - A clear summary of which specialists the user should see and why.",
  "urgentSpecialists": ["string - List of specialists needed urgently, with simple explanations for the urgency and 5 doctors in ${location}."],
  "soonSpecialists": ["string - List of specialists recommended for consultation within a short timeframe, with 5 doctors in ${location}."],
  "routineSpecialists": ["string - List of specialists for routine check-ups or ongoing care, with 5 doctors in ${location}."],
  "medicationsSummary": "string - A simple summary of any medications recommended or prescribed, including their purpose."],
  "prescriptionMedications": ["string - List of prescription medications, with clear explanations of their purpose, dosage, and side effects."],
  "OTCMedications": ["string - List of over-the-counter medications, with simple instructions on how to use them."]
}

🛑 **Remember: The entire output should be in ${language}, and no English should be used.**`;