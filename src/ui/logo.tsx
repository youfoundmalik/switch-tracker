import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Logo({ className, ...props }: ComponentPropsWithoutRef<"img">) {
  return <img src='/src/assets/switch-logo.svg' alt='Switch - Health Tracker' className={cn("object-contain w-10 h-auto", className)} {...props} />;
}
