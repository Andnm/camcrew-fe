import React from 'react';
import { Camera } from 'lucide-react';
import { NAV_ITEMS } from '../../data/constants';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-orange-500">CamCrew</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {NAV_ITEMS.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-sm hover:text-orange-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white hover:text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;