import React, { useState } from "react";
import { Bell, Camera, Send, UserRound } from "lucide-react";
import { NAV_ITEMS } from "../../data/constants";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/horizontal_logo_with_text.png";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const base =
    "text-sm font-semibold tracking-wide uppercase text-[#FF9500] transition-colors duration-200 hover:text-white";
  const active = "text-sm font-semibold tracking-wide uppercase text-white";

  const avatarUrl = user?.avatar_url || null;

  return (
    <header className="bg-black text-white shadow-lg">
      <nav className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/" className="block">
            <img src={logo} className="h-8 w-auto" alt="CamCrew Logo" />
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? active : base)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? active : base)}
              >
                ĐĂNG NHẬP
              </NavLink>
              <span className="text-[#FF9500] font-semibold mx-1">/</span>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? active : base)}
              >
                ĐĂNG KÝ
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/chat-messages"
                className="p-1 text-[#FF9500] hover:text-white transition-colors"
                aria-label="Tin nhắn"
                title="Tin nhắn"
              >
                <Send className="w-6 h-6" />
              </NavLink>

              <NavLink
                to="/notifications"
                className="p-1 text-[#FF9500] hover:text-white transition-colors"
                aria-label="Thông báo"
                title="Thông báo"
              >
                <Bell className="w-6 h-6" />
              </NavLink>

              <Link
                to="/manage-account/personal"
                className="inline-flex items-center justify-center"
                aria-label="Quản lý tài khoản"
                title="Quản lý tài khoản"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.full_name || user?.email || "User Avatar"}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <UserRound className="w-5 h-5 text-[#FF9500]" />
                  </div>
                )}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden flex-shrink-0 text-white hover:text-[#FF9500] transition-colors duration-200 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#1a1a1a]">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? active : base
                  } block py-2 px-2 rounded hover:bg-white/5 transition-colors duration-200`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-center space-x-1">
                {!user ? (
                  <div className="flex items-center space-x-2">
                    <NavLink
                      to="/login"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive ? active : base
                        } py-2 px-3 rounded hover:bg-white/5 transition-colors duration-200`
                      }
                    >
                      ĐĂNG NHẬP
                    </NavLink>
                    <span className="text-[#FF9500] font-semibold mx-1">/</span>
                    <NavLink
                      to="/register"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive ? active : base
                        } py-2 px-3 rounded hover:bg-white/5 transition-colors duration-200`
                      }
                    >
                      ĐĂNG KÝ
                    </NavLink>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <NavLink
                      to="/chat-messages"
                      onClick={() => setOpen(false)}
                      className="p-1 text-[#FF9500] hover:text-white transition-colors"
                      aria-label="Tin nhắn"
                    >
                      <Send className="w-6 h-6" />
                    </NavLink>
                    <NavLink
                      to="/notifications"
                      onClick={() => setOpen(false)}
                      className="p-1 text-[#FF9500] hover:text-white transition-colors"
                      aria-label="Thông báo"
                    >
                      <Bell className="w-6 h-6" />
                    </NavLink>
                    <Link
                      to="/manage-account/personal"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center"
                      aria-label="Quản lý tài khoản"
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={user?.full_name || user?.email || "User Avatar"}
                          className="w-8 h-8 rounded-full object-cover border border-white/20"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                          <UserRound className="w-5 h-5 text-[#FF9500]" />
                        </div>
                      )}
                    </Link>
                  </div>
                )}
              </div>

              {user && (
                <div className="mt-3">
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className={`${base} w-full text-left py-2 px-3 rounded hover:bg-white/5`}
                  >
                    ĐĂNG XUẤT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
