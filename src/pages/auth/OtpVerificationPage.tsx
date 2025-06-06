
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useState, useRef } from 'react'; 
import { useForm } from 'react-hook-form'; 


type OtpFormData = {
  otp: string;
};

const OtpVerificationPage = () => {
  const [storedOtp, setStoredOtp] = useState('123456'); // Simulate stored OTP
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OtpFormData>();

  const navigate = useNavigate();

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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

  const handleOtpVerify = () => {
    const enteredOtp = otpDigits.join('');
    if (enteredOtp) {
      clearErrors('otp');
      navigate('/signup');
    } else {
      setError('otp', { message: 'Invalid OTP' });
    }
  };

  const onSubmit = (data: OtpFormData) => {
    // fallback handler - not used since button is of type 'button'
    console.log('OTP submitted:', data.otp);
  };

  return (
    <AuthLayout title="Verify OTP">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-semibold text-white">Enter the 6-digit OTP</label>
          <div className="flex justify-between space-x-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                ref={(el) => (otpRefs.current[idx] = el)}
                className="w-10 h-12 text-center text-lg rounded-lg border border-[#d77c7c] bg-white/80 text-[#7c0c0c] focus:ring-2 focus:ring-[#9b111e]"
              />
            ))}
          </div>
          {errors.otp && (
            <span className="text-xs text-red-500">{errors.otp.message}</span>
          )}
          <button
            type="button"
            onClick={handleOtpVerify}
            className="w-full py-2 mt-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#9b111e] to-[#d23c3c] text-sm"
          >
            Verify OTP
          </button>
        </div>

        <div className="text-center pt-1">
          <Link
            to="/login"
            className="text-white hover:underline text-lg text-[#d23c3c] font-bold"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OtpVerificationPage;
