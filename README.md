# README.md

# Enterprise-Grade To-Do List

A sophisticated to-do list application that allows users to create tasks using natural language commands.

## Features

- **Natural Language Task Creation**: Type tasks like "Finish report for Aman by 8pm tomorrow P1" and the app will automatically parse the task name, assignee, due date/time, and priority
- **Smart Parsing**: Uses chrono-node to extract date/time information from text
- **Task Management**: Create, edit, complete, and delete tasks
- **Sorting & Filtering**: Sort tasks by due date or priority
- **Light/Dark Theme**: Support for both light and dark themes with system preference detection
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Tasks persist between sessions in your browser
- **IST Timezone Support**: All dates are displayed in Indian Standard Time

## Technology Stack

- React + TypeScript + Vite
- Tailwind CSS for styling
- Shadcn UI for UI components
- chrono-node for natural language date parsing
- LocalStorage for data persistence

## Getting Started

To run the application locally:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to the URL displayed in the terminal (typically http://localhost:8080)

## Usage Examples

Here are some examples of natural language commands you can use:

- "Complete the presentation by 3pm tomorrow"
- "Call John regarding project update by Friday 5pm P1"
- "Send weekly report to manager by Monday EOD P2"
- "Review pull requests by noon P3"
- "Organize team lunch next Thursday 1pm for Alex"

## License

MIT
