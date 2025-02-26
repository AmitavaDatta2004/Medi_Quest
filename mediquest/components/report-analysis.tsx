"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generatePDF } from "@/lib/pdf-generator";

interface ReportAnalysisProps {
  analysis: {
    summary: string;
    criticalFindings: string[];
    keyFindingsSummary: string;
    abnormalFindings: string[];
    normalFindings: string[];
    healthIssuesSummary: string;
    commonHealthIssues: string[];
    severeHealthIssues: string[];
    specialistsSummary: string;
    urgentSpecialists: string[];
    soonSpecialists: string[];
    routineSpecialists: string[];
    medicationsSummary: string;
    prescriptionMedications: string[];
    OTCMedications: string[];
  };
  location: string;
}

export function ReportAnalysis({ analysis, location }: ReportAnalysisProps) {
  const handleDownload = async () => {
    const pdfBlob = await generatePDF(analysis);
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medical-report-analysis.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderDoctors = (specialists: string[]) => {
    return specialists.map((specialist, index) => {
      const [specialty, ...doctors] = specialist.split(":");
      return (
        <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
          <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">{specialty}</h5>
          <ul className="space-y-2">
            {doctors.slice(0, 5).map((doctor, idx) => (
              <li key={idx} className="flex items-start gap-3 text-blue-700 dark:text-blue-400">
                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <span>{doctor}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 border-2 border-blue-100 dark:border-indigo-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Analysis Results
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Comprehensive breakdown of your medical report
            </p>
          </div>
          <Button 
            onClick={handleDownload} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF Report
          </Button>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Summary</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="critical-findings" className="border-none">
            <AccordionTrigger className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200">
              <div className="flex-1 text-left">
                <h4 className="text-xl font-semibold text-red-700 dark:text-red-400">Critical Findings</h4>
                <p className="text-sm text-red-600 dark:text-red-300">Immediate attention required</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-4">
              <ul className="space-y-3">
                {analysis.criticalFindings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-3 text-red-700 dark:text-red-400">
                    <span className="inline-block w-2 h-2 mt-2 rounded-full bg-red-500" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="key-findings" className="border-none">
            <AccordionTrigger className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200">
              <div className="flex-1 text-left">
                <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Key Findings</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">Important test results and measurements</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{analysis.keyFindingsSummary}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h5 className="font-semibold text-red-700 dark:text-red-400 mb-3">Abnormal Results</h5>
                  <ul className="space-y-2">
                    {analysis.abnormalFindings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-3 text-red-700 dark:text-red-400">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-red-500" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-3">Normal Results</h5>
                  <ul className="space-y-2">
                    {analysis.normalFindings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-3 text-green-700 dark:text-green-400">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="health-issues" className="border-none">
            <AccordionTrigger className="flex items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200">
              <div className="flex-1 text-left">
                <h4 className="text-xl font-semibold text-purple-700 dark:text-purple-400">Health Issues</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">Identified health concerns and conditions</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{analysis.healthIssuesSummary}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-3">Common Issues</h5>
                  <ul className="space-y-2">
                    {analysis.commonHealthIssues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-3 text-yellow-700 dark:text-yellow-400">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-500" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h5 className="font-semibold text-red-700 dark:text-red-400 mb-3">Severe Issues</h5>
                  <ul className="space-y-2">
                    {analysis.severeHealthIssues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-3 text-red-700 dark:text-red-400">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-red-500" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specialists" className="border-none">
            <AccordionTrigger className="flex items-center gap-2 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-200">
              <div className="flex-1 text-left">
                <h4 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">Recommended Specialists</h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-300">Medical professionals to consult in {location}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{analysis.specialistsSummary}</p>
              <div className="space-y-4">
                {analysis.urgentSpecialists.length > 0 && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h5 className="font-semibold text-red-700 dark:text-red-400 mb-3">Urgent Consultations</h5>
                    {renderDoctors(analysis.urgentSpecialists)}
                  </div>
                )}
                {analysis.soonSpecialists.length > 0 && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <h5 className="font-semibold text-orange-700 dark:text-orange-400 mb-3">Soon Consultations</h5>
                    {renderDoctors(analysis.soonSpecialists)}
                  </div>
                )}
                {analysis.routineSpecialists.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Routine Consultations</h5>
                    {renderDoctors(analysis.routineSpecialists)}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="medications" className="border-none">
            <AccordionTrigger className="flex items-center gap-2 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-200">
              <div className="flex-1 text-left">
                <h4 className="text-xl font-semibold text-teal-700 dark:text-teal-400">Recommended Medications</h4>
                <p className="text-sm text-teal-600 dark:text-teal-300">Prescribed and over-the-counter medicines</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{analysis.medicationsSummary}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Prescription Medications</h5>
                  <ul className="space-y-2">
                    {analysis.prescriptionMedications.map((med, index) => (
                      <li key={index} className="flex items-start gap-3 text-blue-700 dark:text-blue-400">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500" />
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-3">OTC Medications</h5>
                  <ul className="space-y-2">
                    {analysis.OTCMedications.map((med, index) => (
                      <li key={index} className="flex items-start gap-3 text-green-700 dark:text-green-400">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500" />
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}