
import { useState, useMemo,useEffect } from "react";
import { X, Plus, Minus, Wrench, Car } from "lucide-react";
import serviceImg from "../../assets/serviceimages/generalservice.png";
import bgImage from "../../assets/checkout-bg_1_.png";
import { toast } from "react-toastify";
import { COLORS, FONTS } from "../../constants/constant";
 import axios from 'axios';
import {booking_cart} from "../../features/booking_cart/services/index"
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
  category: string;
}

interface Service {
  id: string;
  name: string;
  description: string[];
  imageUrl: string;
  price: number;
  originalPrice: number;
  hour: string;
  category: string;
}


interface Spare{
product_id:number;
product_name:string;
price:number;
brand:string;
image:string;
quantity:number;
}


// const initialParts: SparePart[] = [
//   {
//     id: "1",
//     name: "Brake Pad Set",
//     description: "High-quality ceramic brake pads for safe and smooth braking.",
//     imageUrl:
//       "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
//     inStock: true,
//     price: 1899,
//     discount: 20,
//     originalPrice: 2399,
//     compatibility: "Maruti Swift, Baleno",
//     category: "Brakes",
//   },
//   {
//     id: "2",
//     name: "Air Filter Element",
//     description:
//       "Durable air filter ensuring clean air intake and better mileage.",
//     imageUrl:
//       "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
//     inStock: true,
//     price: 499,
//     discount: 10,
//     originalPrice: 549,
//     compatibility: "Hyundai i20, Creta",
//     category: "Filters",
//   },
//   {
//     id: "3",
//     name: "Engine Oil 5W-30 (3L)",
//     description: "Premium synthetic oil for high-performance engines.",
//     imageUrl:
//       "https://boodmo.com/media/cache/catalog_part/images/parts/9fd50e122693b3b0e4ae4ee3724ca1b2.webp",
//     inStock: false,
//     price: 1299,
//     discount: 15,
//     originalPrice: 1529,
//     compatibility: "Honda City, Amaze",
//     category: "Oils",
//   },
//   {
//     id: "4",
//     name: "Headlight Assembly",
//     description: "Complete headlamp assembly with long-lasting brightness.",
//     imageUrl:
//       "https://boodmo.com/media/cache/catalog_part/images/parts/a808aff9788f47721e361dbf0d10bba8.webp",
//     inStock: true,
//     price: 3499,
//     discount: 25,
//     originalPrice: 4699,
//     compatibility: "Tata Nexon, Harrier",
//     category: "Lights",
//   },
//   {
//     id: "5",
//     name: "Wiper Blade Set",
//     description: "All-weather wiper blades with streak-free performance.",
//     imageUrl:
// "https://boodmo.com/media/cache/catalog_part/images/parts/7371bac93f3021909d987178c1b3ffdc.webp",
//     inStock: true,
//     price: 799,
//     discount: 12,
//     originalPrice: 899,
//     compatibility: "Toyota Innova, Fortuner",
//     category: "Accessories",
//   },
// ];

