import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Camera,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "antd";
import {
  getRevenueStatistics,
  getSummaryStatistics,
  getUserDistributionStatistics,
  getServicesStatusDistributionStatistics,
  getMembershipDistributionStatistics,
} from "../../api/statistics";

const COLORS = ["#FF9500", "#34C759", "#007AFF", "#FF3B30", "#AF52DE"];

export default function AdminDashboard() {
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingUsersDist, setLoadingUsersDist] = useState(true);
  const [loadingServicesDist, setLoadingServicesDist] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [loadingMembership, setLoadingMembership] = useState(true);

  const [summary, setSummary] = useState(null);
  const [userDist, setUserDist] = useState([]);
  const [serviceStatusDist, setServiceStatusDist] = useState([]);
  const [revenueTimeRange, setRevenueTimeRange] = useState("year");
  const [revenueSeries, setRevenueSeries] = useState([]);
  const [membershipDist, setMembershipDist] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoadingSummary(true);
    getSummaryStatistics()
      .then((res) => {
        if (!mounted) return;
        setSummary(res);
      })
      .finally(() => mounted && setLoadingSummary(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoadingUsersDist(true);
    getUserDistributionStatistics()
      .then((res) => {
        if (!mounted) return;
        setUserDist(res || []);
      })
      .finally(() => mounted && setLoadingUsersDist(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoadingServicesDist(true);
    getServicesStatusDistributionStatistics()
      .then((res) => {
        if (!mounted) return;
        setServiceStatusDist(res || []);
      })
      .finally(() => mounted && setLoadingServicesDist(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoadingRevenue(true);
    getRevenueStatistics({ timeRange: revenueTimeRange })
      .then((res) => {
        if (!mounted) return;
        setRevenueSeries(res || []);
      })
      .finally(() => mounted && setLoadingRevenue(false));
    return () => {
      mounted = false;
    };
  }, [revenueTimeRange]);

  useEffect(() => {
    let mounted = true;
    setLoadingMembership(true);
    getMembershipDistributionStatistics()
      .then((res) => {
        if (!mounted) return;
        setMembershipDist(res || []);
      })
      .finally(() => mounted && setLoadingMembership(false));
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (!summary)
      return {
        totalUsers: 0,
        customers: 0,
        verificationRate: 0,
        activeCameramen: 0,
        approvedServices: 0,
        pendingServices: 0,
        rejectedServices: 0,
        totalRevenue: 0,
        totalBookings: 0,
      };
    return summary;
  }, [summary]);

  const roleDistribution = useMemo(
    () =>
      (userDist || []).map((r) => ({
        name: r.roleName,
        value: r.count,
        percentage: r.percentage,
      })),
    [userDist]
  );

  const serviceStatusData = useMemo(
    () =>
      (serviceStatusDist || []).map((s) => ({
        name: s.statusName,
        value: s.count,
        percentage: s.percentage,
      })),
    [serviceStatusDist]
  );

  const membershipData = useMemo(
    () =>
      (membershipDist || []).map((m) => ({
        name: m.subscriptionName,
        value: m.count,
        revenue: m.revenue,
        percentage: m.percentage,
      })),
    [membershipDist]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          {loadingSummary ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {Math.round(stats.verificationRate ?? 0)}%
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                Tổng người dùng
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.totalUsers}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {stats.customers} khách hàng
              </p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          {loadingSummary ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                Cameraman hoạt động
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.activeCameramen}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {stats.approvedServices} dịch vụ đã duyệt
              </p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          {loadingSummary ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                {stats.pendingServices > 0 && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold">
                    Cần duyệt
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                Dịch vụ chờ duyệt
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.pendingServices}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {stats.rejectedServices} đã từ chối
              </p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          {loadingSummary ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-[#FF9500]" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                Tổng doanh thu
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {((stats.totalRevenue || 0) / 1_000_000).toFixed(1)}M
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {stats.totalBookings} booking
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phân bố người dùng
          </h3>
          {loadingUsersDist ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) =>
                    `${name}: ${Number(percentage ?? 0).toFixed(1)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {roleDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => {
                    const pct = props?.payload?.percentage;
                    return [
                      `${value} người • ${Number(pct ?? 0).toFixed(1)}%`,
                      props?.payload?.name || name,
                    ];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Trạng thái dịch vụ
          </h3>
          {loadingServicesDist ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF9500" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Doanh thu theo thời gian (triệu VND)
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setRevenueTimeRange("week")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  revenueTimeRange === "week"
                    ? "bg-[#FF9500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tuần
              </button>
              <button
                onClick={() => setRevenueTimeRange("month")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  revenueTimeRange === "month"
                    ? "bg-[#FF9500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tháng
              </button>
              <button
                onClick={() => setRevenueTimeRange("year")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  revenueTimeRange === "year"
                    ? "bg-[#FF9500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Năm
              </button>
            </div>
          </div>
          {loadingRevenue ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="period"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                  formatter={(value, name) => [
                    name === "revenue" ? `${value}M VND` : `${value} bookings`,
                    name === "revenue" ? "Doanh thu" : "Số booking",
                  ]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value) =>
                    value === "revenue" ? "Doanh thu" : "Số booking"
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF9500"
                  strokeWidth={3}
                  dot={{ fill: "#FF9500", r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#34C759"
                  strokeWidth={2}
                  dot={{ fill: "#34C759", r: 4 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phân bố gói thành viên
          </h3>
          {loadingMembership ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {membershipData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
