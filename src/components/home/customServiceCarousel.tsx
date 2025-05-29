// AVAILABLE SPARE PARTS CONTENT

import React from 'react';
import Batterys from '../../assets/CAR BATTERY/CAR BATTERY.jpg';
import overallparts from '../../assets/CAR OVERALL PARTS/Car overall parts.webp';
import Mirror from '../../assets/MIRROR/REAR MIRROR.jpg';
import Brakes from '../../assets/CAR BRAKES/Car brakes.jpg';
import Acparts from '../../assets/CAR AC/Car ac.jpg';
import Engineservise from '../../assets/CAR ENGINE SERVISE/Engine servise.jpg';
import Tyre from '../../assets/TYRE/BACKSIDETYRE.jpg';
import Gearbox from '../../assets/CAR GEAR/car gear.jpg';
import Oil from '../../assets/CAR OIL/OIL.jpg';
import Suspension from '../../assets/CAR SUSPENSION/Car suspension.jpg';
import Bumper from '../../assets/CAR BUMPER/Car bumper.jpg';
import Differential from '../../assets/CAR DIFFERENTIAL/Car differential.jpg';
import Steering from '../../assets/CAR STEERING/Car steering.jpg';
import Catalyticconverter from '../../assets/CATALYTIC CONVERTER/Catalytic converter.jpg';
import Muffler from '../../assets/CAR MUFFLER/Car muffler.jpg';
import { FONTS } from '../../constants/constant';

interface ServiceItem {
	title: string;
	image: string;
	label?: string;
}

const services: ServiceItem[] = [
	{ title: 'Batteries', image: Batterys, label: 'Offer' },
	{ title: 'Overall parts', image: overallparts },
	{ title: 'Mirror', image: Mirror },
	{ title: 'Brakes', image: Brakes },
	{ title: 'AC Parts', image: Acparts },
	{ title: 'Engine Servise', image: Engineservise, label: 'New' },
	{ title: 'Tyre', image: Tyre },
	{ title: 'Gear', image: Gearbox, label: 'New' },
	{ title: 'Oil', image: Oil },
	{ title: 'Suspension', image: Suspension },
	{ title: 'BUMPER', image: Bumper },
	{ title: 'Differential', image: Differential, label: 'Offer' },
	{ title: 'Steering', image: Steering },
	{ title: 'Catalytic converter', image: Catalyticconverter },
	{ title: 'Muffler', image: Muffler, label: 'Offer' },
];

const CustomServicesGrid: React.FC = () => {
	return (
		<div className='pt-4'>
			<h2
				className='text-3xl font-bold text-red-900 text-center pb-6'
				style={{ ...FONTS.header, fontWeight: 600 }}
			>
				Available Spare Parts
			</h2>
			<div className='grid grid-cols-5 gap-4'>
				{services.map((item, idx) => (
					<div
						key={idx}
						className='bg-[#E5D0AC] rounded-lg p-2 shadow-3xl hover:shadow-4xl hover:scale-102 transition-transform duration-300 text-center text-red-900 relative '
					>
						<div className='w-full h-[150px]  bg-white flex items-center justify-center overflow-hidden rounded'>
							<img
								src={item.image}
								alt={item.title}
								className='w-full h-full object-cover'
							/>
						</div>
						{item.label && (
							<span
								className='absolute top-1 left-[198px] -translate-x-1/2 bg-green-600 text-white font-semibold text-[10px] 
								px-2 py-0.5 rounded'
							>
								{item.label}
							</span>
						)}
						<p className='mt-3' style={{ ...FONTS.paragraph, fontWeight: 600 }}>
							{item.title}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomServicesGrid;
