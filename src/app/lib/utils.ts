import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const camelCaseToHumanText = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char: string) => char.toUpperCase());
};

