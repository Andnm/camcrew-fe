import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AccountLayout from "./components/account-layout/AccountLayout";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLayout from "./components/layout/AdminLayout";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PersonalInfo = lazy(() => import("./pages/account/PersonalInfo"));
const Notifications = lazy(() => import("./pages/account/Notifications"));
const MyRentals = lazy(() => import("./pages/account/MyRentals"));
const Messages = lazy(() => import("./pages/account/Messages"));
const ActivityHistory = lazy(() => import("./pages/account/ActivityHistory"));
const SubscriptionUpgrade = lazy(() => import("./pages/account/SubscriptionUpgrade"));

const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminReportsPage = lazy(() => import("./pages/admin/AdminReportsPage"));
const AdminServicesPage = lazy(() => import("./pages/admin/AdminServicesPage"));
const AdminBookingsPage = lazy(() => import("./pages/admin/AdminBookingsPage"));
const AdminAnalyticsPage = lazy(() =>
  import("./pages/admin/AdminAnalyticsPage")
);

const BookingManagementPage = lazy(() =>
  import("./pages/BookingManagementPage")
);
const ServiceManagementPage = lazy(() =>
  import("./pages/ServiceManagementPage")
);
const ChatMessagesPage = lazy(() => import("./pages/ChatMessagesPage"));
const RevenueDashboard = lazy(() => import("./pages/RevenueDashboard"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const BookingDetailPage = lazy(() => import("./pages/BookingDetailPage"));

const HomePage = lazy(() =>
  import("./pages/HomePage").catch(() => ({ default: DefaultHome }))
);

function DefaultHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-white">
      <h1 className="text-4xl font-bold">
        CamCrew – Hire cameramen fast & safely
      </h1>
      <p className="text-gray-300 mt-2">
        This is a placeholder Home. Tạo file pages/HomePage.jsx để thay thế.
      </p>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return <div className="text-white p-6">Đang tải...</div>;
  }
  if (!user) {
    toast.error("Vui lòng đăng nhập!");
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const { user, ready } = useAuth();

  if (!ready) return <div className="text-white p-6">Đang tải...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const isAdmin = user?.role_name === "admin";

  if (!isAdmin) {
    toast.error("Bạn không có quyền truy cập.");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <ScrollToTop />
        <Suspense fallback={<div className="text-white p-6">Đang tải...</div>}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              <Route
                path="/manage-account"
                element={
                  <ProtectedRoute>
                    <AccountLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PersonalInfo />} />
                <Route path="personal" element={<PersonalInfo />} />
                <Route path="activities" element={<ActivityHistory />} />
                <Route path="messages" element={<Messages />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="my-rentals" element={<MyRentals />} />
                <Route path="upgrade" element={<SubscriptionUpgrade />} />
              </Route>

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
             

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

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <AdminRoute>
                    <AdminServicesPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <AdminRoute>
                    <AdminBookingsPage />
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
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
