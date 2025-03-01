"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { geminiAPI } from "@/lib/gemini";
import { PDFDownloadLink } from "@react-pdf/renderer";
import HealthReport from "./HealthReport";
import {
  AlertCircle,
  Plus,
  Loader2,
  Pill,
  Apple,
  Activity,
  FileDown,
  Stethoscope,
  ShieldAlert,
  Shield,
  Sparkles,
  Brain,
  Dumbbell,
  HeartPulse,
  Waves,
} from "lucide-react";

const commonSymptoms = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Body Aches",
  "Sore Throat",
];

const languages = ["English", "Spanish", "French", "German", "Chinese", "Hindi", "Bengali","Tamil","Urdu"];

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

interface AnalysisResult {
  diseases: Disease[];
  medications: Medications;
  dietPlan: DietPlan;
  workouts: string[];
  doctors: Doctor[];
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [healthQuestions, setHealthQuestions] = useState({
    chronicIllnesses: "",
    medicationsAllergies: "",
    surgeriesVaccinations: "",
    lifestyle: "",
    sleepPattern: "",
  });

  const handleAddSymptom = () => {
    if (newSymptom && !symptoms.includes(newSymptom)) {
      setSymptoms([...symptoms, newSymptom]);
      setNewSymptom("");
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const handleCommonSymptomClick = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      setError("Please add at least one symptom.");
      return;
    }
  
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setError("Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      const analysis: AnalysisResult = await geminiAPI.analyzeSymptomsAndGetDiseases(symptoms, 3, language, location, healthQuestions);
      console.log("Analysis result:", analysis);
      setResult(analysis);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to analyze symptoms. Please try again.");
      } else {
        setError("Failed to analyze symptoms. Please try again.");
      }
      console.error("Error fetching analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Symptom Input Section */}
      <div className="space-y-6 bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-8 w-8 text-primary animate-pulse-slow" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Symptom Analyzer
          </h2>
        </div>
        <Select onValueChange={setLanguage} value={language}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location..."
          className="h-12 text-lg"
        />

        <div className="flex gap-3">
          <Input
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
            placeholder="Type a symptom..."
            onKeyPress={(e) => e.key === "Enter" && handleAddSymptom()}
            className="h-12 text-lg"
          />
          <Button 
            onClick={handleAddSymptom} 
            disabled={!newSymptom.trim()} 
            size="lg"
            className="gradient-bg hover:opacity-90 transition-opacity"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add
          </Button>
        </div>

        {/* Common Symptoms */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-primary/80">Common Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                variant={symptoms.includes(symptom) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCommonSymptomClick(symptom)}
                className={`symptom-tag ${
                  symptoms.includes(symptom) 
                    ? 'gradient-bg hover:opacity-90' 
                    : 'hover:border-primary/50'
                }`}
              >
                {symptom}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Symptoms */}
        {symptoms.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary/80">Selected Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <Button
                  key={symptom}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleRemoveSymptom(symptom)}
                  className="symptom-tag bg-secondary/50 hover:bg-secondary/70"
                >
                  {symptom}
                  <span className="ml-2 text-primary">×</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Health Questions */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-primary/80">Health Questions</h3>
          <Input
            value={healthQuestions.chronicIllnesses}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, chronicIllnesses: e.target.value })}
            placeholder="Do you have any chronic illnesses, long-term medical conditions, or a family history of serious diseases?"
            className="h-12 text-lg"
          />
          <Input
            value={healthQuestions.medicationsAllergies}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, medicationsAllergies: e.target.value })}
            placeholder="Are you currently taking any medications, supplements, or have any known allergies?"
            className="h-12 text-lg"
          />
          <Input
            value={healthQuestions.surgeriesVaccinations}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, surgeriesVaccinations: e.target.value })}
            placeholder="Have you had any major surgeries, hospitalizations, or recent vaccinations/check-ups?"
            className="h-12 text-lg"
          />
          <Input
            value={healthQuestions.lifestyle}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, lifestyle: e.target.value })}
            placeholder="Do you smoke, drink alcohol, use recreational drugs, or experience high levels of stress/anxiety?"
            className="h-12 text-lg"
          />
          <Input
            value={healthQuestions.sleepPattern}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, sleepPattern: e.target.value })}
            placeholder="How is your sleep pattern, and does your occupation or lifestyle expose you to any health risks?"
            className="h-12 text-lg"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive p-4 bg-destructive/10 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <Button
          onClick={analyzeSymptoms}
          disabled={loading || symptoms.length === 0}
          size="lg"
          className="w-full gradient-bg hover:opacity-90 transition-opacity h-14 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing your symptoms...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5 mr-2" />
              Analyze Symptoms
            </>
          )}
        </Button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 results-container">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
            <Tabs defaultValue="diseases" className="space-y-6 relative">
              <TabsList className="grid w-full grid-cols-6 p-1 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/20">
                <TabsTrigger value="diseases" className="data-[state=active]:gradient-bg">
                  <HeartPulse className="h-4 w-4 mr-2" />
                  Diseases
                </TabsTrigger>
                <TabsTrigger value="precautions" className="data-[state=active]:gradient-bg">
                  <Shield className="h-4 w-4 mr-2" />
                  Precautions
                </TabsTrigger>
                <TabsTrigger value="medications" className="data-[state=active]:gradient-bg">
                  <Pill className="h-4 w-4 mr-2" />
                  Medications
                </TabsTrigger>
                <TabsTrigger value="diet" className="data-[state=active]:gradient-bg">
                  <Apple className="h-4 w-4 mr-2" />
                  Diet
                </TabsTrigger>
                <TabsTrigger value="workouts" className="data-[state=active]:gradient-bg">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Workouts
                </TabsTrigger>
                <TabsTrigger value="doctors" className="data-[state=active]:gradient-bg">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Doctors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diseases" className="space-y-6">
                {result.diseases?.map((disease: Disease, index: number) => (
                  <div key={index} className="gradient-border">
                    <Card className="p-6 hover:shadow-lg transition-shadow bg-background/50 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                            <HeartPulse className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                              {disease.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Waves className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">Confidence Level</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-full blur-sm" />
                          <div className="relative px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm">
                            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                              {Math.round(disease.probability * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {disease.description}
                      </p>

                      {disease.causes && disease.causes.length > 0 && (
                        <div className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/10">
                          <h4 className="font-semibold flex items-center text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            <ShieldAlert className="h-5 w-5 mr-2 text-primary" />
                            Potential Causes
                          </h4>
                          <ul className="grid gap-3">
                            {disease.causes.map((cause: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-primary/10 mt-1">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <span className="text-muted-foreground text-lg">{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="precautions" className="space-y-6">
                {result.diseases?.map((disease: Disease, index: number) => (
                  <div key={index} className="gradient-border">
                    <Card className="p-6 bg-background/50 backdrop-blur-sm">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                            <Shield className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            {disease.name} - Precautions
                          </h3>
                        </div>
                        <div className="grid gap-4">
                          {disease.precautions?.map((precaution: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                              <div className="p-2 rounded-full bg-primary/10 mt-1">
                                <Shield className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-lg">{precaution}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="medications" className="space-y-6">
                <div className="gradient-border">
                  <Card className="p-6 bg-background/50 backdrop-blur-sm">
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                            <Pill className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Over-the-Counter Medications
                          </h3>
                        </div>
                        <div className="grid gap-4">
                          {result.medications?.otc?.map((med: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                              <div className="p-2 rounded-full bg-primary/10 mt-1">
                                <Pill className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-lg">{med}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6 pt-6 border-t border-primary/10">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                            <Stethoscope className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Prescription Medications
                          </h3>
                        </div>
                        <div className="grid gap-4">
                          {result.medications?.prescribed?.map((med: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                              <div className="p-2 rounded-full bg-primary/10 mt-1">
                                <Stethoscope className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-lg">{med}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="diet" className="space-y-6">
                <div className="gradient-border">
                  <Card className="p-6 bg-background/50 backdrop-blur-sm">
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                            <Apple className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Recommended Foods
                          </h3>
                        </div>
                        <div className="grid gap-4">
                          {result.dietPlan?.recommended?.map((food: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                              <div className="p-2 rounded-full bg-primary/10 mt-1">
                                <Apple className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-lg">{food}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6 pt-6 border-t border-destructive/10">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                            <ShieldAlert className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold text-destructive">
                            Foods to Avoid
                          </h3>
                        </div>
                        <div className="grid gap-4">
                          {result.dietPlan?.avoid?.map((food: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                              <div className="p-2 rounded-full bg-destructive/10 mt-1">
                                <ShieldAlert className="h-4 w-4 text-destructive" />
                              </div>
                              <p className="text-muted-foreground text-lg">{food}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-6">
                <div className="gradient-border">
                  <Card className="p-6 bg-background/50 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                          <Dumbbell className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                          Recommended Exercises
                        </h3>
                      </div>
                      <div className="grid gap-4">
                        {result.workouts?.map((workout: string, i: number) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="p-2 rounded-full bg-primary/10 mt-1">
                              <Activity className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-muted-foreground text-lg">{workout}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="doctors" className="space-y-6">
                <div className="gradient-border">
                  <Card className="p-6 bg-background/50 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary glow">
                          <Stethoscope className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                          Recommended Doctors
                        </h3>
                      </div>
                      <div className="grid gap-4">
                        {result.doctors?.map((doctor: Doctor, i: number) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="p-2 rounded-full bg-primary/10 mt-1">
                              <Stethoscope className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-muted-foreground text-lg">{doctor.name} - {doctor.speciality}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="pt-6 border-t">
            <PDFDownloadLink
              document={<HealthReport data={result} symptoms={symptoms} />}
              fileName="health-report.pdf"
            >
              {({ loading }) => (
                <Button 
                  disabled={loading} 
                  className="w-full gradient-bg hover:opacity-90 transition-opacity h-14 text-lg"
                >
                  <FileDown className="h-5 w-5 mr-2" />
                  {loading ? "Generating PDF..." : "Download Detailed Report"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </div>
  );
}