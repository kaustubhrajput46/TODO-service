import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { CliService } from './cli/cli.service';
import { UsersService } from './users/usera.service';

@Module({
  providers: [UsersService, TasksService, CliService],
})
export class AppModule {}
