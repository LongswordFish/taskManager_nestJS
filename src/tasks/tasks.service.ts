import { Injectable, NotFoundException } from '@nestjs/common';
import { Task} from './task.entity';
import { TaskStatus } from './task-status.enum';
//import { v4 as uuid } from 'uuid';
import { CreateTaskTdo } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository:TasksRepository,
  ){}

  async getTaskById(id:string, user:User):Promise<Task>{
    const found = await this.tasksRepository.findOne(id);
    //const found = await this.tasksRepository.findOne({where:{id,user}}});
    if(!found || found.user.username!==user.username){
      throw new NotFoundException(`Task with Id ${id} is not found!`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskTdo,user:User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto,user);
  }

  deleteTask(id:string, user:User):Promise<void>{
    return this.tasksRepository.deleteTask(id,user);
  }

  async updateTaskStatus(id: string, status: TaskStatus,user:User): Promise<Task> {

    let task= await this.getTaskById(id,user);
    task.status = status;
    task = await this.tasksRepository.save(task);
    return task;
  }

  getTasks(filterDto:GetTasksFilterDto,user:User): Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto,user);
  }

  //old method using the local machine temprary memory
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // // method without dto
  // //   createTask(title: string, description: string): Task {
  // //     const task: Task = {
  // //       id: uuid(),
  // //       title,
  // //       description,
  // //       status: TaskStatus.OPEN,
  // //     };

  // // method with dto
  // createTask(createTaskDto: CreateTaskTdo): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  // getTaskById(id: string): Task {
  //   //old method
  //   //return this.tasks.find((task) => task.id === id);

  //   //throw exceptions
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) throw new NotFoundException(`Task with ID: ${id} not found!`);
  //   else return found;
  // }

  // deleteTaskById(id: string): void {
  //   //old method
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   // this.tasks = this.tasks.map((task) => {
  //   //   if (task.id === id) {
  //   //     task.status = status;
  //   //   }
  //   //   return task;
  //   // });
  //   const task: Task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search))
  //         return true;
  //       else return false;
  //     });
  //   }
  //   return tasks;
  // }
}
