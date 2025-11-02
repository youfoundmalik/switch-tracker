import { cn } from "@/utils/cn";
import { type HTMLAttributes, useEffect } from "react";

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
                <svg className='w-5 h-5 text-gray-500' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11.9998 13.3998L7.0998 18.2998C6.91647 18.4831 6.68314 18.5748 6.3998 18.5748C6.11647 18.5748 5.88314 18.4831 5.6998 18.2998C5.51647 18.1165 5.4248 17.8831 5.4248 17.5998C5.4248 17.3165 5.51647 17.0831 5.6998 16.8998L10.5998 11.9998L5.6998 7.0998C5.51647 6.91647 5.4248 6.68314 5.4248 6.3998C5.4248 6.11647 5.51647 5.88314 5.6998 5.6998C5.88314 5.51647 6.11647 5.4248 6.3998 5.4248C6.68314 5.4248 6.91647 5.51647 7.0998 5.6998L11.9998 10.5998L16.8998 5.6998C17.0831 5.51647 17.3165 5.4248 17.5998 5.4248C17.8831 5.4248 18.1165 5.51647 18.2998 5.6998C18.4831 5.88314 18.5748 6.11647 18.5748 6.3998C18.5748 6.68314 18.4831 6.91647 18.2998 7.0998L13.3998 11.9998L18.2998 16.8998C18.4831 17.0831 18.5748 17.3165 18.5748 17.5998C18.5748 17.8831 18.4831 18.1165 18.2998 18.2998C18.1165 18.4831 17.8831 18.5748 17.5998 18.5748C17.3165 18.5748 17.0831 18.4831 16.8998 18.2998L11.9998 13.3998Z'
                    fill='black'
                  />
                </svg>
              </button>
            )}

            {/* header dividers */}
            <div className='absolute bottom-0 left-0 w-[150px] border-b-2 border-primary rounded-l-full z-10' />
            <div className='absolute bottom-0 left-0 w-full border-b border-secondary rounded-full z-0' />
          </div>
        )}

        {!header && !hideClose && (
          <button
            onClick={onClose}
            aria-label='close'
            className='absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition'
          >
            <svg className='w-5 h-5 text-gray-500' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.9998 13.3998L7.0998 18.2998C6.91647 18.4831 6.68314 18.5748 6.3998 18.5748C6.11647 18.5748 5.88314 18.4831 5.6998 18.2998C5.51647 18.1165 5.4248 17.8831 5.4248 17.5998C5.4248 17.3165 5.51647 17.0831 5.6998 16.8998L10.5998 11.9998L5.6998 7.0998C5.51647 6.91647 5.4248 6.68314 5.4248 6.3998C5.4248 6.11647 5.51647 5.88314 5.6998 5.6998C5.88314 5.51647 6.11647 5.4248 6.3998 5.4248C6.68314 5.4248 6.91647 5.51647 7.0998 5.6998L11.9998 10.5998L16.8998 5.6998C17.0831 5.51647 17.3165 5.4248 17.5998 5.4248C17.8831 5.4248 18.1165 5.51647 18.2998 5.6998C18.4831 5.88314 18.5748 6.11647 18.5748 6.3998C18.5748 6.68314 18.4831 6.91647 18.2998 7.0998L13.3998 11.9998L18.2998 16.8998C18.4831 17.0831 18.5748 17.3165 18.5748 17.5998C18.5748 17.8831 18.4831 18.1165 18.2998 18.2998C18.1165 18.4831 17.8831 18.5748 17.5998 18.5748C17.3165 18.5748 17.0831 18.4831 16.8998 18.2998L11.9998 13.3998Z'
                fill='black'
              />
            </svg>
          </button>
        )}

        {/* Modal content */}
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
};

export default ModalBase;
