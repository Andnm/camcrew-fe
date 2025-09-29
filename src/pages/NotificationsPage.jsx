import React from 'react';
import { CheckCircle, Clock, Bell, X, User, Calendar, FileText, CreditCard } from 'lucide-react';
import { mockData } from '../data/mockData';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'Bạn đã thanh toán thành công',
      message: 'Bạn đã thanh toán thành công Gói Quay Cưới Điện Ảnh - Full lễ cưới + Highlight cảm xúc',
      time: '19/06 | 08:30 PM',
      isRead: false,
      type: 'payment'
    },
    {
      id: 2,
      title: 'Booking được xác nhận',
      message: 'Cameraman đã xác nhận lịch quay cho booking của bạn',
      time: '18/06 | 10:15 AM',
      isRead: true,
      type: 'booking'
    },
    {
      id: 3,
      title: 'Dịch vụ mới phù hợp',
      message: 'Có 3 dịch vụ mới phù hợp với yêu cầu của bạn',
      time: '17/06 | 02:20 PM',
      isRead: true,
      type: 'service'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'booking':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'service':
        return <Bell className="w-5 h-5 text-[#FF9500]" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-white text-lg font-bold">Nguyễn Văn B</h2>
                <p className="text-gray-400 text-sm">Khách</p>
                <div className="mt-2">
                  <span className="bg-[#FF9500] text-white px-3 py-1 rounded-full text-xs">
                    Đã xác minh
                  </span>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <Calendar className="w-5 h-5" />
                  <span>Lịch sử hoạt động</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <FileText className="w-5 h-5" />
                  <span>Tin nhắn</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-[#FF9500] text-white">
                  <Bell className="w-5 h-5" />
                  <span>Thông báo</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Lịch thuê của tôi</span>
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-gray-800 rounded-lg">
              <div className="p-6 border-b border-gray-700">
                <h1 className="text-white text-xl font-bold">Thông báo</h1>
              </div>
              
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-6 hover:bg-gray-750 transition-colors ${!notification.isRead ? 'bg-gray-750' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-400 text-sm flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {notification.time}
                            </span>
                            {!notification.isRead && (
                              <span className="text-[#FF9500] text-sm font-medium flex items-center">
                                ✓ Đã đọc
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button className="text-gray-400 hover:text-gray-300 transition-colors ml-4">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;