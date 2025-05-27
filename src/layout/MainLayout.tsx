import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { COLORS } from '../constants/constant';

const MainLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const date = new Date();
	return (
		<div className=''>
			{/* Sidebar takes up 1/9 of the width */}
			<div
			// className={`${
			// 	isSidebarOpen ? 'w-[190px]' : 'w-[68px]'
			// } transition-all duration-300`}
			></div>

			{/* Main content takes up the remaining 8/9 of the width */}
			<div className=''>
				<Navbar />
				{/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}
				<main className='flex-1 overflow-auto scrollbar-hide pt-[125px]'>
					<div
						className='p-2 rounded shadow'
						style={{ backgroundColor: COLORS.bgColor }}
					>
						<Outlet />
					</div>
				</main>
				<div>
					{/* Footer can be added here if needed */}
					<footer className='fixed bottom-0 w-full bg-gray-100 px-4 py-2 text-sm text-center'>
						&copy; {date.getFullYear()} yesmechanic. All rights reserved.
					</footer>
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
