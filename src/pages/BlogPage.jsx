import React, { useEffect, useState, useMemo } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listBlogs } from "../api/blogs";
import { formatDate } from "../utils/helper"; 

const stripHtml = (html = "") => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const truncate = (text = "", maxLen = 140) => {
  if (!text) return "";
  const clean = stripHtml(text).trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + "…";
};

const getId = (b) => b?._id || b?.id;
const getTitle = (b) => b?.title || "";
const getContentPreview = (b) => truncate(b?.content || "", 160);
const getCover = (b) => b?.cover_url || "";
const getCreated = (b) => b?.createdAt || b?.created_at;

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await listBlogs({ page: 1, limit: 12 });
        setBlogs(res?.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const featured = useMemo(() => (blogs && blogs.length ? blogs[0] : null), [blogs]);
  const sideList = useMemo(() => (blogs && blogs.length > 1 ? blogs.slice(1, 3) : []), [blogs]);
  const allList = useMemo(() => blogs || [], [blogs]);

  const goDetail = (blog) => navigate(`/blog/${getId(blog)}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-56 bg-gray-800 rounded mb-6" />
            <div className="grid lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-8">
                <div className="bg-gray-800 rounded-lg h-96" />
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-40 bg-gray-800 rounded" />
                  <div className="h-7 w-3/4 bg-gray-800 rounded" />
                  <div className="h-4 w-full bg-gray-800 rounded" />
                </div>
              </div>
              <div className="lg:col-span-4 space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="bg-gray-800 rounded-lg h-32" />
                    <div className="h-3 w-32 bg-gray-800 rounded" />
                    <div className="h-4 w-3/4 bg-gray-800 rounded" />
                    <div className="h-3 w-2/3 bg-gray-800 rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-7 w-56 bg-gray-800 rounded mb-6" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-700" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-40 bg-gray-700 rounded" />
                    <div className="h-5 w-3/4 bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-white text-3xl font-bold text-center mb-6">Bài viết nổi bật</h1>
          <div className="text-gray-400 text-center py-24 bg-gray-900 rounded-lg">
            Chưa có bài viết nào để hiển thị.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-white text-3xl font-bold text-center mb-12">Bài viết nổi bật</h1>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Featured */}
          <div className="lg:col-span-8">
            <div
              className="bg-gray-800 rounded-lg overflow-hidden h-96 cursor-pointer"
              onClick={() => goDetail(featured)}
              role="button"
            >
              <img
                src={getCover(featured)}
                alt={getTitle(featured)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6">
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(getCreated(featured))}</span>
              </div>
              <h2
                className="text-white text-2xl font-bold mb-3 hover:text-orange-400 cursor-pointer"
                onClick={() => goDetail(featured)}
              >
                {getTitle(featured)}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {getContentPreview(featured)}
              </p>
              <button
                className="flex items-center text-[#FF9500] hover:text-orange-400 mt-4 font-medium"
                onClick={() => goDetail(featured)}
              >
                Đọc thêm <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Side list */}
          <div className="lg:col-span-4 space-y-6">
            {sideList.map((blog) => (
              <div
                key={getId(blog)}
                className="group cursor-pointer"
                onClick={() => goDetail(blog)}
                role="button"
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden h-32 mb-3">
                  <img
                    src={getCover(blog)}
                    alt={getTitle(blog)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center text-gray-400 text-xs mb-2">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>{formatDate(getCreated(blog))}</span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-orange-400 transition-colors">
                  {getTitle(blog)}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {getContentPreview(blog)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Tất cả bài viết</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allList.map((blog) => (
              <article
                key={getId(blog)}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group cursor-pointer"
                onClick={() => goDetail(blog)}
                role="button"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={getCover(blog)}
                    alt={getTitle(blog)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(getCreated(blog))}</span>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-3 group-hover:text-orange-400 transition-colors">
                    {getTitle(blog)}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {getContentPreview(blog)}
                  </p>
                  <span className="flex items-center text-[#FF9500] group-hover:text-orange-400 mt-4 text-sm font-medium">
                    Đọc thêm <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
