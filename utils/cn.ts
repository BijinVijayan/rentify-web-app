import { type ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn(...)
 * - Accepts strings, arrays, objects (conditional), and falsy values.
 * - Merges Tailwind classes correctly (e.g., px-2 with px-4 → px-4).
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
