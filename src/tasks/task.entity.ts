export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class Task {
  constructor(
    public id: number,
    public description: string,
    public category: string,
    public status: TaskStatus,
    public assignedTo: string, // username
  ) {}
}
