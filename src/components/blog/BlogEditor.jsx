import React, { useState, useRef } from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../api/upload';

export default function BlogEditor({ blog, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    cover_url: blog?.cover_url || ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const editorRef = useRef(null);

  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Lỗi đọc file');
      reader.readAsDataURL(blobInfo.blob());
    });
  };

  const editorConfig = {
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
    ],
    toolbar:
      'undo redo | blocks | bold italic forecolor backcolor | ' +
      'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | link image media | table | emoticons | fullscreen | help',
    content_style: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
        font-size: 14px;
        line-height: 1.6;
        margin: 1rem;
      }
      img { max-width: 100%; height: auto; }
    `,
    images_upload_handler: handleImageUpload,
    paste_data_images: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    branding: false,
    promotion: false,
    placeholder: 'Nhập nội dung bài viết của bạn...',
    setup: (editor) => {
      editor.on('init', () => {
        if (formData.content) editor.setContent(formData.content);
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Tiêu đề không được để trống';
    const textContent = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!textContent) errors.content = 'Nội dung không được để trống';
    if (!formData.cover_url && !coverFile) errors.cover_url = 'Vui lòng chọn ảnh bìa';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let coverUrl = formData.cover_url;

      if (coverFile) {
        const uploadRes = await uploadImageToCloudinary(coverFile, 'sonice');
        coverUrl = uploadRes.url;
      }

      await onSubmit({
        title: formData.title,
        content: formData.content,
        cover_url: coverUrl
      });

      toast.success(blog ? 'Cập nhật thành công!' : 'Tạo bài viết thành công!');
    } catch (err) {
      console.error(err);
      toast.error('Đã xảy ra lỗi khi lưu bài viết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {blog ? 'Đang cập nhật...' : 'Đang lưu...'}
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {blog ? 'Cập nhật' : 'Lưu bài viết'}
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              formErrors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Nhập tiêu đề bài viết..."
          />
          {formErrors.title && (
            <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh bìa <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border">
              <Upload className="w-4 h-4" />
              <span>Chọn ảnh</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setCoverFile(file);
                }}
              />
            </label>
            {coverFile && <span className="text-sm text-gray-700">{coverFile.name}</span>}
          </div>
          {formErrors.cover_url && (
            <p className="mt-1 text-sm text-red-600">{formErrors.cover_url}</p>
          )}
          {formData.cover_url && !coverFile && (
            <img
              src={formData.cover_url}
              alt="Cover Preview"
              className="mt-3 w-64 h-40 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <div
            className={`border rounded-lg overflow-hidden ${
              formErrors.content ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <Editor
              ref={editorRef}
              apiKey="i8zqhfo0wac5ciza3yrj1k205j6u4f808qveeoudv63gra41"
              value={formData.content}
              onEditorChange={(content) =>
                setFormData({ ...formData, content })
              }
              init={editorConfig}
            />
          </div>
          {formErrors.content && (
            <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
