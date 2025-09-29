import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { verifyEmail } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { getMe } from "../api/user";

function extractUpnToken(href) {
  const match = href.match(/[?&]upn=([^&#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const VerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [status, setStatus] = useState("pending"); 
  const [message, setMessage] = useState("Đang xác minh email...");
  const [countdown, setCountdown] = useState(3);

  const tokenFromUrl = useMemo(() => extractUpnToken(window.location.href), [location.key]);

  useEffect(() => {
    async function run() {
      if (!tokenFromUrl) {
        setStatus("error");
        setMessage("Thiếu mã xác minh. Vui lòng kiểm tra lại liên kết trong email.");
        return;
      }

      try {
        setStatus("pending");
        setMessage("Đang xác minh email...");

        const data = await verifyEmail({ token: tokenFromUrl });

        const newToken = data?.accessToken;
        if (!newToken) {
          throw new Error("Xác minh thành công nhưng không nhận được token đăng nhập.");
        }

        localStorage.setItem("camcrew_token", newToken);

        try {
          const me = await getMe();
          setUser?.(me);
        } catch {
          console.warn("getMe() failed after verify.");
        }

        setStatus("success");
        setMessage("Xác minh email thành công! Bạn sẽ được chuyển về trang chủ.");

        let t = 3;
        setCountdown(t);
        const interval = setInterval(() => {
          t -= 1;
          setCountdown(t);
          if (t <= 0) {
            clearInterval(interval);
            navigate("/", { replace: true });
          }
        }, 1000);
        return () => clearInterval(interval);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage(err?.message || "Xác minh thất bại. Vui lòng thử lại hoặc yêu cầu gửi lại email.");
      }
    }

    run();
  }, [tokenFromUrl]);

  useEffect(() => {
    if (status === "success") toast.success("Xác minh email thành công!");
    if (status === "error") toast.error("Xác minh email thất bại");
  }, [status]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 text-center">
        <div className="mb-4 flex justify-center">
          {status === "pending" && <Loader2 className="w-12 h-12 animate-spin text-[#FF9500]" />}
          {status === "success" && <CheckCircle2 className="w-12 h-12 text-green-500" />}
          {status === "error" && <XCircle className="w-12 h-12 text-red-500" />}
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Xác minh email</h1>
        <p className="text-gray-300 mb-6">{message}</p>

        {status === "success" ? (
          <p className="text-sm text-gray-400">
            Tự động chuyển hướng sau <span className="text-white font-semibold">{countdown}</span>s...
          </p>
        ) : status === "error" ? (
          <div className="space-y-3">
            <Link
              to="/login"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Về trang đăng nhập
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyPage;
