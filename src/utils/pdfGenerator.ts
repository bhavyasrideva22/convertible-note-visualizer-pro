
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
  }
}

export const calculatorToPdf = async (results: any) => {
  // Create new document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const { inputs, interestAmount, totalInvestment, pricePerShare, equityPercentage, sharesReceived, conversion } = results;
  
  // Add logo and header
  doc.setFillColor(36, 94, 79); // dark green
  doc.rect(0, 0, 210, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Convertible Note Calculator", 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text("Analysis Report", 105, 30, { align: 'center' });
  
  // Add date
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Summary section
  doc.setTextColor(36, 94, 79);
  doc.setFontSize(16);
  doc.text("Conversion Summary", 20, 55);
  
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 60, 170, 40, 'F');
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(12);
  
  const conversionTypeLabel = conversion.type === 'standard' ? 'Standard Conversion' :
                              conversion.type === 'discounted' ? 'Discount Applied' : 'Valuation Cap Applied';
  
  doc.text(`Conversion Type: ${conversionTypeLabel}`, 25, 70);
  doc.text(`Investor Equity: ${conversion.value.toFixed(2)}%`, 25, 80);
  doc.text(`Total Investment: ₹${(totalInvestment).toLocaleString('en-IN')} (with interest)`, 25, 90);
  
  // Input parameters section
  doc.setTextColor(36, 94, 79);
  doc.setFontSize(16);
  doc.text("Input Parameters", 20, 115);
  
  doc.autoTable({
    startY: 120,
    head: [['Parameter', 'Value']],
    body: [
      ['Company Valuation', `₹${(inputs.companyValuation).toLocaleString('en-IN')}`],
      ['Investment Amount', `₹${(inputs.investmentAmount).toLocaleString('en-IN')}`],
      ['Discount Rate', `${inputs.discountRate}%`],
      ['Interest Rate', `${inputs.interestRate}%`],
      ['Term Length', `${inputs.term} months`],
      ['Valuation Cap', `₹${(inputs.valuationCap).toLocaleString('en-IN')}`],
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [36, 94, 79],
      textColor: [255, 255, 255]
    },
    styles: {
      fontSize: 10
    }
  });
  
  // Conversion details
  doc.setTextColor(36, 94, 79);
  doc.setFontSize(16);
  doc.text("Conversion Details", 20, doc.autoTable.previous.finalY + 20);
  
  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 25,
    head: [['Conversion Type', 'Valuation', 'Equity %', 'Shares']],
    body: [
      [
        'Standard', 
        `₹${(pricePerShare.standard).toLocaleString('en-IN')}`, 
        `${equityPercentage.standard.toFixed(2)}%`,
        Math.floor(sharesReceived.standard).toLocaleString()
      ],
      [
        `Discount (${inputs.discountRate}%)`, 
        `₹${(pricePerShare.discounted).toLocaleString('en-IN')}`, 
        `${equityPercentage.discounted.toFixed(2)}%`,
        Math.floor(sharesReceived.discounted).toLocaleString()
      ],
      [
        `Cap (₹${(inputs.valuationCap).toLocaleString('en-IN')})`, 
        `₹${(Math.min(inputs.valuationCap, inputs.companyValuation)).toLocaleString('en-IN')}`, 
        `${equityPercentage.capped.toFixed(2)}%`,
        Math.floor(sharesReceived.capped).toLocaleString()
      ]
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [36, 94, 79],
      textColor: [255, 255, 255]
    },
    styles: {
      fontSize: 10
    }
  });
  
  // Notes
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.setFillColor(233, 196, 106, 0.2); // light gold
  doc.rect(20, doc.autoTable.previous.finalY + 20, 170, 25, 'F');
  
  doc.text("Note: The investor receives the most favorable outcome, which is the", 25, doc.autoTable.previous.finalY + 30);
  
  const favorableOutcome = conversion.type === 'standard' ? 'standard conversion' : 
                           conversion.type === 'discounted' ? 'discounted valuation' : 'valuation cap';
  
  doc.setFont(undefined, 'bold');
  doc.text(favorableOutcome, 25 + doc.getTextWidth("Note: The investor receives the most favorable outcome, which is the "), doc.autoTable.previous.finalY + 30);
  doc.setFont(undefined, 'normal');
  
  doc.text(`in this scenario, resulting in ${conversion.value.toFixed(2)}% equity.`, 25, doc.autoTable.previous.finalY + 35);
  
  // Footer
  const footerY = doc.internal.pageSize.height - 10;
  doc.setFillColor(36, 94, 79, 0.1);
  doc.rect(0, footerY - 10, 210, 20, 'F');
  
  doc.setTextColor(36, 94, 79);
  doc.setFontSize(8);
  doc.text("© Convertible Note Calculator | This report is for informational purposes only and does not constitute financial advice.", 105, footerY, { align: 'center' });
  
  // Save the PDF
  doc.save(`Convertible-Note-Calculator-${new Date().toISOString().split('T')[0]}.pdf`);
  
  return true;
};
