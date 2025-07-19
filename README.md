# 📋 Task Management CLI

A command-line task management application built with **NestJS** and **TypeScript**. This CLI allows users to manage tasks with features like user management, task creation, completion tracking, and more.

## ✨ Features

### 👥 User Management
- Create new users
- Select active users
- Switch between users
- List all available users

### 📝 Task Management
- Add new tasks with descriptions and categories
- Remove tasks by ID
- Mark tasks as complete
- View personal tasks
- View all tasks in the system
- Task categorization and status tracking

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the CLI**
   ```bash
   npm run start
   ```

## 🎯 Usage

### User Menu
When you start the application, you'll see the **User Menu**:
```

--- User Menu ---
1. Select User
2. Create New User
3. Exit
```
- **Option 1**: Choose from existing users
- **Option 2**: Create a new user account
- **Option 3**: Exit the application

### Task Menu
Once logged in, you'll access the **Task Menu**:
```

--- Task Menu (User: username) ---
1. Add Task
2. Remove Task
3. Mark Task as Complete
4. View My Tasks
5. View All Tasks
6. Switch User (Log Out)
```
### Example Workflow

1. **Create a new user**
   ```
   Enter new username: john_doe
   User 'john_doe' created and selected.
   ```

2. **Add a task**
   ```
   Enter task description: Complete project documentation
   Enter task category: Work
   SUCCESS: Task 'Complete project documentation' added with ID: 1
   ```

3. **View your tasks**
   ```
   --- Tasks for john_doe ---
   Task[ID=1, Desc='Complete project documentation', Cat='Work', Status=PENDING, User=john_doe]
   ```

## 🏗️ Architecture

The application follows a modular **NestJS** architecture:
```

src/
├── cli/               # CLI interface and user interaction
│   └── cli.service.ts
├── tasks/             # Task management logic
│   ├── task.entity.ts
│   └── tasks.service.ts
├── users/             # User management logic
│   ├── user.entity.ts
│   └── users.service.ts
├── app.module.ts      # Main application module
└── main.ts           # Application entry point
```
### Key Components

- **CliService**: Handles user interface and menu interactions
- **TasksService**: Manages task CRUD operations
- **UsersService**: Handles user creation and selection
- **Task Entity**: Defines task structure with ID, description, category, status, and assigned user
- **User Entity**: Defines user structure with ID and username

## 🛠️ Development

### Available Scripts
```
bash
# Development
npm run start:dev    # Start in development mode with hot reload

# Production
npm run build        # Build the application
npm run start        # Start the built application

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
```
### Technology Stack

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[readline-sync](https://www.npmjs.com/package/readline-sync)** - Synchronous readline for CLI input
- **[RxJS](https://rxjs.dev/)** - Reactive extensions for JavaScript
- **[Jest](https://jestjs.io/)** - Testing framework

## 📝 Task Status

Tasks can have the following statuses:
- **PENDING** - Task is created but not completed
- **COMPLETED** - Task has been marked as complete

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- The CLI runs in an infinite loop - use Ctrl+C to force exit if needed
- Task persistence is in-memory only - data is lost on application restart

## 🔮 Future Enhancements

- [ ] Database persistence (SQLite/PostgreSQL)
- [ ] Task due dates and priorities
- [ ] Task assignment between users
- [ ] Export tasks to different formats
- [ ] RESTful API endpoints
- [ ] Web interface
- [ ] Task filtering and search
- [ ] User authentication and authorization

---

Built with ❤️ using NestJS and TypeScript
