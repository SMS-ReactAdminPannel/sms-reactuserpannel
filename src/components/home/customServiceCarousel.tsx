// AVAILABLE SPARE PARTS CONTENT

import React, { useEffect, useRef, useState } from 'react';
// import Batterys from '../../assets/CAR BATTERY/CAR BATTERY.jpg';
// import overallparts from '../../assets/CAR OVERALL PARTS/Car overall parts.webp';
// import Mirror from '../../assets/MIRROR/REAR MIRROR.jpg';
// import Brakes from '../../assets/CAR BRAKES/Car brakes.jpg';
// import Acparts from '../../assets/CAR AC/Car ac.jpg';
// import Engineservise from '../../assets/CAR ENGINE SERVISE/Engine servise.jpg';
// import Tyre from '../../assets/TYRE/BACKSIDETYRE.jpg';
// import Gearbox from '../../assets/CAR GEAR/car gear.jpg';
// import Oil from '../../assets/CAR OIL/OIL.jpg';
// import Suspension from '../../assets/CAR SUSPENSION/Car suspension.jpg';
// import Bumper from '../../assets/CAR BUMPER/Car bumper.jpg';
// import Differential from '../../assets/CAR DIFFERENTIAL/Car differential.jpg';
// import Steering from '../../assets/CAR STEERING/Car steering.jpg';
// import Catalyticconverter from '../../assets/CATALYTIC CONVERTER/Catalytic converter.jpg';
// import Muffler from '../../assets/CAR MUFFLER/Car muffler.jpg';
import { FONTS } from '../../constants/constant';
import { getHomeData } from '../../features/home';
import DummyImage from '../../assets/CAR BRAKES/Car brakes.jpg';
//import SpareParts from '../../pages/Spare-Parts/Spareparts';

// interface ServiceItem {
// 	title: string;
// 	image: string;
// 	label?: string;
// }

// Custom hook for Scroll Animation

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

// const services: ServiceItem[] = [
// 	{ title: 'Batteries', image: Batterys, label: 'Offer' },
// 	{ title: 'Overall parts', image: overallparts },
// 	{ title: 'Mirror', image: Mirror },
// 	{ title: 'Brakes', image: Brakes },
// 	{ title: 'AC Parts', image: Acparts },
// 	{ title: 'Engine Servise', image: Engineservise, label: 'New' },
// 	{ title: 'Tyre', image: Tyre },
// 	{ title: 'Gear', image: Gearbox, label: 'New' },
// 	{ title: 'Oil', image: Oil },
// 	{ title: 'Suspension', image: Suspension },
// 	{ title: 'BUMPER', image: Bumper },
// 	{ title: 'Differential', image: Differential, label: 'Offer' },
// 	{ title: 'Steering', image: Steering },
// 	{ title: 'Catalytic converter', image: Catalyticconverter },
// 	{ title: 'Muffler', image: Muffler, label: 'Offer' },
// ];

const CustomServicesGrid: React.FC = () => {
	const [spareParts, setSpareParts] = useState<any[]>([]);

	const spareTitle = useScrollAnimation<HTMLHeadingElement>();

	useEffect(() => {
		const fetchSpareParts: any = async () => {
			try {
				const response = await getHomeData({});
				if (response) {
					setSpareParts(response.data.data);
					console.log(response.data.data);
				}
			} catch (error) {
				console.error('Error fetching spare parts data:', error); // ✅ Log error
				throw new Error('Error fetching spare parts data'); // ❌ Move this after logging or remove if not needed
			}
		};

		fetchSpareParts();
	}, []);

	return (
		<div className='py-10'>
			<h1
				ref={spareTitle.elementRef}
				className='text-2xl mb-10 text-red-900 text-center'
				style={{ ...FONTS.heading }}
			>
				<span className='inline-block pb-1 relative'>
					Available Spare Parts
					<span
						className={`absolute top-10 left-1/2 h-[1px] bg-[#9b111e] transform -translate-x-1/2 origin-center transition-all duration-700 ${
							spareTitle.isVisible ? 'scale-x-100 w-full' : 'scale-x-0 w-full'
						}`}
					></span>
				</span>
			</h1>
			<div className='grid grid-cols-5 gap-10'>
				{spareParts.map((item) => (
					<div
						key={item._id}
						className='bg-[#E5D0AC] rounded-lg p-2 shadow-3xl hover:shadow-4xl hover:scale-102 transition-transform duration-300 text-center text-red-900 relative '
					>
						<div className='w-full h-[125px] bg-white flex items-center justify-center overflow-hidden rounded'>
							<img
								src={DummyImage}
								alt={item.productName}
								className='w-full h-full object-cover'
							/>
						</div>
						{item.label && (
							<span
								className='absolute top-1 left-[198px] -translate-x-1/2 bg-green-600 text-white font-semibold text-[10px] 
								px-2 py-0.5 rounded'
							>
								{item.brand}
							</span>
						)}
						<p className='mt-3' style={{ ...FONTS.paragraph, fontWeight: 600 }}>
							{item.productName}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomServicesGrid;
