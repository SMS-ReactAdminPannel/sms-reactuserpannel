import React from 'react';
import { 
  FaTools, 
  FaSnowflake, 
  FaBatteryThreeQuarters, 
  FaTruckMonster, 
  FaCarAlt,
  FaSearch,
  FaLightbulb,
  FaCarCrash,
  FaCarSide,
  FaFileSignature
} from 'react-icons/fa';
import { Link } from 'react-router-dom'

interface Dashboard {
  id: number;
  icon: React.ReactNode;
  title: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const cardData: Dashboard[] = [
    { id: 1, icon: <FaTools size={24} />, title: "Periodic Services", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 2, icon: <FaSnowflake size={24} />, title: "Ac Services & Repair", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 3, icon: <FaBatteryThreeQuarters size={24} />, title: "Batteries", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 4, icon: <FaTruckMonster size={24} />, title: "Tyres and Wheel Care", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 5, icon: <FaCarAlt size={24} />, title: "Detailing Services", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 6, icon: <FaSearch size={24} />, title: "Car Inspection", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 7, icon: <FaLightbulb size={24} />, title: "Windshields & Lights", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 8, icon: <FaCarCrash size={24} />, title: "Suspension & Fitments", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 9, icon: <FaCarSide size={24} />, title: "Clutch & Body Parts", color: "bg-[#FAF3EB] border-[#9b111e]" },
    { id: 10,icon: <FaFileSignature size={24} />, title: "Insurance Claims", color: "bg-[#FAF3EB] border-[#9b111e]" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Services</h1>
      
      <div className="grid grid-cols-5 grid-rows-2 gap-4 max-w-6xl mx-auto">
        {cardData.map((card) => (
          <Link
            to={`/service-center/{card.id}`}
            key={card.id}
            className={`${card.color} border-2 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105`}
          >
            <div className="text-[#9b111e] mb-2 pl-[80px]">
              {card.icon} </div>
            <h3 className="text-center font-medium hover ">{card.title}</h3>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Hover over cards to see the interactive effects
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
