import React, { useState } from "react";
import {
  Users,
  Camera,
  FileText,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import { Table, Button, Badge, Modal, Input, Select } from "antd";
import { mockData } from "../../data/mockData";

const AdminDashboard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const stats = [
    {
      label: "Tổng người dùng",
      value: "1,234",
      change: "+12%",
      color: "text-blue-500",
      icon: Users,
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Cameraman hoạt động",
      value: "89",
      change: "+8%",
      color: "text-green-500",
      icon: Camera,
      bgColor: "bg-green-500/10",
    },
    {
      label: "Dịch vụ chờ duyệt",
      value: "23",
      change: "+3%",
      color: "text-yellow-500",
      icon: FileText,
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Doanh thu tháng",
      value: "45.2M VND",
      change: "+15%",
      color: "text-[#FF9500]",
      icon: DollarSign,
      bgColor: "bg-[#FF9500]/10",
    },
  ];

  const handleServiceAction = (service, action) => {
    if (action === "approve") {
      console.log("Approved service:", service.id);
    } else if (action === "reject") {
      setSelectedService(service);
      setShowRejectionModal(true);
    }
  };

  const handleRejectService = () => {
    console.log(
      "Rejected service:",
      selectedService.id,
      "Reason:",
      rejectionReason
    );
    setShowRejectionModal(false);
    setRejectionReason("");
    setSelectedService(null);
  };

  const userColumns = [
    {
      title: "Người dùng",
      dataIndex: "full_name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            {record.avatar_url ? (
              <img
                src={record.avatar_url}
                alt={text}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-sm">{text?.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="font-medium">{text}</p>
            <p className="text-gray-500 text-sm">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role",
      render: (role) => (
        <Badge
          color={
            role === "admin" ? "red" : role === "cameraman" ? "blue" : "green"
          }
          text={
            role === "admin"
              ? "Admin"
              : role === "cameraman"
              ? "Cameraman"
              : "Khách hàng"
          }
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          color={status === "active" ? "green" : "red"}
          text={status === "active" ? "Hoạt động" : "Bị khóa"}
        />
      ),
    },
    {
      title: "Xác minh",
      dataIndex: "is_verified",
      key: "verified",
      render: (verified) => (
        <Badge
          color={verified ? "green" : "orange"}
          text={verified ? "Đã xác minh" : "Chưa xác minh"}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button size="small" icon={<Eye className="w-4 h-4" />} />
          <Button size="small" icon={<Edit2 className="w-4 h-4" />} />
          <Button size="small" danger icon={<Trash2 className="w-4 h-4" />} />
        </div>
      ),
    },
  ];

  const serviceColumns = [
    {
      title: "Dịch vụ",
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        const cameraman = mockData.users.find(
          (u) => u.id === record.cameraman_id
        );
        return (
          <div>
            <p className="font-medium">{text}</p>
            <p className="text-gray-500 text-sm">
              Cameraman: {cameraman?.full_name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-[#FF9500] font-semibold">
          {new Intl.NumberFormat("vi-VN").format(amount)} VND
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          pending: { color: "orange", text: "Chờ duyệt" },
          approved: { color: "green", text: "Đã duyệt" },
          rejected: { color: "red", text: "Từ chối" },
          disabled: { color: "gray", text: "Vô hiệu hóa" },
        };
        const statusInfo = statusMap[status] || { color: "gray", text: status };
        return <Badge color={statusInfo.color} text={statusInfo.text} />;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          {record.status === "pending" && (
            <>
              <Button
                size="small"
                type="primary"
                onClick={() => handleServiceAction(record, "approve")}
              >
                Duyệt
              </Button>
              <Button
                size="small"
                danger
                onClick={() => handleServiceAction(record, "reject")}
              >
                Từ chối
              </Button>
            </>
          )}
          <Button size="small" icon={<Eye className="w-4 h-4" />} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div
                  className={`${stat.color} text-sm font-semibold mt-2 flex items-center`}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hành động nhanh
          </h3>
          <div className="space-y-3">
            <Button type="primary" block>
              Duyệt dịch vụ chờ
            </Button>
            <Button block>Xem báo cáo mới</Button>
            <Button block>Quản lý người dùng</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-700 text-sm">
                Minh Film đã đăng ký gói 1 tháng
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-700 text-sm">
                Dịch vụ "Gói Cưới Cinematic" được duyệt
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#FF9500] rounded-full"></div>
              <p className="text-gray-700 text-sm">
                Booking mới từ Nguyễn Văn B
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-gray-700 text-sm">
                Báo cáo vi phạm mới được gửi
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Thống kê nhanh
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Booking hoàn thành</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
                <span className="text-gray-900 font-semibold text-sm">87%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tỷ lệ phản hồi</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
                <span className="text-gray-900 font-semibold text-sm">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Đánh giá trung bình</span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-900 font-semibold text-sm">
                  4.8/5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Người dùng mới nhất
            </h2>
            <Button type="link">Xem tất cả</Button>
          </div>
        </div>
        <div className="p-6">
          <Table
            columns={userColumns.slice(0, 4)} 
            dataSource={mockData.users.slice(0, 5)} 
            rowKey="id"
            pagination={false}
            size="small"
          />
        </div>
      </div>

      {/* Pending Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Dịch vụ chờ duyệt
            </h2>
            <div className="flex space-x-4">
              <Select defaultValue="pending" style={{ width: 120 }}>
                <Select.Option value="pending">Chờ duyệt</Select.Option>
                <Select.Option value="all">Tất cả</Select.Option>
              </Select>
              <Button type="link">Xem tất cả</Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <Table
            columns={serviceColumns}
            dataSource={mockData.services.filter(
              (service) => service.status === "pending"
            )}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </div>
      </div>

      {/* Rejection Modal */}
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
          <p className="mb-2">
            Dịch vụ: <strong>{selectedService?.title}</strong>
          </p>
          <p className="text-gray-600 mb-4">Vui lòng nhập lý do từ chối:</p>
          <Input.TextArea
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Nhập lý do từ chối dịch vụ..."
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
