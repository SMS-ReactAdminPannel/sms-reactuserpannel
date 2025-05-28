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
  parts: SparePart;
  onDelete: (id: string) => void;
  onConfirm: (id: string, quantity: number) => void;
}

const SparePartCard: React.FC<Props> = ({ parts, onDelete , onConfirm}) => {
  const [count, setCount] = useState<number>(1);
   const totalPrice = parts.price * count;

  const increase = () => {
    setCount((prev) => prev + 1); // Double the quantity
  };

  const decrease = () => {
    if (count <= 1) {
      onDelete(parts.id); // Delete if 0
    } else {
      setCount((prev) => Math.floor(prev / 2)); // Halve the quantity
    }
  };
 

  return (
    <div className="flex  gap-4 p-2 bg-white shadow-md rounded-xl overflow-auto  mb-4  -gray-200 hover:shadow-lg hover:scale-[1.001] md:hover:shadow-lg md:hover:scale-[1.002] scrollbar-hide">
      <div className="overflow-auto">
        <img
          src={parts.imageUrl}
          alt={parts.name}
          className="w-20 h-20  rounded-full "
        />
      </div>
      <div className="flex   text-sm  w-full overflow-auto  ">
        <div className="flex-wrap flex    w-full justify-between item-between align-between relative">
          <div className="pl-2  w-1/3 ">
            <h2 className="text-xl font-semibold text-[#9b111e]" >{parts.name}</h2>
            <p className="text-sm text-[#E6A895] line-clamp-1 ">{parts.description}</p>
            <p className="text-xs text-[#E6A895] ">
              Compatible with: {parts.compatibility}
            </p>
          </div>
          <div className="items-center text-center  w-1/3  justify-center flex  ">
          <div className="flex flex-cols gap-4 w-full items-center align-center justify-center  ">
              <span className="text-lg font-bold text-green-600">
                ₹{totalPrice}
              </span>
              <span className="line-through text-sm text-gray-400">
                ₹{parts.originalPrice}
              </span>
              <span className="text-red-500 text-sm">{parts.discount}% off</span>
              <p
                className={`text-sm ${
                  parts.inStock ? "text-green-600" : "text-red-600 "
                } `}
              >
                {parts.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>

          <div className=" mr-3  text-center justify-center items-center flex flex-col-1 gap-4 ">
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
            <div className="item-center flex justify-center  ">
              <div className=" px-2 py-2 flex rounded-xl bg-red-500 ">
                <button
                className="  text-white text-xs justify-center text-center item-center    "
                onClick={() => onDelete(parts.id)}
              >
                Delete
              </button>
              </div>
            </div>
            <div className=" item-center flex justify-center ">
          <div className="  px-1.5 py-1.5 rounded-xl bg-green-500">
            <button className="text-white text-xs justify-center text-center item-center "
             onClick={() => onConfirm(parts.id, count)}>
            
            Confirm Order
          </button>
          </div>
        </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SparePartCard;