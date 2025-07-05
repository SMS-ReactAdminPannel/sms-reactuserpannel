import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack, timeOutline, locationOutline } from 'ionicons/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedService?: {
		duration?: string;
	};
	isAuthenticated?: boolean;
	onAddToCart?: () => void;
	onOpenSignUp?: () => void;
}

const BookingModal = ({
	isOpen,
	onClose,
	selectedService,
	isAuthenticated,
	onAddToCart,
	onOpenSignUp,
}: BookingModalProps) => {
	const [selectedBookingType, setSelectedBookingType] = useState<
		'general' | 'prebook'
	>('general');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-999 overflow-y-auto'>
			<div className='flex items-center justify-center mt-24 h-[90vh] pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-y-auto'>
				{/* Background overlay */}
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div
						className='absolute inset-0 bg-gray-500 opacity-15'
						onClick={onClose}
					></div>
				</div>

				{/* Modal container */}
				<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						{/* Header */}
						<div className='flex items-center mb-4'>
							<button
								onClick={onClose}
								className='mr-2 text-gray-700 hover:text-gray-900'
							>
								<IonIcon icon={arrowBack} className='text-2xl' />
							</button>
							<h3 className='text-lg font-medium text-gray-900'>
								Booking Options
							</h3>
						</div>

						{/* Booking Type Selection */}
						<div className='flex mb-6 rounded-md overflow-hidden border border-gray-300'>
							<button
								className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
									selectedBookingType === 'general'
										? 'bg-blue-500 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-100'
								}`}
								onClick={() => setSelectedBookingType('general')}
							>
								General Service
							</button>
							<button
								className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
									selectedBookingType === 'prebook'
										? 'bg-blue-500 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-100'
								}`}
								onClick={() => setSelectedBookingType('prebook')}
							>
								Pre-Booked Service
							</button>
						</div>

						{/* General Service Details */}
						{selectedBookingType === 'general' && (
							<div className='mb-6'>
								<h4 className='text-lg font-bold mb-4'>Service Details</h4>

								<div className='space-y-3 mb-4'>
									<div className='flex items-center'>
										<IonIcon
											icon={timeOutline}
											className='text-blue-500 mr-2 text-xl'
										/>
										<span>
											Duration: {selectedService?.duration || '1-2 hours'}
										</span>
									</div>
									<div className='flex items-center'>
										<IonIcon
											icon={timeOutline}
											className='text-blue-500 mr-2 text-xl'
										/>
										<span>Working Hours: 9:00 AM - 5:00 PM</span>
									</div>
									<div className='flex items-center'>
										<IonIcon
											icon={locationOutline}
											className='text-blue-500 mr-2 text-xl'
										/>
										<span>Service Center Location</span>
									</div>
								</div>

								<div className='mb-4'>
									<label className='block font-medium mb-2'>
										Preferred Time:
									</label>
									<div className='flex items-center'>
										<input
											type='time'
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
											className='flex-1 border border-gray-300 rounded p-2 mr-2'
										/>
										<span className='mx-2'>to</span>
										<input
											type='time'
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
											className='flex-1 border border-gray-300 rounded p-2'
										/>
									</div>
								</div>
							</div>
						)}

						{/* Pre-Booked Service Details */}
						{selectedBookingType === 'prebook' && (
							<div className='mb-6'>
								<h4 className='text-lg font-bold mb-4'>Select Date & Time</h4>

								<div className='mb-4'>
									<label className='block font-medium mb-2'>Select Date:</label>
									<DatePicker
										selected={selectedDate}
										onChange={(date: Date) => setSelectedDate(date)}
										minDate={new Date()}
										className='w-full border border-gray-300 rounded p-2'
									/>
								</div>

								<div className='mb-4'>
									<label className='block font-medium mb-2'>
										Preferred Time:
									</label>
									<div className='flex items-center'>
										<input
											type='time'
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
											className='flex-1 border border-gray-300 rounded p-2 mr-2'
										/>
										<span className='mx-2'>to</span>
										<input
											type='time'
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
											className='flex-1 border border-gray-300 rounded p-2'
										/>
									</div>
								</div>

								<div className='bg-blue-50 p-3 rounded text-blue-800'>
									<p>
										Note: Pre-booked services require confirmation from our
										team. We'll contact you shortly.
									</p>
								</div>
							</div>
						)}

						{/* Book Service Button */}
						<button
							onClick={isAuthenticated ? onAddToCart : onOpenSignUp}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors'
						>
							{selectedBookingType === 'general'
								? 'BOOK NOW'
								: 'PRE-BOOK SERVICE'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingModal;
