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
} from "antd";
import { Eye, User as UserIcon, CheckCircle, XCircle, Search as SearchIcon, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { listUserByAdmin, listCameramanByAdmin, upRoleCameraman, updateUserProfileByAdmin } from "../../api/users";
import { getMembershipLabel } from "../../utils/helper";
import { ROLE_OPTIONS_LABEL } from "../../utils/constants";
import toast from "react-hot-toast";

const { Search } = Input;

const statusMap = {
  active: { color: "green", text: "Đang hoạt động" },
  disabled: { color: "default", text: "Đã khóa" },
};

const roleColorMap = {
  customer: "blue",
  cameraman: "gold",
};

const membershipColorMap = {
  normal: "purple",
  "1month": "cyan",
  "6month": "red",
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

export default function AdminUsersPage() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [membershipFilter, setMembershipFilter] = useState("all");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);

  const fetchAllPages = async (listFn) => {
    const first = await listFn({ page: 1, limit: 50 });
    const totalResults = first?.pagination?.totalResults ?? (first?.data?.length || 0);
    const pageSizeLocal = first?.pagination?.pageSize || 50;
    const totalPages = Math.max(
      first?.pagination?.totalPages || Math.ceil(totalResults / pageSizeLocal),
      1
    );
    let all = first?.data || [];
    for (let p = 2; p <= totalPages; p++) {
      const res = await listFn({ page: p, limit: pageSizeLocal });
      if (res?.data?.length) all = all.concat(res.data);
    }
    return all;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [users, cameramen] = await Promise.all([
        fetchAllPages(listUserByAdmin),
        fetchAllPages(listCameramanByAdmin),
      ]);
      const map = new Map();
      [...users, ...cameramen].forEach((u) => {
        if (u?._id) map.set(u._id, u);
      });
      const merged = Array.from(map.values());
      merged.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setRawData(merged);
      setPageIndex(1);
    } catch {
      toast.error("Không tải được danh sách người dùng");
      setRawData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSortedData = useMemo(() => {
    let list = [...rawData];
    if (roleFilter !== "all") list = list.filter((x) => (x.role_name || "").toLowerCase() === roleFilter);
    if (statusFilter !== "all") list = list.filter((x) => (x.status || "").toLowerCase() === statusFilter);
    if (verifiedFilter !== "all") list = list.filter((x) => !!x.is_verified === (verifiedFilter === "true"));
    if (membershipFilter !== "all") list = list.filter((x) => (x.membership_subscription || "") === membershipFilter);
    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      list = list.filter((x) => {
        const name = (x.full_name || "").toLowerCase();
        const email = (x.email || "").toLowerCase();
        const phone = (x.phone_number || "").toLowerCase();
        return name.includes(q) || email.includes(q) || phone.includes(q);
      });
    }
    list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return list;
  }, [rawData, roleFilter, statusFilter, verifiedFilter, membershipFilter, debouncedSearch]);

  const pageData = useMemo(() => {
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    return filteredSortedData.slice(start, end);
  }, [filteredSortedData, pageIndex, pageSize]);

  const handleUpgrade = async (id) => {
    try {
      await upRoleCameraman(id);
      toast.success("Đã nâng cấp tài khoản lên thợ quay phim");
      loadData();
    } catch (e) {
      toast.error(e?.data?.response?.message || e?.message || "Nâng cấp thất bại");
    }
  };

  const handleManualVerify = async (id) => {
    try {
      setLoading(true);
      await updateUserProfileByAdmin(id, { is_verified: true });
      toast.success("Đã xác thực thủ công tài khoản");
      await loadData();
    } catch (e) {
      toast.error(e?.data?.response?.message || e?.message || "Xác thực thủ công thất bại");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Người dùng",
        dataIndex: "full_name",
        key: "full_name",
        width: 320,
        render: (_, record) => (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              size={48}
              src={record?.avatar_url}
              className="bg-gray-700 flex-shrink-0"
              icon={!record?.avatar_url && <UserIcon className="w-5 h-5" />}
            />
            <div className="min-w-0">
              <div className="font-semibold text-black truncate">
                {record?.full_name || "—"}
              </div>
              <div className="text-xs text-gray-500 truncate">{record?.email}</div>
              {record?.phone_number && (
                <div className="text-xs text-gray-500 truncate">
                  {record.phone_number}
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        title: "Vai trò",
        dataIndex: "role_name",
        key: "role_name",
        width: 140,
        render: (role) => (
          <Tag color={roleColorMap[role] || "blue"} className="m-0">
            {getRoleLabel(role)}
          </Tag>
        ),
      },
      {
        title: "Thành viên",
        dataIndex: "membership_subscription",
        key: "membership_subscription",
        width: 160,
        render: (v) => (
          <Tag color={membershipColorMap[v] || "default"} className="m-0">
            {getMembershipLabel(v)}
          </Tag>
        ),
      },
      {
        title: "Xác thực",
        dataIndex: "is_verified",
        key: "is_verified",
        width: 120,
        render: (isv) =>
          isv ? (
            <span className="inline-flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              Đã xác thực
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-gray-500">
              <XCircle className="w-4 h-4" />
              Chưa xác thực
            </span>
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
        title: "Ngày tạo",
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

  const getActionMenuItems = (record) => {
    const items = [
      {
        key: "detail",
        label: (
          <div
            className="flex items-center gap-2"
            onClick={() => {
              setDetailRecord(record);
              setDetailOpen(true);
            }}
          >
            <Eye className="w-4 h-4" />
            <span>Xem chi tiết</span>
          </div>
        ),
      },
    ];

    if (!record?.is_verified) {
      items.push({
        key: "manual-verify",
        label: (
          <Popconfirm
            title="Xác thực thủ công tài khoản này?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleManualVerify(record._id)}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Xác thực thủ công</span>
            </div>
          </Popconfirm>
        ),
      });
    }

    if (record.role_name === "customer") {
      items.push({
        key: "upgrade",
        label: (
          <Popconfirm
            title="Nâng cấp tài khoản này thành thợ quay phim?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleUpgrade(record._id)}
          >
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-amber-600" />
              <span>Nâng cấp thành Thợ quay phim</span>
            </div>
          </Popconfirm>
        ),
      });
    }

    return items;
  };


  return (
    <div className="p-6 bg-white min-h-screen">


      <div className="mb-4">
        <Space wrap>
          <Search
            allowClear
            placeholder="Tìm theo tên, email, số điện thoại…"
            enterButton={<SearchIcon className="w-4 h-4" />}
            style={{ width: 320 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            value={roleFilter}
            style={{ width: 180 }}
            onChange={setRoleFilter}
            options={[
              { value: "all", label: "Tất cả vai trò" },
              ...ROLE_OPTIONS_LABEL,
            ]}
          />
          <Select
            value={statusFilter}
            style={{ width: 170 }}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Tất cả trạng thái" },
              { value: "active", label: "Đang hoạt động" },
              { value: "disabled", label: "Đã khóa" },
            ]}
          />
          <Select
            value={verifiedFilter}
            style={{ width: 170 }}
            onChange={setVerifiedFilter}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "true", label: "Đã xác thực" },
              { value: "false", label: "Chưa xác thực" },
            ]}
          />
          <Select
            value={membershipFilter}
            style={{ width: 200 }}
            onChange={setMembershipFilter}
            options={[
              { value: "all", label: "Tất cả hạng thành viên" },
              { value: "normal", label: getMembershipLabel("normal") },
              { value: "1month", label: getMembershipLabel("1month") },
              { value: "6month", label: getMembershipLabel("6month") },
            ]}
          />
        </Space>
      </div>

      <div className="rounded-xl overflow-hidden">
        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={pageData}
          scroll={{ x: 1200 }}
          pagination={{
            current: pageIndex,
            pageSize,
            total: filteredSortedData.length,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPageIndex(p);
              setPageSize(s);
            },
            showTotal: (total, range) => (
              <span className="text-black">
                {range[0]}-{range[1]} / {total}
              </span>
            ),
          }}
        />
      </div>

      <Modal
        title={<span className="text-lg font-bold">Chi tiết người dùng</span>}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={720}
        style={{ top: 20 }}
      >
        {detailRecord && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b">
              <Avatar
                size={64}
                src={detailRecord?.avatar_url}
                className="bg-gray-700"
                icon={!detailRecord?.avatar_url && <UserIcon className="w-7 h-7" />}
              />
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {detailRecord?.full_name || "—"}
                </div>
                <div className="text-sm text-gray-500">
                  {detailRecord?.email || "—"}
                  {detailRecord?.phone_number ? ` • ${detailRecord.phone_number}` : ""}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Vai trò</div>
                  <Tag color={roleColorMap[detailRecord?.role_name] || "blue"}>
                    {getRoleLabel(detailRecord?.role_name)}
                  </Tag>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Trạng thái</div>
                  <Badge
                    color={statusMap[detailRecord?.status]?.color || "default"}
                    text={statusMap[detailRecord?.status]?.text || detailRecord?.status || "—"}
                  />
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Xác thực</div>
                  {detailRecord?.is_verified ? (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Đã xác thực
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <XCircle className="w-4 h-4" />
                      Chưa xác thực
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Đánh giá trung bình</div>
                  <div className="text-gray-900">{detailRecord?.avg_rating ?? 0}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Hạng thành viên</div>
                  <Tag color={membershipColorMap[detailRecord?.membership_subscription] || "default"}>
                    {getMembershipLabel(detailRecord?.membership_subscription)}
                  </Tag>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Ngày sinh</div>
                  <div className="text-gray-900">
                    {detailRecord?.dob
                      ? new Date(detailRecord.dob).toLocaleDateString("vi-VN")
                      : "—"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Tạo lúc</div>
                  <div className="text-gray-900">{formatDateVN(detailRecord?.createdAt)}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Cập nhật lúc</div>
                  <div className="text-gray-900">{formatDateVN(detailRecord?.updatedAt)}</div>
                </div>
              </div>
            </div>

            {detailRecord?.description && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Mô tả</div>
                <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {detailRecord.description}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
