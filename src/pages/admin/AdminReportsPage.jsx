import React, { useState } from 'react';
import { AlertTriangle, Eye, CheckCircle, XCircle, Clock, User, MessageCircle, Search, Filter, Download } from 'lucide-react';
import { Table, Button, Badge, Modal, Input, Select, Tag, Tooltip } from 'antd';
import Header from '../../components/layout/Header';

const AdminReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 500,
      customer_id: 12,
      cameraman_id: 3,
      customer_name: 'Lê Khách 3',
      cameraman_name: 'Anh Cinema',
      customer_avatar: null,
      cameraman_avatar: null,
      content: 'Cameraman không xuất hiện đúng giờ hẹn và không thông báo trước. Gây ảnh hưởng nghiêm trọng đến sự kiện của tôi.',
      status: 'pending',
      severity: 'high',
      category: 'punctuality',
      created_at: '2025-09-19T03:00:00Z',
      evidence: ['receipt.jpg', 'messages.png'],
      booking_id: 203
    },
    {
      id: 501,
      customer_id: 13,
      cameraman_id: 2,
      customer_name: 'Phạm Khách 4',
      cameraman_name: 'Minh Film',
      customer_avatar: null,
      cameraman_avatar: null,
      content: 'Phản hồi tin nhắn rất chậm, phải chờ hơn 24 tiếng mới có câu trả lời. Ảnh hưởng đến việc chuẩn bị.',
      status: 'processed',
      severity: 'medium',
      category: 'communication',
      created_at: '2025-09-15T03:00:00Z',
      resolved_at: '2025-09-16T06:00:00Z',
      admin_response: 'Đã liên hệ và nhắc nhở cameraman về thời gian phản hồi. Cameraman cam kết cải thiện.',
      admin_action: 'warning_issued',
      booking_id: 201
    },
    {
      id: 502,
      customer_id: 10,
      cameraman_id: 4,
      customer_name: 'Nguyễn Khách 1',
      cameraman_name: 'Hoàng Studio',
      customer_avatar: null,
      cameraman_avatar: null,
      content: 'Chất lượng video không đúng như cam kết, thiếu nhiều cảnh quan trọng và màu sắc không đẹp.',
      status: 'investigating',
      severity: 'high',
      category: 'quality',
      created_at: '2025-09-20T08:00:00Z',
      evidence: ['video_sample.mp4', 'contract.pdf'],
      booking_id: 204
    },
    {
      id: 503,
      customer_id: 11,
      cameraman_id: 3,
      customer_name: 'Trần Khách 2',
      cameraman_name: 'Anh Cinema',
      customer_avatar: null,
      cameraman_avatar: null,
      content: 'Hành vi không phù hợp khi giao tiếp, sử dụng từ ngữ không lịch sự với khách mời trong đám cưới.',
      status: 'dismissed',
      severity: 'medium',
      category: 'behavior',
      created_at: '2025-09-18T05:00:00Z',
      resolved_at: '2025-09-19T10:00:00Z',
      admin_response: 'Sau khi xem xét, đây là hiểu lầm do giao tiếp. Đã hòa giải thành công.',
      admin_action: 'mediation_successful',
      booking_id: 202
    }
  ];

  const handleReportAction = (report, action) => {
    if (action === 'view') {
      setSelectedReport(report);
      setShowDetailModal(true);
    } else if (action === 'resolve') {
      console.log('Resolving report:', report.id);
    } else if (action === 'dismiss') {
      console.log('Dismissing report:', report.id);
    }
  };

  const handleSendResponse = () => {
    console.log('Sending response to report:', selectedReport.id, responseText);
    setShowDetailModal(false);
    setResponseText('');
    setSelectedReport(null);
  };

  const getSeverityBadge = (severity) => {
    const severityMap = {
      low: { color: 'green', text: 'Thấp' },
      medium: { color: 'orange', text: 'Trung bình' },
      high: { color: 'red', text: 'Cao' },
      critical: { color: 'volcano', text: 'Nghiêm trọng' }
    };
    const info = severityMap[severity] || { color: 'default', text: 'Không xác định' };
    return <Badge color={info.color} text={info.text} />;
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: 'orange', text: 'Chờ xử lý', icon: Clock },
      investigating: { color: 'blue', text: 'Đang điều tra', icon: Eye },
      processed: { color: 'green', text: 'Đã xử lý', icon: CheckCircle },
      dismissed: { color: 'default', text: 'Đã bỏ qua', icon: XCircle }
    };
    const info = statusMap[status] || { color: 'default', text: status, icon: Clock };
    return (
      <div className="flex items-center space-x-2">
        <info.icon className="w-4 h-4" />
        <Badge color={info.color} text={info.text} />
      </div>
    );
  };

  const getCategoryTag = (category) => {
    const categoryMap = {
      punctuality: { color: 'red', text: 'Đúng giờ' },
      communication: { color: 'blue', text: 'Giao tiếp' },
      quality: { color: 'orange', text: 'Chất lượng' },
      behavior: { color: 'purple', text: 'Hành vi' },
      payment: { color: 'green', text: 'Thanh toán' },
      other: { color: 'default', text: 'Khác' }
    };
    const info = categoryMap[category] || { color: 'default', text: 'Khác' };
    return <Tag color={info.color}>{info.text}</Tag>;
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    const matchesSearch = searchTerm === '' || 
      report.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.cameraman_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <span className="text-white font-mono">#{id}</span>
    },
    {
      title: 'Người báo cáo',
      key: 'reporter',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div>
            <p className="text-white font-medium">{record.customer_name}</p>
            <p className="text-gray-400 text-sm">Khách hàng</p>
          </div>
        </div>
      )
    },
    {
      title: 'Bị báo cáo',
      key: 'reported',
      width: 200,
      render: (_, record) => (
        <div>
          <p className="text-white font-medium">{record.cameraman_name}</p>
          <p className="text-gray-400 text-sm">Cameraman</p>
        </div>
      )
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (content) => (
        <Tooltip title={content}>
          <div className="max-w-xs">
            <p className="text-gray-300 text-sm truncate">{content}</p>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: getCategoryTag
    },
    {
      title: 'Mức độ',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      render: getSeverityBadge
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: getStatusBadge
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created',
      width: 120,
      render: (date) => (
        <span className="text-gray-400">
          {new Date(date).toLocaleDateString('vi-VN')}
        </span>
      )
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button 
            size="small" 
            icon={<Eye className="w-4 h-4" />}
            onClick={() => handleReportAction(record, 'view')}
          >
            Chi tiết
          </Button>
          {record.status === 'pending' && (
            <>
              <Button 
                size="small" 
                type="primary"
                onClick={() => handleReportAction(record, 'resolve')}
              >
                Xử lý
              </Button>
              <Button 
                size="small" 
                onClick={() => handleReportAction(record, 'dismiss')}
              >
                Bỏ qua
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    investigating: reports.filter(r => r.status === 'investigating').length,
    processed: reports.filter(r => r.status === 'processed').length,
    highSeverity: reports.filter(r => r.severity === 'high').length
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold flex items-center space-x-2">
            <AlertTriangle className="w-8 h-8 text-[#FF9500]" />
            <span>Quản lý Báo cáo</span>
          </h1>
          <p className="text-gray-400 mt-2">Xử lý các báo cáo vi phạm và khiếu nại từ người dùng</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tổng báo cáo</p>
                <p className="text-white text-2xl font-bold">{stats.total}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Chờ xử lý</p>
                <p className="text-white text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-6 h-6 text-[#FF9500]" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Đang điều tra</p>
                <p className="text-white text-2xl font-bold">{stats.investigating}</p>
              </div>
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Đã xử lý</p>
                <p className="text-white text-2xl font-bold">{stats.processed}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Mức độ cao</p>
                <p className="text-white text-2xl font-bold">{stats.highSeverity}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Tìm kiếm báo cáo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  style={{ width: 250 }}
                />
              </div>
              
              <Select 
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 150 }}
                className="custom-select"
              >
                <Select.Option value="all">Tất cả trạng thái</Select.Option>
                <Select.Option value="pending">Chờ xử lý</Select.Option>
                <Select.Option value="investigating">Đang điều tra</Select.Option>
                <Select.Option value="processed">Đã xử lý</Select.Option>
                <Select.Option value="dismissed">Đã bỏ qua</Select.Option>
              </Select>
              
              <Select 
                value={filterSeverity}
                onChange={setFilterSeverity}
                style={{ width: 150 }}
                className="custom-select"
              >
                <Select.Option value="all">Tất cả mức độ</Select.Option>
                <Select.Option value="high">Cao</Select.Option>
                <Select.Option value="medium">Trung bình</Select.Option>
                <Select.Option value="low">Thấp</Select.Option>
              </Select>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                icon={<Download className="w-4 h-4" />}
                className="bg-[#FF9500] hover:bg-orange-600 text-white border-none"
              >
                Xuất báo cáo
              </Button>
              <div className="text-sm text-gray-400">
                Hiển thị <span className="text-white font-semibold">{filteredReports.length}</span> / {reports.length} báo cáo
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredReports}
            rowKey="id"
            className="admin-table"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} báo cáo`
            }}
            scroll={{ x: 1200 }}
          />
        </div>

        {/* Detail Modal */}
        <Modal
          title={
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#FF9500]" />
              <span>Chi tiết báo cáo #{selectedReport?.id}</span>
            </div>
          }
          open={showDetailModal}
          onCancel={() => setShowDetailModal(false)}
          width={800}
          footer={[
            <Button key="cancel" onClick={() => setShowDetailModal(false)}>
              Đóng
            </Button>,
            selectedReport?.status === 'pending' && (
              <Button key="respond" type="primary" onClick={handleSendResponse}>
                Gửi phản hồi
              </Button>
            )
          ]}
        >
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Người báo cáo:</p>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{selectedReport.customer_name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Đối tượng bị báo cáo:</p>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{selectedReport.cameraman_name}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Nội dung báo cáo:</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-800">{selectedReport.content}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Danh mục:</p>
                  {getCategoryTag(selectedReport.category)}
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Mức độ:</p>
                  {getSeverityBadge(selectedReport.severity)}
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Trạng thái:</p>
                  {getStatusBadge(selectedReport.status)}
                </div>
              </div>

              {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Bằng chứng đính kèm:</p>
                  <div className="flex space-x-2">
                    {selectedReport.evidence.map((file, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-sm">
                        📎 {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-gray-600 text-sm">Thời gian tạo:</p>
                <p>{new Date(selectedReport.created_at).toLocaleString('vi-VN')}</p>
              </div>

              {selectedReport.status === 'processed' && selectedReport.admin_response && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Phản hồi admin:</p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-green-800">{selectedReport.admin_response}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Xử lý lúc: {new Date(selectedReport.resolved_at).toLocaleString('vi-VN')}
                  </p>
                </div>
              )}

              {selectedReport.status === 'pending' && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Phản hồi của admin:</p>
                  <Input.TextArea
                    rows={4}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Nhập phản hồi hoặc hành động đã thực hiện..."
                  />
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>

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
        .custom-select .ant-select-selector {
          background: #374151 !important;
          border-color: #4b5563 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default AdminReportsPage;