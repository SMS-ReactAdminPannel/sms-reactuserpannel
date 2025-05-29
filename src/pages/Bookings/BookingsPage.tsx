import type React from "react"
import { useState } from "react"
import { Search, Package, Wrench, CheckCircle, Calendar, Truck, Clock, MapPin } from "lucide-react"

// OrderDetails Interface
interface OrderDetails {
  id: string
  name: string
  imageUrl: string
  description: string
  date?: string
  price: number
  compatibility: string
  type: "spare" | "service"
}

// Sample Data - Combined all orders
const allOrders: OrderDetails[] = [
  {
    id: "1",
    name: "Brake Pad Set",
    price: 1800,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "High-quality ceramic brake pads for safe and smooth braking.",
    date: "2025-01-15", // Future date - In Progress
    compatibility: "Honda City",
    type: "spare",
  },
  {
    id: "2",
    name: "Air Filter Element",
    price: 500,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Durable air filter ensuring clean air intake and better mileage.",
    date: "2024-01-10",
    compatibility: "Hyundai i20",
    type: "spare",
  },
  {
    id: "3",
    name: "Engine Oil 5W-30 (3L)",
    price: 700,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Premium synthetic oil for high-performance engines.",
    date: "2025-01-20", // Future date - In Progress
    compatibility: "Universal",
    type: "spare",
  },
  {
    id: "4",
    name: "Headlight Assembly",
    price: 900,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Complete headlamp assembly with long-lasting brightness.",
    date: "2023-06-01",
    compatibility: "Maruti Swift",
    type: "spare",
  },
  {
    id: "5",
    name: "Wiper Blade Set",
    price: 1000,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "All-weather wiper blades with streak-free performance.",
    date: "2024-05-20",
    compatibility: "Toyota Corolla",
    type: "spare",
  },
  {
    id: "6",
    name: "Transmission Fluid",
    price: 850,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "High-performance transmission fluid for smooth gear shifts.",
    date: "2025-01-25", // Future date - In Progress
    compatibility: "Ford Focus",
    type: "spare",
  },
  {
    id: "7",
    name: "Spark Plugs Set",
    price: 1200,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Premium iridium spark plugs for better engine performance.",
    date: "2025-01-18", // Future date - In Progress
    compatibility: "Volkswagen Golf",
    type: "spare",
  },
  {
    id: "s1",
    name: "Oil Change Service",
    price: 2000,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Complete oil change service with premium synthetic oil",
    compatibility: "First Class Service",
    date: "2025-01-12", // Future date - In Progress
    type: "service",
  },
  {
    id: "s2",
    name: "Tire Rotation",
    price: 1000,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Professional tire rotation and balancing service",
    compatibility: "First Class Service",
    date: "2019-03-01",
    type: "service",
  },
  {
    id: "s3",
    name: "Brake Inspection",
    price: 1500,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Comprehensive brake system inspection and maintenance",
    compatibility: "Premium Service",
    date: "2025-01-22", // Future date - In Progress
    type: "service",
  },
  {
    id: "s4",
    name: "AC Service",
    price: 2500,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Complete air conditioning system service and gas refill",
    compatibility: "Premium Service",
    date: "2025-01-30", // Future date - In Progress
    type: "service",
  },
]

// OrderCard Component
interface OrderCardProps {
  order: OrderDetails
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const orderDate = order.date ? new Date(order.date) : null
  const isCompleted = orderDate && orderDate < new Date()
  const isOld = orderDate && orderDate < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Older than 1 year

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-48 h-48 md:h-auto relative bg-gradient-to-br from-gray-50 to-gray-100">
          <img src={order.imageUrl || "/placeholder.svg"} alt={order.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                order.type === "spare" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
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
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                isCompleted ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
              }`}
            >
              {isCompleted ? "Delivered" : "In Progress"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{order.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{order.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{order.price.toLocaleString()}</div>
                  {isOld && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                      Old Order
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-700 font-medium">{order.compatibility}</span>
                </div>

                {order.date && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">
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

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  View Details
                </button>
                {!isCompleted && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md">
                    <Truck className="w-4 h-4 mr-1 inline" />
                    Track Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main OrdersPage Component
const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "spare" | "service">("all")
  const [sortBy, setSortBy] = useState<"date" | "price" | "name">("date")
  const [showOldOrders, setShowOldOrders] = useState(false)

  const filteredOrders = allOrders
    .filter((order) => {
      const matchesSearch =
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || order.type === filterType

      // Check if order is old (older than 1 year)
      const orderDate = order.date ? new Date(order.date) : null
      const isOld = orderDate && orderDate < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      const matchesOldFilter = !showOldOrders || isOld

      return matchesSearch && matchesType && matchesOldFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        case "price":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const totalOrders = filteredOrders.length
  const completedOrders = filteredOrders.filter((order) => {
    const orderDate = order.date ? new Date(order.date) : null
    return orderDate && orderDate < new Date()
  }).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600 text-lg">Track and manage all your orders in one place</p>

          {/* Stats */}
          <div className="flex space-x-6 mt-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-gray-900">{totalOrders}</span>
              <span className="text-gray-600 ml-2">Total Orders</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-green-600">{completedOrders}</span>
              <span className="text-gray-600 ml-2">Completed</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-orange-600">{totalOrders - completedOrders}</span>
              <span className="text-gray-600 ml-2">In Progress</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
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
                    filterType === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setFilterType("spare")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                    filterType === "spare" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Spare Parts
                </button>
                <button
                  onClick={() => setFilterType("service")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                    filterType === "service" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Wrench className="w-4 h-4 mr-1" />
                  Services
                </button>
              </div>

              {/* Old Orders Toggle */}
              <button
                onClick={() => setShowOldOrders(!showOldOrders)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center ${
                  showOldOrders ? "bg-purple-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Calendar className="w-4 h-4 mr-1" />
                {showOldOrders ? "Showing Old Orders" : "Show Old Orders"}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "price" | "name")}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setSortBy("date")
                  setShowOldOrders(false)
                }}
                 className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
