
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartBar, ArrowDown, ArrowUp } from 'lucide-react';

interface ConversionSummaryProps {
  conversion: {
    type: string;
    value: number;
  };
  equityPercentage: {
    standard: number;
    discounted: number;
    capped: number;
  };
  totalInvestment: number;
  formatCurrency: (value: number) => string;
  inputs: {
    companyValuation: number;
    discountRate: number;
    valuationCap: number;
  };
}

const ConversionSummary = ({ 
  conversion, 
  equityPercentage, 
  totalInvestment, 
  formatCurrency,
  inputs 
}: ConversionSummaryProps) => {
  const conversionType = conversion.type;
  const equityPercent = conversion.value;
  
  let conversionTitle = '';
  let conversionDescription = '';
  let conversionHint = '';
  let conversionColor = '';
  
  switch(conversionType) {
    case 'standard':
      conversionTitle = 'Standard Conversion';
      conversionDescription = `The convertible note converts at the pre-money valuation of ${formatCurrency(inputs.companyValuation)}.`;
      conversionHint = 'This is the base scenario with no discount or cap applied.';
      conversionColor = 'bg-mint-green/20 border-mint-green/50';
      break;
      
    case 'discounted':
      conversionTitle = 'Discount Applied';
      conversionDescription = `The ${inputs.discountRate}% discount provides a better deal than the standard conversion or the valuation cap.`;
      conversionHint = `This reduces the effective valuation to ${formatCurrency(inputs.companyValuation * (1 - inputs.discountRate / 100))}.`;
      conversionColor = 'bg-gold/20 border-gold/50';
      break;
      
    case 'capped':
      conversionTitle = 'Valuation Cap Applied';
      conversionDescription = `The valuation cap of ${formatCurrency(inputs.valuationCap)} is lower than the discounted valuation.`;
      conversionHint = 'This protects investors from excessive dilution if your company's valuation increases significantly.';
      conversionColor = 'bg-dark-green/20 border-dark-green/50';
      break;
  }
  
  return (
    <Card className={`p-5 border-2 ${conversionColor}`}>
      <div className="flex items-start space-x-4">
        <div className="rounded-full p-2 bg-white">
          <ChartBar className="h-6 w-6 text-dark-green" />
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-dark-green">{conversionTitle}</h4>
          <p className="text-charcoal/80 mb-2">{conversionDescription}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-charcoal/70">Investor Gets</p>
              <p className="text-xl font-semibold text-charcoal">
                {equityPercent.toFixed(2)}% Equity
              </p>
              <p className="text-xs flex items-center mt-1 text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                Most favorable to investor
              </p>
            </div>
            <div>
              <p className="text-sm text-charcoal/70">For Investment Of</p>
              <p className="text-xl font-semibold text-charcoal">
                {formatCurrency(totalInvestment)}
              </p>
              <p className="text-xs text-charcoal/70 mt-1">
                (Including interest)
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm text-charcoal/70">
              <span className="font-medium text-dark-green">Note:</span> {conversionHint}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConversionSummary;
