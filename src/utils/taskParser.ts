
import * as chrono from 'chrono-node';
import { Task, Priority } from '@/types/Task';
import { v4 as uuidv4 } from 'uuid';

export const parseTaskInput = (input: string): Task => {
  // Parse priority
  const priority = extractPriority(input);
  let cleanInput = removePriorityFromInput(input);

  // Parse date/time using chrono-node
  const parseResults = chrono.parse(cleanInput);
  let dueDate: string | null = null;
  
  if (parseResults.length > 0) {
    const parsedDate = parseResults[0].start.date();
    // Convert to IST
    const istDate = new Date(parsedDate.getTime() + (5.5 * 60 * 60 * 1000));
    dueDate = istDate.toISOString();
    
    // Remove the parsed date text from input
    cleanInput = cleanInput.replace(parseResults[0].text, '').trim();
  }

  // Extract assignee
  const assignee = extractAssignee(cleanInput);
  
  // Clean task name by removing assignee references
  const taskName = cleanTaskName(cleanInput, assignee);

  return {
    id: uuidv4(),
    task: taskName || 'Untitled Task',
    assignee: assignee || 'Not assigned',
    due: dueDate,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };
};

const extractPriority = (input: string): Priority => {
  const priorityMatch = input.match(/\b(P[1-4]|urgent|high priority|low priority)\b/i);
  
  if (!priorityMatch) return 'P3';
  
  const match = priorityMatch[0].toLowerCase();
  
  switch (match) {
    case 'p1':
    case 'urgent':
      return 'P1';
    case 'p2':
    case 'high priority':
      return 'P2';
    case 'p3':
      return 'P3';
    case 'p4':
    case 'low priority':
      return 'P4';
    default:
      return 'P3';
  }
};

const removePriorityFromInput = (input: string): string => {
  return input.replace(/\b(P[1-4]|urgent|high priority|low priority)\b/gi, '').trim();
};

const extractAssignee = (input: string): string | null => {
  // Look for patterns like "for [Name]", "with [Name]", "to [Name]"
  const patterns = [
    /\b(?:for|with|to|by)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/i,
    /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:needs|should|will|must)\b/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      // Validate that it's likely a name (starts with capital letter)
      const potentialName = match[1].trim();
      if (/^[A-Z][a-z]+/.test(potentialName)) {
        return potentialName;
      }
    }
  }

  // Look for standalone capitalized words that could be names
  const words = input.split(/\s+/);
  for (const word of words) {
    if (/^[A-Z][a-z]{2,}$/.test(word) && !isCommonWord(word)) {
      return word;
    }
  }

  return null;
};

const cleanTaskName = (input: string, assignee: string | null): string => {
  let cleaned = input;
  
  if (assignee) {
    // Remove assignee and common prepositions
    cleaned = cleaned.replace(new RegExp(`\\b(?:for|with|to|by)\\s+${assignee}\\b`, 'gi'), '');
    cleaned = cleaned.replace(new RegExp(`\\b${assignee}\\b`, 'gi'), '');
  }
  
  // Clean up extra whitespace and connecting words
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/^(and|or|but|the|a|an)\s+/i, '');
  
  return cleaned;
};

const isCommonWord = (word: string): boolean => {
  const commonWords = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
    'Today', 'Tomorrow', 'Yesterday', 'Morning', 'Afternoon', 'Evening', 'Night'
  ];
  return commonWords.includes(word);
};
