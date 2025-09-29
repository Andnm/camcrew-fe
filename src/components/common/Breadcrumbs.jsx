import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-400 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
          )}
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-[#FF9500] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
