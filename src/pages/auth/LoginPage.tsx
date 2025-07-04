/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FONTS } from '../../constants/constant';
import { useAuth } from './AuthContext';
import AuthLayout from './AuthLayout';
import { loginUser } from '../../features/auth'; // Adjust the import path as necessary

type FormData = {
	email: string;
	phone: string;
	password: string;
};

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const isLoading = false
	const { login } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "customer@gmail.com",
			password: "Customer@123"
		}
	});

	const onSubmit = async (data: FormData) => {
		setError(null);

		try {
			// setIsLoading(true);
			const response: any = await loginUser(data);
			if (response) {
				login(response.data.data);
				toast.success('Login successful! Welcome back.', { autoClose: 2000 });
				// setIsLoading(false);
				navigate('/');
			} else {
				const errorMessage = response?.data?.message || 'Login failed. Please try again.';
				setError(errorMessage);
				toast.error(errorMessage, { autoClose: 3000 });
			}
		} catch (error) {
			console.error('Login error:', error);
			const errorMessage = 'An error occurred during login. Please try again.';
			setError(errorMessage);
			toast.error(errorMessage, { autoClose: 3000 });
		} finally {
			// setIsLoading(false);
		}
	};

	// if (isLoading) {
	// 	return (
	// 		<div className='min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-2'>
	// 			<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
	// 			<p className='text-red-500 text-lg font-semibold'>Loading...</p>
	// 		</div>
	// 	);
	// }

	return (
		<AuthLayout title='User Login'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6 '>
				{/* Error message display */}
				{error && (
					<div className='p-3 text-sm text-white bg-[#0050A5] rounded-md'>
						{error}
					</div>
				)}
				{/* Email Field */}
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-bold text-white '>Email Address</label>
					<input
						type='email'
						placeholder='Enter your email address'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email format',
							},
						})}
						className={`w-full px-4 py-3 border text-gray-800 placeholder:text-[#0050A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0050B5] bg-white text-sm transition ${errors.email ? 'border-[#0050A5]' : 'border-[#0050A5]'
							}`}
					/>
					{errors.email && (
						<span
							className='text-xs text-[#0050A5]'
							style={{ ...FONTS.paragraph, fontSize: '12px' }}
						>
							{errors.email.message}
						</span>
					)}
				</div>

				{/* Password Field */}
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-bold text-white'>Password</label>
					<div className='relative'>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Enter your password'
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters',
								},
								pattern: {
									value:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message:
										'Password must contain uppercase, lowercase, number, and special character',
								},
							})}
							className={`w-full px-4 py-3 border text-gray-800 placeholder:text-[#0050A5] rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-[#0050A5] bg-white text-sm ${errors.password ? 'border-[#0050A5]' : 'border-[#0050A5]'
								}`}
						/>
						<span
							className='absolute top-3 right-3 text-gray-600 cursor-pointer'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeIcon className='w-5 h-5 text-[#0050A5]' />
							) : (
								<EyeSlashIcon className='w-5 h-5 text-[#0050A5]' />
							)}
						</span>
					</div>
					{errors.password && (
						<span
							className='text-xs text-[#0050A5]'
							style={{ ...FONTS.paragraph, fontSize: '12px' }}
						>
							{errors.password.message}
						</span>
					)}
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={isLoading}
					className={`w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 text-sm bg-[#0050A5] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
						}`}
				>
					{isLoading ? (
						<div className='flex items-center justify-center gap-2'>
							<div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white'></div>
							<span>Logging in...</span>
						</div>
					) : (
						'Login'
					)}
				</button>

				{/* Links */}
				<div className='mt-2 text-sm w-full'>
					<div className='text-right'>
						<Link
							to='/reset-password'
							className='text-white hover:underline'
						>
							Forgot Password?
						</Link>
					</div>
					<div className='text-center mt-1'>
						<p className='text-white '>
							Don't have an account?{' '}
							<Link
								to='/signup '
								className='text-[#0050A5] font-semibold hover:underline'
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;