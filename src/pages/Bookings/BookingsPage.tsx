import type React from "react";
import { useState } from "react";
import {
  Search,
  Package,
  Wrench,
  CheckCircle,
  Calendar,
  Truck,
  Clock,
  MapPin,
} from "lucide-react";
import bgImage from "../../assets/checkout-bg_1_.png";

// OrderDetails Interface
interface OrderDetails {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  date?: string;
  price: number;
  sellingPrice:number;
  discount:number;
  compatibility: string;
  status:string;
  update:string;
  currentLocation:string;
  EstimatedDelivery:string;
  type: "spare" | "service";
}

// Sample Data - Combined all orders
const allOrders: OrderDetails[] = [
  {
    id: "1",
    name: "Brake Pad Set",
    sellingPrice:3000,
    price: 1800,
    discount:50,
    imageUrl:
      "https://mountuneusa.com/cdn/shop/products/2364-BPR-EY-2.jpg?v=1679085769",
    description: "High-quality ceramic brake pads for safe and smooth braking.",
    date: "2025-01-15", // Future date - In Progress
    compatibility: "Honda City",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",
  },
  {
    id: "2",
    name: "Air Filter Element",
    sellingPrice:3000,
    price: 500,
    discount:50,
    imageUrl:
      "https://ix-cdn.b2e5.com/images/27094/27094_64f064db089b431fb5edb0d696b3ee39_1539205525.jpeg",
    description:
      "Durable air filter ensuring clean air intake and better mileage.",
    date: "2024-01-10",
    compatibility: "Hyundai i20",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",
  },
  {
    id: "3",
    name: "Engine Oil 5W-30 (3L)",
    sellingPrice:3000,
    price: 700,
     discount:50,
    imageUrl:
      "https://www.veedolindia.com/sites/default/files/assets/products/01_TAKE-OFF-4T-RACING-10W-50-SP-MA2.jpg",
    description: "Premium synthetic oil for high-performance engines.",
    date: "2025-01-20", // Future date - In Progress
    compatibility: "Universal",
    status:"Transit",
     update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",
  },
  {
    id: "4",
    name: "Headlight Assembly",
    sellingPrice:3000,
    price: 900,
     discount:50,
    imageUrl:
      "https://ragillyspares.com/cdn/shop/files/719k8aSruQL._SL1500.jpg?v=1683808827",
    description: "Complete headlamp assembly with long-lasting brightness.",
    date: "2023-06-01",
    compatibility: "Maruti Swift",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",

  },
  {
    id: "5",
    name: "Wiper Blade Set",
    sellingPrice:3000,
    price: 1000,
     discount:50,
    imageUrl:
      "https://cdn11.bigcommerce.com/s-fqaftp/images/stencil/1280x1280/ products/17091/39298/D3WIPEBOSCHA1__94725.1620205879.jpg?c=2?imbypass=on",
    description: "All-weather wiper blades with streak-free performance.",
    date: "2024-05-20",
    compatibility: "Toyota Corolla",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",
  },
  {
    id: "6",
    name: "Transmission Fluid",
    sellingPrice:3000,
    price: 850,
     discount:50,
    imageUrl:
      "https://i5.walmartimages.com/seo/Super-Tech-MERCON-V-Automatic-Transmission-Fluid-1-Quart_f916ff04-41c6-496b-be51-cb2642c23f80.a3727600f85548013ae5d72232f876cf.jpeg",
    description: "High-performance transmission fluid for smooth gear shifts.",
    date: "2025-01-25", // Future date - In Progress
    compatibility: "Ford Focus",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",
  },
  {
    id: "7",
    name: "Spark Plugs Set",
    price: 1200,
    sellingPrice:3000,
     discount:50,
    imageUrl:
      "https://images-cdn.ubuy.co.in/634d135710a6ca0e676a098a-new-ngk-standard-spark-plug-b8hs10-5126.jpg",
    description: "Premium iridium spark plugs for better engine performance.",
    date: "2025-01-18", // Future date - In Progress
    compatibility: "Volkswagen Golf",
    status:"Transit",
     update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "spare",
  },
  {
    id: "s1",
    name: "Oil Change Service",
    sellingPrice:3000,
    price: 2000,
     discount:50,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxmvTKOLWVAdnoDPRQZTYZJ90KDVlVzMhQA&s",
    description: "Complete oil change service with premium synthetic oil",
    compatibility: "First Class Service",
    date: "2025-01-12", // Future date - In Progress
    status:"Transit",
     update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "service",
  },
  {
    id: "s2",
    name: "Tire Rotation",
    price: 1000,
    sellingPrice:3000,
     discount:50,
    imageUrl:
      "https://allmakescollision.ca/wp-content/uploads/2022/04/heveAdeZhFtnsUOwTf1tUf08fFeRMxMTRuX3IqlD.jpg",
    description: "Professional tire rotation and balancing service",
    compatibility: "First Class Service",
    date: "2019-03-01",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",
    type: "service",
  },
  {
    id: "s3",
    name: "Brake Inspection",
    price: 1500,
    sellingPrice:3000,
     discount:50,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYfW70xQsp2FOJGbhI_Maejt6jHAdJrQtZuw&s",
    description: "Comprehensive brake system inspection and maintenance",
    compatibility: "Premium Service",
    date: "2025-01-22",
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222", // Future date - In Progress
    type: "service",
  },
  {
    id: "s4",
    name: "AC Service",
    sellingPrice:3000,
    price: 2500,
     discount:50,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhOk79SOrDJDnjXvam5PcDVMQ4MlCsX3h-w&s",
    description: "Complete air conditioning system service and gas refill",
    compatibility: "Premium Service",
    date: "2025-01-30", 
    status:"Transit",
    update:"2 hours ago",
    currentLocation:"Chennai",
    EstimatedDelivery:"1222",// Future date - In Progress
    type: "service",
  },
];

