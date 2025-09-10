import React from 'react';
import { Camera } from 'lucide-react';
import { SOCIAL_LINKS } from '../../data/constants';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-orange-500">CamCrew</span>
          </div>
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                aria-label={social.name}
              >
                {social.icon && <social.icon className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;