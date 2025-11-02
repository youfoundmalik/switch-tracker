type ClassValue = string | number | boolean | null | undefined | Record<string, unknown> | Array<ClassValue>;

export function cn(...classes: Array<ClassValue>): string {
  return classes
    .map((cls) => {
      if (!cls) return "";
      if (typeof cls === "string") return cls;
      if (typeof cls === "object") {
        if (Array.isArray(cls)) {
          return cn(...cls);
        }
        // Object with conditional classes
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
