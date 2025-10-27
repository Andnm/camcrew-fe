import React from 'react';
import { Camera, Users, Award, Target, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AboutUsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const ROUTES = {
    postJobSuccess: "/manage-account/activity-history",
    becomeCameraman: "/register",
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
    navigate(ROUTES.postJobSuccess);
  };

  const handleBecomeCameraman = () => {
    navigate(ROUTES.becomeCameraman);
  };

  const stats = [
    { number: '500+', label: 'Dự án hoàn thành' },
    { number: '200+', label: 'Thợ quay chuyên nghiệp' },
    { number: '1000+', label: 'Khách hàng hài lòng' },
    { number: '4.9/5', label: 'Đánh giá trung bình' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Chất lượng đảm bảo',
      description: 'Mọi thợ quay đều được kiểm duyệt kỹ lưỡng về kỹ năng và portfolio trước khi tham gia nền tảng.'
    },
    {
      icon: Heart,
      title: 'Minh bạch & Tin cậy',
      description: 'Hợp đồng rõ ràng, thanh toán an toàn, đảm bảo quyền lợi cho cả khách hàng và thợ quay.'
    },
    {
      icon: Zap,
      title: 'Nhanh chóng & Hiệu quả',
      description: 'Công nghệ AI matching giúp kết nối đúng người đúng job trong thời gian ngắn nhất.'
    },
    {
      icon: Users,
      title: 'Cộng đồng chuyên nghiệp',
      description: 'Xây dựng cộng đồng sáng tạo nơi những người đam mê có thể kết nối và phát triển cùng nhau.'
    }
  ];

  const team = [
    {
      name: 'Nguyễn Văn A',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
      description: '10+ năm kinh nghiệm trong ngành phim ảnh'
    },
    {
      name: 'Trần Thị B',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      description: 'Chuyên gia công nghệ với đam mê sáng tạo'
    },
    {
      name: 'Lê Văn C',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      description: 'Đảm bảo chất lượng dịch vụ hoàn hảo'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              VỀ <span className="text-[#FF9500]">CAMCREW</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Nền tảng kết nối khách hàng với thợ quay phim chuyên nghiệp,
              mang đến giải pháp tìm kiếm và thuê dịch vụ quay phim nhanh chóng,
              minh bạch và đáng tin cậy.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#FF9500] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                SỨ MỆNH CỦA <span className="text-[#FF9500]">CHÚNG TÔI</span>
              </h2>
              <div className="w-20 h-1 bg-[#FF9500] mx-auto mb-8"></div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-2xl shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                CamCrew ra đời với sứ mệnh <span className="font-semibold text-[#FF9500]">cách mạng hóa</span> cách
                mọi người tìm kiếm và thuê dịch vụ quay phim. Chúng tôi tin rằng mỗi dự án đều xứng đáng có được
                người thực hiện tốt nhất, và mỗi thợ quay tài năng đều xứng đáng có cơ hội tỏa sáng.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Thông qua công nghệ <span className="font-semibold">AI matching thông minh</span> và quy trình
                kiểm duyệt chặt chẽ, chúng tôi tạo ra một không gian minh bạch, an toàn và hiệu quả cho cả
                khách hàng lẫn thợ quay.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hơn cả một nền tảng, CamCrew là <span className="font-semibold text-[#FF9500]">cộng đồng kết nối</span> những
                người đam mê sáng tạo nội dung video, nơi ước mơ và cơ hội gặp nhau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              GIÁ TRỊ CỐT LÕI
            </h2>
            <p className="text-xl text-gray-400">
              Những gì chúng tôi tin tưởng và hướng tới
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <div className="w-14 h-14 bg-[#FF9500] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ĐỘI NGŨ <span className="text-[#FF9500]">LÃNH ĐẠO</span>
            </h2>
            <p className="text-xl text-gray-600">
              Những con người đứng sau CamCrew
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-[#FF9500] font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            SẴN SÀNG BẮT ĐẦU VỚI CAMCREW?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Tham gia cộng đồng của chúng tôi ngay hôm nay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePostJob}
              className="cursor-pointer bg-white text-[#FF9500] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Đăng job ngay →
            </button>

            <button
              onClick={handleBecomeCameraman}
              className="cursor-pointer border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Trở thành thợ quay →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;