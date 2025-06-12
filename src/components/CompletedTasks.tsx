
import React from 'react';
import { Task } from '@/types/Task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import { formatDueDate } from '@/utils/dateUtils';

interface CompletedTasksProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  onDeleteTask,
  onToggleComplete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-500 text-white';
      case 'P2': return 'bg-orange-500 text-white';
      case 'P3': return 'bg-yellow-500 text-black';
      case 'P4': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Sort by completion date (most recent first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completedAt && b.completedAt) {
      return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    }
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground">
          Completed ({tasks.length})
        </CardTitle>
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
              <TableHead>Completed</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/30">
                <TableCell>
                  <Checkbox
                    checked={true}
                    onCheckedChange={() => onToggleComplete(task.id)}
                  />
                </TableCell>
                <TableCell>
                  <span className="line-through text-muted-foreground">
                    {task.task}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground">{task.assignee}</span>
                </TableCell>
                <TableCell>
                  {task.due ? (
                    <span className="text-muted-foreground">
                      {formatDueDate(task.due)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No due date</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {task.completedAt && (
                    <span className="text-muted-foreground text-sm">
                      {formatDueDate(task.completedAt)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteTask(task.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
