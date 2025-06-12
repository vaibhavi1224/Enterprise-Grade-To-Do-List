
import { Task } from '@/types/Task';

const STORAGE_KEY = 'naturalTaskManager.tasks';

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const tasks = JSON.parse(stored) as Task[];
    // Validate the structure
    return tasks.filter(task => 
      task.id && 
      task.task && 
      task.assignee !== undefined && 
      task.priority && 
      typeof task.completed === 'boolean'
    );
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const clearAllTasks = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
