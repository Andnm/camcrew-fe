import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/constants';

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-orange-500">CẢM NHẬN</span> TỪ NGƯỜI DÙNG
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-orange-500 text-lg">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm mt-1">Khách hàng đã xác thực</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">500+</div>
              <div className="text-sm">Dự án hoàn thành</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">4.9/5</div>
              <div className="text-sm">Điểm đánh giá</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">200+</div>
              <div className="text-sm">Thợ quay chuyên nghiệp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;