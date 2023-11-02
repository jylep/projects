import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  private tasks: TaskDto[] = [];

  findAll(): TaskDto[] {
    return [...this.tasks];
  }

  findOne(id: string): TaskDto {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  createOne(task: CreateTaskDto): string {
    const id = Date.now().toString();
    this.tasks.push({...task, id});

    return id;
  }

  updateOne(id: string, taskUpdate: UpdateTaskDto): TaskDto {
    let updatedTask;
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task = {...task, ...taskUpdate};
        updatedTask = task;
      }

      return task;
    });

    return updatedTask;
  }

  deleteOne(id: string): TaskDto {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (!taskIndex) throw new NotFoundException();

    const [removedTask] = this.tasks.splice(taskIndex, 1);

    return removedTask;
  }
}