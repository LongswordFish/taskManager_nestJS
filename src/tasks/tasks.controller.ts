import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task} from './task.entity'
import { TaskStatus } from './task-status.enum';
import { CreateTaskTdo } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/dto/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto:GetTasksFilterDto,
    @GetUser() user:User
  ):Promise<Task[]>{
    console.log(`user user is ${user}`);
    return this.tasksService.getTasks(filterDto,user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string,
  @GetUser() user:User): Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskTdo,
    @GetUser() user:User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto,user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string,
  @GetUser() user:User): Promise<void> {
    return this.tasksService.deleteTask(id,user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user:User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status,user);
  }

  //old method using the local machine temprary memory
  // @Get()
  // getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // //method 1: problem: the data needs verification
  // // @Post()
  // // createTask(@Body() body){
  // //     console.log('body',body);
  // // }

  // //method 2: better than method 1
  // //   @Post()
  // //   createTask(
  // //     @Body('title') title: string,
  // //     @Body('description') description: string,
  // //   ): Task {
  // //     return this.tasksService.createTask(title, description);
  // //   }

  // //method 3: using dto
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskTdo): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskById(id);
  // }

  // //old method withought using validation
  // // @Patch('/:id/status')
  // // updateTaskStatus(
  // //   @Param('id') id: string,
  // //   @Body('status') status: TaskStatus,
  // // ): Task {
  // //   return this.tasksService.updateTaskStatus(id, status);
  // // }


}
