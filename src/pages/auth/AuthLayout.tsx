import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-end min-h-screen p-4">
      <div className="w-full max-w-md shadow-2xl rounded-3xl p-10 border border-gray-200 bg-white transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-[#9b111e] text-center tracking-wide mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;