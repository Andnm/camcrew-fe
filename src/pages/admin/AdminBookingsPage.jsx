import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Badge,
  Modal,
  Avatar,
  Input,
  Select,
  Space,
  Dropdown,
  Tooltip,
} from "antd";
import {
  Eye,
  User as UserIcon,
  Search as SearchIcon,
  MoreHorizontal,
  Camera,
  Calendar,
  CheckCircle,
  XCircle,
  Mail,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { listBookings } from "../../api/bookings";
import { BOOKING_STATUS_LABEL, SERVICE_TIME_OF_DAYS } from "../../utils/constants";

const { Search } = Input;

const formatDateVN = (d) => (d ? new Date(d).toLocaleString("vi-VN") : "—");
const formatMoney = (n) =>
  typeof n === "number"
    ? n.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    : "—";

const useDebounce = (value, delay = 450) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const getLabel = (arr, v) => arr.find((x) => x.value === v)?.label || v || "—";
const statusColor = (v) =>
({
  paying: "gold",
  pay_cancelled: "red",
  requested: "blue",
  completed: "green",
}[v] || "default");

export default function AdminBookingsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listBookings({
        page: pageIndex,
        limit: pageSize,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      const arr = res?.data || [];
      setRows(
        arr.map((x) => ({
          id: x._id,
          customer: x.customer_id,
          cameraman: x.cameraman_id,
          service: x.service_id,
          amount: x.amount,
          status: x.status,
          time_of_day: x.time_of_day,
          scheduled_date: x.scheduled_date,
          createdAt: x.createdAt,
          updatedAt: x.updatedAt,
        }))
      );
      setTotal(res?.pagination?.totalResults || arr.length);
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Không tải được danh sách đặt lịch");
      setRows([]);
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
    if (!q) return rows;
    return rows.filter((x) => {
      const cName = (x.customer?.full_name || "").toLowerCase();
      const cEmail = (x.customer?.email || "").toLowerCase();
      const cmName = (x.cameraman?.full_name || "").toLowerCase();
      const cmEmail = (x.cameraman?.email || "").toLowerCase();
      const svcTitle = (x.service?.title || "").toLowerCase();
      return (
        cName.includes(q) ||
        cEmail.includes(q) ||
        cmName.includes(q) ||
        cmEmail.includes(q) ||
        svcTitle.includes(q)
      );
    });
  }, [rows, debouncedSearch]);

  const handleOpenDetail = (record) => {
    setDetailRecord(record);
    setDetailOpen(true);
  };

  const getActionMenuItems = (record) => [
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

  const columns = useMemo(
    () => [
      {
        title: "Khách hàng",
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
              <div className="text-xs text-gray-500 truncate">{record?.customer?.email || "—"}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Thợ quay",
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
              <div className="text-xs text-gray-500 truncate">{record?.cameraman?.email || "—"}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Dịch vụ",
        key: "service",
        width: 320,
        render: (_, record) => (
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gray-500" />
              <Tooltip title={record?.service?.title}>
                <div className="font-medium text-black truncate max-w-[260px]">
                  {record?.service?.title || "—"}
                </div>
              </Tooltip>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Giá dịch vụ: {formatMoney(record?.service?.amount)}
            </div>
          </div>
        ),
      },
      {
        title: "Lịch hẹn",
        key: "schedule",
        width: 220,
        render: (_, record) => (
          <div className="text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{formatDateVN(record?.scheduled_date)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getLabel(SERVICE_TIME_OF_DAYS, record?.time_of_day)}
            </div>
          </div>
        ),
      },
      {
        title: "Thanh toán",
        dataIndex: "amount",
        key: "amount",
        width: 140,
        render: (v) => (
          <div className="inline-flex items-center gap-1 text-black">
            <span>{formatMoney(v)}</span>
          </div>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 180,
        render: (status) => (
          <Badge
            color={statusColor(status)}
            text={<span className="text-black">{getLabel(BOOKING_STATUS_LABEL, status)}</span>}
          />
        ),
      },
      {
        title: "Tạo lúc",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 170,
        sorter: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
        defaultSortOrder: "descend",
        render: (d) => <span className="text-gray-500 text-sm">{formatDateVN(d)}</span>,
      },
      {
        title: "Hành động",
        key: "actions",
        width: 90,
        fixed: "right",
        render: (_, record) => (
          <Dropdown trigger={["click"]} placement="bottomRight" menu={{ items: getActionMenuItems(record) }}>
            <Button type="text" className="hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5 text-black" />
            </Button>
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
          <h1 className="text-2xl font-bold text-black">Quản lý đặt lịch</h1>
          <p className="text-black text-sm mt-1">Xem, lọc và tra cứu các booking</p>
        </div>
      </div>

      <div className="mb-4">
        <Space wrap>
          <Search
            allowClear
            placeholder="Tìm theo khách hàng, thợ quay, dịch vụ…"
            enterButton={<SearchIcon className="w-4 h-4" />}
            style={{ width: 360 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            value={statusFilter}
            style={{ width: 240 }}
            onChange={(v) => {
              setStatusFilter(v);
              setPageIndex(1);
            }}
            options={[{ value: "all", label: "Tất cả trạng thái" }, ...BOOKING_STATUS_LABEL]}
          />
        </Space>
      </div>

      <div className="rounded-xl overflow-hidden">
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 1200 }}
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
        title={<span className="text-xl font-bold text-gray-900">Chi tiết đặt lịch</span>}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={900}
        style={{ top: 20 }}
      >
        {detailRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">Khách hàng</div>
                <div className="flex items-center gap-4">
                  <Avatar
                    size={56}
                    src={detailRecord?.customer?.avatar_url}
                    className="bg-blue-500 shadow-md"
                    icon={!detailRecord?.customer?.avatar_url && <UserIcon className="w-7 h-7" />}
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">
                      {detailRecord?.customer?.full_name || "—"}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {detailRecord?.customer?.email || "—"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-3">Thợ quay</div>
                <div className="flex items-center gap-4">
                  <Avatar
                    size={56}
                    src={detailRecord?.cameraman?.avatar_url}
                    className="bg-purple-500 shadow-md"
                    icon={!detailRecord?.cameraman?.avatar_url && <UserIcon className="w-7 h-7" />}
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">
                      {detailRecord?.cameraman?.full_name || "—"}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {detailRecord?.cameraman?.email || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-5 border border-orange-200">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-3">Dịch vụ</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{detailRecord?.service?.title || "—"}</div>
                    <div className="text-sm text-gray-600">Giá dịch vụ</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatMoney(detailRecord?.service?.amount)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Trạng thái</div>
                <Badge
                  color={statusColor(detailRecord?.status)}
                  text={<span className="text-black">{getLabel(BOOKING_STATUS_LABEL, detailRecord?.status)}</span>}
                />
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Lịch hẹn</div>
                <div className="font-bold text-gray-900 text-base">{formatDateVN(detailRecord?.scheduled_date)}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {getLabel(SERVICE_TIME_OF_DAYS, detailRecord?.time_of_day)}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tạo lúc</div>
                <div className="font-bold text-gray-900 text-base">{formatDateVN(detailRecord?.createdAt)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-5 border border-green-200">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Tổng thanh toán</div>
              <div className="text-3xl font-bold text-green-600">
                {formatMoney(detailRecord?.amount)}
              </div>
            </div>


          </div>
        )}
      </Modal>
    </div>
  );
}
