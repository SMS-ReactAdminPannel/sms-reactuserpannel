import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Notifications from '../pages/Notifications/Notifications';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import BookingsPage from '../pages/Bookings/BookingsPage';
import BookingCartPage from '../pages/Booking-Cart/BookingCartPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ServiceCentersPage from '../pages/Service-Centers/ServiceCentersPage';
import SOSPage from '../pages/SOS/SOSPage';
import HelpCenterPage from '../pages/HelpCenter/HelpCenterPage';
import FaqsPage from '../pages/FAQs/FaqsPage';
import MainLayout from '../layout/MainLayout';
import Spareparts from '../pages/Spare-Parts/Spareparts';

const AppRoutes = () => {
	// const { isAuthenticated } = useAuth();
	const isAuthenticated = true; // Replace with actual authentication logic

	const AuthRoutes = () => (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);

	const AdminRoutes = () => (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Dashboard />} />
				<Route path='notifications' element={<Notifications />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path='profile' element={<ProfilePage />} />
				<Route path='bookings' element={<BookingsPage />} />
				<Route path='booking-cart' element={<BookingCartPage />} />
				<Route path='sos' element={<SOSPage />} />
				<Route path='service-center' element={<ServiceCentersPage />} />
				<Route path='spare-parts' element={<Spareparts />} />
				<Route path='help-center' element={<HelpCenterPage />} />
				<Route path='faqs' element={<FaqsPage />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);

	return isAuthenticated ? <AdminRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
