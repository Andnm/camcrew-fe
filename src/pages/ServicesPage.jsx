import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign } from 'lucide-react';
import Header from '../components/layout/Header';
import ServiceCard from '../components/services/ServiceCard';
import Pagination from '../components/common/Pagination';
import { listServices } from '../api/services';
import { SERVICE_STYLES, SERVICE_CATEGORIES, SERVICE_AREAS } from '../utils/constants';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalPages: 0,
    totalResults: 0
  });
  const [filters, setFilters] = useState({
    styles: [],
    categories: [],
    areas: [],
    min: 1000000,
    max: 5000000,
    search: ''
  });

  useEffect(() => {
    fetchServices(1);
  }, [filters]);

  const fetchServices = async (page = 1) => {
    setLoading(true);
    try {
      const response = await listServices({
        styles: filters.styles,
        categories: filters.categories,
        areas: filters.areas,
        min: filters.min,
        max: filters.max,
        search: filters.search,
        page: page,
        limit: pagination.pageSize
      });

      setServices(response.data || []);
      setPagination(response.pagination || {
        pageIndex: page,
        pageSize: 10,
        totalPages: 0,
        totalResults: 0
      });
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
      setPagination({
        pageIndex: page,
        pageSize: 10,
        totalPages: 0,
        totalResults: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchServices(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStyleChange = (styleValue) => {
    setFilters(prev => ({
      ...prev,
      styles: prev.styles.includes(styleValue)
        ? prev.styles.filter(s => s !== styleValue)
        : [...prev.styles, styleValue]
    }));
  };

  const handleCategoryChange = (categoryValue) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryValue)
        ? prev.categories.filter(c => c !== categoryValue)
        : [...prev.categories, categoryValue]
    }));
  };

  const handleLocationChange = (areasValue) => {
    setFilters(prev => ({
      ...prev,
      areas: prev.areas.includes(areasValue)
        ? prev.areas.filter(l => l !== areasValue)
        : [...prev.areas, areasValue]
    }));
  };

  const handlePriceChange = (type, value) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    setFilters(prev => ({
      ...prev,
      [type]: numericValue || 0
    }));
  };

  const resetFilters = () => {
    setFilters({
      styles: [],
      categories: [],
      areas: [],
      min: 1000000,
      max: 5000000,
      search: ''
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Same as before */}
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-white text-xl font-bold mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-[#FF9500]" />
                Bộ lọc
              </h2>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm dịch vụ..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg text-sm border border-gray-600 focus:border-orange-500 focus:outline-none"
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Service Styles */}
                <div>
                  <h3 className="text-[#FF9500] font-semibold mb-3">Theo dịch vụ</h3>
                  <div className="space-y-2">
                    {SERVICE_STYLES.map(style => (
                      <label key={style.value} className="flex items-center text-gray-300 text-sm hover:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2 rounded border-gray-600 bg-gray-700 text-[#FF9500] focus:ring-orange-500"
                          checked={filters.styles.includes(style.value)}
                          onChange={() => handleStyleChange(style.value)}
                        />
                        {style.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Categories */}
                <div>
                  <h3 className="text-[#FF9500] font-semibold mb-3">Theo phong cách</h3>
                  <div className="space-y-2">
                    {SERVICE_CATEGORIES.map(category => (
                      <label key={category.value} className="flex items-center text-gray-300 text-sm hover:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2 rounded border-gray-600 bg-gray-700 text-[#FF9500] focus:ring-orange-500"
                          checked={filters.categories.includes(category.value)}
                          onChange={() => handleCategoryChange(category.value)}
                        />
                        {category.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-[#FF9500] font-semibold mb-3">Theo địa điểm</h3>
                  <select 
                    className="w-full bg-gray-700 text-white rounded-lg p-2 text-sm border border-gray-600 focus:border-orange-500 focus:outline-none mb-3"
                    onChange={(e) => {
                      if (e.target.value && !filters.areas.includes(e.target.value)) {
                        handleLocationChange(e.target.value);
                      }
                      e.target.value = '';
                    }}
                  >
                    <option value="">Chọn địa điểm</option>
                    {SERVICE_AREAS.map(area => (
                      <option key={area.value} value={area.value}>
                        {area.label}
                      </option>
                    ))}
                  </select>
                  
                  <div className="space-y-2">
                    {SERVICE_AREAS.map(area => (
                      <label key={area.value} className="flex items-center text-gray-300 text-sm hover:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2 rounded border-gray-600 bg-gray-700 text-[#FF9500] focus:ring-orange-500"
                          checked={filters.areas.includes(area.value)}
                          onChange={() => handleLocationChange(area.value)}
                        />
                        {area.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-[#FF9500] font-semibold mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Mức giá mong muốn
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="1.000.000"
                        className="w-full bg-gray-700 text-white text-sm rounded-lg p-2 pr-8 border border-gray-600 focus:border-orange-500 focus:outline-none"
                        value={formatPrice(filters.min)}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">đ</span>
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="5.000.000"
                        className="w-full bg-gray-700 text-white text-sm rounded-lg p-2 pr-8 border border-gray-600 focus:border-orange-500 focus:outline-none"
                        value={formatPrice(filters.max)}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">đ</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-lg relative overflow-hidden">
                    <div 
                      className="absolute h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg" 
                      style={{
                        left: `${Math.max(0, (filters.min / 10000000) * 100)}%`,
                        width: `${Math.min(100, ((filters.max - filters.min) / 10000000) * 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0đ</span>
                    <span>10.000.000đ</span>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-white text-2xl font-bold mb-2">DANH SÁCH THỢ</h1>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  {loading ? 'Đang tải...' : `Tìm thấy ${pagination.totalResults} dịch vụ phù hợp`}
                </p>
                {pagination.totalResults > 0 && (
                  <div className="text-sm text-gray-400">
                    Trang {pagination.pageIndex} / {pagination.totalPages}
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters - Same as before */}
            {(filters.styles.length > 0 || filters.categories.length > 0 || filters.areas.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm">Bộ lọc đang áp dụng:</span>
                {filters.styles.map(style => {
                  const styleObj = SERVICE_STYLES.find(s => s.value === style);
                  return (
                    <span
                      key={style}
                      className="inline-flex items-center px-3 py-1 bg-orange-500 text-white text-xs rounded-full"
                    >
                      {styleObj?.label}
                      <button
                        onClick={() => handleStyleChange(style)}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {filters.categories.map(category => {
                  const categoryObj = SERVICE_CATEGORIES.find(c => c.value === category);
                  return (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs rounded-full"
                    >
                      {categoryObj?.label}
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {filters.areas.map(areas => {
                  const areasObj = SERVICE_AREAS.find(l => l.value === areas);
                  return (
                    <span
                      key={areas}
                      className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-xs rounded-full"
                    >
                      {areasObj?.label}
                      <button
                        onClick={() => handleLocationChange(areas)}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Services List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <p className="text-gray-400 mt-2">Đang tải danh sách dịch vụ...</p>
                </div>
              ) : services.length > 0 ? (
                services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400">
                    <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Không tìm thấy dịch vụ nào</p>
                    <p className="text-sm">Hãy thử thay đổi bộ lọc để xem thêm kết quả</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.pageIndex}
              totalPages={pagination.totalPages}
              totalResults={pagination.totalResults}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;