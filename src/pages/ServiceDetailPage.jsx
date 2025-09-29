import React from 'react';
import { ArrowLeft, Play, MapPin, Clock, Star, Heart, Share2 } from 'lucide-react';
import Header from '../components/layout/Header';
import { mockData } from '../data/mockData';

const ServiceDetailPage = ({ serviceId = 100 }) => {
  const service = mockData.services.find(s => s.id === serviceId);
  const cameraman = mockData.users.find(user => user.id === service.cameraman_id);
  const reviews = mockData.reviews.filter(r => r.cameraman_id === service.cameraman_id);
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <ArrowLeft className="w-6 h-6 text-gray-400 mr-4 cursor-pointer" />
                <h1 className="text-white text-2xl font-bold">{service.title}</h1>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Mức giá: {new Intl.NumberFormat('vi-VN').format(service.amount)} VND
                  </span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    Đã xác minh
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {service.areas[0]}
                  </span>
                  <span className="text-gray-300 text-sm">
                    Phong cách: {service.categories.join(' / ')}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex-1">
                  Thuê ngay
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">
                  Lưu tin
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-[#FF9500] text-lg font-semibold mb-3">Chi tiết gói dịch vụ</h3>
                <div className="text-gray-300 space-y-2">
                  <p>• Thời gian quay: Trọn buổi (8 giờ hoặc chiều)</p>
                  <p>• Giao sản phẩm: Highlight 3-5 phút + Full lễ 30-40 phút</p>
                  <p>• Thiết bị sử dụng: Sony A7III, Gimbal, Lens Sigma, Mic thu âm</p>
                  <p>• Phong cách dựng: Cinematic / Documentary</p>
                  <p>• Chỉnh màu theo tone ấm, slow motion cảm xúc</p>
                  <p>• Phụ vụ: Quay lễ cưới chính / Không bao gồm Pre-Wedding</p>
                  <p>• Thời gian giao video: Trong vòng 7-10 ngày</p>
                  <p>• Hỗ trợ: 1 lần chỉnh sửa miễn phí theo góp ý</p>
                  <p>• Phí di tình: +500.000 VND nếu ngoài TP.HCM</p>
                </div>
              </div>

              <div>
                <h3 className="text-[#FF9500] text-lg font-semibold mb-3">Demo video thực tế</h3>
                <p className="text-gray-400 text-sm mb-4">Lễ cưới tại Thảo Điền | Quay & dựng gọi Cinematic + Highlight</p>
                
                <div className="relative bg-gray-700 rounded-lg overflow-hidden h-80">
                  <img 
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop" 
                    alt="Wedding demo video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-orange-500 rounded-full p-4 cursor-pointer hover:bg-orange-600 transition-colors">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-3 overflow-hidden">
                  {cameraman.avatar_url ? (
                    <img 
                      src={cameraman.avatar_url} 
                      alt={cameraman.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">
                        {cameraman.full_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-white text-xl font-bold">{cameraman.full_name}</h3>
                <p className="text-[#FF9500] text-sm">Cinematic Videographer</p>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-green-500 text-sm">Đã xác minh</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mb-4">
                Đã xác minh
              </button>

              <div className="space-y-3">
                <div className="text-gray-300 text-sm">
                  <strong>Cinematic Videographer</strong><br/>
                  Uy tín từ năm 2020, TP.HCM + các thành lần cận<br/>
                  Số năm kinh nghiệm: 3 năm
                </div>
                
                <div className="text-gray-300 text-sm">
                  Xem thêm các nhiều thể loại khác
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full">PHIM CƯỚI</span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">SỰ KIỆN</span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">CLIP</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">CINEMATIC</span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">TRADITIONAL</span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">HIGHLIGHT</span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">ARTISTIC</span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">BTS</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Gợi ý những gói dịch vụ</h3>
              <div className="space-y-4">
                {mockData.services.filter(s => s.cameraman_id === service.cameraman_id && s.id !== service.id).map(relatedService => (
                  <div key={relatedService.id} className="flex space-x-3 p-3 bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                      <Play className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{relatedService.title}</h4>
                      <p className="text-[#FF9500] text-sm">{relatedService.categories.join(' / ')}</p>
                      <p className="text-[#FF9500] font-semibold text-sm">
                        {new Intl.NumberFormat('vi-VN').format(relatedService.amount)} VND
                      </p>
                      <p className="text-gray-400 text-xs">{relatedService.areas[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-[#FF9500] hover:text-orange-400 text-sm font-medium">
                Xem thêm
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Demo video nổi bật</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-video bg-gray-700 rounded overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-151974149767${i}-61148186385${i}?w=300&h=200&fit=crop`}
                      alt={`Demo ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold">Đánh giá</h3>
                <div className="flex items-center">
                  <div className="flex text-[#FF9500] mr-2">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-white text-lg font-bold">5</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <span className="w-8 text-gray-400">5 ★</span>
                  <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <span className="text-gray-400">{reviews.length}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-8 text-gray-400">4 ★</span>
                  <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                  <span className="text-gray-400">0</span>
                </div>
              </div>

              <button className="w-full mt-4 text-[#FF9500] hover:text-orange-400 font-medium flex items-center justify-center">
                Viết bài đánh giá
                <Share2 className="w-4 h-4 ml-2" />
              </button>

              <div className="mt-6 space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-t border-gray-700 pt-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                      <div>
                        <p className="text-white font-medium text-sm">Nguyễn Văn B</p>
                        <p className="text-gray-400 text-xs">Khách hàng</p>
                        <div className="flex text-[#FF9500] text-xs">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;