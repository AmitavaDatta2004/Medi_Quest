import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Analysis {
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
}

export async function generatePDF(analysis: Analysis): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add wrapped text
  const addWrappedText = (text: string, y: number) => {
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    return y + (lines.length * 7);
  };

  // Helper function to add a section with bullet points
  const addBulletPoints = (items: string[], y: number) => {
    let currentY = y;
    items.forEach(item => {
      currentY = addWrappedText(`• ${item}`, currentY);
      currentY += 5;
    });
    return currentY;
  };

  // Helper function to check and add new page if needed
  const checkNewPage = (currentY: number, neededSpace: number = 40) => {
    if (currentY + neededSpace > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      return 20;
    }
    return currentY;
  };

  // Title
  doc.setFontSize(20);
  doc.text('Medical Report Analysis', margin, yPos);
  yPos += 15;

  // Summary Section
  doc.setFontSize(16);
  doc.text('Summary', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  yPos = addWrappedText(analysis.summary, yPos);
  yPos += 10;

  // Critical Findings Section
  if (analysis.criticalFindings.length > 0) {
    yPos = checkNewPage(yPos);
    doc.setFontSize(16);
    doc.text('Critical Findings', margin, yPos);
    yPos += 10;
    doc.setFontSize(12);
    yPos = addBulletPoints(analysis.criticalFindings, yPos);
    yPos += 10;
  }

  // Key Findings Section
  yPos = checkNewPage(yPos);
  doc.setFontSize(16);
  doc.text('Key Findings', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  yPos = addWrappedText(analysis.keyFindingsSummary, yPos);
  yPos += 10;

  // Abnormal Findings
  doc.setFontSize(14);
  doc.text('Abnormal Results:', margin, yPos);
  yPos += 8;
  doc.setFontSize(12);
  yPos = addBulletPoints(analysis.abnormalFindings, yPos);
  yPos += 10;

  // Normal Findings
  yPos = checkNewPage(yPos);
  doc.setFontSize(14);
  doc.text('Normal Results:', margin, yPos);
  yPos += 8;
  doc.setFontSize(12);
  yPos = addBulletPoints(analysis.normalFindings, yPos);
  yPos += 10;

  // Health Issues Section
  yPos = checkNewPage(yPos);
  doc.setFontSize(16);
  doc.text('Health Issues', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  yPos = addWrappedText(analysis.healthIssuesSummary, yPos);
  yPos += 10;

  // Common Health Issues
  doc.setFontSize(14);
  doc.text('Common Health Issues:', margin, yPos);
  yPos += 8;
  doc.setFontSize(12);
  yPos = addBulletPoints(analysis.commonHealthIssues, yPos);
  yPos += 10;

  // Severe Health Issues
  yPos = checkNewPage(yPos);
  doc.setFontSize(14);
  doc.text('Severe Health Issues:', margin, yPos);
  yPos += 8;
  doc.setFontSize(12);
  yPos = addBulletPoints(analysis.severeHealthIssues, yPos);
  yPos += 10;

  // Specialists Section
  yPos = checkNewPage(yPos);
  doc.setFontSize(16);
  doc.text('Recommended Specialists', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  yPos = addWrappedText(analysis.specialistsSummary, yPos);
  yPos += 10;

  // Urgent Specialists
  if (analysis.urgentSpecialists.length > 0) {
    doc.setFontSize(14);
    doc.text('Urgent Consultations:', margin, yPos);
    yPos += 8;
    doc.setFontSize(12);
    yPos = addBulletPoints(analysis.urgentSpecialists, yPos);
    yPos += 10;
  }

  // Soon Specialists
  yPos = checkNewPage(yPos);
  if (analysis.soonSpecialists.length > 0) {
    doc.setFontSize(14);
    doc.text('Soon Consultations:', margin, yPos);
    yPos += 8;
    doc.setFontSize(12);
    yPos = addBulletPoints(analysis.soonSpecialists, yPos);
    yPos += 10;
  }

  // Routine Specialists
  yPos = checkNewPage(yPos);
  if (analysis.routineSpecialists.length > 0) {
    doc.setFontSize(14);
    doc.text('Routine Consultations:', margin, yPos);
    yPos += 8;
    doc.setFontSize(12);
    yPos = addBulletPoints(analysis.routineSpecialists, yPos);
    yPos += 10;
  }

  // Medications Section
  yPos = checkNewPage(yPos);
  doc.setFontSize(16);
  doc.text('Medications', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  yPos = addWrappedText(analysis.medicationsSummary, yPos);
  yPos += 10;

  // Prescription Medications
  if (analysis.prescriptionMedications.length > 0) {
    doc.setFontSize(14);
    doc.text('Prescription Medications:', margin, yPos);
    yPos += 8;
    doc.setFontSize(12);
    yPos = addBulletPoints(analysis.prescriptionMedications, yPos);
    yPos += 10;
  }

  // OTC Medications
  yPos = checkNewPage(yPos);
  if (analysis.OTCMedications.length > 0) {
    doc.setFontSize(14);
    doc.text('Over-the-Counter Medications:', margin, yPos);
    yPos += 8;
    doc.setFontSize(12);
    yPos = addBulletPoints(analysis.OTCMedications, yPos);
  }

  // Footer
  const today = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Report generated on ${today}`, margin, doc.internal.pageSize.getHeight() - 10);

  return doc.output('blob');
}