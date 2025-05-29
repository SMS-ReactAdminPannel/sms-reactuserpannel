import React, { useState } from "react";
import {
  Search,
  Filter,
  Package,
  Wrench,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";


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
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Status Badge */}
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

        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={part.imageUrl || "/placeholder.svg"}
            alt={part.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">
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
              <span className="text-gray-700 font-medium">{part.compatibility}</span>
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

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              ₹{part.price.toLocaleString()}
            </div>

            {!isCompleted && (
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                Track
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
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
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const currentList =
    activeTab === "spare" ? initialSpareParts : initialServiceOrders;

  const handleTabClick = (tab: "spare" | "service") => {
    setActiveTab(tab);
    setSearchTerm("");
    setShowCompletedOnly(false);
    setFilterValue("");
  };

  const toggleShowCompleted = () => {
    setShowCompletedOnly((prev) => !prev);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filteredParts = currentList.filter((part) => {
    const matchesSearch = part.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (!showCompletedOnly) return matchesSearch;
    if (!part.date) return false;

    const orderDate = new Date(part.date);
    const today = new Date();
    return matchesSearch && orderDate < today;
  });

  // const completedCount = currentList.filter((part) => {
  //   if (!part.date) return false;
  //   return new Date(part.date) < new Date();
  // }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">
            Track and manage your spare parts and service orders
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 ">
          <div className="flex hover:shadow-[0_0_20px_#f87171] hover:border hover:border-red-300">
            <button
              onClick={() => handleTabClick("spare")}
              className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-l-xl transition-colors ${
                activeTab === "spare"
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Package className="h-5 w-5 mr-2" />
              Spare Parts Orders
            </button>
            <button
              onClick={() => handleTabClick("service")}
              className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-r-xl transition-colors ${
                activeTab === "service"
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Wrench className="h-5 w-5 mr-2" />
              Service Orders
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className=" rounded-xl  mb-8">
          <div className="flex flex-col-4 lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex flex-1 gap-4">
                {/* Search */}
                <div className="relative ">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 " />
                  <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search orders..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3  border border-gray-200 rounded-lg focus:ring-2 hover:shadow-[0_0_20px_#f87171] hover:border hover:border-red-300 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Filter Button */}
                <div className="relative hover:shadow-[0_0_20px_#f87171] hover:border hover:border-red-300">
                  <button
                    onClick={toggleFilters}
                    className={`flex items-center h-full px-4 py-3 border rounded-lg font-medium transition-colors ${
                      showFilters
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </button>

                  {showFilters && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-10">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Status
                      </label>
                      <select
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      >
                        <option value="">All Orders</option>
                        <option value="delivered">Delivered</option>
                        <option value="pending">Pending</option>
                        <option value="last30">Last 30 Days</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Completed Orders Toggle */}
            <button
              onClick={toggleShowCompleted}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap hover:shadow-[0_0_20px_#f87171] hover:border hover:border-red-300 ${
                showCompletedOnly
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {showCompletedOnly ? "Show All" : "Completed Only"}
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4  gap-6">
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <OrderDetails key={part.id} part={part} />
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
