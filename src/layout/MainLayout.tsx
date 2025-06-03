import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { COLORS } from '../constants/constant';

const MainLayout = () => {
	return (
		<div className=''>
			{/* Main content */}
			<div className=''>
				<Navbar />
				<main className='flex-1 overflow-auto scrollbar-hide pt-[130px] overflow-x-hidden'>
					<div className='' style={{ backgroundColor: COLORS.bgColor }}>
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
