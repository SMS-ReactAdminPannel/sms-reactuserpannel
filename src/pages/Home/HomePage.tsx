import { ImageCarousel } from '../../components/home/ImageCarousel';
import image1 from '../../assets/home/360_F_496483060_C9OG1wJpfmjMXcNmUBibmA9wYxxZCxnW.jpg';
import image2 from '../../assets/home/360_F_507812981_dGZXqBsqkBpEosDjTlJgmaJAyMFra7sp.jpg';
import image3 from '../../assets/home/hand-mechanic-holding-car-service-600nw-2340377479.webp';
import image4 from '../../assets/home/istockphoto-1387759698-612x612.jpg';
// import CarImg1 from '../../assets/CarImg1.jpg';
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


// image
import Roadsideassistant from '../../assets/CAR ROADSIDE/Roadside assistant.jpg'
import Prebooking from '../../assets/CAR PREBOOKING/Prebooking.jpg'
import Annualmaintenance from '../../assets/CAR ANNUAL MAINTENANCE/Annual maintenance.jpg'
import appimage from '../../assets/LOGO.jpg'



// icon for footer
import { FaPhoneFlip } from "react-icons/fa6";// phone
import { MdEmail } from "react-icons/md";// mail
import { FaSquareWhatsapp } from "react-icons/fa6";//whatsapp
import { FaInstagramSquare } from "react-icons/fa";//telegram
import { FaXTwitter } from "react-icons/fa6";//twitter
import { FaFacebook } from "react-icons/fa";//facebook
import { FaYoutube } from "react-icons/fa"//youtube
import { SiIndeed } from "react-icons/si";//indeed
import { BiLogoPlayStore } from "react-icons/bi";//play store
import { FaCcVisa } from "react-icons/fa";//visa card
import { FaCcMastercard } from "react-icons/fa6";

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
									className='rounded-lg h-72 hover:scale-104'
									src={Roadsideassistant}
								/>
							</div>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Road Side Service</h1>
								<h2 className='text-base py-2'>
									Roadside assistance, also known as breakdown coverage, 
									is a service that assists motorists, motorcyclists, 
									or bicyclists whose vehicles have suffered a mechanical 
									failure that either cannot be resolved by the motorist, 
									or has prevented them from reasonably or effectively 
									transporting the vehicle to an automobile repair ...
								</h2>
								<div className='flex gap-4 text-sm py-2 '>
									<p>Service workshop open all 7 days</p>
									<p>Live status updates of your service</p>
								</div>
								<div className='flex gap-9 text-sm '>
									<p>Service pick up & drop facility</p>
									<p>Easy booking </p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-red-900 py-2 px-3 mt-5 hover:underline'>
									Book Service
								</button>
							</div>
						</div>
					</div>
					<div>
						<div className='flex mt-10 justify-around gap-10'>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Prebooking For Maintenance</h1>
								<h2 className='text-base py-2'>
									When it comes to visiting a repair shop for vehicle maintenance or repairs, 
									planning ahead and scheduling an appointment can offer significant advantages 
									over showing up last minute. While it may be tempting to drop by spontaneously, 
									the benefits of scheduling appointments beforehand can streamline your experience,
									 save time, and ensure that you receive the attention your vehicle deserves.
									  Here are a few facts that make scheduling an appointment a much better and 
									  safer approach to repair shop procedures:
								</h2>
								<div className='flex gap-4 text-sm py-2 '>
									<p>Available all 7 days</p>
									<p>Status updates of your service will be clear</p>
								</div>
								{/* <div className='flex gap-4 text-sm '>
									<p>Service pick up & drop facility</p>
									<p>Easy booking through WhatsApp</p>
								</div> */}
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-red-900 py-2 px-3 mt-5 hover:underline'>
									Book Service
								</button>
							</div>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72 hover:scale-104 '
									src={Prebooking}
								/>
							</div>
						</div>
					</div>
					<div>
						<div className='flex mt-10 justify-around gap-10'>
							<div>
								<img
									style={{ width: '500px' }}
									className='rounded-lg h-72 hover:scale-104'
									src={Annualmaintenance}
								/>
							</div>
							<div className='w-1/2 mt-6'>
								<h1 className='font-bold text-2xl'>Annual Maintenance Scheme</h1>
								<h2 className='text-base py-2'>
									Customers also get cost savings by eliminating unexpected
									 maintenance and repair, and the service provider has a picture 
									 of what types of jobs they can expect. Create a deeper understanding
									   of your scheduling and hiring needs.
								</h2>
								<div className='flex gap-4 text-sm py-2'>
									<p>Lengthen asset lifespan</p>
									<p>Lower risk of breakdowns</p>
								</div>
								<div className='flex gap-12 text-sm '>
									<p>Increase efficiency</p>
									<p>Save money</p>
								</div>
								<button className='bg-gradient-to-r from-red-600 to-red-800 text-red-900 py-2 px-3 mt-5 hover:underline'>
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
				{/* FOOTER START */}
				<footer>
					<div className="grid grid-cols-4 gap-4 p-4 bg-[#fdefe9] border-0 rounded-3xl">
						{/* Image Card - Full Height (No border) */}
						<div className="col-span-1 p-4 rounded h-full border-0">
							<img src={appimage} alt="appimage" className="p-2 h-[200px] w-[400px] object-cover rounded" />
						</div>

						{/* Remaining Cards - Full Width (No border) */}
						<div className="col-span-3 grid grid-cols-3 gap-6 p-6 w-full border-0">
							<div className="p-4 rounded bg-[#fdefe9] w-full h-full border-0">
								<p className="text-red-900 font-bold text-3xl">About</p>
								<ol className="py-3 text-red-900 text-xl">
									<li className="py-3">About Us</li>
									<li className="py-3">Contact Us</li>
									<li className="py-3">Location</li>
								</ol>
							</div>

							<div className="p-4 rounded bg-[#fdefe9] w-full h-full border-0">
								<p className="text-red-900 font-bold text-3xl">About</p>
								<ol className="py-3 text-red-900 text-xl">
									<li className="py-3">About Us</li>
									<li className="py-3">Contact Us</li>
									<li className="py-3">Location</li>
								</ol>
							</div>

							<div className="p-4 rounded bg-[#fdefe9] w-full h-full border-0">
								<p className="text-red-900 font-bold text-3xl">About</p>
								<ol className="py-3 text-red-900 text-xl">
									<li className="py-3">About Us</li>
									<li className="py-3">Contact Us</li>
									<li className="py-3">Location</li>
								</ol>
							</div>
							<div className='w-[900px]'>
								<div className="grid grid-cols-1 gap-4 p-4">
									<div className="">
										<hr className="w-full border-[2px] border-red-900" />

										{/* Text on left, icons on right */}
										<div className="flex justify-between items-center text-red-900 text-xl py-2">
											
											<p className="font-semibold text-base">Download our App</p>

											<div className="flex items-center gap-4">
												<div className="bg-red-900 text-white rounded-full p-2">
													<BiLogoPlayStore />
												</div>
												
											</div>
										</div>
									</div>

									<div className="">
										<hr className="w-full border-[1px] border-red-900" />

										{/* Text on left, icons on right */}
										<div className="">
											<hr className="w-full border-[1px] border-red-900" />

											{/* Text on left, icons on right */}
											<div className="flex justify-between items-center text-red-900 text-xl py-2">
												<p className="font-semibold text-base">Social Media</p>

												<div className="flex items-center gap-4">
													<div className="bg-red-900 text-white rounded-full p-2">
														<FaInstagramSquare />
													</div>
													<div className="bg-red-900 text-white rounded-full p-2">
														<FaXTwitter />
													</div>
													<div className="bg-red-900 text-white rounded-full p-2">
														<FaFacebook />
													</div>
													<div className="bg-red-900 text-white rounded-full p-2">
														<FaYoutube />
													</div>
													<div className="bg-red-900 text-white rounded-full p-2">
														<SiIndeed />
													</div>
												</div>
											</div>
										</div>

									</div>

									<div className="">
										<hr className="w-full border-[1px] border-red-900" />

										{/* Text on left, icons on right */}
										<div className="">
											<hr className="w-full border-[1px] border-red-900" />

											{/* Text on left, icons on right */}
											<div className="flex justify-between items-center text-red-900 text-xl py-2">
												<p className="font-semibold text-base">Contact Us</p>

												<div className="flex items-center gap-4">
													<div className="bg-red-900 text-white rounded-full p-2">
														<FaPhoneFlip />
													</div>
													<div className="bg-red-900 text-white rounded-full p-2">
														<MdEmail />
													</div>
													<div className="bg-red-900 text-white rounded-full p-2">
														<FaSquareWhatsapp />
													</div>
												</div>
											</div>
										</div>
										<div className="bg-red-900 text-white rounded-full p-3 inline-flex items-center justify-center">
											<FaCcMastercard className="text-xl" />
										</div>


										<div className="bg-red-900 text-white rounded-full p-3 inline-flex items-center justify-center">
											<FaCcMastercard className="text-xl" />
										</div>

										

									</div>

								</div>

							</div>
						</div>
						
					</div>


				</footer>
				{/* FOOTER END */}
			</div>
		</>
	);
};

export default HomePage;
