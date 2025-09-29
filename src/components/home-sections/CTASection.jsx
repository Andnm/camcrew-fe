import React from "react";
import Button from "../ui/Button";
import { CTA_CONTENT } from "../../data/constants";
import ctaBackground from "../../assets/images/sections/cta_background.png";

const CTASection = () => {
  return (
    <section className="relative bg-black text-white min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ctaBackground})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {CTA_CONTENT.title.split("DỰ ÁN")[0]}
            <br />
            <span className="text-[#FF9500]">DỰ ÁN</span>
            {CTA_CONTENT.title.split("DỰ ÁN")[1]}
          </h2>

          <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed">
            {CTA_CONTENT.subtitle.split("nhanh chóng")[0]}
            <br />
            <span className="text-[#FF9500] font-semibold">nhanh chóng</span>
            {CTA_CONTENT.subtitle.split("nhanh chóng")[1]}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="cursor-pointer bg-[#FF9500] hover:bg-[#e68500] text-white font-semibold px-8 py-3 rounded-lg"
            >
              {CTA_CONTENT.primaryButton}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="cursor-pointer border-2 border-[#FF9500] text-[#FF9500] hover:bg-[#ff9500]/10 font-semibold px-8 py-3 rounded-lg"
            >
              {CTA_CONTENT.secondaryButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
