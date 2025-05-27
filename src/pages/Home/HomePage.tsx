import { ImageCarousel } from '../../components/home/ImageCarousel';
import image1 from '../../assets/home/360_F_496483060_C9OG1wJpfmjMXcNmUBibmA9wYxxZCxnW.jpg';
import image2 from '../../assets/home/360_F_507812981_dGZXqBsqkBpEosDjTlJgmaJAyMFra7sp.jpg';
import image3 from '../../assets/home/hand-mechanic-holding-car-service-600nw-2340377479.webp';
import image4 from '../../assets/home/istockphoto-1387759698-612x612.jpg';
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

const imageUrls = [image1, image2, image3, image4];

const HomePage = () => {
	return (
		<>
			<ImageCarousel images={imageUrls} interval={2000} />
			<div className='mt-4'>
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
					{/* <MustCare /> */}
				</div>

				<div>
					<h1 className='text-3xl font-bold mt-10 text-red-900'>Discover All Services</h1>
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
						<GrWorkshop size={30}  color={COLORS.primary}/>
						<p className="mt-3">
							Service Workshop
							<br />
							Open All 7 Days
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<LuCarTaxiFront size={30} color={COLORS.primary} />
						<p className="mt-3">
							Service Pick Up
							<br />& Drop Facility
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<PiSealCheckBold size={30}  color={COLORS.primary}/>
						<p className="mt-3">
							Yesmechanic Genuine Parts
							<br />& Oil
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<LuHandshake size={30}  color={COLORS.primary}/>
						<p className="mt-3">
							Annual Maintenance
							<br />
							Plan Coverage
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<RiShieldStarFill size={30} color={COLORS.primary} />
						<p className="mt-3">
							5 Years Standard
							<br />
							Warranty
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<MdDateRange size={30}  color={COLORS.primary}/>
						<p className="mt-3">
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
					Because you deserve only the best, TVS Genuine Parts & True Oil ensure
					longer product lifespans, perfect compatibility, and higher resistance
					to wear and tear
				</p>
				<button className='bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 rounded'>
					Know More
				</button>
			</div>
		</>
	);
};

export default HomePage;
