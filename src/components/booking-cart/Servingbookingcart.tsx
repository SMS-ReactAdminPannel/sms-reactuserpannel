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
  onDelete,
  onConfirm,
}) => {
  const [count] = useState<number>(1);
  const totalPrice = service.price * count;
  const descriptionItems = service.description;

  return (
    // this design
     <div className="relative bg-[rgba(105,13,197,0.103)] rounded-xl m-10 flex flex-col overflow-hidden group  hover:shadow-lg hover:scale-[1.001] md:hover:shadow-lg md:hover:scale-[1.002] ">
      {/* Hover effect circle */}
      <div className="absolute w-[200px] h-[200px] -top-[40%] -left-[20%] rounded-full border-[35px] border-red/10 blur-sm transition-all duration-700 ease-in-out group-hover:w-[280px] group-hover:h-[280px] group-hover:top-[-40%] group-hover:left-3/4 group-hover:blur-0" />
      <div className="absolute w-[100px] h-[100px] -top-[40%] -left-[10%] rounded-full border-[35px] border-red/10 blur-sm transition-all duration-700 ease-in-out group-hover:w-[180px] group-hover:h-[180px] group-hover:top-[-20%] group-hover:left-2/4 group-hover:blur-0" />
      <div className="absolute w-[100px] h-[100px] -top-[40%] -left-[20%] rounded-full border-[35px] border-red/10 blur-sm transition-all duration-700 ease-in-out group-hover:w-[140px] group-hover:h-[140px] group-hover:top-[-10%] group-hover:left-1/4 group-hover:blur-0" />

      {/* Text content */}
      <div className="flex-grow p-4 flex flex-col text-[aliceblue] font-bold text-lg">
        <div className="flex  gap-4 p-2  overflow-auto  mb-4  -gray-200 scrollbar-hide">
      <div className="overflow-auto">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-20 h-20  rounded-full "
        />
      </div>
      <div className="flex   text-sm  w-full overflow-auto  ">
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
              <div className=" px-2 py-2 flex rounded-xl bg-red-500 ">
                <button
                  className="  text-white text-xs justify-center text-center item-center    "
                  onClick={() => onDelete(service.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className=" item-center flex justify-center ">
              <div className="  px-1.5 py-1.5 rounded-xl bg-green-500">
                <button
                  className="text-white text-xs justify-center text-center item-center "
                  onClick={() => onConfirm(service.id, count)}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>

      
    </div>
  );
};

export default ServiceBookingPage;
