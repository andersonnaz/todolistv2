import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';
import { TagsController } from './tags/tags.controller';
import { TasksService } from './tasks/tasks.service';
import { UsersService } from './users/users.service';
import { TagsService } from './tags/tags.service';

@Module({
  imports: [],
  controllers: [AppController, TasksController, UsersController, TagsController],
  providers: [AppService, TasksService, UsersService, TagsService],
})
export class AppModule {}
