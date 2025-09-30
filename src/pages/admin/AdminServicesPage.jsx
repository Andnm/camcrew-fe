import React, { useEffect, useMemo, useState } from "react";
import { Table, Button, Badge, Modal, Input, Select, Tag, Space, message, Dropdown, Avatar } from "antd";
import { Eye, Check, X, MoreHorizontal, Camera } from "lucide-react";
import {
  SERVICE_STATUS,
  SERVICE_STYLES,
  SERVICE_CATEGORIES,
  SERVICE_AREAS,
  SERVICE_TIME_OF_DAYS,
} from "../../utils/constants";
import { listServices, approveService, rejectService } from "../../api/services";

const statusMap = {
  pending: { color: "orange", text: "Đang chờ duyệt" },
  approved: { color: "green", text: "Đã được chấp thuận" },
  rejected: { color: "red", text: "Đã bị từ chối" },
  disabled: { color: "default", text: "Đã được ẩn" },
};

const getStyleLabel = (val) => SERVICE_STYLES.find((s) => s.value === val)?.label || val;
const getCategoryLabel = (val) => SERVICE_CATEGORIES.find((s) => s.value === val)?.label || val;
const getAreaLabel = (val) => SERVICE_AREAS.find((s) => s.value === val)?.label || val;
const getTimeLabel = (val) => SERVICE_TIME_OF_DAYS.find((s) => s.value === val)?.label || val;

