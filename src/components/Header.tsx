
import React from 'react';
import { IndianRupee } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-dark-green text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <IndianRupee size={28} className="text-gold" />
            <h1 className="text-2xl font-bold text-white">Convertible Note Calculator</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#calculator" className="hover:text-gold transition-colors">Calculator</a></li>
              <li><a href="#how-it-works" className="hover:text-gold transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-gold transition-colors">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