// OrderCard Component
interface OrderCardProps {
  order: OrderDetails;
}

// import { useState } from "react"; // Ensure this is at the top


const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const [showDetails, setShowDetails] = useState(false);
  const orderDate = order.date ? new Date(order.date) : null;
  const isCompleted = orderDate && orderDate < new Date();
  const isOld =
    orderDate && orderDate < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // Older than 1 year

  //this is card inside
  return (
    <div className=" opacity-90 rounded-2xl shadow-lg-red-300 border border-red-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-red-300 ">
      <div className="flex flex-col">
        <div className="flex flex-row ">
          {/* Image Section */}

          <div className="md:w-48 h-48 md:h-auto relative overflow-hidden rounded-lg shadow-md">
            {/* Image fills the entire container */}
            <img
              src={order.imageUrl || "/placeholder.svg"}
              alt={order.name}
              className="w-full h-full object-cover"
            />

            {/* Type badge (top-left) */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  order.type === "spare"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {order.type === "spare" ? (
                  <>
                    <Package className="w-3 h-3 mr-1" />
                    Spare Part
                  </>
                ) : (
                  <>
                    <Wrench className="w-3 h-3 mr-1" />
                    Service
                  </>
                )}
              </span>
            </div>

            {/* Status badge (top-right) */}
            <div className="absolute top-3 right-3 z-10">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {isCompleted ? "Delivered" : "In Progress"}
              </span>
            </div>

            {/* Completed overlay ribbon (center or bottom) */}
            {/* {isCompleted && (
              <div className="absolute bottom-0 left-0 w-full bg-green-600 bg-opacity-75 text-white text-xs font-semibold text-center py-1">
                ✅ Completed
              </div>
            )} */}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="  flex  justify-between">
                {/* name nd des */}
                <div className="">
                  <div className="">
                    <h3 className="text-xl font-bold text-red-900 mb-1">
                      {order.name}
                    </h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      {order.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 text-red-800 mr-2" />
                      <span className="text-red-700 font-medium">
                        {order.compatibility}
                      </span>
                    </div>
                    {/* Date Section */}
                    {order.date && (
                      <div className="flex items-center text-sm text-red-700">
                        <Calendar className="w-4 h-4 text-red-800 mr-2" />
                        <span>
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{order.price.toLocaleString()}
                  </div>

                  {isOld && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                      Old Order
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between p-2 ">
          <div className="flex items-center space-x-4">
            {isCompleted ? (
              <div className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </div>
            ) : (
              <div className="flex items-center text-orange-600 text-sm font-medium">
                <Clock className="w-4 h-4 mr-1" />
                In Progress
              </div>
            )}
           </div>
 
           <div className="flex space-x-2">
            {/* <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              View Details
            </button> */}
<button
  onClick={() => setShowDetails(!showDetails)}
  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
>
  {showDetails ? "Hide Details" : "View Details"}
</button>

          </div>
        </div>
      </div>
      

{showDetails && (
  <div className="bg-red-50 text-red-900 px-4 py-4 border-t border-red-200 transition-all duration-300 text-sm mt-2">

    {/* Flex Row: Price on left, Tracking on right */}
    <div className="flex flex-row justify-between items-start gap-6">

      {/* Left: Price Details */}
      <div className="w-1/2 space-y-2">
        <p>
          <strong>Compatibility <span className="ml-4">:</span> </strong>
          <span className="ml-8">{order.compatibility}</span>
        </p>
        <p>
          <strong>Original Price<span className="ml-4">:</span></strong>{" "}
          <span className="line-through text-gray-500 ml-9">
            ₹{order.sellingPrice.toLocaleString()}
          </span>
        </p>
        <p>
          <strong>Final Price<span className="ml-9">:</span></strong>{" "}
          <span className="text-green-700 font-semibold ml-9">
            ₹{order.price.toLocaleString()}
          </span>
        </p>
        <p>
          <strong>You Saved<span className="ml-9">:</span></strong>{" "}
          <span className="text-green-600 font-medium ml-9">
            ₹{order.discount} ({Math.round((order.discount / order.price) * 100)}% OFF)
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="w-px bg-red-300" />
<div className="w-1/2 space-y-2 border border-dashed border-red-300 rounded-lg p-4 bg-red-100 text-sm">
  {/* Status */}


    <div className="flex items-start">
    <span className="w-5">🚚</span>
    <strong className="w-20">Status</strong >
        <p><span className="mr-4">:</span> {order.status}  </p>
  </div>


    <div className="flex items-start">
    <span className="w-5">📍</span>
    <strong className="w-20">Location </strong >
        <p><span className="mr-4">:</span>   {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</p>
  </div>



  {/* Delivery Date */}
  <div className="flex items-start">
    <span className="w-6">📅</span>
    <strong className="w-20">Delivery </strong >
        <p><span className="mr-4">:</span>   {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</p>
  </div>

 
<div className="flex items-start">
    <span className="w-6">🕒</span>
    <strong className="w-20">update </strong >
        <p><span className="mr-4">:</span>   {order.update}</p>
  </div>
</div>

    </div>
  </div>
)}


    </div>
  );
};


// Main OrdersPage Component
const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "spare" | "service">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"date" | "price" | "name">("date");
  const [showOldOrders, setShowOldOrders] = useState(false);

  const filteredOrders = allOrders
    .filter((order) => {
      const matchesSearch =
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || order.type === filterType;

      // Check if order is old (older than 1 year)
      const orderDate = order.date ? new Date(order.date) : null;
      const isOld =
        orderDate &&
        orderDate < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      const matchesOldFilter = !showOldOrders || isOld;

      return matchesSearch && matchesType && matchesOldFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          );
        case "price":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const totalOrders = filteredOrders.length;
  const completedOrders = filteredOrders.filter((order) => {
    const orderDate = order.date ? new Date(order.date) : null;
    return orderDate && orderDate < new Date();
  }).length;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
      style={{ backgroundImage: `url("${bgImage}")` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">My Orders</h1>
          <p className="text-red-600 text-lg">
            Track and manage all your orders in one place
          </p>

          {/* Stats */}
          <div className="flex space-x-6 mt-4 text-[#9b111e]">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-gray-900">
                {totalOrders}
              </span>
              <span className=" ml-2">Total Orders</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-green-600">
                {completedOrders}
              </span>
              <span className=" ml-2">Completed</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-orange-600">
                {totalOrders - completedOrders}
              </span>
              <span className=" ml-2">In Progress</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#FAF3EB] rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search orders..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Filter Buttons */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterType === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setFilterType("spare")}
                  className={`px-4 py-2 rounded-lg  text-sm font-medium transition-all flex items-center ${
                    filterType === "spare"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Spare Parts
                </button>
                <button
                  onClick={() => setFilterType("service")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                    filterType === "service"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Wrench className="w-4 h-4 mr-1" />
                  Services
                </button>
              </div>

              {/* Old Orders Toggle */}
              <button
                onClick={() => setShowOldOrders(!showOldOrders)}
                className={`px-4 py-2 rounded-xl hover:shadow-xl text-sm font-medium transition-all flex items-center ${
                  showOldOrders
                    ? "bg-red-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Calendar className="w-4 h-4 mr-1" />
                {showOldOrders ? "Showing Old Orders" : "Show Old Orders"}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "price" | "name")
                }
                className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-smpx-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-gray-600 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setSortBy("date");
                  setShowOldOrders(false);
                }}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-gray-500 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
