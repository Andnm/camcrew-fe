import React, { useEffect, useMemo, useState } from "react";
import horizontal_logo from "../assets/images/logo/horizontal_logo_with_text.png";
import { forgotPassword, verifyOTP, resetPassword } from "../api/users";
import { NavLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState("email"); // email -> verify -> reset
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const RESEND_SECONDS = 60;
  const [resendLeft, setResendLeft] = useState(0);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendLeft]);

  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!isValidEmail) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword({ email: email.trim() });

      setStep("verify");
      setNotice(`Đã gửi mã xác thực tới ${email.trim()}.`);
      setResendLeft(RESEND_SECONDS);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gửi mã thất bại. Vui lòng thử lại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendLeft > 0) return;
    setError("");
    setNotice("");
    try {
      setLoading(true);
      await forgotPassword({ email: email.trim() });
      setNotice(`Đã gửi lại mã tới ${email.trim()}.`);
      setResendLeft(RESEND_SECONDS);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gửi lại mã thất bại. Vui lòng thử lại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!code.trim()) {
      setError("Vui lòng nhập mã xác thực.");
      return;
    }

    try {
      setLoading(true);
      await verifyOTP({ email: email.trim(), otp: code.trim() });

      setNotice("Mã xác thực hợp lệ. Vui lòng đặt mật khẩu mới.");
      setStep("reset");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Mã không đúng hoặc đã hết hạn.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có tối thiểu 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({ email: email.trim(), newPassword });

      setNotice("Mật khẩu đã được đặt lại thành công! Bạn có thể đăng nhập.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Không thể đặt lại mật khẩu. Vui lòng thử lại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (step === "email") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-black rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center">
              <img src={horizontal_logo} alt="CamCrew" className="h-8 mb-4" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-2">
              Quên mật khẩu
            </h1>
            <p className="text-gray-400">
              Nhập email đã đăng ký để nhận mã xác thực.
            </p>
          </div>

          {!!error && (
            <div className="mb-4 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          {!!notice && (
            <div className="mb-4 text-sm text-emerald-400 bg-emerald-900/30 px-3 py-2 rounded-lg">
              {notice}
            </div>
          )}

          <form onSubmit={handleEmailSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoComplete="email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isValidEmail || loading}
              className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                !isValidEmail || loading
                  ? "bg-[#FF9500]/60 text-white cursor-not-allowed"
                  : "bg-[#FF9500] hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? "Đang gửi..." : "Gửi mã xác thực"}
            </button>

            <div className="text-center text-gray-400 text-sm mt-6">
              Trở lại{" "}
              <NavLink
                to="/login"
                className="text-[#FF9500] hover:text-orange-400"
              >
                Đăng nhập
              </NavLink>
              {" · "}
              Chưa có tài khoản?{" "}
              <NavLink
                to="/register"
                className="text-[#FF9500] hover:text-orange-400"
              >
                Đăng ký
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-black rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img
              src="assets/images/logo/logo_square.png"
              alt="CamCrew"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h1 className="text-white text-2xl font-bold mb-2">
              Xác thực Email
            </h1>
            <p className="text-gray-400">
              Nhập mã đã được gửi tới{" "}
              <span className="text-white">{email}</span>.
            </p>
          </div>

          {!!error && (
            <div className="mb-4 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          {!!notice && (
            <div className="mb-4 text-sm text-emerald-400 bg-emerald-900/30 px-3 py-2 rounded-lg">
              {notice}
            </div>
          )}

          <form onSubmit={handleVerifySubmit}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Nhập mã xác thực"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!code.trim() || loading}
              className={`w-full font-semibold py-3 rounded-lg transition-colors mb-4 ${
                !code.trim() || loading
                  ? "bg-[#FF9500]/60 text-white cursor-not-allowed"
                  : "bg-[#FF9500] hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? "Đang kiểm tra..." : "Xác minh & Đổi mật khẩu"}
            </button>

            <div className="text-center text-gray-400 text-sm">
              Chưa nhận được mã?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLeft > 0 || loading}
                className={`${
                  resendLeft > 0 || loading
                    ? "text-[#FF9500]/60 cursor-not-allowed"
                    : "text-[#FF9500] hover:text-orange-400"
                }`}
              >
                {resendLeft > 0 ? `Gửi lại sau ${resendLeft}s` : "Gửi lại mã"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-black rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="assets/images/logo/logo_square.png"
            alt="CamCrew"
            className="w-12 h-12 mx-auto mb-4"
          />
        </div>

        {!!error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
        {!!notice && (
          <div className="mb-4 text-sm text-emerald-400 bg-emerald-900/30 px-3 py-2 rounded-lg">
            {notice}
          </div>
        )}

        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#D9D9D9] text-black rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              newPassword.length < 6 ||
              confirmPassword.length < 6 ||
              newPassword !== confirmPassword
            }
            className={`w-full font-semibold py-3 rounded-lg transition-colors ${
              loading ||
              newPassword.length < 6 ||
              confirmPassword.length < 6 ||
              newPassword !== confirmPassword
                ? "bg-[#FF9500]/60 text-white cursor-not-allowed"
                : "bg-[#FF9500] hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Đang đặt lại..." : "Xác nhận"}
          </button>

          <div className="text-center text-gray-400 text-sm mt-2">
            Nhớ lại mật khẩu?{" "}
            <NavLink
              to="/login"
              className="text-[#FF9500] hover:text-orange-400"
            >
              Đăng nhập
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
