
import React, { useState, useEffect } from 'react';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { CompletedTasks } from '@/components/CompletedTasks';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Task } from '@/types/Task';
import { loadTasks, saveTasks } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
    toast({
      title: "Task added",
      description: `"${task.task}" has been added to your list.`,
    });
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: `"${taskToDelete?.task}" has been removed.`,
      variant: "destructive",
    });
  };

  const toggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { 
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : undefined
      });
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Enterprise-Grade To-Do List</h1>
            <p className="text-muted-foreground">Natural language task creation and management</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Task Input */}
        <div className="mb-8">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Active Tasks */}
        <div className="mb-8">
          <TaskList 
            tasks={activeTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <CompletedTasks 
            tasks={completedTasks}
            onDeleteTask={deleteTask}
            onToggleComplete={toggleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
