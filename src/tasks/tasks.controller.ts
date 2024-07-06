import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto, UpdateOrderDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() dto: TaskDto) {
    return this.tasksService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':status_id')
  findAll(@Param('status_id') statusId: string) {
    return this.tasksService.findAll(statusId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':status_id/:id')
  findOne(@Param('status_id') statusId: string, @Param('id') id: string) {
    return this.tasksService.findOne(statusId, id);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(`order`)
  updateOrderStatuses(@Body() dto: UpdateOrderDto) {
    return this.tasksService.updateOrderTasks(dto);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: TaskDto) {
    return this.tasksService.update(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
