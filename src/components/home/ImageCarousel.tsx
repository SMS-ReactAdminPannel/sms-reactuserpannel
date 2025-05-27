import React, { useEffect, useState } from 'react';

interface CarouselProps {
	images: string[];
	interval?: number; // optional auto-slide interval in ms
}

export const ImageCarousel: React.FC<CarouselProps> = ({
	images,
	interval = 3000,
}) => {
	const [current, setCurrent] = useState(0);

	// Auto-slide
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, interval);
		return () => clearInterval(timer);
	}, [images.length, interval]);

	const prevSlide = () => {
		setCurrent((prev) => (prev - 1 + images.length) % images.length);
	};

	const nextSlide = () => {
		setCurrent((prev) => (prev + 1) % images.length);
	};

	return (
		<div className='relative w-full mx-auto overflow-hidden rounded-lg shadow-lg'>
			{/* Image container */}
			<div className='w-full h-64 md:h-96'>
				<img
					src={images[current]}
					alt={`Slide ${current}`}
					className='w-full h-full object-cover transition-all duration-500'
				/>
			</div>

			{/* Prev / Next buttons */}
			<button
				onClick={prevSlide}
				className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full'
			>
				‹
			</button>
			<button
				onClick={nextSlide}
				className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full'
			>
				›
			</button>

			{/* Dots */}
			<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						className={`w-3 h-3 rounded-full ${
							current === index ? 'bg-red-800' : 'bg-red-50'
						}`}
					/>
				))}
			</div>
		</div>
	);
};
