import React, { useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';

const SubscriptionUpgradePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('6-month');

  const plans = [
    {
      id: '1-month',
      name: 'Gói 1 tháng',
      price: 89000,
      period: '/THÁNG',
      description: 'Dành cho freelancer mới muốn tăng khả năng nhận job, hiển thị hồ sơ và được gợi ý công việc ưu tiên theo ngân sách và phong cách cá nhân.',
      features: [
        'Được boost hồ sơ 1 lần/tuần miễn phí',
        'Ứng tuyển job không giới hạn',
        'Gợi ý job thông minh theo lịch rảnh và phong cách quay',
        'Gắn nhãn "Freelancer đã được xác minh"'
      ],
      buttonText: 'Đăng ký ngay',
      buttonClass: 'bg-[#FF9500] hover:bg-orange-600 text-white',
      cardClass: 'bg-gray-800 border-gray-700'
    },
    {
      id: '6-month',
      name: 'Gói 6 tháng',
      price: 489000,
      period: '/6THÁNG',
      description: 'Dành cho nhân sự chuyên nghiệp muốn đầu tư dài hạn và nâng cấp hồ sơ cá nhân, tăng cơ hội hợp tác với khách hàng tiềm năng.',
      features: [
        'Boost hồ sơ 2 lần/tuần miễn phí',
        'Ứng tuyển job không giới hạn',
        'Ưu tiên duyệt hồ sơ nhanh hơn',
        'Gợi ý job thông minh theo lịch rảnh và phong cách quay',
        'Gắn nhãn "Freelancer đã được xác minh"'
      ],
      buttonText: 'Đăng ký ngay',
      buttonClass: 'bg-gray-800 hover:bg-gray-700 text-white',
      cardClass: 'bg-[#FF9500] border-orange-400',
      popular: true
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = (plan) => {
    console.log('Subscribing to plan:', plan);
    // Handle subscription logic here
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Nâng cấp tài khoản
          </h1>
          <h2 className="text-[#FF9500] text-2xl md:text-3xl font-bold">
            Mở khóa nhiều quyền lợi hơn
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${plan.cardClass} rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 relative flex flex-col h-full`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    PHỔ BIẾN NHẤT
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-4 ${plan.popular ? 'text-black' : 'text-[#FF9500]'}`}>
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline mb-4">
                  <span className={`text-4xl md:text-5xl font-bold ${plan.popular ? 'text-black' : 'text-[#FF9500]'}`}>
                    {formatPrice(plan.price)}đ
                  </span>
                  <span className={`text-lg ml-1 ${plan.popular ? 'text-gray-800' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed ${plan.popular ? 'text-gray-800' : 'text-gray-300'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.popular ? 'bg-black' : 'bg-[#FF9500]'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-white'}`} />
                      </div>
                      <span className={`text-sm ${plan.popular ? 'text-gray-800' : 'text-gray-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe Button */}
              <div className="mt-auto">
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${plan.buttonClass}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-white text-2xl font-bold mb-6">
              Tại sao nên nâng cấp tài khoản?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF9500] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Boost Hồ Sơ</h4>
                <p className="text-gray-400 text-sm">
                  Hồ sơ của bạn sẽ xuất hiện ở vị trí ưu tiên, tăng cơ hội được khách hàng chọn
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF9500] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Ưu Tiên Duyệt</h4>
                <p className="text-gray-400 text-sm">
                  Hồ sơ và dịch vụ của bạn sẽ được duyệt nhanh chóng, không phải chờ đợi lâu
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF9500] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Xác Minh Uy Tín</h4>
                <p className="text-gray-400 text-sm">
                  Nhận badge "Đã xác minh" tăng độ tin cậy và thu hút khách hàng hơn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-white text-2xl font-bold text-center mb-8">
              Câu hỏi thường gặp
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Tôi có thể hủy gói đăng ký bất cứ lúc nào không?
                </h4>
                <p className="text-gray-400 text-sm">
                  Có, bạn có thể hủy gói đăng ký bất cứ lúc nào. Tuy nhiên, chúng tôi không hoàn lại phí đã thanh toán.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Gói 6 tháng có thực sự tiết kiệm hơn không?
                </h4>
                <p className="text-gray-400 text-sm">
                  Có, gói 6 tháng giúp bạn tiết kiệm 45% so với việc đăng ký gói 1 tháng 6 lần liên tiếp.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Tôi sẽ nhận được gì ngay sau khi nâng cấp?
                </h4>
                <p className="text-gray-400 text-sm">
                  Ngay sau khi nâng cấp, bạn sẽ nhận được badge xác minh, khả năng boost hồ sơ và ưu tiên trong tìm kiếm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionUpgradePage;