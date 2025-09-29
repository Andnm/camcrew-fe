import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Clock } from 'lucide-react';
import Header from '../components/layout/Header';

const RevenueDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const revenueData = {
    thisMonth: {
      total: 24500000,
      completed: 20000000,
      pending: 4500000,
      transactions: 8,
      growth: '+15%'
    },
    lastMonth: {
      total: 21300000,
      completed: 18000000,
      pending: 3300000,
      transactions: 6,
      growth: '+8%'
    },
    thisYear: {
      total: 185000000,
      completed: 165000000,
      pending: 20000000,
      transactions: 45,
      growth: '+28%'
    }
  };

  const transactions = [
    {
      id: 1,
      customer: 'Nguyễn Văn B',
      service: 'Gói Cưới Cinematic',
      amount: 12000000,
      status: 'completed',
      date: '2025-09-22',
      commission: 600000, // 5% platform fee
      netAmount: 11400000
    },
    {
      id: 2,
      customer: 'Trần Thị C',
      service: 'Quay Sự Kiện',
      amount: 8000000,
      status: 'completed',
      date: '2025-09-20',
      commission: 400000,
      netAmount: 7600000
    },
    {
      id: 3,
      customer: 'Lê Văn D',
      service: 'TVC Ngắn',
      amount: 15000000,
      status: 'pending',
      date: '2025-09-25',
      commission: 750000,
      netAmount: 14250000
    },
    {
      id: 4,
      customer: 'Phạm Thị E',
      service: 'Kỷ Yếu Học Sinh',
      amount: 5000000,
      status: 'processing',
      date: '2025-09-23',
      commission: 250000,
      netAmount: 4750000
    }
  ];

  const currentData = revenueData[selectedPeriod];

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { color: 'bg-green-600', text: 'Đã thanh toán' },
      pending: { color: 'bg-yellow-600', text: 'Chờ thanh toán' },
      processing: { color: 'bg-blue-600', text: 'Đang xử lý' },
      failed: { color: 'bg-red-600', text: 'Thất bại' }
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-600', text: 'Không xác định' };
    return (
      <span className={`${statusInfo.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
        {statusInfo.text}
      </span>
    );
  };

  const monthlyChart = [
    { month: 'T1', amount: 15000000 },
    { month: 'T2', amount: 18000000 },
    { month: 'T3', amount: 22000000 },
    { month: 'T4', amount: 19000000 },
    { month: 'T5', amount: 25000000 },
    { month: 'T6', amount: 28000000 },
    { month: 'T7', amount: 24000000 },
    { month: 'T8', amount: 21000000 },
    { month: 'T9', amount: 24500000 }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold">Doanh thu & Thu nhập</h1>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="thisMonth">Tháng này</option>
                <option value="lastMonth">Tháng trước</option>
                <option value="thisYear">Năm này</option>
              </select>
              <button className="bg-[#FF9500] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Xuất báo cáo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tổng doanh thu</p>
                <p className="text-white text-2xl font-bold">
                  {new Intl.NumberFormat('vi-VN').format(currentData.total)} VND
                </p>
                <p className="text-green-500 text-sm font-medium">{currentData.growth}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Đã nhận</p>
                <p className="text-white text-2xl font-bold">
                  {new Intl.NumberFormat('vi-VN').format(currentData.completed)} VND
                </p>
                <p className="text-gray-400 text-sm">
                  {Math.round((currentData.completed / currentData.total) * 100)}% tổng doanh thu
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Chờ thanh toán</p>
                <p className="text-white text-2xl font-bold">
                  {new Intl.NumberFormat('vi-VN').format(currentData.pending)} VND
                </p>
                <p className="text-yellow-500 text-sm">
                  {Math.round((currentData.pending / currentData.total) * 100)}% tổng doanh thu
                </p>
              </div>
              <div className="bg-yellow-600 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Giao dịch</p>
                <p className="text-white text-2xl font-bold">{currentData.transactions}</p>
                <p className="text-gray-400 text-sm">
                  ≈ {new Intl.NumberFormat('vi-VN').format(currentData.total / currentData.transactions)} VND/giao dịch
                </p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Biểu đồ doanh thu theo tháng</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#FF9500] rounded-full"></div>
                    <span className="text-gray-400">Doanh thu</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 flex items-end space-x-2">
                {monthlyChart.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-[#FF9500] rounded-t hover:bg-orange-400 transition-colors cursor-pointer"
                      style={{ 
                        height: `${(data.amount / Math.max(...monthlyChart.map(d => d.amount))) * 200}px` 
                      }}
                    ></div>
                    <span className="text-gray-400 text-xs mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Phí nền tảng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tỷ lệ hoa hồng:</span>
                  <span className="text-white font-semibold">5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phí đã trả tháng này:</span>
                  <span className="text-red-400 font-semibold">
                    {new Intl.NumberFormat('vi-VN').format(currentData.total * 0.05)} VND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thu nhập thực:</span>
                  <span className="text-green-400 font-semibold">
                    {new Intl.NumberFormat('vi-VN').format(currentData.total * 0.95)} VND
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Thống kê nhanh</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Đánh giá TB:</span>
                  <span className="text-yellow-400 font-semibold">4.8/5 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tỷ lệ hoàn thành:</span>
                  <span className="text-green-400 font-semibold">96%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Khách quay lại:</span>
                  <span className="text-blue-400 font-semibold">68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-8 bg-gray-800 rounded-lg">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-white text-lg font-semibold">Lịch sử giao dịch</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Dịch vụ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Phí nền tảng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thu nhập
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ngày
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{transaction.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{transaction.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-semibold">
                        {new Intl.NumberFormat('vi-VN').format(transaction.amount)} VND
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-red-400">
                        -{new Intl.NumberFormat('vi-VN').format(transaction.commission)} VND
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-green-400 font-semibold">
                        {new Intl.NumberFormat('vi-VN').format(transaction.netAmount)} VND
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(transaction.date).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;