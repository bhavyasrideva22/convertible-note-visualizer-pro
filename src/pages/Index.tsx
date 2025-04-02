
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ConvertibleNoteCalculator from '@/components/ConvertibleNoteCalculator';
import CalculatorExplanation from '@/components/CalculatorExplanation';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <Hero />
      <ConvertibleNoteCalculator />
      <CalculatorExplanation />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
