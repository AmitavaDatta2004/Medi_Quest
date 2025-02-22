"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
});

export default function HealthReport({
  data = {}, // Default to an empty object
  symptoms = [],
}: {
  data: any;
  symptoms: string[];
}) {
  // Ensure all properties exist and are arrays
  const diseases = data.diseases || [];
  const medications = data.medications || { otc: [], prescribed: [] };
  const dietPlan = data.dietPlan || { recommended: [], avoid: [] };
  const workouts = data.workouts || [];
  const generalPrecautions = data.generalPrecautions || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Health Analysis Report</Text>

        {/* Symptoms */}
        <View style={styles.section}>
          <Text style={styles.heading}>Reported Symptoms</Text>
          {symptoms.length > 0 ? (
            symptoms.map((symptom, index) => (
              <Text key={index} style={styles.listItem}>
                • {symptom}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No symptoms reported.</Text>
          )}
        </View>

        {/* Diseases */}
        <View style={styles.section}>
          <Text style={styles.heading}>Potential Conditions</Text>
          {diseases.length > 0 ? (
            diseases.map((disease: any, index: number) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.subheading}>
                  {disease.name} ({Math.round(disease.probability * 100)}% probability)
                </Text>
                <Text style={styles.text}>{disease.description}</Text>
                
                <Text style={styles.subheading}>Causes:</Text>
                {disease.causes?.length > 0 ? (
                  disease.causes.map((cause: string, i: number) => (
                    <Text key={i} style={styles.listItem}>
                      • {cause}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.text}>No specific causes found.</Text>
                )}

                <Text style={styles.subheading}>Precautions:</Text>
                {disease.precautions?.length > 0 ? (
                  disease.precautions.map((precaution: string, i: number) => (
                    <Text key={i} style={styles.listItem}>
                      • {precaution}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.text}>No specific precautions listed.</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.text}>No conditions detected.</Text>
          )}
        </View>

        {/* General Precautions */}
        <View style={styles.section}>
          <Text style={styles.heading}>General Preventive Measures</Text>
          {generalPrecautions.length > 0 ? (
            generalPrecautions.map((precaution: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {precaution}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No general precautions provided.</Text>
          )}
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <Text style={styles.heading}>Recommended Medications</Text>
          <Text style={styles.subheading}>Over-the-Counter:</Text>
          {medications.otc.length > 0 ? (
            medications.otc.map((med: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {med}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No OTC medications suggested.</Text>
          )}

          <Text style={styles.subheading}>Prescription Medications:</Text>
          {medications.prescribed.length > 0 ? (
            medications.prescribed.map((med: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {med}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No prescription medications suggested.</Text>
          )}
        </View>

        {/* Diet Plan */}
        <View style={styles.section}>
          <Text style={styles.heading}>Diet Recommendations</Text>
          <Text style={styles.subheading}>Recommended Foods:</Text>
          {dietPlan.recommended.length > 0 ? (
            dietPlan.recommended.map((food: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {food}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No diet recommendations.</Text>
          )}

          <Text style={styles.subheading}>Foods to Avoid:</Text>
          {dietPlan.avoid.length > 0 ? (
            dietPlan.avoid.map((food: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {food}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No food restrictions.</Text>
          )}
        </View>

        {/* Workouts */}
        <View style={styles.section}>
          <Text style={styles.heading}>Recommended Exercises</Text>
          {workouts.length > 0 ? (
            workouts.map((workout: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {workout}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No specific workout recommendations.</Text>
          )}
        </View>

        {/* Disclaimer */}
        <View style={styles.section}>
          <Text style={[styles.text, { fontSize: 10, color: "#666" }]}>
            Disclaimer: This report is generated based on AI analysis and should not be considered as professional medical advice. Please consult with healthcare professionals for accurate diagnosis and treatment.
          </Text>
        </View>
      </Page>
    </Document>
  );
}