import React, { useState } from 'react';
import { Clock, Wrench, Battery, Zap, Car, Wind, Search, Droplets, Settings,FileCheck, Eye, Shield, Lightbulb } from 'lucide-react';
import SelectCarPage from './SelectCarPage'
import { useParams } from 'react-router-dom';

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
}

interface ContentSection {
  title: string;
  packages: ServicePackage[];
}

const ServiceCentersPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeNavItem, setActiveNavItem] = useState<string>('Periodic Services');
  const [expandedServices, setExpandedServices] = useState<{ [key: string]: boolean }>({});
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Wiper Fluid Replacement', icon: <Droplets className="w-4 h-4" /> },
            { name: 'Battery Water Top Up', icon: <Battery className="w-4 h-4" /> },
            { name: 'Car Wash', icon: <Car className="w-4 h-4" /> },
            { name: 'Interior Vacuuming (Carpet & Seats)', icon: <Wind className="w-4 h-4" /> },
            { name: 'Engine Oil Replacement', icon: <Settings className="w-4 h-4" /> }
          ],
          additionalCount: 4
        },
        {
          id: 'standard',
          title: 'Standard Service',
          warranty: '1000 Kms or 1 Month Warranty',
          frequency: 'Every 10,000 Kms or 6 Months (Recommended)',
          duration: '6 Hrs Taken',
          isRecommended: true,
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Car Scanning', icon: <Search className="w-4 h-4" /> },
            { name: 'Wiper Fluid Replacement', icon: <Droplets className="w-4 h-4" /> },
            { name: 'Battery Water Top up', icon: <Battery className="w-4 h-4" /> },
            { name: 'Car Wash', icon: <Car className="w-4 h-4" /> },
            { name: 'Interior Vacuuming (Carpet & Seats)', icon: <Wind className="w-4 h-4" /> }
          ],
          additionalCount: 10
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'AC Gas Top Up', icon: <Zap className="w-4 h-4" /> },
            { name: 'AC Performance Check', icon: <Search className="w-4 h-4" /> },
            { name: 'Temperature Testing', icon: <Settings className="w-4 h-4" /> },
            { name: 'Cooling System Inspection', icon: <Wind className="w-4 h-4" /> }
          ],
          additionalCount: 3
        },
        {
          id: 'ac-complete',
          title: 'Complete AC Service',
          warranty: '1 Year Warranty',
          frequency: 'Every 12 Months',
          duration: '4 Hrs Taken',
          isRecommended: true,
          image: '/api/placeholder/200/150',
          services: [
            { name: 'AC Deep Cleaning', icon: <Wind className="w-4 h-4" /> },
            { name: 'Filter Replacement', icon: <Settings className="w-4 h-4" /> },
            { name: 'Condenser Cleaning', icon: <Droplets className="w-4 h-4" /> },
            { name: 'Compressor Check', icon: <Zap className="w-4 h-4" /> },
            { name: 'AC Gas Refill', icon: <Battery className="w-4 h-4" /> }
          ],
          additionalCount: 5
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Battery Voltage Test', icon: <Battery className="w-4 h-4" /> },
            { name: 'Terminal Cleaning', icon: <Settings className="w-4 h-4" /> },
            { name: 'Load Test', icon: <Zap className="w-4 h-4" /> },
            { name: 'Water Level Check', icon: <Droplets className="w-4 h-4" /> }
          ],
          additionalCount: 2
        },
        {
          id: 'battery-replace',
          title: 'Battery Replacement',
          warranty: '2 Years Warranty',
          frequency: 'Every 3-4 Years',
          duration: '1 Hr Taken',
          isRecommended: true,
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Old Battery Removal', icon: <Battery className="w-4 h-4" /> },
            { name: 'New Battery Installation', icon: <Settings className="w-4 h-4" /> },
            { name: 'Terminal Connection', icon: <Zap className="w-4 h-4" /> },
            { name: 'Performance Testing', icon: <Search className="w-4 h-4" /> }
          ]
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Tyre Rotation', icon: <Car className="w-4 h-4" /> },
            { name: 'Wheel Balancing', icon: <Settings className="w-4 h-4" /> },
            { name: 'Pressure Check', icon: <Wind className="w-4 h-4" /> },
            { name: 'Tread Inspection', icon: <Eye className="w-4 h-4" /> }
          ],
          additionalCount: 3
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Paint Protection Coating', icon: <Shield className="w-4 h-4" /> },
            { name: 'Deep Wash & Wax', icon: <Car className="w-4 h-4" /> },
            { name: 'Headlight Polishing', icon: <Lightbulb className="w-4 h-4" /> },
            { name: 'Tire Shine Application', icon: <Settings className="w-4 h-4" /> }
          ],
          additionalCount: 6
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Engine Diagnostics', icon: <Search className="w-4 h-4" /> },
            { name: 'Brake System Check', icon: <Settings className="w-4 h-4" /> },
            { name: 'Suspension Inspection', icon: <Car className="w-4 h-4" /> },
            { name: 'Electrical System Test', icon: <Zap className="w-4 h-4" /> }
          ],
          additionalCount: 12
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Chip Assessment', icon: <Eye className="w-4 h-4" /> },
            { name: 'Resin Application', icon: <Droplets className="w-4 h-4" /> },
            { name: 'UV Curing Process', icon: <Lightbulb className="w-4 h-4" /> },
            { name: 'Quality Check', icon: <Search className="w-4 h-4" /> }
          ]
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Shock Absorber Test', icon: <Settings className="w-4 h-4" /> },
            { name: 'Spring Inspection', icon: <Car className="w-4 h-4" /> },
            { name: 'Alignment Check', icon: <Search className="w-4 h-4" /> },
            { name: 'Bushings Inspection', icon: <Eye className="w-4 h-4" /> }
          ],
          additionalCount: 5
        }
      ]
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
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Clutch Plate Inspection', icon: <Settings className="w-4 h-4" /> },
            { name: 'Pressure Plate Check', icon: <Search className="w-4 h-4" /> },
            { name: 'Hydraulic System Test', icon: <Droplets className="w-4 h-4" /> },
            { name: 'Clutch Adjustment', icon: <Wrench className="w-4 h-4" /> }
          ],
          additionalCount: 4
        }
      ]
    },
    'Insurance Claims': {
      title: 'Insurance Claim Services',
      packages: [
        {
          id: 'claim-assistance',
          title: 'Complete Claim Assistance',
          warranty: 'Full Documentation Support',
          frequency: 'As Required',
          duration: '2-5 Days Processing',
          image: '/api/placeholder/200/150',
          services: [
            { name: 'Damage Assessment', icon: <Eye className="w-4 h-4" /> },
            { name: 'Documentation Support', icon: <FileCheck className="w-4 h-4" /> },
            { name: 'Insurance Coordination', icon: <Shield className="w-4 h-4" /> },
            { name: 'Repair Estimation', icon: <Settings className="w-4 h-4" /> }
          ],
          additionalCount: 6
        }
      ]
    }
  };

  const navigationItems = [
    { name: 'Periodic Services', icon: <Wrench className="w-6 h-6" /> },
    { name: 'AC Services & Repair', icon: <Zap className="w-6 h-6" /> },
    { name: 'Batteries', icon: <Battery className="w-6 h-6" /> },
    { name: 'Tyres and Wheel Care', icon: <Car className="w-6 h-6" /> },
    { name: 'Detailing Services', icon: <Battery className="w-6 h-6" /> },
    { name: 'Car Inspection', icon: <Eye className="w-6 h-6" /> },
    { name: 'Windshields & Lights', icon: <Lightbulb className="w-6 h-6" /> },
    { name: 'Suspension & Fitments', icon: <Settings className="w-6 h-6" /> },
    { name: 'Clutch & Body Parts', icon: <FileCheck className="w-6 h-6" /> },
    { name: 'Insurance Claims', icon: <Shield className="w-6 h-6" /> }
  ];

  const handleSelectCar = (packageId: string) => {
    setSelectedPackage(packageId);
	console.log(`Selected package: ${packageId}`);
	setShowForm(true)
  };

  const handleNavClick = (navItem: string) => {
    setActiveNavItem(navItem);
    setSelectedPackage(null); // Reset selected package when switching sections
    console.log(`Navigated to: ${navItem}`);
  };

  const toggleExpandServices = (packageId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  };

  const [showForm, setShowForm] = useState<boolean>(false);

  // Get current content based on active navigation
  const currentContent = contentSections[activeNavItem] || contentSections['Periodic Services'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      {/* Vertical Left Sidebar Navigation */}
	<div className="flex min-h-screen bg-gray-50">
  {/* Left Sidebar */}
  <div className="fixed w-64 bg-white shadow-lg flex-shrink-0">
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Services</h2>
      <nav className="space-y-2">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavClick(item.name)}
            className={`flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              activeNavItem === item.name
                ? 'bg-red-50 text-red-600 border-l-4 border-red-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
            }`}
          >
            <div className="mr-3 flex-shrink-0">
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  </div>


      {/* Main Content */}
        <div className="flex-1 overflow-x-hidden">
    {/* Main Content */}
    <div className="max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{currentContent.title}</h1>

        <div className="space-y-6">
          {currentContent.packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              {pkg.isRecommended && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <div className="flex flex-col md:flex-row">
                {/* Service Image */}
                <div className="md:w-48 h-48 md:h-auto bg-gray-200 flex-shrink-0">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NS4zMzMzIDc1SDExNC42NjdNMTAwIDYwLjMzMzNWODkuNjY2N00xMDAgMTA1QzExNi41NjkgMTA1IDEzMCA5MS41Njg1IDEzMCA3NUMxMzAgNTguNDMxNSAxMTYuNTY5IDQ1IDEwMCA0NUM4My40MzE1IDQ1IDcwIDU4LjQzMTUgNzAgNzVDNzAgOTEuNTY4NSA4My40MzE1IDEwNSAxMDAgMTA1WiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>

                {/* Service Details */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h2>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="text-blue-600">• {pkg.warranty}</span>
                          <span className="ml-4 text-blue-600">• {pkg.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {pkg.services.slice(0, expandedServices[pkg.id] ? pkg.services.length : 4).map((service, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span>{service.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Additional Services Link */}
                  {pkg.additionalCount && (
                    <div className="mb-6">
                      <button 
                        onClick={() => toggleExpandServices(pkg.id)}
                        className="text-blue-600 text-sm hover:underline transition-colors"
                      >
                        {expandedServices[pkg.id] 
                          ? 'Show Less' 
                          : `+ ${pkg.additionalCount} more View All`
                        }
                      </button>
                    </div>
                  )}

                  {/* Select Car Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSelectCar(pkg.id)}
                      className={`px-6 py-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105 ${
                        selectedPackage === pkg.id
                          ? 'bg-red-600 text-white border-2 border-red-600'
                          : 'bg-white border-2 border-red-600 text-red-600 hover:bg-red-50'
                      }`}
                    >
                      {selectedPackage === pkg.id ? 'SELECTED' : 'SELECT CAR'}
                    </button>
                  </div>				  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
        </div>
		 {showForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50  ">
                          <div className="">
                            <SelectCarPage onClose={() => setShowForm(false)} />
                          </div>
                        </div>
                      )}
      </div>
  );
};

export default ServiceCentersPage;