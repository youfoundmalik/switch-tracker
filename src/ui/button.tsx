import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Button({
  className,
  children,
  loading,
  loadingText,
  variant = "gradient",
  color,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
  loadingText?: string;
  variant?: "solid" | "outline" | "gradient";
  color?: "primary" | "secondary" | "danger";
}) {
  return (
    <button
      className={cn(
        "w-full relative overflow-clip from-primary transition-all to-secondary gap-2 font-medium text-white h-11 flex items-center justify-center py-2.5 px-4 text-[15px] rounded-md hover:opacity-90 ring-0",
        className,
        {
          "border border-gray-300 text-gray-500 hover:bg-gray-50": variant === "outline",
          "opacity-50 cursor-not-allowed": props.disabled,
          "bg-gradient-to-r from-primary to-secondary": variant === "gradient",
          "bg-primary": variant === "solid" && color === "primary",
          "bg-secondary text-primary": variant === "solid" && color === "secondary",
          "bg-red-500 text-white hover:bg-red-600": variant === "solid" && color === "danger",
          "border border-primary text-primary hover:bg-primary/10": variant === "outline" && color === "primary",
          "border border-secondary text-secondary hover:bg-secondary/10": variant === "outline" && color === "secondary",
          "border border-red-500 text-red-500 hover:bg-red-50": variant === "outline" && color === "danger",
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
