import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign } from 'lucide-react';
import Header from '../components/layout/Header';
import ServiceCard from '../components/services/ServiceCard';
import { mockData } from '../data/mockData';

const ServicesPage = () => {
  const [filters, setFilters] = useState({
    category: [],
    location: [],
    priceRange: [0, 50000000]
  });

  const approvedServices = mockData.services.filter(service => service.status === 'approved');

  return (
    <div className="min-h-screen bg-black">
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-white text-xl font-bold mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                CUỘC HỘI
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-orange-500 font-semibold mb-3 flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Bộ lọc
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Quay phim
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Chụp ảnh
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Flycam
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      FPV
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-500 font-semibold mb-3">Theo phong cách</h3>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Cinematic
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Truyền thống
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Highlight
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      BTS
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Documentary
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-500 font-semibold mb-3">Theo địa điểm</h3>
                  <select className="w-full bg-gray-700 text-white rounded-lg p-2 text-sm">
                    <option>Tìm kiếm</option>
                    <option>Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Bình Dương</option>
                    <option>Cần Thơ</option>
                    <option>Đồng Nai</option>
                    <option>Bến Hòa</option>
                  </select>
                  
                  <div className="space-y-2 mt-3">
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Hồ Chí Minh
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Hà Nội
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Bình Dương
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Cần Thơ
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Đồng Nai
                    </label>
                    <label className="flex items-center text-gray-300 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Bến Hòa
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-500 font-semibold mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Mức giá mong muốn
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <input 
                      type="text" 
                      placeholder="Min" 
                      className="flex-1 bg-gray-700 text-white text-sm rounded-lg p-2"
                      defaultValue="1.000.000"
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                      type="text" 
                      placeholder="Max"
                      className="flex-1 bg-gray-700 text-white text-sm rounded-lg p-2"
                      defaultValue="5.000.000"
                    />
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-lg">
                    <div className="h-2 bg-orange-500 rounded-lg" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-white text-2xl font-bold mb-2">DANH SÁCH THỢ</h1>
              <p className="text-gray-400">Tìm thấy {approvedServices.length} dịch vụ phù hợp</p>
            </div>

            <div className="space-y-4">
              {approvedServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;