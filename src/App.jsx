// App.jsx
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import toast, { Toaster } from "react-hot-toast";

// ===== Lazy pages (code-splitting) =====
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const SubscriptionUpgradePage = lazy(() => import("./pages/SubscriptionUpgradePage"));
const CustomerActivityHistoryPage = lazy(() => import("./pages/CustomerActivityHistoryPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminReportsPage = lazy(() => import("./pages/AdminReportsPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"));
const BookingManagementPage = lazy(() => import("./pages/BookingManagementPage"));
const ServiceManagementPage = lazy(() => import("./pages/ServiceManagementPage"));
const ChatMessagesPage = lazy(() => import("./pages/ChatMessagesPage"));
const RevenueDashboard = lazy(() => import("./pages/RevenueDashboard"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const BookingDetailPage = lazy(() => import("./pages/BookingDetailPage"));

// ====== Simple Home (giữ hero như trước) ======
const HomePage = lazy(() => import("./pages/HomePage").catch(() => ({ default: DefaultHome })));
function DefaultHome() {
  // Nếu bạn chưa có pages/HomePage.jsx, block này giữ nguyên hero cũ nhanh gọn
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-24 text-white">
        <h1 className="text-4xl font-bold">CamCrew – Hire cameramen fast & safely</h1>
        <p className="text-gray-300 mt-2">This is a placeholder Home. Tạo file pages/HomePage.jsx để thay thế.</p>
      </div>
    </div>
  );
}

// ===== Helpers =====
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Layout có Header + Outlet
function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Guard mẫu: cập nhật theo useAuth() của bạn nếu cần
function ProtectedRoute({ children }) {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true; // TODO: thay bằng context thực tế
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  // const { user } = useAuth();
  const isAdmin = true; // TODO: kiểm tra role thực tế: user?.role === 'ADMIN'
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

// ===== App with Router =====
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <ScrollToTop />
      <Suspense fallback={<div className="text-white p-6">Đang tải...</div>}>

        <Routes>
          {/* Public layout (có Header) */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />

            {/* Public pages */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* User area */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute>
                  <SubscriptionUpgradePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity-history"
              element={
                <ProtectedRoute>
                  <CustomerActivityHistoryPage />
                </ProtectedRoute>
              }
            />

            {/* Cameraman area */}
            <Route
              path="/booking-management"
              element={
                <ProtectedRoute>
                  <BookingManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service-management"
              element={
                <ProtectedRoute>
                  <ServiceManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/revenue-dashboard"
              element={
                <ProtectedRoute>
                  <RevenueDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat-messages"
              element={
                <ProtectedRoute>
                  <ChatMessagesPage />
                </ProtectedRoute>
              }
            />

            {/* Transactions */}
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <BookingDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <AdminRoute>
                  <AdminReportsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AdminAnalyticsPage />
                </AdminRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}
