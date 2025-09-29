import React from 'react';
import { MapPin, Clock, Star, User, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES, SERVICE_TIME_OF_DAYS } from '../../utils/constants'

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  
  const cameraman = {
    id: service.cameraman_id,
    full_name: service.cameraman_name || "Nguyễn Văn A",
    avatar_url: service.cameraman_avatar,
    avg_rating: service.cameraman_rating || 4.8
  };

  const handleClick = () => {
    navigate(`/services/${service.id}`);
  };

  const getCategoryLabel = (categoryValue) => {
    const category = SERVICE_CATEGORIES.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  const getTimeLabel = (timeValue) => {
    const time = SERVICE_TIME_OF_DAYS.find(t => t.value === timeValue);
    return time ? time.label : timeValue;
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-200 cursor-pointer border border-gray-700 hover:border-orange-500/30"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
              {cameraman?.avatar_url ? (
                <img 
                  src={cameraman.avatar_url} 
                  alt={cameraman.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-[#FF9500]" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Price */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{cameraman?.full_name}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="text-[#FF9500] font-bold text-xl">
                  {new Intl.NumberFormat('vi-VN').format(service.amount)} VND
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-2 mb-4">
              {/* Location */}
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="truncate">
                  {service.areas ? service.areas.join(', ') : 'TP.HCM và vùng lân cận'}
                </span>
              </div>
              
              {/* Time of Day */}
              {service.time_of_day && service.time_of_day.length > 0 && (
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">
                    {service.time_of_day.map(time => getTimeLabel(time)).join(', ')}
                  </span>
                </div>
              )}
              
              {/* Rating */}
              {cameraman?.avg_rating > 0 && (
                <div className="flex items-center text-gray-300 text-sm">
                  <Star className="w-4 h-4 mr-2 text-[#FF9500] flex-shrink-0" />
                  <span>{cameraman.avg_rating}/5</span>
                </div>
              )}
            </div>

            {/* Service Categories/Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Service Style Tag */}
              <span className="inline-flex items-center px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                Cinematic
              </span>
              
              {/* Categories */}
              {service.categories && service.categories.slice(0, 3).map((category, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full border border-gray-600"
                >
                  {getCategoryLabel(category)}
                </span>
              ))}
              
              {/* Show more indicator */}
              {service.categories && service.categories.length > 3 && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-400 text-xs font-medium rounded-full border border-gray-600">
                  +{service.categories.length - 3}
                </span>
              )}
            </div>

            {/* Description Preview */}
            {service.description && (
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {service.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Phong cách: Cinematic</span>
                <span>Thời lượng dự kiến: 1 buổi (3-4 tiếng)</span>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;