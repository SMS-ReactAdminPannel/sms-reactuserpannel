import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import profileImage from '../../assets/navbar/profileimage.jpg';

const ProfileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		// implement logout logic
		console.log('Logging out...');
	};

	return (
		<div className='relative inline-block text-left' ref={menuRef}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='focus:outline-none'
			>
				<img
					src={profileImage}
					alt='Profile'
					className='w-10	 h-10 rounded-full border-2 border-gray-300 hover:border-primary'
				/>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<div className='origin-top-right absolute mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 bg-[#faf3eb]'>
					<div className='py-1'>
						<Link
							to='/profile'
							className='flex items-center px-4 py-2 text-lg font-semibold text-[#9b111e] hover:bg-[#ffd46b]'
						>
							<FiUser className='mr-2' /> Profile
						</Link>
						<button
							onClick={handleLogout}
							className='flex items-center w-full px-4 py-2 text-lg font-semibold text-[#9b111e] hover:bg-[#ffd46b]'
						>
							<FiLogOut className='mr-2' /> Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
