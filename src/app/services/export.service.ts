import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { QAItem } from '../models/qa.model';

@Injectable({ providedIn: 'root' })
export class MarkdownExportService {
  generatePdf(items: QAItem[]) {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Gemini Live Mock Interview Data", 10, 20);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const systemPrompt = "System Prompt: This document contains my interview QA sets. Please act as a professional interviewer and conduct a mock interview based on this content.";
    const splitPrompt = doc.splitTextToSize(systemPrompt, 180);
    doc.text(splitPrompt, 10, 30);
    
    let y = 30 + (splitPrompt.length * 5) + 10;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    items.forEach((item, index) => {
      doc.setFont("helvetica", "bold");
      const qText = `Q${index+1} [${item.category}]: ${item.question}`;
      const splitQ = doc.splitTextToSize(qText, 180);
      
      if (y + (splitQ.length * 5) > pageHeight - 20) {
         doc.addPage();
         y = 20;
      }
      doc.text(splitQ, 10, y);
      y += (splitQ.length * 5) + 2;
      
      doc.setFont("helvetica", "normal");
      const aText = `A: ${item.answer}`;
      const splitA = doc.splitTextToSize(aText, 180);
      
      if (y + (splitA.length * 5) > pageHeight - 20) {
         doc.addPage();
         y = 20;
      }
      doc.text(splitA, 10, y);
      y += (splitA.length * 5) + 8;
    });
    
    doc.save(`mock_interview_${new Date().toISOString().split('T')[0]}.pdf`);
  }
}
