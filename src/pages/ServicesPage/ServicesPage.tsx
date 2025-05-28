import React, { useState } from 'react';
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
import { useParams } from 'react-router-dom';
import serviceImg from '../../assets/serviceimages/generalservice.png'

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
  carDetails: CarSelect;
}



const ServicesPage: React.FC = () => {
	const [selectedPackage, setSelectedPackage] = useState<SelectedPackageInfo | null>(null);
	const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
	const [activeNavItem, setActiveNavItem] =
		useState<string>('Periodic Services');
	const [expandedServices, setExpandedServices] = useState<{
		[key: string]: boolean;
	}>({});
	// handle left and right on navbar
	const { id } = useParams<{ id: string }>();
	// Define content for each navigation section
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
		Batteries: {
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
					],
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
					duration: '5 Days Processing',
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

	const handleSelectCar = (packageId: string) => {
		setSelectedPackageId(packageId);
		console.log(`Selected package: ${packageId}`);
		setShowForm(true);
	};

	const handleNavClick = (navItem: string) => {
		setActiveNavItem(navItem);
		setSelectedPackage(null); // Reset selected package when switching sections
		console.log(`Navigated to: ${navItem}`);
	};

	const toggleExpandServices = (packageId: string) => {
		setExpandedServices((prev) => ({
			...prev,
			[packageId]: !prev[packageId],
		}));
	};

	const [showForm, setShowForm] = useState<boolean>(false);

	// Get current content based on active navigation
	const currentContent =
		contentSections[activeNavItem] || contentSections['Periodic Services'];

	return (
		<div className='min-h-screen bg-gray-50 flex flex-start '>
			{/* Header Navigation */}
			{/* Vertical Left Sidebar Navigation */}
			<div className='flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
  {/* Left Sidebar */}
  <div className='fixed left-0 top-10 w-72 h-screen bg-white shadow-2xl flex flex-col z-10 border-r border-gray-100'>
    {/* Header Section */}
    <div className='p-6 border-b border-gray-100 flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600'>
      <div className='flex items-center space-x-3'>
        <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
          </svg>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white'>
            Services
          </h2>
          <p className='text-red-100 text-sm font-medium'>Dashboard</p>
        </div>
      </div>
    </div>

    {/* Navigation Section */}
    <div className='flex-1 overflow-y-auto max-h-[calc(100vh-120px)] py-4'>
      <nav className='px-4'>
        <div className='space-y-2'>
          {navigationItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavClick(item.name)}
              className={`group relative flex items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                activeNavItem === item.name
                  ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 shadow-lg shadow-red-100/50 border border-red-200'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-red-600 hover:shadow-md'
              }`}
            >
              {/* Active indicator */}
              {activeNavItem === item.name && (
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full'></div>
              )}
              
              {/* Icon container */}
              <div className={`mr-4 flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                activeNavItem === item.name 
                  ? 'bg-red-200/50 text-red-600' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-500'
              }`}>
                {item.icon}
              </div>
              
              {/* Text */}
              <span className='text-sm font-semibold whitespace-nowrap transition-all duration-300'>
                {item.name}
              </span>
              
              {/* Hover arrow indicator */}
              <div className={`ml-auto opacity-0 transform translate-x-2 transition-all duration-300 ${
                activeNavItem === item.name ? 'opacity-100 translate-x-0' : 'group-hover:opacity-100 group-hover:translate-x-0'
              }`}>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  </div>
</div>
				{/* Main Content */}
				<div className=' ml-64 bg-gray-50 min-h-screen'>
  {/* Main Content */}
  <div className='max-w-4xl mx-auto px-6 py-8'>
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-[#9b111e] mb-2'>
        {currentContent.title}
      </h1>
      <p className='text-gray-500'>Choose the perfect package for your vehicle</p>
    </div>

    <div className='space-y-8'>
      {currentContent.packages.map((pkg) => (
        <div key={pkg.id} className={`bg-[#FAF3EB] rounded-xl shadow-lg overflow-hidden relative transition-all duration-300 hover:shadow-xl ${
          selectedPackage?.packageId === pkg.id ? 'ring-2 ring-red-500' : ''
        }`}>
          {pkg.isRecommended && (
            <div className='absolute top-0 left-0 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-br-lg'>
              <span className='text-sm font-semibold bg-green-600 text-white px-3 py-1 rounded-md'>RECOMMENDED</span>
            </div>
          )}

          <div className='flex flex-col md:flex-row'>
            {/* Service Image */}
            <div className='ml-8 mt-4 md:w-[500px] h-[250px] md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 relative'>
              <img
                src={pkg.image}
                alt={pkg.title}
                className='w-full h-full object-cover '
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NS4zMzMzIDc1SDExNC42NjdNMTAwIDYwLjMzMzNWODkuNjY2N00xMDAgMTA1QzExNi41NjkgMTA1IDEzMCA5MS41Njg1IDEzMCA3NUMxMzAgNTguNDMxNSAxMTYuNTY5IDQ1IDEwMCA0NUM4My40MzE1IDQ1IDcwIDU4LjQzMTUgNzAgNzVDNzAgOTEuNTY4NSA4My40MzE1IDEwNSAxMDAgMTA1WiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                }}
              />
            </div>

            {/* Service Details */}
            <div className='flex-1 p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h2 className='text-2xl font-bold text-[#9b111e] mb-2'>
                    {pkg.title} 
					<div className='ml-[100px] inline-flex w-[125px] items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm'>
                  <Clock className='w-4 h-4 mr-1' />
                  {pkg.duration}
                </div>
                  </h2>
                  <div className='flex space-x-4 text-sm'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full opacity-70 text-red-600 '>
                      {pkg.warranty}
                    </span>
                    <span className='inline-flex items-center px-3 py-1 rounded-full opacity-70 text-red-600 '>
                      {pkg.frequency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-4'>
                {pkg.services
                  .slice(
                    0,
                    expandedServices[pkg.id] ? pkg.services.length : 4
                  )
                  .map((service, index) => (
                    <div
                      key={index}
                      className='flex items-center text-sm text-gray-700 group'
                    >
                      <div className='w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-green-200 transition-colors'>
                        <div>{service.icon}</div>
                      </div>
                      <span className='group-hover:text-gray-900 transition-colors'>
						
                        {service.name}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Additional Services Link */}
              {pkg.additionalCount && (
                <div className='mb-6'>
                  <button
                    onClick={() => toggleExpandServices(pkg.id)}
                    className='text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center'
                  >
                    {expandedServices[pkg.id] ? (
                      <>
                        <ChevronUp className='w-4 h-4 mr-1' />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className='w-4 h-4' />
                         view more
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className='flex justify-between items-center mt-6'>
            {selectedPackage?.packageId === pkg.id ? (
              <div className='flex items-center space-x-4'>
                <div className='text-right'>
                  <span className='line-through text-gray-400 mr-2 text-sm'>
                    {pkg.price}
                  </span>
                  <span className='text-green-600 font-bold text-xl'>
                    {pkg.discountPrice}
                  </span>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md border-2 border-green-600 hover:bg-green-700 transition-all duration-200">
                  ADD TO CART
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleSelectCar(pkg.id)}
                className='px-6 py-3 rounded-lg font-semibold bg-white border-2 border-red-500 text-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg'
              >
                SELECT CAR
              </button>
            )}
          </div>
			  {showForm && selectedPackageId === pkg.id && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <SelectCarPage 
                onClose={() => setShowForm(false)} 
                setSelectedPackage={(carDetails) => {
                  setSelectedPackage({
                    packageId: pkg.id,
                    carDetails
                  });
                  setShowForm(false);
                }} 
              />
            </div>
          )}

            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

</div>
	);
};

export default ServicesPage;