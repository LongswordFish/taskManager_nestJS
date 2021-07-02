import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskTdo } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  //method 1: problem: the data needs verification
  // @Post()
  // createTask(@Body() body){
  //     console.log('body',body);
  // }

  //method 2: better than method 1
  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     return this.tasksService.createTask(title, description);
  //   }

  //method 3: using dto
  @Post()
  createTask(@Body() createTaskDto: CreateTaskTdo): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
