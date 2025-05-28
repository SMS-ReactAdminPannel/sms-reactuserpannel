import React from "react";
import { motion } from "framer-motion";

export default function HomePageIntro() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-sm">
        <div>Phone: +91-1234567890 | Address: Tiruvallur</div>
        <div className="flex gap-4">
          <a href="#">FB</a>
          <a href="#">IG</a>
          <a href="#">X</a>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-6 z-10">
        <img src="/yes-mechanic-logo.png" alt="Yes Mechanic Logo" className="w-40" />
      </div>

      {/* Slide 1 */}
      <motion.section
        className="w-full h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/smiling_mechanics_with_hood_open.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            PROFESSIONAL MECHANICS FOR YOUR CAR
          </h1>
          <div className="flex gap-4 justify-center">
            <button className="bg-black text-white px-6 py-2 rounded-xl shadow">REVIEWS</button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl shadow">BUY NOW</button>
          </div>
        </div>
      </motion.section>

      {/* Slide 2 */}
      <motion.section
        className="w-full h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/black_suv_lift.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">SERVICES FOR YOUR CAR</h1>
          <p className="text-xl mb-6">Professional repair service with fair prices</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-xl shadow">CONTACT NOW</button>
        </div>
      </motion.section>

      {/* Slide 3: Quote Form */}
      <motion.section
        className="w-full h-screen bg-cover bg-center flex items-center justify-end px-10"
        style={{ backgroundImage: "url('/top_view_car_mechanics.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="bg-white text-black p-6 rounded-xl w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Get Instant Quote</h2>
          <select className="w-full p-2 border rounded mb-2">
            <option>Tiruvallur</option>
            <option>Chennai</option>
          </select>
          <select className="w-full p-2 border rounded mb-2">
            <option>Select Car</option>
          </select>
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full p-2 border rounded mb-4"
          />
          <button className="bg-red-600 text-white w-full py-2 rounded">CHECK PRICES FOR FREE</button>
          <p className="text-sm mt-2">Rated 4.0/5 | 2 Million+ happy customers</p>
        </div>
      </motion.section>

      {/* Slide 4 */}
      <motion.section
        className="w-full h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/red_sports_car_lifted.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">THE BEST MECHANIC SERVICES</h1>
          <div className="flex gap-4 justify-center">
            <button className="bg-black text-white px-6 py-2 rounded-xl shadow">OUR SERVICES</button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl shadow">OUR PRICES</button>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
