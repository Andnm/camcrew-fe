import React from 'react';
import Button from '../ui/Button';
import { CTA_CONTENT } from '../../data/constants';

const CTASection = () => {
  return (
    <section className="relative bg-gray-900 text-white py-16">
      <div className="absolute inset-0 bg-cover bg-center opacity-30"
           style={{
             backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZGlhZ29uYWxIYXRjaCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQiIGhlaWdodD0iNCI+PHBhdGggZD0ibTAgNGw0LTRtLTEgMWwxLTFtLTEgNWwxLTEiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNkaWFnb25hbEhhdGNoKSIvPjwvc3ZnPg==')"
           }}>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {CTA_CONTENT.title.split('DỰ ÁN')[0]}
            <br />
            DỰ ÁN{CTA_CONTENT.title.split('DỰ ÁN')[1]}
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            {CTA_CONTENT.subtitle.split('nhanh chóng')[0]}
            <br />
            nhanh chóng{CTA_CONTENT.subtitle.split('nhanh chóng')[1]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              {CTA_CONTENT.primaryButton}
            </Button>
            <Button variant="secondary" size="lg">
              {CTA_CONTENT.secondaryButton}
            </Button>
          </div>
        </div>
        
        <div className="absolute top-8 right-8 w-32 h-32 opacity-10">
          <div className="w-full h-full border-4 border-orange-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-8 right-16 w-16 h-16 bg-orange-500 opacity-20 rounded-full"></div>
      </div>
    </section>
  );
};

export default CTASection;