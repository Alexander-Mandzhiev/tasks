import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto, UpdateOrderDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async findOneById(id: string) {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async create(dto: TaskDto) {
    try {
      const count = await this.prisma.task.count({ where: { statusId: dto.statusId } })
      return await this.prisma.task.create({
        data: { name: dto.name, description: dto.description, order: count, statusId: dto.statusId },
        select: {
          id: true, createdAt: true, name: true, description: true, order: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(statusId: string) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: { statusId }, select: {
          id: true, createdAt: true, name: true, description: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      });
      return tasks
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задач! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(statusId: string, id: string) {
    try {
      return await this.prisma.task.findUnique({
        where: { id, statusId }, select: {
          id: true, createdAt: true, name: true, description: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, dto: TaskDto) {
    try {
      const count = await this.prisma.task.count({ where: { statusId: dto.statusId } })
      return await this.prisma.task.update({
        where: { id },
        data: { name: dto.name, description: dto.description, statusId: dto.statusId, order: count },
        select: {
          id: true, createdAt: true, name: true, description: true, order: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      })
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string) {
    try {
      const task = await this.prisma.task.findUnique({ where: { id } });
      if (!task) throw new HttpException(`Произошла ошибка удаления задачи! Задание не найдено!`, HttpStatus.NOT_FOUND);
      await this.prisma.task.delete({ where: { id } });
      return { message: 'Задача успешно удалена!' };
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async updateOrderTasks(dto: UpdateOrderDto) {
    try {
      return await this.prisma.$transaction(
        dto.ids.map((id, order) => this.prisma.task.update({
          where: { id }, data: { order },
          select: {
            id: true, createdAt: true, name: true, description: true,
            taskIntValues: { select: { value: true, taskFieldId: true } },
            taskStrValues: { select: { value: true, taskFieldId: true } },
            taskEnumValues: { select: { value: true, taskFieldId: true } }
          }
        }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления порядка задачи!`, HttpStatus.NOT_FOUND);
    }
  }
}
