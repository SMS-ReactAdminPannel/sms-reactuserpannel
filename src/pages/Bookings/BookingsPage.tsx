import React, { useState } from "react";
import { Search, Filter, Package, Wrench, CheckCircle } from "lucide-react";

// OrderDetails Component
interface OrderDetails {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  date?: string;
  price: number;
  compatibility: string;
}

interface OrderDetailsProps {
  part: OrderDetails;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ part }) => {
  const orderDate = part.date ? new Date(part.date) : null;
  const isCompleted = orderDate && orderDate < new Date();

  return (
    <div className="group relative h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 bg-gradient-to-br from-fuchsia-500 to-indigo-900 text-center transition-all duration-200 ease-[cubic-bezier(0,0,0,1)] hover:shadow-[0_0_30px_1px_rgba(204,0,255,0.3)] h-full flex flex-col ">
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isCompleted ? "Delivered" : "In Progress"}
          </span>
        </div>

        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={part.imageUrl || "/placeholder.svg"}
            alt={part.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
              {part.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {part.description}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-2">🔧</span>
              <span className="text-gray-700 font-medium">
                {part.compatibility}
              </span>
            </div>

            {part.date && (
              <div className="flex items-center text-sm">
                <span className="text-gray-500 mr-2">📅</span>
                <span className="text-gray-600">
                  {new Date(part.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="text-2xl font-bold text-gray-900">
              ₹{part.price.toLocaleString()}
            </div>

            {!isCompleted && (
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md">
                Track
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample Data
const initialSpareParts: OrderDetails[] = [
  {
    id: "1",
    name: "Brake Pad Set",
    price: 1800,
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    description: "High-quality ceramic brake pads for safe and smooth braking.",
    date: "2025-05-28",
    compatibility: "Honda City",
  },
  {
    id: "2",
    name: "Air Filter Element",
    price: 500,
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    description:
      "Durable air filter ensuring clean air intake and better mileage.",
    date: "2024-01-10",
    compatibility: "Hyundai i20",
  },
  {
    id: "3",
    name: "Engine Oil 5W-30 (3L)",
    price: 700,
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/9fd50e122693b3b0e4ae4ee3724ca1b2.webp",
    description: "Premium synthetic oil for high-performance engines.",
    date: "2024-04-22",
    compatibility: "Universal",
  },
  {
    id: "4",
    name: "Headlight Assembly",
    price: 900,
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/a808aff9788f47721e361dbf0d10bba8.webp",
    description: "Complete headlamp assembly with long-lasting brightness.",
    date: "2023-06-01",
    compatibility: "Maruti Swift",
  },
  {
    id: "5",
    name: "Wiper Blade Set",
    price: 1000,
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/7371bac93f3021909d987178c1b3ffdc.webp",
    description: "All-weather wiper blades with streak-free performance.",
    date: "2024-05-20",
    compatibility: "Toyota Corolla",
  },
];

const initialServiceOrders: OrderDetails[] = [
  {
    id: "s1",
    name: "Oil Change Service",
    price: 2000,
    imageUrl:
      "https://cdn.prod.website-files.com/61aa482275701e722856da7b/64f1c1f57a06d26739d38ef7_How%20to%20Change%20Oil%20in%20Your%20Car.jpg",
    description: "Your service is ongoing",
    compatibility: "first class",
    date: "2023-11-10",
  },
  {
    id: "s2",
    name: "Tire Rotation",
    price: 1000,
    imageUrl:
      "https://allmakescollision.ca/wp-content/uploads/2022/04/heveAdeZhFtnsUOwTf1tUf08fFeRMxMTRuX3IqlD.jpg",
    description: "Your service has completed and your car will be delivered",
    compatibility: "Firt class",
    date: "2019-03-01",
  },
];

// Main BookingsPage Component
const BookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"spare" | "service">("spare");
  const [showFilters, setShowFilters] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const currentList =
    activeTab === "spare" ? initialSpareParts : initialServiceOrders;

  const handleTabClick = (tab: "spare" | "service") => {
    setActiveTab(tab);
    setSearchTerm("");
    setFilterValue("");
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filteredParts = currentList.filter((part) => {
    const matchesSearch = part.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700 mb-2">My Orders</h1>
          <p className="text-gray-600">
            Track and manage your spare parts and service orders
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm  mb-8 ">
          <div className="flex bg-gradient-to-br from-fuchsia-500 to-indigo-900 rounded-[20px] text-center">
            <button
              onClick={() => handleTabClick("spare")}
              className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-l-xl  bg-gradient-to-br from-fuchsia-500 to-indigo-900 rounded-[20px] text-center transition-all duration-200 ease-[cubic-bezier(0,0,0,1)] hover:shadow-[0_0_30px_1px_rgba(204,0,255,0.3)] ${
                activeTab === "spare"
                  ? "bg-red-700 text-white"
                  : "text-gray-700 hover:text-red-700 hover:bg-gray-50"
              }`}
            >
              <Package className="h-5 w-5 mr-2" />
              Spare Parts Orders
            </button>
            <button
              onClick={() => handleTabClick("service")}
              className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-r-xl transition-colorsbg-gradient-to-br from-fuchsia-500 to-indigo-900 rounded-[20px] text-center transition-all duration-200 ease-[cubic-bezier(0,0,0,1)] hover:shadow-[0_0_30px_1px_rgba(204,0,255,0.3)] ${
                activeTab === "service"
                  ? "bg-red-700 text-white"
                  : "text-gray-700 hover:text-red-700 hover:bg-gray-50"
              }`}
            >
              <Wrench className="h-5 w-5 mr-2" />
              Service Bookings
            </button>
          </div>
        </div>

        {/* Search  */}
        <div className="rounded-xl mb-8">
          <div className="flex flex-col-4 lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex flex-1 gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search orders..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96 pl-10 pr-4 py-3 rounded-[20px] border boder-gray focus:outline-none focus:ring-0 bg-gradient-to-br from-fuchsia-500 to-indigo-900 text-white placeholder-gray text-sm transition-all duration-200 ease-[cubic-bezier(0,0,0,1)] hover:shadow-[0_0_30px_1px_rgba(204,0,255,0.3)]"
                  />
                </div>
              </div>
            </div>

            {/* Optional Reset Filters Button */}
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterValue("");
              }}
              className="flex items-center px-6 py-3 rounded-lg font-medium whitespace-nowrap bg-gradient-to-br from-fuchsia-500 to-indigo-900 bg-red-700 text-white hover:shadow-[0_0_30px_1px_rgba(204,0,255,0.3)]"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Show All Orders
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <div key={part.id} className="h-full">
                <OrderDetails part={part} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
