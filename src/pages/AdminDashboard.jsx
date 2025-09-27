import React, { useState } from 'react';
import { Users, Camera, FileText, AlertTriangle, DollarSign, TrendingUp, Eye, Edit2, Trash2 } from 'lucide-react';
import { Table, Button, Badge, Modal, Input, Select, DatePicker } from 'antd';
import Header from '../components/layout/Header';
import { mockData } from '../data/mockData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedService, setSelectedService] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'services', label: 'Duyệt dịch vụ', icon: Camera },
    { id: 'bookings', label: 'Quản lý booking', icon: FileText },
    { id: 'reports', label: 'Báo cáo', icon: AlertTriangle },
    { id: 'revenue', label: 'Doanh thu', icon: DollarSign }
  ];

  const stats = [
    { label: 'Tổng người dùng', value: '1,234', change: '+12%', color: 'text-blue-500' },
    { label: 'Cameraman hoạt động', value: '89', change: '+8%', color: 'text-green-500' },
    { label: 'Dịch vụ chờ duyệt', value: '23', change: '+3%', color: 'text-yellow-500' },
    { label: 'Doanh thu tháng', value: '45.2M', change: '+15%', color: 'text-orange-500' }
  ];

  const handleServiceAction = (service, action) => {
    if (action === 'approve') {
      console.log('Approved service:', service.id);
    } else if (action === 'reject') {
      setSelectedService(service);
      setShowRejectionModal(true);
    }
  };

  const handleRejectService = () => {
    console.log('Rejected service:', selectedService.id, 'Reason:', rejectionReason);
    setShowRejectionModal(false);
    setRejectionReason('');
    setSelectedService(null);
  };

  const userColumns = [
    {
      title: 'Người dùng',
      dataIndex: 'full_name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            {record.avatar_url ? (
              <img src={record.avatar_url} alt={text} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <span className="text-white text-sm">{text?.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="text-white font-medium">{text}</p>
            <p className="text-gray-400 text-sm">{record.email}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Vai trò',
      dataIndex: 'role_name',
      key: 'role',
      render: (role) => (
        <Badge 
          color={role === 'admin' ? 'red' : role === 'cameraman' ? 'blue' : 'green'} 
          text={role === 'admin' ? 'Admin' : role === 'cameraman' ? 'Cameraman' : 'Khách hàng'}
        />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          color={status === 'active' ? 'green' : 'red'} 
          text={status === 'active' ? 'Hoạt động' : 'Bị khóa'}
        />
      )
    },
    {
      title: 'Xác minh',
      dataIndex: 'is_verified',
      key: 'verified',
      render: (verified) => (
        <Badge 
          color={verified ? 'green' : 'orange'} 
          text={verified ? 'Đã xác minh' : 'Chưa xác minh'}
        />
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button size="small" icon={<Eye className="w-4 h-4" />} />
          <Button size="small" icon={<Edit2 className="w-4 h-4" />} />
          <Button size="small" danger icon={<Trash2 className="w-4 h-4" />} />
        </div>
      )
    }
  ];

  const serviceColumns = [
    {
      title: 'Dịch vụ',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        const cameraman = mockData.users.find(u => u.id === record.cameraman_id);
        return (
          <div>
            <p className="text-white font-medium">{text}</p>
            <p className="text-gray-400 text-sm">Cameraman: {cameraman?.full_name}</p>
          </div>
        );
      }
    },
    {
      title: 'Giá',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-orange-500 font-semibold">
          {new Intl.NumberFormat('vi-VN').format(amount)} VND
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          pending: { color: 'orange', text: 'Chờ duyệt' },
          approved: { color: 'green', text: 'Đã duyệt' },
          rejected: { color: 'red', text: 'Từ chối' },
          disabled: { color: 'gray', text: 'Vô hiệu hóa' }
        };
        const statusInfo = statusMap[status] || { color: 'gray', text: status };
        return <Badge color={statusInfo.color} text={statusInfo.text} />;
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          {record.status === 'pending' && (
            <>
              <Button 
                size="small" 
                type="primary" 
                onClick={() => handleServiceAction(record, 'approve')}
              >
                Duyệt
              </Button>
              <Button 
                size="small" 
                danger 
                onClick={() => handleServiceAction(record, 'reject')}
              >
                Từ chối
              </Button>
            </>
          )}
          <Button size="small" icon={<Eye className="w-4 h-4" />} />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">Quản lý hệ thống CamCrew</p>
        </div>

        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-white text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} text-sm font-semibold`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Hoạt động gần đây</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">Minh Film đã đăng ký gói 1 tháng</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">Dịch vụ "Gói Cưới Cinematic" được duyệt</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">Booking mới từ Nguyễn Văn B</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Thống kê nhanh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Booking hoàn thành</span>
                    <span className="text-white font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tỷ lệ phản hồi</span>
                    <span className="text-white font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Đánh giá trung bình</span>
                    <span className="text-white font-semibold">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Quản lý người dùng</h2>
              <Button type="primary">Thêm người dùng</Button>
            </div>
            <Table
              columns={userColumns}
              dataSource={mockData.users}
              rowKey="id"
              className="admin-table"
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Duyệt dịch vụ</h2>
              <div className="flex space-x-4">
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Select.Option value="all">Tất cả</Select.Option>
                  <Select.Option value="pending">Chờ duyệt</Select.Option>
                  <Select.Option value="approved">Đã duyệt</Select.Option>
                  <Select.Option value="rejected">Từ chối</Select.Option>
                </Select>
              </div>
            </div>
            <Table
              columns={serviceColumns}
              dataSource={mockData.services}
              rowKey="id"
              className="admin-table"
            />
          </div>
        )}
      </div>

      <Modal
        title="Từ chối dịch vụ"
        open={showRejectionModal}
        onOk={handleRejectService}
        onCancel={() => setShowRejectionModal(false)}
        okText="Từ chối"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <div className="mb-4">
          <p className="mb-2">Dịch vụ: <strong>{selectedService?.title}</strong></p>
          <p className="text-gray-600 mb-4">Vui lòng nhập lý do từ chối:</p>
          <Input.TextArea
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Nhập lý do từ chối dịch vụ..."
          />
        </div>
      </Modal>

      <style jsx global>{`
        .admin-table .ant-table {
          background: transparent !important;
        }
        .admin-table .ant-table-thead > tr > th {
          background: #374151 !important;
          color: white !important;
          border-bottom: 1px solid #4b5563 !important;
        }
        .admin-table .ant-table-tbody > tr > td {
          background: transparent !important;
          border-bottom: 1px solid #374151 !important;
        }
        .admin-table .ant-table-tbody > tr:hover > td {
          background: #374151 !important;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;