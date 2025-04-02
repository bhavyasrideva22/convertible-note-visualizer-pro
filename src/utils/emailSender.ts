
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toast } from "sonner";

declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
  }
}

// In a real app, this would send an email via API
// For this demo, we'll simulate sending and show a toast notification
export const sendCalculatorResults = async (email: string, results: any) => {
  // In a real implementation, this would use an API call to a backend service
  // that would generate and send the email
  
  console.log("Sending calculator results to:", email);
  console.log("Results data:", results);
  
  // For demo purposes, we'll simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, we would integrate with an email service API
  // For now, we'll return a success and assume the email was sent
  return true;
};

// For a real implementation, this would be the structure of the email content
const generateEmailContent = (results: any) => {
  const { inputs, interestAmount, totalInvestment, pricePerShare, equityPercentage, sharesReceived, conversion } = results;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return {
    subject: "Your Convertible Note Calculator Results",
    content: `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #245e4f; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .summary { background-color: #f8f8f8; padding: 15px; margin-bottom: 20px; border-left: 4px solid #e9c46a; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #245e4f; color: white; text-align: left; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .footer { font-size: 12px; text-align: center; margin-top: 40px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Convertible Note Calculator</h1>
            <p>Results Summary</p>
          </div>
          
          <div class="content">
            <p>Thank you for using our Convertible Note Calculator. Here are your results:</p>
            
            <div class="summary">
              <h2>Conversion Summary</h2>
              <p><strong>Conversion Type:</strong> ${conversion.type === 'standard' ? 'Standard Conversion' : 
                                                    conversion.type === 'discounted' ? 'Discount Applied' : 
                                                    'Valuation Cap Applied'}</p>
              <p><strong>Investor Equity:</strong> ${conversion.value.toFixed(2)}%</p>
              <p><strong>Total Investment:</strong> ${formatCurrency(totalInvestment)} (with interest)</p>
            </div>
            
            <h2>Input Parameters</h2>
            <table>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Company Valuation</td>
                <td>${formatCurrency(inputs.companyValuation)}</td>
              </tr>
              <tr>
                <td>Investment Amount</td>
                <td>${formatCurrency(inputs.investmentAmount)}</td>
              </tr>
              <tr>
                <td>Discount Rate</td>
                <td>${inputs.discountRate}%</td>
              </tr>
              <tr>
                <td>Interest Rate</td>
                <td>${inputs.interestRate}%</td>
              </tr>
              <tr>
                <td>Term Length</td>
                <td>${inputs.term} months</td>
              </tr>
              <tr>
                <td>Valuation Cap</td>
                <td>${formatCurrency(inputs.valuationCap)}</td>
              </tr>
            </table>
            
            <h2>Conversion Details</h2>
            <table>
              <tr>
                <th>Conversion Type</th>
                <th>Valuation</th>
                <th>Equity %</th>
              </tr>
              <tr>
                <td>Standard</td>
                <td>${formatCurrency(pricePerShare.standard)}</td>
                <td>${equityPercentage.standard.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Discount (${inputs.discountRate}%)</td>
                <td>${formatCurrency(pricePerShare.discounted)}</td>
                <td>${equityPercentage.discounted.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Cap (${formatCurrency(inputs.valuationCap)})</td>
                <td>${formatCurrency(Math.min(inputs.valuationCap, inputs.companyValuation))}</td>
                <td>${equityPercentage.capped.toFixed(2)}%</td>
              </tr>
            </table>
            
            <p>For more detailed analysis, please visit our online calculator or download the PDF report.</p>
            
            <div class="footer">
              <p>© Convertible Note Calculator | This is for informational purposes only and doesn't constitute financial advice.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};
