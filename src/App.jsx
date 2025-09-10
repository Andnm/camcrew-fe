import React from 'react';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section components
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import WhyChooseSection from './components/sections/WhyChooseSection';
import PortfolioCarousel from './components/sections/PortfolioCarousel';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CTASection from './components/sections/CTASection';

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyChooseSection />
        <PortfolioCarousel />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;