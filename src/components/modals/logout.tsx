import { Button } from "@/ui/button";
import ModalBase from ".";
import { useAuth } from "@/hooks/context/useAuth";
import { LogoutIcon } from "@/components/icons/logout";

const LogoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { logout } = useAuth();

  return (
    <ModalBase isOpen={isOpen} hideClose className='!max-w-sm' onClose={onClose}>
      <div className='flex flex-col items-center gap-6'>
        <div className='w-16 h-16 flex items-center justify-center bg-red-50 rounded-full'>
          <div className='w-12 h-12 flex items-center justify-center bg-red-200 rounded-full'>
            <LogoutIcon />
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-center text-gray-700 text-lg font-semibold'>Are you sure you want to logout?</p>
          <p className='text-center text-gray-500 text-sm'>You will be redirected to the login page.</p>
        </div>
        <div className='w-full flex items-center justify-end gap-2'>
          <Button variant='outline' className='flex-1 !border-gray-300 !text-gray-700' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='solid' color='danger' className='flex-1' onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default LogoutModal;
