import React from 'react';
import { Play } from 'lucide-react';
import { FEATURES_DATA } from '../../data/constants';

const WhyChooseSection = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          TẠI SAO NÊN CHỌN<br />
          <span className="text-orange-500">CAMCREW</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            {FEATURES_DATA.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-orange-500 mt-1 p-2 bg-gray-800 rounded-lg">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            {FEATURES_DATA.slice(2).map((feature, index) => (
              <div key={index + 2} className="flex items-start space-x-4">
                <div className="text-orange-500 mt-1 p-2 bg-gray-800 rounded-lg">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="w-80 h-52 bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
            <Play className="w-16 h-16 text-orange-500 relative z-10" />
            <div className="absolute top-4 right-4 text-xs text-gray-400">Demo Video</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;