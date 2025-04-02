
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Book } from 'lucide-react';

const CalculatorExplanation = () => {
  return (
    <div id="how-it-works" className="py-12 bg-mint-green/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Understanding Convertible Notes</h2>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            A comprehensive guide to convertible notes for early-stage startups in India
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h3 className="text-2xl font-semibold mb-4 text-dark-green">What is a Convertible Note?</h3>
              <p className="mb-4">
                A convertible note is a form of short-term debt that converts into equity, typically in conjunction with a future financing round. 
                It's essentially a loan that automatically converts to equity shares when specified conditions are met, usually during the next 
                priced equity funding round.
              </p>
              
              <p className="mb-4">
                Convertible notes are particularly popular among early-stage startups in India because they allow founders and investors to 
                delay establishing a formal valuation until a later funding round when the company has more operating history and metrics to 
                support a valuation negotiation.
              </p>
              
              <div className="my-8 border-l-4 border-gold pl-4 py-2 bg-cream">
                <h4 className="text-lg font-semibold text-dark-green">Key Benefits for Indian Startups</h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-gold h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">1</span>
                    <span>Simplifies early-stage fundraising by deferring complex valuation discussions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gold h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">2</span>
                    <span>Saves on legal costs compared to priced equity rounds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gold h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">3</span>
                    <span>Faster to close, allowing startups to quickly secure funding and focus on growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gold h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">4</span>
                    <span>Provides bridge financing between major equity rounds</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-dark-green">Key Terms to Understand</h3>
              
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="principal">
                  <AccordionTrigger className="font-medium">Principal Amount</AccordionTrigger>
                  <AccordionContent>
                    This is the initial investment amount that the investor provides to the company. In the Indian startup ecosystem, convertible 
                    note investments typically range from ₹25 lakhs to ₹2 crores for early-stage companies.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="interest">
                  <AccordionTrigger className="font-medium">Interest Rate</AccordionTrigger>
                  <AccordionContent>
                    Unlike equity investments, convertible notes accrue interest over time, typically between 4-8% annually in the Indian market. 
                    This interest is added to the principal amount when the note converts to equity, giving investors additional shares.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="maturity">
                  <AccordionTrigger className="font-medium">Maturity Date</AccordionTrigger>
                  <AccordionContent>
                    This is the deadline by which the convertible note must either convert to equity or be repaid. In India, maturity dates 
                    typically range from 18 to 24 months. If no qualified financing occurs before the maturity date, the investor and company 
                    must decide whether to extend the term, convert to equity at an agreed-upon valuation, or repay the loan.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="discount">
                  <AccordionTrigger className="font-medium">Discount Rate</AccordionTrigger>
                  <AccordionContent>
                    This is a percentage discount on the price per share that the investor will receive compared to what new investors pay in the qualifying 
                    financing round. Common discount rates in the Indian market range from 15% to 25%, rewarding early investors for taking on higher risk.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="valuation-cap">
                  <AccordionTrigger className="font-medium">Valuation Cap</AccordionTrigger>
                  <AccordionContent>
                    This sets a maximum company valuation at which the convertible note will convert, regardless of the actual valuation in the qualifying 
                    round. It protects early investors from excessive dilution if the company's valuation increases significantly. For example, if there's 
                    a ₹5 crore valuation cap and the company raises at a ₹10 crore valuation, the convertible note holders convert as if the valuation were 
                    still ₹5 crore, effectively doubling their equity stake compared to converting at the actual valuation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="qualified-financing">
                  <AccordionTrigger className="font-medium">Qualified Financing</AccordionTrigger>
                  <AccordionContent>
                    This is the trigger event that causes automatic conversion of the note into equity, typically defined as an equity financing round 
                    above a specified size (e.g., ₹1 crore or more). The definition of qualified financing is crucial and should be carefully negotiated.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <h3 className="text-xl font-semibold mb-3 text-dark-green">How Conversion Works</h3>
              <p className="mb-4">
                When a qualified financing occurs, the convertible note automatically converts into equity. The number of shares the noteholder receives 
                depends on the principal amount plus accrued interest, divided by the conversion price. The conversion price is determined by applying 
                either the discount rate or the valuation cap, whichever results in a lower price per share (more favorable to the investor).
              </p>
              
              <div className="bg-cream p-5 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-dark-green mb-2">Conversion Formula</h4>
                <p className="mb-2">The formula to calculate shares received upon conversion is:</p>
                <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
                  Shares = (Principal + Accrued Interest) ÷ Conversion Price
                </div>
                <p className="mt-3">Where Conversion Price is the lower of:</p>
                <ul className="mt-1 space-y-2 pl-5 list-disc">
                  <li>Price per share in the qualified financing × (1 - Discount Rate)</li>
                  <li>Valuation Cap ÷ Company's fully diluted capitalization</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-dark-green">Legal and Regulatory Considerations in India</h3>
              <p className="mb-4">
                In India, convertible notes are subject to specific regulations under the Foreign Exchange Management Act (FEMA) and 
                Companies Act. Since 2017, the Indian government has permitted startups to issue convertible notes to foreign investors, 
                provided the startup is recognized by the Department for Promotion of Industry and Internal Trade (DPIIT).
              </p>
              
              <p className="mb-4">
                Key regulatory considerations include:
              </p>
              <ul className="mb-6 space-y-2 pl-5 list-disc">
                <li>The minimum investment amount is ₹25 lakhs for foreign investors</li>
                <li>Convertible notes must convert into equity within 5 years</li>
                <li>Certain sectors require government approval for foreign investment through convertible notes</li>
                <li>Proper documentation and filings with the Reserve Bank of India (RBI) are essential</li>
              </ul>
              
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-dark-green" />
                <h3 className="text-xl font-semibold text-dark-green">Strategic Considerations for Founders</h3>
              </div>
              <p className="mb-4">
                While convertible notes offer advantages, founders should carefully consider these factors:
              </p>
              <ul className="mb-6 space-y-3 pl-5">
                <li className="flex items-start">
                  <div className="bg-mint-green h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5 mr-2">!</div>
                  <span><strong>Future Dilution:</strong> Despite delaying valuation, convertible notes still result in future dilution that can be difficult to accurately predict.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-mint-green h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5 mr-2">!</div>
                  <span><strong>Stacking Multiple Notes:</strong> Multiple convertible notes with different terms can create complexity and potentially lead to excessive dilution.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-mint-green h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5 mr-2">!</div>
                  <span><strong>Valuation Cap Negotiation:</strong> Setting the valuation cap too low can lead to significant dilution; too high and it becomes meaningless.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-mint-green h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5 mr-2">!</div>
                  <span><strong>Maturity Date Risk:</strong> If the startup cannot raise a qualified financing round before the maturity date, it may face difficult choices.</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-3 mb-4">
                <Book className="h-6 w-6 text-dark-green" />
                <h3 className="text-xl font-semibold text-dark-green">Alternatives to Convertible Notes</h3>
              </div>
              <p className="mb-4">
                Other financing instruments similar to convertible notes include:
              </p>
              <ul className="mb-6 space-y-2 pl-5 list-disc">
                <li><strong>SAFE (Simple Agreement for Future Equity):</strong> Created by Y Combinator, SAFEs are similar to convertible notes but without an interest rate or maturity date.</li>
                <li><strong>KISS (Keep It Simple Security):</strong> Created by 500 Startups, KISS agreements come in debt and equity versions with standardized terms.</li>
                <li><strong>Revenue-Based Financing:</strong> Increasingly popular in India, this financing method links repayments to monthly revenue.</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-card mb-6">
              <h3 className="text-xl font-semibold mb-4 text-dark-green">Why Use This Calculator</h3>
              <p className="mb-4 text-charcoal/80">
                Our Convertible Note Calculator helps Indian startup founders and investors:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-gold h-6 w-6 rounded-full flex items-center justify-center text-charcoal font-bold text-sm mt-0.5 mr-2">1</div>
                  <span>Visualize the impact of different convertible note terms on equity dilution</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold h-6 w-6 rounded-full flex items-center justify-center text-charcoal font-bold text-sm mt-0.5 mr-2">2</div>
                  <span>Understand which conversion mechanism (discount or cap) will apply in different scenarios</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold h-6 w-6 rounded-full flex items-center justify-center text-charcoal font-bold text-sm mt-0.5 mr-2">3</div>
                  <span>Make more informed decisions when negotiating terms with investors</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold h-6 w-6 rounded-full flex items-center justify-center text-charcoal font-bold text-sm mt-0.5 mr-2">4</div>
                  <span>Model different scenarios to prepare for future funding rounds</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-dark-green">Case Study: Indian Startup Success</h3>
              <p className="mb-4 text-charcoal/80">
                Bengaluru-based HealthTech startup MediConnect raised ₹1 crore through convertible notes in 2019 with these terms:
              </p>
              <ul className="space-y-2 mb-4">
                <li><strong>Investment:</strong> ₹1 crore</li>
                <li><strong>Interest Rate:</strong> 6%</li>
                <li><strong>Term:</strong> 18 months</li>
                <li><strong>Discount:</strong> 20%</li>
                <li><strong>Valuation Cap:</strong> ₹8 crore</li>
              </ul>
              <p className="mb-4 text-charcoal/80">
                12 months later, they raised a Series A at a ₹15 crore valuation. The convertible note investors converted at the ₹8 crore cap 
                (more favorable than the 20% discount), giving them approximately 13% equity instead of 7% if they had invested at the Series A valuation.
              </p>
              <p className="text-sm text-charcoal/70 italic">
                Note: This is a representative example based on typical market terms in India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorExplanation;
