import React from "react";
import { NavLink } from "react-router-dom";
import { Camera, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getMembershipLabel } from "../../utils/helper";
import { sidebarItems } from "../../utils/constants";

export default function AccountSidebar() {
  const { user, logout } = useAuth();
  const avatar = user?.avatar_url;

  return (
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
            <button className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors border-2 border-white">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          <h2 className="text-white text-xl font-bold">
            {user?.full_name || user?.email || "Người dùng"}
          </h2>
          <p className="text-gray-400">{user?.role === "cameraman" ? "Thợ quay phim" : "Khách"}</p>
          <div className="mt-2">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
              {getMembershipLabel(user?.membership_subscription)}
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-gray-700"
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
  );
}
