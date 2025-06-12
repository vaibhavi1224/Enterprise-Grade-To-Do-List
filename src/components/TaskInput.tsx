
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Task } from '@/types/Task';
import { parseTaskInput } from '@/utils/taskParser';
import { useToast } from '@/hooks/use-toast';

interface TaskInputProps {
  onAddTask: (task: Task) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter a task description.",
        variant: "destructive",
      });
      return;
    }

    if (input.length > 200) {
      toast({
        title: "Input too long",
        description: "Please keep your task description under 200 characters.",
        variant: "destructive",
      });
      return;
    }

    try {
      const task = parseTaskInput(input.trim());
      onAddTask(task);
      setInput('');
    } catch (error) {
      toast({
        title: "Parsing error",
        description: "Unable to parse the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Finish report for Aman by 8pm tomorrow P1"
          className="flex-1 text-base"
          maxLength={200}
        />
        <Button type="submit" className="px-6">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </form>
      <div className="mt-3 text-sm text-muted-foreground">
        <p>Try: "Review design with Sarah by Friday 2pm P2" or "Call client tomorrow morning urgent"</p>
      </div>
    </Card>
  );
};
