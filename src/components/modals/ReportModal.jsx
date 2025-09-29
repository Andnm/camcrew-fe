import React, { useState } from 'react';
import { X, User } from 'lucide-react';

const ReportModal = ({ isOpen, onClose, cameraman }) => {
  const [reportText, setReportText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle report submission
    console.log('Report submitted:', { cameraman: cameraman?.id, content: reportText });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#FF9500] text-lg font-semibold">Báo cáo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            {cameraman?.avatar_url ? (
              <img 
                src={cameraman.avatar_url} 
                alt={cameraman.full_name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-white font-semibold">{cameraman?.full_name || 'Nguyễn Văn A'}</p>
            <p className="text-gray-400 text-sm">Khách</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              placeholder="Mô tả sự cố chi tiết"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              rows={6}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              required
            />
          </div>

          <div className="text-right text-gray-400 text-sm mb-4">
            0/500
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Gửi báo cáo
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;