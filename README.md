# Task Management Application
## Overview
Task Management Application is a platform for managing projects and tasks. Built with a focus on scalability and maintainability, the application leverages modern web technologies, custom API services, and Redux with async thunk actions to provide a seamless user experience. The application uses local storage to simulate backend interactions via mock APIs for rapid development and testing.

## Features
- **Project Management:**
Create, edit, and delete projects using a Redux-based state management system with async thunk actions to handle asynchronous operations.

- **Task Management:**
Manage tasks within projects with functionalities for task creation, editing, and deletion. Tasks can be filtered, sorted, and paginated, with infinite scrolling supported for seamless loading.

- **Infinite Scrolling & Load More:**
  Automatically load additional projects and tasks as you scroll. Custom hooks utilizing the IntersectionObserver API manage state transitions and pagination effectively.

- **Mock API & Custom Services:**
   - **MockApiService:** Simulates backend responses with configurable delays and authorization checks, using local storage to mimic server-side data persistence.
   - **EntityApiService:** Provides a generic API layer for performing CRUD operations on entities.
   - **TaskApiService:** Extends the entity API service to manage tasks specifically. Features include filtering tasks by project, status, and priority, as well as sorting and bulk deletion operations.
   - **ProductApiService:** (Similar to TaskApiService) Manages product-related data and operations for scenarios where product management is required.

- **Shadcn UI Components:**
  Utilizes Shadcn UI to provide polished, ready-to-use UI components that enhance the overall look and feel of the application. This ensures a consistent and modern user interface across the application.

- **Validation & Schema Definitions:**
Uses Zod for input validation (e.g., login forms) to maintain data integrity and deliver clear, user-friendly error messages for invalid inputs.

- **State Management with Async Thunk Actions:**
  Redux is used for global state management, while async thunk actions handle side effects such as API calls for fetching projects and tasks, ensuring a predictable state flow.

- **Responsive Design:**
  Tailwind CSS is used to build a mobile-first, responsive design that adapts seamlessly to a diverse range of devices.

## Technologies Used
- **React & TypeScript:**
  Build scalable and type-safe user interfaces with a component-based architecture.
- **Redux with Async Thunk Actions:**
  Manage application state and asynchronous processes using Redux, with async thunk actions implemented for API calls and side effects.
- **Tailwind CSS:**
  Ensure a responsive and customizable design with utility-first styling.
- **Shadcn UI:**
  Leverage pre-built UI components for a modern, polished interface that is consistent across the application.
- **Custom API Services:**
   - **MockApiService & EntityApiService:** Simulate backend operations and data persistence via local storage.
   - **TaskApiService & ProductApiService:** Offer entity-specific actions for managing tasks and products, including filtering, sorting, and CRUD operations.

- **Zod:**
  Validate user inputs and enforce schema integrity, ensuring robust error handling throughout the application.
- **Vite:**
  Utilize a fast and modern development build tool that streamlines the development workflow.

## Project Structure
- **Services:**
   - **MockApiService:** Provides simulated API responses with delay handling and authorization checks.
   -  **EntityApiService:** Implements generic CRUD operations using local storage.
   - **TaskApiService & ProductApiService:** Extend the entity service to provide APIs specific to tasks and products, including advanced operations like filtering and sorting.

- **Hooks & State Management:**
  Custom hooks, such as `useProjectsQuery`, encapsulate data fetching and infinite scrolling logic, integrating with Redux to handle asynchronous action dispatching and state updates.
- **UI Components:**
  React components, built with Shadcn UI and styled with Tailwind CSS, offer a modern and interactive user interface. This includes modals (e.g., confirm modals) and various other interactive elements.
- **Validation Schemas:**
  Input fields like login forms are validated using Zod to ensure data accuracy and provide actionable feedback to users.
- **Utilities:**
  Helper functions like generate unique identifiers, ensuring each new entity is distinct and traceable. `getRandomId`

## Installation
1. **Clone the Repository:**
``` bash
   git clone https://github.com/arthay/task-managment-app
```
1. **Navigate to the Project Directory:**
``` bash
   cd task-managment-app
```
1. **Install Dependencies:**
``` bash
   npm install
```
1. **Start the Development Server:**
``` bash
   npm run dev
```

## Usage
- **Home Page:**
  Navigate to the Home page to view and manage your projects using interactive components and infinite scrolling.
- **Task & Product Management:**
  Within a project, manage tasks using full CRUD operations. The TaskApiService filters, sorts, and paginates tasks based on various criteria. Product-related operations are similarly managed using ProductApiService.
- **Asynchronous Data Handling:**
  Async thunk actions in Redux ensure that API calls and responses (handled by custom API services) update the application state smoothly and predictably.
- **Mock API Functionality:**
  The application uses mock API services to simulate backend operations, providing a robust environment for development and testing without requiring a live server.
- **Interactive UI:**
  Built with Shadcn UI and Tailwind CSS, the interface is designed for consistent performance and usability across all devices.

## Testing & Contributions
- **Running Tests:**
  Execute unit and integration tests to ensure the application’s reliability:
``` bash
  npm run test
```
