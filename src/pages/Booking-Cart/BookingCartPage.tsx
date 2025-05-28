import  { useState } from "react";
import SparePartCard from "../../components/booking-cart/SparePartBooking";
import { COLORS, FONTS } from "../../constants/constant";

//icons
import { GiMechanicGarage } from "react-icons/gi";
import { FaWrench } from "react-icons/fa";

//component
import SwipeToPay from "../../components/booking-cart/Swipetopay";
import ServiceBookingPage from "../../components/booking-cart/Servingbookingcart";

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
interface Service {
  id: string;
  name: string;
  description: string [];
  imageUrl: string;
  price: number;
  originalPrice: number;
  hour: string;
}

//This for Service Booking

const initialService: Service[] = [
  {
    id: "Basic",
    name: "Basic Service ",
    hour: "4 Hrs Taken",
    description: ["Wiper Fluid Replacement",'Car Wash','Interior Vacuuming (Carpet & Seats)', 'Engine Oil Replacement',],
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    price: 1899,
    originalPrice: 2399,
    
  },
   {
    id: "Stander",
    name: "Standard Service",
    hour: "6 Hrs Taken",
    description: ['Car Scanning','Wiper Fluid Replacement','Battery Water Top up','Car Wash','Interior Vacuuming (Carpet & Seats)'],
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    price: 1899,
    originalPrice: 2399,
    
  },
  {
    id: "ac-basic",
    name: "AC Gas Refill",
     hour: "2 Hrs Taken",
    description: ['Car Scanning','Wiper Fluid Replacement','Battery Water Top up','Car Wash','Interior Vacuuming (Carpet & Seats)'],
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    price: 1899,
    originalPrice: 2399,
   
  },
];



//for Spare Part
const initialParts: SparePart[] = [
  {
    id: "1",
    name: "Brake Pad Set",
    description: "High-quality ceramic brake pads for safe and smooth braking.",
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    inStock: true,
    price: 1899,
    discount: 20,
    originalPrice: 2399,
    compatibility: "Maruti Swift, Baleno",
  },
  {
    id: "2",
    name: "Air Filter Element",
    description:
      "Durable air filter ensuring clean air intake and better mileage.",
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp",
    inStock: true,
    price: 499,
    discount: 10,
    originalPrice: 549,
    compatibility: "Hyundai i20, Creta",
  },
  {
    id: "3",
    name: "Engine Oil 5W-30 (3L)",
    description: "Premium synthetic oil for high-performance engines.",
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/9fd50e122693b3b0e4ae4ee3724ca1b2.webp",
    inStock: false,
    price: 1299,
    discount: 15,
    originalPrice: 1529,
    compatibility: "Honda City, Amaze",
  },
  {
    id: "4",
    name: "Headlight Assembly",
    description: "Complete headlamp assembly with long-lasting brightness.",
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/a808aff9788f47721e361dbf0d10bba8.webp",
    inStock: true,
    price: 3499,
    discount: 25,
    originalPrice: 4699,
    compatibility: "Tata Nexon, Harrier",
  },
  {
    id: "5",
    name: "Wiper Blade Set",
    description: "All-weather wiper blades with streak-free performance.",
    imageUrl:
      "https://boodmo.com/media/cache/catalog_part/images/parts/7371bac93f3021909d987178c1b3ffdc.webp",
    inStock: true,
    price: 799,
    discount: 12,
    originalPrice: 899,
    compatibility: "Toyota Innova, Fortuner",
  },
];

