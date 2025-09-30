import React from "react";
import { FEATURES_DATA } from "../../data/constants";
import { CheckCircle } from "lucide-react";
import whyChoose1 from "../../assets/images/sections/why_choose_1.png";
import whyChoose2 from "../../assets/images/sections/why_choose_2.png";

const WhyChooseSection = () => {
  const leftCol = FEATURES_DATA.slice(0, 2);
  const rightCol = FEATURES_DATA.slice(2);

  return (
    <section className="bg-black text-white pt-20 pb-30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
              TẠI SAO NÊN CHỌN
              <br />
              <span className="text-[#FF9500]">CAMCREW</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {leftCol.map((feature, idx) => (
                <div key={`l-${idx}`} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-7 h-7 rounded-full bg-transparent border border-orange-500/60 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#FF9500]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}

              {rightCol.map((feature, idx) => (
                <div key={`r-${idx}`} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-7 h-7 rounded-full bg-transparent border border-orange-500/60 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#FF9500]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-start">

            <img
              src={whyChoose1}
              alt="Why choose CamCrew 1"
              className="relative z-20 w-72 md:w-96 h-96 object-cover rounded-lg shadow-xl"
            />

            <img
              src={whyChoose2}
              alt="Why choose CamCrew 2"
              className="absolute top-28 md:top-28 left-40 md:left-60 z-10 w-56 md:w-80 h-72 md:h-80 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
