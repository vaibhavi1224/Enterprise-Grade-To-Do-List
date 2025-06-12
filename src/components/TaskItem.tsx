
import React, { useState } from 'react';
import { Task } from '@/types/Task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash, Edit2, Check, X, Clock } from 'lucide-react';
import { formatDueDate, isTaskDueSoon } from '@/utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    task: task.task,
    assignee: task.assignee,
  });

  const handleEdit = (field: string) => {
    setIsEditing(field);
  };

  const handleSave = (field: string) => {
    onUpdateTask(task.id, { [field]: editValues[field as keyof typeof editValues] });
    setIsEditing(null);
  };

  const handleCancel = () => {
    setEditValues({
      task: task.task,
      assignee: task.assignee,
    });
    setIsEditing(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-500 text-white';
      case 'P2': return 'bg-orange-500 text-white';
      case 'P3': return 'bg-yellow-500 text-black';
      case 'P4': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const isDueSoon = isTaskDueSoon(task.due);

  return (
    <TableRow className="hover:bg-muted/50">
      {/* Checkbox Column */}
      <TableCell>
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
        />
      </TableCell>

      {/* Task Name Column */}
      <TableCell>
        {isEditing === 'task' ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValues.task}
              onChange={(e) => setEditValues(prev => ({ ...prev, task: e.target.value }))}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave('task');
                if (e.key === 'Escape') handleCancel();
              }}
              autoFocus
            />
            <Button size="sm" onClick={() => handleSave('task')}>
              <Check className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.task}
            </span>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => handleEdit('task')}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </TableCell>

      {/* Assignee Column */}
      <TableCell>
        {isEditing === 'assignee' ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValues.assignee}
              onChange={(e) => setEditValues(prev => ({ ...prev, assignee: e.target.value }))}
              className="w-32"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave('assignee');
                if (e.key === 'Escape') handleCancel();
              }}
              autoFocus
            />
            <Button size="sm" onClick={() => handleSave('assignee')}>
              <Check className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <button
            onClick={() => handleEdit('assignee')}
            className="font-medium hover:text-foreground transition-colors text-left"
          >
            {task.assignee}
          </button>
        )}
      </TableCell>

      {/* Due Date Column */}
      <TableCell>
        {task.due ? (
          <div className="flex items-center gap-2">
            <span className={`font-medium ${isDueSoon ? 'text-destructive' : ''}`}>
              {formatDueDate(task.due)}
            </span>
            {isDueSoon && !task.completed && (
              <Badge variant="destructive" className="gap-1">
                <Clock className="w-3 h-3" />
                Due Soon
              </Badge>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground">No due date</span>
        )}
      </TableCell>

      {/* Priority Column */}
      <TableCell>
        <Badge className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </TableCell>

      {/* Actions Column */}
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
  );
};