const SparePartsList = () => {
  const [parts, setParts] = useState<SparePart[]>(initialParts);
  const [servs, setServs] = useState<Service[]>(initialService);

  const [confirmedPartOrders, setConfirmedPartOrders] = useState<{ part: SparePart; quantity: number }[]>([]);
  const [confirmedServiceOrders, setConfirmedServiceOrders] = useState<{ serv: Service; quantity: number }[]>([]);

  const [activePage, setActivePage] = useState<"service" | "ServiceBookingPage">("service");

  const handleDelete = (id: string) => {
    setParts((prev) => prev.filter((part) => part.id !== id));
    setServs((prev) => prev.filter((serv) => serv.id !== id));
  };

  const handleConfirmPart = (id: string, quantity: number) => {
    const part = parts.find((p) => p.id === id);
    if (part) {
      setConfirmedPartOrders((prev) => [...prev, { part, quantity }]);
      setParts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleConfirmService = (id: string, quantity: number) => {
    const serv = servs.find((s) => s.id === id);
    if (serv) {
      setConfirmedServiceOrders((prev) => [...prev, { serv, quantity }]);
      setServs((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const totalPartPrice = confirmedPartOrders.reduce((acc, { part, quantity }) => acc + part.price * quantity, 0);
  const totalServicePrice = confirmedServiceOrders.reduce((acc, { serv, quantity }) => acc + serv.price * quantity, 0);

  return (
    <div className="p-4 scrollbar-hide">
      <h1 style={{ ...FONTS.header, color: COLORS.primary }}>My Cart</h1>

      {/* Tabs */}
      <div className="flex gap-4 mt-4 mb-4 ">
        <div className=" ">
          <button
            className={`px-4 py-2 rounded-full  flex flex-cols  ${
              activePage === "service"
                ? "bg-[#9b111e] text-white"
                : "bg-gray-200  text-black"
            }`}
            onClick={() => setActivePage("service")}
          >
            <FaWrench className=" text-lg mt-1 mr-1 " />
            SparePart Orders
          </button>
        </div>
        <div>
          <button
            className={`px-4 py-2 rounded-full flex flex-cols   ${
              activePage === "ServiceBookingPage"
                ? "bg-[#9b111e] text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActivePage("ServiceBookingPage")}
          >
            <GiMechanicGarage className=" text-2xl mr-1 " />
            Service Order
          </button>
        </div>
      </div>

      {/* Service Page */}
      {activePage === "service" && (
        <>
          <div className="p-4 bg-white rounded-xl overflow-auto overflow-hidden">
            {parts.map((part) => (
              <SparePartCard
                key={part.id}
                parts={part}
                onDelete={handleDelete} 
                onConfirm={handleConfirmPart}
              />
            ))}
          </div>

          {confirmedPartOrders.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow ">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-[#9b111e] ">
                  Summery
                </h2>
                <h2 className="text-base font-semibold text-[#9b111e] ">
                  Confirmed Orders
                </h2>
              </div>
              {confirmedPartOrders.map(({ part, quantity }) => (
                <div
                  key={part.id}
                  className="flex justify-between mt-2 text-sm"
                >
                  <span>
                    {part.name} x {quantity}
                  </span>
                  <span>₹{part.price * quantity}</span>
                </div>
              ))}
              <div className="mt-2 font-bold text-[#E6A895] border-t border-green-300 pt-2 flex justify-between">
                <span>Total</span>
                <span>₹{totalPartPrice}</span>
              </div>
              <div className="flex justify-center ">
                <div className="p-2 w-1/3 ">
                  <div className="">
                    <SwipeToPay
                      onSwipeComplete={() => alert("Payment Successful 🎉")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Service Booking Page */}
      {activePage === "ServiceBookingPage" && (
        <>
          <div className="p-4 bg-white rounded-xl overflow-auto overflow-hidden">
            {servs.map((serv) => (
              <ServiceBookingPage
                key={serv.id}
                service={serv}
                onDelete={handleDelete}
                onConfirm={handleConfirmService}
              />
            ))}
          </div>

          {confirmedServiceOrders.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow ">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-[#9b111e] ">
                  Summery
                </h2>
                <h2 className="text-base font-semibold text-[#9b111e] ">
                  Confirmed Orders
                </h2>
              </div>
              {confirmedServiceOrders.map(({ serv, quantity }) => (
                <div
                  key={serv.id}
                  className="flex justify-between mt-2 text-sm"
                >
                  <span>
                    {serv.name} x {quantity}
                  </span>
                  <span>₹{serv.price * quantity}</span>
                </div>
              ))}
              <div className="mt-2 font-bold text-[#E6A895] border-t border-green-300 pt-2 flex justify-between">
                <span>Total</span>
                <span>₹{totalServicePrice}</span>
              </div>
              <div className="flex justify-center ">
                <div className="p-2 w-1/3 ">
                  <div className="">
                    <SwipeToPay
                      onSwipeComplete={() => alert("Payment Successful 🎉")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SparePartsList;
