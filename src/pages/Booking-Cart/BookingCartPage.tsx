"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, Plus, Minus, Wrench, Car } from "lucide-react"

interface SparePart {
  id: string
  name: string
  description: string
  imageUrl: string
  inStock: boolean
  price: number
  discount: number
  originalPrice: number
  compatibility: string
  category: string
}

interface Service {
  id: string
  name: string
  description: string[]
  imageUrl: string
  price: number
  originalPrice: number
  hour: string
  category: string
}

const initialParts: SparePart[] = [
  {
    id: "1",
    name: "Brake Pad Set",
    description: "High-quality ceramic brake pads for safe and smooth braking.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    price: 1899,
    discount: 20,
    originalPrice: 2399,
    compatibility: "Maruti Swift, Baleno",
    category: "Brakes",
  },
  {
    id: "2",
    name: "Air Filter Element",
    description: "Durable air filter ensuring clean air intake and better mileage.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    price: 499,
    discount: 10,
    originalPrice: 549,
    compatibility: "Hyundai i20, Creta",
    category: "Filters",
  },
  {
    id: "3",
    name: "Engine Oil 5W-30 (3L)",
    description: "Premium synthetic oil for high-performance engines.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: false,
    price: 1299,
    discount: 15,
    originalPrice: 1529,
    compatibility: "Honda City, Amaze",
    category: "Oils",
  },
  {
    id: "4",
    name: "Headlight Assembly",
    description: "Complete headlamp assembly with long-lasting brightness.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    price: 3499,
    discount: 25,
    originalPrice: 4699,
    compatibility: "Tata Nexon, Harrier",
    category: "Lights",
  },
  {
    id: "5",
    name: "Wiper Blade Set",
    description: "All-weather wiper blades with streak-free performance.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    price: 799,
    discount: 12,
    originalPrice: 899,
    compatibility: "Toyota Innova, Fortuner",
    category: "Accessories",
  },
]

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
    imageUrl: "/placeholder.svg?height=200&width=200",
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
    imageUrl: "/placeholder.svg?height=200&width=200",
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
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 3899,
    originalPrice: 5999,
    category: "AC Service",
  },
  {
    id: "ac-complete",
    name: "Complete AC Service",
    hour: "4 Hrs Taken",
    description: ["AC Deep Cleaning", "Filter Replacement", "Condenser Cleaning", "AC Gas Refill", "Compressor Check"],
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 3899,
    originalPrice: 5999,
    category: "AC Service",
  },
  {
    id: "battery-check",
    name: "Battery Health Check",
    hour: "1 Hr Taken",
    description: ["Battery Voltage Test", "Terminal Cleaning", "Load Test", "Water Level Check"],
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 3899,
    originalPrice: 5999,
    category: "Battery",
  },
]

