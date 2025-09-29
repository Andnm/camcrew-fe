import React, { useEffect, useState } from "react";
import { Edit2, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 

export default function PersonalInfo() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        address: user.address || "",
        birthDate: user.birth_date || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Thông tin cá nhân</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-[#FF9500] hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Save className="w-4 h-4" />
              <span>Lưu lại</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              <X className="w-4 h-4" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Họ tên */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Họ và Tên*</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Số điện thoại*
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Email*</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white opacity-70"
          />
        </div>

        {/* Birthdate */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Ngày sinh*</label>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm mb-2">Địa chỉ*</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm mb-2">
            Mô tả bản thân (bio)
          </label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
