// Interface for Project data - matches the Project model in your backend
// Used throughout the app to ensure type safety when working with projects
export interface Project {
  name: string; // Project name from the database
  description: string; // Project description from the database
  _id: string; // MongoDB unique identifier for this project
  user: string; // Reference to the user who owns this project
  createdAt?: string; // Optional timestamp when project was created
  updatedAt?: string; // Optional timestamp when project was last updated
}

// Interface for User data - matches the User model in your backend
// Used for authentication and displaying user information
export interface User {
  _id: string; // MongoDB unique identifier for this user
  username: string; // User's chosen username
  email: string; // User's email address (used for login)
  githubId?: string; // Optional GitHub ID if user logged in with GitHub OAuth
}

// Interface for Task data - matches the Task model in your backend
// Tasks belong to projects and track individual work items
export interface Task {
  _id: string; // MongoDB unique identifier for this task
  title: string; // Task title/name
  description: string; // Detailed description of what needs to be done
  status: 'To Do' | 'In Progress' | 'Done'; // Current status - can only be one of these three values
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent'; // Optional priority level for the task
  project: string; // Reference to the project this task belongs to
  dueDate?: string; // Optional due date for the task
  createdAt?: string; // Optional timestamp when task was created
  updatedAt?: string; // Optional timestamp when task was last updated
}