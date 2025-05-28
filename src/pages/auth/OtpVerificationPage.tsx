import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

type OtpFormData = {
  otp: string;
};

const OtpVerificationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>();

  const navigate = useNavigate();

  const onSubmit = (data: OtpFormData) => {
    console.log('OTP submitted:', data.otp);
    if (data.otp === '123456') {
      navigate('/signup');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <AuthLayout title="Verify OTP">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-800">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter the OTP sent to your email/phone"
            maxLength={6}
            {...register('otp', {
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'OTP must be 6 digits',
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b111e] bg-white text-sm text-gray-800 ${
              errors.otp ? 'border-red-500' : 'border-[#d77c7c]'
            }`}
          />
          {errors.otp && (
            <span className="text-xs text-red-600">{errors.otp.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#9b111e] to-[#d23c3c]"
        >
          Verify OTP
        </button>
      </form>
    </AuthLayout>
  );
};

export default OtpVerificationPage;