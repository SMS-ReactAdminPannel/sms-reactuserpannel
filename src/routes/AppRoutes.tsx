import { Routes, Route, Navigate } from 'react-router-dom';
import Notifications from '../pages/Notifications/Notifications';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import BookingsPage from '../pages/Bookings/BookingsPage';
import BookingCartPage from '../pages/Booking-Cart/BookingCartPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
// import SOSPage from '../pages/SOS/SOSPage';
import HelpCenterPage from '../pages/HelpCenter/HelpCenter';
import FaqsPage from '../pages/FAQs/FaqPage';
import MainLayout from '../layout/MainLayout';
import AnnouncementPage from '../pages/Announcement/AnnouncementPage';
import HomePage from '../pages/Home/HomePage';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
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
				<Route index element={<HomePage />} />
				<Route path='notifications' element={<Notifications />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path='profile' element={<ProfilePage />} />
				<Route path='bookings' element={<BookingsPage />} />
				<Route path='booking-cart' element={<BookingCartPage />} />
				<Route path='services' element={<ServicesPage />} />
				<Route path='announcement' element={<AnnouncementPage />} />
				{/* <Route path='sos' element={<SOSPage />} /> */}
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
