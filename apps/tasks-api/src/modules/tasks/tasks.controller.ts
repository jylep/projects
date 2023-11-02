import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDto } from "./dto/task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskDto> {
    const task = this.tasksService.findOne(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<string> {
    return this.tasksService.createOne(task);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    return this.tasksService.updateOne(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<TaskDto> {
    return this.tasksService.deleteOne(id);
  }
}