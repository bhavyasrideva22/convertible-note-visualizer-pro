
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-green text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Convertible Note Calculator</h3>
            <p className="text-sm text-white/80">
              A comprehensive tool for early-stage startups to visualize the impact of convertible notes on their cap table.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">What is a Convertible Note?</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Startup Funding Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Cap Table Management</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Contact</h3>
            <p className="text-sm text-white/80 mb-2">Questions or feedback about the calculator?</p>
            <a href="mailto:contact@convertiblenotes.com" className="text-gold hover:underline">contact@convertiblenotes.com</a>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Convertible Note Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
