import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';
import { TagsController } from './tags/tags.controller';

@Module({
  imports: [],
  controllers: [AppController, TasksController, UsersController, TagsController],
  providers: [AppService],
})
export class AppModule {}
