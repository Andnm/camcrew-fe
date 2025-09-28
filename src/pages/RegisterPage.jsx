import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/logo/logo_square.png";
import horizontal_logo from "../assets/images/logo/horizontal_logo_with_text.png";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ROLE_OPTIONS } from "../utils/constants";
import { registerUser } from "../api/auth";
import { loginGoogle } from "../api/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { getMe } from "../api/user";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittingGoogle, setSubmittingGoogle] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.full_name ||
      !formData.phone_number
    ) {
      toast.error("Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Mật khẩu phải tối thiểu 6 ký tự.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Xác nhận mật khẩu không khớp.");
      return;
    }

    setSubmitting(true);
    try {
      await registerUser({
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.full_name.trim(),
        phone_number: formData.phone_number.trim(),
        role: formData.role,
      });

      setSuccess(true);
      toast.success(
        "Đăng ký thành công! Đã gửi email xác minh—vui lòng kiểm tra hộp thư."
      );

      setCountdown(3);
    } catch (err) {
      toast.error(err?.message || "Đăng ký thất bại. Vui lòng thử lại.");
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

      toast.success("Đăng ký Google thành công!");
      navigate("/");
    } catch (err) {
      const msg = err?.message || "Đăng k1y Google thất bại";
      toast.error(msg);
      console.error(err);
    } finally {
      setSubmittingGoogle(false);
    }
  }

  useEffect(() => {
    if (!success) return;
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [success, countdown, navigate]);

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
              <h1 className="text-white text-2xl font-bold mb-2">
                Tạo tài khoản
              </h1>
              <div className="text-gray-400">
                Bạn đã có tài khoản?{" "}
                <NavLink
                  to="/login"
                  className="text-orange-500 hover:text-orange-400"
                >
                  Đăng nhập
                </NavLink>
              </div>
            </div>

            {success ? (
              <div className="rounded-md bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-300 text-sm">
                <p>
                  Đăng ký thành công! Đã gửi email xác minh tới địa chỉ bạn vừa
                  nhập. Vui lòng kiểm tra hộp thư.
                </p>
                <p className="mt-2">
                  Tự động quay về trang chủ sau <b>{countdown}s</b>…
                </p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Họ và tên"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Số điện thoại"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                >
                  {submitting ? "Đang đăng ký..." : "Đăng ký"}
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
                    {submittingGoogle ? "Đang xử lý..." : "Đăng ký với Google"}
                  </button>

                  <button
                    type="button"
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
                    Đăng ký với Facebook
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
