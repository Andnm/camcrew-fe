import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  Dropdown,
  Popconfirm,
  Avatar,
  message,
} from "antd";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
  UploadCloud,
} from "lucide-react";
import BlogEditor from "../../components/blog/BlogEditor";
import {
  listBlogs,
  createNewBlog,
  updateBlogById,
  deleteBlogById,
} from "../../api/blogs";
import { formatDate } from "../../utils/helper";

const statusTag = (val) => (
  <Tag color={val ? "green" : "orange"}>{val ? "Đã xuất bản" : "Nháp"}</Tag>
);

export default function AdminBlogsPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalResults: 0,
  });
  const [loading, setLoading] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);

  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchData = async (
    page = pagination.pageIndex,
    pageSize = pagination.pageSize
  ) => {
    setLoading(true);
    try {
      const res = await listBlogs({ page, limit: pageSize });
      setData(res?.data || []);
      setPagination({
        pageIndex: res?.pagination?.pageIndex || page,
        pageSize: res?.pagination?.pageSize || pageSize,
        totalResults: res?.pagination?.totalResults || 0,
      });
    } catch (e) {
      console.error(e);
      message.error("Không thể tải danh sách blog");
      setData([]);
      setPagination((p) => ({ ...p, totalResults: 0 }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePage = (page, pageSize) => {
    fetchData(page, pageSize);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogById(id);
      message.success("Xóa bài viết thành công!");
      fetchData();
    } catch (e) {
      console.error(e);
      message.error("Không thể xóa bài viết");
    }
  };

  const handlePublish = async (record) => {
    try {
      await updateBlogById(record._id, {
        title: record.title,
        content: record.content,
        cover_url: record.cover_url,
        is_published: true,
      });
      message.success("Bài viết đã được xuất bản");
      fetchData();
    } catch (e) {
      console.error(e);
      message.error("Không thể xuất bản");
    }
  };

  const handleSave = async (payload) => {
    try {
      if (editingBlog) {
        await updateBlogById(editingBlog._id, payload);
        message.success("Cập nhật bài viết thành công");
      } else {
        await createNewBlog(payload);
        message.success("Tạo bài viết thành công");
      }
      setShowEditor(false);
      setEditingBlog(null);
      fetchData(pagination.pageIndex, pagination.pageSize);
    } catch (e) {
      console.error(e);
      message.error("Không thể lưu bài viết");
    }
  };

  const getActionMenuItems = (record) => {
    return [
      {
        key: "detail",
        label: (
          <span
            onClick={() => {
              setDetailRecord(record);
              setDetailOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-2 inline-block" /> Chi tiết
          </span>
        ),
      },
      {
        key: "edit",
        label: (
          <span
            onClick={() => {
              setEditingBlog(record);
              setShowEditor(true);
            }}
          >
            <Edit className="w-4 h-4 mr-2 inline-block" /> Chỉnh sửa
          </span>
        ),
      },
      {
        key: "publish",
        disabled: !!record.is_published,
        label: (
          <span
            onClick={() => !record.is_published && handlePublish(record)}
            style={{ color: record.is_published ? "#9ca3af" : "#1677ff" }}
          >
            <UploadCloud className="w-4 h-4 mr-2 inline-block" /> Xuất bản
          </span>
        ),
      },
      {
        key: "delete",
        label: (
          <Popconfirm
            title="Xóa bài viết này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <span className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2 inline-block" /> Xóa
            </span>
          </Popconfirm>
        ),
      },
    ];
  };

  const columns = useMemo(
    () => [
      {
        title: "Bìa",
        dataIndex: "cover_url",
        key: "cover_url",
        width: 120,
        render: (url, record) => (
          <div className="flex items-center gap-3">
            <Avatar
              shape="square"
              size={64}
              src={url}
              className="bg-gray-200"
            />
            <div className="min-w-0">
              <div
                className="font-semibold text-black truncate"
                title={record?.title}
              >
                {record?.title}
              </div>
              <div
                className="text-xs text-gray-500 truncate"
                title={record?._id}
              >
                ID: {record?._id}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "is_published",
        key: "is_published",
        width: 140,
        render: (val) => statusTag(val),
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 160,
        render: (date) => (
          <span className="text-gray-400 text-sm">{formatDate(date)}</span>
        ),
      },
      {
        title: "Cập nhật",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 160,
        render: (date) => (
          <span className="text-gray-400 text-sm">{formatDate(date)}</span>
        ),
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
              icon={<MoreHorizontal className="w-5 h-5 text-black" />}
            />
          </Dropdown>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (showEditor) {
    return (
      <BlogEditor
        blog={editingBlog}
        onBack={() => {
          setShowEditor(false);
          setEditingBlog(null);
        }}
        onSubmit={handleSave}
      />
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <Button
          type="primary"
          icon={<Plus />}
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingBlog(null);
            setShowEditor(true);
          }}
        >
          Thêm bài viết
        </Button>
      </div>

      <div className="rounded-xl overflow-hidden">
        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
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
        title={
          <span className="text-lg font-bold">
            {detailRecord?.title || "Chi tiết bài viết"}
          </span>
        }
        open={detailOpen}
        onCancel={() => {
          setDetailOpen(false);
          setDetailRecord(null);
        }}
        footer={null}
        width={1000}
        style={{ top: 10 }}
      >
        {detailRecord && (
          <div className="space-y-4">
            {detailRecord.cover_url && (
              <img
                src={detailRecord.cover_url}
                alt={detailRecord.title}
                className="w-full h-60 object-cover rounded-lg"
              />
            )}

            <div className="flex items-center gap-3">
              {statusTag(detailRecord.is_published)}
              <span className="text-gray-500 text-sm">
                Tạo: {formatDate(detailRecord.createdAt)}
              </span>
              <span className="text-gray-500 text-sm">
                Cập nhật: {formatDate(detailRecord.updatedAt)}
              </span>
            </div>

            <div
              className="
    prose prose-invert max-w-none
    prose-headings:text-white
    prose-p:text-gray-200
    prose-strong:text-white
    prose-a:text-[#FF9500] hover:prose-a:text-orange-400
    prose-li:marker:text-gray-400
    prose-ul:my-4 prose-ol:my-4
    prose-img:rounded-lg
  "
              dangerouslySetInnerHTML={{ __html: detailRecord.content }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
