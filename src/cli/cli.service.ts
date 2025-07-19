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

  async run() {
    while (true) {
      if (!this.currentUser) {
        this.userMenu();
      } else {
        await this.taskMenu();
      }
    }
  }

  private userMenu() {
    console.log('\n--- User Menu ---');
    console.log('1. Select User');
    console.log('2. Create New User');
    console.log('3. Exit');

    const choice = readline.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.selectUser();
        break;
      case '2':
        this.createUser();
        break;
      case '3':
        process.exit(0);
    }
  }

  private createUser() {
    const username = readline.question('Enter new username: ');
    const user = this.usersService.createUser(username);
    console.log(`\nUser '${user.username}' created and selected.\n`);
    this.currentUser = user.username;
  }

  private selectUser() {
    const users = this.usersService.listUsers();
    if (users.length === 0) {
      console.log('No users found.');
      return;
    }
    console.log('\n--- Available Users ---');
    console.log(users.map((u) => `- ${u}`).join('\n'));
    const username: string = readline.question('\nEnter username to select: ');
    const user = this.usersService.findUser(username);
    if (user) {
      this.currentUser = username;
      console.log(`\nUser '${username}' selected.\n`);
    } else {
      console.log('User not found.');
    }
  }

  private async taskMenu() {
    console.log(`\n--- Task Menu (User: ${this.currentUser}) ---`);
    console.log('1. Add Task');
    console.log('2. Remove Task');
    console.log('3. Mark Task as Complete');
    console.log('4. View My Tasks');
    console.log('5. View All Tasks');
    console.log('6. Switch User (Log Out)');

    const choice = readline.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.addTask();
        break;
      case '2':
        this.removeTask();
        break;
      case '3':
        this.completeTask();
        break;
      case '4':
        this.viewMyTasks();
        break;
      case '5':
        this.viewAllTasks();
        break;
      case '6':
        this.currentUser = null;
        console.log('\nYou have been logged out.');
        break;
    }
  }

  private addTask() {
    const description: string = readline.question('Enter task description: ');
    const category: string = readline.question('Enter task category: ');
    const task = this.tasksService.addTask(
      description,
      category,
      this.currentUser!,
    );
    console.log(
      `\nSUCCESS: Task '${task.description}' added with ID: ${task.id}`,
    );
  }

  private removeTask() {
    const id: number = parseInt(
      readline.question('Enter the Task ID to mark as complete: '),
    );
    const success = this.tasksService.removeTask(id);
    console.log(
      success
        ? `\nSUCCESS: Task ${id} marked as complete.`
        : '\nERROR: Task not found.',
    );
  }

  private completeTask() {
    const id = parseInt(
      readline.question('Enter the Task ID to mark as complete: '),
    );
    const success = this.tasksService.markComplete(id);
    console.log(
      success
        ? `\nSUCCESS: Task ${id} marked as complete.`
        : '\nERROR: Task not found.',
    );
  }

  private viewMyTasks() {
    const tasks = this.tasksService.getByUser(this.currentUser!);
    console.log(`\n--- Tasks for ${this.currentUser} ---`);
    this.printTasks(tasks);
  }

  private viewAllTasks() {
    const tasks = this.tasksService.getAll();
    console.log('\n--- All Tasks ---');
    this.printTasks(tasks);
  }

  private printTasks(tasks: Task[]) {
    if (tasks.length === 0) {
      console.log('No tasks found.');
      return;
    }

    tasks.forEach((t) => {
      console.log(
        `Task[ID=${t.id}, Desc='${t.description}', Cat='${t.category}', Status=${t.status}, User=${t.assignedTo}]`,
      );
    });
  }
}
