import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react'
import { Search, X } from 'lucide-react';


interface SparePart {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  images: string[];
  type: string;
}
interface CarPart {
  id: number;
  name: string;
image: string;
}

const initialPartsData: SparePart[] = [
  {
    id: 1,
    name: 'AC Vent Grille Clip Slider Set for Maruti Suzuki',
    price: 3500,
    inStock: true,
    images: ['https://m.media-amazon.com/images/I/61qH3XvY-BL.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi67ZT0gklmtrW2cnDI_610wn2Zns2BDH7kw&s',
    ],
    type: 'Slider',
  },
  {
    id: 2,
    name: 'Air Conditioning A/C Pressure Sensor for Honda City',
    price: 1500,
    inStock: false,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi67ZT0gklmtrW2cnDI_610wn2Zns2BDH7kw&s',
      'https://m.media-amazon.com/images/I/61qH3XvY-BL.jpg',
    ],
    type: 'Sensor',
  },
  {
    id: 3,
    name: 'Mercedes Engine Start Stop Button',
    price: 1200,
    inStock: true,
    images: ['https://m.media-amazon.com/images/I/61VgEhafLlL._AC_UF1000,1000_QL80_.jpg',
      'https://www.shutterstock.com/image-illustration/car-brake-disk-red-caliper-600nw-2111526026.jpg',
    ],
    type: 'Switch & Buttons',
  },
  {
    id: 4,
    name: 'Front Grille Body Kit for MG 5/6/ZS',
    price: 2000,
    inStock: true,
    images: ['https://www.shutterstock.com/image-illustration/car-brake-disk-red-caliper-600nw-2111526026.jpg',
      'https://m.media-amazon.com/images/I/61VgEhafLlL._AC_UF1000,1000_QL80_.jpg',
    ],
    type: 'Grille',
  },
  {
    id: 5,
    name: 'Dashboard Switch Button for Toyota Innova',
    price: 1200,
    inStock: true,
    images: ['https://www.shutterstock.com/image-photo/car-headlight-switch-operating-vehicle-600nw-1782048353.jpg',
      'https://image.made-in-china.com/202f0j00BpMoIvJnQHcS/All-Aftermarket-Spare-Auto-Part-Engine-Suspension-Electrical-Body-System-Car-Parts-with-Bom-One-Stop-Service.webp',
    ],
    type: 'Switch & Buttons',
  },
  {
    id: 6,
    name: 'Rearview Mirror for Toyota Corolla',
    price: 2200,
    inStock: false,
    images: ['https://image.made-in-china.com/202f0j00BpMoIvJnQHcS/All-Aftermarket-Spare-Auto-Part-Engine-Suspension-Electrical-Body-System-Car-Parts-with-Bom-One-Stop-Service.webp',
      'https://www.shutterstock.com/image-photo/car-headlight-switch-operating-vehicle-600nw-1782048353.jpg',
    ],
    type: 'Mirror',
  },
  {
    id: 7,
    name: 'Headlight Assembly for BMW X5',
    price: 5500,
    inStock: true,
    images: ['https://image.made-in-china.com/2f0j00FJbVaGrlOtqE/Good-Price-Auto-Components-Car-Engine-Parts-Cooling-Water-Pump-OEM-1300A066-MD979395-for-Mitsubishi-Outlander-Galant-Saloon-Grandis.webp',
      'https://image.made-in-china.com/202f0j00JhgkzEWKbUbB/Engine-Parts-371-Cylinder-Head-for-Chery-371-1003015mA.webp',
    ],
    type: 'Lighting',
  },
  {
    id: 8,
    name: 'Radiator Fan Motor Honda Civic',
    price: 3000,
    inStock: true,
    images: ['https://image.made-in-china.com/202f0j00JhgkzEWKbUbB/Engine-Parts-371-Cylinder-Head-for-Chery-371-1003015mA.webp',
      'https://image.made-in-china.com/2f0j00FJbVaGrlOtqE/Good-Price-Auto-Components-Car-Engine-Parts-Cooling-Water-Pump-OEM-1300A066-MD979395-for-Mitsubishi-Outlander-Galant-Saloon-Grandis.webp',
    ],
    type: 'Cooling',
  },
  {
    id: 9,
    name: 'Brake Pads for Hyundai i20',
    price: 1800,
    inStock: false,
    images: ['https://www.wagnerbrake.com/content/loc-na/loc-us/fmmp-wagner/en_US/technical/parts-matter/driver-education-and-vehicle-safety/how-the-brake-system-works/_jcr_content/article/article-par/image_1776083492.img.jpg/car-brake-pad-rotor-1738009820082.jpg',
      'https://thumbs.dreamstime.com/b/hybrid-electric-car-interior-element-metal-gas-accelerate-brake-pedal-sport-automatic-gearbox-controls-329261803.jpg',
    ],
    type: 'Brakes',
  },
  {
    id: 10,
    name: 'Spark Plug for Maruti Suzuki',
    price: 400,
    inStock: true,
    images: ['https://thumbs.dreamstime.com/b/hybrid-electric-car-interior-element-metal-gas-accelerate-brake-pedal-sport-automatic-gearbox-controls-329261803.jpg',
      'https://www.wagnerbrake.com/content/loc-na/loc-us/fmmp-wagner/en_US/technical/parts-matter/driver-education-and-vehicle-safety/how-the-brake-system-works/_jcr_content/article/article-par/image_1776083492.img.jpg/car-brake-pad-rotor-1738009820082.jpg',
    ],
    type: 'Engine',
  },
];




