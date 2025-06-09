
//484-----backend data fetching for overall


import { FaCar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";










import image1 from '../../assets/CAR ENGINE SERVISE/Engine servise.jpg'
import image2 from '../../assets/CAR DISMANTLE/Car dismantle.jpg'
import image3 from '../../assets/CAR DIFFERENTIAL/Car differential.jpg'
import image4 from '../../assets/CAR BUMPER/Car bumper.jpg'














import React, { useEffect, useState } from 'react';
import {
	Clock,
	Wrench,
	Battery,
	Zap,
	Car,
	Wind,
	Search,
	Droplets,
	Settings,
	FileCheck,
	Eye,
	Shield,
	Lightbulb,
	ChevronUp,
	ChevronDown,
} from 'lucide-react';
import SelectCarPage from './SelectCarPage';
import { Await, useNavigate, useParams } from 'react-router-dom';
import serviceImg from '../../assets/serviceimages/generalservice.png';
import AutoPopup from './RightSidePopup';
import { addToBookingCart, getservicebyid, getservicesoveralldata } from '../../features/services/services';
import { useLocation } from 'react-router-dom';



interface ServiceItem {
	name: string;
	icon: React.ReactNode;
}

interface ServicePackage {
	id: string;
	title: string;
	warranty: string;
	frequency: string;
	isRecommended?: boolean;
	duration: string;
	services: ServiceItem[];
	additionalCount?: number;
	image: string;
	price: string;
	discountPrice: string;
}

interface ContentSection {
	title: string;
	packages: ServicePackage[];
}

interface SelectedPackageInfo {
	packageId: string;
	carDetails: string;
}






const ServicesPage: React.FC = () => {

	const [selectedPackage, setSelectedPackage] = useState<SelectedPackageInfo[]>([]);

	

	const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

	const handleSelectCar = (packageId: string) => {
		setSelectedPackageId(packageId);
		console.log(`Selected package: ${packageId}`);
		setShowForm(true);
	};

	const [activeNavItem, setActiveNavItem] = useState<string>('Periodic Services');

	const handleNavClick = (navItem: string) => {
		setActiveNavItem(navItem);
		setSelectedPackage([]); // Reset selected package when switching sections
		console.log(`Navigated to: ${navItem}`);
	};

	const [expandedServices, setExpandedServices] = useState<{[key: string]: boolean;}>({});

	const [cart, setCart] = useState<SelectedPackageInfo[]>([]);

	const [showCartNotification, setShowCartNotification] = useState(false);

	// handle left and right on navbar
	const { id } = useParams<{ id: string }>();

	// Auto popup message
	const [showWelcomePopup, setShowWelcomePopup] = useState(true);

	// navigate to cart
	const navigate = useNavigate();

	const contentSections: { [key: string]: ContentSection } = {
		'Periodic Services': {
			title: 'Scheduled Packages',
			packages: [
				{
					id: `basic `,
					title: `Basic Service `,
					warranty: `1000 Kms or 1 Month Warranty `,
					frequency: 'Every 5000 Kms or 3 Months (Recommended)',
					duration: '4 Hrs Taken',
					image: serviceImg,
					services: [
						{
							name: 'Wiper Fluid Replacement',
							icon: <Droplets className='w-4 h-4' />,
						},
						{
							name: 'Battery Water Top Up',
							icon: <Battery className='w-4 h-4' />,
						},
						{ name: 'Car Wash', icon: <Car className='w-4 h-4' /> },
						{
							name: 'Interior Vacuuming (Carpet & Seats)',
							icon: <Wind className='w-4 h-4' />,
						},
						{
							name: 'Engine Oil Replacement',
							icon: <Settings className='w-4 h-4' />,
						},
					],
					additionalCount: 4,
					price: '₹2,500',
					discountPrice: '₹2,000',
				},
				{
					id: 'standard',
					title: 'Standard Service',
					warranty: '1000 Kms or 1 Month Warranty',
					frequency: 'Every 10,000 Kms or 6 Months (Recommended)',
					duration: '6 Hrs Taken',
					isRecommended: true,
					image: serviceImg,
					services: [
						{ name: 'Car Scanning', icon: <Search className='w-4 h-4' /> },
						{
							name: 'Wiper Fluid Replacement',
							icon: <Droplets className='w-4 h-4' />,
						},
						{
							name: 'Battery Water Top up',
							icon: <Battery className='w-4 h-4' />,
						},
						{ name: 'Car Wash', icon: <Car className='w-4 h-4' /> },
						{
							name: 'Interior Vacuuming (Carpet & Seats)',
							icon: <Wind className='w-4 h-4' />,
						},
					],
					additionalCount: 10,
					price: '₹4,500',
					discountPrice: '₹3,500',
				},
			],
		},
		'AC Services & Repair': {
			title: 'Air Conditioning Services',
			packages: [
				{
					id: 'ac-basic',
					title: 'AC Gas Refill',
					warranty: '6 Months Warranty',
					frequency: 'As Required',
					duration: '2 Hrs Taken',
					image: serviceImg,
					services: [
						{ name: 'AC Gas Top Up', icon: <Zap className='w-4 h-4' /> },
						{
							name: 'AC Performance Check',
							icon: <Search className='w-4 h-4' />,
						},
						{
							name: 'Temperature Testing',
							icon: <Settings className='w-4 h-4' />,
						},
						{
							name: 'Cooling System Inspection',
							icon: <Wind className='w-4 h-4' />,
						},
					],
					additionalCount: 3,
					price: '₹2,000',
					discountPrice: '₹1,500',
				},
				{
					id: 'ac-complete',
					title: 'Complete AC Service',
					warranty: '1 Year Warranty',
					frequency: 'Every 12 Months',
					duration: '4 Hrs Taken',
					isRecommended: true,
					image: serviceImg,
					services: [
						{ name: 'AC Deep Cleaning', icon: <Wind className='w-4 h-4' /> },
						{
							name: 'Filter Replacement',
							icon: <Settings className='w-4 h-4' />,
						},
						{
							name: 'Condenser Cleaning',
							icon: <Droplets className='w-4 h-4' />,
						},
						{ name: 'Compressor Check', icon: <Zap className='w-4 h-4' /> },
						{ name: 'AC Gas Refill', icon: <Battery className='w-4 h-4' /> },
					],
					additionalCount: 5,
					price: '₹6,000',
					discountPrice: '₹4,500',
				},
			],
		},
		'Batteries': {
			title: 'Battery Services & Replacement',
			packages: [
				{
					id: 'battery-check',
					title: 'Battery Health Check',
					warranty: '1 Month Warranty',
					frequency: 'Every 6 Months',
					duration: '1 Hr Taken',
					image: serviceImg,
					services: [
						{
							name: 'Battery Voltage Test',
							icon: <Battery className='w-4 h-4' />,
						},
						{
							name: 'Terminal Cleaning',
							icon: <Settings className='w-4 h-4' />,
						},
						{ name: 'Load Test', icon: <Zap className='w-4 h-4' /> },
						{
							name: 'Water Level Check',
							icon: <Droplets className='w-4 h-4' />,
						},
					],
					additionalCount: 2,
					price: '₹1500',
					discountPrice: '₹1200',
				},
				{
					id: 'battery-replace',
					title: 'Battery Replacement',
					warranty: '2 Years Warranty',
					frequency: 'Every 3-4 Years',
					duration: '1 Hr Taken',
					isRecommended: true,
					image: serviceImg,
					services: [
						{
							name: 'Old Battery Removal',
							icon: <Battery className='w-4 h-4' />,
						},
						{
							name: 'New Battery Installation',
							icon: <Settings className='w-4 h-4' />,
						},
						{ name: 'Terminal Connection', icon: <Zap className='w-4 h-4' /> },
						{
							name: 'Performance Testing',
							icon: <Search className='w-4 h-4' />,
						},
					],
					price: '₹5000',
					discountPrice: '₹4000',
				},
			],
		},
		'Tyres and Wheel Care': {
			title: 'Tyre & Wheel Services',
			packages: [
				{
					id: 'tyre-rotation',
					title: 'Tyre Rotation & Balancing',
					warranty: '500 Kms Warranty',
					frequency: 'Every 10,000 Kms',
					duration: '2 Hrs Taken',
					image: serviceImg,
					services: [
						{ name: 'Tyre Rotation', icon: <Car className='w-4 h-4' /> },
						{ name: 'Wheel Balancing', icon: <Settings className='w-4 h-4' /> },
						{ name: 'Pressure Check', icon: <Wind className='w-4 h-4' /> },
						{ name: 'Tread Inspection', icon: <Eye className='w-4 h-4' /> },
					],
					additionalCount: 3,
					price: '₹2000',
					discountPrice: '₹1500',
				},
			],
		},
		'Detailing Services': {
			title: 'Car Detailing Packages',
			packages: [
				{
					id: 'exterior-detail',
					title: 'Premium Exterior Detailing',
					warranty: '1 Month Protection',
					frequency: 'Every 3 Months',
					duration: '6 Hrs Taken',
					isRecommended: true,
					image: serviceImg,
					services: [
						{
							name: 'Paint Protection Coating',
							icon: <Shield className='w-4 h-4' />,
						},
						{ name: 'Deep Wash & Wax', icon: <Car className='w-4 h-4' /> },
						{
							name: 'Headlight Polishing',
							icon: <Lightbulb className='w-4 h-4' />,
						},
						{
							name: 'Tire Shine Application',
							icon: <Settings className='w-4 h-4' />,
						},
					],
					additionalCount: 6,
					price: '₹8,000',
					discountPrice: '₹6,000',
				},
			],
		},
		'Car Inspection': {
			title: 'Vehicle Inspection Services',
			packages: [
				{
					id: 'full-inspection',
					title: 'Comprehensive Vehicle Inspection',
					warranty: 'Detailed Report Provided',
					frequency: 'Before Purchase/Sale',
					duration: '3 Hrs Taken',
					image: serviceImg,
					services: [
						{
							name: 'Engine Diagnostics',
							icon: <Search className='w-4 h-4' />,
						},
						{
							name: 'Brake System Check',
							icon: <Settings className='w-4 h-4' />,
						},
						{
							name: 'Suspension Inspection',
							icon: <Car className='w-4 h-4' />,
						},
						{
							name: 'Electrical System Test',
							icon: <Zap className='w-4 h-4' />,
						},
					],
					additionalCount: 12,
					price: '₹3,000',
					discountPrice: '₹2,500',
				},
			],
		},
		'Windshields & Lights': {
			title: 'Glass & Lighting Services',
			packages: [
				{
					id: 'windshield-repair',
					title: 'Windshield Chip Repair',
					warranty: '6 Months Warranty',
					frequency: 'As Required',
					duration: '1 Hr Taken',
					image: serviceImg,
					services: [
						{ name: 'Chip Assessment', icon: <Eye className='w-4 h-4' /> },
						{
							name: 'Resin Application',
							icon: <Droplets className='w-4 h-4' />,
						},
						{
							name: 'UV Curing Process',
							icon: <Lightbulb className='w-4 h-4' />,
						},
						{ name: 'Quality Check', icon: <Search className='w-4 h-4' /> },
						{
							name: 'Resin Application',
							icon: <Droplets className='w-4 h-4' />,
						},
					],
					additionalCount: 1,
					price: '₹1,500',
					discountPrice: '₹1,200',
				},
			],
		},
		'Suspension & Fitments': {
			title: 'Suspension & Fitting Services',
			packages: [
				{
					id: 'suspension-check',
					title: 'Suspension System Check',
					warranty: '1000 Kms Warranty',
					frequency: 'Every 20,000 Kms',
					duration: '3 Hrs Taken',
					image: serviceImg,
					services: [
						{
							name: 'Shock Absorber Test',
							icon: <Settings className='w-4 h-4' />,
						},
						{ name: 'Spring Inspection', icon: <Car className='w-4 h-4' /> },
						{ name: 'Alignment Check', icon: <Search className='w-4 h-4' /> },
						{ name: 'Bushings Inspection', icon: <Eye className='w-4 h-4' /> },
					],
					additionalCount: 5,
					price: '₹3,000',
					discountPrice: '₹2,500',
				},
			],
		},
		'Clutch & Body Parts': {
			title: 'Clutch & Body Repair Services',
			packages: [
				{
					id: 'clutch-service',
					title: 'Clutch System Service',
					warranty: '5000 Kms Warranty',
					frequency: 'Every 50,000 Kms',
					duration: '8 Hrs Taken',
					image: serviceImg,
					services: [
						{
							name: 'Clutch Plate Inspection',
							icon: <Settings className='w-4 h-4' />,
						},
						{
							name: 'Pressure Plate Check',
							icon: <Search className='w-4 h-4' />,
						},
						{
							name: 'Hydraulic System Test',
							icon: <Droplets className='w-4 h-4' />,
						},
						{ name: 'Clutch Adjustment', icon: <Wrench className='w-4 h-4' /> },
					],
					additionalCount: 4,
					price: '₹5,000',
					discountPrice: '₹4,000',
				},
			],
		},
		'Insurance Claims': {
			title: 'Insurance Claim Services',
			packages: [
				{
					id: 'claim-assistance',
					title: 'Complete Claim Assistance',
					warranty: 'Full Documentation Support',
					frequency: 'As Required',
					duration: '9 Hrs Taken',
					image: serviceImg,
					services: [
						{ name: 'Damage Assessment', icon: <Eye className='w-4 h-4' /> },
						{
							name: 'Documentation Support',
							icon: <FileCheck className='w-4 h-4' />,
						},
						{
							name: 'Insurance Coordination',
							icon: <Shield className='w-4 h-4' />,
						},
						{
							name: 'Repair Estimation',
							icon: <Settings className='w-4 h-4' />,
						},
					],
					additionalCount: 6,
					price: '₹1,500',
					discountPrice: '₹1,200',
				},
			],
		},
	};


	interface ServiceItem {
		category_name: string;
		icon: React.ReactNode;
	}

	interface Package {
		category_id: string;
		description: string;
		created_at: string;
		partner_id: string;
		price: number;
		service_name: string;
		updated_at: string;
		services: ServiceItem[];
	}

	interface ServiceCategory {
		category_name: string;
		packages: Package[];
	}
	

	//     backend data fetching for overall
	const [service, setservice] = useState<ServiceCategory[]>([]);
 
	const overalldata = async () => {
		try {
			const response = await getservicesoveralldata();
			console.log(response)
			setservice(response); // direct assignment
		} catch (error) {
			console.log(error);
		}
	};
	  
 useEffect(() => {
overalldata();
 },[])

 // send data from one page to ano

	const [sendPages, setSendPages] = useState<ServiceCategory[]>([]);// data entering

	// const senddata = async (pkgId: string) => {
	// 	try {
	// 		const data = {
	// 			service: [pkgId],
	// 			type: "service",
	// 		};
	// 		const response = await addToBookingCart(data); // returns an array of ServiceCategory
	// 		console.log("API Response:", response);
	// 		setSendPages(response);
	// 		return response;
	// 	} catch (error) {
	// 		console.error("API Error:", error);
	// 		return [];
	// 	}
	// };
	  

	

	const navigationItems = [
		{ name: 'Periodic Services', icon: <Wrench className='w-6 h-6' /> },
		{ name: 'AC Services & Repair', icon: <Zap className='w-6 h-6' /> },
		{ name: 'Batteries', icon: <Battery className='w-6 h-6' /> },
		{ name: 'Tyres and Wheel Care', icon: <Car className='w-6 h-6' /> },
		{ name: 'Detailing Services', icon: <Battery className='w-6 h-6' /> },
		{ name: 'Car Inspection', icon: <Eye className='w-6 h-6' /> },
		{ name: 'Windshields & Lights', icon: <Lightbulb className='w-6 h-6' /> },
		{ name: 'Suspension & Fitments', icon: <Settings className='w-6 h-6' /> },
		{ name: 'Clutch & Body Parts', icon: <FileCheck className='w-6 h-6' /> },
		{ name: 'Insurance Claims', icon: <Shield className='w-6 h-6' /> },
	];

	

	

	// Auto popup message
	useEffect(() => {
		// Check if user has previously dismissed the popup
		const hasDismissed = localStorage.getItem('dismissedWelcomePopup');
		if (!hasDismissed) {
			setShowWelcomePopup(true);
		}
	}, []);

	// mini page data selection after click select
	const handleCloseWelcome = () => {
		setShowWelcomePopup(false);
		localStorage.setItem('dismissedWelcomePopup', 'true');
	};
	////// more or less
	const toggleExpandServices = (packageId: string) => {
		setExpandedServices((prev) => ({
			...prev,
			[packageId]: !prev[packageId],
		}));
	};

	

	const [showForm, setShowForm] = useState<boolean>(false);

	const [activeCategory, setActiveCategory] = useState(service[0]?.category_name || '');
	

	const getSectionKeyForCategory = (categoryNames: string) => {
		switch (categoryNames.toLowerCase()) {
			case 'sample category 3':
				return 'periodic service';

			case 'new sample category':
				return 'Tyres and Wheel Care';
			case 'sample category 2':
				return 'ac services and repair';
			case 'sample 1':
				return 'batteries';
			default:
				return null;
		}
	};

	
  		


// image
	const getCategoryImage = (categoryName: string) => {
		switch (categoryName) {
		case 'Periodic Services':
			return image1;
		case 'AC Services & Repair':
			return image2;
			case 'Batteries':
			return image3;
			case 'Tyres and Wheel Care':
			return image1;
		default:
			return '/images/default.jpg'; // fallback image
		}
	};

	 const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
	const [activeCategoryIndex1, setActiveCategoryIndex1] = useState(1);
	const [activeCategoryIndex2, setActiveCategoryIndex2] = useState(2);
	const [activeCategoryIndex3, setActiveCategoryIndex3] = useState(3);

const [activeCategoryName, setActiveCategoryName] = useState(null);
	


	
  

	return (	
		<div className='min-h-screen bg-gray-50 flex flex-start'>
		<div className='flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
		  {/* Sidebar */}
		  <div className='fixed left-0 top-8 w-[280px] h-[800px] bg-white shadow-2xl flex flex-col z-10 border-r border-gray-100'>
			<div className='p-6 border-b border-gray-100 bg-gradient-to-r from-red-500 to-red-600'>
			  <div className='flex items-center space-x-3'>
				<div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
				  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
				  </svg>
				</div>
				<div>
				  <h2 className='text-xl font-bold text-white'>Services</h2>
				  <p className='text-red-100 text-sm font-medium'>Dashboard</p>
				</div>
			  </div>
			</div>
  
			{/* Nav Items */}
			<div className='flex-1 overflow-y-auto max-h-[calc(100vh-120px)] py-4 scrollbar-hide'>
			  <nav className='px-4'>
				<div className='space-y-2'>
				  {service.map((item, index) => (
					<div
					  key={index}
					  onClick={() => {
						setActiveNavItem(index);
						setActiveCategory(item.category_name);
						setCurrentContent(item);
					  }}
					  className={`group flex items-center px-4 py-4 rounded-xl cursor-pointer transition-colors duration-150 transform hover:scale-[1.02] ${
						activeNavItem === index
						  ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 shadow-lg border border-red-900 border-l-4 border-t-4'
						  : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-red-600 hover:shadow-md'
					  }`}
					>
					  <div
						className={`mr-4 flex-shrink-0 p-2 rounded-lg transition-colors duration-150 ${
						  activeNavItem === index
							? 'bg-red-200/50 text-red-600'
							: 'bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-500'
						}`}
					  >
							  <div className='w-[30px] h-[40px] flex justify-center items-center '>
						  <FaCar className='text-red-800 w-10 h-8  ' />
						</div>
					  </div>
					  <div className='flex items-center space-x-0.5 group cursor-pointer'>
						<span className='text-sm font-semibold whitespace-nowrap transition-colors duration-150'>
						  {item.category_name}
						</span>
						<IoIosArrowForward className='opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
					  </div>
					</div>
				  ))}
				</div>
			  </nav>
			</div>
		  </div>
		</div>
  
		{/* Main Content */}
				  <div className='ml-[10%] mt-[1%] bg-gray-50 min-h-screen w-full'>
					  <div className='max-w-4xl mx-auto px-6 py-8'>
						  <div className='w-[600px] grid grid-cols-1 md:grid-cols-2 gap-6'>
							  {service
								  .filter((category) => category.category_name === activeCategory)
								  .map((category, index) => (
									  <React.Fragment key={index}>
										  {/* Move the Category Title Outside the Card */}
										  <div className='col-span-full mb-2'>
											  <h1 className='text-2xl font-bold text-[#9b111e] mb-2 uppercase'>{category.category_name}</h1>
										  </div>
										  
										  {Object.entries(contentSections).map(([categoryName, categoryData], catIndex) => {
											  // Skip rendering entirely for categories with index 4 or above
											  if (catIndex >= 3) return null;
  
											  return (
												  <div key={catIndex} className="mb-10">
													  {/* Category Heading */}
													  <h2
														  className={`text-2xl font-bold uppercase mb-4 cursor-pointer ${[activeCategoryIndex, activeCategoryIndex1, activeCategoryIndex2, activeCategoryIndex3].includes(catIndex)
																  ? 'text-[#9b111e]'
																  : 'text-gray-500'
															  }`}
														  onClick={() => {
															  if (categoryName === 'sample category 3') {
																  setActiveCategoryIndex(catIndex);
															  } else if (categoryName === 'Sample Category 2') {
																  setActiveCategoryIndex1(catIndex);
															  } else if (categoryName === 'sample-1') {
																  setActiveCategoryIndex2(catIndex);
															  } else if (categoryName === 'new-sample-category') {
																  setActiveCategoryIndex3(catIndex);
															  }
														  }}
													  >
														  {categoryName}
													  </h2>
  
													  {/* Show full packages and image only if this category is active */}
													  {[activeCategoryIndex, activeCategoryIndex1, activeCategoryIndex2, activeCategoryIndex3].includes(catIndex) ? (
														  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
															  {categoryData.packages?.slice(0, 4).map((pkg, pkgIndex) => (
																  <div key={pkgIndex} className="p-4 border rounded-lg shadow bg-white">
																	  {/* Image */}
																	  <img
																		  src={getCategoryImage(categoryName)}
																		  alt={categoryName}
																		  className="w-full h-[250px] object-cover rounded"
																	  />
																	  <h3 className="text-xl font-bold text-red-800 my-4">{pkg.title}</h3>
  
																	  {/* Duration Badge */}
																	  <div className="relative">
																		  <div className="absolute top-[-40px] right-0 w-[122px] px-3 py-1 rounded-full bg-red-600 text-white text-sm flex items-center">
																			  <Clock className="w-4 h-4 mr-1" />
																			  {pkg.duration}
																		  </div>
																	  </div>
  
																	  {/* Warranty + Frequency */}
																	  <p className="text-red-500 text-sm ml-1">
																		  <span>{pkg.warranty}</span>
																		  <span className="ml-20">{pkg.frequency}</span>
																	  </p>
  
																	  {/* Services List */}
																	  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
																		  {pkg.services
																			  .slice(0, expandedServices[pkg.id] ? pkg.services.length : 4)
																			  .map((service, index) => (
																				  <div key={index} className="flex items-center text-sm">
																					  <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3">
																						  {service.icon}
																					  </div>
																					  <span className="group-hover:text-red-400">{service.name}</span>
																				  </div>
																			  ))}
																	  </div>
  
																	  {/* View More Button */}
																	  {pkg.services.length > 4 && (
																		  <button
																			  onClick={() => toggleExpandServices(pkg.id)}
																			  className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center mb-4"
																		  >
																			  {expandedServices[pkg.id] ? (
																				  <>
																					  <ChevronUp className="w-4 h-4 mr-1" /> Show Less
																				  </>
																			  ) : (
																				  <>
																					  <ChevronDown className="w-4 h-4 mr-1" /> View More
																				  </>
																			  )}
																		  </button>
																	  )}
  
																	  {/* Action Buttons */}
																	  <div className="flex justify-between items-center mt-6">
																		  {selectedPackage.some((p) => p.packageId === pkg.id) ? (
																			  <>
																				  <div className="text-right mb-2">
																					  <span className="line-through text-gray-400 mr-2 text-sm">{pkg.price}</span>
																					  <span className="text-red-600 font-bold text-xl">{pkg.discountPrice}</span>
																				  </div>
																				  {cart.some((item) => item.packageId === pkg.id) ? (
																					  <button
																						  onClick={() => navigate('/booking-cart', { state: { sendPages } })}
																						  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
																					  >
																						  Go to Cart
																					  </button>
																				  ) : (
																					  <button
																						  onClick={async () => {
																							  const packageToAdd = selectedPackage.find((p) => p.packageId === pkg.id);
																							  if (packageToAdd) {
																								  setCart((prevCart) => [...prevCart, packageToAdd]);
																								  setShowCartNotification(true);
																								  setTimeout(() => setShowCartNotification(false), 3000);
  
																								  const data = { service: [pkg.id], type: 'service' };
																								  const response = await addToBookingCart(data);
																								  if (response.length > 0) {
																									  navigate('/booking-cart', { state: { sendPages: response } });
																								  }
																							  }
																						  }}
																						  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-900 transition-colors"
																					  >
																						  Add to Cart
																					  </button>
																				  )}
																			  </>
																		  ) : (
																			  <button
																				  onClick={() => handleSelectCar(pkg.id)}
																				  className="px-4 py-2 rounded-lg font-semibold bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
																			  >
																				  SELECT CAR
																			  </button>
																		  )}
																	  </div>
  
																	  {/* Show Car Selection Form */}
																	  {showForm && selectedPackageId === pkg.id && (
																		  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50 p-4">
																			  <SelectCarPage
																				  onClose={() => setShowForm(false)}
																				  setSelectedPackage={(carDetails) => {
																					  setSelectedPackage((prev) => [
																						  ...prev,
																						  {
																							  packageId: selectedPackageId,
																							  carDetails,
																						  },
																					  ]);
																					  setShowForm(false);
																				  }}
																				  packageId={selectedPackageId}
																			  />
																		  </div>
																	  )}
																  </div>
															  ))}
														  </div>
													  ) : (
														  <div>No packages available</div>
													  )}
												  </div>
											  );
										  })}  
									  </React.Fragment>
								  ))}
						  </div>
  
						  {showCartNotification && (
							  <div className='fixed top-[70px] right-[10px] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'>
								  Item added to cart successfully!
							  </div>
						  )}
					  </div>
				  </div>  
		{showWelcomePopup && (
		  <AutoPopup
			onClose={handleCloseWelcome}
			title='Welcome to Car Services'
			message='Explore our comprehensive service packages. Select what your vehicle needs and book an appointment with ease.'
		  />
		)}
	  </div>
	);
};

export default ServicesPage;
