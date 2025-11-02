import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/context/useToast";
import { cn } from "@/utils/cn";

type ToastPosition = "bottom" | "left";

interface ToastContainerProps {
  position?: ToastPosition;
  duration?: number; // Duration in milliseconds (default: 3000ms)
  scope?: string; // Scope identifier to filter toasts
}

export function ToastContainer({ position = "bottom", duration = 3000, scope }: ToastContainerProps) {
  const { toasts, removeToast, clearToastsByScope } = useToast();

  // Filter toasts by scope - only show toasts matching this container's scope
  const scopedToasts = scope ? toasts.filter((t) => t.scope === scope) : toasts;
  const [visibleToasts, setVisibleToasts] = useState<Set<string>>(new Set());
  const previousToastsRef = useRef<Set<string>>(new Set());
  const timeoutRefsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const currentIds = new Set(scopedToasts.map((t) => t.id));
    const previousIds = previousToastsRef.current;
    const timeoutsMap = timeoutRefsRef.current;

    // Find new toasts that need to animate in
    const newToasts = scopedToasts.filter((t) => !previousIds.has(t.id));

    // Animate in new toasts after a brief delay to ensure they start hidden
    newToasts.forEach((toast) => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisibleToasts((prev) => new Set(prev).add(toast.id));

          // Set timeout to start exit animation and remove toast
          const exitTimeout = setTimeout(() => {
            // Start exit animation
            setVisibleToasts((prev) => {
              const newSet = new Set(prev);
              newSet.delete(toast.id);
              return newSet;
            });

            // Remove from array after animation completes (300ms)
            setTimeout(() => {
              removeToast(toast.id);
              timeoutsMap.delete(toast.id);
            }, 300);
          }, duration);

          timeoutsMap.set(toast.id, exitTimeout);
        }, 10);
      });
    });

    // Handle toasts removed externally (mark for exit animation)
    previousIds.forEach((id) => {
      if (!currentIds.has(id)) {
        // Clear any existing timeout for removed toast
        const existingTimeout = timeoutsMap.get(id);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
          timeoutsMap.delete(id);
        }

        // Start exit animation
        setVisibleToasts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });

        // Remove after animation
        setTimeout(() => {
          removeToast(id);
        }, 300);
      }
    });

    previousToastsRef.current = currentIds;
  }, [scopedToasts, duration, removeToast]);

  // Cleanup on unmount - clear timeouts and remove all toasts for this scope
  useEffect(() => {
    const timeoutsMap = timeoutRefsRef.current;
    return () => {
      // Clear all pending timeouts
      timeoutsMap.forEach((timeout) => clearTimeout(timeout));
      timeoutsMap.clear();

      // Clear all toasts for this scope when navigating away
      if (scope) {
        clearToastsByScope(scope);
      }
    };
  }, [scope, clearToastsByScope]);

  if (scopedToasts.length === 0) return null;

  const containerClasses = {
    bottom: "absolute top-[102%] left-0 right-0 mt-2",
    left: "fixed right-4 top-[100px]  z-50",
  };

  const animationClasses = {
    bottom: {
      show: "max-h-20 opacity-100 translate-y-0",
      hide: "max-h-0 opacity-0 -translate-y-4",
    },
    left: {
      show: "max-w-sm opacity-100 translate-x-0",
      hide: "max-w-0 opacity-0 -translate-x-full",
    },
  };

  return (
    <div className={containerClasses[position]}>
      {scopedToasts.map((toast) => {
        const isVisible = visibleToasts.has(toast.id);
        return (
          <div
            key={toast.id}
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              position === "bottom" && "w-full",
              position === "left" && "w-80 mb-2",
              isVisible ? animationClasses[position].show : animationClasses[position].hide
            )}
          >
            <div
              className={cn(
                "rounded-lg p-4 text-sm",
                position === "bottom" && "text-center",
                toast.type === "error" ? "bg-red-50 border border-red-200 text-red-600" : "bg-green-50 border border-green-200 text-green-600"
              )}
            >
              {toast.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}
