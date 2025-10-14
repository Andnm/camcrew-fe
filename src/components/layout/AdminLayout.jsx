import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Camera,
  FileText,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  MessageCircle,
  Calendar,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Tổng quan",
      icon: TrendingUp,
      path: "/admin",
      active: location.pathname === "/admin",
    },
    {
      id: "users",
      label: "Quản lý người dùng",
      icon: Users,
      path: "/admin/users",
      active: location.pathname === "/admin/users",
    },
    {
      id: "services",
      label: "Duyệt dịch vụ",
      icon: Camera,
      path: "/admin/services",
      active: location.pathname === "/admin/services",
    },
    {
      id: "bookings",
      label: "Quản lý booking",
      icon: FileText,
      path: "/admin/bookings",
      active: location.pathname === "/admin/bookings",
    },
    {
      id: "reports",
      label: "Báo cáo vi phạm",
      icon: AlertTriangle,
      path: "/admin/reports",
      active: location.pathname === "/admin/reports",
    },
    {
      id: "messages",
      label: "Tin nhắn hỗ trợ",
      icon: MessageCircle,
      path: "/admin/messages",
      active: location.pathname === "/admin/messages",
    },
  ];

  const bottomMenuItems = [
    
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-[#FF9500]">CamCrew</h1>
                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-400">admin@camcrew.com</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full cursor-pointer flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group ${
                    item.active
                      ? "bg-[#FF9500] text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {sidebarOpen && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <ul className="space-y-2">
            {bottomMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group ${
                    item.active
                      ? "bg-[#FF9500] text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors group"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-white" />
                {sidebarOpen && <span className="font-medium">Đăng xuất</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find((item) => item.active)?.label ||
                  "Admin Dashboard"}
              </h2>
              <p className="text-sm text-gray-600">
                Quản lý và điều hành hệ thống CamCrew
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date().toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
