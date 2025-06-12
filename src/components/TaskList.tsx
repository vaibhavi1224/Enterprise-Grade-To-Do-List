
import React from 'react';
import { Task } from '@/types/Task';
import { TaskItem } from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground text-lg">No active tasks</p>
          <p className="text-muted-foreground text-sm mt-2">Add a task above to get started</p>
        </CardContent>
      </Card>
    );
  }

  // Sort tasks by priority (P1 first) then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Priority sort (P1 = 1, P2 = 2, etc.)
    const priorityA = parseInt(a.priority.substring(1));
    const priorityB = parseInt(b.priority.substring(1));
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // Due date sort
    if (a.due && b.due) {
      return new Date(a.due).getTime() - new Date(b.due).getTime();
    }
    if (a.due && !b.due) return -1;
    if (!a.due && b.due) return 1;
    
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Active Tasks ({tasks.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Done</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
