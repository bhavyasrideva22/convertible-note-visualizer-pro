
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div id="faq" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Common questions about convertible notes for Indian startups
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-card">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-left text-lg font-medium">What is the difference between a convertible note and a SAFE?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-charcoal/80">
                <p>
                  The main differences are that convertible notes have interest rates and maturity dates, while SAFEs (Simple Agreement for Future Equity) 
                  don't. Convertible notes are debt instruments that convert to equity, accruing interest until conversion. SAFEs are warrants that give investors 
                  the right to equity in a future round without the debt components. In India, convertible notes are more common due to clearer regulatory treatment, 
                  but SAFEs are gaining popularity due to their simplicity.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-left text-lg font-medium">How do convertible notes affect future funding rounds?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-charcoal/80">
                <p>
                  Convertible notes impact future funding rounds in several ways. When they convert, they increase the number of shareholders and dilute existing equity. 
                  They can complicate cap table discussions with new investors who may want to understand the full dilution impact. If the valuation cap was set much 
                  lower than the new round's valuation, convertible note holders may get significantly better terms than new investors, potentially causing friction. 
                  For Indian startups, it's important to clearly communicate the outstanding convertible note terms to potential future investors.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-left text-lg font-medium">Are there any tax implications for convertible notes in India?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-charcoal/80">
                <p>
                  Yes, there are important tax considerations. Interest accrued on convertible notes is taxable income for the company. For investors, gains from 
                  convertible notes are generally treated as capital gains when they eventually sell their equity shares. For foreign investors, there may be additional 
                  considerations related to Foreign Direct Investment (FDI) regulations and withholding tax requirements. It's advisable for both startups and investors 
                  to consult with tax experts familiar with Indian startup financing to understand the specific implications for their situation.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-left text-lg font-medium">What happens if my startup fails to raise another round before the maturity date?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-charcoal/80">
                <p>
                  If a startup doesn't raise a qualifying round before the convertible note's maturity date, several scenarios may unfold:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The investor and company may agree to extend the maturity date</li>
                  <li>The note might convert to equity at a pre-agreed valuation (often specified in the original agreement)</li>
                  <li>The investor could theoretically demand repayment of the principal plus interest</li>
                </ul>
                <p className="mt-2">
                  In practice, especially in India, investors rarely demand repayment since early-stage startups typically lack the cash for repayment, and forcing 
                  repayment could kill the company, resulting in a total loss. Most investors work with founders to find a mutually beneficial solution, often 
                  converting to equity at a negotiated valuation.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-left text-lg font-medium">How should I set the valuation cap for my Indian startup?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-charcoal/80">
                <p>
                  Setting the valuation cap involves balancing investor protection with reasonable expectations for startup growth. Consider these factors:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Your current traction and metrics</li>
                  <li>The growth you expect before the next equity round</li>
                  <li>Typical valuations for your industry and stage in the Indian ecosystem</li>
                  <li>A premium (typically 25-50%) over what would be your current valuation</li>
                </ul>
                <p className="mt-2">
                  For early-stage Indian startups, valuation caps often range from ₹5 crore to ₹20 crore, depending on the sector and traction. It's crucial to 
                  model different scenarios using this calculator to understand how various caps might impact your cap table after conversion.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-left text-lg font-medium">Can foreign investors use convertible notes to invest in Indian startups?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-charcoal/80">
                <p>
                  Yes, since 2017, foreign investors can invest in Indian startups through convertible notes, provided:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The startup is recognized by DPIIT (Department for Promotion of Industry and Internal Trade)</li>
                  <li>The minimum investment amount is ₹25 lakhs or more</li>
                  <li>The convertible note converts within 5 years of issuance</li>
                  <li>The sector allows foreign investment under the automatic route (some sectors require government approval)</li>
                </ul>
                <p className="mt-2">
                  Foreign investors should be aware that proper documentation and compliance with Foreign Exchange Management Act (FEMA) regulations is essential. 
                  Working with legal advisors experienced in cross-border startup investments is recommended.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
