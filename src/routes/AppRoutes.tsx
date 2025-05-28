import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Notifications from '../pages/Notifications/Notifications';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import BookingsPage from '../pages/Bookings/BookingsPage';
import BookingCartPage from '../pages/Booking-Cart/BookingCartPage';
import LoginPage from '../pages/auth/LoginPage';
import ServiceCentersPage from '../pages/Service-Centers/ServiceCentersPage';
import SOSPage from '../pages/SOS/SOSPage';
import HelpCenterPage from '../pages/HelpCenter/HelpCenterPage';
import FaqsPage from '../pages/FAQs/FaqsPage';
import MainLayout from '../layout/MainLayout';
import ResetPassword from '../pages/auth/ResetPassword';
import OtpVerificationPage from '../pages/auth/OtpVerificationPage';
import EnterEmailOrPhone from '../pages/auth/EnterEmailOrPhone';
import SignupPage from '../pages/auth/SignupPage';
	

const AppRoutes = () => {
	// const { isAuthenticated } = useAuth();
	const isAuthenticated = true; // Replace with actual authentication logic

	const AuthRoutes = () => (
 <Routes>
      <Route path="enter-email-or-phone" element={<EnterEmailOrPhone />} />
      <Route path="verify-otp" element={<OtpVerificationPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='reset-password' element={<ResetPassword />} />
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
				<Route path='service-center' element={<ServiceCentersPage />} />
				<Route path='sos' element={<SOSPage />} />
				<Route path='help-center' element={<HelpCenterPage />} />
				<Route path='faqs' element={<FaqsPage />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);

	return isAuthenticated ? <AdminRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
