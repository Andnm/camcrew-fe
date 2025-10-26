import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Breadcrumb, Button, Skeleton, Empty } from "antd";
import { formatDate, scrollToTop } from "../utils/helper";
import { getBlogById, listBlogs } from "../api/blogs";

const isHtml = (s = "") => /<\/?[a-z][\s\S]*>/i.test(s);

const BlogDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const getId = (b) => b?._id || b?.id;
  const getTitle = (b) => b?.title || "";
  const getCover = (b) => b?.cover_url || "";
  const getCreated = (b) =>
    b?.createdAt || b?.created_at || b?.updatedAt || b?.updated_at;
  const getContent = (b) => b?.content || "";

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await getBlogById(id);
      setBlog(res?.data || res || null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      setRelatedLoading(true);
      const res = await listBlogs({ page: 1, limit: 6 });
      const arr = Array.isArray(res?.data) ? res.data : [];
      const filtered = arr
        .filter((b) => b?.is_published)
        .filter((b) => String(getId(b)) !== String(id))
        .slice(0, 3);
      setRelatedBlogs(filtered);
    } finally {
      setRelatedLoading(false);
    }
  };

  useEffect(() => {
    scrollToTop();
    fetchBlog();
    fetchRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-800 rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              <div className="lg:col-span-3 bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-96 bg-gray-700" />
                <div className="p-8 space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-700 rounded" />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-700 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-gray-800 rounded-lg p-12">
            <Empty
              description={
                <span className="text-gray-300">Không tìm thấy bài viết</span>
              }
            />
            <Link
              to="/blog"
              className="text-[#FF9500] hover:text-orange-400 mt-6 inline-block"
            >
              ← Quay lại danh sách blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = getTitle(blog);
  const cover = getCover(blog);
  const dateStr = formatDate(getCreated(blog));
  const content = getContent(blog);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-400 hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách blog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <article className="bg-gray-800 rounded-lg overflow-hidden">
              {cover && (
                <img
                  src={cover}
                  alt={title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              )}

              <div className="p-8">
                <div className="flex items-center text-sm text-gray-400 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{dateStr}</span>
                  <User className="h-4 w-4 ml-6 mr-2" />
                  <span>Sò Nice Team</span>
                  <div className="ml-6 flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      45
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      12
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {title}
                </h1>

                {isHtml(content) ? (
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
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div className="prose max-w-none prose-invert text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">Chia sẻ:</span>
                      <Button
                        size="small"
                        className="!bg-transparent !text-[#FF9500] hover:!text-orange-400 hover:!border-orange-400 !border-[#FF9500]"
                        icon={<Share2 className="h-4 w-4" />}
                      >
                        Facebook
                      </Button>
                      <Button
                        size="small"
                        className="!bg-transparent !text-[#FF9500] hover:!text-orange-400 hover:!border-orange-400 !border-[#FF9500]"
                        icon={<Share2 className="h-4 w-4" />}
                      >
                        Twitter
                      </Button>
                      <Button
                        size="small"
                        className="!bg-transparent !text-[#FF9500] hover:!text-orange-400 hover:!border-orange-400 !border-[#FF9500]"
                        icon={<Share2 className="h-4 w-4" />}
                      >
                        LinkedIn
                      </Button>
                    </div>
                    <Button
                      type="text"
                      icon={<Heart className="h-4 w-4" />}
                      className="!text-[#FF6B6B] hover:!text-red-400"
                    >
                      Yêu thích (45)
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">
                Bài viết liên quan
              </h3>
              {relatedLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="flex space-x-3">
                      <div className="w-16 h-16 bg-gray-700 rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-3/4" />
                        <div className="h-3 bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : relatedBlogs.length > 0 ? (
                <div className="space-y-4">
                  {relatedBlogs.map((related) => (
                    <Link
                      key={getId(related)}
                      to={`/blog/${getId(related)}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={getCover(related)}
                          alt={getTitle(related)}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white group-hover:text-orange-400 line-clamp-2 text-sm">
                            {getTitle(related)}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(getCreated(related))}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-6">
                  <Empty
                    description={
                      <span className="text-gray-400">
                        Không có bài liên quan
                      </span>
                    }
                  />
                </div>
              )}
            </div>

            <div className="rounded-lg p-6 text-center bg-gradient-to-tr from-gray-900 to-gray-800 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">
                Đăng ký nhận tin
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Nhận thông báo về bài viết mới từ Sò Nice
              </p>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#FF9500]"
              />
              <Button className="w-full mt-3 !bg-[#FF9500] hover:!bg-orange-500 !text-black font-medium">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
