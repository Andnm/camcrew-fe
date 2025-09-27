import React from 'react';
import { MapPin, Clock, Star, User } from 'lucide-react';
import { mockData } from '../../data/mockData';

const ServiceCard = ({ service }) => {
  const cameraman = mockData.users.find(user => user.id === service.cameraman_id);
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              {cameraman?.avatar_url ? (
                <img 
                  src={cameraman.avatar_url} 
                  alt={cameraman.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold">{service.title}</h3>
              <p className="text-gray-400 text-sm">{cameraman?.full_name}</p>
            </div>
          </div>
          <div className="text-orange-500 font-bold text-lg">
            {new Intl.NumberFormat('vi-VN').format(service.amount)} VNĐ
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{service.areas.join(', ')}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{service.time_of_day.map(time => {
              const timeMap = {
                morning: 'Sáng',
                afternoon: 'Chiều', 
                evening: 'Tối'
              };
              return timeMap[time];
            }).join(', ')}</span>
          </div>
          
          {cameraman?.avg_rating > 0 && (
            <div className="flex items-center text-gray-300 text-sm">
              <Star className="w-4 h-4 mr-2 text-orange-500" />
              <span>{cameraman.avg_rating}/5</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {service.categories.map((category, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Thuê ngay
          </button>
          <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors">
            Lưu tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;