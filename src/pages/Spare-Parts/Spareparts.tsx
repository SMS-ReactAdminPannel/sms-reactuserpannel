import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react'
import { Search, X } from 'lucide-react';
import { getSparePartsData, postSparePartsData } from '../../features/spareparts';
import spareimg from '../../assets/CAR DIFFERENTIAL/Car differential.jpg'

interface SparePart {
  id: string;
  spareparts_name: string;
  price: number;
  stock: string;
  images: string[];
  type: string;
  image: string;
}

  // Custom hook for Scroll Animation

		const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options = {}) => {
		  const [isVisible, setIsVisible] = useState(false);
		  const elementRef = useRef<T>(null);
		
		  useEffect(() => {
			const observer = new IntersectionObserver(
			  ([entry]) => {
				setIsVisible(entry.isIntersecting);
			  },
			  {
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
				...options
			  }
			);
		
			if (elementRef.current) {
			  observer.observe(elementRef.current);
			}
		
			return () => {
			  if (elementRef.current) {
				observer.unobserve(elementRef.current);
			  }
			};
		  }, []);
	  
		  return { elementRef, isVisible };
		};



const SpareParts: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [parts, setParts] = useState<SparePart[]>([]);
  
  // Add loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSlides: number = parts.length;

  // Fixed API integration with proper error handling
  const fetchSpareParts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = {}; // Make sure this matches your API requirements
      const response = await getSparePartsData(data);
      
      // Check if response has the expected structure
      if (response && response.data && response.data.data) {
        // Validate that the data is an array
        if (Array.isArray(response.data.data)) {
          // Map and validate each item to ensure it matches SparePart interface
          const validatedParts = response.data.data.map((part: any) => {
            return {
              id: part._id || '',
              spareparts_name: part.spareparts_name || '',
              price: Number(part.price) || 0,
              stock: part.stock || '',
              images: Array.isArray(part.images) ? part.images : [part.image || ''],
              type: part.type || '',
              image: part.image || (Array.isArray(part.images) ? part.images[0] : '')
            };
          });
          
          setParts(validatedParts);
        } else {
          throw new Error('API response data is not an array');
        }
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('Error fetching spare parts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch spare parts');
      
      // Optional: Set fallback data for development
      setParts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSpareParts();
  }, []);

  // Fixed auto-scroll functionality with proper dependency
  useEffect(() => {
    if (totalSlides === 0) return; // Don't start interval if no slides
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  const nextSlide = (): void => {
    if (totalSlides > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }
  };

  const prevSlide = (): void => {
    if (totalSlides > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    }
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

  const filteredParts = parts.filter((part) =>
    part.spareparts_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const spareTitle = useScrollAnimation<HTMLHeadingElement>();
		const productTitle = useScrollAnimation<HTMLHeadingElement>();
		const bundleTitle = useScrollAnimation<HTMLHeadingElement>();
		const categoryTitle = useScrollAnimation<HTMLHeadingElement>();




  // Add to cart button functions

const handleAddToCart = async (part: SparePart) => {
  try {
    const payload = {
      products: {
        productId: part.id,
        price: part.price?.toString(),
        quantity: quantity
      },
      type: 'spare'
    };

    setLoading(true);

    const response = await postSparePartsData(payload);

  } catch (error) {
    console.error("❌ Error adding to cart:", error);
  } finally {
    console.log("📦 handleAddToCart finished");
    setLoading(false);
  }
};

  // Show loading state
  if (loading) {
    return (
      <div className="p-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#9b111e] mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading spare parts...</p>
        </div>
      </div>
    );
  }


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
        {filteredParts.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No products found matching your search.' : 'No products available.'}
            </p>
          </div>
        ) : (
          filteredParts.map((part, index) => (
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
                  src={ spareimg
                    // (hoveredIndex === index && part.images && part.images[1]) || 
                    //   part.images[0] || part.image || spareimg
                  }
                  alt={part.spareparts_name}
                  className="max-w-[160px] max-h-[160px] w-auto h-auto object-cover transition-all duration-300 ease-in-out rounded-md"
                  onError={(e) => {
                    // Fallback for broken images
                    (e.target as HTMLImageElement).src = spareimg;
                  }}
                />
              </div>
              <div className="p-3 relative">
                <div className="text-xs font-semibold line-clamp-2 mb-1">{part.spareparts_name}</div>
                <div className="text-xs text-gray-600 mb-1">{part.type}</div>
                <div className="text-sm font-bold text-[#9b111e]">
                  ₹{part.price.toLocaleString()}
                </div>
                <div
                  className={`mt-1 text-xs font-semibold ${
                    part.stock ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {part.stock ? 'In Stock' : 'Out of Stock'}
                </div>

                {/* Cart Icon Button */}
                <button
                  className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow hover:bg-[#9b111e] hover:text-white transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(part);
                  }}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bundles Section - Only show if there are parts */}
      {parts.length > 0 && (
        <div className="bg-gray-100 mt-16 transition-shadow p-8">
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
              {parts.map((part) => (
                <div
                  key={part.id}
                  className="min-w-[300px] flex-shrink-0 mr-5"
                >
                  <div
                    className="bg-gradient-to-br rounded-lg p-6 text-center text-white h-64 flex flex-col justify-center items-center shadow-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                  >
                    {/* Background Image with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-[2px]"
                      // style={{ backgroundImage: `url(${part.image || (part.images && part.images[0]) || spareimg})` }}
                      style={{ backgroundImage: `url(${spareimg})` }}
                    />
                    <div className="absolute inset-0 bg-black opacity-10" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                        <img
                          // src={part.image || (part.images && part.images[0]) || spareimg}
                          src = {spareimg}
                          alt={part.spareparts_name}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="text-xl font-bold mb-2">
                        {part.spareparts_name}
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
            {parts.map((_, index) => (
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
      )}

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

        <div className="grid grid-cols-4 sm:grid-cols-2 mdplus:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Wheels and Tires",
              image: "https://img.freepik.com/free-vector/realistic-complete-set-car-wheels_1284-29765.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: ["Bearings & Hubs", "Chrome Rims", "Hybrid Tyres", "Seasonal Tyres", "Wheel Bolts"],
            },
            {
              title: "Body Parts",
              image: "https://img.freepik.com/premium-photo/two-metal-pistons-white_241146-682.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: ["Headlights", "Accelerator", "Bumpers", "Clutch", "Washers"],
            },
            {
              title: "Performance Parts",
              image: "https://img.freepik.com/free-psd/3d-style-mechanical-item-isolated-transparent-background_191095-13746.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: ["Drive Belts", "Engine Gasket", "Fuel Pumps", "Head Bolts", "Piston Rings"],
            },
            {
              title: "Maintenance",
              image: "https://img.freepik.com/free-vector/engine-pistons-system-composition-with-realistic-image-assembled-metal-engine-elements-isolated_1284-53969.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: ["Cleaners", "Antifreeze", "Engine Oil", "Repair Kits", "Bodypaint"],
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
                src={selectedPart.images && selectedPart.images[0] ? selectedPart.images[0] : selectedPart.image || spareimg}
                alt={selectedPart.spareparts_name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = spareimg;
                }}
              />
            </div>

            <h2 className="text-lg font-bold mb-2">{selectedPart.spareparts_name}</h2>
            <p className="text-sm text-gray-600 mb-1">Type: {selectedPart.type}</p>

            <div className="flex items-center gap-2 mb-4">
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
            </div>

            <div className="text-sm mt-3 mb-2">
              Total Price: <span className="font-semibold text-[#9b111e]">₹{(selectedPart.price * quantity).toLocaleString()}</span>
            </div>

            <div>
            {selectedPart.stock ? (<button
              onClick={() => handleAddToCart(selectedPart)}
              className="mt-2 w-full bg-[#9b111e] text-white px-4 py-2 rounded hover:bg-[#7f0d18] transition"
            >
              Add to Cart
            </button>) : 
            (<span className="text-sm font-semibold text-red-700 cursor-pointer hover:underline mt-2">
              Out of Stock
            </span>)
            }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpareParts;