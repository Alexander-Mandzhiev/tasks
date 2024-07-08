import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusesModule } from './statuses/statuses.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { TaskFieldValuesModule } from './task-field-values/task-field-values.module';

@Module({
  imports: [
    ProjectsModule,
    StatusesModule,
    TasksModule,
    TaskFieldsModule,
    TaskFieldValuesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