const initialServices: Service[] = [
  {
    id: "Basic",
    name: "Basic Service",
    hour: "4 Hrs Taken",
    description: [
      "Wiper Fluid Replacement",
      "Car Wash",
      "Interior Vacuuming (Carpet & Seats)",
      "Engine Oil Replacement",
    ],
    imageUrl: serviceImg,
    price: 2999,
    originalPrice: 3399,
    category: "Basic",
  },
  {
    id: "Standard",
    name: "Standard Service",
    hour: "6 Hrs Taken",
    description: [
      "Car Scanning",
      "Wiper Fluid Replacement",
      "Battery Water Top up",
      "Car Wash",
      "Interior Vacuuming (Carpet & Seats)",
    ],
    imageUrl: serviceImg,
    price: 4899,
    originalPrice: 5599,
    category: "Standard",
  },
  {
    id: "ac-basic",
    name: "AC Gas Refill",
    hour: "2 Hrs Taken",
    description: [
      "Car Scanning",
      "Wiper Fluid Replacement",
      "Battery Water Top up",
      "Car Wash",
      "Interior Vacuuming (Carpet & Seats)",
    ],
    imageUrl: serviceImg,
    price: 3899,
    originalPrice: 5999,
    category: "AC Service",
  },
  {
    id: "ac-complete",
    name: "Complete AC Service",
    hour: "4 Hrs Taken",
    description: [
      "AC Deep Cleaning",
      "Filter Replacement",
      "Condenser Cleaning",
      "AC Gas Refill",
      "Compressor Check",
    ],
    imageUrl: serviceImg,
    price: 3899,
    originalPrice: 5999,
    category: "AC Service",
  },
  {
    id: "battery-check",
    name: "Battery Health Check",
    hour: "1 Hr Taken",
    description: [
      "Battery Voltage Test",
      "Terminal Cleaning",
      "Load Test",
      "Water Level Check",
    ],
    imageUrl: serviceImg,
    price: 3899,
    originalPrice: 5999,
    category: "Battery",
  },
];

