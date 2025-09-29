import React from "react";
import { Play } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assets/images/logo/logo_square.png";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-snug">
              <span className="text-[#FF9500]">CAMCREW</span>
              <br />
              HOẠT ĐỘNG THẾ NÀO?
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>Với 3 bước cơ bản:</p>
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="w-8 h-8 bg-[#FF9500] text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4">
                    1
                  </span>
                  Đăng yêu cầu quay phim
                </p>
                <p className="flex items-center">
                  <span className="w-8 h-8 bg-[#FF9500] text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4">
                    2
                  </span>
                  Nhận báo giá từ thợ quay phù hợp
                </p>
                <p className="flex items-center">
                  <span className="w-8 h-8 bg-[#FF9500] text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4">
                    3
                  </span>
                  Chọn người phù hợp, ký hợp đồng và thanh toán an toàn
                </p>
              </div>
            </div>
            <Button variant="ghost" className="mt-8 text-lg px-6 py-3 cursor-pointer hover:underline hover:text-orange-600">
              Xem hướng dẫn chi tiết →
            </Button>
          </div>

          <div className="lg:w-1/2 flex items-center justify-end">
            <div className="w-80 h-80   ">
              <img src={logo} alt="CamCrew Logo" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
