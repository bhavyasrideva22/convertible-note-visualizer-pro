
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupee, Download, Mail } from 'lucide-react';
import CalculatorResults from './CalculatorResults';
import { useToast } from '@/components/ui/use-toast';
import { calculatorToPdf } from '@/utils/pdfGenerator';
import { sendCalculatorResults } from '@/utils/emailSender';

interface CalculatorInputs {
  companyValuation: number;
  investmentAmount: number;
  discountRate: number;
  interestRate: number;
  term: number;
  valuationCap: number;
}

const ConvertibleNoteCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    companyValuation: 50000000, // ₹5 Crore
    investmentAmount: 2500000, // ₹25 Lakh
    discountRate: 20, // 20%
    interestRate: 5, // 5%
    term: 18, // 18 months
    valuationCap: 100000000 // ₹10 Crore
  });
  
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  
  const calculateEquity = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Calculate interest over the term
      const termInYears = inputs.term / 12;
      const interestAmount = inputs.investmentAmount * (inputs.interestRate / 100) * termInYears;
      const totalInvestment = inputs.investmentAmount + interestAmount;
      
      // Calculate price per share under different scenarios
      const discountedPrice = inputs.companyValuation * (1 - inputs.discountRate / 100);
      const pricePerShare = {
        standard: inputs.companyValuation,
        discounted: discountedPrice,
        capped: inputs.valuationCap
      };
      
      // Calculate equity percentages
      const equityPercentage = {
        standard: (totalInvestment / inputs.companyValuation) * 100,
        discounted: (totalInvestment / discountedPrice) * 100,
        capped: inputs.valuationCap < inputs.companyValuation ? 
                (totalInvestment / inputs.valuationCap) * 100 : 
                (totalInvestment / inputs.companyValuation) * 100
      };
      
      // Find the most favorable conversion for the investor
      const conversion = Object.entries(equityPercentage).reduce((max, [key, value]) => 
        value > max.value ? { type: key, value } : max, 
        { type: 'standard', value: 0 }
      );
      
      const sharesReceived = {
        standard: totalInvestment / (inputs.companyValuation / 10000),  // Assuming 10,000 shares total
        discounted: totalInvestment / (discountedPrice / 10000),
        capped: totalInvestment / (Math.min(inputs.valuationCap, inputs.companyValuation) / 10000)
      };
      
      setResults({
        inputs: { ...inputs },
        interestAmount,
        totalInvestment,
        pricePerShare,
        equityPercentage,
        sharesReceived,
        conversion,
        date: new Date().toLocaleDateString()
      });
      
      setLoading(false);
    }, 800); // Simulate calculation time
  };

  const handleInputChange = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  
  const handleDownloadPdf = async () => {
    if (!results) {
      toast({
        title: "No results to download",
        description: "Please calculate results first before downloading",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await calculatorToPdf(results);
      toast({
        title: "PDF Downloaded",
        description: "Your calculation results have been downloaded as a PDF",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was a problem generating your PDF",
        variant: "destructive"
      });
    }
  };
  
  const handleSendEmail = async () => {
    if (!results) {
      toast({
        title: "No results to send",
        description: "Please calculate results first before sending via email",
        variant: "destructive"
      });
      return;
    }
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await sendCalculatorResults(email, results);
      toast({
        title: "Email Sent",
        description: `Your calculation results have been sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Email failed",
        description: "There was a problem sending your email",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    // Calculate initial results when component mounts
    calculateEquity();
  }, []);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div id="calculator" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Convertible Note Calculator</h2>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Visualize how convertible notes will affect your startup's cap table and understand
            the true cost of this financing mechanism.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-dark-green">Input Parameters</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="companyValuation" className="calculator-label">
                      Company Valuation (Pre-Money)
                    </Label>
                    <span className="text-sm flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      {formatCurrency(inputs.companyValuation)}
                    </span>
                  </div>
                  <Slider
                    id="companyValuation"
                    min={10000000}
                    max={500000000}
                    step={5000000}
                    value={[inputs.companyValuation]}
                    onValueChange={(values) => handleInputChange('companyValuation', values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/70">
                    <span>₹1 Cr</span>
                    <span>₹50 Cr</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="investmentAmount" className="calculator-label">
                      Investment Amount
                    </Label>
                    <span className="text-sm flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      {formatCurrency(inputs.investmentAmount)}
                    </span>
                  </div>
                  <Slider
                    id="investmentAmount"
                    min={500000}
                    max={50000000}
                    step={500000}
                    value={[inputs.investmentAmount]}
                    onValueChange={(values) => handleInputChange('investmentAmount', values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/70">
                    <span>₹5 L</span>
                    <span>₹5 Cr</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="discountRate" className="calculator-label">
                      Discount Rate
                    </Label>
                    <span className="text-sm">{inputs.discountRate}%</span>
                  </div>
                  <Slider
                    id="discountRate"
                    min={0}
                    max={50}
                    step={1}
                    value={[inputs.discountRate]}
                    onValueChange={(values) => handleInputChange('discountRate', values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/70">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="interestRate" className="calculator-label">
                      Interest Rate
                    </Label>
                    <span className="text-sm">{inputs.interestRate}% per year</span>
                  </div>
                  <Slider
                    id="interestRate"
                    min={0}
                    max={15}
                    step={0.5}
                    value={[inputs.interestRate]}
                    onValueChange={(values) => handleInputChange('interestRate', values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/70">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="term" className="calculator-label">
                      Term Length
                    </Label>
                    <span className="text-sm">{inputs.term} months</span>
                  </div>
                  <Slider
                    id="term"
                    min={6}
                    max={36}
                    step={1}
                    value={[inputs.term]}
                    onValueChange={(values) => handleInputChange('term', values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/70">
                    <span>6 months</span>
                    <span>36 months</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="valuationCap" className="calculator-label">
                      Valuation Cap
                    </Label>
                    <span className="text-sm flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      {formatCurrency(inputs.valuationCap)}
                    </span>
                  </div>
                  <Slider
                    id="valuationCap"
                    min={10000000}
                    max={500000000}
                    step={5000000}
                    value={[inputs.valuationCap]}
                    onValueChange={(values) => handleInputChange('valuationCap', values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/70">
                    <span>₹1 Cr</span>
                    <span>₹50 Cr</span>
                  </div>
                </div>
                
                <Button 
                  onClick={calculateEquity} 
                  disabled={loading} 
                  className="w-full mt-2 bg-gold text-charcoal hover:bg-gold/90"
                >
                  {loading ? "Calculating..." : "Calculate Equity"}
                </Button>
              </div>
            </Card>
            
            {/* Email & Download Section */}
            <Card className="p-6 shadow-card mt-5">
              <h3 className="text-xl font-semibold mb-4 text-dark-green">Save Your Results</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="calculator-label">Email Address</Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="calculator-input"
                    />
                    <Button
                      onClick={handleSendEmail}
                      className="ml-2 bg-dark-green text-white hover:bg-dark-green/90"
                      disabled={!email}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Button
                    onClick={handleDownloadPdf}
                    className="w-full bg-mint-green text-dark-green hover:bg-mint-green/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Results as PDF
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {results && (
              <CalculatorResults
                results={results}
                formatCurrency={formatCurrency}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertibleNoteCalculator;
