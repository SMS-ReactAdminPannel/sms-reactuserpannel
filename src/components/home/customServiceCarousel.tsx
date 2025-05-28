import React, { useState } from 'react';
import carImage from '../../assets/home/hand-mechanic-holding-car-service-600nw-2340377479.webp';

interface ServiceItem {
	title: string;
	image: string;
	label?: string; // "SALE", "NEW", etc.
}

const services: ServiceItem[] = [
	{ title: 'Batteries', image: carImage, label: 'SALE' },
	{ title: 'Brakes', image: carImage },
	{ title: 'AC Parts', image: carImage },
	{ title: 'Brakes', image: carImage },
	{ title: 'AC Parts', image: carImage },
	{ title: 'Clutch', image: carImage, label: 'NEW' },
	{ title: 'Clutch', image: carImage, label: 'NEW' },
	{ title: 'Clutch', image: carImage, label: 'NEW' },
	{ title: 'Clutch', image: carImage, label: 'NEW' },
];

const CustomServicesCarousel: React.FC = () => {
	const [scrollIndex, setScrollIndex] = useState(0);

	const scrollLeft = () => {
		setScrollIndex((prev) => Math.max(prev - 1, 0));
	};

	const scrollRight = () => {
		setScrollIndex((prev) => Math.min(prev + 1, services.length - 1));
	};

	return (
		<div className='my-8'>
			<h2 className='text-3xl font-bold mb-4 text-red-900'>
				Available Spare Parts
			</h2>
			<div className='relative flex items-center'>
				{/* Left arrow */}
				<button
					className='absolute left-0 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100'
					onClick={scrollLeft}
				>
					❮
				</button>

				{/* Carousel Items */}
				<div className='w-full overflow-hidden mx-auto'>
					<div
						className='flex transition-transform duration-300 ease-in-out gap-8'
						style={{ transform: `translateX(-${scrollIndex * 100}px)` }}
					>
						{services.map((item, idx) => (
							<div
								key={idx}
								className='flex-shrink-0 w-36 text-center relative'
							>
								<img
									src={item.image}
									alt={item.title}
									className='w-24 h-24 mx-auto'
								/>
								{item.label && (
									<span className='absolute top-2 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-0.5 rounded'>
										{item.label}
									</span>
								)}
								<p className='mt-2 font-medium'>{item.title}</p>
							</div>
						))}
					</div>
				</div>

				{/* Right arrow */}
				<button
					className='absolute right-0 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100'
					onClick={scrollRight}
				>
					❯
				</button>
			</div>
		</div>
	);
};

export default CustomServicesCarousel;
