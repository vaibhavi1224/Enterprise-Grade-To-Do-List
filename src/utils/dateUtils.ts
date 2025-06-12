
import { format, isWithinInterval, addHours } from 'date-fns';

export const formatDueDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'h:mm aa, dd MMM');
};

export const isTaskDueSoon = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  
  const now = new Date();
  const due = new Date(dueDate);
  const oneHourFromNow = addHours(now, 1);
  
  return isWithinInterval(due, { start: now, end: oneHourFromNow });
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffInHours = Math.abs(date.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Due very soon';
  } else if (diffInHours < 24) {
    return `Due in ${Math.round(diffInHours)} hours`;
  } else {
    const diffInDays = Math.round(diffInHours / 24);
    return `Due in ${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
  }
};
