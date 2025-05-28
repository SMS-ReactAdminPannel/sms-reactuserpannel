import React, { useState } from 'react';
import carImage from '../../assets/CarPart2.jfif'

interface PromoCardProps {
	title: string;
	subtitle: string;
	points: string[];
	image: string;
	cta: string;
}

const promoCards: PromoCardProps[] = [
	{
		title: 'GoShine',
		subtitle: 'Combo',
		points: ['Shine More, Pay Less', '3 Washes + 1 Deep Spa!'],
		image: carImage,
		cta: 'BUY NOW',
	},
	{
		title: 'SuperClean',
		subtitle: 'Offer',
		points: ['Weekly Wash Pack', 'Includes Vacuuming'],
		image: carImage,
		cta: 'GET DEAL',
	},
	{
		title: 'WaxPro',
		subtitle: 'Deluxe',
		points: ['2 Coats of Wax', 'Full Body Polish'],
		image: carImage,
		cta: 'BOOK NOW',
	},
];

const PromoCarousel: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevCard = () => {
		setCurrentIndex((prev) => (prev === 0 ? promoCards.length - 1 : prev - 1));
	};

	const nextCard = () => {
		setCurrentIndex((prev) => (prev + 1) % promoCards.length);
	};

	return (
		<div className='w-full max-w-3xl mx-auto relative'>
			{/* Cards */}
			<div className='overflow-hidden rounded-3xl'>
				<div
					className='flex transition-transform duration-500 ease-in-out'
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{promoCards.map((card, idx) => (
						<div
							key={idx}
							className='min-w-full p-6 bg-red-900 flex items-center justify-between'
						>
							<div className='w-1/2'>
								<img
									src={card.image}
									alt={card.title}
									className='w-full h-auto object-contain'
								/>
							</div>
							<div className='w-1/2 px-4'>
								<h2 className='text-white text-3xl font-bold leading-tight mb-2'>
									{card.title} <span className='inline-block'>✨</span>
									<br />
									{card.subtitle}
								</h2>
								<ul className='text-white text-lg mb-4 space-y-1 list-disc list-inside'>
									{card.points.map((point, i) => (
										<li key={i}>{point}</li>
									))}
								</ul>
								<button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all'>
									{card.cta}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Navigation Dots */}
			<div className='flex justify-center mt-4 space-x-2'>
				{promoCards.map((_, idx) => (
					<button
						key={idx}
						className={`w-3 h-3 rounded-full ${
							idx === currentIndex ? 'bg-red-500' : 'bg-gray-300'
						}`}
						onClick={() => setCurrentIndex(idx)}
					/>
				))}
			</div>

			{/* Arrows */}
			<button
				className='absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full'
				onClick={prevCard}
			>
				‹
			</button>
			<button
				className='absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full'
				onClick={nextCard}
			>
				›
			</button>
		</div>
	);
};

export default PromoCarousel;
