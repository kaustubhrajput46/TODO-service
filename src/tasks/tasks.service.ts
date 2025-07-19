import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  addTask(desc: string, cat: string, user: string): Task {
    const task = new Task(
      this.idCounter++,
      desc,
      cat,
      TaskStatus.PENDING,
      user,
    );
    this.tasks.push(task);
    return task;
  }

  markComplete(id: number): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.status = TaskStatus.COMPLETED;
      return true;
    }
    return false;
  }

  removeTask(id: number): boolean {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      this.tasks.splice(idx, 1);
      return true;
    }
    return false;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getByUser(user: string): Task[] {
    return this.tasks.filter((t) => t.assignedTo === user);
  }
}
