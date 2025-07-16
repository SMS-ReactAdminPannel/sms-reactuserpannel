import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { SocketProvider } from '../context/customerSocket';

const MainLayout = () => {
	return (
		<SocketProvider role="customer">
		<div className=''>
			{/* Main content */}
			<div className=''>
				<Navbar />
				<main className='flex-1 overflow-auto scrollbar-hide pt-[115px] overflow-x-hidden'>
					<div className=''>
						<Outlet />
					</div>
				</main>
			</div>
		</div>
		</SocketProvider>
	);
};

export default MainLayout;
