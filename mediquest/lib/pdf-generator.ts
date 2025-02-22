import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  
  // Title - Website Name
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('MediQuest', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Prescription Report', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Helper function to create tables with styles
  const createTable = (title: string, headers: string[], data: string[][], color: [number, number, number]) => {
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(...color);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPos);
    yPos += 5;
    autoTable(doc, {
      startY: yPos,
      head: [headers],
      body: data,
      styles: { halign: 'left', cellPadding: 3, fontSize: 11 },
      headStyles: { fillColor: color },
      theme: 'grid',
    });
    const autoTablePlugin = doc as jsPDF & { lastAutoTable: { finalY: number } };
    yPos = autoTablePlugin.lastAutoTable.finalY + 10;
  };

  // Critical Findings Table with Red Color
  if (analysis.criticalFindings.length > 0) {
    createTable('Critical Findings', ['Findings'], analysis.criticalFindings.map(f => [f]), [255, 0, 0]);
  }

  // Key Findings Table with Blue Color
  createTable('Key Findings', ['Summary'], [[analysis.keyFindingsSummary]], [0, 0, 255]);

  // Abnormal and Normal Findings Table with Yellow & Green
  createTable('Abnormal Findings', ['Findings'], analysis.abnormalFindings.map(f => [f]), [255, 165, 0]);
  createTable('Normal Findings', ['Findings'], analysis.normalFindings.map(f => [f]), [0, 128, 0]);

  // Health Issues Table with Purple
  createTable('Health Issues', ['Summary'], [[analysis.healthIssuesSummary]], [128, 0, 128]);
  createTable('Common Health Issues', ['Issues'], analysis.commonHealthIssues.map(f => [f]), [255, 140, 0]);
  createTable('Severe Health Issues', ['Issues'], analysis.severeHealthIssues.map(f => [f]), [178, 34, 34]);

  // Specialists Table with Teal
  createTable('Specialist Consultations', ['Urgent', 'Soon', 'Routine'],
    analysis.urgentSpecialists.map((u, i) => [u, analysis.soonSpecialists[i] || '', analysis.routineSpecialists[i] || '']), [0, 128, 128]
  );

  // Medications Table with Dark Blue
  createTable('Medications', ['Prescription Medications', 'OTC Medications'],
    analysis.prescriptionMedications.map((p, i) => [p, analysis.OTCMedications[i] || '']), [25, 25, 112]
  );

  // Footer
  const today = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Report generated on ${today}`, margin, doc.internal.pageSize.getHeight() - 10);

  return doc.output('blob');
}
