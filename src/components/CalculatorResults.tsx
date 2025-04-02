
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupee } from 'lucide-react';
import EquityChart from './EquityChart';
import ConversionSummary from './ConversionSummary';

interface CalculatorResultsProps {
  results: any;
  formatCurrency: (value: number) => string;
}

const CalculatorResults = ({ results, formatCurrency }: CalculatorResultsProps) => {
  if (!results) return null;
  
  const { inputs, interestAmount, totalInvestment, pricePerShare, equityPercentage, sharesReceived, conversion } = results;
  
  return (
    <Card className="shadow-card">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="summary">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-dark-green">Conversion Summary</h3>
                <p className="text-charcoal/80 mb-4">
                  Based on your inputs, here's how the convertible note would convert during a qualified financing round:
                </p>
                
                <ConversionSummary 
                  conversion={conversion}
                  equityPercentage={equityPercentage}
                  totalInvestment={totalInvestment}
                  formatCurrency={formatCurrency}
                  inputs={inputs}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-mint-green/20 p-4 rounded-lg">
                  <h4 className="font-medium text-dark-green">Investment Amount</h4>
                  <p className="text-2xl font-semibold flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {formatCurrency(inputs.investmentAmount)}
                  </p>
                </div>
                <div className="bg-mint-green/20 p-4 rounded-lg">
                  <h4 className="font-medium text-dark-green">Total With Interest</h4>
                  <p className="text-2xl font-semibold flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {formatCurrency(totalInvestment)}
                  </p>
                  <p className="text-xs text-charcoal/70">
                    Interest: {formatCurrency(interestAmount)} ({inputs.interestRate}% over {inputs.term} months)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualization">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-dark-green">Equity Visualization</h3>
                <p className="text-charcoal/80 mb-6">
                  This chart shows the equity distribution after the note converts under different scenarios:
                </p>
                
                <div className="h-80">
                  <EquityChart
                    equityPercentage={equityPercentage}
                    conversion={conversion}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-dark-green">Conversion Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">Conversion Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">Valuation</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">Equity %</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className={conversion.type === 'standard' ? 'bg-gold/10' : ''}>
                        <td className="px-4 py-4 whitespace-nowrap">Standard</td>
                        <td className="px-4 py-4 whitespace-nowrap">{formatCurrency(pricePerShare.standard)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{equityPercentage.standard.toFixed(2)}%</td>
                        <td className="px-4 py-4 whitespace-nowrap">{Math.floor(sharesReceived.standard).toLocaleString()}</td>
                      </tr>
                      <tr className={conversion.type === 'discounted' ? 'bg-gold/10' : ''}>
                        <td className="px-4 py-4 whitespace-nowrap">Discount ({inputs.discountRate}%)</td>
                        <td className="px-4 py-4 whitespace-nowrap">{formatCurrency(pricePerShare.discounted)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{equityPercentage.discounted.toFixed(2)}%</td>
                        <td className="px-4 py-4 whitespace-nowrap">{Math.floor(sharesReceived.discounted).toLocaleString()}</td>
                      </tr>
                      <tr className={conversion.type === 'capped' ? 'bg-gold/10' : ''}>
                        <td className="px-4 py-4 whitespace-nowrap">Cap ({formatCurrency(inputs.valuationCap)})</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {formatCurrency(Math.min(inputs.valuationCap, inputs.companyValuation))}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">{equityPercentage.capped.toFixed(2)}%</td>
                        <td className="px-4 py-4 whitespace-nowrap">{Math.floor(sharesReceived.capped).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> The investor receives the most favorable outcome (highlighted), which is the 
                    {' '}{conversion.type === 'standard' ? 'standard conversion' : 
                      conversion.type === 'discounted' ? 'discounted valuation' : 'valuation cap'} 
                    {' '}in this scenario, resulting in {conversion.value.toFixed(2)}% equity.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default CalculatorResults;
