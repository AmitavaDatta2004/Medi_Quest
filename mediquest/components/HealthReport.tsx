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
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
});

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

interface Doctor {
  name: string;
  speciality: string;
  location: string;
}

interface HealthData {
  diseases?: Disease[];
  medications?: Medications;
  dietPlan?: DietPlan;
  workouts?: string[];
  generalPrecautions?: string[];
  doctors?: Doctor[];
}

interface HealthReportProps {
  data: HealthData;
  symptoms: string[];
}

export default function HealthReport({ data, symptoms }: HealthReportProps) {
  const diseases = data.diseases || [];
  const medications = data.medications || { otc: [], prescribed: [] };
  const generalPrecautions = data.generalPrecautions || [];
  const doctors = data.doctors || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Health Analysis Report</Text>

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

        <View style={styles.section}>
          <Text style={styles.heading}>Potential Conditions</Text>
          {diseases.length > 0 ? (
            diseases.map((disease, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.subheading}>
                  {disease.name} ({Math.round(disease.probability * 100)}% probability)
                </Text>
                <Text style={styles.text}>{disease.description}</Text>
                <Text style={styles.subheading}>Causes:</Text>
                {disease.causes?.length ? (
                  disease.causes.map((cause, i) => (
                    <Text key={i} style={styles.listItem}>
                      • {cause}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.text}>No specific causes found.</Text>
                )}

                <Text style={styles.subheading}>Precautions:</Text>
                {disease.precautions?.length ? (
                  disease.precautions.map((precaution, i) => (
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

        <View style={styles.section}>
          <Text style={styles.heading}>General Preventive Measures</Text>
          {generalPrecautions.length > 0 ? (
            generalPrecautions.map((precaution, index) => (
              <Text key={index} style={styles.listItem}>
                • {precaution}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No general precautions provided.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Recommended Medications</Text>
          <Text style={styles.subheading}>Over-the-Counter:</Text>
          {medications.otc.length > 0 ? (
            medications.otc.map((med, index) => (
              <Text key={index} style={styles.listItem}>
                • {med}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No OTC medications suggested.</Text>
          )}

          <Text style={styles.subheading}>Prescription Medications:</Text>
          {medications.prescribed.length > 0 ? (
            medications.prescribed.map((med, index) => (
              <Text key={index} style={styles.listItem}>
                • {med}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No prescription medications suggested.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Recommended Doctors</Text>
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <Text key={index} style={styles.listItem}>
                • {doctor.name} - {doctor.speciality} ({doctor.location})
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No doctors recommended.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}