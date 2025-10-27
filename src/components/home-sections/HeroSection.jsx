import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { HERO_CONTENT } from "../../data/constants";
import heroBackground from "../../assets/images/sections/hero_background.png";
import { useAuth } from "../../context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleFindNow = () => {
    navigate("/services");
  };

  const handlePostJob = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập tài khoản Cameraman trước khi đăng job.");
      return;
    }

    if (user?.role_name?.toLowerCase() !== "cameraman") {
      toast.error("Chỉ Cameraman mới có thể đăng job.");
      return;
    }

    navigate("/manage-account/activity-history");
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-black/40"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {HERO_CONTENT.title.split("với")[0]}
            <br />
            với{HERO_CONTENT.title.split("với")[1]}
          </h1>

          <p className="text-lg mb-8 text-gray-300">
            {HERO_CONTENT.subtitle.split(",")[0]},<br />
            {HERO_CONTENT.subtitle.split(",").slice(1).join(",")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="cursor-pointer" onClick={handlePostJob}>
              {HERO_CONTENT.primaryButton}
            </Button>
            <Button variant="secondary" className="cursor-pointer" onClick={handleFindNow}>
              {HERO_CONTENT.secondaryButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
