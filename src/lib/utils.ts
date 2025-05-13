import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isLastItem = (index: number, arrayLength: number) => {
  return index === arrayLength - 1;
};
