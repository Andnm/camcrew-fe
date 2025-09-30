import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Camera, LogOut, User as UserIcon, X, Upload, Check } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { getMembershipLabel } from "../../utils/helper";
import { customerSidebarItems, cameramanExtraItems } from "../../utils/constants";

import { uploadImageToCloudinary } from "../../api/upload"; 
import { updateUserProfile } from "../../api/users";      

export default function AccountSidebar() {
  const { user, logout, setUser } = useAuth();
  const avatar = user?.avatar_url;

  const sidebarItems =
    user?.role_name === "cameraman"
      ? [...customerSidebarItems, ...cameramanExtraItems]
      : customerSidebarItems;

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh (PNG/JPG/WebP…).");
      return;
    }
    setFile(f);
  };

  const onConfirmChange = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const up = await uploadImageToCloudinary(file, "camcrew_avt");
      if (!up?.url) throw new Error("Không lấy được URL ảnh sau khi upload.");

      const res = await updateUserProfile({ avatar_url: up.url });
      const updatedUser = res?.user ?? { ...user, avatar_url: up.url };
      setUser(updatedUser);

      toast.success("Cập nhật ảnh đại diện thành công!");
      setOpen(false);
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Upload thất bại. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <aside className="w-full lg:w-80">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-24 h-24 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 text-gray-300" />
                )}
              </div>

              <button
                onClick={() => setOpen(true)}
                className="cursor-pointer absolute bottom-0 right-0 bg-[#FF9500] rounded-full p-2 hover:bg-orange-600 transition-colors border-2 border-white"
                title="Đổi ảnh đại diện"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            <h2 className="text-white text-xl font-bold">
              {user?.full_name || user?.email || "Người dùng"}
            </h2>
            <p className="text-gray-400">
              {user?.role_name === "cameraman" ? "Thợ quay phim" : "Khách"}
            </p>
            <div className="mt-2">
              <span className="bg-[#FF9500] text-white px-3 py-1 rounded-full text-sm">
                {getMembershipLabel(user?.membership_subscription)}
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-[#FF9500] text-white" : "text-gray-300 hover:bg-gray-700"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={logout}
            className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 w-full max-w-md rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Đổi ảnh đại diện</h3>
              <button
                onClick={() => {
                  if (!uploading) {
                    setOpen(false);
                    setFile(null);
                    setPreview("");
                  }
                }}
                className="text-gray-400 hover:text-white"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-center">
                <label
                  htmlFor="avatar-file"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF9500] text-white cursor-pointer hover:bg-orange-600"
                >
                  <Upload className="w-4 h-4" />
                  <span>Chọn ảnh</span>
                </label>
                <input
                  id="avatar-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickFile}
                  disabled={uploading}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-2">Ảnh hiện tại</p>
                  <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                    {avatar ? (
                      <img src={avatar} alt="current avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-2">Ảnh mới</p>
                  <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                    {preview ? (
                      <img src={preview} alt="preview avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 text-sm">Chưa chọn ảnh</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  if (!uploading) {
                    setOpen(false);
                    setFile(null);
                    setPreview("");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                disabled={uploading}
              >
                Hủy
              </button>
              <button
                onClick={onConfirmChange}
                disabled={!file || uploading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
              >
                <Check className="w-4 h-4" />
                {uploading ? "Đang cập nhật..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
