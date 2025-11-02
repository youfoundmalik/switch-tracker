import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Avatar({ className, src, alt, ...props }: ComponentPropsWithoutRef<"div"> & { src?: string; alt?: string }) {
  return (
    <div className={cn("w-10 h-10 rounded-full overflow-hidden bg-gray-200", className)} {...props}>
      {src && <img src={src} alt={alt} className='w-full h-full object-cover' />}
    </div>
  );
}
