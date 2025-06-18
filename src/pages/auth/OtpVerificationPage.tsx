/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, } from 'react-router-dom';

import AuthLayout from './AuthLayout';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { verifyotp } from '../../features/auth';
import { useAuth } from './AuthContext';

type OtpFormData = {
	otp: string;
};

const OtpVerificationPage = () => {
	const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { login } = useAuth();
	const {
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<OtpFormData>();

	const navigate = useNavigate();
	const otpDataRaw = localStorage.getItem('otpData');
	const otpData = otpDataRaw ? JSON.parse(otpDataRaw) : null;
	// const [isLoading, setIsLoading] = useState(false);

	const handleOtpChange = (index: number, value: string) => {
		if (!/^\d?$/.test(value)) return;
		const updated = [...otpDigits];
		updated[index] = value;
		setOtpDigits(updated);
		if (value && index < 5) {
			otpRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace') {
			e.preventDefault();
			const updated = [...otpDigits];
			if (otpDigits[index]) {
				updated[index] = '';
			} else if (index > 0) {
				updated[index - 1] = '';
				otpRefs.current[index - 1]?.focus();
			}
			setOtpDigits(updated);
		}
	};

	const handleOtpVerify = async () => {
		const enteredOtp = otpDigits.join('');
		// setIsLoading(true);
		if (enteredOtp.length !== 6) {
			setError('otp', { message: 'Please enter a valid 6-digit OTP' });
			return;
		}

		try {
			clearErrors('otp');
			const response: any = await verifyotp({
				otp: enteredOtp,
				AuthToken: otpData?.token,
			});

			if (response) {
				localStorage.removeItem('otpData');
				login(response.data.data);
				navigate('/');
			} else {
				setError('otp', {
					message:
						response?.message || 'OTP verification failed. Please try again.',
				});
			}
			// setIsLoading(false);
		} catch (error: any) {
			setError('otp', {
				message:
					error?.response?.data?.message ||
					'An error occurred during verification.',
			});
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
		<AuthLayout title='Verify OTP'>
			<form className='space-y-6'>
				<div className='flex flex-col space-y-3'>
					<label className='text-sm font-semibold text-white'>
						Enter the 6-digit OTP
					</label>
					<label className='text-sm font-semibold text-white'>
						{otpData.otp}
					</label>

					<div className='flex justify-between space-x-2'>
						{otpDigits.map((digit, idx) => (
							<input
								key={idx}
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e) => handleOtpChange(idx, e.target.value)}
								onKeyDown={(e) => handleOtpKeyDown(e, idx)}
								// ref={(el) => (otpRefs.current[idx] = el)}
								className='w-10 h-12 text-center text-lg rounded-lg border border-[#d77c7c] bg-white/80 text-[#7c0c0c] focus:ring-2 focus:ring-[#9b111e]'
							/>
						))}
					</div>
					{errors.otp && (
						<span className='text-xs text-red-500'>{errors.otp.message}</span>
					)}
					<button
						type='button'
						onClick={handleOtpVerify}
						className='w-full py-2 mt-2 text-white font-semibold rounded-full bg-red-900 hover:bg-red-700 text-sm'
					>
						Verify OTP
					</button>
				</div>

				{/* <div className='text-center pt-1'>
					<Link
						to='/login'
						className='text-white hover:underline text-lg text-[#d23c3c] font-bold'
					>
						Back to Login
					</Link>
				</div> */}
			</form>
		</AuthLayout>
	);
};

export default OtpVerificationPage;
