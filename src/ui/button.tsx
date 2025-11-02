import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Button({
  className,
  children,
  loading,
  loadingText,
  ...props
}: ComponentPropsWithoutRef<"button"> & { loading?: boolean; loadingText?: string }) {
  return (
    <button
      className={cn(
        "w-full bg-gradient-to-r relative overflow-clip from-primary to-secondary gap-2 font-medium text-white h-11 flex items-center justify-center py-2.5 px-4 text-[15px] rounded-md hover:opacity-90 ring-0 transition-colors",
        className,
        {
          "opacity-50 cursor-not-allowed": props.disabled,
        }
      )}
      {...props}
    >
      {loading && <div className='absolute inset-0 bg-white opacity-50 rounded-md' />}
      {loading && <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />}
      {loading ? loadingText : children}
    </button>
  );
}
