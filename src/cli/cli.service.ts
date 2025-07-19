import { Injectable } from '@nestjs/common';
import * as readline from 'readline-sync';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task.entity';
import { UsersService } from '../users/usera.service';

@Injectable()
export class CliService {
  private currentUser: string | null = null;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}

  run() {
    this.showWelcomeScreen();
    this.showLoader();

    while (true) {
      if (!this.currentUser) {
        this.showUserMenu();
      } else {
        this.showTaskMenu();
      }
    }
  }

  // --- Welcome Screen ---
  private showWelcomeScreen() {
    console.log(
      '\n' +
        '==========================================================\n' +
        '|                                                        |\n' +
        '|          Welcome to the Interactive To-Do List!        |\n' +
        '|                                                        |\n' +
        '==========================================================\n',
    );
  }

  // Showing the loader animation
  private showLoader() {
    process.stdout.write('Initializing Application... ');
    const animationChars = ['|', '/', '-', '\\'];

    for (let i = 0; i < 20; i++) {
      process.stdout.write(animationChars[i % 4] + '\b');
      // Synchronous sleep equivalent
      const start = Date.now();
      while (Date.now() - start < 100) {
        // busy wait for 100ms
      }
    }
    console.log('Done!');

    // Brief pause after loading
    const start = Date.now();
    while (Date.now() - start < 500) {
      // busy wait for 500ms
    }
  }

  // --- Goodbye Screen ---
  private showGoodbyeScreen() {
    console.log(
      '\n' +
        '==========================================================\n' +
        '|                                                        |\n' +
        '|      Thank you for using the To-Do List application!   |\n' +
        '|                      Goodbye!                          |\n' +
        '|                                                        |\n' +
        '==========================================================\n',
    );
  }

  // --- User Menu and Actions ---
  private showUserMenu() {
    console.log('\n+------------------------------------------+');
    console.log('|                USER MENU                 |');
    console.log('+------------------------------------------+');
    console.log('| ' + ' '.repeat(40) + ' |'); // Blank line
    console.log('|   [1] Select Existing User' + ' '.repeat(15) + '|');
    console.log('|   [2] Create New User' + ' '.repeat(19) + '|');
    console.log('| ' + ' '.repeat(40) + ' |'); // Blank line
    console.log('|   [3] Exit Application' + ' '.repeat(17) + '|');
    console.log('| ' + ' '.repeat(40) + ' |'); // Blank line
    console.log('+------------------------------------------+');
    process.stdout.write('> Enter your choice: ');

    const choice = readline.question('');

    switch (choice) {
      case '1':
        this.selectUser();
        break;
      case '2':
        this.createUser();
        break;
      case '3':
        this.showGoodbyeScreen();
        process.exit(0);
      default:
        console.log('Invalid choice. Please try again.');
    }
  }

  private selectUser() {
    console.log('\n--- Available Users ---');
    const users = this.usersService.listUsers();

    if (users.length === 0) {
      console.log('\n+------------------------------------------+');
      console.log('|  [!] No users exist in the system.     |');
      console.log('|      Please create a user first.       |');
      console.log('+------------------------------------------+');
      return;
    }

    users.forEach((user) => console.log('- ' + user));
    process.stdout.write('Enter username to select: ');

    const username = readline.question('');
    const user = this.usersService.findUser(username);

    if (user) {
      this.currentUser = username;
      console.log(`User '${username}' selected.`);
    } else {
      console.log('User not found.');
    }
  }

  private createUser() {
    process.stdout.write('Enter new username: ');
    const username = readline.question('');

    if (!username.trim()) {
      console.log('Username cannot be empty.');
      return;
    }

    const existingUser = this.usersService.findUser(username);
    if (existingUser) {
      console.log('ERROR: User already exists.');
      return;
    }

    const user = this.usersService.createUser(username);
    this.currentUser = user.username;
    console.log(`User '${username}' created and selected.`);
  }

  // --- Task Menu and Actions ---
  private showTaskMenu() {
    const title = `TASK MENU | User: ${this.currentUser}`;
    const centeredTitle = this.centerText(title, 40);

    console.log('\n+------------------------------------------+');
    console.log(`| ${centeredTitle} |`);
    console.log('+------------------------------------------+');
    console.log('|   [1] Add Task' + ' '.repeat(26) + '|');
    console.log('|   [2] Remove Task' + ' '.repeat(23) + '|');
    console.log('|   [3] Mark Task as Complete' + ' '.repeat(13) + '|');
    console.log('| ' + ' '.repeat(40) + ' |');
    console.log('|   [4] View My Tasks' + ' '.repeat(21) + '|');
    console.log('|   [5] View All Tasks' + ' '.repeat(20) + '|');
    console.log('| ' + ' '.repeat(40) + ' |');
    console.log('|   [6] Switch User (Log Out)' + ' '.repeat(13) + '|');
    console.log('+------------------------------------------+');
    process.stdout.write('> Enter your choice: ');

    const choice = readline.question('');

    switch (choice) {
      case '1':
        this.addTask();
        break;
      case '2':
        this.removeTask();
        break;
      case '3':
        this.markTaskAsComplete();
        break;
      case '4':
        this.viewTasksByUser(this.currentUser!);
        break;
      case '5':
        this.viewAllTasks();
        break;
      case '6':
        this.currentUser = null;
        console.log('You have been logged out.');
        break;
      default:
        console.log('Invalid choice. Please try again.');
    }
  }

  private addTask() {
    process.stdout.write('Enter task description: ');
    const description = readline.question('');
    process.stdout.write('Enter task category: ');
    const category = readline.question('');

    const newTask = this.tasksService.addTask(
      description,
      category,
      this.currentUser!,
    );
    console.log(
      `SUCCESS: Task '${newTask.description}' added with ID: ${newTask.id}`,
    );
  }

  private removeTask() {
    process.stdout.write('Enter the Task ID to remove: ');
    const taskId = this.readIntInput();

    if (this.tasksService.removeTask(taskId)) {
      console.log(`SUCCESS: Task ${taskId} removed.`);
    } else {
      console.log('ERROR: Task not found.');
    }
  }

  private markTaskAsComplete() {
    process.stdout.write('Enter the Task ID to mark as complete: ');
    const taskId = this.readIntInput();

    if (this.tasksService.markComplete(taskId)) {
      console.log(`SUCCESS: Task ${taskId} marked as complete.`);
    } else {
      console.log('ERROR: Task not found or already complete.');
    }
  }

  private viewAllTasks() {
    console.log('\n--- All Tasks ---');
    const tasks = this.tasksService.getAll();
    this.printTasks(tasks);
  }

  private viewTasksByUser(username: string) {
    console.log(`\n--- Tasks for ${username} ---`);
    const tasks = this.tasksService.getByUser(username);
    this.printTasks(tasks);
  }

  // --- Helper Methods ---
  private readIntInput(): number {
    try {
      const input = readline.question('');
      return parseInt(input, 10);
    } catch (error) {
      return -1; // Return an invalid choice
    }
  }

  private printTasks(tasks: Task[]) {
    if (tasks.length === 0) {
      console.log('No tasks found.');
      return;
    }

    const format = '| %-4s | %-30s | %-15s | %-12s | %-15s |';
    console.log(
      '+------+--------------------------------+-----------------+--------------+-----------------+',
    );
    console.log(
      this.sprintf(
        format,
        'ID',
        'Description',
        'Category',
        'Status',
        'Assigned To',
      ),
    );
    console.log(
      '+------+--------------------------------+-----------------+--------------+-----------------+',
    );

    for (const task of tasks) {
      console.log(
        this.sprintf(
          format,
          task.id.toString(),
          task.description,
          task.category,
          task.status,
          task.assignedTo,
        ),
      );
    }
    console.log(
      '+------+--------------------------------+-----------------+--------------+-----------------+',
    );
  }

  private centerText(text: string, width: number): string {
    if (text.length >= width) {
      return text;
    }
    const padding = width - text.length;
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = padding - leftPadding;
    return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
  }

  private sprintf(format: string, ...args: string[]): string {
    let i = 0;
    return format.replace(/%-?(\d+)s/g, (match, width) => {
      if (i >= args.length) return match;
      const arg = args[i++];
      const w = parseInt(width, 10);
      if (match.startsWith('%-')) {
        // Left-aligned
        return arg.padEnd(w, ' ').substring(0, w);
      } else {
        // Right-aligned
        return arg.padStart(w, ' ').substring(0, w);
      }
    });
  }
}
