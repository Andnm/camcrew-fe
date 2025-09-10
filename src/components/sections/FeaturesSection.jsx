import React from 'react';
import { Play } from 'lucide-react';
import Button from '../ui/Button';

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-orange-500">CAMCREW</span><br />
              HOẠT ĐỘNG THẾ NÀO?
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>Với 3 bước cơ bản:</p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Đăng yêu cầu quay phim
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Nhận báo giá từ thợ quay phù hợp
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Chọn người phù hợp, ký hợp đồng và thanh toán an toàn
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="mt-6"
            >
              Xem hướng dẫn chi tiết →
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="w-64 h-64 bg-black rounded-3xl flex items-center justify-center mx-auto relative overflow-hidden">
              <div className="w-32 h-32 border-4 border-orange-500 rounded-full flex items-center justify-center">
                <Play className="w-12 h-12 text-orange-500" />
              </div>
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500 rounded-full opacity-20"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-orange-500 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;