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
import { MdDateRange, MdOutlineTireRepair } from 'react-icons/md';
import { MdHomeFilled } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { TbCertificate } from 'react-icons/tb';
import { RiCustomerService2Fill } from 'react-icons/ri';
import MustCare from '../../components/bookings/BookingsPage';
import { COLORS, FONTS } from '../../constants/constant';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
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
	FaCircleNotch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PromoCarousel from '../../components/home/offerCard';
import CustomServicesCarousel from '../../components/home/customServiceCarousel';

// image
import Roadsideassistant from '../../assets/CAR ROADSIDE/Roadside assistant.jpg';
import Prebooking from '../../assets/CAR PREBOOKING/Prebooking.jpg';
import Annualmaintenance from '../../assets/CAR ANNUAL MAINTENANCE/Annual maintenance.jpg';
import appimage from '../../assets/LOGO.jpg';
import bgImg from '../../assets/home/aesthetic-background-with-patterned-glass-texture.jpg';
import bgImg2 from '../../assets/home/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product.jpg';
import bgImg3 from '../../assets/home/yakin 41.jpg';

// icon for footer
import { FaPhoneFlip } from 'react-icons/fa6'; // phone
import { MdEmail } from 'react-icons/md'; // mail
import { FaSquareWhatsapp } from 'react-icons/fa6'; //whatsapp
import { FaInstagramSquare } from 'react-icons/fa'; //telegram
import { FaXTwitter } from 'react-icons/fa6'; //twitter
import { FaFacebook } from 'react-icons/fa'; //facebook
import { FaYoutube } from 'react-icons/fa'; //youtube
import { SiIndeed } from 'react-icons/si'; //indeed
import { BiLogoPlayStore } from 'react-icons/bi'; //play store

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
			icon: <FaTools size={42} />,
			title: 'Periodic Services',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 2,
			icon: <FaSnowflake size={42} />,
			title: 'Ac Services & Repair',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 3,
			icon: <FaBatteryThreeQuarters size={42} />,
			title: 'Batteries',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 4,
			icon: <FaCircleNotch size={42} />,
			title: 'Tyres and Wheel Care',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 5,
			icon: <FaCarAlt size={42} />,
			title: 'Detailing Services',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 6,
			icon: <FaSearch size={42} />,
			title: 'Car Inspection',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 7,
			icon: <FaLightbulb size={42} />,
			title: 'Windshields & Lights',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 8,
			icon: <FaCarCrash size={42} />,
			title: 'Suspension & Fitments',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 9,
			icon: <FaCarSide size={42} />,
			title: 'Clutch & Body Parts',
			color: 'bg-white border-[#9b111e]',
		},
		{
			id: 10,
			icon: <FaFileSignature size={42} />,
			title: 'Insurance Claims',
			color: 'bg-white border-[#9b111e]',
		},
	];
	return (
		<>
			<div className='h-[80vh]'>
				<div className='bg-red-900 h-[45px]'></div>
				<ImageCarousel images={imageUrls} interval={2500} />
			</div>
			<div className=''>
				<div className='px-24 my-8 h-[75vh]'>
					<h1
						className='text-2xl mb-10 text-red-900 text-center underline'
						style={{ ...FONTS.header, fontWeight: 600 }}
					>
						Available Services
					</h1>
					<div className='grid grid-cols-5 grid-rows-2 gap-4 max-w-6xl mx-auto mb-5'>
						{cardData.map((card) => (
							<Link
								to={`/services`}
								key={card.id}
								className={`${card.color} rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow ease-in duration-300 cursor-pointer transform hover:scale-102`}
							>
								<div className='text-[#9b111e] mb-4 flex justify-center'>
									{card.icon}
								</div>
								<h3
									className='text-center text-red-700 opacity-75'
									style={{ ...FONTS.paragraph, fontWeight: 550 }}
								>
									{card.title}
								</h3>
							</Link>
						))}
					</div>
				</div>
				<div
					className={`h-[90vh] bg-[url(${bgImg})] flex justify-center items-center`}
				>
					<div className='mx-24'>
						<PromoCarousel />
					</div>
				</div>
				<div className='mx-24'>
					<CustomServicesCarousel />
				</div>
				<div className='mt-4'>
					<div className={`bg-[url(${bgImg2})] h-[95vh]`}>
						<div className='px-24 py-10'>
							<h1
								className='text-3xl text-red-900 text-center pb-10 underline'
								style={{ ...FONTS.header, fontWeight: 600 }}
							>
								Care Advantages
							</h1>
							<div className='flex space-x-6 items-center justify-center'>
								<div className='border-r border-gray-600 pr-6 text-center'>
									<div className='ml-20'>
										<MdHomeFilled size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>4000+</p>
									<p>Authorized Service Centers</p>
								</div>
								<div className='border-r border-gray-600 pr-6 pl-6 text-center'>
									<div className='ml-20'>
										<FaLocationDot size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>3800+</p>
									<p>Cities Nationwise Connected</p>
								</div>
								<div className='border-r border-gray-600 pr-6 pl-6 text-center'>
									<div className='ml-14'>
										<TbCertificate size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>5000+</p>
									<p>Certified Technicians</p>
								</div>
								<div className='pl-6 text-center'>
									<div className='ml-20'>
										<RiCustomerService2Fill size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>10+ yrs</p>
									<p>Of Customer Care Expertise</p>
								</div>
							</div>
							<div className='py-8'>
								<MustCare />
							</div>
						</div>
					</div>

					<div className='px-24 pb-8'>
						<div className='py-12'>
							<h1
								className='text-3xl text-red-900 text-center pb-8 underline'
								style={{ ...FONTS.header, fontWeight: 600 }}
							>
								Discover Our Services
							</h1>
							<div className='flex mt-5 justify-around gap-10'>
								<div>
									<img
										style={{ width: '500px' }}
										className='rounded-lg h-64'
										src={Roadsideassistant}
									/>
								</div>
								<div className='w-1/2 mt-6'>
									<h1
										style={{
											...FONTS.paragraph,
											fontWeight: 600,
											fontSize: '18px',
											color: COLORS.primary,
										}}
									>
										Road Side Service
									</h1>
									<h2
										className='py-2'
										style={{
											...FONTS.paragraph,
											fontSize: '16px',
											textAlign: 'justify',
										}}
									>
										Roadside assistance, also known as breakdown coverage, is a
										service that assists motorists, motorcyclists, or bicyclists
										whose vehicles have suffered a mechanical failure that
										either cannot be resolved by the motorist, or has prevented
										them from reasonably or effectively transporting the vehicle
										to an automobile repair
									</h2>
									<button
										className='bg-red-900 text-white py-2 px-2 mt-3 rounded-full'
										style={{ ...FONTS.paragraph, fontWeight: 500 }}
									>
										Book Service
									</button>
								</div>
							</div>
						</div>
						<div>
							<div className='flex mt-10 justify-around gap-10'>
								<div className='w-1/2 mt-6'>
									<h1
										style={{
											...FONTS.paragraph,
											fontWeight: 600,
											fontSize: '18px',
											color: COLORS.primary,
										}}
									>
										Prebooking For Maintenance
									</h1>
									<h2
										className='py-2'
										style={{
											...FONTS.paragraph,
											fontSize: '16px',
											textAlign: 'justify',
										}}
									>
										When it comes to visiting a repair shop for vehicle
										maintenance or repairs, planning ahead and scheduling an
										appointment can offer significant advantages over showing up
										last minute. While it may be tempting to drop by
										spontaneously, the benefits of scheduling appointments
										beforehand can streamline your experience, save time, and
										ensure that you receive the attention your vehicle deserves.
										Here are a few facts that make scheduling an appointment a
										much better and safer approach to repair shop procedures:
									</h2>
									<button
										className='bg-red-900 text-white py-2 px-2 mt-3 rounded-full'
										style={{ ...FONTS.paragraph, fontWeight: 500 }}
									>
										Book Service
									</button>
								</div>
								<div>
									<img
										style={{ width: '500px' }}
										className='rounded-lg h-64'
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
										className='rounded-lg h-64'
										src={Annualmaintenance}
									/>
								</div>
								<div className='w-1/2 mt-6'>
									<h1
										style={{
											...FONTS.paragraph,
											fontWeight: 600,
											fontSize: '18px',
											color: COLORS.primary,
										}}
									>
										Annual Maintenance Scheme
									</h1>
									<h2
										className='py-2'
										style={{
											...FONTS.paragraph,
											fontSize: '16px',
											textAlign: 'justify',
										}}
									>
										Customers also get cost savings by eliminating unexpected
										maintenance and repair, and the service provider has a
										picture of what types of jobs they can expect. Create a
										deeper understanding of your scheduling and hiring needs.
									</h2>
									<button
										className='bg-red-900 text-white py-2 px-2 mt-3 rounded-full'
										style={{ ...FONTS.paragraph, fontWeight: 500 }}
									>
										Book Service
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`bg-[url(${bgImg3})] h-[85vh] mt-5`}>
					<div className='px-24 pt-2'>
						<h1
							className='text-3xl text-center text-red-900 py-10 underline'
							style={{ ...FONTS.header, fontWeight: 600 }}
						>
							Customised Care For All Your Needs
						</h1>
						<div className='flex justify-center gap-6 mt-4 mb-10 flex-wrap'>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<GrWorkshop size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									Service Workshop
									<br />
									Open All 7 Days
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<LuCarTaxiFront size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									Service Pick Up
									<br />& Drop Facility
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<GrWorkshop size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									Service Workshop
									<br />
									Open All 7 Days
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<PiSealCheckBold size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									YM Genuine Parts
									<br />& Oil
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<LuHandshake size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									Annual Maintenance
									<br />
									Plan Coverage
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<RiShieldStarFill size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									5 Years Standard
									<br />
									Warranty
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<GrWorkshop size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									Service Workshop
									<br />
									Open All 7 Days
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#FFDCDC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103'>
								<MdDateRange size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '16px',
										color: COLORS.primary,
									}}
								>
									24 x 7 Assistance
									<br />
									Through RSA
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* FOOTER START */}
				<footer className={`h-[100vh] bg-[url(${bgImg2})] pt-3`}>
					<div className='grid grid-cols-4 gap-4 px-24'>
						{/* Image Card - Full Height (No border) */}
						<div className='col-span-1 p-4 rounded h-full border-0'>
							<img
								src={appimage}
								alt='appimage'
								className='p-2 h-[120px] w-[280px] object-cover rounded'
							/>
						</div>

						{/* Remaining Cards - Full Width (No border) */}
						<div className='col-span-3 grid grid-cols-3 gap-6 p-3 w-full border-0'>
							<div className='p-4 w-full h-full'>
								<p
									className='text-red-900 text-2xl'
									style={{
										...FONTS.paragraph,
										fontWeight: 600,
										fontSize: '24px',
									}}
								>
									Yes Mechanics
								</p>
								<address
									style={{ ...FONTS.paragraph, textAlign: 'justify' }}
									className='my-3 text-red-900'
								>
									No. 1, New Bangaru Naidu Colony, K.K. Nagar (West), Chennai -
									600078.
								</address>
							</div>

							<div className='p-4 w-full h-full'>
								<p
									className='text-red-900 font-bold text-3xl'
									style={{
										...FONTS.paragraph,
										fontWeight: 600,
										fontSize: '24px',
									}}
								>
									About YM
								</p>
								<ol className='pt-1 text-red-900 text-xl flex flex-col'>
									<li
										className='py-1 text-red-900 hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										About Us
									</li>
									<Link
										to='/contact'
										className='py-1 text-red-900 hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										Contact Us
									</Link>
									<Link
										to='/settings'
										className='py-1 text-red-900 hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										Settings
									</Link>
									<Link
										to='/services'
										className='py-1 text-red-900 hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										Services
									</Link>
								</ol>
							</div>

							<div className='p-4 w-full h-full'>
								<p
									className='text-red-900 font-bold text-3xl'
									style={{
										...FONTS.paragraph,
										fontWeight: 600,
										fontSize: '24px',
									}}
								>
									Support
								</p>
								<ol className='pt-3 text-red-900 text-xl flex flex-col'>
									<Link
										to='/enquiry'
										className='py-1 text-red-900 hover:underline'
										style={{ ...FONTS.paragraph }}
									>
										Enquiry Form
									</Link>
									<Link
										to='/help-center'
										className='py-1 text-red-900 hover:underline'
										style={{ ...FONTS.paragraph }}
									>
										Help Center
									</Link>
									<Link
										to='/faqs'
										className='py-1 text-red-900 hover:underline'
										style={{ ...FONTS.paragraph }}
									>
										FAQs
									</Link>
								</ol>
							</div>
							<div className='w-[900px]'>
								<div className='grid grid-cols-1 gap-3 p-4'>
									<div className=''>
										<hr className='w-full border-[2px] border-red-900' />

										{/* Text on left, icons on right */}
										<div className='flex justify-between items-center text-red-900 text-xl py-2'>
											<p className='font-semibold text-base'>
												Download our App
											</p>

											<div className='flex items-center gap-4'>
												<div className='bg-red-900 text-white rounded-full p-2'>
													<BiLogoPlayStore />
												</div>
											</div>
										</div>
									</div>
									<div className=''>
										<hr className='w-full border-[1px] border-red-900' />

										{/* Text on left, icons on right */}
										<div className=''>
											<hr className='w-full border-[1px] border-red-900' />

											{/* Text on left, icons on right */}
											<div className='flex justify-between items-center text-red-900 text-xl py-2'>
												<p className='font-semibold text-base'>Social Media</p>

												<div className='flex items-center gap-4'>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<FaInstagramSquare />
													</div>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<FaXTwitter />
													</div>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<FaFacebook />
													</div>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<FaYoutube />
													</div>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<SiIndeed />
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className=''>
										<hr className='w-full border-[1px] border-red-900' />

										{/* Text on left, icons on right */}
										<div className=''>
											<hr className='w-full border-[1px] border-red-900' />

											{/* Text on left, icons on right */}
											<div className='flex justify-between items-center text-red-900 text-xl py-2'>
												<p className='font-semibold text-base'>Contact Us</p>

												<div className='flex items-center gap-4'>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<FaPhoneFlip />
													</div>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<MdEmail />
													</div>
													<div className='bg-red-900 text-white rounded-full p-2'>
														<FaSquareWhatsapp />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='py-2 mt-6'>
						<div className='h-[1px] bg-red-900 mb-4'></div>
						<p
							style={{
								...FONTS.paragraph,
								textAlign: 'center',
								color: COLORS.primary,
							}}
						>
							&copy; 2025 Yes Mechanics. All Rights reserved
						</p>
					</div>
				</footer>
				{/* FOOTER END */}
			</div>
		</>
	);
};

export default HomePage;