export default function SparePartsCart() {
  const [parts, setParts] = useState<SparePart[]>(initialParts)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [confirmedPartOrders, setConfirmedPartOrders] = useState<{ part: SparePart; quantity: number }[]>([])
  const [confirmedServiceOrders, setConfirmedServiceOrders] = useState<{ serv: Service; quantity: number }[]>([])
  const [activeTab, setActiveTab] = useState<"service" | "ServiceBookingPage">("service")
  const [showSummary, setShowSummary] = useState(true)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("name")
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  const partCategories = [...new Set(parts.map((part) => part.category))]
  const serviceCategories = [...new Set(services.map((service) => service.category))]

  // Filter and sort parts
  const filteredParts = useMemo(() => {
    return parts
      .filter((part) => {
        const matchesSearch =
          part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          part.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesPrice = part.price >= priceRange[0] && part.price <= priceRange[1]
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(part.category)
        const matchesStock = !showInStockOnly || part.inStock
        return matchesSearch && matchesPrice && matchesCategory && matchesStock
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "discount":
            return b.discount - a.discount
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [parts, searchQuery, priceRange, selectedCategories, sortBy, showInStockOnly])

  // Filter and sort services
  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchesSearch =
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
        const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1]
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category)
        return matchesSearch && matchesPrice && matchesCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [services, searchQuery, priceRange, selectedCategories, sortBy])

  const handleDelete = (id: string) => {
    setParts((prev) => prev.filter((part) => part.id !== id))
    setServices((prev) => prev.filter((serv) => serv.id !== id))
  }

  const handleConfirmPart = (id: string, quantity: number) => {
    const part = parts.find((p) => p.id === id)
    if (part) {
      setConfirmedPartOrders((prev) => [...prev, { part, quantity }])
      setParts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const handleConfirmService = (id: string, quantity: number) => {
    const serv = services.find((s) => s.id === id)
    if (serv) {
      setConfirmedServiceOrders((prev) => [...prev, { serv, quantity }])
      setServices((prev) => prev.filter((s) => s.id !== id))
    }
  }

  const totalPartPrice = confirmedPartOrders.reduce((acc, { part, quantity }) => acc + part.price * quantity, 0)
  const totalServicePrice = confirmedServiceOrders.reduce((acc, { serv, quantity }) => acc + serv.price * quantity, 0)

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 10000])
    setSelectedCategories([])
    setSortBy("name")
    setShowInStockOnly(false)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  const SparePartCard = ({ part }: { part: SparePart }) => {
    const [quantity, setQuantity] = useState(1)

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            {/* <Image src={part.imageUrl || "/placeholder.svg"} alt={part.name} fill className="object-cover rounded-lg" /> */}
            {part.discount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {part.discount}% OFF
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{part.name}</h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  part.inStock ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {part.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{part.description}</p>
            <p className="text-xs text-gray-500 mb-3">Compatible: {part.compatibility}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">₹{part.price}</span>
                {part.originalPrice > part.price && (
                  <span className="text-sm text-gray-500 line-through">₹{part.originalPrice}</span>
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
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:bg-gray-100 transition-colors">
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
    )
  }

  const ServiceCard = ({ service }: { service: Service }) => {
    const [quantity, setQuantity] = useState(1)

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            {/* <Image
              src={service.imageUrl || "/placeholder.svg"}
              alt={service.name}
              fill
              className="object-cover rounded-lg"
            /> */}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-full">
                {service.hour}
              </span>
            </div>
            <div className="mb-3">
              <ul className="text-sm text-gray-600 space-y-1">
                {service.description.map((desc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">₹{service.price}</span>
                {service.originalPrice > service.price && (
                  <span className="text-sm text-gray-500 line-through">₹{service.originalPrice}</span>
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
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:bg-gray-100 transition-colors">
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-red-600 mb-6">My Cart</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parts and services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categories</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {(activeTab === "service" ? partCategories : serviceCategories).map((category) => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => handleCategoryChange(category, e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {activeTab === "service" && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showInStockOnly}
                        onChange={(e) => setShowInStockOnly(e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm">In Stock Only</span>
                    </label>
                  )}
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("service")}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 ${
              activeTab === "service" ? "bg-red-600 text-white shadow-lg" : "bg-gray-200 text-black hover:bg-red-100"
            }`}
          >
            <Wrench className="text-lg" />
            SparePart Orders
          </button>
          <button
            onClick={() => setActiveTab("ServiceBookingPage")}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 ${
              activeTab === "ServiceBookingPage"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-gray-200 text-black hover:bg-red-100"
            }`}
          >
            <Car className="text-xl" />
            Service Order
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
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
                    <p className="text-gray-500">No spare parts found matching your criteria.</p>
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
                    <p className="text-gray-500">No services found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            {/* Parts Summary */}
            {confirmedPartOrders.length > 0 && showSummary && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-red-600">Summary</h2>
                    <h3 className="text-base font-semibold text-red-600">Confirmed Part Orders</h3>
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
                  <div className="flex justify-between font-bold text-orange-600">
                    <span>Total</span>
                    <span>₹{totalPartPrice}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => alert("Payment Successful 🎉")}
                    className="relative overflow-hidden bg-gray-50 text-lg font-semibold border-2 border-gray-50 px-6 py-2 rounded-full transition-all duration-700 hover:text-gray-50 hover:bg-red-600 hover:border-red-600 hover:scale-105 hover:shadow-xl"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {/* Services Summary */}
            {confirmedServiceOrders.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-red-600">Summary</h2>
                  <h3 className="text-base font-semibold text-red-600">Confirmed Service Orders</h3>
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
                  <div className="flex justify-between font-bold text-orange-600">
                    <span>Total</span>
                    <span>₹{totalServicePrice}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => alert("Payment Successful 🎉")}
                    className="relative overflow-hidden bg-gray-50 text-lg font-semibold border-2 border-gray-50 px-6 py-2 rounded-full transition-all duration-700 hover:text-gray-50 hover:bg-red-600 hover:border-red-600 hover:scale-105 hover:shadow-xl"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}