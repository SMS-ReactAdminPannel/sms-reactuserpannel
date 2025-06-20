/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/AuthContext';
import { COLORS, FONTS } from '../../constants/constant';
import Logo from '../../assets/LOGO.png';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProfileMenu from '../home/ProfileMenu';
import CustomDropdown from './Customdropdown';
import TruckIcon from '../../assets/carimages/delivery-truck.png';
import { getAllNotifications } from '../../features/Notification/services';
import { booking_cart } from '../../features/BookingCart/service';
import { IoCartOutline } from 'react-icons/io5';

type MailItem = {
	is_read: any;
	created_at: string | number | Date;
	created_date: string | number | Date;
	sender: string;
	title: string;
	preview: string;
	Message: string;
	updated_at: string;
	unread: boolean;
	recipient_type: string;
};

export const Navbar: React.FC = () => {
	const [isBellActive, setIsBellActive] = useState(false);
	// const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	// const [isLoggedIn, setIsLoggedIn] = useState(true);
	const { isAuthenticated } = useAuth();
	const isLoggedIn = isAuthenticated;
	const { logout } = useAuth();
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const notificationRef = useRef<HTMLDivElement | null>(null);
	const [search, setSearch] = useState('');
	const [mails, setMails] = useState<MailItem[]>([]);
	const [cartCount, setCartCount] = useState(0);

	const filteredMails = mails
		.filter((mail) => mail.recipient_type === 'user' && !mail.is_read)
		.slice(0, 4);

	const unReadMails = mails.filter(
		(mail) => mail.recipient_type === 'user' && !mail.is_read
	);

	const fetchAllNotifications = async () => {
		try {
			const response: any = await getAllNotifications('');
			const data: MailItem[] = response?.data?.data || [];
			const sortedData = data.sort(
				(a, b) =>
					new Date(b?.created_at).getTime() -
					new Date(a?.created_date).getTime()
			);
			setMails(sortedData);
		} catch (error) {
			console.log('Error Fetching Notifications:', error);
		}
	};

	const fetchBookingCartCount = async () => {
		try {
			const response: any = await booking_cart({});
			if (response) {
				setCartCount(
					response.data.data[0].services.length +
						response.data.data[1].services.length +
						response.data.data[0].products.length +
						response.data.data[1].products.length
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAllNotifications();
		fetchBookingCartCount();
	}, []);

	// Handle outside clicks for dropdown & notifications
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				// setIsDropdownOpen(false);
			}
			if (
				notificationRef.current &&
				!notificationRef.current.contains(e.target as Node)
			) {
				setShowNotifications(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleBellClick = () => {
		setIsBellActive(true);
		setShowNotifications((prev) => !prev);
		setTimeout(() => setIsBellActive(false), 150);
	};

	const handleViewAllNotifications = () => {
		setShowNotifications(false);
		navigate('/notifications');
	};

	const unreadCount = unReadMails.length;

	const handleLogout = () => {
		setShowLogoutConfirm(true);
		// setIsDropdownOpen(false);
	};

	const navData = [
		{ title: 'Home', link: '/' },
		{ title: 'Services', link: '/services' },
		{ title: 'Spare Parts', link: '/spare-parts' },
		{ title: 'Booking Cart', link: '/booking-cart' },
		{ title: 'Bookings', link: '/bookings' },
		{ title: 'Offers', link: '/announcement' },
	];

	const formatDate = (isoString: string) => {
		const date = new Date(isoString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear()).slice(-2);
		let hours = date.getHours();
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12;
		const formattedHours = String(hours).padStart(2, '0');
		const formatted = `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;
		return formatted;
	};

	return (
		<header className='bg-white text-white w-full fixed top-0 z-50 border-b-2 border-red-900'>
			{/* Top Navbar */}
			<div className='bg-red-900 h-[2px]'></div>
			<div className='flex items-center justify-between px-24 py-2 space-x-4'>
				{/* Logo & Location */}
				<div className='flex items-center space-x-4'>
					<Link to='/' className='text-2xl font-bold text-white'>
						<img
							src={Logo}
							alt='yes mechanic logo'
							className='w-[185px] h-[28px]'
						/>
					</Link>
				</div>

				<div className='text-white flex items-center gap-1'>
					<img src={TruckIcon} style={{ width: '30px' }} />
					<label
						className='text-red-900 cursor-pointer'
						style={{ ...FONTS.sub_paragraph1, fontWeight: 600 }}
					>
						QUICK DELIVERY
					</label>
				</div>

				<div className='text-white flex items-center '>
					<CustomDropdown />
				</div>
				{/* 

				{/* Search Bar */}
				<div className='flex flex-1 justify-end'>
					<input
						type='text'
						className='px-4 py-2 text-[#9b111e] placeholder-gray-600 text-sm bg-[#fdefe9] rounded-l-md focus:outline-none focus:ring-[#9b111e] w-[290px] shadow-md'
						placeholder='Search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button className='bg-red-900 px-3 py-2 rounded-r-md'>
						<FiSearch
							className='text-black text-xl'
							color={COLORS.white}
							size={18}
						/>
					</button>
				</div>

				{/* Right Side Options */}
				<div className='flex items-center text-sm gap-3'>
					<div className='relative' ref={notificationRef}>
						<button
							aria-label='Notifications'
							onClick={handleBellClick}
							className={`relative p-2.5 rounded-full focus:outline-none transform transition-transform duration-200 ease-in-out ${
								isBellActive ? 'scale-90' : 'scale-100'
							}`}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.8}
								stroke='currentColor'
								className='w-6 h-6 text-red-900'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6V11c0-3.3-2.2-6.1-5.3-6.8V4a.7.7 0 00-1.4 0v.2C8.2 4.9 6 7.7 6 11v5l-1.7 1.7a1 1 0 00.7 1.7h14a1 1 0 00.7-1.7L18 16z'
								/>
							</svg>
							{unreadCount > 0 && (
								<span className='absolute top-0 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>
									{unreadCount}
								</span>
							)}
						</button>

						{showNotifications && (
							<div className='absolute right-0 mt-2 w-80 rounded-lg shadow-xl bg-white z-50 overflow-hidden'>
								<div className='bg-red-900 p-3'>
									<h3 className='text-white font-bold'>Notifications</h3>
								</div>
								<div className='max-h-80 overflow-y-auto'>
									{filteredMails.length > 0 ? (
										filteredMails.map((notification: any) => (
											<div
												key={notification._id}
												className={`group relative p-3 border-b hover:bg-gray-50 transition-colors duration-150 bg-red-50
												}`}
											>
												{/* This vertical red line will now appear on hover */}

												<div className='absolute left-0 top-0 h-full w-1 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>

												<div className='flex justify-between items-start'>
													<p className='text-sm text-red-900 font-semibold'>
														{notification.title}
													</p>
												</div>
												<p className='text-xs text-red-800 mt-1 text-right'>
													{formatDate(notification?.created_at)}
												</p>
											</div>
										))
									) : (
										<p className='p-3 text-gray-500 text-sm'>
											No notifications
										</p>
									)}
								</div>
								<div className='p-3 bg-gray-50 text-center border-t'>
									<button
										onClick={handleViewAllNotifications}
										className='text-red-600 hover:text-red-800 font-medium text-sm transition-colors'
									>
										View All Notifications
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Logout Confirmation Modal */}
					{showLogoutConfirm && (
						<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
							<div className='bg-white rounded-xl shadow-lg w-80 p-6 space-y-4 text-center'>
								<h2 className='text-lg font-semibold text-red-600'>
									Are you sure you want to logout?
								</h2>
								<div className='flex justify-center gap-4 mt-4'>
									<button
										onClick={() => setShowLogoutConfirm(false)}
										className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800'
									>
										Cancel
									</button>
									<button
										onClick={() => {
											setShowLogoutConfirm(false);
											setShowLogoutSuccess(true);
											setTimeout(() => {
												setShowLogoutSuccess(false);
												logout();
												navigate('/');
											}, 1000);
										}}
										className='px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700'
									>
										OK
									</button>
								</div>
							</div>
						</div>
					)}
					{/* Logout Success Modal */}
					{showLogoutSuccess && (
						<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
							<div className='bg-white rounded-xl shadow-xl w-80 p-6 flex flex-col items-center space-y-4 text-center animate-fade-in'>
								{/* Animated Checkmark with Tailwind */}
								<svg
									className='w-16 h-16 text-green-600 animate-draw-check'
									viewBox='0 0 52 52'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										cx='26'
										cy='26'
										r='25'
										stroke='currentColor'
										strokeWidth='2'
										className='stroke-current'
									/>
									<path
										d='M14 27L22 35L38 19'
										stroke='currentColor'
										strokeWidth='4'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='animate-draw-path'
									/>
								</svg>
								<p className='text-green-700 text-lg font-semibold'>
									Logout Successfully!
								</p>
							</div>
							<style>
								{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }

            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }

            @keyframes draw-path {
                from { stroke-dasharray: 48; stroke-dashoffset: 48; }
                to { stroke-dashoffset: 0; }
            }

            .animate-draw-path {
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: draw-path 0.5s ease-out forwards;
            }

            @keyframes draw-check {
                from { stroke-dasharray: 166; stroke-dashoffset: 166; }
                to { stroke-dashoffset: 0; }
            }

            .animate-draw-check circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                animation: draw-check 0.6s ease-out forwards;
            }
            `}
							</style>
						</div>
					)}
					<div
						className='relative flex items-center -left-2'
						onClick={() => {
							navigate('/booking-cart');
						}}
					>
						<IoCartOutline className='text-3xl cursor-pointer text-red-900' />
						<span className='absolute w-auto h-auto -top-2 left-6 bg-red-500 text-white text-xs rounded-full px-1 cursor-pointer text-center'>
							{cartCount || 0}
						</span>
					</div>
					{/* Profile Dropdown */}
					{isLoggedIn ? (
						<>
							<ProfileMenu handleLogout={handleLogout} />
						</>
					) : (
						<>
							<img
								src='/images/images.jpeg'
								alt='dummy-image'
								className='w-[52px] h-[52px] rounded-full cursor-pointer'
							/>
						</>
					)}
				</div>
			</div>

			{/* Bottom Navbar - Categories */}

			<div className='bg-[#fdefe9] px-24 py-1.5 flex items-center justify-center gap-10 shadow-lg'>
				{navData?.map((item, idx) => (
					<NavLink
						key={idx}
						to={item.link}
						style={{ ...FONTS.paragraph, fontWeight: 500, fontSize: '18px' }}
						className={({ isActive }) =>
							`relative pb-1 text-md font-semibold transition-all duration-300 ease-in-out whitespace-nowrap
	${
		isActive
			? 'text-red-900 after:content-[""] after:absolute after:left-0 after:bottom-9 after:h-[2.5px] after:w-full after:bg-red-900 after:transition-all after:duration-300'
			: 'text-red-800 after:content-[""] after:absolute after:left-0 after:bottom-9 after:h-[2.5px] after:w-0 after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full'
	}`
						}
					>
						{item.title}
					</NavLink>
				))}

				<div className='flex justify-end'>
					<button
						className='text-white py-1 px-8 rounded-full'
						style={{
							...FONTS.paragraph,
							fontWeight: 600,
							backgroundImage: `linear-gradient(to right, #9b111e, rgba(255,0,0,1), #9b111e)`,
						}}
						onClick={() => navigate('/contact-us')}
					>
						Enquiry
					</button>
				</div>
			</div>
			<div className='shadow-lg'></div>
		</header>
	);
};
