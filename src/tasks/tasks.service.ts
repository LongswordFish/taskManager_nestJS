import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskTdo } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  // method without dto
  //   createTask(title: string, description: string): Task {
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };

  // method with dto
  createTask(createTaskDto: CreateTaskTdo): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
}
