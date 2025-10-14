import React, { useEffect, useState } from "react";
import { Edit2, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { updateUserProfile } from "../../api/users";
import toast from "react-hot-toast";

export default function PersonalInfo() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    dob: "",
    description: "",
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      address: user.address || "",
      dob: user.dob ? user.dob.slice(0, 10) : "",
      description: user.description || "",
    });
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSave = async () => {
    if (!formData.full_name.trim()) return toast.error("Vui lòng nhập họ tên.");
    if (!formData.phone_number.trim()) return toast.error("Vui lòng nhập số điện thoại.");

    const payload = {
      full_name: formData.full_name.trim(),
      phone_number: formData.phone_number.trim(),
      address: formData.address.trim(),
      dob: formData.dob || null,
      description: formData.description.trim(),
    };

    try {
      setSaving(true);
      const res = await updateUserProfile(payload);
      const updated = res?.user ?? { ...user, ...payload };
      setUser(updated);
      toast.success("Cập nhật hồ sơ thành công!");
      setIsEditing(false);
    } catch (e) {
      console.log("e: ", e)
      toast.error(e?.response?.data?.message || e?.message || "Cập nhật thất bại, vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    if (!user) return;
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      address: user.address || "",
      dob: user.dob ? user.dob.slice(0, 10) : "",
      description: user.description || "",
    });
    setIsEditing(false);
  };

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
              onClick={onSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Đang lưu..." : "Lưu lại"}</span>
            </button>
            <button
              onClick={onCancel}
              disabled={saving}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
            >
              <X className="w-4 h-4" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Họ và Tên*</label>
          <input
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
            disabled={!isEditing || saving}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Số điện thoại*</label>
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={onChange}
            className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white `}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Email*</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            disabled
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white opacity-70"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Ngày sinh</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={onChange}
            disabled={!isEditing || saving}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm mb-2">Địa chỉ</label>
          <input
            name="address"
            value={formData.address}
            onChange={onChange}
            disabled={!isEditing || saving}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm mb-2">Mô tả bản thân</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={onChange}
            disabled={!isEditing || saving}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
