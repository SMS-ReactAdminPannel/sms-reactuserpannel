import React, { useEffect, useRef, useState } from 'react';
import { getOfferData } from '../../features/Offers';
// import { toast } from 'react-toastify';

interface PromoCardProps {
	title: string;
	points: string[];
	image: string;
	cta: string;
	description: string;
	offer: string;
}

const PromoCarousel: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout>(null);
	const [announcements, setAnnouncements] = useState<PromoCardProps[]>([]);

	const fetchOfferData = async () => {
		try {
			const response = (await getOfferData()) as any;
			if (response) {
				setAnnouncements(response?.data?.data);
			}
		} catch (error) {
			console.error('Error fetching service data:', error);
		}
	};

	useEffect(() => {
		fetchOfferData();
	}, []);

	// Auto-scroll logic
	useEffect(() => {
		if (announcements.length === 0) return;

		const startInterval = () => {
			intervalRef.current = setInterval(() => {
				setCurrentIndex((prev) =>
					prev === announcements.length - 1 ? 0 : prev + 1
				);
			}, 3000);
		};

		if (!isHovered) {
			startInterval();
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isHovered, announcements.length]);

	const handleMouseEnter = () => {
		setIsHovered(true);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	// const handleApplyOffer = () => {
	// 	toast.success('Offer applied successfully!');
	// };

	return (
		<div
			className='w-full max-w-6xl mx-auto my-auto relative overflow-hidden rounded-2xl'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className='flex transition-transform duration-500 ease-in-out'
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{announcements?.map((card, idx) => (
					<div
						key={idx}
						className='min-w-full p-6 bg-[#0050A5] flex items-center justify-between'
					>
						{/* Image Section */}
						<div className='w-full flex justify-center items-center'>
							<div className='w-[670px] h-[300px] p-6 rounded overflow-hidden flex justify-center items-center'>
								<img
									src={card?.image}
									alt={card?.title}
									className='w-full h-full object-cover text-white'
								/>
							</div>
						</div>

						{/* Text Section */}
						<div className='w-1/2 px-4 flex flex-col items-start gap-10 '>
							<div>
								<h2 className='text-white text-3xl font-bold leading-tight mb-2'>
									{card?.title} <span className='inline-block'>✨</span>
									<br />
									<span className='text-xl'>{card?.description}</span>
								</h2>
								<div className='mt-3 text-green-900 inline-block px-2 rounded-lg font-bold bg-[#f1ff31] text-lg mb-4 space-y-1 list-disc list-inside'>
									<p>Offer Price : &#8377; {card?.offer}</p>
								</div>
							</div>
							{/* <button
								className='bg-white font-semibold py-2 px-4 rounded-lg transition-all text-[#0050A5]'
								onClick={handleApplyOffer}
							>
								Apply Offer
							</button> */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PromoCarousel;
