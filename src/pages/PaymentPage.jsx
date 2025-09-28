import React, { useState } from 'react';
import { CreditCard, Shield, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentStep, setPaymentStep] = useState('method'); // method, processing, success
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const booking = {
    id: 200,
    service: 'Gói Cưới Cinematic 1 Ngày',
    cameraman: 'Minh Film',
    date: '2025-10-05',
    time: 'Sáng',
    amount: 12000000,
    deposit: 3000000, // 25% deposit
    remaining: 9000000
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Thẻ tín dụng/ghi nợ',
      icon: CreditCard,
      description: 'Visa, Mastercard, JCB',
      fee: 0
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      icon: () => <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>,
      description: 'Thanh toán qua ví MoMo',
      fee: 0
    },
    {
      id: 'banking',
      name: 'Chuyển khoản ngân hàng',
      icon: () => <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">$</div>,
      description: 'Chuyển khoản trực tiếp',
      fee: 0
    },
    {
      id: 'vnpay',
      name: 'VNPay QR',
      icon: () => <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">V</div>,
      description: 'Quét mã QR VNPay',
      fee: 0
    }
  ];

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 3000);
  };

  if (paymentStep === 'processing') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-white text-xl font-semibold mb-2">Đang xử lý thanh toán</h2>
          <p className="text-gray-400">Vui lòng không tắt trình duyệt...</p>
        </div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-2xl mx-auto p-6 pt-24">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-4">Thanh toán thành công!</h1>
            <p className="text-gray-300 mb-6">
              Bạn đã thanh toán thành công booking #{booking.id}
            </p>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Dịch vụ:</span>
                  <span className="text-white">{booking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cameraman:</span>
                  <span className="text-white">{booking.cameraman}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngày quay:</span>
                  <span className="text-white">{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Số tiền:</span>
                  <span className="text-orange-500 font-bold">
                    {new Intl.NumberFormat('vi-VN').format(booking.deposit)} VND
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Xem chi tiết booking
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <div className="flex items-center mb-6">
          <button className="text-gray-400 hover:text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Thanh toán</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-white text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-500 bg-opacity-10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className="text-gray-300" />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{method.name}</h3>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                      {method.fee === 0 ? (
                        <span className="text-green-400 text-sm">Miễn phí</span>
                      ) : (
                        <span className="text-gray-400 text-sm">+{method.fee}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedMethod === 'card' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Thông tin thẻ</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Số thẻ</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Ngày hết hạn</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Tên chủ thẻ</label>
                    <input
                      type="text"
                      placeholder="NGUYEN VAN A"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'banking' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Thông tin chuyển khoản</h3>
                
                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ngân hàng:</span>
                    <span className="text-white">Vietcombank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Số tài khoản:</span>
                    <span className="text-white">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tên tài khoản:</span>
                    <span className="text-white">CAMCREW COMPANY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nội dung CK:</span>
                    <span className="text-orange-500">BOOKING{booking.id}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-600 bg-opacity-20 border border-yellow-600 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    Lưu ý: Sau khi chuyển khoản, vui lòng chụp ảnh biên lai và gửi qua chat để xác nhận.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-white text-lg font-semibold mb-4">Thông tin đơn hàng</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Dịch vụ:</span>
                  <span className="text-white text-sm text-right">{booking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cameraman:</span>
                  <span className="text-white">{booking.cameraman}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngày quay:</span>
                  <span className="text-white">{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thời gian:</span>
                  <span className="text-white">{booking.time}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tổng giá trị:</span>
                  <span className="text-white">{new Intl.NumberFormat('vi-VN').format(booking.amount)} VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Đặt cọc (25%):</span>
                  <span className="text-orange-500 font-bold">{new Intl.NumberFormat('vi-VN').format(booking.deposit)} VND</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Còn lại:</span>
                  <span className="text-gray-300">{new Intl.NumberFormat('vi-VN').format(booking.remaining)} VND</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-blue-600 bg-opacity-20 border border-blue-600 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">Thanh toán được bảo mật bởi CamCrew</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Thanh toán {new Intl.NumberFormat('vi-VN').format(booking.deposit)} VND
              </button>

              <div className="mt-4 flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Phiên thanh toán hết hạn sau 14:59</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;