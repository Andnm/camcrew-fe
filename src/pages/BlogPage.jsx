import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import { mockData } from '../data/mockData';

const BlogPage = () => {
  const blogs = [
    ...mockData.blogs,
    {
      id: 702,
      title: "5 điều bạn cần biết trước khi bắt đầu",
      content: "Tránh rủi ro, tối ưu chi phí và tìm được người cho dự án đầu tiên của bạn.",
      cover_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
      created_at: "2025-07-04T07:00:00Z",
      updated_at: "2025-07-04T07:00:00Z"
    },
    {
      id: 703,
      title: "5 điều bạn cần biết trước khi bắt đầu", 
      content: "Tránh rủi ro, tối ưu chi phí và tìm được người cho dự án đầu tiên của bạn.",
      cover_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
      created_at: "2025-07-04T07:00:00Z",
      updated_at: "2025-07-04T07:00:00Z"
    },
    {
      id: 704,
      title: "5 điều bạn cần biết trước khi bắt đầu",
      content: "Tránh rủi ro, tối ưu chi phí và tìm được người cho dự án đầu tiên của bạn.", 
      cover_url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
      created_at: "2025-07-04T07:00:00Z",
      updated_at: "2025-07-04T07:00:00Z"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-white text-3xl font-bold text-center mb-12">Bài viết nổi bật</h1>
        
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden h-96">
              <img 
                src={blogs[0].cover_url}
                alt={blogs[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6">
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Thứ 6, 04/07/2025</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-3 hover:text-orange-400 cursor-pointer">
                {blogs[0].title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {blogs[0].content}
              </p>
              <button className="flex items-center text-orange-500 hover:text-orange-400 mt-4 font-medium">
                Đọc thêm <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {blogs.slice(1, 3).map((blog) => (
              <div key={blog.id} className="group cursor-pointer">
                <div className="bg-gray-800 rounded-lg overflow-hidden h-32 mb-3">
                  <img 
                    src={blog.cover_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center text-gray-400 text-xs mb-2">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>Thứ 6, 04/07/2025</span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-orange-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {blog.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Tất cả bài viết</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.concat([
              {
                id: 705,
                title: "5 điều bạn cần biết trước khi bắt đầu",
                content: "Tránh rủi ro, tối ưu chi phí và tìm được người cho dự án đầu tiên của bạn.",
                cover_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
                created_at: "2025-07-04T07:00:00Z"
              },
              {
                id: 706,
                title: "5 điều bạn cần biết trước khi bắt đầu",
                content: "Tránh rủi ro, tối ưu chi phí và tìm được người cho dự án đầu tiên của bạn.",
                cover_url: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&h=400&fit=crop",
                created_at: "2025-07-04T07:00:00Z"
              },
              {
                id: 707,
                title: "5 điều bạn cần biết trước khi bắt đầu",
                content: "Tránh rủi ro, tối ưu chi phí và tìm được người cho dự án đầu tiên của bạn.",
                cover_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
                created_at: "2025-07-04T07:00:00Z"
              }
            ]).map((blog) => (
              <article key={blog.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.cover_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Thứ 6, 04/07/2025</span>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-3 group-hover:text-orange-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {blog.content}
                  </p>
                  <button className="flex items-center text-orange-500 hover:text-orange-400 mt-4 text-sm font-medium">
                    Đọc thêm <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;