import SparePartCard from "../../components/booking-cart/service";

import React, { useState } from 'react';
import { COLORS, FONTS } from "../../constants/constant";

interface SparePart {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
  price: number;
  discount: number;
  originalPrice: number;
  compatibility: string;
}

const initialParts: SparePart[] = [
  {
    id: '1',
    name: 'Brake Pad Set',
    description: 'High-quality ceramic brake pads for safe and smooth braking.',
    imageUrl: 'https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp',
    inStock: true,
    price: 1899,
    discount: 20,
    originalPrice: 2399,
    compatibility: 'Maruti Swift, Baleno',
  },
  {
    id: '2',
    name: 'Air Filter Element',
    description: 'Durable air filter ensuring clean air intake and better mileage.',
    imageUrl: 'https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp',
    inStock: true,
    price: 499,
    discount: 10,
    originalPrice: 549,
    compatibility: 'Hyundai i20, Creta',
  },
  {
    id: '3',
    name: 'Engine Oil 5W-30 (3L)',
    description: 'Premium synthetic oil for high-performance engines.',
    imageUrl: 'https://boodmo.com/media/cache/catalog_part/images/parts/9fd50e122693b3b0e4ae4ee3724ca1b2.webp',
    inStock: false,
    price: 1299,
    discount: 15,
    originalPrice: 1529,
    compatibility: 'Honda City, Amaze',
  },
  
  {
    id: '4',
    name: 'Headlight Assembly',
    description: 'Complete headlamp assembly with long-lasting brightness.',
    imageUrl: 'https://boodmo.com/media/cache/catalog_part/images/parts/a808aff9788f47721e361dbf0d10bba8.webp',
    inStock: true,
    price: 3499,
    discount: 25,
    originalPrice: 4699,
    compatibility: 'Tata Nexon, Harrier',
  },
  {
    id: '5',
    name: 'Wiper Blade Set',
    description: 'All-weather wiper blades with streak-free performance.',
    imageUrl: 'https://boodmo.com/media/cache/catalog_part/images/parts/7371bac93f3021909d987178c1b3ffdc.webp',
    inStock: true,
    price: 799,
    discount: 12,
    originalPrice: 899,
    compatibility: 'Toyota Innova, Fortuner',
  },
];

const SparePartsList = () => {
  const [parts, setParts] = useState<SparePart[]>(initialParts);

  const handleDelete = (id: string) => {
    setParts(prevParts => prevParts.filter(part => part.id !== id));
  };

  return (
    <div className="p-4">
		<div className="font-semibold">
			<h1 style={{...FONTS.header,color:COLORS.primary}}>
				My Cart
			</h1>
		</div>
		<div className="">
			{/* bg-white shadow-lg rounded-xl */}
			<div className="p-4">
      {parts.map(part => (
        <SparePartCard key={part.id} part={part} onDelete={handleDelete} />
      ))}
    </div>
		</div>
	</div>
  );
};

export default SparePartsList;