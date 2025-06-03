// import React from 'react';
// import carImg from '../assets/AUDI CAR.png'; // Ensure this is a valid path

// const OrbitingCar = () => {
//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-300">
//             {/* Centered circular area */}
//             <div className="relative w-full h-[500px]">
//                 {/* Center point */}
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     {/* This element orbits around the center */}
//                     <div className="animate-orbit">
//                         <img
//                             src={carImg}
//                             alt="Orbiting Car"
//                             className="w-[700px] h-auto"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrbitingCar;


import React from 'react';
import carImg from '../assets/AUDI CAR.png';
import carImg1 from '../assets/CAR ANNUAL MAINTENANCE/Annual maintenance.jpg';
import carImg2 from '../assets/CAR AC/Car ac.jpg';
import carImg3 from '../assets/CAR BATTERY/CAR BATTERY.jpg';
import carImg4 from '../assets/CAR BRAKES/Car brakes.jpg';
import carImg5 from '../assets/CAR BUMPER/Car bumper.jpg';

const MovingCar = () => {
    const cars = [
        { id: 1, img: carImg, delay: 2 },
        { id: 2, img: carImg1, delay: 4 },
        { id: 3, img: carImg2, delay: 6 },
        { id: 4, img: carImg3, delay: 8 },
        { id: 5, img: carImg4, delay: 10 },
        { id: 6, img: carImg5, delay: 12 }
    ];

    return (
        <div className="flex items-center justify-center h-[350px] w-full bg-gradient-to-r from-red-400 to-red-900">
            <div className="relative w-full h-full overflow-hidden">
                <h1 className='text-center py-2 font-semibold text-red-900 text-2xl'>PRODUCTS WE HAVE</h1>
                <hr className="w-[250px] border-[1px] border-red-900 mx-auto" />

                {cars.map((car) => (
                    <img
                        key={car.id}
                        src={car.img}
                        alt={`Moving Car ${car.id}`}
                        className="w-[200px] h-[200px] absolute"
                        style={{
                            animation: `moveHorizontal 12s linear infinite ${car.delay}s`,
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
        @keyframes moveHorizontal {
          0% { left: 0; transform: translate(-100%, -50%); }
          100% { left: 100%; transform: translate(0, -50%); }
        }
      `}</style>
        </div>
    );
};

export default MovingCar;