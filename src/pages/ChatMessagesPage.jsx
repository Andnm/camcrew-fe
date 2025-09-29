import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, Phone, Video, MoreHorizontal, Search, MessageCircle } from 'lucide-react';

const ChatMessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const conversations = [
    {
      id: 1,
      name: 'Nguyễn Văn B',
      avatar: null,
      role: 'Khách hàng',
      lastMessage: 'Anh có thể gửi thêm mẫu video không?',
      lastTime: '10:30 AM',
      unread: 2,
      online: true,
      type: 'customer'
    },
    {
      id: 2,
      name: 'Trần Thị C',
      avatar: null,
      role: 'Khách hàng',
      lastMessage: 'Em cảm ơn anh, video rất đẹp!',
      lastTime: 'Yesterday',
      unread: 0,
      online: false,
      type: 'customer'
    },
    {
      id: 3,
      name: 'Admin CamCrew',
      avatar: null,
      role: 'Admin',
      lastMessage: 'Dịch vụ của bạn đã được duyệt',
      lastTime: '2 days ago',
      unread: 1,
      online: true,
      type: 'admin'
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 2,
      senderName: 'Nguyễn Văn B',
      message: 'Chào anh, em muốn hỏi về gói quay cưới ạ',
      timestamp: '2025-09-24T09:00:00Z',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'Tôi',
      message: 'Chào em! Em có thể cho anh biết ngày cưới dự kiến và địa điểm không?',
      timestamp: '2025-09-24T09:05:00Z',
      type: 'text'
    },
    {
      id: 3,
      senderId: 2,
      senderName: 'Nguyễn Văn B',
      message: 'Ngày 15/11 ạ, tại nhà hàng Riverside, quận 7',
      timestamp: '2025-09-24T09:10:00Z',
      type: 'text'
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'Tôi',
      message: 'Ok em, ngày đó anh có lịch rảnh. Gói Cinematic của anh bao gồm:\n- Quay trọn buổi (8 tiếng)\n- Highlight 3-5 phút + Full lễ\n- Giao trong 7-10 ngày\nGiá: 12.000.000 VNĐ',
      timestamp: '2025-09-24T09:15:00Z',
      type: 'text'
    },
    {
      id: 5,
      senderId: 2,
      senderName: 'Nguyễn Văn B',
      message: 'Anh có thể gửi thêm mẫu video không?',
      timestamp: '2025-09-24T10:30:00Z',
      type: 'text'
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedChat);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle send message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      
      <div className="flex h-screen pt-16">
        {/* Conversations List */}
        <div className="w-1/3 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white text-xl font-bold mb-4">Tin nhắn</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors ${
                  selectedChat === conversation.id ? 'bg-gray-750 border-l-4 border-orange-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {conversation.name.charAt(0)}
                      </span>
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-medium truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-gray-400 text-xs">
                        {conversation.lastTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        conversation.type === 'admin' 
                          ? 'bg-blue-600 text-blue-100'
                          : 'bg-green-600 text-green-100'
                      }`}>
                        {conversation.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {currentConversation.name.charAt(0)}
                      </span>
                    </div>
                    {currentConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {currentConversation.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {currentConversation.online ? 'Đang hoạt động' : 'Không hoạt động'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.senderId === 'me'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderId === 'me' ? 'text-orange-100' : 'text-gray-400'
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-gray-800 p-4 border-t border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Nhập tin nhắn..."
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 pr-12 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-[#FF9500] hover:text-orange-400 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
                
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>Nhấn Enter để gửi</span>
                  <span>{currentConversation.name} đang nhập...</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Chọn cuộc trò chuyện</h3>
                <p className="text-gray-400">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesPage;