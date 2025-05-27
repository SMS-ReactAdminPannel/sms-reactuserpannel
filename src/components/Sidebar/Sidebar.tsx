import { useState, type JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	FiHome,
	FiBell,
	FiUsers,
	FiClipboard,
	FiMapPin,
	FiTruck,
	FiSettings,
	FiAlertTriangle,
} from 'react-icons/fi';
import Logo from '../../assets/LOGO.jpg';
import { RiMenu2Line, RiMenu3Line } from 'react-icons/ri';
import { Megaphone } from 'lucide-react';

const COLOR = {
	primary: '#9b111e',
	bgColor: '#faf3eb',
	secondary: '#E6A895',
};

export const Sidebar = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// const uselocation = useLocation();

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<div className='flex h-screen'>
			<div className='bg-white border-r shadow-md p-2 transition-all duration-300 fixed top-0 left-0 h-screen z-40 flex flex-col items-center'>
				<div className='flex justify-center items-center h-20'>
					<img
						src={Logo}
						alt='YES Mechanic Logo'
						className={`object-contain transition-all duration-300 ${
							isOpen ? 'w-20 h-20' : 'w-10 h-10'
						}`}
					/>
				</div>
				<div className='w-full flex justify-end px-2 mt-2'>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='text-gray-600 hover:text-black p-2 rounded-md transition duration-200 hover:bg-gray-100'
						title='Toggle Sidebar'
					>
						{isOpen ? (
							<RiMenu3Line size={20} style={{ color: COLOR.primary }} />
						) : (
							<RiMenu2Line size={20} style={{ color: COLOR.primary }} />
						)}
					</button>
				</div>

				<nav className='flex flex-col gap-4 mt-4 w-full items-center'>
					<SidebarLink
						to='/'
						icon={<FiHome />}
						label='Dashboard'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/notifications'
						icon={<FiBell />}
						label='Notifications'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/profile'
						icon={<FiUsers />}
						label='Profile'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/bookings'
						icon={<FiClipboard />}
						label='Bookings'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/spare-parts'
						icon={<FiClipboard />}
						label='Spare-Parts'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/booking-cart'
						icon={<FiMapPin />}
						label='Booking Cart'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/service-center'
						icon={<FiTruck />}
						label='Service Center'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/announcement'
						icon={<Megaphone />}
						label='Announcement'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/settings'
						icon={<FiSettings />}
						label='Settings'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/sos'
						icon={<FiAlertTriangle />}
						label='SOS'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/help-center'
						icon={<FiAlertTriangle />}
						label='Help Center'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/faqs'
						icon={<FiAlertTriangle />}
						label='FAQs'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
				</nav>
			</div>
			<div
				className={`transition-all duration-300 ${
					isOpen ? 'ml-48' : 'ml-16'
				} flex-1`}
			></div>
		</div>
	);
};

const SidebarLink = ({
	to,
	icon,
	label,
	isOpen,
	onClick,
}: {
	to: string;
	icon: JSX.Element;
	label: string;
	isOpen: boolean;
	onClick: () => void;
}) => {
	const location = useLocation();
	const [isHovered, setIsHovered] = useState(false);
	const isActive = location.pathname === to;

	const backgroundColor = isActive
		? COLOR.primary
		: isHovered
		? COLOR.bgColor
		: 'transparent';

	const textColor = isActive ? COLOR.bgColor : COLOR.primary;

	return (
		<Link
			to={to}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ backgroundColor }}
			className={`flex items-center transition-all px-2 py-1 
        ${
					isOpen
						? 'w-full justify-start gap-5 pl-5 pr-1'
						: 'justify-center w-10 h-8'
				} 
        rounded-full
      `}
		>
			<div className='text-xl' style={{ color: textColor }}>
				{icon}
			</div>
			{isOpen && <span style={{ color: textColor }}>{label}</span>}
		</Link>
	);
};
