import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { FONTS } from '../../constants/constant';
import { useAuth } from './AuthContext';
import AuthLayout from './AuthLayout';

type FormData = {
  email: string;
  phone: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Login data:', data);
    if (data.email && data.phone && data.password) {
      login();
      navigate('/');
    }
  };

  return (
    <AuthLayout title="User Login">
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 '>
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
            className={`w-full px-4 py-3 border text-gray-800 placeholder:text-[#9f3f3f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b111e] bg-white text-sm transition ${
              errors.email ? 'border-red-500' : 'border-[#d77c7c]'
            }`}
          />
          {errors.email && (
            <span className='text-xs text-red-600' style={{ ...FONTS.paragraph, fontSize: '12px' }}>
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
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain uppercase, lowercase, number, and special character',
                },
              })}
              className={`w-full px-4 py-3 border text-gray-800 placeholder:text-[#9f3f3f] rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-[#9b111e] bg-white text-sm ${
                errors.password ? 'border-red-500' : 'border-[#d77c7c]'
              }`}
            />
            <span
              className='absolute top-3 right-3 text-gray-600 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className='w-5 h-5 text-[#9b111e]' />
              ) : (
                <EyeSlashIcon className='w-5 h-5 text-[#9b111e]' />
              )}
            </span>
          </div>
          {errors.password && (
            <span className='text-xs text-red-600' style={{ ...FONTS.paragraph, fontSize: '12px' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 text-sm bg-gradient-to-r from-[#9b111e] to-[#d23c3c]'
        >
          Login
        </button>

        {/* Links */}
        <div className='mt-2 text-sm w-full'>
          <div className='text-right'>
            <Link to='/reset-password' className='text-white hover:underline hover:text-[#d23c3c]'>
              Forgot Password?
            </Link>
          </div>
          <div className='text-center mt-1'>
            <p className='text-white '>
              Don't have an account?{' '}
              <Link to='/enter-email-or-phone' className='text-[#d23c3c] font-semibold hover:underline'>
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