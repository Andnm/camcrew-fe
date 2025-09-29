import React from "react";
import { Camera } from "lucide-react";
import { SOCIAL_LINKS } from "../../data/constants";
import logo from "../../assets/images/logo/horizontal_logo_with_text.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="block">
              <img src={logo} className="h-8 w-auto" alt="CamCrew Logo" />
            </Link>
          </div>
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-8 h-8 bg-[#FF9500] hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
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
