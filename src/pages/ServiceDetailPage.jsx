import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Clock, Users, Video, Camera, CheckCircle, Shield } from 'lucide-react';
import Header from '../components/layout/Header';
import { getDetailServiceById } from '../api/services';
import { SERVICE_STYLES, SERVICE_CATEGORIES, SERVICE_AREAS } from '../utils/constants';
import ServiceDetailSkeleton from '../components/services/ServiceDetailSkeleton';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CreateBookingModal from '../components/bookings/CreateBookingModal';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openBooking, setOpenBooking] = useState(false);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const response = await getDetailServiceById(id);
        setService(response);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchServiceDetail();
  }, [id]);

  const getLabel = (value, options) => {
    const option = options?.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  if (loading) return <ServiceDetailSkeleton />;

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Không tìm thấy dịch vụ</div>
      </div>
    );
  }

  const cameraman = service?.cameraman_id || {};

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Dịch vụ', to: '/services' },
            { label: service.title },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Service content */}
          <div className="flex-1">
            <div className="bg-gray-900 rounded-lg p-8 mb-6">
              <h1 className="text-white text-3xl font-bold mb-8">{service.title}</h1>

              {/* Info blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Price */}
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-4 border-2 border-white rounded" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Mức giá</p>
                    <p className="text-[#FF9500] font-bold text-lg">
                      {new Intl.NumberFormat('vi-VN').format(service.amount)} VND
                    </p>
                  </div>
                </div>

                {/* Areas */}
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Địa điểm</p>
                    <p className="text-[#FF9500] font-semibold">
                      {(service.areas || []).map(area => getLabel(area, SERVICE_AREAS)).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phong cách</p>
                    <p className="text-[#FF9500] font-semibold">
                      {(service.categories || [])
                        .map(cat => getLabel(cat, SERVICE_CATEGORIES))
                        .join(' / ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-8">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    Thời gian nộp hồ sơ:{' '}
                    {service.date_get_job
                      ? new Date(service.date_get_job).toLocaleDateString('vi-VN')
                      : '—'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>59 lượt xem</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className="bg-[#FF9500] hover:bg-orange-500 cursor-pointer text-black font-bold px-8 py-4 rounded-lg flex-1 text-lg"
                  onClick={() => setOpenBooking(true)}
                >
                  Thuê ngay
                </button>
                <button
                  className="bg-transparent border-2 border-[#FF9500] cursor-pointer hover:bg-[#FF9500] hover:text-black text-[#FF9500] font-bold px-8 py-4 rounded-lg text-lg transition-colors"
                >
                  Lưu tin
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-white text-xl font-bold mb-4 border-l-4 border-[#FF9500] pl-3">
                  Chi tiết gói dịch vụ
                </h3>
                <div className="text-gray-300 space-y-2 text-sm leading-relaxed">
                  {service.description ? (
                    <div dangerouslySetInnerHTML={{ __html: service.description }} />
                  ) : (
                    <>
                      <p>• Thời gian quay: Trọn buổi (8 giờ hoặc chiều)</p>
                      <p>• Giao sản phẩm: Highlight 3-5 phút + Full lễ 30-40 phút</p>
                      <p>• Thiết bị sử dụng: Sony A7III, Gimbal, Lens Sigma, Mic thu âm</p>
                      <p>• Phong cách dựng: Cinematic / Documentary</p>
                      <p>• Chỉnh màu theo tone ấm, slow motion cảm xúc</p>
                      <p>• Phục vụ: Quay lễ cưới chính / Không bao gồm Pre-Wedding</p>
                      <p>• Thời gian giao video: Trong vòng 7-10 ngày</p>
                      <p>• Hỗ trợ: 1 lần chỉnh sửa miễn phí theo góp ý</p>
                      <p>• Phí di chuyển: +500.000 VND nếu ngoài TP.HCM</p>
                    </>
                  )}
                </div>
              </div>

              {/* Demos */}
              {Array.isArray(service.video_demo_urls) && service.video_demo_urls.length > 0 && (
                <div>
                  <h3 className="text-white text-xl font-bold mb-4 border-l-4 border-[#FF9500] pl-3">
                    Demo video thực tế
                  </h3>
                  <div className="gap-4">
                    {service.video_demo_urls.map((url, idx) => (
                      <div key={idx} className="relative bg-gray-700 rounded-lg overflow-hidden">
                        <video src={url} className="w-full object-cover" controls preload="metadata" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="w-full lg:w-96">
            {/* Box 1: Cameraman info (thay data cứng bằng dữ liệu thực) */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {cameraman?.avatar_url ? (
                    <img
                      src={cameraman.avatar_url}
                      alt={cameraman?.full_name || 'Cameraman'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-[#FF9500]" />
                  )}
                </div>
                <h3 className="text-white text-xl font-bold mb-1">
                  {cameraman?.full_name || '—'}
                </h3>

                {/* trạng thái xác minh */}
                <div className="mt-2 flex items-center justify-center gap-2">
                  {cameraman?.is_verified ? (
                    <span className="inline-flex items-center gap-1 text-green-400 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> Đã xác minh
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-400 text-sm font-medium">
                      <Shield className="w-4 h-4" /> Chưa xác minh
                    </span>
                  )}
                </div>
              </div>

              {/* Mô tả ngắn nếu có */}
              {cameraman?.description && (
                <p className="text-gray-300 text-sm mb-4 text-center">
                  {cameraman.description}
                </p>
              )}

              {/* Thông tin nhanh */}
              <div className="space-y-2 text-sm text-gray-300 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white truncate max-w-[60%] text-right">{cameraman?.email || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SĐT</span>
                  <span className="text-white">{cameraman?.phone_number || '—'}</span>
                </div>
                
              </div>

              {/* Nút xem hồ sơ cá nhân */}
              <Link
                to={cameraman?._id ? `/cameraman/${cameraman._id}` : '#'}
                className={`w-full inline-flex items-center justify-center font-bold py-3 rounded-lg ${cameraman?._id
                  ? 'bg-[#FF9500] hover:bg-orange-500 text-black'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Xem thông tin cá nhân
              </Link>
            </div>

            <div className='bg-gray-900 rounded-lg p-6 mb-6'>
                <p className="text-white font-semibold mb-3 text-sm">Dịch vụ liên quan</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(service.styles || []).map((style, index) => (
                    <span
                      key={`${style}-${index}`}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full ${index === 0 ? 'bg-[#FF9500] text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                    >
                      {getLabel(style, SERVICE_STYLES).toUpperCase()}
                    </span>
                  ))}
                </div>

                <p className="text-white font-semibold mb-3 text-sm">Phong cách</p>
                <div className="flex flex-wrap gap-2">
                  {(service.categories || []).map((category, index) => (
                    <span
                      key={`${category}-${index}`}
                      className="px-3 py-1.5 bg-gray-700 text-gray-300 text-xs font-medium rounded-full uppercase"
                    >
                      {getLabel(category, SERVICE_CATEGORIES)}
                    </span>
                  ))}
                </div>
            </div>

            {/* Box 2: Dịch vụ liên quan & Phong cách (tách sang box riêng) */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Gợi ý những gói dịch vụ</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 cursor-pointer transition-colors"
                  >
                    <div className="w-16 h-16 bg-gray-600 rounded overflow-hidden flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm mb-1 truncate">
                        {service.title}
                      </h4>
                      <p className="text-[#FF9500] text-xs mb-1">
                        {(service.categories || [])
                          .map((cat) => getLabel(cat, SERVICE_CATEGORIES))
                          .join(' / ')}
                      </p>
                      <p className="text-[#FF9500] font-bold text-sm mb-1">
                        {new Intl.NumberFormat('vi-VN').format(service.amount)} VND
                      </p>
                      <p className="text-gray-400 text-xs">
                        {(service.areas || [])
                          .map((area) => getLabel(area, SERVICE_AREAS))
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phần Phong cách + Styles */}


              <button className="w-full mt-4 text-[#FF9500] hover:text-orange-400 text-sm font-semibold underline">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreateBookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
        service={service}
      />
    </div>
  );
};

export default ServiceDetailPage;
