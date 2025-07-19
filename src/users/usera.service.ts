import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  createUser(username: string): User {
    const user = new User(this.idCounter++, username);
    this.users.push(user);
    return user;
  }

  findUser(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  listUsers(): string[] {
    return this.users.map((u) => u.username);
  }
}
