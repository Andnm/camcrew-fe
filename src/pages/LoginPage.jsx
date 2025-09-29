import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/logo/logo_square.png";
import horizontal_logo from "../assets/images/logo/horizontal_logo_with_text.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login, loginGoogle } from "../api/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import toast from "react-hot-toast";
import { getMe } from "../api/users";
import { notSupportFunction } from "../utils/helper";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [submittingGoogle, setSubmittingGoogle] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);
    try {
      const data = await login({ identifier, password });

      if (data?.accessToken) {
        localStorage.setItem("camcrew_token", data.accessToken);

        const me = await getMe();
        setUser(me);

        if (me?.role_name === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setErrorMsg(err?.message || "Đăng nhập thất bại");
    } finally {
      setSubmitting(false);
    }
  }

  async function onGoogleSignIn() {
    try {
      setSubmittingGoogle(true);

      const cred = await signInWithPopup(auth, googleProvider);

      const idToken = await cred.user.getIdToken();

      const data = await loginGoogle(idToken);

      if (data?.accessToken) {
        localStorage.setItem("camcrew_token", data.accessToken);

        const me = await getMe();
        setUser(me);
      }

      toast.success("Đăng nhập Google thành công!");
      navigate("/");
    } catch (err) {
      const msg = err?.message || "Đăng nhập Google thất bại";
      toast.error(msg);
      console.error(err);
    } finally {
      setSubmittingGoogle(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex w-full max-w-6xl">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-80 h-80 rounded-3xl flex items-center justify-center">
            <img src={logo} alt="CamCrew Logo" className="w-full h-full" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#1C1C1E] rounded-lg p-8 w-full max-w-md">
            <div className="mb-6">
              <img src={horizontal_logo} alt="CamCrew" className="h-8 mb-4" />
              <h1 className="text-white text-2xl font-bold mb-2">Đăng nhập</h1>
              <div className="text-gray-400">
                Bạn chưa có tài khoản?{" "}
                <NavLink
                  to="/register"
                  className="text-[#FF9500] hover:text-orange-400"
                >
                  Đăng ký
                </NavLink>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm">
                {errorMsg}
              </div>
            )}

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="Số điện thoại hoặc email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoComplete="username"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoComplete="current-password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="text-right">
                <NavLink
                  to="/forgot-password"
                  className="text-[#FF9500] hover:text-orange-400 text-sm"
                >
                  Quên mật khẩu?
                </NavLink>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FF9500] hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1C1C1E] text-white">Hoặc</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onGoogleSignIn}
                  disabled={submittingGoogle}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="w-5 h-5 mr-3"
                  />
                  {submittingGoogle ? "Đang xử lý..." : "Đăng nhập với Google"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    notSupportFunction();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Đăng nhập với Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
