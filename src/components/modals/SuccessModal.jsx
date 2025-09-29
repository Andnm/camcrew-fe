import React from 'react';
import { X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title = "Báo cáo thành công", message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#FF9500] text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-white leading-relaxed">
            {message || "Cảm ơn bạn đã báo cáo. Chúng tôi đã ghi nhận phản hồi và sẽ kiểm tra thông tin trong thời gian sớm nhất để đảm bảo trải nghiệm an toàn cho bạn."}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Hoàn thành
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;