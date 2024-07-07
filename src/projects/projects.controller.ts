import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto, SandOneProjectDto, UpdateProjectDto } from './dto/create-project.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ cmd: "create-project" })
  create(@Payload() dto: ProjectDto) {
    return this.projectsService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-all-projects" })
  findAll(@Payload() id: string) {
    return this.projectsService.findAll(id);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-one-projects" })
  findOne(@Payload() dto: SandOneProjectDto) {
    return this.projectsService.findOne(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-projects" })
  update(@Payload() dto: UpdateProjectDto) {
    return this.projectsService.update(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "delete-projects" })
  remove(@Payload() dto: SandOneProjectDto) {
    return this.projectsService.remove(dto);
  }
}
