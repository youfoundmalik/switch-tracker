import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Label({ className, children, ...props }: ComponentPropsWithoutRef<"label">) {
  return (
    <label className={cn("block text-[13px] font-medium text-gray-700 mb-1", className)} {...props}>
      {children}
    </label>
  );
}
