import React, { useState, useEffect } from 'react';

const BookingsPage: React.FC = () => {
  const [serviceName, setServiceName] = useState('');
  const [userName, setUserName] = useState('');
  const [sparePart, setSparePart] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowModal(true), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header with Background Image */}
      <div
        className="h-64 bg-cover bg-center flex items-center justify-center text-white text-3xl font-bold"
        style={{ backgroundImage: `url('https://example.com/your-background.jpg')` }}
      >
        Book Your Service
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto p-4">
        {/* Service Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Online Service Booking</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Service Required"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Book Service
          </button>
        </div>

        {/* Spare Parts Booking */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Spare Parts Booking</h2>
          <input
            type="text"
            placeholder="Spare Part Needed"
            value={sparePart}
            onChange={(e) => setSparePart(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
            Book Spare Part
          </button>
        </div>
      </div>

      {/* Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h3 className="text-lg font-bold mb-2">🎉 Today's Offer 🎉</h3>
            <p className="text-gray-700 mb-4">Get 20% off on all service bookings today!</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

