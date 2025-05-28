import React, { useState } from "react";

interface Spareservice {
  id: string;
  name: string;
  description: string[];
  imageUrl: string;
  price: number;
  originalPrice: number;
  hour: string;
}

interface Props {
  service: Spareservice;

  onDelete: (id: string) => void;
  onConfirm: (id: string, quantity: number) => void;
}

const ServiceBookingPage: React.FC<Props> = ({
  service,
  onConfirm,
}) => {
  const [count] = useState<number>(1);
  const totalPrice = service.price * count;
  const descriptionItems = service.description;

  return (
    <div className="flex gap-4 p-2 rounded-xl overflow-auto  mb-4  bg-white hover:shadow-lg hover: md:hover:shadow-lg  scrollbar-hide hover:border-red hover:border-xl bg-gradient-to-r from-[#fbe9d7,]  to-[#f6d5f7]" >
      <div className="overflow-auto  " >
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-20 h-20  rounded-xl "
        />
      </div>
      <div className="flex text-sm w-full overflow-auto  ">
        <div className="flex-wrap flex    w-full justify-between item-between align-between relative">
          <div className="pl-2  w-1/3 ">
            <h2 className="text-xl font-semibold text-[#9b111e]">
              {service.name}
            </h2>
            <p className="text-sm text-[#E6A895]  ">
              {descriptionItems.slice(0, 3).map((item, index, arr) => (
                <span key={index} className="whitespace-nowrap">
                  {item.trim()}
                  {index !== arr.length - 1 && <span className="mx-1">|</span>}
                </span>
              ))}
            </p>
            <p className="text-xs text-[#E6A895] ">
              Service Taken Time: {service.hour}
            </p>
          </div>
          <div className="items-center text-center  w-1/3  justify-center flex  ">
            <div className="flex flex-cols gap-4 w-full items-center align-center justify-center  ">
              <span className="text-lg font-bold text-green-600">
                ₹{totalPrice}
              </span>
              <span className="line-through text-sm text-gray-400">
                ₹{service.originalPrice}
              </span>
            </div>
          </div>

          <div className=" mr-3  text-center justify-center items-center flex flex-col-1 gap-4 ">
            <div className="item-center flex justify-center  ">
              <button className="text-sm px-2 py-2 rounded-full bg-red-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000" onClick={() => onConfirm(service.id, count)}
                >
                  <span className="absolute bg-red-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-red-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                   Delete
                </button>
              
            </div>
            <div className=" item-center flex justify-center ">
              
                <button className="text-sm px-2 py-2 rounded-full bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000" onClick={() => onConfirm(service.id, count)}
                >
                  <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                   Confirm Order
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingPage;
