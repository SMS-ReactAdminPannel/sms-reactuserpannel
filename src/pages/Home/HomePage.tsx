import { ImageCarousel } from '../../components/home/ImageCarousel';
// import image1 from '../../assets/home/360_F_496483060_C9OG1wJpfmjMXcNmUBibmA9wYxxZCxnW.jpg';
// import image2 from '../../assets/home/360_F_507812981_dGZXqBsqkBpEosDjTlJgmaJAyMFra7sp.jpg';
// import image3 from '../../assets/home/hand-mechanic-holding-car-service-600nw-2340377479.webp';
// import image4 from '../../assets/home/istockphoto-1387759698-612x612.jpg';
import image1 from '../../assets/carimages/pexels-cottonbro-4489749.jpg'
import image2 from '../../assets/carimages/pexels-artempodrez-8986070.jpg'
import image3 from '../../assets/carimages/pexels-cottonbro-4489732.jpg'
import image4 from '../../assets/carimages/pexels-ronaldo-galeano-2428202-4069389.jpg'
import CarImg1 from '../../assets/CarImg1.jpg';
import { GrWorkshop } from 'react-icons/gr';
import { LuCarTaxiFront } from 'react-icons/lu';
import { PiSealCheckBold } from 'react-icons/pi';
import { LuHandshake } from 'react-icons/lu';
import { RiShieldStarFill } from 'react-icons/ri';
import { MdDateRange } from 'react-icons/md';
import { MdHomeFilled } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { TbCertificate } from 'react-icons/tb';
import { RiCustomerService2Fill } from 'react-icons/ri';
import MustCare from '../../components/bookings/BookingsPage';
import { COLORS } from '../../constants/constant';
import React from 'react';
import {
	FaTools,
	FaSnowflake,
	FaBatteryThreeQuarters,
	FaTruckMonster,
	FaCarAlt,
	FaSearch,
	FaLightbulb,
	FaCarCrash,
	FaCarSide,
	FaFileSignature,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PromoCarousel from '../../components/home/offerCard';
import CustomServicesCarousel from '../../components/home/customServiceCarousel';

const imageUrls = [image1, image2, image3, image4];
interface ServiceCardProps {
	id: number;
	icon: React.ReactNode;
	title: string;
	color: string;
}

const HomePage: React.FC = () => {
	const cardData: ServiceCardProps[] = [
		{
			id: 1,
			icon: <FaTools size={24} />,
			title: 'Periodic Services',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 2,
			icon: <FaSnowflake size={24} />,
			title: 'Ac Services & Repair',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 3,
			icon: <FaBatteryThreeQuarters size={24} />,
			title: 'Batteries',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 4,
			icon: <FaTruckMonster size={24} />,
			title: 'Tyres and Wheel Care',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 5,
			icon: <FaCarAlt size={24} />,
			title: 'Detailing Services',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 6,
			icon: <FaSearch size={24} />,
			title: 'Car Inspection',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 7,
			icon: <FaLightbulb size={24} />,
			title: 'Windshields & Lights',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 8,
			icon: <FaCarCrash size={24} />,
			title: 'Suspension & Fitments',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 9,
			icon: <FaCarSide size={24} />,
			title: 'Clutch & Body Parts',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 10,
			icon: <FaFileSignature size={24} />,
			title: 'Insurance Claims',
			color: 'bg-white border-[#9b111e]',
		},
	];
	return (
		<>
			<ImageCarousel images={imageUrls} interval={2000} />
			<div className='px-6'>
				<div className='my-3'>
					<h1 className='font-bold text-3xl mb-10 text-red-900'>
						Available Services
					</h1>
					<div className='grid grid-cols-5 grid-rows-2 gap-4 max-w-6xl mx-auto mb-5'>
						{cardData.map((card) => (
							<Link
								to={`/services`}
								key={card.id}
								className={`${card.color} border-2 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105`}
							>
								<div className='text-[#9b111e] mb-2 pl-[80px]'>
									{card.icon}{' '}
								</div>
								<h3 className='text-center font-medium hover '>{card.title}</h3>
							</Link>
						))}
					</div>
				</div>
				<PromoCarousel />
				<CustomServicesCarousel />
				<div className='my-4'>
					<h1 className='font-bold text-3xl mb-10 text-red-900'>
						Yes Mechanic Care Advantages
					</h1>
					<div className='flex space-x-6 items-center justify-center'>
						<div className='border-r border-gray-600 pr-6 text-center'>
							<div className='ml-20'>
								<MdHomeFilled size={32} color={COLORS.primary} />
							</div>
							<p className='font-bold text-xl mt-3'>4000+</p>
							<p>Authorized Service Centers</p>
						</div>
						<div className='border-r border-gray-600 pr-6 pl-6 text-center'>
							<div className='ml-20'>
								<FaLocationDot size={32} color={COLORS.primary} />
							</div>
							<p className='font-bold text-xl mt-3'>3800+</p>
							<p>Cities Nationwise Connected</p>
						</div>
						<div className='border-r border-gray-600 pr-6 pl-6 text-center'>
							<div className='ml-14'>
								<TbCertificate size={32} color={COLORS.primary} />
							</div>
							<p className='font-bold text-xl mt-3'>5000+</p>
							<p>Certified Technicians</p>
						</div>
						<div className='pl-6 text-center'>
							<div className='ml-20'>
								<RiCustomerService2Fill size={32} color={COLORS.primary} />
							</div>
							<p className='font-bold text-xl mt-3'>10+ yrs</p>
							<p>Of Customer Care Expertise</p>
						</div>
					</div>
					<div>
						<MustCare />
					</div>

					<div>
						<h1 className='text-3xl font-bold text-red-900'>
							Discover All Services
						</h1>
						<div className='flex mt-5 justify-around gap-10'>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72'
									src={CarImg1}
								/>
							</div>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Book a Service</h1>
								<h2 className='text-lg'>
									Say goodbye to service booking woes. Enjoy the convenience of
									booking a service from anywhere through WhatsApp and get live
									status updates on-the-go.
								</h2>
								<div className='flex gap-4 '>
									<p>Service workshop open all 7 days</p>
									<p>Live status updates of your service</p>
								</div>
								<div className='flex gap-4'>
									<p>Service pick up & drop facility</p>
									<p>Easy booking through WhatsApp</p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-3 mt-5'>
									Book Service
								</button>
							</div>
						</div>
					</div>
					<div>
						<div className='flex mt-10 justify-around gap-10'>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Book a Service</h1>
								<h2 className='text-lg'>
									Say goodbye to service booking woes. Enjoy the convenience of
									booking a service from anywhere through WhatsApp and get live
									status updates on-the-go.
								</h2>
								<div className='flex gap-4 '>
									<p>Service workshop open all 7 days</p>
									<p>Live status updates of your service</p>
								</div>
								<div className='flex gap-4'>
									<p>Service pick up & drop facility</p>
									<p>Easy booking through WhatsApp</p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-3 mt-5'>
									Book Service
								</button>
							</div>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72'
									src={CarImg1}
								/>
							</div>
						</div>
					</div>
					<div>
						<div className='flex mt-10 justify-around gap-10'>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72'
									src={CarImg1}
								/>
							</div>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Book a Service</h1>
								<h2 className='text-lg'>
									Say goodbye to service booking woes. Enjoy the convenience of
									booking a service from anywhere through WhatsApp and get live
									status updates on-the-go.
								</h2>
								<div className='flex gap-4 '>
									<p>Service workshop open all 7 days</p>
									<p>Live status updates of your service</p>
								</div>
								<div className='flex gap-4'>
									<p>Service pick up & drop facility</p>
									<p>Easy booking through WhatsApp</p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-3 mt-5'>
									Book Service
								</button>
							</div>
						</div>
					</div>
					<div>
						<div className='flex mt-10 justify-around gap-10'>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Book a Service</h1>
								<h2 className='text-lg'>
									Say goodbye to service booking woes. Enjoy the convenience of
									booking a service from anywhere through WhatsApp and get live
									status updates on-the-go.
								</h2>
								<div className='flex gap-4 '>
									<p>Service workshop open all 7 days</p>
									<p>Live status updates of your service</p>
								</div>
								<div className='flex gap-4'>
									<p>Service pick up & drop facility</p>
									<p>Easy booking through WhatsApp</p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-3 mt-5'>
									Book Service
								</button>
							</div>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72'
									src={CarImg1}
								/>
							</div>
						</div>
					</div>
					<div>
						<div className='flex mt-10 justify-around gap-10'>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72'
									src={CarImg1}
								/>
							</div>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Book a Service</h1>
								<h2 className='text-lg'>
									Say goodbye to service booking woes. Enjoy the convenience of
									booking a service from anywhere through WhatsApp and get live
									status updates on-the-go.
								</h2>
								<div className='flex gap-4 '>
									<p>Service workshop open all 7 days</p>
									<p>Live status updates of your service</p>
								</div>
								<div className='flex gap-4'>
									<p>Service pick up & drop facility</p>
									<p>Easy booking through WhatsApp</p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-3 mt-5'>
									Book Service
								</button>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h1 className='text-3xl text-center mt-16 font-bold text-red-900'>
						Customised Care For All Your Needs
					</h1>
					<div className='flex justify-center gap-10 mt-10 flex-wrap'>
						<div className='flex flex-col items-center text-center'>
							<GrWorkshop size={30} color={COLORS.primary} />
							<p className='mt-3'>
								Service Workshop
								<br />
								Open All 7 Days
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<LuCarTaxiFront size={30} color={COLORS.primary} />
							<p className='mt-3'>
								Service Pick Up
								<br />& Drop Facility
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<PiSealCheckBold size={30} color={COLORS.primary} />
							<p className='mt-3'>
								Yesmechanic Genuine Parts
								<br />& Oil
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<LuHandshake size={30} color={COLORS.primary} />
							<p className='mt-3'>
								Annual Maintenance
								<br />
								Plan Coverage
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<RiShieldStarFill size={30} color={COLORS.primary} />
							<p className='mt-3'>
								5 Years Standard
								<br />
								Warranty
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<MdDateRange size={30} color={COLORS.primary} />
							<p className='mt-3'>
								24 x 7 Assistance
								<br />
								Through RSA
							</p>
						</div>
					</div>
				</div>
				<div
					className='mt-10 p-10 text-white rounded-lg bg-cover bg-center'
					style={{ backgroundImage: `url(${CarImg1})` }}
				>
					<h1 className='font-bold text-3xl border-b-4 border-red-500 inline-block mb-2'>
						User Manual
					</h1>
					<p className='mb-4'>
						Get your vehicle's service-related information like technical
						features, warranty information and much more!
					</p>
					<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 rounded'>
						Know More
					</button>
				</div>
				<div
					className='mt-10 p-10 text-white rounded-lg bg-cover bg-center'
					style={{ backgroundImage: `url(${CarImg1})` }}
				>
					<h1 className='font-bold text-3xl border-b-4 border-red-500 inline-block mb-2'>
						Yesmechanic Genuine Parts
					</h1>
					<p>
						Because you deserve only the best, TVS Genuine Parts & True Oil
						ensure longer product lifespans, perfect compatibility, and higher
						resistance to wear and tear
					</p>
					<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 rounded'>
						Know More
					</button>
				</div>
			</div>
		</>
	);
};

export default HomePage;
