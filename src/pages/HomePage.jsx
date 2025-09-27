import React from 'react';
import HeroSection from '../components/home-sections/HeroSection';
import FeaturesSection from '../components/home-sections/FeaturesSection';
import WhyChooseSection from '../components/home-sections/WhyChooseSection';
import PortfolioCarousel from '../components/home-sections/PortfolioCarousel';
import TestimonialsSection from '../components/home-sections/TestimonialsSection';
import CTASection from '../components/home-sections/CTASection';

const App = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyChooseSection />
        <PortfolioCarousel />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default App;