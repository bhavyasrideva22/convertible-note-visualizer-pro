
import React from 'react';
import { ChartPie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-dark-green to-mint-green/80 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Visualize Your Convertible Note Impact
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90">
              Our interactive calculator helps early-stage startups understand the dilution impact of convertible notes on their cap table.
            </p>
            <div className="flex space-x-4">
              <Button 
                className="bg-gold text-charcoal hover:bg-gold/90 px-6 py-6 text-lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Calculating
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-dark-green px-6 py-6 text-lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-scale-in">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
              <ChartPie size={240} className="text-gold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
