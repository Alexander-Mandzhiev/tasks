import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/create-project.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SandOneProjectDto } from 'src/types/project.types';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }



  @MessagePattern({ cmd: "create-project" })
  create(@Payload() dto: ProjectDto) {
    return this.projectsService.create(dto);
  }

  @MessagePattern({ cmd: "get-all-projects" })
  findAll(@Payload() id: string) {
    return this.projectsService.findAll(id);
  }

  @MessagePattern({ cmd: "get-one-projects" })
  findOne(@Payload() dto: SandOneProjectDto) {
    return this.projectsService.findOne(dto);
  }

  @MessagePattern({ cmd: "update-projects" })
  update(@Payload() dto: ProjectDto) {
    return this.projectsService.update(dto);
  }

  @MessagePattern({ cmd: "delete-projects" })
  remove(@Payload() dto: SandOneProjectDto) {
    return this.projectsService.remove(dto);
  }
}
