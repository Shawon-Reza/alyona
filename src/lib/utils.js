import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// utils/quiz.js
export const hasTakenQuizToday = () => {
  const storedDate = localStorage.getItem('daily_quiz_date');
  const today = new Date().toISOString().split('T')[0];
  return storedDate === today;
};

export const markQuizDoneToday = () => {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem('daily_quiz_date', today);
};
