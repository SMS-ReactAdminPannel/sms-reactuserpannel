import React from 'react';
import { motion } from 'framer-motion';

type ServiceOffer = {
  title: string;
  discount: number;
  originalPrice: number;
  offerPrice: number;
  image: string;
  badge: string;
};

const serviceOffers: ServiceOffer[] = [
  {
    title: 'Engine Oil Change',
    discount: 25,
    originalPrice: 1200,
    offerPrice: 900,
    image: 'https://th.bing.com/th/id/OIP.jGn3Tijjvy_OiyA_TulUyQHaEK?cb=iwp2&rs=1&pid=ImgDetMain',
    badge: '🔥 Limited Time',
  },
  {
    title: 'Full Car Service',
    discount: 15,
    originalPrice: 4000,
    offerPrice: 3400,
    image: 'https://th.bing.com/th/id/OIP.Ykxq8rO6lvEpnJjav7gd7QHaEK?cb=iwp2&rs=1&pid=ImgDetMain',
    badge: '🚗 Best Seller',
  },
  {
    title: 'AC Repair & Service',
    discount: 20,
    originalPrice: 2500,
    offerPrice: 2000,
    image: 'https://i2.wp.com/carworks-longmont-auto-repair.com/wp-content/uploads/2018/03/car-air-conditioning-maintenance-Longmont.jpg?ssl=1',
    badge: '❄️ Summer Deal',
  },
];

const Offer: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        🔧 Yes Mechanic Special Offers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serviceOffers.map((offer, index) => (
          <motion.div
  key={index}
  whileHover={{ scale: 1.05 }}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.15 }}
  className="bg-white rounded-xl shadow-md p-5 relative w-3/4 mx-auto"
>

            <span className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded">
              {offer.badge}
            </span>
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{offer.title}</h2>
            <p className="text-gray-500 line-through">₹{offer.originalPrice}</p>
            <p className="text-green-600 text-lg font-bold">
              ₹{offer.offerPrice} ({offer.discount}% OFF)
            </p>

            <button
              className="mt-4 w-full text-white py-2 rounded-lg"
              style={{ backgroundColor: '#9b111e' }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#7f0e18')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#9b111e')
              }
            >
              Book Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offer;

