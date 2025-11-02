import { Fragment, useState, type ReactNode } from "react";
import { ToastContainer } from "@/components/toast/ToastContainer";
import { Logo } from "@/ui/logo";
import { useUser } from "@/hooks/context/useUser";
import { Avatar } from "@/ui/avatar";
import { cn } from "@/utils/cn";
import LogoutModal from "@/components/modals/logout";
import { LogoutIcon } from "@/components/icons/logout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { activeUser } = useUser();

  return (
    <Fragment>
      <div className='h-svh bg-gray-50 relative flex flex-col'>
        <header className='bg-white shadow-md border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center min-h-16 py-2.5'>
              <Logo className='w-32' />
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <Avatar src={activeUser?.dp} alt={activeUser?.name} className='w-10 h-10' />
                  <div>
                    <p className='text-sm font-medium text-primary capitalize'>{activeUser?.name}</p>
                    <p className='text-[10px] text-gray-400'>
                      Blood: <span className='font-medium text-secondary'>{activeUser?.bloodType}</span> | Genotype:{" "}
                      <span className='font-semibold text-secondary'>{activeUser?.genotype}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className={cn("h-10 aspect-square rounded-md flex items-center justify-center hover:bg-red-50")}
                >
                  <LogoutIcon />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className='w-full flex overflow-hidden flex-col max-w-7xl mx-auto px-4 flex-1 sm:px-6 lg:px-8 py-8'>{children}</main>
        <ToastContainer position='left' scope='dashboard' />
      </div>

      <LogoutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
}
