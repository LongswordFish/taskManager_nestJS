import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskTdo } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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
    //old method
    //return this.tasks.find((task) => task.id === id);

    //throw exceptions
    const found = this.tasks.find((task) => task.id === id);
    if (!found) throw new NotFoundException(`Task with ID: ${id} not found!`);
    else return found;
  }

  deleteTaskById(id: string): void {
    //old method
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // this.tasks = this.tasks.map((task) => {
    //   if (task.id === id) {
    //     task.status = status;
    //   }
    //   return task;
    // });
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search))
          return true;
        else return false;
      });
    }
    return tasks;
  }
}
