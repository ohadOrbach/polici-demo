import jsPDF from 'jspdf';
import { Mission } from '@/data/mockData';

// Helper function to convert image URL to Base64
const toBase64 = (url: string): Promise<string> =>
  fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));

export const generatePdfReport = async (mission: Mission) => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(22);
  doc.text('Mission Completion Report', 14, 20);

  // Add Summary
  doc.setFontSize(16);
  doc.text('Summary', 14, 30);
  doc.setFontSize(12);
  doc.text(`Mission: ${mission.title}`, 14, 40);
  doc.text(`Vessel: ${mission.vessel}`, 14, 45);
  doc.text(`Status: ${mission.status}`, 14, 50);
  doc.text(`Due Date: ${new Date(mission.dueDate).toLocaleDateString()}`, 14, 55);

  // Add Task Details
  doc.setFontSize(16);
  doc.text('Task Details', 14, 70);
  let yPosition = 80;

  for (const [index, task] of mission.checkboxes.entries()) {
    if (yPosition > 250) { // Adjust page break threshold
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.text(`${index + 1}. ${task.text}`, 14, yPosition);
    doc.setFontSize(10);
    doc.text(`Status: ${task.checked ? 'Completed' : 'Pending'}`, 20, yPosition + 5);
    yPosition += 10;
    
    if (task.note) {
      doc.text(`Note: ${task.note}`, 20, yPosition);
      yPosition += 5;
    }

    if (task.attachments?.photos) {
      doc.text('Photos:', 25, yPosition);
      yPosition += 5;
      for (const photo of task.attachments.photos) {
        try {
          const base64Img = await toBase64(photo);
          if (yPosition > 240) { // Check for page break before adding image
            doc.addPage();
            yPosition = 20;
          }
          doc.addImage(base64Img, 'JPEG', 30, yPosition, 50, 40);
          yPosition += 50; //_Increase yPosition after adding image
        } catch (error) {
          console.error('Error converting image to Base64:', error);
          doc.text(`- Could not load photo: ${photo}`, 30, yPosition);
          yPosition += 5;
        }
      }
    }
    
    // ... (placeholders for videos and files)

    yPosition += 10;
  }

  // Save the PDF
  doc.save(`mission-report-${mission.id}.pdf`);
};
