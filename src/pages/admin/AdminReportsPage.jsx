import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Badge,
  Modal,
  Tag,
  Avatar,
  message,
  Input,
  Select,
  Space,
  Popconfirm,
  Dropdown,
  Tooltip,
} from "antd";
import {
  Eye,
  User as UserIcon,
  CheckCircle,
  XCircle,
  Search as SearchIcon,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { listReports, updateReport } from "../../api/reports";
import { REPORT_STATUS, ROLE_OPTIONS_LABEL } from "../../utils/constants";
import toast from "react-hot-toast";

const { Search } = Input;

const statusMap = {
  pending: { color: "orange", text: "Đang chờ xử lý" },
  processed: { color: "green", text: "Đã xử lý" },
};

const getRoleLabel = (val) =>
  ROLE_OPTIONS_LABEL.find((r) => r.value === val)?.label || val || "—";

const formatDateVN = (d) => (d ? new Date(d).toLocaleString("vi-VN") : "—");

const useDebounce = (value, delay = 450) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

export default function AdminReportsPage() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);
  const [respondOpen, setRespondOpen] = useState(false);
  const [respondText, setRespondText] = useState("");
  const [respondStatus, setRespondStatus] = useState("processed");
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listReports({
        page: pageIndex,
        limit: pageSize,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      const arr = res?.data || [];
      setRawData(
        arr.map((r) => ({
          id: r._id,
          customer: r.customer_id,
          cameraman: r.cameraman_id,
          content: r.content,
          status: r.status,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        }))
      );
      setTotal(res?.pagination?.totalResults || arr.length);
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Không tải được danh sách báo cáo");
      setRawData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, statusFilter]);

  const filteredData = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return rawData;
    return rawData.filter((x) => {
      const cName = (x.customer?.full_name || "").toLowerCase();
      const cmName = (x.cameraman?.full_name || "").toLowerCase();
      const content = (x.content || "").toLowerCase();
      return cName.includes(q) || cmName.includes(q) || content.includes(q);
    });
  }, [rawData, debouncedSearch]);

  const handleOpenDetail = (record) => {
    setDetailRecord(record);
    setDetailOpen(true);
  };

  const handleOpenRespond = (record) => {
    setDetailRecord(record);
    setRespondStatus("processed");
    setRespondText("");
    setRespondOpen(true);
  };

  const handleMarkProcessed = async (record) => {
    try {
      await updateReport(record.id, { status: "processed", admin_notes: "" });
      toast.success("Đã cập nhật trạng thái báo cáo");
      loadData();
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Cập nhật thất bại");
    }
  };

  const handleSubmitRespond = async () => {
    if (!detailRecord) return;
    try {
      await updateReport(detailRecord.id, {
        status: respondStatus,
        admin_notes: respondText?.trim() || "",
      });
      toast.success("Đã gửi phản hồi và cập nhật báo cáo");
      setRespondOpen(false);
      setDetailRecord(null);
      loadData();
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Gửi phản hồi thất bại");
    }
  };

  const getActionMenuItems = (record) => {
    const items = [
      {
        key: "detail",
        label: (
          <div className="flex items-center gap-2" onClick={() => handleOpenDetail(record)}>
            <Eye className="w-4 h-4" />
            <span>Chi tiết</span>
          </div>
        ),
      },
    ];
    if (record.status === "pending") {
      items.push({
        key: "respond",
        label: (
          <div className="flex items-center gap-2" onClick={() => handleOpenRespond(record)}>
            <FileText className="w-4 h-4" />
            <span>Gửi phản hồi</span>
          </div>
        ),
      });
      items.push({
        key: "processed",
        label: (
          <Popconfirm
            title="Đánh dấu là đã xử lý?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleMarkProcessed(record)}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Đánh dấu đã xử lý</span>
            </div>
          </Popconfirm>
        ),
      });
    }
    return items;
  };

  const columns = useMemo(
    () => [
      {
        title: "Người báo cáo",
        key: "customer",
        width: 280,
        render: (_, record) => (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              size={48}
              src={record?.customer?.avatar_url}
              className="bg-gray-700 flex-shrink-0"
              icon={!record?.customer?.avatar_url && <UserIcon className="w-5 h-5" />}
            />
            <div className="min-w-0">
              <div className="font-semibold text-black truncate">
                {record?.customer?.full_name || "—"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {record?.customer?.email || "—"}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Thợ bị báo cáo",
        key: "cameraman",
        width: 280,
        render: (_, record) => (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              size={48}
              src={record?.cameraman?.avatar_url}
              className="bg-gray-700 flex-shrink-0"
              icon={!record?.cameraman?.avatar_url && <UserIcon className="w-5 h-5" />}
            />
            <div className="min-w-0">
              <div className="font-semibold text-black truncate">
                {record?.cameraman?.full_name || "—"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {record?.cameraman?.email || "—"}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
        width: 360,
        render: (content) => (
          <Tooltip title={content}>
            <div className="text-sm text-gray-700 truncate max-w-[320px]">{content}</div>
          </Tooltip>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 160,
        render: (status) => {
          const info = statusMap[status] || { color: "default", text: status || "—" };
          return <Badge color={info.color} text={<span className="text-black">{info.text}</span>} />;
        },
      },
      {
        title: "Tạo lúc",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        sorter: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
        defaultSortOrder: "descend",
        render: (d) => <span className="text-gray-500 text-sm">{formatDateVN(d)}</span>,
      },
      {
        title: "Cập nhật",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 180,
        render: (d) => <span className="text-gray-500 text-sm">{formatDateVN(d)}</span>,
      },
      {
        title: "Hành động",
        key: "actions",
        width: 90,
        fixed: "right",
        render: (_, record) => (
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            menu={{ items: getActionMenuItems(record) }}
          >
            <Button type="text" className="hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5 text-black" />
            </Button>
          </Dropdown>
        ),
      },
    ],
    []
  );


  const stats = useMemo(() => {
    const totalAll = total;
    const pendingCount =
      statusFilter === "all"
        ? rawData.filter((r) => r.status === "pending").length + 0
        : statusFilter === "pending"
          ? total
          : 0;
    const processedCount =
      statusFilter === "all"
        ? rawData.filter((r) => r.status === "processed").length + 0
        : statusFilter === "processed"
          ? total
          : 0;
    return { total: totalAll, pending: pendingCount, processed: processedCount };
  }, [rawData, total, statusFilter]);

  return (
    <div className="p-6 bg-white min-h-screen">
    

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg">
          <div className="text-blue-100 text-sm font-medium mb-2">Tổng báo cáo</div>
          <div className="text-4xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 shadow-lg">
          <div className="text-orange-100 text-sm font-medium mb-2">Đang chờ xử lý</div>
          <div className="text-4xl font-bold text-white">{stats.pending}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 shadow-lg">
          <div className="text-green-100 text-sm font-medium mb-2">Đã xử lý</div>
          <div className="text-4xl font-bold text-white">{stats.processed}</div>
        </div>
      </div>

      <div className="mb-4">
        <Space wrap>
          <Search
            allowClear
            placeholder="Tìm theo người báo cáo, cameraman, nội dung…"
            enterButton={<SearchIcon className="w-4 h-4" />}
            style={{ width: 360 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            value={statusFilter}
            style={{ width: 200 }}
            onChange={(v) => {
              setStatusFilter(v);
              setPageIndex(1);
            }}
            options={[{ value: "all", label: "Tất cả trạng thái" }, ...REPORT_STATUS]}
            fieldNames={{ label: "label", value: "value" }}
          />
        </Space>
      </div>

      <div className="rounded-xl overflow-hidden">
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 1000 }}
          pagination={{
            current: pageIndex,
            pageSize,
            total: statusFilter === "all" && debouncedSearch ? filteredData.length : total,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPageIndex(p);
              setPageSize(s);
            },
            showTotal: (t, r) => (
              <span className="text-black">
                {r[0]}-{r[1]} / {t}
              </span>
            ),
          }}
        />
      </div>

      <Modal
        title={<span className="text-lg font-bold">Chi tiết báo cáo</span>}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {detailRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-3">Người báo cáo</div>
                <div className="flex items-center gap-3">
                  <Avatar
                    size={48}
                    src={detailRecord?.customer?.avatar_url}
                    className="bg-gray-700"
                    icon={!detailRecord?.customer?.avatar_url && <UserIcon className="w-6 h-6" />}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {detailRecord?.customer?.full_name || "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {detailRecord?.customer?.email || "—"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-3">Thợ bị báo cáo</div>
                <div className="flex items-center gap-3">
                  <Avatar
                    size={48}
                    src={detailRecord?.cameraman?.avatar_url}
                    className="bg-gray-700"
                    icon={!detailRecord?.cameraman?.avatar_url && <UserIcon className="w-6 h-6" />}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {detailRecord?.cameraman?.full_name || "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {detailRecord?.cameraman?.email || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Trạng thái</div>
                <Badge
                  color={statusMap[detailRecord?.status]?.color || "default"}
                  text={statusMap[detailRecord?.status]?.text || detailRecord?.status || "—"}
                />
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Tạo lúc</div>
                <div className="text-gray-900">{formatDateVN(detailRecord?.createdAt)}</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Cập nhật lúc</div>
                <div className="text-gray-900">{formatDateVN(detailRecord?.updatedAt)}</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">Nội dung báo cáo</div>
              <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                {detailRecord?.content || "—"}
              </div>
            </div>

            {!!detailRecord?.admin_notes && (
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Ghi chú của admin</div>
                <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {detailRecord.admin_notes}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>


      <Modal
        title={<span className="text-lg font-bold">Gửi phản hồi & cập nhật báo cáo</span>}
        open={respondOpen}
        onCancel={() => setRespondOpen(false)}
        onOk={handleSubmitRespond}
        okText="Cập nhật"
        width={720}
        style={{ top: 20 }}
      >
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">Trạng thái</div>
            <Select
              value={respondStatus}
              onChange={setRespondStatus}
              style={{ width: 240 }}
              options={REPORT_STATUS}
              fieldNames={{ label: "label", value: "value" }}
            />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Ghi chú của admin</div>
            <Input.TextArea
              rows={5}
              value={respondText}
              onChange={(e) => setRespondText(e.target.value)}
              placeholder="Nhập phản hồi hoặc hành động đã thực hiện..."
              maxLength={1000}
            />
            <div className="text-xs text-gray-400 mt-1">{respondText.length}/1000</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
