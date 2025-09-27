import React, { useState } from 'react';
import { Upload, X, Calendar, Clock } from 'lucide-react';

const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    styles: [],
    categories: [],
    description: '',
    areas: [],
    timeOfDay: [],
    dateGetJob: '',
    videoDemo: null
  });

  const styleOptions = ['Cinematic', 'Truyền thống', 'Highlight', 'BTS', 'Documentary'];
  const categoryOptions = ['Cưới hỏi', 'Sự kiện', 'Ký yếu', 'TVC', 'Film'];
  const areaOptions = ['Thành phố Hồ Chí Minh', 'Bình Dương', 'Cần Thơ', 'Đồng Nai', 'Hà Nội'];
  const timeOptions = ['Sáng', 'Chiều', 'Tối'];

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        videoDemo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Service created:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-white text-2xl font-bold mb-8">Tạo Dịch Vụ Mới</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-500 font-medium mb-2">
                  Tiêu đề gói dịch vụ*
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Nhập tiêu đề"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-orange-500 font-medium mb-2">
                  Giá dịch vụ*
                </label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Nhập giá"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-orange-500 font-medium mb-2">
                Phong cách quay (chọn 1 hoặc nhiều)*
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {styleOptions.map((style) => (
                  <label key={style} className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.styles.includes(style)}
                      onChange={() => handleCheckboxChange('styles', style)}
                      className="mr-2 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    {style}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-orange-500 font-medium mb-2">
                Dịch vụ áp dụng cho (chọn 1 hoặc nhiều)*
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryOptions.map((category) => (
                  <label key={category} className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCheckboxChange('categories', category)}
                      className="mr-2 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-orange-500 font-medium mb-2">
                Mô tả chi tiết dịch vụ*
              </label>
              <textarea
                name="description"
                placeholder="Nhập vào bản"
                rows={8}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                defaultValue="Ví dụ: *Tôi cung cấp gói quay cưới theo phong cách cinematic, bất đầu từ lúc chuẩn bị lễ đến khi thực hiện. Video gồm highlight 3-5 phút và bản full lễ. Sử dụng Sony A7 III + Gimbal. Giao video sau 7 ngày, hỗ trợ chỉnh sửa miễn phí theo góp ý."
              />
            </div>

            <div>
              <label className="block text-orange-500 font-medium mb-2">
                Khu vực hoạt động*
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {areaOptions.map((area) => (
                  <label key={area} className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.areas.includes(area)}
                      onChange={() => handleCheckboxChange('areas', area)}
                      className="mr-2 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-orange-500 font-medium mb-2">
                Thời gian rảnh nhận job*
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {timeOptions.map((time) => (
                  <label key={time} className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.timeOfDay.includes(time)}
                      onChange={() => handleCheckboxChange('timeOfDay', time)}
                      className="mr-2 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    {time}
                  </label>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="dateGetJob"
                  value={formData.dateGetJob}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-gray-400">Chọn ngày</span>
              </div>
            </div>

            <div>
              <label className="block text-orange-500 font-medium mb-2">
                Video demo (tối đa 2-3 video)*
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Click to Upload or drag and drop</p>
                <p className="text-gray-500 text-sm">(Max. File size 25 MB)</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Choose File
                </label>
              </div>
              
              {formData.videoDemo && (
                <div className="mt-4 p-3 bg-gray-700 rounded-lg flex items-center justify-between">
                  <span className="text-white">{formData.videoDemo.name}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, videoDemo: null }))}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Đăng tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceForm;