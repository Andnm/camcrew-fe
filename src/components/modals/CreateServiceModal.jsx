import { Calendar, Upload, X } from "lucide-react";
import { useState } from "react";
import { SERVICE_AREAS, SERVICE_CATEGORIES, SERVICE_STYLES, SERVICE_TIME_OF_DAYS } from "../../utils/constants";

const CreateServiceModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        styles: [],
        categories: [],
        description: '',
        areas: [],
        time_of_day: [],
        date_get_job: '',
        video_demo_urls: []
    });

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
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    video_demo_urls: [...prev.video_demo_urls, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeVideo = (index) => {
        setFormData(prev => ({
            ...prev,
            video_demo_urls: prev.video_demo_urls.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Service created:', formData);
        onSuccess();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
                    <h2 className="text-white text-2xl font-bold">Tạo Dịch Vụ Mới</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[#FF9500] font-medium mb-2">
                                Tiêu đề gói dịch vụ*
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Nhập tiêu đề"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[#FF9500] font-medium mb-2">
                                Giá dịch vụ*
                            </label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Nhập giá"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">
                            Phong cách quay (chọn 1 hoặc nhiều)*
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {SERVICE_CATEGORIES.map((category) => (
                                <label key={category.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.categories.includes(category.value)}
                                        onChange={() => handleCheckboxChange('categories', category.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {category.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">
                            Dịch vụ áp dụng cho (chọn 1 hoặc nhiều)*
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {SERVICE_STYLES.map((style) => (
                                <label key={style.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.styles.includes(style.value)}
                                        onChange={() => handleCheckboxChange('styles', style.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {style.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">
                            Mô tả chi tiết dịch vụ*
                        </label>
                        <textarea
                            name="description"
                            placeholder="Ví dụ: Tôi cung cấp gói quay cưới theo phong cách cinematic, bắt đầu từ lúc chuẩn bị lễ đến khi thực hiện. Video gồm highlight 3-5 phút và bản full lễ. Sử dụng Sony A7 III + Gimbal. Giao video sau 7 ngày, hỗ trợ chỉnh sửa miễn phí theo góp ý."
                            rows={6}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">
                            Khu vực hoạt động*
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {SERVICE_AREAS.map((area) => (
                                <label key={area.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.areas.includes(area.value)}
                                        onChange={() => handleCheckboxChange('areas', area.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {area.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">
                            Thời gian rảnh nhận job*
                        </label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {SERVICE_TIME_OF_DAYS.map((time) => (
                                <label key={time.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.time_of_day.includes(time.value)}
                                        onChange={() => handleCheckboxChange('time_of_day', time.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {time.label}
                                </label>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                name="date_get_job"
                                value={formData.date_get_job}
                                onChange={handleInputChange}
                                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <span className="text-gray-400">Chọn ngày</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">
                            Video demo (tối đa 2-3 video)*
                        </label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-400 mb-1 text-sm">Click to Upload or drag and drop</p>
                            <p className="text-gray-500 text-xs mb-3">(Max. File size 25 MB)</p>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="video-upload"
                            />
                            <label
                                htmlFor="video-upload"
                                className="cursor-pointer inline-block bg-[#FF9500] hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                                Choose File
                            </label>
                        </div>

                        {formData.video_demo_urls.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {formData.video_demo_urls.map((video, index) => (
                                    <div key={index} className="p-3 bg-gray-700 rounded-lg flex items-center justify-between">
                                        <span className="text-white text-sm">Video {index + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeVideo(index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-[#FF9500] hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Đăng tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateServiceModal;