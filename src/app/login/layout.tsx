import { Logo } from "@/ui/logo";
import { ToastContainer } from "@/components/toast/ToastContainer";
import { type ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
  title: string;
}

export function LoginLayout({ children, title }: LoginLayoutProps) {
  return (
    <div className='min-h-screen w-screen flex flex-col items-center justify-center  px-4 relative'>
      <img src='/auth-bg.jpeg' alt='Switch - Health Tracker' className='absolute top-0 left-0 w-full h-full object-cover object-right-bottom' />
      <div className='w-full max-w-md relative z-10 h-full flex flex-col items-center justify-center gap-4'>
        <Logo className='w-44' />
        <div className='bg-white border border-gray-100 rounded-lg shadow-md p-8 w-full relative'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>{title}</h1>
          {children}
          <ToastContainer position='bottom' scope='login' />
        </div>
      </div>
    </div>
  );
}
