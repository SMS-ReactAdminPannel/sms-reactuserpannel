import { useEffect, useState } from 'react';
import {
	getUserProfile,
	updateUserProfile,
} from '../../features/Profile/service';
import { toast } from 'react-toastify';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	image?: string;
	contact_info: {
		city: string;
		state: string;
		phoneNumber: string;
		address1: string;
		address2: string;
		[key: string]: string; // Allow dynamic access for nested fields
	};
	vehicleInfo: {
		registerNumber: string;
		model: string;
		[key: string]: string;
	};
	[key: string]: any; // Allow dynamic access for top-level fields
}

interface Car {
	model: string;
	registerNumber: string;
}

const ProfilePage: React.FC = () => {
	const [isCarTab, setIsCarTab] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [showHistory, setShowHistory] = useState<number | null>(null);
	const [profileData, setProfileData] = useState<any>({});
	const [errors, setErrors] = useState<any>({});
	const [editCarMode, setEditCarMode] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		image: '',
		contact_info: {
			city: '',
			state: '',
			phoneNumber: '',
			address1: '',
			address2: '',
		},
		vehicleInfo: {
			registerNumber: '',
			model: '',
		},
	});

	const fetchUserProfile = async () => {
		try {
			const response: any = await getUserProfile({});
			if (response) {
				setFormData({
					firstName: response?.data?.data?.firstName,
					lastName: response?.data?.data?.lastName,
					email: response?.data?.data?.email,
					image: response?.data?.data?.image,
					contact_info: {
						city: response?.data?.data?.contact_info?.city,
						state: response?.data?.data?.contact_info?.state,
						phoneNumber: response?.data?.data?.contact_info?.phoneNumber,
						address1: response?.data?.data?.contact_info?.address1,
						address2: response?.data?.data?.contact_info?.address2,
					},
					vehicleInfo: {
						registerNumber: response?.data?.data?.vehicleInfo?.registerNumber,
						model: response?.data?.data?.vehicleInfo?.model,
					},
				});
				setProfileData(response?.data?.data);
				// setIsLoading(false);
			}
		} catch (error) {
			console.error('Error fetching user profile:', error);
		} finally {
			// setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const [cars, setCars] = useState<Car[]>([
		{
			model: '',
			registerNumber: '',
		},
	]);

	const validateField = (name: string, value: string) => {
		switch (name) {
			case 'firstName':
				return !value.trim() ? 'FirstName is required' : '';
			case 'lastName':
				return !value.trim() ? 'LastName is required' : '';
			case 'email':
				if (!value.trim()) return 'Email is required';
				if (!/^[^\s@]+@gmail\.com$/.test(value))
					return 'Email must be a Gmail address';
				return '';
			case 'contact_info.phoneNumber':
				if (!value.trim()) return 'Phone number is required';
				if (!/^[6-9]\d{9}$/.test(value.replace(/\D/g, '')))
					return 'Invalid Indian phone number format';
				return '';
			case `contact_info.address1`:
				return !value.trim() ? 'Address is required' : '';
			case 'con':
				return !value.trim() ? 'Address 2 is required' : '';
			case 'city':
				return !value.trim() ? 'City is required' : '';
			case 'state':
				return !value.trim() ? 'state is required' : '';
			default:
				return '';
		}
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let finalValue = value;

		setFormData((prev) => {
			// Handle nested objects (e.g., address.street)
			if (name.includes('.')) {
				const [parent, child] = name.split('.');
				return {
					...prev,
					[parent]: {
						...prev[parent],
						[child]: value,
					},
				};
			}

			// Handle simple fields and checkboxes
			return {
				...prev,
				[name]: value,
			};
		});

		setProfileData((prev: any) => ({ ...prev, [name]: finalValue }));
		const error = validateField(name, finalValue);
		setErrors((prev: any) => ({ ...prev, [name]: error }));
	};

	const addCar = () => {
		setCars([...cars, { model: '', registerNumber: '' }]);
	};

	const deleteCar = (index: number) => {
		const newCars = [...cars];
		newCars.splice(index, 1);
		setCars(newCars);
		setShowHistory(null);
	};

	const handleEditProfile = async () => {
		setEditMode(false);
		setEditCarMode(false);
		try {
			// Send only allowed fields
			const transformedData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				contact_info: {
					phoneNumber: formData?.contact_info?.phoneNumber,
					address1: formData?.contact_info?.address1,
					address2: formData?.contact_info?.address2,
					city: formData?.contact_info?.city,
					state: formData?.contact_info?.state,
				},
				image: formData?.image,
				vehicleInfo: {
					registerNumber: formData?.vehicleInfo?.registerNumber,
					model: formData?.vehicleInfo?.model,
				},
			};

			const response = await updateUserProfile(transformedData);
			if (response) {
				toast.success('Profile updated successfully!');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	return (
		<div className='h-screen w-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
			<div className='relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden'>
				{/* Car Details Panel */}
				<div
					className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
						isCarTab ? 'opacity-100 z-20' : 'opacity-0 z-10'
					}`}
				>
					<div className='flex h-full w-full'>
						{/* Red Section - Left */}
						<div
							className='w-1/2  relative overflow-hidden'
							style={{ backgroundColor: '#0050A5' }}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent' />
							<div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
								<h2 className='text-xl font-bold mb-4'>User Profile</h2>
								<p className='text-red-100 text-center mb-8 leading-relaxed'>
									Switch to manage your personal information and account details
								</p>
								<button
									onClick={() => setIsCarTab(false)}
									className='px-3 py-1 border-2 border-white bg-white rounded-full text-[#0050A5] font-medium  transition-all duration-300 hover:scale-105'
								>
									USER PROFILE
								</button>
							</div>
							<div className='absolute -right-14 top-0 w-24 h-full bg-gray-50 rounded-l-[3rem]' />
						</div>

						{/* Car Details Section - Right */}
						<div className='w-1/2 flex flex-col  p-8 bg-gray-50 relative'>
							<h2 className='text-3xl font-bold text-[#0050A5] mb-6 text-center'>
								Car Details
							</h2>
							<div className='flex-1 overflow-y-auto overflow-x-hidden pr-2 scrollbar-hide'>
								{editCarMode ? (
									<div className='w-full max-w-sm mx-auto space-y-4'>
										{cars.map((car, index) => (
											<div key={index} className='space-y-3'>
												<div className='border p-4 rounded-xl bg-white shadow relative'>
													<button
														onClick={() => deleteCar(index)}
														className='absolute top-3 right-5 bg-red-600 text-white rounded-md text-sm w-6 h-6 flex items-center justify-center'
														title='Delete this car'
													>
														X
													</button>

													<div className='grid gap-3 mt-8'>
														<input
															type='text'
															name='vehicleInfo.registerNumber'
															id=''
															value={formData?.vehicleInfo?.registerNumber}
															onChange={handleUserChange}
															placeholder='Car Registration No'
															className='w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300'
														/>
														<input
															name='vehicleInfo.model'
															type='text'
															placeholder='Car Model'
															value={formData?.vehicleInfo?.model}
															onChange={handleUserChange}
															className='w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300'
															style={
																{
																	'--tw-ring-color': '#0050A5',
																} as React.CSSProperties
															}
														/>
														<div className='flex gap-3 '>
															<button
																onClick={() => setEditCarMode(false)}
																className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-gray-400  shadow-lg'
															>
																Cancel
															</button>
															<button
																onClick={handleEditProfile}
																className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-[#0050A5] shadow-lg'
															>
																SAVE
															</button>
														</div>
													</div>
												</div>
											</div>
										))}
										<div className='flex flex-col items-center justify-center'>
											<button
												onClick={addCar}
												className='w-[180px] py-1.5 text-white font-medium rounded-lg  transition-all duration-300 hover:scale-95 shadow-lg sticky bottom-0'
												style={{ backgroundColor: '#0050A5' }}
											>
												ADD ANOTHER CAR
											</button>
										</div>
									</div>
								) : (
									<>
										<div className='space-y-4 bg-white p-6  rounded-xl shadow-lg'>
											<div className='space-y-3'>
												<p className='text-lg'>
													<strong className='text-gray-700'>
														Register No:
													</strong>{' '}
													<span className='text-gray-600'>
														{profileData?.vehicleInfo?.registerNumber || 'N/A'}
													</span>
												</p>
												<p className='text-lg'>
													<strong className='text-gray-700'>Car Model:</strong>{' '}
													<span className='text-gray-600'>
														{profileData?.vehicleInfo?.model}
													</span>
												</p>
											</div>
											<div className='flex flex-col items-center justify-center'>
												<button
													onClick={() => setEditCarMode(true)}
													className='w-[180px]  py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300  shadow-lg mt-4'
													style={{ backgroundColor: '#0050A5' }}
												>
													EDIT
												</button>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* User Profile Panel */}
				<div
					className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
						isCarTab ? 'opacity-0 z-10' : 'opacity-100 z-20'
					}`}
				>
					<div className='flex h-full w-full'>
						{/* User Profile Section - Left */}
						<div className='w-1/2 flex flex-col items-center justify-top pt-10 p-4 bg-gray-50 relative'>
							<h2 className='text-3xl font-bold text-[#0050A5] mb-6'>
								User Information
							</h2>

							<div className='w-full overflow-scroll scrollbar-hide px-2 space-y-4'>
								{editMode ? (
									<>
										<div>
											<input
												name='firstName'
												value={formData?.firstName}
												onChange={handleUserChange}
												placeholder='First Name'
												maxLength={15}
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.firstName ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.firstName
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.firstName && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.firstName}
												</p>
											)}
										</div>
										<div>
											<input
												name='lastName'
												value={formData?.lastName}
												onChange={handleUserChange}
												maxLength={15}
												placeholder='Last Name'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.lastName ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.lastName
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.lastName && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.lastName}
												</p>
											)}
										</div>
										<div>
											<input
												name='email'
												value={formData?.email}
												onChange={handleUserChange}
												maxLength={25}
												placeholder='Email'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.email ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.email
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.email && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.email}
												</p>
											)}
										</div>
										<div>
											<input
												name='contact_info.phoneNumber'
												value={formData?.contact_info?.phoneNumber}
												onChange={handleUserChange}
												placeholder='Phone Number'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.number ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.number
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.number && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.number}
												</p>
											)}
										</div>
										<div>
											<input
												name='contact_info.address1'
												value={formData?.contact_info?.address1}
												maxLength={25}
												onChange={handleUserChange}
												placeholder='Address 1'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.address1 ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.address1
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.address1 && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.contact_info.address1}
												</p>
											)}
										</div>

										<div>
											<input
												name='contact_info.address2'
												value={formData?.contact_info?.address2}
												onChange={handleUserChange}
												maxLength={25}
												placeholder='Address 2'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.address2 ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.address2
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.address2 && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.address2}
												</p>
											)}
										</div>

										<div>
											<input
												name='contact_info.city'
												value={formData?.contact_info?.city}
												maxLength={15}
												onChange={handleUserChange}
												placeholder='City'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.city ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.city
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.city && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.city}
												</p>
											)}
										</div>

										<div>
											<input
												name='contact_info.state'
												value={formData?.contact_info?.state}
												maxLength={15}
												onChange={handleUserChange}
												placeholder='state'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.state ? 'ring-2 ring-red-500' : ''
												}`}
												style={
													{
														'--tw-ring-color': errors.state
															? '#ef4444'
															: '#0050A5',
													} as React.CSSProperties
												}
											/>
											{errors.state && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.state}
												</p>
											)}
										</div>

										<div>
											<div className='px-4 py-3 bg-gray-200 border-0 rounded-lg '>
												<input
													type='file'
													name='image'
													accept='image/*'
													onChange={(e) => {
														const file = e.target.files?.[0];
														if (file) {
															setFormData((prev: any) => ({
																...prev,
																image: URL.createObjectURL(file),
															}));
														}
													}}
												/>
											</div>
										</div>
										<div className='flex gap-4 '>
											<button
												className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-gray-400  shadow-lg'
												onClick={() => setEditMode(false)}
											>
												CANCEL
											</button>
											<button
												onClick={() => handleEditProfile()}
												className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300  shadow-lg'
												style={{ backgroundColor: '#0050A5' }}
											>
												SAVE
											</button>
										</div>
									</>
								) : (
									<div className='space-y-4 bg-white p-6 rounded-xl shadow-lg'>
										<div className='space-y-3'>
											<div className='flex justify-center'>
												<img
													src={formData?.image}
													alt='profile Pic'
													className='w-24 h-24 rounded-full object-cover'
												/>
											</div>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>
													First Name:
												</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.firstName}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>
													Last Name:
												</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.lastName}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>Email:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.email}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>Phone:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.phoneNumber}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>
													Address:
												</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.address1},{' '}
													{formData?.contact_info?.address2}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>City:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.city}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>State:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.state}
												</span>
											</p>
										</div>

										<div className='flex flex-col items-center justify-center'>
											<button
												onClick={() => setEditMode(true)}
												className='w-[180px] py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg mt-4'
												style={{ backgroundColor: '#0050A5' }}
											>
												EDIT
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Red Section - Right */}
						<div
							className='w-1/2  relative overflow-hidden'
							style={{ backgroundColor: '#0050A5' }}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent' />
							<div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
								<h2 className='text-2xl font-bold mb-4'>Car Details</h2>
								<p className='text-red-100 text-center mb-8 leading-relaxed'>
									Switch to manage your vehicle information and service requests
								</p>
								<button
									onClick={() => setIsCarTab(true)}
									className='px-3 py-1 border-2 border-white bg-white text-[#0050A5] rounded-full  font-medium  transition-all duration-300 hover:scale-105'
								>
									CAR DETAILS
								</button>
							</div>
							<div className='absolute -left-14 top-0 w-24 h-full bg-gray-50 rounded-r-[3rem]' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
