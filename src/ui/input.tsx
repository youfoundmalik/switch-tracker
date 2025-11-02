import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Input({
  className,
  startIcon,
  endIcon,
  ...props
}: ComponentPropsWithoutRef<"input"> & { startIcon?: React.ReactNode; endIcon?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border border-gray-300 rounded-md relative h-11 focus-within:ring-[3px] focus-within:ring-secondary bg-white focus-within:bg-gray-50 focus-within:border-transparent"
      )}
    >
      {startIcon && <div className='absolute h-full w-10 flex items-center justify-center'>{startIcon}</div>}
      <input
        className={cn("w-full px-3 py-2  text-sm h-full focus:outline-none ring-0 border-0 bg-transparent", className, {
          "pl-12": startIcon,
          "pr-12": endIcon,
        })}
        {...props}
      />
      {endIcon && <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>{endIcon}</span>}
    </div>
  );
}
