import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import Button from '../ui/Button';
import { PORTFOLIO_DATA } from '../../data/constants';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  // Custom navigation handlers
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Handle dot click
  const handleDotClick = (targetIndex) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(targetIndex);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          MỘT SỐ THỢ QUAY <span className="text-orange-500">NỔI BẬT</span>
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="px-16">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              speed={500}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 25,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                // Responsive breakpoints
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              className="portfolio-swiper"
            >
              {PORTFOLIO_DATA.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  {({ isActive }) => (
                    <div
                      className={`
                        relative w-80 h-80 rounded-2xl overflow-hidden cursor-pointer 
                        transition-all duration-500 ease-out mx-auto
                        ${isActive ? 'scale-100 z-20' : 'scale-90 z-10'}
                      `}
                    >
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      
                      {isActive ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="space-y-3">
                              <div className="inline-block">
                                <span className="bg-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
                                  {slide.category} - Phong cách
                                </span>
                              </div>
                              
                              <p className="text-sm leading-relaxed opacity-90 line-clamp-3">
                                {slide.description}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Side Cards Overlay */}
                          <div className="absolute inset-0 bg-black/40 transition-all duration-300"></div>                                        
                        </>
                      )}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {PORTFOLIO_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300 transform
                  ${index === currentIndex 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{PORTFOLIO_DATA.length}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="primary" className="px-8 py-3 hover:scale-105 transition-transform">
            Xem hồ sơ
          </Button>
        </div>
      </div>

      <style jsx>{`
        .portfolio-swiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .portfolio-swiper .swiper-slide-active {
          transform: scale(1);
        }
        
        .portfolio-swiper .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.9);
        }
        
        /* Ẩn navigation mặc định của Swiper */
        .portfolio-swiper .swiper-button-next,
        .portfolio-swiper .swiper-button-prev {
          display: none;
        }
        
        /* Ẩn pagination mặc định của Swiper */
        .portfolio-swiper .swiper-pagination {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PortfolioCarousel;