export default function AdminServicesPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10, totalResults: 0 });
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectTarget, setRejectTarget] = useState(null);

  const fetchData = async (page = pagination.pageIndex, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const res = await listServices({
        page,
        limit: pageSize,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      setData(res.data || []);
      setPagination({
        pageIndex: res.pagination?.pageIndex || page,
        pageSize: res.pagination?.pageSize || pageSize,
        totalResults: res.pagination?.totalResults || 0,
      });
    } catch (e) {
      message.error("Không tải được danh sách dịch vụ");
      setData([]);
      setPagination((p) => ({ ...p, totalResults: 0 }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, pagination.pageSize);
  }, [statusFilter]);

  const onChangePage = (page, pageSize) => {
    fetchData(page, pageSize);
  };

  const handleApprove = async (record) => {
    try {
      await approveService(record._id);
      message.success("Đã duyệt dịch vụ");
      fetchData();
    } catch {
      message.error("Duyệt dịch vụ thất bại");
    }
  };

  const handleOpenReject = (record) => {
    setRejectTarget(record);
    setRejectReason("");
    setRejectOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      message.warning("Vui lòng nhập lý do từ chối");
      return;
    }
    try {
      await rejectService(rejectTarget._id, { rejection_reason: rejectReason });
      message.success("Đã từ chối dịch vụ");
      setRejectOpen(false);
      setRejectTarget(null);
      setRejectReason("");
      fetchData();
    } catch {
      message.error("Từ chối dịch vụ thất bại");
    }
  };

  const getActionMenuItems = (record) => {
    const items = [];

    if (record.status === "pending") {
      items.push(
        {
          key: "approve",
          label: "Duyệt",
          icon: <Check className="w-4 h-4" />,
          onClick: () => handleApprove(record),
        },
        {
          key: "reject",
          label: "Từ chối",
          icon: <X className="w-4 h-4" />,
          danger: true,
          onClick: () => handleOpenReject(record),
        }
      );
    }

    items.push({
      key: "detail",
      label: "Chi tiết",
      icon: <Eye className="w-4 h-4" />,
      onClick: () => {
        setDetailRecord(record);
        setDetailOpen(true);
      },
    });

    return items;
  };

  const columns = useMemo(
    () => [
      {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        width: 300,
        render: (text, record) => (
          <div className="flex items-center space-x-3">
            <Avatar
              size={48}
              src={record?.cameraman_id?.avatar_url}
              icon={!record?.cameraman_id?.avatar_url && <Camera className="w-5 h-5" />}
              className="bg-gray-700 flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="font-semibold text-black truncate">{text}</div>
              <div className="text-black text-xs truncate">
                {record?.cameraman_id?.full_name}
              </div>
              <div className="text-gray-500 text-xs truncate">
                {record?.cameraman_id?.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Giá",
        dataIndex: "amount",
        key: "amount",
        width: 140,
        render: (amount) => (
          <span className="text-[#FF9500] font-semibold whitespace-nowrap">
            {new Intl.NumberFormat("vi-VN").format(amount)} VND
          </span>
        ),
      },
      {
        title: "Dịch vụ",
        dataIndex: "styles",
        key: "styles",
        width: 150,
        render: (styles = []) =>
          styles.length ? (
            <div className="flex flex-wrap gap-1">
              {styles.map((s, idx) => (
                <Tag key={idx} color="blue" className="m-0">
                  {getStyleLabel(s)}
                </Tag>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">N/A</span>
          ),
      },
      {
        title: "Phong cách",
        dataIndex: "categories",
        key: "categories",
        width: 150,
        render: (cats = []) =>
          cats.length ? (
            <div className="flex flex-wrap gap-1">
              {cats.map((c, idx) => (
                <Tag key={idx} color="purple" className="m-0">
                  {getCategoryLabel(c)}
                </Tag>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">N/A</span>
          ),
      },
      {
        title: "Khu vực",
        dataIndex: "areas",
        key: "areas",
        width: 180,
        render: (areas = []) =>
          areas.length ? (
            <div className="flex flex-wrap gap-1">
              {areas.map((a, idx) => (
                <Tag key={idx} color="green" className="m-0">
                  {getAreaLabel(a)}
                </Tag>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">N/A</span>
          ),
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 110,
        render: (date) => (
          <span className="text-gray-400 text-sm">
            {new Date(date).toLocaleDateString("vi-VN")}
          </span>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 150,
        render: (status, record) => {
          const info = statusMap[status] || { color: "default", text: status };
          return (
            <div>
              <Badge color={info.color} text={<span className="text-black">{info.text}</span>} />
              {record.rejection_reason && status === "rejected" && (
                <div className="text-xs text-red-400 mt-1 max-w-[130px] truncate" title={record.rejection_reason}>
                  {record.rejection_reason}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: "Hành động",
        key: "actions",
        width: 80,
        fixed: "right",
        render: (_, record) => (
          <Dropdown
            menu={{ items: getActionMenuItems(record) }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreHorizontal className="w-5 h-5 text-black " />}
              className="hover:bg-gray-700 transition-colors"
            />
          </Dropdown>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black">Quản lý dịch vụ</h1>
          <p className="text-black text-sm mt-1">Quản lý và điều hành hệ thống CamCrew</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={statusFilter}
            style={{ width: 220 }}
            onChange={(v) => setStatusFilter(v)}
            options={[
              { value: "all", label: "Tất cả trạng thái" },
              ...SERVICE_STATUS.map((s) => ({ value: s.value, label: s.label }))
            ]}
            className="custom-select"
          />
        </div>
      </div>

      <div className=" rounded-xl overflow-hidden">
        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1400 }}
          className="custom-table"
          pagination={{
            current: pagination.pageIndex,
            pageSize: pagination.pageSize,
            total: pagination.totalResults,
            showSizeChanger: true,
            onChange: onChangePage,
            onShowSizeChange: onChangePage,
            showTotal: (total, range) => (
              <span className="text-black">
                {range[0]}-{range[1]} / {total}
              </span>
            ),
          }}
        />
      </div>

      <Modal
        title={<span className="text-lg font-bold">Chi tiết dịch vụ</span>}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={800}
        style={{ top: 10 }}
      >
        {detailRecord && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b">
              <Avatar
                size={64}
                src={detailRecord?.cameraman_id?.avatar_url}
                icon={!detailRecord?.cameraman_id?.avatar_url && <Camera className="w-8 h-8" />}
                className="bg-gray-700"
              />
              <div>
                <div className="text-xl font-bold text-gray-900">{detailRecord.title}</div>
                <div className="text-sm text-gray-500">
                  {detailRecord?.cameraman_id?.full_name} • {detailRecord?.cameraman_id?.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Giá dịch vụ</div>
                  <div className="text-[#FF9500] font-bold text-lg">
                    {new Intl.NumberFormat("vi-VN").format(detailRecord.amount)} VND
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Dịch vụ</div>
                  <div className="flex flex-wrap gap-1">
                    {detailRecord.styles?.length ? (
                      detailRecord.styles.map((s, idx) => (
                        <Tag key={idx} color="blue">{getStyleLabel(s)}</Tag>
                      ))
                    ) : "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Phong cách</div>
                  <div className="flex flex-wrap gap-1">
                    {detailRecord.categories?.length ? (
                      detailRecord.categories.map((c, idx) => (
                        <Tag key={idx} color="purple">{getCategoryLabel(c)}</Tag>
                      ))
                    ) : "N/A"}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Khu vực</div>
                  <div className="flex flex-wrap gap-1">
                    {detailRecord.areas?.length ? (
                      detailRecord.areas.map((a, idx) => (
                        <Tag key={idx} color="green">{getAreaLabel(a)}</Tag>
                      ))
                    ) : "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Ngày nhận job</div>
                  <div>
                    {detailRecord.date_get_job
                      ? new Date(detailRecord.date_get_job).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Khung giờ</div>
                  <div className="flex flex-wrap gap-1">
                    {detailRecord.time_of_day?.length ? (
                      detailRecord.time_of_day.map((t, idx) => (
                        <Tag key={idx}>{getTimeLabel(t)}</Tag>
                      ))
                    ) : "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Trạng thái</div>
                  <Badge
                    color={statusMap[detailRecord.status]?.color || "default"}
                    text={statusMap[detailRecord.status]?.text || detailRecord.status}
                  />
                  {detailRecord.status === "rejected" && detailRecord.rejection_reason && (
                    <div className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                      <strong>Lý do từ chối:</strong> {detailRecord.rejection_reason}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {detailRecord.description && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Mô tả chi tiết</div>
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {detailRecord.description}
                </div>
              </div>
            )}

            {detailRecord.video_demo_urls?.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Video demo</div>
                <div className="grid grid-cols-2 gap-3">
                  {detailRecord.video_demo_urls.map((url, idx) => (
                    <div key={idx} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                      <video
                        src={url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="Nhập lý do từ chối"
        open={rejectOpen}
        onOk={handleConfirmReject}
        okText="Từ chối"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
        onCancel={() => setRejectOpen(false)}
      >
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Ví dụ: Nội dung không phù hợp với tiêu chí..."
        />
      </Modal>

    
    </div >
  );
}