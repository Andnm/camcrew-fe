import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Button from '../ui/Button';
import { PORTFOLIO_DATA } from '../../data/constants';

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === PORTFOLIO_DATA.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? PORTFOLIO_DATA.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          MỘT SỐ THỢ QUAY <span className="text-orange-500">NỔI BẬT</span>
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {PORTFOLIO_DATA.map((portfolio, index) => (
                <div key={portfolio.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 relative group">
                    <img 
                      src={portfolio.image} 
                      alt={portfolio.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {portfolio.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-lg text-gray-800">{portfolio.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{portfolio.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-orange-500 font-semibold text-sm">Xem chi tiết →</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-orange-500 text-sm">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {PORTFOLIO_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button variant="primary">
            Xem tất cả →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;