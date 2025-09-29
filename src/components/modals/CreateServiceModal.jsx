import { Calendar, Upload, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { uploadToCloudinary } from "../../api/upload";
import { createNewService } from "../../api/services";
import { SERVICE_AREAS, SERVICE_CATEGORIES, SERVICE_STYLES, SERVICE_TIME_OF_DAYS } from "../../utils/constants";
import toast from "react-hot-toast";

const MAX_VIDEOS = 3;
const MAX_SIZE_MB = 25;

const CreateServiceModal = ({ isOpen, onClose, onSuccess }) => {
    const { user } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        styles: [],
        categories: [],
        description: "",
        areas: [],
        time_of_day: [],
        date_get_job: "",
    });

    const handleCheckboxChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((v) => v !== value)
                : [...prev[field], value],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return;
        setSelectedFiles((prev) => (prev.length >= MAX_VIDEOS ? prev : [...prev, file]));
        e.target.value = "";
    };

    const removeVideo = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cameramanId = user?._id || user?.id;
        if (!cameramanId) return;

        try {
            setSubmitting(true);
            const uploaded = await Promise.all(
                selectedFiles.map((f) => uploadToCloudinary(f, "services_videos"))
            );

            const videoUrls = uploaded.map((u) => u.url);

            const payload = {
                cameraman_id: cameramanId,
                discription: formData.description,
                title: formData.title,
                amount: Number(formData.amount) || 0,
                styles: formData.styles,
                categories: formData.categories,
                areas: formData.areas,
                video_demo_urls: videoUrls,
                date_get_job: formData.date_get_job,
                time_of_day: formData.time_of_day,
            };

            await createNewService(payload);
            setSelectedFiles([]);
            setFormData({
                title: "",
                amount: "",
                styles: [],
                categories: [],
                description: "",
                areas: [],
                time_of_day: [],
                date_get_job: "",
            });
            onSuccess?.();

        } catch (err) {
            toast.error("Đăng dịch vụ thất bại, vui lòng thử lại sau");
            toast.error(err?.response?.data?.message || err?.message)
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
                    <h2 className="text-white text-2xl font-bold">Tạo Dịch Vụ Mới</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[#FF9500] font-medium mb-2">Tiêu đề gói dịch vụ*</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Nhập tiêu đề"
                            />
                        </div>
                        <div>
                            <label className="block text-[#FF9500] font-medium mb-2">Giá dịch vụ*</label>
                            <input
                                type="number"
                                name="amount"
                                min={0}
                                value={formData.amount}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Nhập giá"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">Phong cách quay*</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {SERVICE_CATEGORIES.map((cat) => (
                                <label key={cat.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.categories.includes(cat.value)}
                                        onChange={() => handleCheckboxChange("categories", cat.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {cat.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">Dịch vụ áp dụng*</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {SERVICE_STYLES.map((st) => (
                                <label key={st.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.styles.includes(st.value)}
                                        onChange={() => handleCheckboxChange("styles", st.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {st.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">Mô tả chi tiết*</label>
                        <textarea
                            name="description"
                            rows={6}
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Mô tả chi tiết..."
                        />
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">Khu vực hoạt động*</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {SERVICE_AREAS.map((ar) => (
                                <label key={ar.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.areas.includes(ar.value)}
                                        onChange={() => handleCheckboxChange("areas", ar.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {ar.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">Thời gian rảnh nhận job*</label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {SERVICE_TIME_OF_DAYS.map((t) => (
                                <label key={t.value} className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.time_of_day.includes(t.value)}
                                        onChange={() => handleCheckboxChange("time_of_day", t.value)}
                                        className="mr-2 w-4 h-4 text-[#FF9500] bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    />
                                    {t.label}
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
                                required
                                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <span className="text-gray-400">Chọn ngày</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#FF9500] font-medium mb-2">Video demo (tối đa {MAX_VIDEOS})</label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-400 mb-1 text-sm">Click to Upload or drag and drop</p>
                            <p className="text-gray-500 text-xs mb-3">(Max. {MAX_SIZE_MB} MB)</p>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="video-upload"
                                disabled={selectedFiles.length >= MAX_VIDEOS}
                            />
                            <label
                                htmlFor="video-upload"
                                className={`cursor-pointer inline-block px-5 py-2 rounded-lg text-sm font-medium ${selectedFiles.length >= MAX_VIDEOS ? "bg-gray-600 text-white" : "bg-[#FF9500] hover:bg-orange-600 text-white"}`}
                            >
                                Thêm video
                            </label>
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="p-3 bg-gray-700 rounded-lg flex items-center justify-between">
                                        <span className="text-white text-sm truncate max-w-[70%]">{file.name}</span>
                                        <button type="button" onClick={() => removeVideo(index)} className="text-red-400 hover:text-red-300">
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
                            disabled={submitting}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-[#FF9500] hover:bg-orange-600 text-white py-3 rounded-lg font-medium"
                        >
                            {submitting ? "Đang đăng..." : "Đăng tin"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateServiceModal;
