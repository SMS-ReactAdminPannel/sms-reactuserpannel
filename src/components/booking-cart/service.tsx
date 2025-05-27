import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

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

interface Props {
  part: SparePart;
  onDelete: (id: string) => void;
}

const SparePartCard: React.FC<Props> = ({ part, onDelete }) => {
  const [count, setCount] = useState<number>(1);

  const increase = () => {
    setCount((prev) => prev + 1); // Double the quantity
  };

  const decrease = () => {
    if (count <= 1) {
      onDelete(part.id); // Delete if 0
    } else {
      setCount((prev) => Math.floor(prev / 2)); // Halve the quantity
    }
  };
  const totalPrice = part.price * count;

  return (
    <div className="flex  gap-4 p-2 bg-white shadow-md rounded-xl overflow-auto  mb-4  -gray-200 hover:shadow-lg hover:scale-[1.01] md:hover:shadow-lg md:hover:scale-[1.02]">
      <div className="overflow-auto">
        <img
          src={part.imageUrl}
          alt={part.name}
          className="w-20 h-20  rounded-full "
        />
      </div>
      <div className="flex   text-sm  w-full overflow-auto ">
        <div className="flex-wrap flex    w-full justify-between item-between align-between">
          <div className="pl-2">
            <h2 className="text-xl font-semibold text-[#9b111e]" >{part.name}</h2>
            <p className="text-sm text-[#E6A895] ">{part.description}</p>
            <p className="text-xs text-[#E6A895] ">
              Compatible with: {part.compatibility}
            </p>
          </div>
          <div className="flex flex-cols items-center gap-3  ">
            <span className="text-lg font-bold text-green-600">
              ₹{totalPrice}
            </span>
            <span className="line-through text-sm text-gray-400">
              ₹{part.originalPrice}
            </span>
            <span className="text-red-500 text-sm">{part.discount}% off</span>
            <p
              className={`text-sm ${
                part.inStock ? "text-green-600" : "text-red-600 "
              }`}
            >
              {part.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="  text-center justify-center items-center flex flex-col-1 gap-4 ">
            <div className="flex items-center gap-4    ">
              <button
                className="text-base  px-1 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={decrease}
              >
                <FaMinus />
              </button>
              <span className="text-base">{count}</span>
              <button
                className="text-base px-1 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={increase}
              >
                <FaPlus />
              </button>
            </div>
            <div className="item-center flex justify-center text-SM ">
              <button
                className="  text-white   px-1 py-1 rounded-xl bg-red-500"
                onClick={() => onDelete(part.id)}
              >
                Delete
              </button>
            </div>
            <div className=" item-center flex justify-center text-sm">
          <button className=" px-1 py-1  text-white rounded-xl bg-green-500">
            
            Confirm Order
          </button>
        </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SparePartCard;