export default function SparePartsCart() {
  const [parts, setParts] = useState<Spare[]>();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [confirmedPartOrders, setConfirmedPartOrders] = useState<
    { part: SparePart; quantity: number }[]
  >([]);
  const [confirmedServiceOrders, setConfirmedServiceOrders] = useState<
    { serv: Service; quantity: number }[]
  >([]);
  const [activeTab, setActiveTab] = useState<"service" | "ServiceBookingPage">(
    "service"
  );
  const [showSummary, setShowSummary] = useState(true);
  const [showsSummary, setShowsSummary] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  // const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  // const partCategories = [...new Set(parts.map((part) => part.category))]
  // const serviceCategories = [...new Set(services.map((service) => service.category))]

  const [books, setBooks] = useState<Spare[]>([]);

  const books_valid = async () => {
    try {
      const response = await booking_cart({});
      console.log("API Response", response);

      const productList = response?.data?.data?.[0]?.products;

      if (Array.isArray(productList)) {
        const validBooks = productList.map((part: any): Spare => ({
          product_id: part.product_id || '',
          product_name: part.product_name || '',
          price: Number(part.price) || 0,
          brand: part.brand || '',
          image: part.image || '',
          quantity: Number(part.quantity) || 0,
       }));

        setBooks(validBooks);
        console.log('Api response data',validBooks)
      }
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  useEffect(() => {
    books_valid();
  }, []);



  
  // Filter and sort parts
//   const filteredParts = useMemo(() => {
//     return parts
//       .filter((part) => {
//         const matchesSearch =
//           part.name.toLowerCase().includes(searchQuery.toLowerCase())

// part.description.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesPrice =
//           part.price >= priceRange[0] && part.price <= priceRange[1];
//         const matchesCategory =
//           selectedCategories.length === 0 ||
//           selectedCategories.includes(part.category);
//         const matchesStock = !showInStockOnly || part.inStock;
//         return matchesSearch && matchesPrice && matchesCategory && matchesStock;
//       })
//       .sort((a, b) => {
//         switch (sortBy) {
//           case "price-low":
//             return a.price - b.price;
//           case "price-high":
//             return b.price - a.price;
//           case "discount":
//             return b.discount - a.discount;
//           default:
//             return a.name.localeCompare(b.name);
//         }
//       });
//   }, [
//     parts,
//     searchQuery,
//     priceRange,
//     selectedCategories,
//     sortBy,
//     showInStockOnly,
//   ]);


const filteredParts = useMemo(() => {
  return (parts || [])
    .filter((part) => {
      const matchesSearch =
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.description.toLowerCase().includes(searchQuery.toLowerCase()); 

      const matchesPrice =
        part.price >= priceRange[0] && part.price <= priceRange[1];

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(part.category);

      const matchesStock = !showInStockOnly || part.inStock;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCategory &&
        matchesStock
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "discount":
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });
}, [
  parts,
  searchQuery,
  priceRange,
  selectedCategories,
  sortBy,
  showInStockOnly,
]);




  // Filter and sort services
  // const filteredServices = useMemo(() => {
  //   return services
  //   .filter((service) => {
  //       const matchesSearch =
  //         service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         service.description
  //           .join(" ")
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase());
  //       const matchesPrice =
  //         service.price >= priceRange[0] && service.price <= priceRange[1];
  //       const matchesCategory =
  //         selectedCategories.length === 0 ||
  //         selectedCategories.includes(service.category);
  //       return matchesSearch && matchesPrice && matchesCategory;
  //     })
  //     .sort((a, b) => {
  //       switch (sortBy) {
  //         case "price-low":
  //           return a.price - b.price;
  //         case "price-high":
  //           return b.price - a.price;
  //         default:
  //           return a.name.localeCompare(b.name);
  //       }
  //     });
  // }, [services, searchQuery, priceRange, selectedCategories, sortBy]);

  // const handleDelete = (id: string) => {
  //   setParts((prev) => prev.filter((part) => part.id !== id));
  //   setServices((prev) => prev.filter((serv) => serv.id !== id));
  // };

  // const handleConfirmPart = (id: string, quantity: number) => {
  //   const part = parts.find((p) => p.id === id);
  //   if (part) {
  //     setConfirmedPartOrders((prev) => [...prev, { part, quantity }]);
  //     setParts((prev) => prev.filter((p) => p.id !== id));
  //   }
  // };

  // const handleConfirmService = (id: string, quantity: number) => {
  //   const serv = services.find((s) => s.id === id);
  //   if (serv) {
  //     setConfirmedServiceOrders((prev) => [...prev, { serv, quantity }]);
  //     setServices((prev) => prev.filter((s) => s.id !== id));
  //   }
  // };

const filteredServices = useMemo(() => {
  if (!Array.isArray(services)) return [];

  return services
    .filter((service) => {
      const matchesSearch =
        service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.description || []).join(" ").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        service.price >= priceRange[0] && service.price <= priceRange[1];

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(service.category);

      return matchesSearch && matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });
}, [services, searchQuery, priceRange, selectedCategories, sortBy]);


  const totalPartPrice = confirmedPartOrders.reduce(
    (acc, { part, quantity }) => acc + part.price * quantity,
    0
  );
  const totalServicePrice = confirmedServiceOrders.reduce(
    (acc, { serv, quantity }) => acc + serv.price * quantity,
    0
  );

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setSortBy("name");
    setShowInStockOnly(false);
  };

  // const handleCategoryChange = (category: string, checked: boolean) => {
  //   if (checked) {
  //     setSelectedCategories((prev) => [...prev, category])
  //   } else {
  //     setSelectedCategories((prev) => prev.filter((c) => c !== category))
  //   }
  // }

  const SparePartCard = ({ part }: { part: Spare }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className=" rounded-lg shadow-md p-4 mb-4  border border-gray-200 hover:shadow-lg transition-shadow duration-300  bg-white">
        <div className="flex gap-4">
          <div className="relative w-36  flex-shrink-0">
            <img
              src={part.imageUrl || "/placeholder.svg"}
              alt={part.name}
              className="object-cover rounded-lg h-full"
            />
            {part.discount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {part.discount}% OFF
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {part.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  part.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {part.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{part.description}</p>
            <p className="text-xs text-gray-500 mb-3">
              Compatible: {part.compatibility}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">
                  ₹{part.price}
                </span>
                {part.originalPrice > part.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{part.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleConfirmPart(part.id, quantity)}
                  disabled={!part.inStock}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    part.inStock
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleDelete(part.id)}
                  className="p-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServiceCard = ({ service }: { service: Service }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex gap-4">
          <div className="relative w-48  flex-shrink-0">
            <img
              src={service.imageUrl || "/placeholder.svg"}
              alt={service.name}
              className="object-cover rounded-lg h-full "
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {service.name}
              </h3>
              <span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-full">
                {service.hour}
              </span>
            </div>
            <div className="mb-3 ">
              <ul className="text-sm text-gray-600 w-96 grid grid-cols-2 gap-x-3 gap-y-1">
                {service.description.map((desc, index) => (
                  <li key={index} className="flex gap-1 item-start">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-1.5   flex-shrink-0" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">
                  ₹{service.price}
                </span>
                {service.originalPrice > service.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleConfirmService(service.id, quantity)}
                  className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 "
      // style={{ backgroundImage: url("${bgImage}") }}
      style={{ backgroundImage: `url("${bgImage}")` }}

    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#9b111e] mb-6">My Cart</h1>

        {/* Tabs */}
        <div className="mb-6">
          <div className="relative inline-flex p-1 bg-[#FAF3EB] rounded-full border border-gray-300">
            <button
              onClick={() => setActiveTab("service")}
              className={`px-6 py-3 rounded-full flex items-center gap-2 z-10 transition-colors duration-300 ${
                activeTab === "service"
                  ? "text-white"
                  : "text-black "
              }`}
            >
              <Wrench className="text-lg" />
              SparePart Orders
            </button>

            <button
              onClick={() => setActiveTab("ServiceBookingPage")}
              className={`px-6 py-3 rounded-full flex items-center gap-2 z-10 transition-colors duration-300 ${
                activeTab === "ServiceBookingPage"
                  ? "text-white"
                  : "text-black "
              }`}
            >
              <Car className="text-xl" />
              Service Order
            </button>

            {/* Animated indicator with smooth sliding */}
            <div
              className={`absolute inset-y-1 h-[calc(100%-0.5rem)] bg-[#9b111e] rounded-full shadow-md transition-all duration-300 ease-in-out ${
                activeTab === "service"
                  ? "left-1 w-[calc(50%-0.25rem)]"
                  : "left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1  gap-6">
          {/* Main Content */}
          <div className="">
            {/* Service Page */}
            {activeTab === "service" && (
              <div>
                {filteredParts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredParts.map((part) => (
                      <SparePartCard key={part.id} part={part} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-500">
                      No spare parts found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Service Booking Page */}
            {activeTab === "ServiceBookingPage" && (
              <div>
                {filteredServices.length > 0 ? (
                  <div className="space-y-4">
                    {filteredServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-500">
                      No services found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="">
            {/* Parts Summary */}
            {confirmedPartOrders.length > 0 && showSummary && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-red-600">
                      Summary
                    </h2>
                    <h3 className="text-base font-semibold text-red-600">
                      Confirmed Part Orders
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSummary(false)}
                    className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  {confirmedPartOrders.map(({ part, quantity }) => (
                    <div key={part.id} className="flex justify-between text-sm">
                      <span>
                        {part.name} x {quantity}
                      </span>
                      <span>₹{part.price * quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-orange-200 pt-2 mb-4">
                  <div className="flex justify-between font-bold text-orange-700">
                    <span>Total</span>
                    <span>₹{totalPartPrice}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#9b111e] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group"
                    onClick={() =>
                      toast("Order Confirmed 🎉", { autoClose: 1000 })
                    }
                  >
                    {" "}
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {/* Services Summary */}
            {confirmedServiceOrders.length > 0 && showsSummary && (
              <div className="bg-white rounded-lg shadow-md p-4 ">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-red-600">
                      Summary
                    </h2>
                    <h3 className="text-base font-semibold text-red-600">
                      Confirmed Part Orders
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowsSummary(false)}
                    className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {confirmedServiceOrders.map(({ serv, quantity }) => (
                    <div key={serv.id} className="flex justify-between text-sm">
                      <span>
                        {serv.name} x {quantity}
                      </span>
                      <span>₹{serv.price * quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-orange-200 pt-2 mb-4">
                  <div className="flex justify-between font-bold text-orange-700">
                    <span>Total</span>
                    <span>₹{totalServicePrice}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#9b111e] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group"
                    onClick={() =>
                      toast("Order Confirmed 🎉", { autoClose: 1000 })
                    }
                  >
                    {" "}
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { Plus, Minus, X } from "react-feather";
// import { booking_cart } from "../../features/booking_cart/services/index"; // Adjust your import path if needed

// interface Spare {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   price: number;
//   originalPrice: number;
//   discount: number;
//   inStock: boolean;
//   compatibility: string;
// }

// export default function SparePartsCart() {
//   const [parts, setParts] = useState<Spare[]>([]);

//   // Fetch parts from API and map to interface
//   const fetchSpareParts = async () => {
//     try {
//       const response = await booking_cart({});
//       const productList = response?.data?.data?.[0]?.products;

//       if (Array.isArray(productList)) {
//         const formattedParts: Spare[] = productList.map((part: any) => ({
//           id: part.product_id || "",
//           name: part.product_name || "",
//           description: part.description || "No description",
//           imageUrl: part.image || "/placeholder.svg",
//           price: Number(part.price) || 0,
//           originalPrice: Number(part.original_price) || Number(part.price) || 0,
//           discount: Number(part.discount) || 0,
//           inStock: part.in_stock !== false,
//           compatibility: part.compatibility || "Universal",
//         }));

//         setParts(formattedParts);
//       }
//     } catch (error) {
//       console.error("Error fetching parts", error);
//     }
//   };

//   useEffect(() => {
//     fetchSpareParts();
//   }, []);

//   const handleConfirmPart = (id: string, qty: number) => {
//     console.log("Confirm part:", id, "Quantity:", qty);
//   };

//   const handleDelete = (id: string) => {
//     setParts((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-red-700">Spare Parts</h2>
//       {parts.length === 0 ? (
//         <p>No spare parts found.</p>
//       ) : (
//         parts.map((part) => <SparePartCard key={part.id} part={part} onConfirm={handleConfirmPart} onDelete={handleDelete} />)
//       )}
//     </div>
//   );
// }

// const SparePartCard = ({
//   part,
//   onConfirm,
//   onDelete,
// }: {
//   part: Spare;
//   onConfirm: (id: string, quantity: number) => void;
//   onDelete: (id: string) => void;
// }) => {
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className="rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 bg-white">
//       <div className="flex gap-4">
//         <div className="relative w-36 flex-shrink-0">
//           <img
//             src={part.imageUrl}
//             alt={part.name}
//             className="object-cover rounded-lg h-full"
//           />
//           {part.discount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
//               {part.discount}% OFF
//             </span>
//           )}
//         </div>
//         <div className="flex-1">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-lg font-semibold text-gray-900">{part.name}</h3>
//             <span
//               className={`px-2 py-1 text-xs font-medium rounded-full ${
//                 part.inStock
//                   ? "bg-green-100 text-green-800"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {part.inStock ? "In Stock" : "Out of Stock"}
//             </span>
//           </div>
//           <p className="text-sm text-gray-600 mb-2">{part.description}</p>
//           <p className="text-xs text-gray-500 mb-3">Compatible: {part.compatibility}</p>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-xl font-bold text-red-600">₹{part.price}</span>
//               {part.originalPrice > part.price && (
//                 <span className="text-sm text-gray-500 line-through">
//                   ₹{part.originalPrice}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="flex items-center border border-gray-300 rounded-lg">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="p-1 hover:bg-gray-100 transition-colors"
//                 >
//                   <Minus className="h-4 w-4" />
//                 </button>
//                 <span className="px-3 py-1 text-sm">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="p-1 hover:bg-gray-100 transition-colors"
//                 >
//                   <Plus className="h-4 w-4" />
//                 </button>
//               </div>
//               <button
//                 onClick={() => onConfirm(part.id, quantity)}
//                 disabled={!part.inStock}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   part.inStock
//                     ? "bg-red-600 hover:bg-red-700 text-white"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={() => onDelete(part.id)}
//                 className="p-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
