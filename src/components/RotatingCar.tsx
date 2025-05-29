import React from 'react';
import carImg from '../assets/AUDI CAR.png'; // Ensure this is a valid path

const OrbitingCar = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            {/* Centered circular area */}
            <div className="relative w-full h-[500px]">
                {/* Center point */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* This element orbits around the center */}
                    <div className="animate-orbit">
                        <img
                            src={carImg}
                            alt="Orbiting Car"
                            className="w-[700px] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrbitingCar;
