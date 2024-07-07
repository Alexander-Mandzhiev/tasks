import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [
    ProjectsModule,
    StatusesModule,
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