const SpareParts: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [partsData, setPartsData] = useState<SparePart[]>(initialPartsData);
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantity,setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

    const carParts: CarPart[] = [
    {
      id: 1,
      name: 'Engine Oil Filter',
      image: 'https://m.media-amazon.com/images/I/61qH3XvY-BL.jpg'
    },
    {
      id: 2,
      name: 'Brake Pads',
      image: 'https://www.wagnerbrake.com/content/loc-na/loc-us/fmmp-wagner/en_US/technical/parts-matter/driver-education-and-vehicle-safety/how-the-brake-system-works/_jcr_content/article/article-par/image_1776083492.img.jpg/car-brake-pad-rotor-1738009820082.jpg'
    },
    {
      id: 3,
      name: 'Spark Plugs',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Car Battery',
      image: 'https://www.wagnerbrake.com/content/loc-na/loc-us/fmmp-wagner/en_US/technical/parts-matter/driver-education-and-vehicle-safety/how-the-brake-system-works/_jcr_content/article/article-par/image_1776083492.img.jpg/car-brake-pad-rotor-1738009820082.jpg'
    },
    {
      id: 5,
      name: 'Radiator',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 6,
      name: 'Transmission Fluid',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 7,
      name: 'Alternator',
    image: 'https://image.made-in-china.com/202f0j00JhgkzEWKbUbB/Engine-Parts-371-Cylinder-Head-for-Chery-371-1003015mA.webp'
    },
    {
      id: 8,
      name: 'Air Filter',
     image: 'https://m.media-amazon.com/images/I/61VgEhafLlL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 9,
      name: 'Shock Absorbers',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 10,
      name: 'Fuel Pump',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const totalSlides: number = carParts.length;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    const startX = e.touches[0].clientX;
    (e.currentTarget as HTMLElement).dataset.startX = startX.toString();
  };

  const handleTouchEnd = (e: React.TouchEvent): void => {
    const startX = parseFloat((e.currentTarget as HTMLElement).dataset.startX || '0');
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  

  const filteredParts = partsData.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
const handleAddToCart = (part: any) => {
  console.log('Added to cart:', part);
};




  return (
    <div className="p-12">
  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
    <h1 className="text-4xl font-bold text-[#9b111e] text-left">
      Spare Parts
    </h1>
    {/* Search Bar */}
    <div className="relative w-full max-w-md">
  <input
    type="text"
    placeholder="Search by product name..."
    className="border border-gray-300 rounded-full px-5 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    className="absolute right-3 top-[85%] -translate-y-1/2 text-xl text-[#de687a] hover:text-red-600 transition-all duration-200 hover:scale-105 hover:bg-[#f1a2a9] p-1 rounded-full"
    onClick={() => {
      if (searchTerm !== '') {
        setSearchTerm('');
      }
    }}
    aria-label={searchTerm ? "Clear search" : "Search"}
  >
    {searchTerm ? <X size={20} /> : <Search size={16} />}
  </button>
    </div>
  </div>


     {/* Hero Card */}
<div className="mb-8 w-full bg-gray-100 rounded-xl shadow p-4 md:p-6 flex flex-row lg:flex-row items-center gap-6 hover:shadow-lg transition-shadow duration-300 h-[280px]">
  {/* Content - Left Side */}
  <div className="flex-1 order-none lg:order-none">
    <h2 className="text-2xl md:text-3xl font-bold text-[#9b111e] mb-3 md:mb-4">
      Welcome to Auto Spare Hub
    </h2>
    <p className="text-gray-700 mb-3 text-sm md:text-base">
      Discover top-quality auto spare parts. We offer genuine and after market
      components with fast delivery and customer satisfaction guaranteed.
    </p>
  </div>

  {/* Image - Right Side */}
  <div className="flex-1 w-full lg:flex lg:justify-end order-0 lg:order-none">
    <img
      src="https://t4.ftcdn.net/jpg/05/21/93/17/360_F_521931702_TXOHZBa3tLVISome894Zc061ceab4Txm.jpg"
      alt="Spare Parts Overview"
      className="rounded-lg max-h-[200px] md:max-h-[250px] w-full lg:w-auto object-cover shadow"
    />
  </div>
</div>
 <div className="relative flex items-center justify-between mt-16 mb-10">
  <h2 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-[#9b111e] border-b-4 border-[#9b111e] pb-1">
    Products
  </h2>
  <button
    className="bg-[#9b111e] text-white px-5 py-2 rounded-full text-sm hover:bg-red-700 transition ml-auto"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    View All Products
  </button>
</div>



      

     {/* Product Grid */}
<div className="max-w-6xl mx-auto grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8 px-2">
  {filteredParts.map((part, index) => (
    <div
      key={part.id}
      className="group relative border rounded-lg overflow-hidden shadow transition-transform duration-300 cursor-pointer bg-[#efe7d0] hover:scale-105 hover:shadow-[0_0_10px_rgba(155,17,30,0.5)]"
      onClick={() => setSelectedPart(part)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ minHeight: '260px' }}
    >
      <div className="h-[180px] flex justify-center items-center overflow-hidden">
        <img
          src={hoveredIndex === index && part.images[1] ? part.images[1] : part.images[0]}
          alt={part.name}
          className="max-w-[160px] max-h-[160px] w-auto h-auto object-cover transition-all duration-300 ease-in-out rounded-md"
        />
      </div>
      <div className="p-3 relative">
        <div className="text-xs font-semibold line-clamp-2 mb-1">{part.name}</div>
        <div className="text-xs text-gray-600 mb-1">{part.type}</div>
        <div className="text-sm font-bold text-[#9b111e]">
          ₹{part.price.toLocaleString()}
        </div>
        <div
          className={`mt-1 text-xs font-semibold ${
            part.inStock ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {part.inStock ? 'In Stock' : 'Out of Stock'}
        </div>

        {/* 🛒 Cart Icon Button */}
        <button
          className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow hover:bg-[#9b111e] hover:text-white transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            handleAddToCart(part);
          }}
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  ))}
</div>

<div className="bg-gray-100 mt-16  transition-shadow p-8">
     <div className="mb-8 text-center">
  <h2 className="inline-block text-2xl font-bold text-[#9b111e] border-b-4 border-[#9b111e] pb-1">
    OUR BUNDLES
  </h2>
</div>


      <div className="overflow-hidden mt-10 relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 320}px)`
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {carParts.map((part) => (
            <div
              key={part.id}
              className="min-w-[300px] flex-shrink-0 mr-5"
            >
              <div
                className={`bg-gradient-to-br  rounded-lg p-6 text-center text-white h-64 flex flex-col justify-center items-center shadow-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
              >
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center "
                  style={{ backgroundImage: `url(${part.image})` }}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                    <img 
                      src={part.image} 
                      alt={part.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </div>
                  <div className="text-xl font-bold mb-2">
                    {part.name}
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevSlide}
          className="bg-[#9b111e] text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Previous slide"
        >
          ← Previous
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#9b111e] text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Next slide"
        >
          Next →
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {carParts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
              index === currentIndex ? 'bg-[#9b111e]' : 'bg-gray-400 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
</div>

      



     {/* Bottom Full Width Section */}
<div className="w-full py-12 px-6 flex flex-col-2 lg:flex-row items-center gap-8">
  <div className="flex-1 max-w-2xl lg:order-1">
    <h2 className="text-4xl font-bold text-[#9b111e] mb-6">
      Professional Auto Service & Support
    </h2>
    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
      Need help installing your spare parts? Our certified technicians provide expert installation services and comprehensive support. We ensure your vehicle gets the best care with genuine parts and professional service.
    </p>
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="bg-white px-4 py-2 rounded-full text-sm border shadow-sm">
        ✓ Expert Installation
      </div>
      <div className="bg-white px-4 py-2 rounded-full text-sm border shadow-sm">
        ✓ Quality Guarantee
      </div>
      <div className="bg-white px-4 py-2 rounded-full text-sm border shadow-sm">
        ✓ 24/7 Support
      </div>
    </div>
    
  </div>
  <div className="flex-1 lg:order-2">
    <img
      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      alt="Professional Auto Service"
      className="w-full h-[400px] object-cover rounded-lg shadow-lg"
    />
  </div>
</div>

<div className="max-w-full px-4 md:px-6 lg:px-8 bg-[#fae9eb] py-6">
 <div className="text-center mt-10 mb-12">
  <h1 className="inline-block text-2xl font-bold text-[#9b111e] border-b-4 border-[#9b111e] pb-1">
    BY CATEGORIES
  </h1>
</div>

  

 <div className="grid  grid-cols-4 sm:grid-cols-2 mdplus:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: "Wheels and Tires",
        image:
          "https://img.freepik.com/free-vector/realistic-complete-set-car-wheels_1284-29765.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
        items: [
          "Bearings & Hubs",
          "Chrome Rims",
          "Hybrid Tyres",
          "Seasonal Tyres",
          "Wheel Bolts",
        ],
      },
      {
        title: "Body Parts",
        image:
          "https://img.freepik.com/premium-photo/two-metal-pistons-white_241146-682.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
        items: ["Headlights", "Accelerator", "Bumpers", "Clutch", "Washers"],
      },
      {
        title: "Performance Parts",
        image:
          "https://img.freepik.com/free-psd/3d-style-mechanical-item-isolated-transparent-background_191095-13746.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
        items: [
          "Drive Belts",
          "Engine Gasket",
          "Fuel Pumps",
          "Head Bolts",
          "Piston Rings",
        ],
      },
      {
        title: "Maintenance",
        image:
          "https://img.freepik.com/free-vector/engine-pistons-system-composition-with-realistic-image-assembled-metal-engine-elements-isolated_1284-53969.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
        items: [
          "Cleaners",
          "Antifreeze",
          "Engine Oil",
          "Repair Kits",
          "Bodypaint",
        ],
      },
    ].map(({ title, image, items }, index) => (
      <div
        key={index}
        className="flex flex-col gap-4 p-6 border rounded-xl shadow-md"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-md font-bold uppercase text-[#9b111e]">
            {title}
          </h2>
          <img
            src={image}
            alt={title}
            className="w-16 h-16 object-contain ml-2"
          />
        </div>
        <ul className="space-y-1 text-sm">
          {items.map((item, idx) => (
            <li key={idx} className="hover:underline cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
        <span className="text-sm font-semibold text-red-700 cursor-pointer hover:underline mt-2">
          ALL CATEGORIES →
        </span>
      </div>
    ))}
  </div>
</div>




      {/* Edit Product Modal */}
      {selectedPart && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedPart(null)}
        >
          <div 
            className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPart(null)}
              className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-red-600"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Product Image */}
   <div className="mb-4 flex justify-center">
              <img
                src={selectedPart.images[0]}
                alt={selectedPart.name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            <h2 className="text-lg font-bold mb-2">{selectedPart.name}</h2>
            <p className="text-sm text-gray-600 mb-1">Type: {selectedPart.type}</p>

            <span className="text-sm font-medium">Quantity:</span>
    <button
      onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      -
    </button>
    <span className="px-2">{quantity}</span>

    <button
      onClick={() => setQuantity(prev => prev + 1)}
      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      +
    </button>

     <div className="text-sm mt-3 mb-2">
    Total Price: <span className="font-semibold text-[#9b111e]">₹{(selectedPart.price * quantity).toLocaleString()}</span>
  </div>

  <button
    onClick={handleAddToCart}
    className="mt-2 w-full bg-[#9b111e] text-white px-4 py-2 rounded hover:bg-[#7f0d18] transition"
  >
    Add to Cart
  </button>

          </div>
        </div>
      )}
      </div>

    
  );
};

export default SpareParts;