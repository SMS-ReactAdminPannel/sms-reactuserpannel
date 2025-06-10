import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type ServiceOffer = {
	title: string;
	discount: number;
	originalPrice: number;
	offerPrice: number;
	image: string;
	badge: string;
};

const serviceOffers: ServiceOffer[] = [
	{
		title: 'Engine Oil Change',
		discount: 25,
		originalPrice: 1200,
		offerPrice: 900,
		image:
			'https://th.bing.com/th/id/OIP.jGn3Tijjvy_OiyA_TulUyQHaEK?cb=iwp2&rs=1&pid=ImgDetMain',
		badge: '🔥 Limited Time',
	},
	{
		title: 'Full Car Service',
		discount: 15,
		originalPrice: 4000,
		offerPrice: 3400,
		image:
			'https://th.bing.com/th/id/OIP.Ykxq8rO6lvEpnJjav7gd7QHaEK?cb=iwp2&rs=1&pid=ImgDetMain',
		badge: '🚗 Best Seller',
	},
	{
		title: 'AC Repair & Service',
		discount: 20,
		originalPrice: 2500,
		offerPrice: 2000,
		image:
			'https://i2.wp.com/carworks-longmont-auto-repair.com/wp-content/uploads/2018/03/car-air-conditioning-maintenance-Longmont.jpg?ssl=1',
		badge: '❄️ Summer Deal',
	},
];

// Scroll - line animation

const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
	options = {}
) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef<T>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
				...options,
			}
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return { elementRef, isVisible };
};

const Offer: React.FC = () => {
	const offerTitle = useScrollAnimation<HTMLHeadingElement>();

	return (
		<div className='p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen'>
			<h1 ref={offerTitle.elementRef} className='text-center  '>
				<span className='inline-block pb-1 relative text-3xl md:text-3xl font-bold text-center text-red-900 mb-10'>
					Yes Mechanic Special Offers
					<span
						className={`absolute top-[42px] left-1/2 h-[1px] bg-[#9b111e] transform -translate-x-1/2 origin-center transition-all duration-700 ${
							offerTitle.isVisible ? 'scale-x-100 w-full' : 'scale-x-0 w-full'
						}`}
					></span>
				</span>
			</h1>

			<h1 className=''></h1>

			<div className='grid gap-6 grid-cols-3 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3'>
				{serviceOffers.map((offer, index) => (
					<motion.div
						key={index}
						whileHover={{ scale: 1.03 }}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.15, duration: 0.5 }}
						className='relative rounded-xl shadow-lg p-4 bg-white/70 backdrop-blur-md border border-white/30'
					>
						<span className='absolute top-2 right-2 bg-red-800 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm'>
							{offer.badge}
						</span>

						<img
							src={offer.image}
							alt={offer.title}
							className='w-full h-32 object-cover rounded-md mb-3'
						/>

						<h2 className='text-lg font-semibold text-gray-800'>
							{offer.title}
						</h2>
						<p className='text-sm text-gray-500 line-through'>
							₹{offer.originalPrice}
						</p>
						<p className='text-green-600 font-bold text-base'>
							₹{offer.offerPrice}{' '}
							<span className='text-sm text-gray-600'>
								({offer.discount}% OFF)
							</span>
						</p>

						<motion.button
							whileTap={{ scale: 0.96 }}
							whileHover={{ scale: 1.05 }}
							className='mt-4 w-full py-2 bg-red-700 hover:bg-red-700 text-white rounded-md font-medium shadow-md transition-all'
						>
							Book Now
						</motion.button>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Offer;
