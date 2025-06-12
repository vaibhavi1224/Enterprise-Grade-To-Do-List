
export interface Task {
  id: string;
  task: string;
  assignee: string;
  due: string | null;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export type Priority = 'P1' | 'P2' | 'P3' | 'P4';
