import React from 'react';
import { Bell, Calendar, Check, CreditCard, FileText, Star, TrendingUp, User } from 'lucide-react';

const SubscriptionUpgradePage = () => {
  const plans = [
    {
      id: 'monthly',
      name: 'Gói 1 tháng',
      price: '89.000đ',
      period: '/THÁNG',
      description: 'Dành cho freelancer mới muốn làm quen khả năng nhận job, hiển thị hồ sơ và được giới thiệu với phí hợp với hỗ trợ cơ bản và phong cách cá nhân.',
      features: [
        'Được boost hồ sơ 2 lần/tuần miễn phí',
        'Ứng tuyển job không giới hạn',
        'Gửi ý job thông minh theo sở thích rành và phong cách quay',
        'Gắn nhãn "Freelancer đã được xác minh"'
      ],
      isPopular: false,
      buttonText: 'Đăng ký ngay',
      buttonClass: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'sixmonth',
      name: 'Gói 6 tháng',
      price: '489.000đ',
      period: '/6THÁNG',
      description: 'Dành cho nhân sự chuyên nghiệp muốn đẩu tư dài hạn và nâng cấu hình ảnh cũng hấp tác với khách hàng tiềm năng.',
      features: [
        'Boost hồ sơ 2 lần/tuần miễn phí',
        'Ứng tuyển job không giới hạn',
        'Ưu tiên xuất hiện số nhanh hơn',
        'Gửy job thông minh theo lịch rành và phong cách quay',
        'Gắn nhãn "Freelancer đã được xác minh"'
      ],
      isPopular: true,
      buttonText: 'Đăng ký ngay',
      buttonClass: 'bg-gray-800 hover:bg-gray-700 text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="Nguyen Van A"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-white text-lg font-bold">Nguyễn Văn A</h2>
                <p className="text-gray-400 text-sm">Cinematic Videographer</p>
                <div className="mt-2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                    Đã xác minh
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Upload avatar</p>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <Calendar className="w-5 h-5" />
                  <span>Lịch sử hoạt động</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <FileText className="w-5 h-5" />
                  <span>Tin nhắn</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span>Thông báo</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Lịch thuê của tôi</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-orange-500 text-white">
                  <TrendingUp className="w-5 h-5" />
                  <span>Nâng cấp tài khoản</span>
                </button>
              </nav>

              <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors">
                Đăng xuất
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="text-center mb-8">
              <h1 className="text-white text-3xl font-bold mb-2">Nâng cấp tài khoản</h1>
              <h2 className="text-orange-500 text-2xl font-bold">Mở khóa nhiều quyền lợi hơn</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-gray-800 rounded-lg p-6 relative ${
                    plan.isPopular ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Phổ biến nhất
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-white text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-orange-500 text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.buttonClass}`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gray-800 rounded-lg p-8">
              <h3 className="text-white text-xl font-bold mb-6 text-center">Tại sao nên nâng cấp?</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Tăng độ tin cậy</h4>
                  <p className="text-gray-400 text-sm">Huy hiệu xác minh giúp khách hàng tin tưởng hơn</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Nhiều cơ hội hơn</h4>
                  <p className="text-gray-400 text-sm">Xuất hiện ưu tiên trong kết quả tìm kiếm</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Hỗ trợ chuyên nghiệp</h4>
                  <p className="text-gray-400 text-sm">Nhận hỗ trợ ưu tiên từ đội ngũ CamCrew</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionUpgradePage;