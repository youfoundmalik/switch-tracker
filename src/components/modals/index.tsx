import { cn } from "@/utils/cn";
import { type HTMLAttributes, useEffect } from "react";
import { CloseIcon } from "@/components/icons/close";

interface ModalBaseProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  hideClose?: boolean;
}

const ModalBase: React.FC<ModalBaseProps> = ({ children, isOpen, onClose, header, hideClose, className, ...props }) => {
  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore body scroll
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm' onClick={onClose}>
      <div
        className={cn(
          "bg-white rounded-lg max-w-lg w-[90%] mx-2.5 max-h-[90%] flex flex-col gap-5 py-6 px-4 overflow-hidden relative animate-fadeIn",
          className
        )}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        {...props}
      >
        {header && (
          <div className={cn("relative w-full flex items-center gap-10 pb-4 px-0 pt-0", !hideClose && "justify-between")}>
            <p className='font-semibold text-gray-900'>{header}</p>
            
            {!hideClose && (
              <button
                onClick={onClose}
                aria-label='close'
                className='w-9 h-9 flex cursor-pointer items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition'
              >
                <CloseIcon />
              </button>
            )}

            {/* header divider */}
            <div className='absolute bottom-0 left-0 w-full border-b border-secondary' />
            <div className='absolute bottom-0 left-0 w-[150px] border-b-2 border-primary' />
          </div>
        )}

        {!header && !hideClose && (
          <button
            onClick={onClose}
            aria-label='close'
            className='absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition'
          >
            <CloseIcon />
          </button>
        )}

        {/* Modal content */}
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
};

export default ModalBase;
