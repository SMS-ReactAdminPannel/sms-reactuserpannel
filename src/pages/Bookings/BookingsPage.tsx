import React from 'react';

import AlternatingProductCardList from '../../components/bookings/BookingCard/BookingCard';
import ScrollableNavbar from '../../components/bookings/BookingScroll/BookingScroll';

const services = [
  "Oil Change", "Tire Rotation", "Brake Inspection", "Battery Check",
  "Engine Diagnostics", "AC Service", "Wheel Alignment", "Car Wash",
  "Headlight Check", "Transmission Flush"
];

const BookingsPage: React.FC = () => {
  return (
    <div className="p-4 ">
      
      <div className='mb-2'>
        <ScrollableNavbar items={services} />
      </div>

      {/* <div className='grid grid-cols-'>
        <AlternatingProductCardList/>
      </div> */}
    </div>
  );
};

export default BookingsPage;
